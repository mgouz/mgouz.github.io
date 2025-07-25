import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  /**
   * Set base path. This is the slug of your GitHub repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: "/nextjs-github-pages",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  /**
 * Disable server-based image optimization. Next.js does not support
 * dynamic features with static exports.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
 */
  images: {
    unoptimized: true,
  },
}

export default nextConfig
