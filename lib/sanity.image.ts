import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.client";

/**
 * Builds optimized image URLs from Sanity image references.
 * Used by the page-builder Image block + any uploaded images.
 *
 * Usage: urlFor(image).width(1200).url()
 */
const builder = imageUrlBuilder(client);

export function urlFor(source: unknown) {
  return builder.image(source as never);
}
