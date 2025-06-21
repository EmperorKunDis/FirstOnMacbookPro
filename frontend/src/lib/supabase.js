import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-url-that-will-fail.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key-that-will-fail';

// Vytvoříme klienta, ale víme, že se připojení nezdaří a spadne na demo mode
export const supabase = createClient(supabaseUrl, supabaseAnonKey);