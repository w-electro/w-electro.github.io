/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO migration from old static HTML
  async redirects() {
    return [
      // Main pages
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // Tools redirects
      {
        source: "/ocr.html",
        destination: "/tools/ocr",
        permanent: true,
      },
      {
        source: "/ocr",
        destination: "/tools/ocr",
        permanent: true,
      },
      {
        source: "/qr-generator.html",
        destination: "/tools/qr",
        permanent: true,
      },
      {
        source: "/qr-generator",
        destination: "/tools/qr",
        permanent: true,
      },
      {
        source: "/pdf-tools.html",
        destination: "/tools/pdf",
        permanent: true,
      },
      {
        source: "/pdf-tools",
        destination: "/tools/pdf",
        permanent: true,
      },
      {
        source: "/image-tools.html",
        destination: "/tools/image",
        permanent: true,
      },
      {
        source: "/text-tools.html",
        destination: "/tools/text",
        permanent: true,
      },
      {
        source: "/calculator-tools.html",
        destination: "/tools/calculator",
        permanent: true,
      },
      {
        source: "/converter-tools.html",
        destination: "/tools/converter",
        permanent: true,
      },
      {
        source: "/datetime-tools.html",
        destination: "/tools/datetime",
        permanent: true,
      },
      {
        source: "/security-tools.html",
        destination: "/tools/security",
        permanent: true,
      },
      {
        source: "/design-tools.html",
        destination: "/tools/design",
        permanent: true,
      },
      {
        source: "/dev-tools.html",
        destination: "/tools/developer",
        permanent: true,
      },
      {
        source: "/utility-tools.html",
        destination: "/tools/utility",
        permanent: true,
      },
      {
        source: "/barcode-generator.html",
        destination: "/tools/barcode",
        permanent: true,
      },
      {
        source: "/tools.html",
        destination: "/tools",
        permanent: true,
      },
      // Services redirects
      {
        source: "/academic-services.html",
        destination: "/services/academic",
        permanent: true,
      },
      {
        source: "/academic-services",
        destination: "/services/academic",
        permanent: true,
      },
      {
        source: "/design-services.html",
        destination: "/services/design",
        permanent: true,
      },
      {
        source: "/design-services",
        destination: "/services/design",
        permanent: true,
      },
      {
        source: "/electronic-services.html",
        destination: "/services/electronic",
        permanent: true,
      },
      {
        source: "/electronic-services",
        destination: "/services/electronic",
        permanent: true,
      },
      {
        source: "/general-services.html",
        destination: "/services/general",
        permanent: true,
      },
      {
        source: "/general-services",
        destination: "/services/general",
        permanent: true,
      },
      // Legal pages
      {
        source: "/privacy-policy.html",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions.html",
        destination: "/terms",
        permanent: true,
      },
      // Promo page
      {
        source: "/promo.html",
        destination: "/promo",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
