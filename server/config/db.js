import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ SUPABASE_URL or SUPABASE_KEY not set in environment');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Basic health check (optional) - tries to get a minimal response without exposing secrets
;(async () => {
  try {
    await supabase.from('eps').select('eps_id').limit(1);
    console.log('✅ Supabase client initialized');
  } catch (err) {
    console.error('❌ Warning: Supabase initialization check failed:', err.message || err);
  }
})();

export default supabase;
