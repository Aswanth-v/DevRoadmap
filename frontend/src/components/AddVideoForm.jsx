import { useState } from "react";
import axios from "axios";

const AddVideoForm = ({ onUploaded }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [mainlanguages, setMainlanguages] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [channelname, setChannelname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVideo = {
      core: mainlanguages,
      url,
      thumbnail,
      channelName: channelname,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/upload`, newVideo);

      setMainlanguages("");
      setUrl("");
      setThumbnail("");
      setChannelname("");
      setIsOpen(false); // close sheet on success
      onUploaded?.();
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed top-4 right-4 
          rounded-lg 
         bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-teal-500/20
          ring-2 ring-emerald-300/40 shadow-xl shadow-emerald-900/50
          backdrop-blur-md hover:scale-105 hover:shadow-emerald-500/30
          transition-all duration-200 
          text-sm px-2 py-1 sm:px-4 sm:py-2 sm:text-base
          z-50
        "
      >
        Upload
      </button>

      {/* Sheet Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sheet Content */}
      {isOpen && (
        <div
          className="
            fixed right-0 top-0 h-full w-[380px] z-50
            bg-transparent
            
            animate-slide-in
            p-6
          "
        >
          <h2 className="text-xl font-bold text-emerald-300">Add New Video</h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <input
              type="text"
              placeholder="Main languages"
              className="input-style  bg-transparent"
              value={mainlanguages}
              onChange={(e) => setMainlanguages(e.target.value)}
            />

            <input
              type="text"
              placeholder="YouTube link"
              className="input-style bg-transparent"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <input
              type="text"
              placeholder="Thumbnail"
              className="input-style bg-transparent"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Channel name"
              className="input-style bg-transparent"
              value={channelname}
              onChange={(e) => setChannelname(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  px-4 py-2 rounded-md 
                  border border-white/20 
                  hover:bg-white/10
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  px-4 py-2 rounded-md 
                  bg-emerald-500 text-black font-semibold
                  hover:bg-emerald-400
                "
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddVideoForm;
