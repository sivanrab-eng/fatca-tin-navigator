export type TinEntry = { name: string; format: string; example: string; note?: string };
export type WhereToFind = { label: string; url?: string };
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

export const COUNTRIES: CountryTin[] = [
  {
    code: "IL", nameHe: "ישראל", nameEn: "Israel", flag: "🇮🇱",
    tinNameHe: "מספר זהות / מספר חברה",
    tinNameEn: "Teudat Zehut / Company Number",
    individual: { name: "תעודת זהות", format: "9 ספרות", example: "123456782", note: "הספרה האחרונה היא ספרת ביקורת." },
    entity: { name: "מספר חברה (ח.פ.)", format: "9 ספרות, מתחיל ב-5", example: "512345678" },
    whereToFind: [
      { label: "בתעודת הזהות הביומטרית או בספח" },
      { label: "באזור האישי ברשות המסים", url: "https://www.misim.gov.il/" },
      { label: "בתלוש שכר או בטופס 106" },
      { label: "ברשם החברות (לחברות)", url: "https://www.gov.il/he/departments/israel_corporations_authority" }
    ],
    officialSource: "https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/"
  },
  {
    code: "GB", nameHe: "הממלכה המאוחדת", nameEn: "United Kingdom", flag: "🇬🇧",
    tinNameHe: "UTR / NINO",
    tinNameEn: "Unique Taxpayer Reference / National Insurance Number",
    individual: { name: "UTR או NINO", format: "UTR: 10 ספרות · NINO: 2 אותיות + 6 ספרות + אות", example: "UTR: 1234567890 · NINO: QQ123456C", note: "ל-FATCA/CRS משתמשים ב-UTR אם מגישים Self Assessment, אחרת NINO." },
    entity: { name: "Corporation Tax UTR / CRN", format: "UTR: 10 ספרות · CRN: 8 ספרות", example: "UTR: 1234567890 · CRN: 12345678" },
    whereToFind: [
      { label: "באזור האישי ב-HMRC", url: "https://www.gov.uk/personal-tax-account" },
      { label: "במכתבי HMRC (SA250, SA316)" },
      { label: "בטופס P60, P45 או בתלוש שכר (NINO)" },
      { label: "ב-Companies House (CRN)", url: "https://find-and-update.company-information.service.gov.uk/" }
    ],
    officialSource: "https://www.gov.uk/find-utr-number"
  },
  {
    code: "US", nameHe: "ארצות הברית", nameEn: "United States", flag: "🇺🇸",
    tinNameHe: "SSN / ITIN / EIN",
    tinNameEn: "Social Security Number / ITIN / EIN",
    individual: { name: "SSN (אזרח/תושב) או ITIN (זרים)", format: "9 ספרות: NNN-NN-NNNN", example: "123-45-6789", note: "ITIN מתחיל תמיד ב-9." },
    entity: { name: "EIN", format: "9 ספרות: NN-NNNNNNN", example: "12-3456789" },
    whereToFind: [
      { label: "בכרטיס Social Security" },
      { label: "בטפסי 1040 / W-2 / 1099" },
      { label: "באזור האישי ב-IRS", url: "https://www.irs.gov/payments/your-online-account" },
      { label: "במכתב CP 575 (EIN)" }
    ],
    officialSource: "https://www.irs.gov/individuals/international-taxpayers/taxpayer-identification-numbers-tin"
  }
];
