import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export const useWorkReports = (params: FetchReportsParams) => {
  return useQuery({
    queryKey: ["work-reports", params],
    queryFn: async () => {
      let query = supabase.from("work_reports").select("*").order("report_date", { ascending: false });

      if (!params.isAdmin && params.empId) {
        query = query.eq("emp_id", params.empId);
      }
      if (params.dateFrom) query = query.gte("report_date", params.dateFrom);
      if (params.dateTo) query = query.lte("report_date", params.dateTo);
      if (params.status && params.status !== "All") query = query.eq("status", params.status);
      if (params.priority) query = query.eq("priority", params.priority);
      if (params.customer_name) query = query.eq("customer_name", params.customer_name);
      if (params.problem_type) query = query.eq("problem_type", params.problem_type);
      if (params.call_type) query = query.eq("call_type", params.call_type);
      if (params.work_status) query = query.eq("work_status", params.work_status);
      if (params.search) {
        query = query.or(`task.ilike.%${params.search}%,emp_name.ilike.%${params.search}%,customer_name.ilike.%${params.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as WorkReport[];
    },
  });
};

export const useUpsertReport = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (report: Partial<WorkReport> & { id?: string }) => {
      if (report.id) {
        const { id, created_at, updated_at, ...rest } = report;
        const { error } = await supabase.from("work_reports").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { id, created_at, updated_at, ...rest } = report;
        const { error } = await supabase.from("work_reports").insert(rest as any);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["work-reports"] }),
  });
};

export const useDeleteReport = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("work_reports").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["work-reports"] }),
  });
};

export const useWorkReportUsers = () => {
  return useQuery({
    queryKey: ["work-report-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_report_users")
        .select("id, user_id, name, role, department, created_at")
        .order("name");
      if (error) throw error;
      return data as WorkReportUser[];
    },
  });
};
