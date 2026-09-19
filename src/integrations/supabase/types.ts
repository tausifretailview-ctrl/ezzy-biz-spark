export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      demo_requests: {
        Row: {
          city: string | null
          created_at: string | null
          id: string
          name: string | null
          note: string | null
          phone: string | null
          shop: string | null
          trade: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          note?: string | null
          phone?: string | null
          shop?: string | null
          trade?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          note?: string | null
          phone?: string | null
          shop?: string | null
          trade?: string | null
        }
        Relationships: []
      }
      cotton_plus_customers: {
        Row: {
          anniversary: string | null
          birthday: string | null
          created_at: string | null
          id: string
          mobile: string
          name: string
          store_location: string | null
        }
        Insert: {
          anniversary?: string | null
          birthday?: string | null
          created_at?: string | null
          id?: string
          mobile: string
          name: string
          store_location?: string | null
        }
        Update: {
          anniversary?: string | null
          birthday?: string | null
          created_at?: string | null
          id?: string
          mobile?: string
          name?: string
          store_location?: string | null
        }
        Relationships: []
      }
      cotton_plus_settings: {
        Row: {
          accent_color: string | null
          facebook_url: string | null
          form_heading: string | null
          form_subheading: string | null
          google_review_url: string | null
          id: number
          instagram_url: string | null
          logo_url: string | null
          primary_color: string | null
          store_location: string | null
          store_name: string | null
          store_tagline: string | null
          thank_you_message: string | null
          updated_at: string | null
          whatsapp_number: string | null
        }
        Insert: {
          accent_color?: string | null
          facebook_url?: string | null
          form_heading?: string | null
          form_subheading?: string | null
          google_review_url?: string | null
          id?: number
          instagram_url?: string | null
          logo_url?: string | null
          primary_color?: string | null
          store_location?: string | null
          store_name?: string | null
          store_tagline?: string | null
          thank_you_message?: string | null
          updated_at?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          accent_color?: string | null
          facebook_url?: string | null
          form_heading?: string | null
          form_subheading?: string | null
          google_review_url?: string | null
          id?: number
          instagram_url?: string | null
          logo_url?: string | null
          primary_color?: string | null
          store_location?: string | null
          store_name?: string | null
          store_tagline?: string | null
          thank_you_message?: string | null
          updated_at?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      work_report_users: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          name: string
          password_hash: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: string
          name: string
          password_hash: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          name?: string
          password_hash?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      work_reports: {
        Row: {
          assigned_senior: string | null
          call_type: string | null
          client_name: string | null
          created_at: string | null
          customer_name: string | null
          emp_id: string
          emp_name: string
          id: string
          priority: string | null
          problem_type: string | null
          progress: number | null
          remarks: string | null
          report_date: string
          status: string
          task: string
          time_consumed: number | null
          time_spent: number | null
          updated_at: string | null
          work_status: string | null
        }
        Insert: {
          assigned_senior?: string | null
          call_type?: string | null
          client_name?: string | null
          created_at?: string | null
          customer_name?: string | null
          emp_id: string
          emp_name: string
          id?: string
          priority?: string | null
          problem_type?: string | null
          progress?: number | null
          remarks?: string | null
          report_date?: string
          status: string
          task: string
          time_consumed?: number | null
          time_spent?: number | null
          updated_at?: string | null
          work_status?: string | null
        }
        Update: {
          assigned_senior?: string | null
          call_type?: string | null
          client_name?: string | null
          created_at?: string | null
          customer_name?: string | null
          emp_id?: string
          emp_name?: string
          id?: string
          priority?: string | null
          problem_type?: string | null
          progress?: number | null
          remarks?: string | null
          report_date?: string
          status?: string
          task?: string
          time_consumed?: number | null
          time_spent?: number | null
          updated_at?: string | null
          work_status?: string | null
        }
        Relationships: []
      }
      wr_masters: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          label: string
          master_type: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          master_type: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          master_type?: string
          sort_order?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
