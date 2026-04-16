import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export const useWRMasters = (master_type?: MasterType, includeInactive = false) => {
  return useQuery({
    queryKey: ["wr-masters", master_type, includeInactive],
    queryFn: async () => {
      let q = (supabase as any).from("wr_masters").select("*").order("sort_order").order("label");
      if (master_type) q = q.eq("master_type", master_type);
      if (!includeInactive) q = q.eq("is_active", true);
      const { data, error } = await q;
      if (error) throw error;
      return data as WRMaster[];
    },
  });
};

export const useAddMaster = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m: { master_type: MasterType; label: string; created_by?: string; sort_order?: number }) => {
      const { data, error } = await (supabase as any).from("wr_masters").insert(m).select().single();
      if (error) throw error;
      return data as WRMaster;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wr-masters"] }),
  });
};

export const useUpdateMaster = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: { id: string; label?: string; is_active?: boolean; sort_order?: number }) => {
      const { error } = await (supabase as any).from("wr_masters").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wr-masters"] }),
  });
};

export const useDeleteMaster = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from("wr_masters").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wr-masters"] }),
  });
};
