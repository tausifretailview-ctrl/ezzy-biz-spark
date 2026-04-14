import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWorkReports, useDeleteReport, WorkReport } from "@/hooks/useWorkReport";
import { useWorkReportAuth } from "./WorkReportContext";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import WRModal from "./WRModal";
import { toast } from "sonner";

const STATUS_TABS = ["All", "Completed", "Pending", "Assigned to Senior", "Call Booked", "Call Done"];

const statusBadge = (status: string) => {
  const map: Record<string, { label: string; cls: string }> = {
    Completed: { label: "✓ Done", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    Pending: { label: "⏳ Pending", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    "Assigned to Senior": { label: "↑ Senior", cls: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    "Call Booked": { label: "📞 Booked", cls: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
    "Call Done": { label: "📞 Done", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
  };
  const s = map[status] || { label: status, cls: "bg-gray-500/20 text-gray-400" };
  return <Badge className={s.cls}>{s.label}</Badge>;
};

const priorityDot = (p: string) => {
  const color = p === "High" ? "#ef4444" : p === "Medium" ? "#f59e0b" : "#22c55e";
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
      <span className="text-xs text-white">{p}</span>
    </span>
  );
};

const getInitials = (name: string) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
const avatarColor = (name: string) => {
  const colors = ["#22d3ee", "#a855f7", "#f59e0b", "#22c55e", "#ef4444", "#3b82f6"];
  let hash = 0;
  for (const c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const WRTable = () => {
  const { user, isAdmin } = useWorkReportAuth();
  const [statusTab, setStatusTab] = useState("All");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editReport, setEditReport] = useState<WorkReport | null>(null);

  const deleteReport = useDeleteReport();

  const { data: reports, isLoading } = useWorkReports({
    empId: user?.userId,
    isAdmin,
    status: statusTab !== "All" ? statusTab : undefined,
    priority: priority && priority !== "all_priorities" ? priority : undefined,
    dateFrom: dateFilter || undefined,
    dateTo: dateFilter || undefined,
    search: search || undefined,
  });

  const handleEdit = (r: WorkReport) => {
    setEditReport(r);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReport.mutateAsync(id);
      toast.success("Report deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleAdd = () => {
    setEditReport(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#64748b" }} />
          <Input placeholder="Search tasks or employee..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border-[#1f2f47] text-white placeholder:text-[#64748b]" style={{ background: "#1a2336" }} />
        </div>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-[130px] border-[#1f2f47] text-white" style={{ background: "#1a2336" }}>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_priorities">All</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
          className="w-[160px] border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
        <Button onClick={handleAdd} style={{ background: "#22d3ee", color: "#0b1120" }}>
          <Plus className="w-4 h-4 mr-1" /> Add Report
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 flex-wrap">
        {STATUS_TABS.map((tab) => (
          <Button key={tab} size="sm" variant={statusTab === tab ? "default" : "outline"}
            onClick={() => setStatusTab(tab)}
            className={statusTab === tab ? "text-[#0b1120]" : "border-[#1f2f47] text-white"}
            style={statusTab === tab ? { background: "#22d3ee" } : { background: "transparent" }}>
            {tab === "Completed" ? "Done" : tab === "Assigned to Senior" ? "To Senior" : tab === "Call Booked" || tab === "Call Done" ? "Calls" : tab}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#1f2f47] overflow-hidden" style={{ background: "#111827" }}>
        <Table>
          <TableHeader>
            <TableRow className="border-[#1f2f47]">
              <TableHead className="text-[#64748b]">#</TableHead>
              <TableHead className="text-[#64748b]">Employee</TableHead>
              <TableHead className="text-[#64748b]">Task</TableHead>
              <TableHead className="text-[#64748b]">Priority</TableHead>
              <TableHead className="text-[#64748b]">Status</TableHead>
              <TableHead className="text-[#64748b]">Progress</TableHead>
              <TableHead className="text-[#64748b]">Time</TableHead>
              <TableHead className="text-[#64748b]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-[#1f2f47]">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : !reports?.length ? (
              <TableRow className="border-[#1f2f47]">
                <TableCell colSpan={8} className="text-center py-8" style={{ color: "#64748b" }}>
                  No reports found. Click "Add Report" to create one.
                </TableCell>
              </TableRow>
            ) : (
              reports.map((r, idx) => (
                <TableRow key={r.id} className="border-[#1f2f47]">
                  <TableCell className="text-white text-xs">{idx + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: avatarColor(r.emp_name) }}>
                        {getInitials(r.emp_name)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{r.emp_name}</p>
                        <p className="text-[10px]" style={{ color: "#64748b" }}>{r.report_date}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white text-sm max-w-[200px] truncate">{r.task}</TableCell>
                  <TableCell>{priorityDot(r.priority)}</TableCell>
                  <TableCell>{statusBadge(r.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={r.progress} className="h-1.5 w-16" />
                      <span className="text-xs text-white">{r.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white text-xs">{r.time_spent}h</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {(isAdmin || r.emp_id === user?.userId) && (
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(r)} className="h-7 w-7">
                          <Pencil className="w-3 h-3" style={{ color: "#22d3ee" }} />
                        </Button>
                      )}
                      {isAdmin && (
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(r.id)} className="h-7 w-7">
                          <Trash2 className="w-3 h-3 text-red-400" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <WRModal open={modalOpen} onOpenChange={setModalOpen} editReport={editReport} />
    </div>
  );
};

export default WRTable;
