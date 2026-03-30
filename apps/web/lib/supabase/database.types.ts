/**
 * Scaffolded DB types — replace with `supabase gen types` when project is linked.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      intake_sessions: {
        Row: {
          id: string;
          module_slug: string;
          current_step_key: string | null;
          status: "in_progress" | "completed" | "abandoned";
          anonymous_client_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_slug: string;
          current_step_key?: string | null;
          status?: "in_progress" | "completed" | "abandoned";
          anonymous_client_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["intake_sessions"]["Insert"]>;
      };
      intake_answers: {
        Row: {
          id: string;
          session_id: string;
          question_key: string;
          step_key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          question_key: string;
          step_key: string;
          value: Json;
        };
        Update: Partial<Database["public"]["Tables"]["intake_answers"]["Insert"]>;
      };
      classifications: {
        Row: {
          id: string;
          session_id: string;
          stage: string | null;
          urgency: string | null;
          label: string | null;
          issue_flags: Json | null;
          rule_trace: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          stage?: string | null;
          urgency?: string | null;
          label?: string | null;
          issue_flags?: Json | null;
          rule_trace?: Json | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["classifications"]["Insert"]
        >;
      };
      outputs: {
        Row: {
          id: string;
          session_id: string;
          type: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          type?: string;
          payload: Json;
        };
        Update: Partial<Database["public"]["Tables"]["outputs"]["Insert"]>;
      };
    };
  };
};
