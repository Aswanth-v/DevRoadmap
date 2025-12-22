import { useSelector } from "react-redux";
import { useState } from "react";
import VideoList from "../../components/VideoList";
import AddVideoForm from "../../components/AddVideoForm";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Home } from "lucide-react";

const Exclusive = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin"; // true only for admin
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-neutral-950 via-black to-emerald-950 text-white overflow-x-hidden overflow-y-auto">
      {/* Background glows */}
      <div className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

      {/* Navigation Button */}
      <button
        onClick={() => navigate(isAdmin ? "/dashboard" : "/")}
        className="fixed top-4 left-4 flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-teal-500/20 ring-2 ring-emerald-300/40 shadow-xl shadow-emerald-900/50 backdrop-blur-md hover:scale-105 hover:shadow-emerald-500/30 transition-all duration-200 z-50"
      >
        {isAdmin ? (
          <LayoutDashboard size={20} className="text-emerald-200" />
        ) : (
          <Home size={20} className="text-emerald-200" />
        )}
      </button>

      {/* Main Content */}
      <div className="pt-24 pb-10 max-w-4xl mx-auto px-6">
        <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300 bg-clip-text text-transparent">
          Video Library
        </h1>

        <div className="mt-10">
          <VideoList refresh={refresh} isAdmin={isAdmin} onUploaded={() => setRefresh(prev => !prev)} />
        </div>

        {isAdmin && (
          <>
            <hr className="my-10 border-white/20" />
            <AddVideoForm onUploaded={() => setRefresh(prev => !prev)} isAdmin={isAdmin} />
          </>
        )}
      </div>
    </div>
  );
};

export default Exclusive;
