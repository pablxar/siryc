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
      blog_posts: {
        Row: {
          categoria: string | null
          contenido: string | null
          created_at: string | null
          extracto: string | null
          id: string
          imagen_url: string | null
          publicado: boolean | null
          slug: string
          titulo: string
        }
        Insert: {
          categoria?: string | null
          contenido?: string | null
          created_at?: string | null
          extracto?: string | null
          id?: string
          imagen_url?: string | null
          publicado?: boolean | null
          slug: string
          titulo: string
        }
        Update: {
          categoria?: string | null
          contenido?: string | null
          created_at?: string | null
          extracto?: string | null
          id?: string
          imagen_url?: string | null
          publicado?: boolean | null
          slug?: string
          titulo?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          cargo: string | null
          created_at: string | null
          email: string
          empresa: string | null
          id: string
          mensaje: string | null
          nombre: string
          origen_pagina: string | null
          segmento: string | null
          telefono: string | null
          tipo_servicio: string | null
        }
        Insert: {
          cargo?: string | null
          created_at?: string | null
          email: string
          empresa?: string | null
          id?: string
          mensaje?: string | null
          nombre: string
          origen_pagina?: string | null
          segmento?: string | null
          telefono?: string | null
          tipo_servicio?: string | null
        }
        Update: {
          cargo?: string | null
          created_at?: string | null
          email?: string
          empresa?: string | null
          id?: string
          mensaje?: string | null
          nombre?: string
          origen_pagina?: string | null
          segmento?: string | null
          telefono?: string | null
          tipo_servicio?: string | null
        }
        Relationships: []
      }
      proyectos: {
        Row: {
          anio: number | null
          cantidad_equipos: number | null
          categoria: string | null
          cliente_nombre: string | null
          created_at: string | null
          descripcion: string | null
          galeria: Json | null
          id: string
          imagen_principal_url: string | null
          metros_cuadrados: number | null
          mostrar_cliente: boolean | null
          titulo: string
        }
        Insert: {
          anio?: number | null
          cantidad_equipos?: number | null
          categoria?: string | null
          cliente_nombre?: string | null
          created_at?: string | null
          descripcion?: string | null
          galeria?: Json | null
          id?: string
          imagen_principal_url?: string | null
          metros_cuadrados?: number | null
          mostrar_cliente?: boolean | null
          titulo: string
        }
        Update: {
          anio?: number | null
          cantidad_equipos?: number | null
          categoria?: string | null
          cliente_nombre?: string | null
          created_at?: string | null
          descripcion?: string | null
          galeria?: Json | null
          id?: string
          imagen_principal_url?: string | null
          metros_cuadrados?: number | null
          mostrar_cliente?: boolean | null
          titulo?: string
        }
        Relationships: []
      }
    }
    Views: {
      proyectos_public: {
        Row: {
          anio: number | null
          cantidad_equipos: number | null
          categoria: string | null
          cliente_nombre: string | null
          created_at: string | null
          descripcion: string | null
          galeria: Json | null
          id: string | null
          imagen_principal_url: string | null
          metros_cuadrados: number | null
          mostrar_cliente: boolean | null
          titulo: string | null
        }
        Insert: {
          anio?: number | null
          cantidad_equipos?: number | null
          categoria?: string | null
          cliente_nombre?: never
          created_at?: string | null
          descripcion?: string | null
          galeria?: Json | null
          id?: string | null
          imagen_principal_url?: string | null
          metros_cuadrados?: number | null
          mostrar_cliente?: boolean | null
          titulo?: string | null
        }
        Update: {
          anio?: number | null
          cantidad_equipos?: number | null
          categoria?: string | null
          cliente_nombre?: never
          created_at?: string | null
          descripcion?: string | null
          galeria?: Json | null
          id?: string | null
          imagen_principal_url?: string | null
          metros_cuadrados?: number | null
          mostrar_cliente?: boolean | null
          titulo?: string | null
        }
        Relationships: []
      }
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
