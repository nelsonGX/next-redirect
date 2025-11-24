export interface RedirectConfig {
  layout: string;
  title: string;
  description: string;
  image?: string;
  redirect_to: string;
}

const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'TelegramBot',
  'Slackbot',
  'Discordbot',
  'developers.google.com/+/web/snippet',
];

export function isCrawler(userAgent: string): boolean {
  return CRAWLER_USER_AGENTS.some((crawler) =>
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  );
}

export function findRedirectConfig(
  slug: string,
  redirects: RedirectConfig[]
): RedirectConfig | undefined {
  return redirects.find((r) => r.layout === slug);
}

export function generateOGMetaTags(config: RedirectConfig, url: string): string {
  const imageMeta = config.image
    ? `<meta property="og:image" content="${config.image}">
  <meta name="twitter:image" content="${config.image}">`
    : '';

  return `<meta charset="utf-8">
  <title>${config.title}</title>
  <meta name="description" content="${config.description}">

  <!-- Open Graph tags -->
  <meta property="og:title" content="${config.title}">
  <meta property="og:description" content="${config.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  ${imageMeta}

  <!-- Twitter Card tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${config.title}">
  <meta name="twitter:description" content="${config.description}">`;
}

export function generateRedirectHTML(
  config: RedirectConfig,
  requestUrl: string
): string {
  const metaTags = generateOGMetaTags(config, requestUrl);

  return `<!DOCTYPE html>
<html>
<head>
  ${metaTags}
  <meta http-equiv="refresh" content="0;url=${config.redirect_to}">
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;
}
