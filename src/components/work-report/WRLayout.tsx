import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWorkReportAuth } from "./WorkReportContext";
import { useWorkReportUsers } from "@/hooks/useWorkReport";
import { ClipboardList, BarChart3, Users, LogOut, FileSpreadsheet, FileText, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const WRLayout = ({ children, activeTab, onTabChange }: Props) => {
  const { user, isAdmin, logout } = useWorkReportAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: ClipboardList },
    ...(isAdmin ? [{ id: "employees", label: "Employees", icon: Users }] : []),
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#0b1120" }}>
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-16" : "w-56"} transition-all duration-200 flex flex-col border-r border-[#1f2f47] shrink-0`}
        style={{ background: "#111827" }}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#1f2f47]">
          {!collapsed && <span className="text-white font-bold text-sm">Work Report</span>}
          <Button size="icon" variant="ghost" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
            <Menu className="w-4 h-4" style={{ color: "#22d3ee" }} />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === item.id ? "text-[#0b1120]" : "text-white hover:bg-[#1a2336]"
              }`}
              style={activeTab === item.id ? { background: "#22d3ee" } : undefined}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-[#1f2f47] space-y-2">
          {!collapsed && (
            <div className="px-2">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-[10px] font-mono" style={{ color: "#64748b" }}>{user?.userId} • {user?.role}</p>
            </div>
          )}
          <Button size="sm" variant="ghost" onClick={() => { logout(); }} className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut className="w-4 h-4 mr-2" />
            {!collapsed && "Logout"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => navigate("/")} className="w-full justify-start text-white hover:bg-[#1a2336]">
            {!collapsed && "← Back to Site"}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default WRLayout;
