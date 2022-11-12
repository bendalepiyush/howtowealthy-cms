import Head from "next/head";
import { useRouter } from "next/router";

const DOMAIN = "https://www.howtowealthy.com";
const DEFAULT_OG_IMAGE = "https://assets.howtowealthy.com/ogimg.png";
const SITE_NAME = "How to Wealthy";
const TWITTER_HANDLE = "@howtowealthy";

export default function Seo({
  title = "How to Wealthy - The Ultimate Guide to Financial Freedom",
  description = "description",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  structuredData,
  noIndex = false,
}) {
  const canonical = DOMAIN + "" + useRouter().asPath;
  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og_url" property="og:url" content={canonical ?? DOMAIN} />
      <meta key="og_site_name" property="og:site_name" content={SITE_NAME} />
      <meta
        key="og_image"
        property="og:image"
        content={ogImage ?? DEFAULT_OG_IMAGE}
      />
      <meta key="og_image:alt" property="og:image:alt" content={title} />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="630" />

      <meta name="robots" content="index,follow" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:site" name="twitter:site" content={TWITTER_HANDLE} />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={TWITTER_HANDLE}
      />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />

      <link rel="canonical" href={canonical} />

      <link rel="shortcut icon" href="/favicon.ico" />

      {structuredData && (
        <script type="application/ld+json">{structuredData}</script>
      )}

      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
}
