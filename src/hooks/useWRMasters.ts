import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workReportCall } from "@/lib/workReportApi";

export type MasterType = "customer" | "problem_type" | "call_type" | "status";

export interface WRMaster {
  id: string;
  master_type: string;
  label: string;
  sort_order: number;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
}

// Through the work-report-auth function: anyone logged in may add a customer,
// only admins change the other lists or edit and delete entries.
export const useWRMasters = (master_type?: MasterType, includeInactive = false) => {
  return useQuery({
    queryKey: ["wr-masters", master_type, includeInactive],
    queryFn: async () => {
      const { data } = await workReportCall<{ data: WRMaster[] }>("list_masters", {
        master_type: master_type ?? null,
        include_inactive: includeInactive,
      });
      return data;
    },
  });
};

export const useAddMaster = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m: { master_type: MasterType; label: string; created_by?: string; sort_order?: number }) => {
      const { data } = await workReportCall<{ data: WRMaster }>("add_master", { master: m });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wr-masters"] }),
  });
};

export const useUpdateMaster = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: { id: string; label?: string; is_active?: boolean; sort_order?: number }) => {
      await workReportCall("update_master", { id, ...rest });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wr-masters"] }),
  });
};

export const useDeleteMaster = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await workReportCall("delete_master", { id });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wr-masters"] }),
  });
};
