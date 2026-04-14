import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WRUserModal = ({ open, onOpenChange }: Props) => {
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: "", user_id: "", password: "", role: "employee", department: "" });
  const [loading, setLoading] = useState(false);

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.user_id.trim() || !form.password.trim()) {
      toast.error("Name, User ID, and Password are required");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("work-report-auth", {
        body: {
          action: "register",
          user_id: form.user_id.trim(),
          password: form.password,
          name: form.name.trim(),
          role: form.role,
          department: form.department.trim() || null,
        },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      toast.success("Employee added successfully");
      qc.invalidateQueries({ queryKey: ["work-report-users"] });
      setForm({ name: "", user_id: "", password: "", role: "employee", department: "" });
      onOpenChange(false);
    } catch {
      toast.error("Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-[#1f2f47] text-white" style={{ background: "#111827" }}>
        <DialogHeader>
          <DialogTitle className="text-white">Add Employee</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Full Name</label>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>User ID</label>
            <Input value={form.user_id} onChange={(e) => set("user_id", e.target.value)} placeholder="e.g. EMP001"
              className="border-[#1f2f47] text-white font-mono placeholder:text-[#64748b]" style={{ background: "#1a2336" }} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Password</label>
            <Input type="password" value={form.password} onChange={(e) => set("password", e.target.value)}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Role</label>
            <Select value={form.role} onValueChange={(v) => set("role", v)}>
              <SelectTrigger className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs" style={{ color: "#64748b" }}>Department</label>
            <Input value={form.department} onChange={(e) => set("department", e.target.value)}
              className="border-[#1f2f47] text-white" style={{ background: "#1a2336" }} />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[#1f2f47] text-white">Cancel</Button>
          <Button onClick={handleSave} disabled={loading} style={{ background: "#22d3ee", color: "#0b1120" }}>
            {loading ? "Saving..." : "Add Employee"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WRUserModal;
