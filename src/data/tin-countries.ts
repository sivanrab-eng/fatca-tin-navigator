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
  ,
  {
    code: "DE", nameHe: "גרמניה", nameEn: "Germany", flag: "🇩🇪",
    tinNameHe: "Steuerliche Identifikationsnummer",
    tinNameEn: "Tax Identification Number (IdNr)",
    individual: { name: "IdNr", format: "11 ספרות", example: "12345678901" },
    entity: { name: "Steuernummer / W-IdNr", format: "10–13 ספרות, או DE + 9 ספרות", example: "12/345/67890 או DE123456789" },
    whereToFind: [
      { label: "במכתב מ-Bundeszentralamt für Steuern" },
      { label: "בשומת מס (Steuerbescheid)" },
      { label: "בתלוש שכר (Lohnsteuerbescheinigung)" },
      { label: "באתר ה-BZSt", url: "https://www.bzst.de/" }
    ],
    officialSource: "https://www.bzst.de/EN/Private_individuals/Tax_identification_number/tax_identification_number_node.html"
  },
  {
    code: "FR", nameHe: "צרפת", nameEn: "France", flag: "🇫🇷",
    tinNameHe: "Numéro Fiscal de Référence",
    tinNameEn: "Numéro SPI",
    individual: { name: "SPI", format: "13 ספרות, מתחיל ב-0/1/2/3", example: "1234567890123" },
    entity: { name: "SIREN / SIRET", format: "SIREN: 9 ספרות · SIRET: 14 ספרות", example: "SIREN: 123456789 · SIRET: 12345678900012" },
    whereToFind: [
      { label: "בשומת המס (Avis d'imposition)" },
      { label: "באזור האישי impots.gouv.fr", url: "https://www.impots.gouv.fr/" },
      { label: "ב-Infogreffe (SIREN/SIRET לחברות)", url: "https://www.infogreffe.fr/" }
    ],
    officialSource: "https://www.impots.gouv.fr/"
  },
  {
    code: "CA", nameHe: "קנדה", nameEn: "Canada", flag: "🇨🇦",
    tinNameHe: "SIN / BN",
    tinNameEn: "Social Insurance Number / Business Number",
    individual: { name: "SIN", format: "9 ספרות: NNN-NNN-NNN", example: "123-456-789" },
    entity: { name: "Business Number (BN)", format: "9 ספרות (+ סיומת תוכנית)", example: "123456789RC0001" },
    whereToFind: [
      { label: "בכרטיס ה-SIN או במכתב Service Canada" },
      { label: "ב-CRA My Account", url: "https://www.canada.ca/en/revenue-agency/services/e-services/cra-my-account.html" },
      { label: "בטופס T4 או בהחזרי מס" }
    ],
    officialSource: "https://www.canada.ca/en/revenue-agency.html"
  },
  {
    code: "AU", nameHe: "אוסטרליה", nameEn: "Australia", flag: "🇦🇺",
    tinNameHe: "TFN / ABN",
    tinNameEn: "Tax File Number / Australian Business Number",
    individual: { name: "TFN", format: "8 או 9 ספרות", example: "123 456 782" },
    entity: { name: "ABN", format: "11 ספרות", example: "12 345 678 901" },
    whereToFind: [
      { label: "במכתב מה-ATO" },
      { label: "ב-myGov / ATO online", url: "https://my.gov.au/" },
      { label: "ב-ABN Lookup (לחברות)", url: "https://abr.business.gov.au/" }
    ],
    officialSource: "https://www.ato.gov.au/"
  },
  {
    code: "CH", nameHe: "שווייץ", nameEn: "Switzerland", flag: "🇨🇭",
    tinNameHe: "AHV/AVS / UID",
    tinNameEn: "AHV/AVS Number / UID",
    individual: { name: "AHV/AVS", format: "13 ספרות: 756.NNNN.NNNN.NN", example: "756.1234.5678.97" },
    entity: { name: "UID", format: "CHE-NNN.NNN.NNN", example: "CHE-123.456.789" },
    whereToFind: [
      { label: "בכרטיס AHV/AVS" },
      { label: "בתלוש שכר ובמסמכי קרן פנסיה" },
      { label: "ב-UID Register (לחברות)", url: "https://www.uid.admin.ch/" }
    ],
    officialSource: "https://www.estv.admin.ch/"
  },
  {
    code: "NL", nameHe: "הולנד", nameEn: "Netherlands", flag: "🇳🇱",
    tinNameHe: "BSN / RSIN",
    tinNameEn: "Burgerservicenummer / RSIN",
    individual: { name: "BSN", format: "9 ספרות", example: "123456782" },
    entity: { name: "RSIN", format: "9 ספרות", example: "123456789" },
    whereToFind: [
      { label: "בדרכון/ת.ז. הולנדית" },
      { label: "במכתבי Belastingdienst" },
      { label: "ב-Mijn Belastingdienst", url: "https://www.belastingdienst.nl/" },
      { label: "ב-KVK (לחברות)", url: "https://www.kvk.nl/" }
    ],
    officialSource: "https://www.belastingdienst.nl/"
  },
  {
    code: "ES", nameHe: "ספרד", nameEn: "Spain", flag: "🇪🇸",
    tinNameHe: "DNI/NIE / NIF",
    tinNameEn: "DNI/NIE / NIF",
    individual: { name: "DNI (תושב) / NIE (זר)", format: "8 ספרות + אות (DNI) · X/Y/Z + 7 ספרות + אות (NIE)", example: "12345678Z · X1234567L" },
    entity: { name: "NIF", format: "אות + 7 ספרות + תו ביקורת", example: "A12345674" },
    whereToFind: [
      { label: "בכרטיס ה-DNI/NIE" },
      { label: "באזור האישי של Agencia Tributaria", url: "https://www.agenciatributaria.gob.es/" }
    ],
    officialSource: "https://www.agenciatributaria.gob.es/"
  },
  {
    code: "IT", nameHe: "איטליה", nameEn: "Italy", flag: "🇮🇹",
    tinNameHe: "Codice Fiscale / Partita IVA",
    tinNameEn: "Codice Fiscale / Partita IVA",
    individual: { name: "Codice Fiscale", format: "16 תווים אלפאנומריים", example: "RSSMRA80A01H501U" },
    entity: { name: "Partita IVA", format: "11 ספרות", example: "12345678901" },
    whereToFind: [
      { label: "בכרטיס Tessera Sanitaria" },
      { label: "באזור האישי של Agenzia delle Entrate", url: "https://www.agenziaentrate.gov.it/" }
    ],
    officialSource: "https://www.agenziaentrate.gov.it/"
  }
];
