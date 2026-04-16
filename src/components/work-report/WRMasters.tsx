import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus, Check, X, ChevronDown, ChevronUp, Settings } from "lucide-react";
import { toast } from "sonner";
import {
  useWRMasters,
  useAddMaster,
  useUpdateMaster,
  useDeleteMaster,
  MasterType,
} from "@/hooks/useWRMasters";
import { useWorkReportAuth } from "./WorkReportContext";

const TABS: { value: MasterType; label: string }[] = [
  { value: "customer", label: "Customers" },
  { value: "problem_type", label: "Problem Types" },
  { value: "call_type", label: "Call Types" },
  { value: "status", label: "Work Status" },
];

const TYPE_COLORS: Record<MasterType, string> = {
  customer: "#22d3ee",
  problem_type: "#a855f7",
  call_type: "#3b82f6",
  status: "#22c55e",
};

const MasterTab = ({ type }: { type: MasterType }) => {
  const { user } = useWorkReportAuth();
  const { data: items = [], isLoading } = useWRMasters(type, true);
  const add = useAddMaster();
  const update = useUpdateMaster();
  const del = useDeleteMaster();

  const [newLabel, setNewLabel] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");

  const handleAdd = async () => {
    const label = newLabel.trim();
    if (!label) return;
    try {
      await add.mutateAsync({
        master_type: type,
        label,
        created_by: user?.userId,
        sort_order: items.length + 1,
      });
      setNewLabel("");
      toast.success("Added");
    } catch (e: any) {
      toast.error(e?.message || "Failed to add");
    }
  };

  const startEdit = (id: string, label: string) => {
    setEditingId(id);
    setEditLabel(label);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await update.mutateAsync({ id: editingId, label: editLabel.trim() });
      setEditingId(null);
      toast.success("Updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this option? Existing entries using it won't be affected.")) return;
    try {
      await del.mutateAsync(id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggle = async (id: string, is_active: boolean) => {
    try {
      await update.mutateAsync({ id, is_active });
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-2">
      {isLoading ? (
        <p className="text-xs" style={{ color: "#64748b" }}>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-xs py-3 text-center" style={{ color: "#64748b" }}>
          No items yet. Add one below.
        </p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 p-2 rounded border"
            style={{ background: "#1a2336", borderColor: "#1f2f47" }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: TYPE_COLORS[type] }}
            />
            {editingId === item.id ? (
              <>
                <Input
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="h-7 text-xs border-[#1f2f47] text-white"
                  style={{ background: "#111827" }}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                />
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={saveEdit}>
                  <Check className="w-3 h-3 text-green-400" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingId(null)}>
                  <X className="w-3 h-3 text-red-400" />
                </Button>
              </>
            ) : (
              <>
                <span className={`flex-1 text-sm ${item.is_active ? "text-white" : "text-[#64748b] line-through"}`}>
                  {item.label}
                </span>
                <Switch
                  checked={item.is_active}
                  onCheckedChange={(v) => handleToggle(item.id, v)}
                />
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startEdit(item.id, item.label)}>
                  <Pencil className="w-3 h-3" style={{ color: "#22d3ee" }} />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-3 h-3 text-red-400" />
                </Button>
              </>
            )}
          </div>
        ))
      )}

      <div className="flex gap-2 pt-2">
        <Input
          placeholder={`Add new ${type.replace("_", " ")}...`}
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="border-[#1f2f47] text-white placeholder:text-[#64748b]"
          style={{ background: "#1a2336" }}
        />
        <Button onClick={handleAdd} disabled={add.isPending} style={{ background: "#22d3ee", color: "#0b1120" }}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
    </div>
  );
};

const TabBadge = ({ type }: { type: MasterType }) => {
  const { data } = useWRMasters(type, true);
  return (
    <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#1f2f47", color: "#64748b" }}>
      {data?.length || 0}
    </span>
  );
};

const WRMasters = () => {
  const { isAdmin } = useWorkReportAuth();
  const [open, setOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <Card className="border-[#1f2f47]" style={{ background: "#111827" }}>
      <CardContent className="p-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" style={{ color: "#22d3ee" }} />
            <span className="text-white font-medium text-sm">Manage Dropdown Masters</span>
          </div>
          {open ? (
            <ChevronUp className="w-4 h-4" style={{ color: "#64748b" }} />
          ) : (
            <ChevronDown className="w-4 h-4" style={{ color: "#64748b" }} />
          )}
        </button>

        {open && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <Tabs defaultValue="customer">
              <TabsList className="bg-[#1a2336] border border-[#1f2f47]">
                {TABS.map((t) => (
                  <TabsTrigger
                    key={t.value}
                    value={t.value}
                    className="data-[state=active]:bg-[#22d3ee] data-[state=active]:text-[#0b1120] text-white text-xs"
                  >
                    {t.label}
                    <TabBadge type={t.value} />
                  </TabsTrigger>
                ))}
              </TabsList>
              {TABS.map((t) => (
                <TabsContent key={t.value} value={t.value} className="mt-4">
                  <MasterTab type={t.value} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WRMasters;
