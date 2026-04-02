import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zpvxnlorzkobfmoigvzx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdnhubG9yemtvYmZtb2lndnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MDU0ODUsImV4cCI6MjA5MDM4MTQ4NX0.tIT3RqKiju_9BylNBlvB8JY6TBv4YP_Pfw-I5wbFjaY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
