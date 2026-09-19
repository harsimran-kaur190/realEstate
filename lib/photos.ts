import { BLUR_DATA } from './blur-data';

/** Local path for a self-hosted Unsplash photo (see scripts/optimize-images.mjs). */
export const photo = (id: string) => `/images/unsplash/${id}.jpg`;

/**
 * Blur-up placeholder props for any image under /public/images.
 * Spread onto <Image>; returns nothing for paths without generated data.
 */
export function blurProps(src: string): { placeholder: 'blur'; blurDataURL: string } | Record<string, never> {
  const data = BLUR_DATA[src];
  return data ? { placeholder: 'blur', blurDataURL: data } : {};
}
