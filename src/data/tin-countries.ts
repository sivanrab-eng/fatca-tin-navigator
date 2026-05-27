export type TinEntry = {
  name: string;
  format: string;
  example: string;
  note?: string;
};

export type WhereToFind = {
  label: string;
  url?: string;
};

export type CountryTin = {
  code: string;
  nameHe: string;
  nameEn: string;
  flag: string;
  tinNameHe: string;
  tinNameEn: string;
  individual: TinEntry;
  entity: TinEntry;
  whereToFind: WhereToFind[];
  officialSource: string;
};

// Data sourced from OECD AEOI TIN portal:
// https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/
export const COUNTRIES: CountryTin[] = [
  {
    code: "IL",
    nameHe: "ישראל",
    nameEn: "Israel",
    flag: "🇮🇱",
    tinNameHe: "מספר זהות / מספר חברה",
    tinNameEn: "Teudat Zehut / Company Number",
    individual: {
      name: "תעודת זהות (Teudat Zehut)",
      format: "9 ספרות",
      example: "123456782",
      note: "הספרה האחרונה היא ספרת ביקורת.",
    },
    entity: {
      name: "מספר חברה (ח.פ.)",
      format: "9 ספרות, מתחיל ב-5",
      example: "512345678",
    },
    whereToFind: [
      { label: "בתעודת הזהות הביומטרית או הספח" },
      { label: "באזור האישי של רשות המסים", url: "https://www.misim.gov.il/" },
      { label: "בתלוש שכר או בטופס 106" },
      { label: "ברשם החברות (לחברות)", url: "https://www.gov.il/he/departments/israel_corporations_authority" },
    ],
    officialSource: "https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Israel-TIN.pdf",
  },
  {
    code: "GB",
    nameHe: "הממלכה המאוחדת",
    nameEn: "United Kingdom",
    flag: "