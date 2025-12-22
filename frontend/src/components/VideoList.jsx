import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/FavSlice";

const VideoList = ({ refresh, isAdmin, onUploaded }) => {
  const [videos, setVideos] = useState([]);
  const [editData, setEditData] = useState(null);

  const dispatch = useDispatch();
  const likedVideos = useSelector(state => state.favorites.videos);

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/all");
      setVideos(res.data.videos);
    } catch (err) {
      console.log("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [refresh]);

  // Toggle like/unlike
 const toggleLike = (video) => {
  const isLiked = likedVideos.find(v => v._id === video._id);
  if (isLiked) {
    dispatch(removeFromFavorites(video._id));
  } else {
    dispatch(addToFavorites(video));
  }
};


  // ADMIN: delete video
  const itemDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete/${id}`);
      onUploaded?.();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <>
      {/* EDIT MODAL */}
      {editData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl mb-4">Edit Video</h2>
            <input
              className="w-full mb-2 p-2 bg-gray-800 rounded"
              value={editData.thumbnail}
              onChange={e => setEditData({ ...editData, thumbnail: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 bg-gray-800 rounded"
              value={editData.channelName}
              onChange={e => setEditData({ ...editData, channelName: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 bg-gray-800 rounded"
              value={editData.core}
              onChange={e => setEditData({ ...editData, core: e.target.value })}
            />
            <input
              className="w-full mb-4 p-2 bg-gray-800 rounded"
              value={editData.url}
              onChange={e => setEditData({ ...editData, url: e.target.value })}
            />
            <div className="flex justify-between">
              <button
                className="bg-green-600 px-4 py-2 rounded"
                onClick={() => {
                  // save edit logic
                  setEditData(null);
                }}
              >
                Save
              </button>
              <button
                className="bg-red-600 px-4 py-2 rounded"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v) => {
          const isFavorite = likedVideos.some(fav => fav._id === v._id);

          return (
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

              {/* ❤️ LIKE BUTTON */}
              {!isAdmin && (
                <div
                  className="mt-3 cursor-pointer w-fit"
                  onClick={() => toggleLike(v)}
                >
                  {isFavorite ? (
                    <AiFillHeart className="text-red-500 w-6 h-6" />
                  ) : (
                    <AiOutlineHeart className="text-white w-6 h-6" />
                  )}
                </div>
              )}

              {/* ADMIN CONTROLS */}
              {isAdmin && (
                <div className="mt-3 flex gap-3 text-sm text-gray-300">
                  <span
                    className="cursor-pointer hover:text-yellow-400"
                    onClick={() => setEditData(v)}
                  >
                    edit
                  </span>
                  <span
                    className="cursor-pointer hover:text-red-400"
                    onClick={() => itemDelete(v._id)}
                  >
                    delete
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VideoList;
