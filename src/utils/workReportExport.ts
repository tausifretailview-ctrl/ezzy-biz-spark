import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { WorkReport } from "@/hooks/useWorkReport";

const statusFillColor = (ws: string | null): string | null => {
  if (!ws) return null;
  if (/finish|done|complete/i.test(ws)) return "D1FAE5";
  if (/pending/i.test(ws)) return "FEF3C7";
  if (/forward|senior/i.test(ws)) return "EDE9FE";
  return null;
};

export const exportToExcel = (reports: WorkReport[], filename?: string) => {
  const rows = reports.map((r, i) => ({
    "#": i + 1,
    Employee: r.emp_name,
    Date: r.report_date,
    "Customer Name": r.customer_name || "",
    "Problem Type": r.problem_type || "",
    "Call Type": r.call_type || "",
    "Time Consumed (hrs)": r.time_consumed ?? 0,
    "Work Status": r.work_status || "",
    "Task Description": r.task,
    "Internal Status": r.status,
    Priority: r.priority,
    "Progress%": r.progress,
    Senior: r.assigned_senior || "",
    Remarks: r.remarks || "",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const headers = Object.keys(rows[0] || {});
  const colWidths = headers.map((key) => ({
    wch: Math.max(key.length, ...rows.map((r) => String((r as any)[key]).length)) + 2,
  }));
  ws["!cols"] = colWidths;

  // Color-code rows by Work Status
  const wsColIndex = headers.indexOf("Work Status");
  rows.forEach((row, i) => {
    const fill = statusFillColor(row["Work Status"]);
    if (!fill) return;
    headers.forEach((_, c) => {
      const ref = XLSX.utils.encode_cell({ r: i + 1, c });
      if (!ws[ref]) return;
      ws[ref].s = { fill: { fgColor: { rgb: fill } } };
    });
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Work Reports");

  const date = new Date().toISOString().split("T")[0];
  XLSX.writeFile(wb, filename || `EzzyERP_WorkReport_${date}.xlsx`);
};

export interface ExportStats {
  total: number;
  finish: number;
  pending: number;
  forwarded: number;
  online: number;
  telephonic: number;
}

export const exportToPDF = (
  reports: WorkReport[],
  userName: string,
  stats?: ExportStats
) => {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const date = new Date().toISOString().split("T")[0];
  const pageW = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(11, 17, 32);
  doc.rect(0, 0, pageW, 22, "F");
  doc.setFontSize(16);
  doc.setTextColor(34, 211, 238);
  doc.text("EzzyERP", 14, 14);
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("Employee Work Report", 60, 14);
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated: ${date} | User: ${userName}`, pageW - 14, 14, { align: "right" });

  // Stats row (6 boxes)
  if (stats) {
    let y = 26;
    const boxes = [
      { label: "Total", value: stats.total, color: [34, 211, 238] },
      { label: "Finish", value: stats.finish, color: [34, 197, 94] },
      { label: "Pending", value: stats.pending, color: [245, 158, 11] },
      { label: "Forwarded", value: stats.forwarded, color: [168, 85, 247] },
      { label: "Online", value: stats.online, color: [59, 130, 246] },
      { label: "Telephonic", value: stats.telephonic, color: [34, 197, 94] },
    ];
    const boxW = 38;
    let x = 14;
    boxes.forEach((b) => {
      doc.setFillColor(b.color[0], b.color[1], b.color[2]);
      doc.roundedRect(x, y, boxW, 8, 1, 1, "F");
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text(`${b.label}: ${b.value}`, x + boxW / 2, y + 5.5, { align: "center" });
      x += boxW + 3;
    });
  }

  const tableData = reports.map((r, i) => [
    i + 1,
    r.emp_name,
    r.customer_name || "-",
    r.problem_type || "-",
    r.call_type || "-",
    r.time_consumed != null ? `${r.time_consumed}h` : "-",
    r.work_status || "-",
    r.task.substring(0, 50),
  ]);

  autoTable(doc, {
    startY: stats ? 38 : 26,
    head: [["#", "Employee", "Customer", "Problem", "Call Type", "Time", "Work Status", "Task"]],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: [17, 24, 39], textColor: [34, 211, 238], fontSize: 7, fontStyle: "bold" },
    bodyStyles: { fillColor: [26, 35, 54], textColor: [255, 255, 255], fontSize: 7 },
    alternateRowStyles: { fillColor: [17, 24, 39] },
    styles: { cellPadding: 2, lineColor: [31, 47, 71], lineWidth: 0.2 },
    didDrawPage: () => {
      const pageH = doc.internal.pageSize.getHeight();
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text("EzzyERP – Confidential | softwareservices.online", 14, pageH - 6);
      doc.text(`Page ${doc.getCurrentPageInfo().pageNumber}`, pageW - 14, pageH - 6, { align: "right" });
    },
  });

  // Customer-wise summary table
  const customerMap = new Map<string, { finish: number; pending: number; forward: number; total: number }>();
  reports.forEach((r) => {
    const key = r.customer_name || "—";
    if (!customerMap.has(key)) customerMap.set(key, { finish: 0, pending: 0, forward: 0, total: 0 });
    const c = customerMap.get(key)!;
    c.total++;
    if (r.work_status && /finish|done|complete/i.test(r.work_status)) c.finish++;
    else if (r.work_status && /pending/i.test(r.work_status)) c.pending++;
    else if (r.work_status && /forward|senior/i.test(r.work_status)) c.forward++;
  });

  if (customerMap.size > 0) {
    const lastY = (doc as any).lastAutoTable?.finalY || 40;
    doc.addPage();
    doc.setFontSize(12);
    doc.setTextColor(34, 211, 238);
    doc.text("Customer-wise Summary", 14, 16);

    const summaryData = Array.from(customerMap.entries()).map(([name, c]) => [
      name, c.total, c.finish, c.pending, c.forward,
    ]);

    autoTable(doc, {
      startY: 22,
      head: [["Customer", "Total", "Finish", "Pending", "Forward"]],
      body: summaryData,
      theme: "grid",
      headStyles: { fillColor: [17, 24, 39], textColor: [34, 211, 238], fontSize: 8, fontStyle: "bold" },
      bodyStyles: { fillColor: [26, 35, 54], textColor: [255, 255, 255], fontSize: 8 },
      alternateRowStyles: { fillColor: [17, 24, 39] },
      styles: { cellPadding: 2, lineColor: [31, 47, 71], lineWidth: 0.2 },
    });
  }

  doc.save(`EzzyERP_WorkReport_${date}.pdf`);
};
