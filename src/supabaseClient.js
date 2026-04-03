import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bmsdpwfnuguadiuuxwxr.supabase.co'
const supabaseAnonKey = 'sb_publishable_me8UbPJ3bXCsJAPR1fOXSQ_YFwmIz8F'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
