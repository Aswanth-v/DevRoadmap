import { useState } from "react";
import { Users, Star, Crown, LayoutDashboard, LogOut, Menu, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-slate-900 to-purple-900 text-white">

      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-300 flex flex-col py-6`}
      >
        <div className="flex items-center justify-between px-4 mb-10">
          <h1 className={`text-xl font-bold transition-all ${!open && "opacity-0"}`}>
            Admin Panel
          </h1>

          <button
            className="p-2 hover:bg-white/10 rounded-xl"
            onClick={() => setOpen(!open)}
          >
            <Menu size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          <NavItem icon={<LayoutDashboard />} text="Dashboard" open={open} />
          <NavItem icon={<Crown />} text="Exclusive Settings" open={open} onClick={() => navigate("/exclusive")} />
        </nav>

        <div className="mt-auto px-4">
          <NavItem
            icon={<LogOut />}
            text="Logout"
            open={open}
            logout
            onClick={() => dispatch(logout())}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <LayoutDashboard size={28} className="text-purple-400" />
          Admin Overview
        </h2>

        <p className="text-sm text-white/60 mb-6">
          Reference metrics for admin layout and configuration preview
        </p>

        {/* Stats Cards (STATIC / CONFIGURATION DATA) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            title="Max User Capacity"
            value="10,000"
            subtitle="System limit"
            icon={<Users size={40} className="text-blue-400" />}
          />

          <StatCard
            title="Exclusive Content Slots"
            value="50"
            subtitle="Admin controlled"
            icon={<Star size={40} className="text-yellow-400" />}
          />

          <StatCard
            title="Engagement Threshold"
            value="75%"
            subtitle="Recommendation baseline"
            icon={<Crown size={40} className="text-pink-400" />}
          />

          <StatCard
            title="Daily Upload Limit"
            value="20"
            subtitle="Per admin"
            icon={<Settings size={40} className="text-green-400" />}
          />

        </div>

        <p className="mt-4 text-xs text-white/50">
          *All values shown are static reference and configuration metrics. No live analytics applied.
        </p>

        {/* Instructions */}
        <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Admin Guidelines</h3>

          <ul className="space-y-4">
            <ActivityItem text="Use this panel to configure platform limits and settings." />
            <ActivityItem text="Exclusive content slots are manually controlled." />
            <ActivityItem text="Threshold values guide moderation decisions." />
            <ActivityItem text="This dashboard represents UI structure only." />
          </ul>
        </div>
      </main>
    </div>
  );
}

/* ----------- COMPONENTS ----------- */

function NavItem({ icon, text, open, logout, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all
        ${logout
          ? "text-red-400 hover:bg-red-400/10 border border-red-400/40"
          : "hover:bg-white/20"
        }`}
    >
      {icon}
      <span className={`${!open && "opacity-0"} transition-all`}>
        {text}
      </span>
    </button>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">{title}</h4>
        {icon}
      </div>

      <p className="text-3xl font-bold mt-3">{value}</p>

      <p className="text-xs text-white/60 mt-1">
        {subtitle}
      </p>
    </div>
  );
}

function ActivityItem({ text }) {
  return (
    <li className="flex items-center gap-3 text-white/80 bg-white/5 p-3 rounded-xl border border-white/10">
      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
      {text}
    </li>
  );
}
