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

// Data sourced from the OECD AEOI TIN portal and local tax authorities.
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
    flag: "🇬🇧",
    tinNameHe: "UTR / NINO",
    tinNameEn: "Unique Taxpayer Reference / National Insurance Number",
    individual: {
      name: "UTR או NINO",
      format: "UTR: 10 ספרות · NINO: 2 אותיות + 6 ספרות + אות",
      example: "UTR: 1234567890 · NINO: QQ123456C",
      note: "ל-FATCA/CRS משתמשים בדרך כלל ב-UTR ליחיד שמגיש Self Assessment, אחרת NINO.",
    },
    entity: {
      name: "Corporation Tax UTR / CRN",
      format: "UTR: 10 ספרות · CRN: 8 ספרות",
      example: "UTR: 1234567890 · CRN: 12345678",
    },
    whereToFind: [
      { label: "באזור האישי ב-HMRC", url: "https://www.gov.uk/personal-tax-account" },
      { label: "במכתבי HMRC, SA250, SA316" },
      { label: "בטופס P60, P45 או בתלוש שכר (NINO)" },
      { label: "ב-Companies House (CRN לחברות)", url: "https://find-and-update.company-information.service.gov.uk/" },
    ],
    officialSource: "https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/United-Kingdom-TIN.pdf",
  },
  {
    code: "US",
    nameHe: "ארצות הברית",
    nameEn: "United States",
    flag: "🇺🇸",
    tinNameHe: "SSN / ITIN / EIN",
    tinNameEn: "Social Security Number / ITIN / EIN",
    individual: {
      name: "SSN (אזרח/תושב) או ITIN (זרים)",
      format: "9 ספרות בפורמט NNN-NN-NNNN",
      example: "123-45-6789",
      note: "ITIN מתחיל תמיד ב-9.",
    },
    entity: {
      name: "EIN (Employer Identification Number)",
