import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWorkReports } from "@/hooks/useWorkReport";
import { useWorkReportAuth } from "./WorkReportContext";
import { useState, useMemo } from "react";
import { ClipboardCheck, Clock, UserCheck, PhoneCall, PhoneForwarded, ListTodo } from "lucide-react";
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
    return {
      total: reports.length,
      completed: reports.filter(r => r.status === "Completed" || r.status === "Call Done").length,
      pending: reports.filter(r => r.status === "Pending").length,
      toSenior: reports.filter(r => r.status === "Assigned to Senior").length,
      callsBooked: reports.filter(r => r.status === "Call Booked").length,
      callsDone: reports.filter(r => r.status === "Call Done").length,
    };
  }, [reports]);

  const cards = [
    { label: "Total Tasks", value: stats?.total, icon: ListTodo, color: "#22d3ee" },
    { label: "Completed", value: stats?.completed, icon: ClipboardCheck, color: "#22c55e" },
    { label: "Pending", value: stats?.pending, icon: Clock, color: "#f59e0b" },
    { label: "To Senior", value: stats?.toSenior, icon: UserCheck, color: "#a855f7" },
    { label: "Calls Booked", value: stats?.callsBooked, icon: PhoneCall, color: "#22d3ee" },
    { label: "Calls Done", value: stats?.callsDone, icon: PhoneForwarded, color: "#22c55e" },
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
