/** Copy that still needs real content starts with "[PLACEHOLDER". */
export const isPlaceholder = (text?: string) => !!text && /^\s*\[PLACEHOLDER/i.test(text);

/**
 * Placeholders are shown, loudly, in development and on Vercel preview
 * deployments. On the live site they are hidden so they never ship.
 */
export const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
