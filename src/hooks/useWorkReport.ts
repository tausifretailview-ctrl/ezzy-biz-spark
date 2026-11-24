import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workReportCall } from "@/lib/workReportApi";

export interface WorkReport {
  id: string;
  emp_id: string;
  emp_name: string;
  report_date: string;
  task: string;
  status: string;
  priority: string;
  progress: number;
  time_spent: number;
  assigned_senior: string | null;
  client_name: string | null;
  remarks: string | null;
  created_at: string;
  updated_at: string;
  // New fields
  customer_name: string | null;
  problem_type: string | null;
  call_type: string | null;
  time_consumed: number | null;
  work_status: string | null;
}

export interface WorkReportUser {
  id: string;
  user_id: string;
  name: string;
  role: string;
  department: string | null;
  created_at: string;
}

interface FetchReportsParams {
  empId?: string;
  isAdmin: boolean;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  priority?: string;
  search?: string;
  customer_name?: string;
  problem_type?: string;
  call_type?: string;
  work_status?: string;
}

// All reads and writes go through the work-report-auth function, which applies the rules:
// employees see and edit only their own reports, only admins delete or list employees.
export const useWorkReports = (params: FetchReportsParams) => {
  return useQuery({
    queryKey: ["work-reports", params],
    queryFn: async () => {
      const { empId: _empId, isAdmin: _isAdmin, ...filters } = params;
      const { data } = await workReportCall<{ data: WorkReport[] }>("list_reports", { filters });
      return data;
    },
  });
};

export const useUpsertReport = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (report: Partial<WorkReport> & { id?: string }) => {
      const { id, created_at: _c, updated_at: _u, ...rest } = report;
      await workReportCall("save_report", { id: id ?? null, report: rest });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["work-reports"] }),
  });
};

export const useDeleteReport = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await workReportCall("delete_report", { id });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["work-reports"] }),
  });
};

export const useWorkReportUsers = () => {
  return useQuery({
    queryKey: ["work-report-users"],
    queryFn: async () => {
      const { data } = await workReportCall<{ data: WorkReportUser[] }>("list_users");
      return data;
    },
  });
};
