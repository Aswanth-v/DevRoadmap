import { useSelector,useDispatch } from "react-redux";
import { Home } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToFavorites, removeFromFavorites } from "../redux/FavSlice";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.videos);
  const navigate=useNavigate()
  
    const dispatch = useDispatch();
   const toggleLike = (video) => {
    const isLiked = favorites.find(v => v._id === video._id);
    if (isLiked) {
      dispatch(removeFromFavorites(video._id));
    } else {
      dispatch(addToFavorites(video));
    }
  };
  if (favorites.length === 0) {
    return (
      <h2 className="text-white text-center mt-10">
        No favorite videos yet
      </h2>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-neutral-950 via-black to-emerald-950 text-white overflow-x-hidden overflow-y-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-24 pb-10 max-w-4xl mx-auto px-6 ">
       {favorites
  .filter(v => v && v._id && v.url)
  .map((v) => (
    <div key={v._id} className="p-4 rounded-xl border border-gray-600/40 hover:border-purple-500">
   <div className="text-white text-sm">{v.thumbnail}</div>
            <p className="mt-2 text-blue-300">{v.channelName}</p>
            <span className="text-xs text-gray-300">{v.core}</span> 
      <a
        href={v.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 text-purple-300"
      >
        ▶ Watch Video
      </a>
      <div className="pt-5 " onClick={()=>toggleLike(v)}>
       {favorites ? (
                          <AiFillHeart className="text-red-500 w-6 h-6 " />
                        ) : (
                          <AiOutlineHeart className="text-white w-6 h-6" />
                        )}
                        </div>
    </div>
))}

         <button
        onClick={() => navigate( "/")}
        className="fixed top-4 left-4 flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-teal-500/20 ring-2 ring-emerald-300/40 shadow-xl shadow-emerald-900/50 backdrop-blur-md hover:scale-105 hover:shadow-emerald-500/30 transition-all duration-200 z-50"
      >
        
          <Home size={20} className="text-emerald-200" />
       
      </button>
      </div>
    </div>
  );
};


export default Favorites;
