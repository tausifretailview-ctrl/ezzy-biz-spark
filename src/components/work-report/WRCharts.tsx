import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkReports } from "@/hooks/useWorkReport";
import { useWorkReportAuth } from "./WorkReportContext";

const STATUS_COLORS: Record<string, string> = {
  Completed: "#22c55e",
  Pending: "#f59e0b",
  "Assigned to Senior": "#a855f7",
  "Call Booked": "#22d3ee",
  "Call Done": "#10b981",
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WRCharts = () => {
  const { user, isAdmin } = useWorkReportAuth();
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 6);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const { data: reports } = useWorkReports({
    empId: user?.userId,
    isAdmin,
    dateFrom: fmt(weekStart),
    dateTo: fmt(now),
  });

  const barData = useMemo(() => {
    const days: { name: string; completed: number; date: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = fmt(d);
      const count = reports?.filter(
        (r) => r.report_date === dateStr && (r.status === "Completed" || r.status === "Call Done")
      ).length ?? 0;
      days.push({ name: DAY_NAMES[d.getDay()], completed: count, date: dateStr });
    }
    return days;
  }, [reports]);

  const donutData = useMemo(() => {
    if (!reports?.length) return [];
    const counts: Record<string, number> = {};
    reports.forEach((r) => {
      counts[r.status] = (counts[r.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [reports]);

  const completionPct = useMemo(() => {
    if (!reports?.length) return 0;
    const done = reports.filter((r) => r.status === "Completed" || r.status === "Call Done").length;
    return Math.round((done / reports.length) * 100);
  }, [reports]);

  const todayStr = fmt(now);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="border-[#1f2f47]" style={{ background: "#111827" }}>
        <CardHeader><CardTitle className="text-white text-sm">Weekly Task Completion</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2f47" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#1a2336", border: "1px solid #1f2f47", color: "#fff" }} />
              <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                {barData.map((entry) => (
                  <Cell key={entry.date} fill={entry.date === todayStr ? "#22d3ee" : "#0e7490"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-[#1f2f47]" style={{ background: "#111827" }}>
        <CardHeader><CardTitle className="text-white text-sm">Status Breakdown</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center">
          {donutData.length === 0 ? (
            <p style={{ color: "#64748b" }} className="text-sm">No data</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}>
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#64748b"} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ color: "#fff", fontSize: 12 }} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#22d3ee" fontSize={18} fontWeight="bold">
                  {completionPct}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WRCharts;
