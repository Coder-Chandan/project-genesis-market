// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hbaspabeibyfrvbqebul.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiYXNwYWJlaWJ5ZnJ2YnFlYnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4ODc2MzUsImV4cCI6MjA1OTQ2MzYzNX0.x7zy1XL2Bdzz75gSzLNEVdmdBggRt0QL7tn5YWItAb4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);