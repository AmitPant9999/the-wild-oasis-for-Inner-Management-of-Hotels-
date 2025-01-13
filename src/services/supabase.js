import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://gallfsuokrksewpldlif.supabase.co';
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhbGxmc3Vva3Jrc2V3cGxkbGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1OTA2NzcsImV4cCI6MjA1MTE2NjY3N30.MwOfJ18-qq5CCkkx569W-P4dW_5-RzTo1kAsxwwhAQg";
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;