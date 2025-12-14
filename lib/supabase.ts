import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Create supabase client - will use NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// These must be set in Vercel environment variables for auth to work
export const supabase = createClientComponentClient();

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};
