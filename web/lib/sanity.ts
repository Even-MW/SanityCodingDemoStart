import { createPreviewSubscriptionHook } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from "./config";

export const imageBuilder = imageUrlBuilder(sanityConfig);

export const urlForImage = (source) => imageBuilder.image(source).auto("format").fit("max");

export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig);
