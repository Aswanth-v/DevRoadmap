import { useState } from "react";
import {
  Users,
  Star,
  Crown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-900 text-white flex">

      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 flex-col py-6">
        <SidebarContent
          navigate={navigate}
          dispatch={dispatch}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <aside className="relative w-64 h-full bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col py-6">
            <SidebarContent
              navigate={navigate}
              dispatch={dispatch}
              close={() => setOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-4 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <LayoutDashboard size={24} className="text-purple-400" />
            Admin Overview
          </h2>

          {/* Menu button only on small screens */}
          <button
            className="p-2 hover:bg-white/10 rounded-xl lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          <p className="text-xs sm:text-sm text-white/60 mb-6">
            Reference metrics for admin layout and configuration preview
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            <StatCard
              title="Max User Capacity"
              value="10,000"
              subtitle="System limit"
              icon={<Users size={32} className="text-blue-400" />}
            />

            <StatCard
              title="Exclusive Content Slots"
              value="50"
              subtitle="Admin controlled"
              icon={<Star size={32} className="text-yellow-400" />}
            />

            <StatCard
              title="Engagement Threshold"
              value="75%"
              subtitle="Recommendation baseline"
              icon={<Crown size={32} className="text-pink-400" />}
            />

            <StatCard
              title="Daily Upload Limit"
              value="20"
              subtitle="Per admin"
              icon={<Settings size={32} className="text-green-400" />}
            />

          </div>

          <p className="mt-4 text-xs text-white/50">
            *Static reference values. No live analytics applied.
          </p>

          {/* Info box */}
          <div className="mt-10 bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Admin Guidelines
            </h3>

            <ul className="space-y-3">
              <ActivityItem text="Use this panel to configure platform limits and settings." />
            <ActivityItem text="Exclusive content slots are manually controlled." />
            <ActivityItem text="Threshold values guide moderation decisions." />
            <ActivityItem text="This dashboard represents UI structure only." />
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- SIDEBAR CONTENT ---------- */

function SidebarContent({ navigate, dispatch, close }) {
  return (
    <>
      <div className="flex items-center justify-between px-4 mb-10">
        <h1 className="text-xl font-bold">Admin Panel</h1>

        {close && (
          <button
            className="p-2 hover:bg-white/10 rounded-xl"
            onClick={close}
          >
            ✕
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <NavItem
          icon={<LayoutDashboard />}
          text="Dashboard"
          onClick={close}
        />

        <NavItem
          icon={<Crown />}
          text="Exclusive Settings"
          onClick={() => {
            close?.();
            navigate("/exclusive");
          }}
        />
      </nav>

      <div className="mt-auto px-4">
        <NavItem
          icon={<LogOut />}
          text="Logout"
          logout
          onClick={() => dispatch(logout())}
        />
      </div>
    </>
  );
}

/* ---------- UI PIECES ---------- */

function NavItem({ icon, text, logout, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all
        ${
          logout
            ? "text-red-400 hover:bg-red-400/10 border border-red-400/40"
            : "hover:bg-white/20"
        }`}
    >
      {icon}
      <span className="text-sm sm:text-base">{text}</span>
    </button>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-base sm:text-lg font-medium">{title}</h4>
        {icon}
      </div>

      <p className="text-2xl sm:text-3xl font-bold mt-3">
        {value}
      </p>

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
      <span className="text-sm">{text}</span>
    </li>
  );
}
