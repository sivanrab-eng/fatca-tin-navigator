import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { COUNTRIES } from "@/data/tin-countries";

export default defineTool({
  name: "search_countries",
  title: "Search countries",
  description:
    "Search the TIN database by name (English or Hebrew) or ISO code substring. Returns matching countries with their codes so the caller can then pass a code to get_country_tin.",
  inputSchema: {
    query: z
      .string()
      .describe(
        "Free-text query, case-insensitive. Matches ISO code, English name, or Hebrew name. Example: 'united' or 'ישראל' or 'US'.",
      ),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        content: [{ type: "text", text: "Empty query." }],
        isError: true,
      };
    }
    const matches = COUNTRIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.nameHe.toLowerCase().includes(q),
    ).map((c) => ({
      code: c.code,
      nameEn: c.nameEn,
      nameHe: c.nameHe,
      flag: c.flag,
    }));
    return {
      content: [
        {
          type: "text",
          text:
            matches.length === 0
              ? `No matches for "${query}".`
              : `${matches.length} match(es) for "${query}".`,
        },
      ],
      structuredContent: { count: matches.length, matches },
    };
  },
});
