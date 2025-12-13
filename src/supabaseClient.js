import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ueoqhrqjqkophmfbrqmo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb3FocnFqcWtvcGhtZmJycW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzEwOTIsImV4cCI6MjA3OTYwNzA5Mn0.UAaluUZh89GpUGaFgTSGXYl16qOTvcmCz7C3pUyRkOY"
);
