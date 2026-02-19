import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || // new format
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||                // old format
    '';

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL or Key is missing. Database storage will fail.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
