import type { SchemaTypeDefinition } from "sanity";

import { homePage } from "./documents/homePage";
import { siteSettings } from "./documents/siteSettings";
import { mediaBlock } from "./objects/mediaBlock";
import { pillar } from "./objects/pillar";
import { service } from "./objects/service";
import { socialLink } from "./objects/socialLink";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    siteSettings,
    homePage,
    // objects
    mediaBlock,
    pillar,
    service,
    socialLink,
  ],
};
