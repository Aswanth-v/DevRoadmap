import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function FloatingActions() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [redirect, setRedirect] = useState(null);

  const LoginFirst = () => {
    if (!isAuthenticated) {
      setRedirect("/login");
    } else {
      setRedirect("/exclusive");
    }
  };

  if (redirect) return <Navigate to={redirect} replace />;

  return (
    <div className="fixed bottom-4 left-12 z-[9999] select-none">
      
      {/* Glow Aura */}
      <div
        className="absolute -inset-6 blur-2xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,150,0.5), rgba(0,0,0,0))",
        }}
      />

      {/* Buttons Container */}
      <div className="flex flex-col gap-4 bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg">

        {/* Favorite Button */}
        <div className="relative group flex justify-center">
         <Link to="/fav">
  <button
   onClick={LoginFirst}
    className="w-[clamp(40px,4vw,60px)] h-[clamp(40px,4vw,60px)]
    flex items-center justify-center rounded-full bg-pink-500 hover:bg-pink-600 transition shadow-[0_0_20px_rgba(255,0,150,0.6)]"
  >
    ❤️
  </button>
</Link>

          <span
            className="absolute right-16 top-1/2 -translate-y-1/2 text-sm text-white bg-pink-500/20 
            border border-pink-400/40 backdrop-blur-md rounded-lg px-2 py-1 opacity-0 translate-x-2 
            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
          >
            Favorite
          </span>
        </div>

        {/* Exclusive Button */}
        <div className="relative group flex justify-center">
          <button
            onClick={LoginFirst}
            className="w-[clamp(40px,4vw,60px)] h-[clamp(40px,4vw,60px)]
            flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition shadow-[0_0_18px_rgba(255,255,0,0.7)]"
          >
            ⭐
          </button>

          <span
            className="absolute left-16 top-1/2 -translate-y-1/2 text-sm text-white bg-yellow-500/20 
            border border-yellow-300/40 backdrop-blur-md rounded-lg px-2 py-1 opacity-0 translate-x-2 
            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
          >
            Exclusive
          </span>
        </div>

      </div>
    </div>
  );
}
