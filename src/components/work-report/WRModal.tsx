import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWorkReportAuth } from "./WorkReportContext";
import { useUpsertReport, WorkReport } from "@/hooks/useWorkReport";
import { useWRMasters } from "@/hooks/useWRMasters";
import { toast } from "sonner";
import CustomerCombobox from "./CustomerCombobox";
import { Check, Clock, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUSES = ["Completed", "Pending", "Assigned to Senior", "Call Booked", "Call Done"];
const PRIORITIES = ["High", "Medium", "Low"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editReport?: WorkReport | null;
}

const statusIcon = (label: string) => {
  if (/finish|done|complete/i.test(label)) return <Check className="w-4 h-4" />;
  if (/pending/i.test(label)) return <Clock className="w-4 h-4" />;
  if (/forward|senior/i.test(label)) return <ArrowUp className="w-4 h-4" />;
  return null;
};

const statusPillStyle = (label: string, selected: boolean) => {
  let color = "#22d3ee";
  if (/finish|done|complete/i.test(label)) color = "#22c55e";
  else if (/pending/i.test(label)) color = "#f59e0b";
  else if (/forward|senior/i.test(label)) color = "#a855f7";
  return selected
    ? { background: color, color: "#0b1120", borderColor: color }
    : { background: "transparent", color: "#fff", borderColor: "#1f2f47" };
};

const WRModal = ({ open, onOpenChange, editReport }: Props) => {
  const { user, isAdmin } = useWorkReportAuth();
  const upsert = useUpsertReport();

  const { data: problemTypes = [] } = useWRMasters("problem_type");
  const { data: callTypes = [] } = useWRMasters("call_type");
  const { data: workStatuses = [] } = useWRMasters("status");

  const [form, setForm] = useState(() => getDefaults(editReport));

  function getDefaults(r?: WorkReport | null) {
    return {
      emp_name: r?.emp_name || user?.name || "",
      emp_id: r?.emp_id || user?.userId || "",
      report_date: r?.report_date || new Date().toISOString().split("T")[0],
      task: r?.task || "",
      status: r?.status || "Pending",
      priority: r?.priority || "Medium",
      progress: r?.progress ?? 0,
      time_spent: r?.time_spent ?? 0,
      assigned_senior: r?.assigned_senior || "",
      client_name: r?.client_name || "",
      remarks: r?.remarks || "",
      customer_name: r?.customer_name || "",
      problem_type: r?.problem_type || "",
      call_type: r?.call_type || "",
      time_consumed: r?.time_consumed ?? 0,
      work_status: r?.work_status || "Pending",
    };
  }

  const handleOpenChange = (o: boolean) => {
    if (o) setForm(getDefaults(editReport));
    onOpenChange(o);
  };

  const handleSave = async () => {
    if (!form.customer_name.trim()) { toast.error("Customer name is required"); return; }
    if (!form.problem_type) { toast.error("Problem type is required"); return; }
    if (!form.call_type) { toast.error("Call type is required"); return; }
    if (!form.time_consumed || form.time_consumed <= 0) { toast.error("Time consumed must be greater than 0"); return; }
    if (!form.work_status) { toast.error("Work status is required"); return; }
    if (!form.task.trim()) { toast.error("Task description is required"); return; }
    try {
      await upsert.mutateAsync({ ...form, ...(editReport ? { id: editReport.id } : {}) });
      toast.success(editReport ? "Report updated" : "Report added");
      onOpenChange(false);
    } catch {
      toast.error("Failed to save report");
    }
  };

  const set = (key: string, val: any) => setForm((f) => ({ ...f, [key]: val }));

  const inputCls = "border-[#1f2f47] text-white";
  const inputStyle = { background: "#1a2336" };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl border-[#1f2f47] text-white max-h-[90vh] overflow-y-auto" style={{ background: "#111827" }}>
        <DialogHeader>
          <DialogTitle className="text-white">{editReport ? "Edit Report" : "Add Report"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee + Date */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Employee Name</label>
            <Input value={form.emp_name} readOnly={!isAdmin} onChange={(e) => set("emp_name", e.target.value)}
              className={inputCls} style={inputStyle} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Date</label>
            <Input type="date" value={form.report_date} onChange={(e) => set("report_date", e.target.value)}
              className={inputCls} style={inputStyle} />
          </div>

          {/* Customer + Problem Type */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Customer Name *</label>
            <CustomerCombobox value={form.customer_name} onChange={(v) => set("customer_name", v)} createdBy={user?.userId} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Problem Type *</label>
            <Select value={form.problem_type} onValueChange={(v) => set("problem_type", v)}>
              <SelectTrigger className={inputCls} style={inputStyle}>
                <SelectValue placeholder={problemTypes.length ? "Select..." : "No options — add in Masters"} />
              </SelectTrigger>
              <SelectContent>
                {problemTypes.map((p) => <SelectItem key={p.id} value={p.label}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Call Type + Time Consumed */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Call Type *</label>
            <Select value={form.call_type} onValueChange={(v) => set("call_type", v)}>
              <SelectTrigger className={inputCls} style={inputStyle}>
                <SelectValue placeholder={callTypes.length ? "Select..." : "No options — add in Masters"} />
              </SelectTrigger>
              <SelectContent>
                {callTypes.map((c) => <SelectItem key={c.id} value={c.label}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Time Consumed * (hrs)</label>
            <div className="relative">
              <Input type="number" min={0} step={0.5} value={form.time_consumed}
                onChange={(e) => set("time_consumed", Number(e.target.value))}
                className={`${inputCls} pr-12`} style={inputStyle} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "#64748b" }}>hrs</span>
            </div>
            <p className="text-[10px]" style={{ color: "#64748b" }}>e.g. 0.5 = 30 min, 1 = 1 hr</p>
          </div>

          {/* Work Status pill selector */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs" style={{ color: "#64748b" }}>Work Status *</label>
            <div className="flex flex-wrap gap-2">
              {workStatuses.length === 0 ? (
                <p className="text-xs" style={{ color: "#64748b" }}>No options — add in Masters</p>
              ) : (
                workStatuses.map((s) => {
                  const selected = form.work_status === s.label;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => set("work_status", s.label)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all",
                        selected ? "shadow-md" : "hover:bg-[#1a2336]"
                      )}
                      style={statusPillStyle(s.label, selected)}
                    >
                      {statusIcon(s.label)}
                      {s.label}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Task */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Task Description *</label>
            <Textarea value={form.task} onChange={(e) => set("task", e.target.value)} rows={3}
              className={inputCls} style={inputStyle} />
          </div>

          {/* Internal status + priority */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Internal Status</label>
            <Select value={form.status} onValueChange={(v) => set("status", v)}>
              <SelectTrigger className={inputCls} style={inputStyle}><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Priority</label>
            <Select value={form.priority} onValueChange={(v) => set("priority", v)}>
              <SelectTrigger className={inputCls} style={inputStyle}><SelectValue /></SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Progress + Time Spent (existing) */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Progress %</label>
            <Input type="number" min={0} max={100} value={form.progress}
              onChange={(e) => set("progress", Number(e.target.value))} className={inputCls} style={inputStyle} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Total Time Spent (hrs)</label>
            <Input type="number" min={0} step={0.5} value={form.time_spent}
              onChange={(e) => set("time_spent", Number(e.target.value))} className={inputCls} style={inputStyle} />
          </div>

          {/* Senior + Client */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Assigned Senior</label>
            <Input value={form.assigned_senior} onChange={(e) => set("assigned_senior", e.target.value)}
              className={inputCls} style={inputStyle} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Contact</label>
            <Input value={form.client_name} onChange={(e) => set("client_name", e.target.value)}
              className={inputCls} style={inputStyle} />
          </div>

          {/* Remarks */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Remarks</label>
            <Input value={form.remarks || ""} onChange={(e) => set("remarks", e.target.value)}
              className={inputCls} style={inputStyle} />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[#1f2f47] text-white">Cancel</Button>
          <Button onClick={handleSave} disabled={upsert.isPending} style={{ background: "#22d3ee", color: "#0b1120" }}>
            {upsert.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WRModal;
