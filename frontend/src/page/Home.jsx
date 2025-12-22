import React from "react";
import data from "../udata.json"; // ensure this file is at frontend/src/udata.json
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
const Home = () => {
  const videos = data?.items ?? [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-950 via-black to-emerald-950 text-neutral-100">
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />
      
        <TopBar/>
      
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">
              DevRoadmap
            </span>
          </h1>
          <p className="mt-4 text-lg text-white/70 animate-breath">
  Your learning companion — explore resources, and grow your developer journey.  
  <span className="block text-white/80 font-semibold">
    For Exclusive Content Sorted By Experts — Login
  </span>
</p>

        </header>

        {/* Video grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((item) => {
            const id = item.id?.videoId ?? item.etag;
            const s = item.snippet;
            const href = item.id?.videoId
              ? `https://www.youtube.com/watch?v=${item.id.videoId}`
              : undefined;

            return (
              <article
                key={id}
                className="group overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="relative aspect-video">
                  <img
                    src={s.thumbnails?.high?.url || s.thumbnails?.medium?.url}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Play overlay */}
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 grid place-items-center"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition rounded-full bg-emerald-500/90 px-4 py-3 text-sm font-semibold text-black shadow-md ring-1 ring-emerald-200/50">
                         Watch
                      </span>
                    </a>
                  )}
                </div>

                <div className="p-4">
                  <h3
                    className="text-base font-semibold text-white/90"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{s.channelTitle}</p>

                  <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                    <span className="rounded-full bg-emerald-400/10 px-2 py-1 font-medium text-emerald-300 ring-1 ring-emerald-400/20">
                      YouTube
                    </span>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-300 transition-colors hover:text-emerald-200"
                      >
                        Open ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

         
      
          <SideBar/>
    
        </div>
       
      </div>
      
    </div>
  );
};

export default Home;