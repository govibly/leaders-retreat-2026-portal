import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig } from "@/lib/supabase/env";

export function createClient() {
  const { url, publishableKey } = getSupabaseConfig();

  if (!url || !publishableKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createBrowserClient(url, publishableKey);
}