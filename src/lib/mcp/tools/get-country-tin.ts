import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { COUNTRIES, getLastUpdated } from "@/data/tin-countries";

export default defineTool({
  name: "get_country_tin",
  title: "Get country TIN details",
  description:
    "Return the full TIN (Tax Identification Number) reference for one country/territory, for FATCA/CRS purposes: the local TIN name, individual and entity formats with examples, where to find the number, and official sources. Accepts an ISO 3166-1 alpha-2 code (e.g. 'IL', 'US', 'GB').",
  inputSchema: {
    code: z
      .string()
      .describe("ISO 3166-1 alpha-2 country code, case-insensitive. Example: 'IL'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ code }) => {
    const upper = code.trim().toUpperCase();
    const country = COUNTRIES.find((c) => c.code === upper);
    if (!country) {
      return {
        content: [
          {
            type: "text",
            text: `No country found for code "${code}". Use list_countries to see valid codes.`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `${country.flag} ${country.nameEn} (${country.code}) — ${country.tinNameEn}. Individual: ${country.individual.format} (e.g. ${country.individual.example}). Entity: ${country.entity.format} (e.g. ${country.entity.example}).`,
        },
      ],
      structuredContent: {
        code: country.code,
        nameEn: country.nameEn,
        nameHe: country.nameHe,
        flag: country.flag,
        tinName: country.tinNameEn,
        individual: country.individual,
        entity: country.entity,
        whereToFind: country.whereToFind,
        sources: {
          official: country.officialSource,
          oecd: country.oecdSource,
          euTin: country.euTinSource,
        },
        lastUpdated: getLastUpdated(country),
      },
    };
  },
});
