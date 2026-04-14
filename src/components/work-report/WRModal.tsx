import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWorkReportAuth } from "./WorkReportContext";
import { useUpsertReport, WorkReport } from "@/hooks/useWorkReport";
import { toast } from "sonner";

const STATUSES = ["Completed", "Pending", "Assigned to Senior", "Call Booked", "Call Done"];
const PRIORITIES = ["High", "Medium", "Low"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editReport?: WorkReport | null;
}

const WRModal = ({ open, onOpenChange, editReport }: Props) => {
  const { user, isAdmin } = useWorkReportAuth();
  const upsert = useUpsertReport();

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
    };
  }

  // Reset form when dialog opens
  const handleOpenChange = (o: boolean) => {
    if (o) setForm(getDefaults(editReport));
    onOpenChange(o);
  };

  const handleSave = async () => {
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl border-[#1f2f47] text-white" style={{ background: "#111827" }}>
        <DialogHeader>
          <DialogTitle className="text-white">{editReport ? "Edit Report" : "Add Report"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Employee Name</label>
            <Input value={form.emp_name} readOnly={!isAdmin} onChange={(e) => set("emp_name", e.target.value)}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Date</label>
            <Input type="date" value={form.report_date} onChange={(e) => set("report_date", e.target.value)}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Task Description</label>
            <Textarea value={form.task} onChange={(e) => set("task", e.target.value)} rows={3}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Status</label>
            <Select value={form.status} onValueChange={(v) => set("status", v)}>
              <SelectTrigger className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Priority</label>
            <Select value={form.priority} onValueChange={(v) => set("priority", v)}>
              <SelectTrigger className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Progress %</label>
            <Input type="number" min={0} max={100} value={form.progress} onChange={(e) => set("progress", Number(e.target.value))}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Time Spent (hrs)</label>
            <Input type="number" min={0} step={0.5} value={form.time_spent} onChange={(e) => set("time_spent", Number(e.target.value))}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Assigned Senior</label>
            <Input value={form.assigned_senior} onChange={(e) => set("assigned_senior", e.target.value)}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Client / Contact</label>
            <Input value={form.client_name} onChange={(e) => set("client_name", e.target.value)}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Remarks</label>
            <Input value={form.remarks || ""} onChange={(e) => set("remarks", e.target.value)}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
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
