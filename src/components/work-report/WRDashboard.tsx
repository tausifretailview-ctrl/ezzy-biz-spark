import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWorkReports } from "@/hooks/useWorkReport";
import { useWorkReportAuth } from "./WorkReportContext";
import { useState, useMemo } from "react";
import { ClipboardCheck, Clock, ArrowUp, Globe, Phone, ListTodo } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type DateRange = "today" | "week" | "month";

const WRDashboard = () => {
  const { user, isAdmin } = useWorkReportAuth();
  const [range, setRange] = useState<DateRange>("today");

  const dateParams = useMemo(() => {
    const now = new Date();
    const fmt = (d: Date) => d.toISOString().split("T")[0];
    if (range === "today") return { dateFrom: fmt(now), dateTo: fmt(now) };
    if (range === "week") {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      return { dateFrom: fmt(start), dateTo: fmt(now) };
    }
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return { dateFrom: fmt(start), dateTo: fmt(now) };
  }, [range]);

  const { data: reports, isLoading } = useWorkReports({
    empId: user?.userId,
    isAdmin,
    ...dateParams,
  });

  const stats = useMemo(() => {
    if (!reports) return null;
    const matches = (val: string | null, re: RegExp) => !!val && re.test(val);
    return {
      total: reports.length,
      finish: reports.filter(r => matches(r.work_status, /finish|done|complete/i)).length,
      pending: reports.filter(r => matches(r.work_status, /pending/i)).length,
      forwarded: reports.filter(r => matches(r.work_status, /forward|senior/i)).length,
      online: reports.filter(r => r.call_type === "Online" || r.call_type === "WhatsApp Call").length,
      telephonic: reports.filter(r => r.call_type === "Telephonic").length,
    };
  }, [reports]);

  const cards = [
    { label: "Total Entries", value: stats?.total, icon: ListTodo, color: "#22d3ee" },
    { label: "Finish", value: stats?.finish, icon: ClipboardCheck, color: "#22c55e" },
    { label: "Pending", value: stats?.pending, icon: Clock, color: "#f59e0b" },
    { label: "Forwarded", value: stats?.forwarded, icon: ArrowUp, color: "#a855f7" },
    { label: "Online Calls", value: stats?.online, icon: Globe, color: "#3b82f6" },
    { label: "Telephonic", value: stats?.telephonic, icon: Phone, color: "#22c55e" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["today", "week", "month"] as DateRange[]).map((r) => (
          <Button
            key={r}
            size="sm"
            variant={range === r ? "default" : "outline"}
            onClick={() => setRange(r)}
            className={range === r ? "text-[#0b1120]" : "border-[#1f2f47] text-white"}
            style={range === r ? { background: "#22d3ee" } : { background: "transparent" }}
          >
            {r === "today" ? "Today" : r === "week" ? "This Week" : "This Month"}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((c) => (
          <Card key={c.label} className="border-[#1f2f47]" style={{ background: "#111827" }}>
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <c.icon className="w-6 h-6" style={{ color: c.color }} />
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <span className="text-2xl font-bold text-white">{c.value ?? 0}</span>
              )}
              <span className="text-xs" style={{ color: "#64748b" }}>{c.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WRDashboard;
