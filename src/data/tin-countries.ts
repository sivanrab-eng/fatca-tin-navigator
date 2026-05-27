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
  oecdSource?: string;
  euTinSource?: string;
};

const OECD_TIN = "https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/";
const eu = (code: string) => `https://ec.europa.eu/taxation_customs/tin/tinByCountry.html?country=${code}`;

export const COUNTRIES: CountryTin[] = [
  {
    code: "IL", nameHe: "ישראל", nameEn: "Israel", flag: "🇮🇱",
    tinNameHe: "מספר זהות / מספר חברה",
    tinNameEn: "Teudat Zehut / Company Number",
    individual: { name: "תעודת זהות", format: "9 ספרות", example: "123456782", note: "הספרה האחרונה היא ספרת ביקורת." },
    entity: { name: "מספר חברה (ח.פ.)", format: "9 ספרות, מתחיל ב-5", example: "512345678" },
    whereToFind: [
      { label: "בתעודת הזהות הביומטרית או בספח", url: "https://www.gov.il/he/departments/topics/identity_card" },
      { label: "באזור האישי ברשות המסים", url: "https://www.misim.gov.il/" },
      { label: "בתלוש שכר או בטופס 106", url: "https://www.gov.il/he/departments/general/form_106" },
      { label: "בדרכון ישראלי", url: "https://www.gov.il/he/departments/topics/passports" },
      { label: "באישור ניכוי מס במקור", url: "https://www.gov.il/he/departments/topics/tax_withholding" },
      { label: "ברשם החברות (לחברות)", url: "https://www.gov.il/he/departments/israel_corporations_authority" }
    ],
    officialSource: "https://www.gov.il/he/departments/israel_tax_authority", oecdSource: OECD_TIN
  },
  {
    code: "GB", nameHe: "הממלכה המאוחדת", nameEn: "United Kingdom", flag: "🇬🇧",
    tinNameHe: "UTR / NINO",
    tinNameEn: "Unique Taxpayer Reference / National Insurance Number",
    individual: { name: "UTR או NINO", format: "UTR: 10 ספרות · NINO: 2 אותיות + 6 ספרות + אות", example: "UTR: 1234567890 · NINO: QQ123456C", note: "ל-FATCA/CRS משתמשים ב-UTR אם מגישים Self Assessment, אחרת NINO." },
    entity: { name: "Corporation Tax UTR / CRN", format: "UTR: 10 ספרות · CRN: 8 ספרות", example: "UTR: 1234567890 · CRN: 12345678" },
    whereToFind: [
      { label: "באזור האישי ב-HMRC", url: "https://www.gov.uk/personal-tax-account" },
      { label: "במכתבי HMRC (SA250, SA316)", url: "https://www.gov.uk/find-utr-number" },
      { label: "בטופס P60, P45 או בתלוש שכר (NINO)", url: "https://www.gov.uk/national-insurance/your-national-insurance-number" },
      { label: "באפליקציית HMRC", url: "https://www.gov.uk/government/publications/the-official-hmrc-app" },
      { label: "במכתב Statement of Account", url: "https://www.gov.uk/log-in-file-self-assessment-tax-return" },
      { label: "ב-Companies House (CRN)", url: "https://find-and-update.company-information.service.gov.uk/" }
    ],
    officialSource: "https://www.gov.uk/find-utr-number", oecdSource: OECD_TIN, euTinSource: eu("UK")
  },
  {
    code: "US", nameHe: "ארצות הברית", nameEn: "United States", flag: "🇺🇸",
    tinNameHe: "SSN / ITIN / EIN",
    tinNameEn: "Social Security Number / ITIN / EIN",
    individual: { name: "SSN (אזרח/תושב) או ITIN (זרים)", format: "9 ספרות: NNN-NN-NNNN", example: "123-45-6789", note: "ITIN מתחיל תמיד ב-9." },
    entity: { name: "EIN", format: "9 ספרות: NN-NNNNNNN", example: "12-3456789" },
    whereToFind: [
      { label: "בכרטיס Social Security", url: "https://www.ssa.gov/number-card" },
      { label: "בטפסי 1040 / W-2 / 1099", url: "https://www.irs.gov/forms-pubs" },
      { label: "באזור האישי ב-IRS", url: "https://www.irs.gov/payments/your-online-account" },
      { label: "במכתב CP 565 (ITIN) או CP 575 (EIN)", url: "https://www.irs.gov/individuals/understanding-your-cp565-notice" },
      { label: "ב-Social Security Statement", url: "https://www.ssa.gov/myaccount/" },
      { label: "בטופס SS-4 שהוגש לעסק (EIN)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/employer-id-numbers" }
    ],
    officialSource: "https://www.irs.gov/individuals/international-taxpayers/taxpayer-identification-numbers-tin", oecdSource: OECD_TIN
  },
  {
    code: "DE", nameHe: "גרמניה", nameEn: "Germany", flag: "🇩🇪",
    tinNameHe: "Steuerliche Identifikationsnummer",
    tinNameEn: "Tax Identification Number (IdNr)",
    individual: { name: "IdNr", format: "11 ספרות", example: "12345678901" },
    entity: { name: "Steuernummer / W-IdNr", format: "10–13 ספרות, או DE + 9 ספרות", example: "12/345/67890 או DE123456789" },
    whereToFind: [
      { label: "במכתב מ-Bundeszentralamt für Steuern", url: "https://www.bzst.de/EN/Private_individuals/Tax_identification_number/Reissuance_of_tax_identification_number/reissuance_tax_identification_number_node.html" },
      { label: "בשומת מס (Steuerbescheid)", url: "https://www.bzst.de/" },
      { label: "בתלוש שכר (Lohnsteuerbescheinigung)", url: "https://www.bzst.de/EN/Private_individuals/Tax_identification_number/tax_identification_number_node.html" },
      { label: "בטופס Einkommensteuererklärung", url: "https://www.elster.de/" },
      { label: "באתר ה-BZSt — בקשה מקוונת", url: "https://www.bzst.de/" },
      { label: "ב-ELSTER (אזור אישי)", url: "https://www.elster.de/" }
    ],
    officialSource: "https://www.bzst.de/EN/Private_individuals/Tax_identification_number/tax_identification_number_node.html", oecdSource: OECD_TIN, euTinSource: eu("DE")
  },
  {
    code: "FR", nameHe: "צרפת", nameEn: "France", flag: "🇫🇷",
    tinNameHe: "Numéro Fiscal de Référence",
    tinNameEn: "Numéro SPI",
    individual: { name: "SPI", format: "13 ספרות, מתחיל ב-0/1/2/3", example: "1234567890123" },
    entity: { name: "SIREN / SIRET", format: "SIREN: 9 ספרות · SIRET: 14 ספרות", example: "SIREN: 123456789 · SIRET: 12345678900012" },
    whereToFind: [
      { label: "בשומת המס (Avis d'imposition)", url: "https://www.impots.gouv.fr/particulier/lavis-dimpot" },
      { label: "בהצהרת המס (Déclaration de revenus)", url: "https://www.impots.gouv.fr/" },
      { label: "באזור האישי impots.gouv.fr", url: "https://www.impots.gouv.fr/accueil" },
      { label: "במכתבי DGFiP", url: "https://www.economie.gouv.fr/dgfip" },
      { label: "ב-Infogreffe (SIREN/SIRET לחברות)", url: "https://www.infogreffe.fr/" },
      { label: "ב-INSEE Sirene", url: "https://www.sirene.fr/" }
    ],
    officialSource: "https://www.impots.gouv.fr/", oecdSource: OECD_TIN, euTinSource: eu("FR")
  },
  {
    code: "CA", nameHe: "קנדה", nameEn: "Canada", flag: "🇨🇦",
    tinNameHe: "SIN / BN",
    tinNameEn: "Social Insurance Number / Business Number",
    individual: { name: "SIN", format: "9 ספרות: NNN-NN-NNNN", example: "123-456-789" },
    entity: { name: "Business Number (BN)", format: "9 ספרות (+ סיומת תוכנית)", example: "123456789RC0001" },
    whereToFind: [
      { label: "בכרטיס ה-SIN או במכתב Service Canada", url: "https://www.canada.ca/en/employment-social-development/services/sin.html" },
      { label: "ב-CRA My Account", url: "https://www.canada.ca/en/revenue-agency/services/e-services/cra-my-account.html" },
      { label: "בטופס T4 או בהחזרי מס (Notice of Assessment)", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/notice-assessment.html" },
      { label: "בטופס RC151 / RC66", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications.html" },
      { label: "ב-My Business Account (BN לחברות)", url: "https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/business-account.html" },
      { label: "במכתב פתיחת תיק עוסק", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/registering-your-business/business-number.html" }
    ],
    officialSource: "https://www.canada.ca/en/revenue-agency.html", oecdSource: OECD_TIN
  },
  {
    code: "AU", nameHe: "אוסטרליה", nameEn: "Australia", flag: "🇦🇺",
    tinNameHe: "TFN / ABN",
    tinNameEn: "Tax File Number / Australian Business Number",
    individual: { name: "TFN", format: "8 או 9 ספרות", example: "123 456 782" },
    entity: { name: "ABN", format: "11 ספרות", example: "12 345 678 901" },
    whereToFind: [
      { label: "במכתב מה-ATO", url: "https://www.ato.gov.au/individuals/tax-file-number/lost-or-stolen-tfn/" },
      { label: "ב-myGov / ATO online", url: "https://my.gov.au/" },
      { label: "בהחזרי מס (Notice of Assessment)", url: "https://www.ato.gov.au/individuals/your-tax-return/check-the-progress-of-your-tax-return/" },
      { label: "בתלוש שכר ובטופס PAYG Summary", url: "https://www.ato.gov.au/individuals/income-and-deductions/income-you-must-declare/income-statement/" },
      { label: "בהודעת Superannuation", url: "https://www.ato.gov.au/individuals/super/" },
      { label: "ב-ABN Lookup (לחברות)", url: "https://abr.business.gov.au/" }
    ],
    officialSource: "https://www.ato.gov.au/", oecdSource: OECD_TIN
  },
  {
    code: "CH", nameHe: "שווייץ", nameEn: "Switzerland", flag: "🇨🇭",
    tinNameHe: "AHV/AVS / UID",
    tinNameEn: "AHV/AVS Number / UID",
    individual: { name: "AHV/AVS", format: "13 ספרות: 756.NNNN.NNNN.NN", example: "756.1234.5678.97" },
    entity: { name: "UID", format: "CHE-NNN.NNN.NNN", example: "CHE-123.456.789" },
    whereToFind: [
      { label: "בכרטיס AHV/AVS", url: "https://www.zas.admin.ch/zas/en/home/particuliers/numero-avs.html" },
      { label: "בתלוש שכר ובמסמכי קרן פנסיה", url: "https://www.bsv.admin.ch/" },
      { label: "בכרטיס ביטוח בריאות", url: "https://www.bag.admin.ch/" },
      { label: "בשומת מס קנטונלית", url: "https://www.estv.admin.ch/" },
      { label: "בחשבון אישי מול קופת הפיצויים", url: "https://www.ahv-iv.ch/" },
      { label: "ב-UID Register (לחברות)", url: "https://www.uid.admin.ch/" }
    ],
    officialSource: "https://www.estv.admin.ch/", oecdSource: OECD_TIN
  },
  {
    code: "NL", nameHe: "הולנד", nameEn: "Netherlands", flag: "🇳🇱",
    tinNameHe: "BSN / RSIN",
    tinNameEn: "Burgerservicenummer / RSIN",
    individual: { name: "BSN", format: "9 ספרות", example: "123456782" },
    entity: { name: "RSIN", format: "9 ספרות", example: "123456789" },
    whereToFind: [
      { label: "בדרכון/ת.ז. הולנדית", url: "https://www.government.nl/topics/personal-data/citizen-service-number-bsn" },
      { label: "ברישיון נהיגה הולנדי", url: "https://www.rdw.nl/" },
      { label: "במכתבי Belastingdienst", url: "https://www.belastingdienst.nl/" },
      { label: "ב-Mijn Belastingdienst", url: "https://mijn.belastingdienst.nl/" },
      { label: "בתלוש שכר", url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontenten/belastingdienst/individuals/" },
      { label: "ב-KVK (לחברות)", url: "https://www.kvk.nl/" }
    ],
    officialSource: "https://www.belastingdienst.nl/", oecdSource: OECD_TIN, euTinSource: eu("NL")
  },
  {
    code: "ES", nameHe: "ספרד", nameEn: "Spain", flag: "🇪🇸",
    tinNameHe: "DNI/NIE / NIF",
    tinNameEn: "DNI/NIE / NIF",
    individual: { name: "DNI (תושב) / NIE (זר)", format: "8 ספרות + אות (DNI) · X/Y/Z + 7 ספרות + אות (NIE)", example: "12345678Z · X1234567L" },
    entity: { name: "NIF", format: "אות + 7 ספרות + תו ביקורת", example: "A12345674" },
    whereToFind: [
      { label: "בכרטיס ה-DNI/NIE", url: "https://www.policia.es/_es/documentacion_expedicion_dni.php" },
      { label: "באישור התושבות (Certificado de Registro)", url: "https://www.interior.gob.es/" },
      { label: "באזור האישי של Agencia Tributaria", url: "https://www.agenciatributaria.gob.es/" },
      { label: "בהצהרת מס (Declaración de la Renta)", url: "https://sede.agenciatributaria.gob.es/" },
      { label: "במכתבי Hacienda", url: "https://www.agenciatributaria.es/" },
      { label: "ב-Registro Mercantil (לחברות)", url: "https://www.rmc.es/" }
    ],
    officialSource: "https://www.agenciatributaria.gob.es/", oecdSource: OECD_TIN, euTinSource: eu("ES")
  },
  {
    code: "IT", nameHe: "איטליה", nameEn: "Italy", flag: "🇮🇹",
    tinNameHe: "Codice Fiscale / Partita IVA",
    tinNameEn: "Codice Fiscale / Partita IVA",
    individual: { name: "Codice Fiscale", format: "16 תווים אלפאנומריים", example: "RSSMRA80A01H501U" },
    entity: { name: "Partita IVA", format: "11 ספרות", example: "12345678901" },
    whereToFind: [
      { label: "בכרטיס Tessera Sanitaria", url: "https://sistemats1.sanita.finanze.it/" },
      { label: "בכרטיס Codice Fiscale הפלסטיק", url: "https://www.agenziaentrate.gov.it/portale/web/guest/schede/istanze/richiesta-ts_cf/infogen-richiesta-ts-cf-cittadini" },
      { label: "באזור האישי של Agenzia delle Entrate", url: "https://www.agenziaentrate.gov.it/" },
      { label: "בהצהרת המס (Modello 730 / Modello Redditi)", url: "https://www.agenziaentrate.gov.it/portale/web/guest/schede/dichiarazioni/730" },
      { label: "בתלוש שכר (Busta paga)", url: "https://www.agenziaentrate.gov.it/" },
      { label: "ב-Registro Imprese (לחברות)", url: "https://www.registroimprese.it/" }
    ],
    officialSource: "https://www.agenziaentrate.gov.it/", oecdSource: OECD_TIN, euTinSource: eu("IT")
  }
];


COUNTRIES.push(
  { code: "IE", nameHe: "אירלנד", nameEn: "Ireland", flag: "🇮🇪",
    tinNameHe: "PPSN / TRN", tinNameEn: "PPS Number / Tax Reference Number",
    individual: { name: "PPSN", format: "7 ספרות + 1-2 אותיות", example: "1234567T" },
    entity: { name: "TRN", format: "7 ספרות + אות", example: "1234567A" },
    whereToFind: [
      { label: "בכרטיס Public Services", url: "https://www.gov.ie/en/service/public-services-card/" },
      { label: "ב-Revenue myAccount", url: "https://www.revenue.ie/en/online-services/services/register-for-an-online-service/register-for-myaccount.aspx" },
      { label: "במכתבי Revenue Commissioners", url: "https://www.revenue.ie/" },
      { label: "בתלוש שכר ובטופס P60", url: "https://www.revenue.ie/en/jobs-and-pensions/end-of-year-statement/index.aspx" },
      { label: "במכתבי Department of Social Protection", url: "https://www.gov.ie/en/organisation/department-of-social-protection/" }
    ],
    officialSource: "https://www.revenue.ie/", oecdSource: OECD_TIN, euTinSource: eu("IE") },
  { code: "BE", nameHe: "בלגיה", nameEn: "Belgium", flag: "🇧🇪",
    tinNameHe: "Numéro National", tinNameEn: "National Number / Enterprise Number",
    individual: { name: "Numéro National", format: "11 ספרות: YY.MM.DD-NNN.NN", example: "85.07.30-033.28" },
    entity: { name: "Enterprise Number", format: "10 ספרות: 0NNN.NNN.NNN", example: "0123.456.749" },
    whereToFind: [
      { label: "בכרטיס הזהות הבלגי (eID)", url: "https://eid.belgium.be/" },
      { label: "ב-MyMinfin", url: "https://finances.belgium.be/" },
      { label: "בשומת המס (Avertissement-Extrait de rôle)", url: "https://finances.belgium.be/fr/particuliers" },
      { label: "בתלוש שכר ובטופס 281.10", url: "https://finances.belgium.be/" },
      { label: "ב-Crossroads Bank for Enterprises (לחברות)", url: "https://kbopub.economie.fgov.be/" }
    ],
    officialSource: "https://finances.belgium.be/", oecdSource: OECD_TIN, euTinSource: eu("BE") },
  { code: "AT", nameHe: "אוסטריה", nameEn: "Austria", flag: "🇦🇹",
    tinNameHe: "Steuernummer / UID", tinNameEn: "Tax Number / UID",
    individual: { name: "Steuernummer", format: "9 ספרות", example: "12-345/6789" },
    entity: { name: "UID-Nummer", format: "ATU + 8 ספרות", example: "ATU12345678" },
    whereToFind: [
      { label: "במכתבים מ-Finanzamt", url: "https://www.bmf.gv.at/" },
      { label: "ב-FinanzOnline", url: "https://finanzonline.bmf.gv.at/" },
      { label: "בשומת מס (Einkommensteuerbescheid)", url: "https://www.bmf.gv.at/services/finanzonline.html" },
      { label: "בתלוש שכר (Lohnzettel)", url: "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung.html" },
      { label: "ב-Firmenbuch (לחברות)", url: "https://justizonline.gv.at/" }
    ],
    officialSource: "https://www.bmf.gv.at/", oecdSource: OECD_TIN, euTinSource: eu("AT") },
  { code: "SE", nameHe: "שוודיה", nameEn: "Sweden", flag: "🇸🇪",
    tinNameHe: "Personnummer / Organisationsnummer", tinNameEn: "Personal / Organisation Number",
    individual: { name: "Personnummer", format: "YYMMDD-NNNN", example: "850730-1234" },
    entity: { name: "Organisationsnummer", format: "10 ספרות: NNNNNN-NNNN", example: "556677-8899" },
    whereToFind: [
      { label: "בכרטיס Skatteverket / ID-kort", url: "https://www.skatteverket.se/privat/folkbokforing/idkort.4.76a43be412206334b89800015830.html" },
      { label: "ב-Mina sidor", url: "https://www.skatteverket.se/privat/etjansterochblanketter/minasidor.4.html" },
      { label: "ברישיון נהיגה שוודי", url: "https://www.transportstyrelsen.se/" },
      { label: "בתלוש שכר ובטופס Kontrolluppgift", url: "https://www.skatteverket.se/" },
      { label: "ב-Bolagsverket (לחברות)", url: "https://www.bolagsverket.se/" }
    ],
    officialSource: "https://www.skatteverket.se/", oecdSource: OECD_TIN, euTinSource: eu("SE") },
);
