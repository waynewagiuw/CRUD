import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ueoqhrqjqkophmfbrqmo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInJlZiI6InVlb3FocnFqcWtvcGhtZmJycW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzEwOTIsImV4cCI6MjA3OTYwNzA5Mn0.UAaluUZh89GpUGaFgTSGXYl16qOTvcmCz7C3pUyRkOY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
