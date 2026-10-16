/** The live address, used for absolute links in metadata, the sitemap and share images. */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://new-personal-website-rho-one.vercel.app";
