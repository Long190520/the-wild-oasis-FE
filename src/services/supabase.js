import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kynvyscmqrykadhhvmzw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bnZ5c2NtcXJ5a2FkaGh2bXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2NTYxOTEsImV4cCI6MjAxOTIzMjE5MX0.CQUdKdh3wdEQjEVqYvrXIwGUFDlugMa-JT_mO7Czl40";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
