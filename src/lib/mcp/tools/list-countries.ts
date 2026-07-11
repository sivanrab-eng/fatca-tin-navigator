import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { COUNTRIES } from "@/data/tin-countries";

export default defineTool({
  name: "list_countries",
  title: "List countries",
  description:
    "List every country/territory available in the TIN database with its ISO code, English name, Hebrew name, and flag. Use before get_country_tin to discover valid codes.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = COUNTRIES.map((c) => ({
      code: c.code,
      nameEn: c.nameEn,
      nameHe: c.nameHe,
      flag: c.flag,
    }));
    return {
      content: [{ type: "text", text: `${items.length} countries available.` }],
      structuredContent: { count: items.length, countries: items },
    };
  },
});
