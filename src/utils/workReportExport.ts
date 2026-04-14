import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { WorkReport } from "@/hooks/useWorkReport";

export const exportToExcel = (reports: WorkReport[], filename?: string) => {
  const rows = reports.map((r, i) => ({
    "#": i + 1,
    Employee: r.emp_name,
    Date: r.report_date,
    Task: r.task,
    Status: r.status,
    Priority: r.priority,
    "Progress%": r.progress,
    "Time(hrs)": r.time_spent,
    Senior: r.assigned_senior || "",
    Client: r.client_name || "",
    Remarks: r.remarks || "",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  // Auto column widths
  const colWidths = Object.keys(rows[0] || {}).map((key) => ({
    wch: Math.max(key.length, ...rows.map((r) => String((r as any)[key]).length)) + 2,
  }));
  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Work Reports");

  const date = new Date().toISOString().split("T")[0];
  XLSX.writeFile(wb, filename || `EzzyERP_WorkReport_${date}.xlsx`);
};

export const exportToPDF = (
  reports: WorkReport[],
  userName: string,
  stats?: { total: number; done: number; pending: number; toSenior: number }
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

  // Stats row
  if (stats) {
    let y = 26;
    const boxes = [
      { label: "Total", value: stats.total, color: [34, 211, 238] },
      { label: "Done", value: stats.done, color: [34, 197, 94] },
      { label: "Pending", value: stats.pending, color: [245, 158, 11] },
      { label: "To Senior", value: stats.toSenior, color: [168, 85, 247] },
    ];
    const boxW = 35;
    let x = 14;
    boxes.forEach((b) => {
      doc.setFillColor(b.color[0], b.color[1], b.color[2]);
      doc.roundedRect(x, y, boxW, 8, 1, 1, "F");
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text(`${b.label}: ${b.value}`, x + boxW / 2, y + 5.5, { align: "center" });
      x += boxW + 4;
    });
  }

  // Table
  const tableData = reports.map((r, i) => [
    i + 1, r.emp_name, r.report_date, r.task.substring(0, 50), r.status, r.priority,
    `${r.progress}%`, `${r.time_spent}h`, r.assigned_senior || "-", r.client_name || "-",
  ]);

  autoTable(doc, {
    startY: stats ? 38 : 26,
    head: [["#", "Employee", "Date", "Task", "Status", "Priority", "Progress", "Time", "Senior", "Client"]],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: [17, 24, 39], textColor: [34, 211, 238], fontSize: 7, fontStyle: "bold" },
    bodyStyles: { fillColor: [26, 35, 54], textColor: [255, 255, 255], fontSize: 7 },
    alternateRowStyles: { fillColor: [17, 24, 39] },
    styles: { cellPadding: 2, lineColor: [31, 47, 71], lineWidth: 0.2 },
    didDrawPage: (data: any) => {
      const pageH = doc.internal.pageSize.getHeight();
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text("EzzyERP – Confidential | softwareservices.online", 14, pageH - 6);
      doc.text(`Page ${doc.getCurrentPageInfo().pageNumber}`, pageW - 14, pageH - 6, { align: "right" });
    },
  });

  doc.save(`EzzyERP_WorkReport_${date}.pdf`);
};
