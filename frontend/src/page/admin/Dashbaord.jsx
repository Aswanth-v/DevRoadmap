import { useState } from "react";
import { Users, Star, Crown, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { useSelector, useDispatch, } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate=useNavigate()
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

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4">
          <NavItem icon={<LayoutDashboard />} text="Dashboard" open={open} />
          <NavItem icon={<Crown />} text="Add Exclusive" open={open} onClick={()=>navigate('/exclusive')} />
        </nav>

        {/* Logout Button */}
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
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <LayoutDashboard size={28} className="text-purple-400" />
          Dashboard Overview
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            title="Total Users"
            value="1,204"
            icon={<Users size={40} className="text-blue-400" />}
          />

          <StatCard
            title="Exclusive Views"
            value="8,456"
            icon={<Star size={40} className="text-yellow-400" />}
          />

          <StatCard
            title="Favorites Marked"
            value="3,982"
            icon={<Crown size={40} className="text-pink-400" />}
          />

          <StatCard
            title="New Registrations"
            value="124"
            icon={<Users size={40} className="text-green-400" />}
          />

        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Admin Instruction</h3>

          <ul className="space-y-4">
            <ActivityItem text="Login every time to access admin tools." />
            <ActivityItem text="Add only important and useful videos." />
            <ActivityItem text="Verify content before adding to Exclusive." />
            <ActivityItem text="Ensure video links and thumbnails are valid." />
            <ActivityItem text="Remove outdated or duplicate content regularly." />
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

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-purple-500/30 transition">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">{title}</h4>
        {icon}
      </div>
      <p className="text-3xl font-bold mt-3">{value}</p>
    </div>
  );
}

function ActivityItem({ text }) {
  return (
    <li className="flex items-center gap-3 text-white/80 bg-white/5 p-3 rounded-xl border border-white/10">
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      {text}
    </li>
  );
}
