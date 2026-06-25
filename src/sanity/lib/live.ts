import "server-only";

import { defineLive } from "next-sanity/live";

import { readToken } from "../env";
import { client } from "./client";

if (!readToken && process.env.NODE_ENV !== "production") {
  // Not fatal — published content still renders — but live updates and draft
  // mode need a Viewer token. See README for how to create one.
  console.warn(
    "[sanity] SANITY_API_READ_TOKEN is not set. Live updates and draft mode are disabled."
  );
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken || undefined,
  browserToken: readToken || undefined,
});
