export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          date: string
          doctor_id: string
          follow_up: string | null
          hospital_id: string
          id: string
          notes: string | null
          patient_id: string
          status: string
        }
        Insert: {
          created_at?: string
          date: string
          doctor_id: string
          follow_up?: string | null
          hospital_id: string
          id?: string
          notes?: string | null
          patient_id: string
          status: string
        }
        Update: {
          created_at?: string
          date?: string
          doctor_id?: string
          follow_up?: string | null
          hospital_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      caretakers: {
        Row: {
          id: string
          patient_ids: string[]
          phone: string
          relationship: string
        }
        Insert: {
          id: string
          patient_ids: string[]
          phone: string
          relationship: string
        }
        Update: {
          id?: string
          patient_ids?: string[]
          phone?: string
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: "caretakers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          appointment_id: string
          created_at: string
          diagnosis: string | null
          follow_up_date: string | null
          follow_up_recommended: boolean | null
          id: string
          prescription_notes: string | null
          treatment_plan: string | null
        }
        Insert: {
          appointment_id: string
          created_at?: string
          diagnosis?: string | null
          follow_up_date?: string | null
          follow_up_recommended?: boolean | null
          id?: string
          prescription_notes?: string | null
          treatment_plan?: string | null
        }
        Update: {
          appointment_id?: string
          created_at?: string
          diagnosis?: string | null
          follow_up_date?: string | null
          follow_up_recommended?: boolean | null
          id?: string
          prescription_notes?: string | null
          treatment_plan?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          experience: number
          hospital_id: string | null
          id: string
          qualification: string
          specialization: string
        }
        Insert: {
          experience: number
          hospital_id?: string | null
          id: string
          qualification: string
          specialization: string
        }
        Update: {
          experience?: number
          hospital_id?: string | null
          id?: string
          qualification?: string
          specialization?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_surveys: {
        Row: {
          created_at: string
          date: string
          feeling: string
          id: string
          notes: string | null
          notify_caretaker: boolean
          notify_doctor: boolean
          patient_id: string
          symptoms: string[] | null
        }
        Insert: {
          created_at?: string
          date?: string
          feeling: string
          id?: string
          notes?: string | null
          notify_caretaker?: boolean
          notify_doctor?: boolean
          patient_id: string
          symptoms?: string[] | null
        }
        Update: {
          created_at?: string
          date?: string
          feeling?: string
          id?: string
          notes?: string | null
          notify_caretaker?: boolean
          notify_doctor?: boolean
          patient_id?: string
          symptoms?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "health_surveys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string
          id: string
          phone: string
          specialties: string[] | null
        }
        Insert: {
          address: string
          id: string
          phone: string
          specialties?: string[] | null
        }
        Update: {
          address?: string
          id?: string
          phone?: string
          specialties?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "hospitals_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_feedback: {
        Row: {
          created_at: string
          effective: boolean
          id: string
          medicine_id: string
          side_effects: string | null
          survey_id: string
        }
        Insert: {
          created_at?: string
          effective: boolean
          id?: string
          medicine_id: string
          side_effects?: string | null
          survey_id: string
        }
        Update: {
          created_at?: string
          effective?: boolean
          id?: string
          medicine_id?: string
          side_effects?: string | null
          survey_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_feedback_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_feedback_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "health_surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      medicines: {
        Row: {
          created_at: string
          doctor_id: string
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          name: string
          notes: string | null
          patient_id: string
          start_date: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          name: string
          notes?: string | null
          patient_id: string
          start_date: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          name?: string
          notes?: string | null
          patient_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "medicines_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medicines_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          allergies: string[] | null
          blood_group: string | null
          caretaker_id: string | null
          conditions: string[] | null
          dob: string
          gender: string
          id: string
        }
        Insert: {
          allergies?: string[] | null
          blood_group?: string | null
          caretaker_id?: string | null
          conditions?: string[] | null
          dob: string
          gender: string
          id: string
        }
        Update: {
          allergies?: string[] | null
          blood_group?: string | null
          caretaker_id?: string | null
          conditions?: string[] | null
          dob?: string
          gender?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_caretaker_id_fkey"
            columns: ["caretaker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          role: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
