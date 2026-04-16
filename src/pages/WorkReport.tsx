import { useState } from "react";
import { WorkReportProvider, useWorkReportAuth } from "@/components/work-report/WorkReportContext";
import WRLogin from "@/components/work-report/WRLogin";
import WRLayout from "@/components/work-report/WRLayout";
import WRDashboard from "@/components/work-report/WRDashboard";
import WRTable from "@/components/work-report/WRTable";
import WRCharts from "@/components/work-report/WRCharts";
import WRUserModal from "@/components/work-report/WRUserModal";
import WRMasters from "@/components/work-report/WRMasters";
import { useWorkReportUsers } from "@/hooks/useWorkReport";
import { useWorkReports } from "@/hooks/useWorkReport";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, FileSpreadsheet, FileText } from "lucide-react";
import { exportToExcel, exportToPDF } from "@/utils/workReportExport";

const WorkReportInner = () => {
  const { user, isAdmin } = useWorkReportAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userModalOpen, setUserModalOpen] = useState(false);

  if (!user) return <WRLogin />;

  return (
    <WRLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "dashboard" && <DashboardView />}
      {activeTab === "reports" && <ReportsView />}
      {activeTab === "employees" && isAdmin && <EmployeesView onOpenModal={() => setUserModalOpen(true)} />}
      {isAdmin && <WRUserModal open={userModalOpen} onOpenChange={setUserModalOpen} />}
    </WRLayout>
  );
};

const DashboardView = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
    <WRMasters />
    <WRDashboard />
    <WRCharts />
  </div>
);

const ReportsView = () => {
  const { user, isAdmin } = useWorkReportAuth();
  const { data: reports } = useWorkReports({ empId: user?.userId, isAdmin });

  const handleExcel = () => {
    if (reports?.length) exportToExcel(reports);
  };

  const handlePDF = () => {
    if (!reports?.length) return;
    const m = (val: string | null, re: RegExp) => !!val && re.test(val);
    const finish = reports.filter(r => m(r.work_status, /finish|done|complete/i)).length;
    const pending = reports.filter(r => m(r.work_status, /pending/i)).length;
    const forwarded = reports.filter(r => m(r.work_status, /forward|senior/i)).length;
    const online = reports.filter(r => r.call_type === "Online" || r.call_type === "WhatsApp Call").length;
    const telephonic = reports.filter(r => r.call_type === "Telephonic").length;
    exportToPDF(reports, user?.name || "", { total: reports.length, finish, pending, forwarded, online, telephonic });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-white">Work Reports</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleExcel} className="border-[#1f2f47] text-white">
            <FileSpreadsheet className="w-4 h-4 mr-1" /> Excel
          </Button>
          <Button size="sm" variant="outline" onClick={handlePDF} className="border-[#1f2f47] text-white">
            <FileText className="w-4 h-4 mr-1" /> PDF
          </Button>
        </div>
      </div>
      <WRTable />
    </div>
  );
};

const EmployeesView = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const { data: users, isLoading } = useWorkReportUsers();

  const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const avatarColor = (name: string) => {
    const colors = ["#22d3ee", "#a855f7", "#f59e0b", "#22c55e", "#ef4444", "#3b82f6"];
    let hash = 0;
    for (const c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Employees</h1>
        <Button onClick={onOpenModal} style={{ background: "#22d3ee", color: "#0b1120" }}>
          <UserPlus className="w-4 h-4 mr-1" /> Add Employee
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {isLoading ? (
          <p className="text-[#64748b]">Loading...</p>
        ) : !users?.length ? (
          <p className="text-[#64748b]">No employees yet.</p>
        ) : (
          users.map((u) => (
            <Card key={u.id} className="border-[#1f2f47]" style={{ background: "#111827" }}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: avatarColor(u.name) }}>
                  {getInitials(u.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{u.name}</p>
                  <p className="text-[10px] font-mono" style={{ color: "#64748b" }}>{u.user_id}</p>
                  <p className="text-[10px]" style={{ color: "#64748b" }}>{u.role} • {u.department || "—"}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

const WorkReport = () => (
  <WorkReportProvider>
    <WorkReportInner />
  </WorkReportProvider>
);

export default WorkReport;
