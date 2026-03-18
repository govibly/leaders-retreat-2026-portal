const storageProvider = process.env.NEXT_PUBLIC_STORAGE_PROVIDER ?? "local";

function encodeStoragePath(storagePath: string) {
  return storagePath.split("/").map(encodeURIComponent).join("/");
}

function encodeFileName(fileName: string) {
  return fileName.split("/").map(encodeURIComponent).join("/");
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    url,
    publishableKey,
    siteUrl,
  };
}

export function isSupabaseConfigured() {
  const { url, publishableKey } = getSupabaseConfig();
  return Boolean(url && publishableKey);
}

export function getPublicAssetUrl(
  folder: "audio" | "booklets",
  fileName: string,
  storagePath: string
) {
  const localUrl = `/media/${folder}/${encodeURIComponent(fileName)}`;

  if (storageProvider === "cloudflare-r2") {
    const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_PUBLIC_BASE_URL;

    if (!baseUrl) {
      return localUrl;
    }

    const remoteFolder = folder === "audio" ? "mp3" : "booklet";
    return `${baseUrl}/leaders/${remoteFolder}/${encodeFileName(fileName)}`;
  }

  if (storageProvider !== "supabase") {
    return localUrl;
  }

  const { url } = getSupabaseConfig();
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET;

  if (!url || !bucket) {
    return localUrl;
  }

  return `${url}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodeStoragePath(storagePath)}`;
}