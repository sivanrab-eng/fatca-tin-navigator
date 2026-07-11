import { defineMcp } from "@lovable.dev/mcp-js";
import listCountriesTool from "./tools/list-countries";
import getCountryTinTool from "./tools/get-country-tin";
import searchCountriesTool from "./tools/search-countries";

export default defineMcp({
  name: "tinfinder-mcp",
  title: "TIN Finder — FATCA/CRS",
  version: "0.1.0",
  instructions:
    "Reference tool for Tax Identification Numbers (TIN) used in FATCA/CRS reporting. Use `list_countries` to discover ISO codes, `search_countries` to find a country by name, and `get_country_tin` to retrieve the local TIN name, individual and entity formats, examples, where to find the number, and official sources for a specific country. Data is compiled from OECD, EU TIN portal, and local tax authority publications; verify against official sources before relying on it for reporting.",
  tools: [listCountriesTool, getCountryTinTool, searchCountriesTool],
});
