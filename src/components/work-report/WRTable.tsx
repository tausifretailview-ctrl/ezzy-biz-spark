import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWorkReports, useDeleteReport, WorkReport } from "@/hooks/useWorkReport";
import { useWRMasters } from "@/hooks/useWRMasters";
import { useWorkReportAuth } from "./WorkReportContext";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import WRModal from "./WRModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const WORK_STATUS_TABS = ["All", "Finish", "Pending", "Forward to Senior"];

const callTypeBadge = (type: string | null) => {
  if (!type) return <span className="text-[#64748b] text-xs">—</span>;
  const map: Record<string, { icon: string; cls: string }> = {
    "Online": { icon: "🌐", cls: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    "Telephonic": { icon: "📞", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    "WhatsApp Call": { icon: "💬", cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    "Site Visit": { icon: "🏢", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  };
  const s = map[type] || { icon: "", cls: "bg-gray-500/20 text-gray-400" };
  return <Badge className={s.cls}>{s.icon} {type}</Badge>;
};

const workStatusBadge = (status: string | null) => {
  if (!status) return <span className="text-[#64748b] text-xs">—</span>;
  if (/finish|done|complete/i.test(status))
    return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✓ {status}</Badge>;
  if (/pending/i.test(status))
    return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">⏳ {status}</Badge>;
  if (/forward|senior/i.test(status))
    return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">↑ {status}</Badge>;
  return <Badge className="bg-gray-500/20 text-gray-400">{status}</Badge>;
};

const getInitials = (name: string) => name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
const avatarColor = (name: string) => {
  const colors = ["#22d3ee", "#a855f7", "#f59e0b", "#22c55e", "#ef4444", "#3b82f6"];
  let hash = 0;
  for (const c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n) + "…" : s);

const WRTable = () => {
  const { user, isAdmin } = useWorkReportAuth();
  const [workStatusTab, setWorkStatusTab] = useState("All");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [problemFilter, setProblemFilter] = useState("all");
  const [callFilter, setCallFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editReport, setEditReport] = useState<WorkReport | null>(null);

  const { data: customers = [] } = useWRMasters("customer");
  const { data: problemTypes = [] } = useWRMasters("problem_type");
  const { data: callTypes = [] } = useWRMasters("call_type");

  const deleteReport = useDeleteReport();

  const { data: reports, isLoading } = useWorkReports({
    empId: user?.userId,
    isAdmin,
    work_status: workStatusTab !== "All" ? workStatusTab : undefined,
    customer_name: customerFilter !== "all" ? customerFilter : undefined,
    problem_type: problemFilter !== "all" ? problemFilter : undefined,
    call_type: callFilter !== "all" ? callFilter : undefined,
    dateFrom: dateFilter || undefined,
    dateTo: dateFilter || undefined,
    search: search || undefined,
  });

  const handleEdit = (r: WorkReport) => { setEditReport(r); setModalOpen(true); };
  const handleAdd = () => { setEditReport(null); setModalOpen(true); };
  const handleDelete = async (id: string) => {
    try { await deleteReport.mutateAsync(id); toast.success("Report deleted"); }
    catch { toast.error("Failed to delete"); }
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#64748b" }} />
            <Input placeholder="Search tasks, employee, customer..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-[#1f2f47] text-white placeholder:text-[#64748b]" style={{ background: "#1a2336" }} />
          </div>
          <Select value={customerFilter} onValueChange={setCustomerFilter}>
            <SelectTrigger className="w-[160px] border-[#1f2f47] text-white" style={{ background: "#1a2336" }}>
              <SelectValue placeholder="Customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              {customers.map((c) => <SelectItem key={c.id} value={c.label}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={problemFilter} onValueChange={setProblemFilter}>
            <SelectTrigger className="w-[150px] border-[#1f2f47] text-white" style={{ background: "#1a2336" }}>
              <SelectValue placeholder="Problem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {problemTypes.map((p) => <SelectItem key={p.id} value={p.label}>{p.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={callFilter} onValueChange={setCallFilter}>
            <SelectTrigger className="w-[140px] border-[#1f2f47] text-white" style={{ background: "#1a2336" }}>
              <SelectValue placeholder="Call Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Calls</SelectItem>
              {callTypes.map((c) => <SelectItem key={c.id} value={c.label}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
            className="w-[160px] border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          <Button onClick={handleAdd} style={{ background: "#22d3ee", color: "#0b1120" }}>
            <Plus className="w-4 h-4 mr-1" /> Add Report
          </Button>
        </div>

        {/* Work Status Tabs */}
        <div className="flex gap-1 flex-wrap">
          {WORK_STATUS_TABS.map((tab) => (
            <Button key={tab} size="sm" variant={workStatusTab === tab ? "default" : "outline"}
              onClick={() => setWorkStatusTab(tab)}
              className={workStatusTab === tab ? "text-[#0b1120]" : "border-[#1f2f47] text-white"}
              style={workStatusTab === tab ? { background: "#22d3ee" } : { background: "transparent" }}>
              {tab === "Forward to Senior" ? "Forward" : tab}
            </Button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-lg border border-[#1f2f47] overflow-x-auto" style={{ background: "#111827" }}>
          <Table>
            <TableHeader>
              <TableRow className="border-[#1f2f47]">
                <TableHead className="text-[#64748b]">#</TableHead>
                <TableHead className="text-[#64748b]">Employee</TableHead>
                <TableHead className="text-[#64748b]">Customer</TableHead>
                <TableHead className="text-[#64748b] hidden md:table-cell">Problem</TableHead>
                <TableHead className="text-[#64748b] hidden md:table-cell">Call Type</TableHead>
                <TableHead className="text-[#64748b] hidden md:table-cell">Time</TableHead>
                <TableHead className="text-[#64748b]">Work Status</TableHead>
                <TableHead className="text-[#64748b]">Task</TableHead>
                <TableHead className="text-[#64748b]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-[#1f2f47]">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !reports?.length ? (
                <TableRow className="border-[#1f2f47]">
                  <TableCell colSpan={9} className="text-center py-8" style={{ color: "#64748b" }}>
                    No reports found. Click "Add Report" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((r, idx) => (
                  <TableRow key={r.id} className="border-[#1f2f47]">
                    <TableCell className="text-white text-xs">{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: avatarColor(r.emp_name) }}>
                          {getInitials(r.emp_name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{r.emp_name}</p>
                          <p className="text-[10px]" style={{ color: "#64748b" }}>{r.report_date}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white text-sm max-w-[140px]">
                      {r.customer_name ? (
                        <Tooltip>
                          <TooltipTrigger asChild><span className="truncate block">{r.customer_name}</span></TooltipTrigger>
                          <TooltipContent>{r.customer_name}</TooltipContent>
                        </Tooltip>
                      ) : <span className="text-[#64748b]">—</span>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {r.problem_type ? (
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">{r.problem_type}</Badge>
                      ) : <span className="text-[#64748b] text-xs">—</span>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{callTypeBadge(r.call_type)}</TableCell>
                    <TableCell className="hidden md:table-cell text-white text-xs font-mono">
                      {r.time_consumed ? `${r.time_consumed}h` : "—"}
                    </TableCell>
                    <TableCell>{workStatusBadge(r.work_status)}</TableCell>
                    <TableCell className="text-white text-sm max-w-[200px]">
                      <Tooltip>
                        <TooltipTrigger asChild><span className="truncate block">{truncate(r.task, 40)}</span></TooltipTrigger>
                        <TooltipContent className="max-w-md">{r.task}</TooltipContent>
                      </Tooltip>
                    </TableCell>
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
    </TooltipProvider>
  );
};

export default WRTable;
