import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
console.log('url', url ? 'OK' : 'MISSING');
console.log('key', key ? 'OK' : 'MISSING');

const supabase = createClient(url, key);
const res = await supabase.from('votes').select('*').limit(1);
console.log(JSON.stringify(res, null, 2));
