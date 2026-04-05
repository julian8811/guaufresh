import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  'https://fbejimgyxtbgxsuitaos.supabase.co'
const supabaseAnonKey =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZWppbWd5eHRiZ3hzdWl0YW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMTMzMjcsImV4cCI6MjA5MDc4OTMyN30.SwcMTuhc0hfxGU4p-DRbvxP5mXpKf3U3sInpLCK8Epk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  stock: number
  category: string
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  phone: string
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total: number
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
}

export interface Review {
  id: string
  product_id: string | null
  user_id: string | null
  author_name: string | null
  rating: number
  comment: string | null
  pet_name: string | null
  pet_breed: string | null
  pet_image: string | null
  location: string | null
  verified: boolean | null
  created_at: string
}

export interface Coupon {
  id: string
  code: string
  discount_percent: number
  valid_until: string
  active: boolean
}
