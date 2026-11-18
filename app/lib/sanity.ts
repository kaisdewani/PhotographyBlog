import { createClient } from "@sanity/client";

export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "hp5n6ih0",
  useCdn: false
});
