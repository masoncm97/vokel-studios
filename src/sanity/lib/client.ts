import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Published reads come from the CDN; live revalidation is handled by defineLive.
  useCdn: true,
  stega: {
    // Click-to-edit overlays resolve back to the embedded Studio.
    studioUrl: "/studio",
  },
});
