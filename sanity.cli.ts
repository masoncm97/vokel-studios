import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // The Studio is mounted inside the Next app; the CLI is only used for
  // schema extract / typegen.
  autoUpdates: false,
});
