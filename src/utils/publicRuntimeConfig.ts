/**
 * Dynamic configuration available for the browser and server populated from your `next.config.js`.
 * Note: requires `ssr: true` or a `getInitialProps` in `_app.tsx`
 * @link https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
 */
import getConfig from "next/config";

import type * as config from "../../next.config";

/**
 * Inferred type from `publicRuntime` in `next.config.js`
 */
type PublicRuntimeConfig = typeof config.publicRuntimeConfig;

const nextConfig = getConfig();

export const publicRuntimeConfig =
  nextConfig.publicRuntimeConfig as PublicRuntimeConfig;
