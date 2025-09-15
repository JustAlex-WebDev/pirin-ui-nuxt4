export const useCompositePubConfig = async () => {
  const config = useRuntimeConfig().public;
  const response = await fetch(
    pathCombine(
      config.APP_BASE_URL ? (config.APP_BASE_URL as string) ?? "/" : "/",
      "/config.json"
    )
  );
  const json = await response.json();
  return { ...config, ...json };
};

function pathCombine(...parts: string[]): string {
  if (parts.length === 0) {
    return "";
  }

  // Check if we want an absolute path (first part starts with '/')
  const isAbsolute = parts[0]?.startsWith("/") || false;

  // Remove leading and trailing slashes from each part
  const cleaned = parts.map((part) => part.replace(/(^[\\/]+)|([\\/]+$)/g, ""));

  // Join with forward slash
  let result = cleaned.join("/");

  // If it's absolute, make sure we have exactly one leading slash
  if (isAbsolute) {
    // Prepend a slash and then remove any extra leading slashes
    result = "/" + result.replace(/^[/]+/, "");
  }

  return result;
}
