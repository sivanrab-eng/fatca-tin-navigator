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

// ========== Expansion: Europe, Americas, Asia-Pacific, Middle East, Africa ==========
COUNTRIES.push(
  { code: "PT", nameHe: "פורטוגל", nameEn: "Portugal", flag: "🇵🇹",
    tinNameHe: "NIF", tinNameEn: "Número de Identificação Fiscal",
    individual: { name: "NIF", format: "9 ספרות", example: "123456789" },
    entity: { name: "NIPC", format: "9 ספרות", example: "501234567" },
    whereToFind: [
      { label: "בכרטיס Cartão de Cidadão", url: "https://www.autenticacao.gov.pt/" },
      { label: "ב-Portal das Finanças", url: "https://www.portaldasfinancas.gov.pt/" },
      { label: "בהצהרת מס (Modelo 3)", url: "https://www.portaldasfinancas.gov.pt/" },
      { label: "במכתבי Autoridade Tributária", url: "https://www.portaldasfinancas.gov.pt/" }
    ],
    officialSource: "https://www.portaldasfinancas.gov.pt/", oecdSource: OECD_TIN, euTinSource: eu("PT") },
  { code: "GR", nameHe: "יוון", nameEn: "Greece", flag: "🇬🇷",
    tinNameHe: "ΑΦΜ (AFM)", tinNameEn: "Tax Registration Number (AFM)",
    individual: { name: "AFM", format: "9 ספרות", example: "123456789" },
    entity: { name: "AFM", format: "9 ספרות", example: "999123456" },
    whereToFind: [
      { label: "ב-AADE (Taxisnet)", url: "https://www.aade.gr/" },
      { label: "בשומת המס (Εκκαθαριστικό)", url: "https://www.aade.gr/" },
      { label: "במכתב רישום מס", url: "https://www.aade.gr/" }
    ],
    officialSource: "https://www.aade.gr/", oecdSource: OECD_TIN, euTinSource: eu("EL") },
  { code: "PL", nameHe: "פולין", nameEn: "Poland", flag: "🇵🇱",
    tinNameHe: "PESEL / NIP", tinNameEn: "PESEL / NIP",
    individual: { name: "PESEL", format: "11 ספרות", example: "85073012345" },
    entity: { name: "NIP", format: "10 ספרות", example: "1234567890" },
    whereToFind: [
      { label: "בתעודת זהות פולנית", url: "https://www.gov.pl/web/gov/uzyskaj-dowod-osobisty" },
      { label: "ב-e-Urząd Skarbowy", url: "https://www.podatki.gov.pl/" },
      { label: "במכתבי Urząd Skarbowy", url: "https://www.podatki.gov.pl/" },
      { label: "ב-KRS (לחברות)", url: "https://krs.ms.gov.pl/" }
    ],
    officialSource: "https://www.podatki.gov.pl/", oecdSource: OECD_TIN, euTinSource: eu("PL") },
  { code: "CZ", nameHe: "צ׳כיה", nameEn: "Czech Republic", flag: "🇨🇿",
    tinNameHe: "Rodné číslo / DIČ", tinNameEn: "Personal Number / DIČ",
    individual: { name: "Rodné číslo", format: "YYMMDD/NNNN", example: "850730/1234" },
    entity: { name: "DIČ", format: "CZ + 8-10 ספרות", example: "CZ12345678" },
    whereToFind: [
      { label: "בתעודת זהות צ׳כית", url: "https://www.mvcr.cz/" },
      { label: "ב-MOJE daně", url: "https://www.mojedane.cz/" },
      { label: "בשומות Finanční úřad", url: "https://www.financnisprava.cz/" }
    ],
    officialSource: "https://www.financnisprava.cz/", oecdSource: OECD_TIN, euTinSource: eu("CZ") },
  { code: "HU", nameHe: "הונגריה", nameEn: "Hungary", flag: "🇭🇺",
    tinNameHe: "Adóazonosító jel", tinNameEn: "Tax Identification Code",
    individual: { name: "Adóazonosító", format: "10 ספרות, מתחיל ב-8", example: "8123456789" },
    entity: { name: "Adószám", format: "11 ספרות: NNNNNNNN-N-NN", example: "12345678-2-41" },
    whereToFind: [
      { label: "בכרטיס Adóigazolvány", url: "https://www.nav.gov.hu/" },
      { label: "ב-eBEV / NAV ügyfélkapu", url: "https://nav.gov.hu/" },
      { label: "בשומות NAV", url: "https://www.nav.gov.hu/" }
    ],
    officialSource: "https://www.nav.gov.hu/", oecdSource: OECD_TIN, euTinSource: eu("HU") },
  { code: "RO", nameHe: "רומניה", nameEn: "Romania", flag: "🇷🇴",
    tinNameHe: "CNP / CUI", tinNameEn: "CNP / CUI",
    individual: { name: "CNP", format: "13 ספרות", example: "1850730123456" },
    entity: { name: "CUI", format: "2-10 ספרות (לעיתים RO+)", example: "RO12345678" },
    whereToFind: [
      { label: "בתעודת זהות רומנית", url: "https://www.mai.gov.ro/" },
      { label: "ב-ANAF SPV", url: "https://www.anaf.ro/" },
      { label: "במכתבי ANAF", url: "https://www.anaf.ro/" }
    ],
    officialSource: "https://www.anaf.ro/", oecdSource: OECD_TIN, euTinSource: eu("RO") },
  { code: "BG", nameHe: "בולגריה", nameEn: "Bulgaria", flag: "🇧🇬",
    tinNameHe: "EGN / BULSTAT", tinNameEn: "EGN / BULSTAT (EIK)",
    individual: { name: "EGN", format: "10 ספרות", example: "8507301234" },
    entity: { name: "EIK / BULSTAT", format: "9 או 13 ספרות", example: "123456789" },
    whereToFind: [
      { label: "בתעודת זהות בולגרית", url: "https://www.mvr.bg/" },
      { label: "ב-NRA portal", url: "https://nra.bg/" }
    ],
    officialSource: "https://nra.bg/", oecdSource: OECD_TIN, euTinSource: eu("BG") },
  { code: "DK", nameHe: "דנמרק", nameEn: "Denmark", flag: "🇩🇰",
    tinNameHe: "CPR / CVR", tinNameEn: "CPR / CVR",
    individual: { name: "CPR", format: "DDMMYY-NNNN", example: "300785-1234" },
    entity: { name: "CVR", format: "8 ספרות", example: "12345678" },
    whereToFind: [
      { label: "בכרטיס בריאות הצהוב", url: "https://www.borger.dk/" },
      { label: "ב-Skat.dk (TastSelv)", url: "https://www.skat.dk/" },
      { label: "ב-CVR Register (לחברות)", url: "https://datacvr.virk.dk/" }
    ],
    officialSource: "https://www.skat.dk/", oecdSource: OECD_TIN, euTinSource: eu("DK") },
  { code: "FI", nameHe: "פינלנד", nameEn: "Finland", flag: "🇫🇮",
    tinNameHe: "Henkilötunnus / Y-tunnus", tinNameEn: "HETU / Business ID",
    individual: { name: "HETU", format: "DDMMYY+/-/A + 3 ספרות + תו ביקורת", example: "300785-123J" },
    entity: { name: "Y-tunnus", format: "7 ספרות + תו ביקורת", example: "1234567-8" },
    whereToFind: [
      { label: "ב-OmaVero", url: "https://www.vero.fi/" },
      { label: "בכרטיס Kela", url: "https://www.kela.fi/" },
      { label: "ב-YTJ (לחברות)", url: "https://www.ytj.fi/" }
    ],
    officialSource: "https://www.vero.fi/", oecdSource: OECD_TIN, euTinSource: eu("FI") },
  { code: "NO", nameHe: "נורווגיה", nameEn: "Norway", flag: "🇳🇴",
    tinNameHe: "Fødselsnummer / Org.nr", tinNameEn: "National ID / Org. number",
    individual: { name: "Fødselsnummer", format: "11 ספרות", example: "30078512345" },
    entity: { name: "Organisasjonsnummer", format: "9 ספרות", example: "123456789" },
    whereToFind: [
      { label: "ב-Skatteetaten Min skatt", url: "https://www.skatteetaten.no/" },
      { label: "ב-Brønnøysundregistrene (לחברות)", url: "https://www.brreg.no/" }
    ],
    officialSource: "https://www.skatteetaten.no/", oecdSource: OECD_TIN },
  { code: "IS", nameHe: "איסלנד", nameEn: "Iceland", flag: "🇮🇸",
    tinNameHe: "Kennitala", tinNameEn: "Kennitala",
    individual: { name: "Kennitala", format: "10 ספרות: DDMMYY-NNNN", example: "300785-1239" },
    entity: { name: "Kennitala (חברה)", format: "10 ספרות", example: "5012345670" },
    whereToFind: [
      { label: "ב-Skatturinn", url: "https://www.skatturinn.is/" },
      { label: "ב-Þjóðskrá (רשם האוכלוסין)", url: "https://www.skra.is/" }
    ],
    officialSource: "https://www.skatturinn.is/", oecdSource: OECD_TIN },
  { code: "LU", nameHe: "לוקסמבורג", nameEn: "Luxembourg", flag: "🇱🇺",
    tinNameHe: "Matricule / TVA", tinNameEn: "National ID / VAT",
    individual: { name: "Matricule", format: "13 ספרות (YYYYMMDDXXXXX)", example: "1985073012345" },
    entity: { name: "TVA", format: "LU + 8 ספרות", example: "LU12345678" },
    whereToFind: [
      { label: "ב-Guichet.lu", url: "https://guichet.public.lu/" },
      { label: "במכתבי Administration des contributions directes", url: "https://impotsdirects.public.lu/" }
    ],
    officialSource: "https://impotsdirects.public.lu/", oecdSource: OECD_TIN, euTinSource: eu("LU") },
  { code: "SK", nameHe: "סלובקיה", nameEn: "Slovakia", flag: "🇸🇰",
    tinNameHe: "Rodné číslo / DIČ", tinNameEn: "Birth Number / DIČ",
    individual: { name: "Rodné číslo", format: "YYMMDD/NNNN", example: "850730/1234" },
    entity: { name: "DIČ", format: "10 ספרות", example: "1234567890" },
    whereToFind: [{ label: "ב-Finančná správa", url: "https://www.financnasprava.sk/" }],
    officialSource: "https://www.financnasprava.sk/", oecdSource: OECD_TIN, euTinSource: eu("SK") },
  { code: "SI", nameHe: "סלובניה", nameEn: "Slovenia", flag: "🇸🇮",
    tinNameHe: "Davčna številka", tinNameEn: "Tax Number",
    individual: { name: "Davčna številka", format: "8 ספרות", example: "12345678" },
    entity: { name: "Davčna številka", format: "8 ספרות", example: "87654321" },
    whereToFind: [{ label: "ב-eDavki (FURS)", url: "https://edavki.durs.si/" }],
    officialSource: "https://www.fu.gov.si/", oecdSource: OECD_TIN, euTinSource: eu("SI") },
  { code: "HR", nameHe: "קרואטיה", nameEn: "Croatia", flag: "🇭🇷",
    tinNameHe: "OIB", tinNameEn: "OIB",
    individual: { name: "OIB", format: "11 ספרות", example: "12345678901" },
    entity: { name: "OIB", format: "11 ספרות", example: "98765432109" },
    whereToFind: [{ label: "ב-ePorezna", url: "https://e-porezna.porezna-uprava.hr/" }],
    officialSource: "https://www.porezna-uprava.hr/", oecdSource: OECD_TIN, euTinSource: eu("HR") },
  { code: "EE", nameHe: "אסטוניה", nameEn: "Estonia", flag: "🇪🇪",
    tinNameHe: "Isikukood / Registrikood", tinNameEn: "Personal Code / Registry Code",
    individual: { name: "Isikukood", format: "11 ספרות", example: "38507301234" },
    entity: { name: "Registrikood", format: "8 ספרות", example: "12345678" },
    whereToFind: [{ label: "ב-e-MTA", url: "https://www.emta.ee/" }],
    officialSource: "https://www.emta.ee/", oecdSource: OECD_TIN, euTinSource: eu("EE") },
  { code: "LV", nameHe: "לטביה", nameEn: "Latvia", flag: "🇱🇻",
    tinNameHe: "Personas kods", tinNameEn: "Personal Code",
    individual: { name: "Personas kods", format: "11 ספרות: DDMMYY-NNNNN", example: "300785-12345" },
    entity: { name: "Reģistrācijas numurs", format: "11 ספרות", example: "40003012345" },
    whereToFind: [{ label: "ב-EDS (VID)", url: "https://eds.vid.gov.lv/" }],
    officialSource: "https://www.vid.gov.lv/", oecdSource: OECD_TIN, euTinSource: eu("LV") },
  { code: "LT", nameHe: "ליטא", nameEn: "Lithuania", flag: "🇱🇹",
    tinNameHe: "Asmens kodas", tinNameEn: "Personal Code",
    individual: { name: "Asmens kodas", format: "11 ספרות", example: "38507301234" },
    entity: { name: "Įmonės kodas", format: "9 ספרות", example: "123456789" },
    whereToFind: [{ label: "ב-Mano VMI", url: "https://www.vmi.lt/" }],
    officialSource: "https://www.vmi.lt/", oecdSource: OECD_TIN, euTinSource: eu("LT") },
  { code: "MT", nameHe: "מלטה", nameEn: "Malta", flag: "🇲🇹",
    tinNameHe: "ID Card Number / TIN", tinNameEn: "ID Number / TIN",
    individual: { name: "ID Number", format: "7 ספרות + אות", example: "1234567M" },
    entity: { name: "TIN", format: "9 ספרות", example: "123456789" },
    whereToFind: [{ label: "ב-CFR Services Online", url: "https://cfr.gov.mt/" }],
    officialSource: "https://cfr.gov.mt/", oecdSource: OECD_TIN, euTinSource: eu("MT") },
  { code: "CY", nameHe: "קפריסין", nameEn: "Cyprus", flag: "🇨🇾",
    tinNameHe: "TIC", tinNameEn: "Tax Identification Code",
    individual: { name: "TIC", format: "8 ספרות + אות", example: "12345678X" },
    entity: { name: "TIC", format: "8 ספרות + אות", example: "12345678X" },
    whereToFind: [{ label: "ב-TAXISnet", url: "https://taxisnet.mof.gov.cy/" }],
    officialSource: "https://www.mof.gov.cy/tax", oecdSource: OECD_TIN, euTinSource: eu("CY") },

  // ===== Americas =====
  { code: "MX", nameHe: "מקסיקו", nameEn: "Mexico", flag: "🇲🇽",
    tinNameHe: "RFC / CURP", tinNameEn: "RFC / CURP",
    individual: { name: "RFC", format: "13 תווים (יחיד) / 12 תווים (חברה)", example: "VECJ880326XXX" },
    entity: { name: "RFC", format: "12 תווים", example: "ABC680524P76" },
    whereToFind: [
      { label: "ב-SAT (Constancia de Situación Fiscal)", url: "https://www.sat.gob.mx/" },
      { label: "ב-CURP Portal", url: "https://www.gob.mx/curp/" }
    ],
    officialSource: "https://www.sat.gob.mx/", oecdSource: OECD_TIN },
  { code: "BR", nameHe: "ברזיל", nameEn: "Brazil", flag: "🇧🇷",
    tinNameHe: "CPF / CNPJ", tinNameEn: "CPF / CNPJ",
    individual: { name: "CPF", format: "11 ספרות: NNN.NNN.NNN-NN", example: "123.456.789-09" },
    entity: { name: "CNPJ", format: "14 ספרות: NN.NNN.NNN/NNNN-NN", example: "12.345.678/0001-95" },
    whereToFind: [
      { label: "ב-Receita Federal", url: "https://www.gov.br/receitafederal/" },
      { label: "ב-app Meu CPF", url: "https://www.gov.br/receitafederal/" }
    ],
    officialSource: "https://www.gov.br/receitafederal/", oecdSource: OECD_TIN },
  { code: "AR", nameHe: "ארגנטינה", nameEn: "Argentina", flag: "🇦🇷",
    tinNameHe: "CUIT / CUIL / CDI", tinNameEn: "CUIT / CUIL / CDI",
    individual: { name: "CUIL / CUIT", format: "11 ספרות: XX-NNNNNNNN-X", example: "20-12345678-9" },
    entity: { name: "CUIT", format: "11 ספרות", example: "30-12345678-9" },
    whereToFind: [{ label: "ב-AFIP", url: "https://www.afip.gob.ar/" }],
    officialSource: "https://www.afip.gob.ar/", oecdSource: OECD_TIN },
  { code: "CL", nameHe: "צ׳ילה", nameEn: "Chile", flag: "🇨🇱",
    tinNameHe: "RUT / RUN", tinNameEn: "RUT / RUN",
    individual: { name: "RUN", format: "7-8 ספרות + תו ביקורת", example: "12.345.678-5" },
    entity: { name: "RUT", format: "7-8 ספרות + תו ביקורת", example: "76.123.456-K" },
    whereToFind: [{ label: "ב-SII (Servicio de Impuestos Internos)", url: "https://www.sii.cl/" }],
    officialSource: "https://www.sii.cl/", oecdSource: OECD_TIN },
  { code: "CO", nameHe: "קולומביה", nameEn: "Colombia", flag: "🇨🇴",
    tinNameHe: "NIT / Cédula", tinNameEn: "NIT / Cédula",
    individual: { name: "Cédula", format: "8-10 ספרות", example: "1234567890" },
    entity: { name: "NIT", format: "9-10 ספרות + תו ביקורת", example: "900123456-7" },
    whereToFind: [{ label: "ב-DIAN (RUT)", url: "https://www.dian.gov.co/" }],
    officialSource: "https://www.dian.gov.co/", oecdSource: OECD_TIN },
  { code: "PE", nameHe: "פרו", nameEn: "Peru", flag: "🇵🇪",
    tinNameHe: "RUC / DNI", tinNameEn: "RUC / DNI",
    individual: { name: "DNI", format: "8 ספרות", example: "12345678" },
    entity: { name: "RUC", format: "11 ספרות", example: "20123456789" },
    whereToFind: [{ label: "ב-SUNAT", url: "https://www.sunat.gob.pe/" }],
    officialSource: "https://www.sunat.gob.pe/", oecdSource: OECD_TIN },
  { code: "UY", nameHe: "אורוגוואי", nameEn: "Uruguay", flag: "🇺🇾",
    tinNameHe: "RUT / CI", tinNameEn: "RUT / CI",
    individual: { name: "CI", format: "7-8 ספרות + תו ביקורת", example: "1.234.567-8" },
    entity: { name: "RUT", format: "12 ספרות", example: "210123450017" },
    whereToFind: [{ label: "ב-DGI", url: "https://www.dgi.gub.uy/" }],
    officialSource: "https://www.dgi.gub.uy/", oecdSource: OECD_TIN },

  // ===== Asia-Pacific =====
  { code: "JP", nameHe: "יפן", nameEn: "Japan", flag: "🇯🇵",
    tinNameHe: "My Number / Corporate Number", tinNameEn: "Individual Number / Corporate Number",
    individual: { name: "My Number", format: "12 ספרות", example: "123456789012" },
    entity: { name: "Corporate Number", format: "13 ספרות", example: "1234567890123" },
    whereToFind: [
      { label: "בכרטיס My Number", url: "https://www.kojinbango-card.go.jp/en/" },
      { label: "ב-National Tax Agency (NTA)", url: "https://www.nta.go.jp/" }
    ],
    officialSource: "https://www.nta.go.jp/english/", oecdSource: OECD_TIN },
  { code: "KR", nameHe: "דרום קוריאה", nameEn: "South Korea", flag: "🇰🇷",
    tinNameHe: "RRN / BRN", tinNameEn: "Resident Registration / Business Registration Number",
    individual: { name: "RRN", format: "13 ספרות: YYMMDD-NNNNNNN", example: "850730-1234567" },
    entity: { name: "BRN", format: "10 ספרות: NNN-NN-NNNNN", example: "123-45-67890" },
    whereToFind: [{ label: "ב-Hometax (NTS)", url: "https://www.hometax.go.kr/" }],
    officialSource: "https://www.nts.go.kr/english/", oecdSource: OECD_TIN },
  { code: "CN", nameHe: "סין", nameEn: "China", flag: "🇨🇳",
    tinNameHe: "TIN (ID יחיד / USCC חברה)", tinNameEn: "Citizen ID / USCC",
    individual: { name: "Citizen ID", format: "18 ספרות", example: "11010119850730123X" },
    entity: { name: "USCC", format: "18 תווים אלפאנומריים", example: "91110000123456789X" },
    whereToFind: [{ label: "ב-State Tax Administration", url: "https://www.chinatax.gov.cn/" }],
    officialSource: "https://www.chinatax.gov.cn/", oecdSource: OECD_TIN },
  { code: "HK", nameHe: "הונג קונג", nameEn: "Hong Kong", flag: "🇭🇰",
    tinNameHe: "HKID / BR Number", tinNameEn: "HKID / Business Registration Number",
    individual: { name: "HKID", format: "1-2 אותיות + 6 ספרות + תו ביקורת", example: "A123456(7)" },
    entity: { name: "BR Number", format: "8 ספרות + 3 ספרות סניף", example: "12345678-000" },
    whereToFind: [{ label: "ב-IRD eTAX", url: "https://www.ird.gov.hk/" }],
    officialSource: "https://www.ird.gov.hk/", oecdSource: OECD_TIN },
  { code: "SG", nameHe: "סינגפור", nameEn: "Singapore", flag: "🇸🇬",
    tinNameHe: "NRIC / FIN / UEN", tinNameEn: "NRIC / FIN / UEN",
    individual: { name: "NRIC / FIN", format: "אות + 7 ספרות + תו ביקורת", example: "S1234567D" },
    entity: { name: "UEN", format: "9-10 תווים", example: "201912345A" },
    whereToFind: [
      { label: "ב-IRAS myTax Portal", url: "https://mytax.iras.gov.sg/" },
      { label: "ב-Singpass", url: "https://www.singpass.gov.sg/" }
    ],
    officialSource: "https://www.iras.gov.sg/", oecdSource: OECD_TIN },
  { code: "TW", nameHe: "טייוואן", nameEn: "Taiwan", flag: "🇹🇼",
    tinNameHe: "National ID / Business ID", tinNameEn: "National ID / Profit-Seeking Enterprise ID",
    individual: { name: "National ID", format: "אות + 9 ספרות", example: "A123456789" },
    entity: { name: "Business ID", format: "8 ספרות", example: "12345678" },
    whereToFind: [{ label: "ב-eTax Portal (MoF)", url: "https://www.etax.nat.gov.tw/" }],
    officialSource: "https://www.dot.gov.tw/", oecdSource: OECD_TIN },
  { code: "IN", nameHe: "הודו", nameEn: "India", flag: "🇮🇳",
    tinNameHe: "PAN", tinNameEn: "Permanent Account Number",
    individual: { name: "PAN", format: "5 אותיות + 4 ספרות + אות", example: "ABCPD1234E" },
    entity: { name: "PAN", format: "5 אותיות + 4 ספרות + אות", example: "AAACR5055K" },
    whereToFind: [
      { label: "בכרטיס PAN", url: "https://www.incometax.gov.in/" },
      { label: "ב-Income Tax e-Filing Portal", url: "https://www.incometax.gov.in/" }
    ],
    officialSource: "https://www.incometax.gov.in/", oecdSource: OECD_TIN },
  { code: "ID", nameHe: "אינדונזיה", nameEn: "Indonesia", flag: "🇮🇩",
    tinNameHe: "NPWP", tinNameEn: "Nomor Pokok Wajib Pajak",
    individual: { name: "NPWP", format: "15 ספרות (או NIK 16 ספרות)", example: "12.345.678.9-012.000" },
    entity: { name: "NPWP", format: "15 ספרות", example: "01.234.567.8-901.000" },
    whereToFind: [{ label: "ב-DJP Online", url: "https://djponline.pajak.go.id/" }],
    officialSource: "https://www.pajak.go.id/", oecdSource: OECD_TIN },
  { code: "MY", nameHe: "מלזיה", nameEn: "Malaysia", flag: "🇲🇾",
    tinNameHe: "TIN (LHDN)", tinNameEn: "Tax Identification Number (LHDN)",
    individual: { name: "TIN (IG)", format: "IG + 10-11 ספרות", example: "IG12345678901" },
    entity: { name: "TIN (C)", format: "C + 10-11 ספרות", example: "C12345678901" },
    whereToFind: [{ label: "ב-MyTax (LHDN)", url: "https://mytax.hasil.gov.my/" }],
    officialSource: "https://www.hasil.gov.my/", oecdSource: OECD_TIN },
  { code: "TH", nameHe: "תאילנד", nameEn: "Thailand", flag: "🇹🇭",
    tinNameHe: "TIN", tinNameEn: "Tax Identification Number",
    individual: { name: "TIN", format: "13 ספרות", example: "1234567890123" },
    entity: { name: "TIN (חברה)", format: "13 ספרות", example: "1234567890123" },
    whereToFind: [{ label: "ב-Revenue Department", url: "https://www.rd.go.th/" }],
    officialSource: "https://www.rd.go.th/english/", oecdSource: OECD_TIN },
  { code: "PH", nameHe: "פיליפינים", nameEn: "Philippines", flag: "🇵🇭",
    tinNameHe: "TIN (BIR)", tinNameEn: "Tax Identification Number (BIR)",
    individual: { name: "TIN", format: "9-12 ספרות: NNN-NNN-NNN-NNN", example: "123-456-789-000" },
    entity: { name: "TIN", format: "9-12 ספרות", example: "123-456-789-000" },
    whereToFind: [{ label: "ב-BIR eServices", url: "https://www.bir.gov.ph/" }],
    officialSource: "https://www.bir.gov.ph/", oecdSource: OECD_TIN },
  { code: "VN", nameHe: "וייטנאם", nameEn: "Vietnam", flag: "🇻🇳",
    tinNameHe: "MST", tinNameEn: "Mã số thuế",
    individual: { name: "MST", format: "10 ספרות", example: "1234567890" },
    entity: { name: "MST", format: "10 או 13 ספרות", example: "0101234567" },
    whereToFind: [{ label: "ב-General Department of Taxation", url: "https://www.gdt.gov.vn/" }],
    officialSource: "https://www.gdt.gov.vn/", oecdSource: OECD_TIN },
  { code: "NZ", nameHe: "ניו זילנד", nameEn: "New Zealand", flag: "🇳🇿",
    tinNameHe: "IRD Number", tinNameEn: "IRD Number",
    individual: { name: "IRD Number", format: "8-9 ספרות", example: "123-456-789" },
    entity: { name: "IRD Number", format: "8-9 ספרות", example: "123-456-789" },
    whereToFind: [{ label: "ב-myIR", url: "https://www.ird.govt.nz/myir" }],
    officialSource: "https://www.ird.govt.nz/", oecdSource: OECD_TIN },

  // ===== Middle East =====
  { code: "AE", nameHe: "איחוד האמירויות", nameEn: "United Arab Emirates", flag: "🇦🇪",
    tinNameHe: "TRN / Emirates ID", tinNameEn: "Tax Registration Number / Emirates ID",
    individual: { name: "Emirates ID", format: "15 ספרות: 784-YYYY-NNNNNNN-N", example: "784-1985-1234567-1" },
    entity: { name: "TRN", format: "15 ספרות", example: "100123456700003" },
    whereToFind: [
      { label: "ב-EmaraTax (FTA)", url: "https://eservices.tax.gov.ae/" },
      { label: "ב-ICP (Emirates ID)", url: "https://icp.gov.ae/" }
    ],
    officialSource: "https://tax.gov.ae/", oecdSource: OECD_TIN },
  { code: "SA", nameHe: "ערב הסעודית", nameEn: "Saudi Arabia", flag: "🇸🇦",
    tinNameHe: "TIN (ZATCA)", tinNameEn: "Tax Identification Number",
    individual: { name: "National ID / Iqama", format: "10 ספרות", example: "1234567890" },
    entity: { name: "TIN", format: "15 ספרות", example: "300123456700003" },
    whereToFind: [{ label: "ב-ZATCA Portal", url: "https://zatca.gov.sa/" }],
    officialSource: "https://zatca.gov.sa/", oecdSource: OECD_TIN },
  { code: "QA", nameHe: "קטאר", nameEn: "Qatar", flag: "🇶🇦",
    tinNameHe: "TIN (GTA)", tinNameEn: "Tax Identification Number",
    individual: { name: "QID", format: "11 ספרות", example: "28512345678" },
    entity: { name: "TIN", format: "10 ספרות", example: "1234567890" },
    whereToFind: [{ label: "ב-Dhareeba (GTA)", url: "https://dhareeba.gov.qa/" }],
    officialSource: "https://www.gta.gov.qa/", oecdSource: OECD_TIN },
  { code: "BH", nameHe: "בחריין", nameEn: "Bahrain", flag: "🇧🇭",
    tinNameHe: "CPR / VAT Number", tinNameEn: "CPR / VAT Account Number",
    individual: { name: "CPR", format: "9 ספרות", example: "850712345" },
    entity: { name: "VAT Number", format: "15 ספרות", example: "200000123400002" },
    whereToFind: [{ label: "ב-NBR", url: "https://www.nbr.gov.bh/" }],
    officialSource: "https://www.nbr.gov.bh/", oecdSource: OECD_TIN },
  { code: "TR", nameHe: "טורקיה", nameEn: "Türkiye", flag: "🇹🇷",
    tinNameHe: "TCKN / VKN", tinNameEn: "TC Kimlik No / Vergi Kimlik No",
    individual: { name: "TCKN", format: "11 ספרות", example: "12345678901" },
    entity: { name: "VKN", format: "10 ספרות", example: "1234567890" },
    whereToFind: [
      { label: "ב-Interaktif Vergi Dairesi", url: "https://ivd.gib.gov.tr/" },
      { label: "ב-e-Devlet", url: "https://www.turkiye.gov.tr/" }
    ],
    officialSource: "https://www.gib.gov.tr/", oecdSource: OECD_TIN },

  // ===== Africa =====
  { code: "ZA", nameHe: "דרום אפריקה", nameEn: "South Africa", flag: "🇿🇦",
    tinNameHe: "TRN (SARS)", tinNameEn: "Tax Reference Number",
    individual: { name: "Tax Number", format: "10 ספרות, מתחיל ב-0/1/2/3", example: "0123456789" },
    entity: { name: "Tax Number", format: "10 ספרות, מתחיל ב-9", example: "9123456789" },
    whereToFind: [{ label: "ב-SARS eFiling", url: "https://www.sarsefiling.co.za/" }],
    officialSource: "https://www.sars.gov.za/", oecdSource: OECD_TIN },
  { code: "EG", nameHe: "מצרים", nameEn: "Egypt", flag: "🇪🇬",
    tinNameHe: "TIN (ETA)", tinNameEn: "Tax Identification Number",
    individual: { name: "National ID", format: "14 ספרות", example: "28507301234567" },
    entity: { name: "TIN", format: "9 ספרות", example: "123456789" },
    whereToFind: [{ label: "ב-Egyptian Tax Authority", url: "https://www.eta.gov.eg/" }],
    officialSource: "https://www.eta.gov.eg/", oecdSource: OECD_TIN },
  { code: "MA", nameHe: "מרוקו", nameEn: "Morocco", flag: "🇲🇦",
    tinNameHe: "IF / ICE", tinNameEn: "Identifiant Fiscal / ICE",
    individual: { name: "IF", format: "7-8 ספרות", example: "12345678" },
    entity: { name: "ICE", format: "15 ספרות", example: "001234567000012" },
    whereToFind: [{ label: "ב-DGI (SIMPL)", url: "https://www.tax.gov.ma/" }],
    officialSource: "https://www.tax.gov.ma/", oecdSource: OECD_TIN },
  { code: "NG", nameHe: "ניגריה", nameEn: "Nigeria", flag: "🇳🇬",
    tinNameHe: "TIN (FIRS)", tinNameEn: "Tax Identification Number",
    individual: { name: "TIN", format: "10-12 ספרות", example: "123456789012" },
    entity: { name: "TIN", format: "10 ספרות", example: "1234567890" },
    whereToFind: [{ label: "ב-FIRS TaxPro", url: "https://taxpromax.firs.gov.ng/" }],
    officialSource: "https://www.firs.gov.ng/", oecdSource: OECD_TIN },
  { code: "KE", nameHe: "קניה", nameEn: "Kenya", flag: "🇰🇪",
    tinNameHe: "PIN (KRA)", tinNameEn: "Personal Identification Number",
    individual: { name: "KRA PIN", format: "A + 9 ספרות + אות", example: "A001234567B" },
    entity: { name: "KRA PIN", format: "P + 9 ספרות + אות", example: "P051234567X" },
    whereToFind: [{ label: "ב-iTax", url: "https://itax.kra.go.ke/" }],
    officialSource: "https://www.kra.go.ke/", oecdSource: OECD_TIN },

  // ===== Offshore / financial hubs =====
  { code: "JE", nameHe: "ג׳רסי", nameEn: "Jersey", flag: "🇯🇪",
    tinNameHe: "TIN", tinNameEn: "Tax Identification Number",
    individual: { name: "TIN", format: "אות + 7 ספרות", example: "JY123456A" },
    entity: { name: "TIN (חברה)", format: "מספר רישום", example: "12345" },
    whereToFind: [{ label: "ב-Revenue Jersey", url: "https://www.gov.je/taxesmoney/" }],
    officialSource: "https://www.gov.je/taxesmoney/", oecdSource: OECD_TIN },
  { code: "GG", nameHe: "גרנזי", nameEn: "Guernsey", flag: "🇬🇬",
    tinNameHe: "TIN", tinNameEn: "Tax Reference",
    individual: { name: "TIN", format: "GY + 6 ספרות + תו ביקורת", example: "GY1234567" },
    entity: { name: "TIN", format: "GY + 6 ספרות", example: "GY123456" },
    whereToFind: [{ label: "ב-Revenue Service", url: "https://www.gov.gg/revenueservice" }],
    officialSource: "https://www.gov.gg/", oecdSource: OECD_TIN },
  { code: "IM", nameHe: "האי מאן", nameEn: "Isle of Man", flag: "🇮🇲",
    tinNameHe: "TRN", tinNameEn: "Tax Reference Number",
    individual: { name: "TRN", format: "6 ספרות + אות", example: "123456A" },
    entity: { name: "TRN (חברה)", format: "C + 6 ספרות", example: "C123456" },
    whereToFind: [{ label: "ב-Online Services (Treasury)", url: "https://services.gov.im/" }],
    officialSource: "https://www.gov.im/categories/tax-vat-and-your-money/", oecdSource: OECD_TIN },
  { code: "KY", nameHe: "איי קיימן", nameEn: "Cayman Islands", flag: "🇰🇾",
    tinNameHe: "אין TIN", tinNameEn: "No TIN issued",
    individual: { name: "—", format: "איי קיימן אינם מנפיקים TIN ליחידים", example: "—", note: "לדיווח CRS משתמשים בדרך כלל ב-FI ID של מוסד פיננסי או במספרים חלופיים." },
    entity: { name: "GIIN / Entity ID", format: "GIIN של מוסד פיננסי", example: "XXXXXX.XXXXX.LE.136" },
    whereToFind: [{ label: "ב-DITC Portal", url: "https://www.ditc.ky/" }],
    officialSource: "https://www.ditc.ky/", oecdSource: OECD_TIN },
  { code: "BM", nameHe: "ברמודה", nameEn: "Bermuda", flag: "🇧🇲",
    tinNameHe: "אין TIN", tinNameEn: "No TIN issued",
    individual: { name: "—", format: "ברמודה אינה מנפיקה TIN ליחידים", example: "—" },
    entity: { name: "Entity Registration", format: "מספר רישום בחברה", example: "—" },
    whereToFind: [{ label: "ב-Ministry of Finance", url: "https://www.gov.bm/ministry/finance" }],
    officialSource: "https://www.gov.bm/", oecdSource: OECD_TIN },
);

// ========== Expansion: Balkans, Eastern Europe, Caucasus, Central/South Asia, Microstates ==========
COUNTRIES.push(
  { code: "ME", nameHe: "מונטנגרו", nameEn: "Montenegro", flag: "🇲🇪",
    tinNameHe: "JMBG / PIB", tinNameEn: "JMBG / PIB",
    individual: { name: "JMBG", format: "13 ספרות", example: "0101990510006" },
    entity: { name: "PIB", format: "8 ספרות", example: "02016702" },
    whereToFind: [
      { label: "בתעודת הזהות המונטנגרית", url: "https://www.mup.gov.me/" },
      { label: "במכתבי רשות המסים (Poreska uprava)", url: "https://www.poreskauprava.gov.me/" },
      { label: "ב-CRPS (רשם החברות)", url: "https://www.crps.me/" }
    ],
    officialSource: "https://www.poreskauprava.gov.me/", oecdSource: OECD_TIN },
  { code: "RS", nameHe: "סרביה", nameEn: "Serbia", flag: "🇷🇸",
    tinNameHe: "JMBG / PIB", tinNameEn: "JMBG / PIB",
    individual: { name: "JMBG", format: "13 ספרות", example: "0101990710006" },
    entity: { name: "PIB", format: "9 ספרות", example: "100000000" },
    whereToFind: [
      { label: "בתעודת הזהות הסרבית", url: "https://www.mup.gov.rs/" },
      { label: "ב-Poreska uprava (eporezi)", url: "https://eporezi.purs.gov.rs/" },
      { label: "ב-APR (רשם החברות)", url: "https://www.apr.gov.rs/" }
    ],
    officialSource: "https://www.purs.gov.rs/", oecdSource: OECD_TIN },
  { code: "AL", nameHe: "אלבניה", nameEn: "Albania", flag: "🇦🇱",
    tinNameHe: "NID / NIPT", tinNameEn: "Personal ID / NIPT",
    individual: { name: "NID", format: "10 תווים: ספרות + אות", example: "I85030008N" },
    entity: { name: "NIPT", format: "אות + 8 ספרות + אות", example: "J91402501L" },
    whereToFind: [
      { label: "בתעודת הזהות האלבנית", url: "https://e-albania.al/" },
      { label: "ב-Tatimet (רשות המסים)", url: "https://www.tatime.gov.al/" },
      { label: "ב-QKB (רשם החברות)", url: "https://www.qkb.gov.al/" }
    ],
    officialSource: "https://www.tatime.gov.al/", oecdSource: OECD_TIN },
  { code: "MK", nameHe: "צפון מקדוניה", nameEn: "North Macedonia", flag: "🇲🇰",
    tinNameHe: "EMBG / EDB", tinNameEn: "EMBG / EDB",
    individual: { name: "EMBG", format: "13 ספרות", example: "0101990450006" },
    entity: { name: "EDB", format: "13 ספרות, מתחיל ב-MK", example: "MK4030008015718" },
    whereToFind: [
      { label: "בתעודת הזהות המקדונית", url: "https://mvr.gov.mk/" },
      { label: "ב-UJP (רשות המסים)", url: "https://www.ujp.gov.mk/" },
      { label: "ב-Central Registry", url: "https://www.crm.com.mk/" }
    ],
    officialSource: "https://www.ujp.gov.mk/", oecdSource: OECD_TIN },
  { code: "BA", nameHe: "בוסניה והרצגובינה", nameEn: "Bosnia and Herzegovina", flag: "🇧🇦",
    tinNameHe: "JMBG / JIB", tinNameEn: "JMBG / JIB",
    individual: { name: "JMBG", format: "13 ספרות", example: "0101990171234" },
    entity: { name: "JIB", format: "13 ספרות", example: "4200000000001" },
    whereToFind: [
      { label: "בתעודת הזהות", url: "http://www.iddeea.gov.ba/" },
      { label: "ב-UIO (רשות העקיפה)", url: "https://www.uino.gov.ba/" }
    ],
    officialSource: "https://www.uino.gov.ba/", oecdSource: OECD_TIN },
  { code: "XK", nameHe: "קוסובו", nameEn: "Kosovo", flag: "🇽🇰",
    tinNameHe: "Personal No / Fiscal No", tinNameEn: "Personal Number / Fiscal Number",
    individual: { name: "Personal Number", format: "10 ספרות", example: "1234567890" },
    entity: { name: "Fiscal Number", format: "9 ספרות", example: "600000000" },
    whereToFind: [
      { label: "בתעודת הזהות", url: "https://mpb.rks-gov.net/" },
      { label: "ב-ATK (רשות המסים)", url: "https://www.atk-ks.org/" }
    ],
    officialSource: "https://www.atk-ks.org/" },
  { code: "UA", nameHe: "אוקראינה", nameEn: "Ukraine", flag: "🇺🇦",
    tinNameHe: "RNOKPP / EDRPOU", tinNameEn: "RNOKPP / EDRPOU",
    individual: { name: "RNOKPP", format: "10 ספרות", example: "1234567890" },
    entity: { name: "EDRPOU", format: "8 ספרות", example: "12345678" },
    whereToFind: [
      { label: "באישור משלם מסים", url: "https://tax.gov.ua/" },
      { label: "ב-Diia (אזור אישי)", url: "https://diia.gov.ua/" },
      { label: "ברשם המאוחד (EDR)", url: "https://usr.minjust.gov.ua/" }
    ],
    officialSource: "https://tax.gov.ua/", oecdSource: OECD_TIN },
  { code: "BY", nameHe: "בלארוס", nameEn: "Belarus", flag: "🇧🇾",
    tinNameHe: "UNP", tinNameEn: "Payer Account Number (UNP)",
    individual: { name: "UNP", format: "9 ספרות", example: "123456789" },
    entity: { name: "UNP", format: "9 ספרות", example: "100000000" },
    whereToFind: [
      { label: "באישור רישום משלם מס", url: "http://www.nalog.gov.by/" }
    ],
    officialSource: "http://www.nalog.gov.by/" },
  { code: "MD", nameHe: "מולדובה", nameEn: "Moldova", flag: "🇲🇩",
    tinNameHe: "IDNP / IDNO", tinNameEn: "IDNP / IDNO",
    individual: { name: "IDNP", format: "13 ספרות", example: "2002004123456" },
    entity: { name: "IDNO", format: "13 ספרות", example: "1003600000000" },
    whereToFind: [
      { label: "בתעודת הזהות המולדבית", url: "https://asp.gov.md/" },
      { label: "ב-SFS (שירות המסים)", url: "https://sfs.md/" }
    ],
    officialSource: "https://sfs.md/", oecdSource: OECD_TIN },
  { code: "GE", nameHe: "גאורגיה", nameEn: "Georgia", flag: "🇬🇪",
    tinNameHe: "Personal No / TIN", tinNameEn: "Personal Number / TIN",
    individual: { name: "Personal Number", format: "11 ספרות", example: "01001000000" },
    entity: { name: "TIN", format: "9 ספרות", example: "204000000" },
    whereToFind: [
      { label: "בתעודת הזהות הגאורגית", url: "https://sda.gov.ge/" },
      { label: "ב-Revenue Service (RS.ge)", url: "https://www.rs.ge/" }
    ],
    officialSource: "https://www.rs.ge/", oecdSource: OECD_TIN },
  { code: "AM", nameHe: "ארמניה", nameEn: "Armenia", flag: "🇦🇲",
    tinNameHe: "PSN / TIN", tinNameEn: "Public Service Number / TIN",
    individual: { name: "PSN", format: "10 ספרות", example: "1234567890" },
    entity: { name: "TIN (HVHH)", format: "8 ספרות", example: "00000000" },
    whereToFind: [
      { label: "בתעודת זהות / PSN", url: "https://www.police.am/" },
      { label: "ב-State Revenue Committee", url: "https://www.src.am/" }
    ],
    officialSource: "https://www.src.am/" },
  { code: "AZ", nameHe: "אזרבייג׳ן", nameEn: "Azerbaijan", flag: "🇦🇿",
    tinNameHe: "VÖEN", tinNameEn: "Taxpayer Identification (VÖEN)",
    individual: { name: "VÖEN", format: "10 ספרות", example: "1234567890" },
    entity: { name: "VÖEN", format: "10 ספרות", example: "1234567890" },
    whereToFind: [
      { label: "באישור משלם מס", url: "https://www.taxes.gov.az/" },
      { label: "באזור אישי e-taxes", url: "https://www.e-taxes.gov.az/" }
    ],
    officialSource: "https://www.taxes.gov.az/", oecdSource: OECD_TIN },
  { code: "KZ", nameHe: "קזחסטן", nameEn: "Kazakhstan", flag: "🇰🇿",
    tinNameHe: "IIN / BIN", tinNameEn: "IIN / BIN",
    individual: { name: "IIN", format: "12 ספרות", example: "900101300123" },
    entity: { name: "BIN", format: "12 ספרות", example: "123456789012" },
    whereToFind: [
      { label: "בתעודת הזהות הקזחית", url: "https://egov.kz/" },
      { label: "ב-Kgd (ועדת ההכנסות)", url: "https://kgd.gov.kz/" }
    ],
    officialSource: "https://kgd.gov.kz/", oecdSource: OECD_TIN },
  { code: "UZ", nameHe: "אוזבקיסטן", nameEn: "Uzbekistan", flag: "🇺🇿",
    tinNameHe: "INN / STIR", tinNameEn: "Taxpayer Identification (INN/STIR)",
    individual: { name: "STIR/INN", format: "9 ספרות", example: "123456789" },
    entity: { name: "STIR/INN", format: "9 ספרות", example: "200000000" },
    whereToFind: [
      { label: "ב-Soliq (רשות המסים)", url: "https://soliq.uz/" }
    ],
    officialSource: "https://soliq.uz/" },
  { code: "RU", nameHe: "רוסיה", nameEn: "Russia", flag: "🇷🇺",
    tinNameHe: "INN", tinNameEn: "Taxpayer Identification Number (INN)",
    individual: { name: "INN", format: "12 ספרות", example: "500100732259" },
    entity: { name: "INN", format: "10 ספרות", example: "7707083893" },
    whereToFind: [
      { label: "באישור INN", url: "https://www.nalog.gov.ru/" },
      { label: "באזור האישי lkfl2", url: "https://lkfl2.nalog.ru/" }
    ],
    officialSource: "https://www.nalog.gov.ru/", oecdSource: OECD_TIN },
  { code: "PK", nameHe: "פקיסטן", nameEn: "Pakistan", flag: "🇵🇰",
    tinNameHe: "CNIC / NTN", tinNameEn: "CNIC / National Tax Number",
    individual: { name: "CNIC", format: "13 ספרות", example: "1234512345671" },
    entity: { name: "NTN", format: "7 ספרות + ספרת ביקורת", example: "1234567-8" },
    whereToFind: [
      { label: "בתעודת ה-CNIC", url: "https://www.nadra.gov.pk/" },
      { label: "ב-FBR Iris", url: "https://iris.fbr.gov.pk/" }
    ],
    officialSource: "https://www.fbr.gov.pk/", oecdSource: OECD_TIN },
  { code: "BD", nameHe: "בנגלדש", nameEn: "Bangladesh", flag: "🇧🇩",
    tinNameHe: "TIN / e-TIN", tinNameEn: "Taxpayer Identification Number",
    individual: { name: "e-TIN", format: "12 ספרות", example: "123456789012" },
    entity: { name: "e-TIN", format: "12 ספרות", example: "123456789012" },
    whereToFind: [
      { label: "באישור e-TIN", url: "https://secure.incometax.gov.bd/" }
    ],
    officialSource: "https://nbr.gov.bd/" },
  { code: "LK", nameHe: "סרי לנקה", nameEn: "Sri Lanka", flag: "🇱🇰",
    tinNameHe: "TIN", tinNameEn: "Taxpayer Identification Number",
    individual: { name: "TIN", format: "9 ספרות + V", example: "123456789V" },
    entity: { name: "TIN", format: "9 ספרות", example: "123456789" },
    whereToFind: [
      { label: "באישור TIN של IRD", url: "https://www.ird.gov.lk/" }
    ],
    officialSource: "https://www.ird.gov.lk/" },
  { code: "LI", nameHe: "ליכטנשטיין", nameEn: "Liechtenstein", flag: "🇱🇮",
    tinNameHe: "AHV / UID", tinNameEn: "AHV Number / UID",
    individual: { name: "AHV", format: "13 ספרות: 756.NNNN.NNNN.NN", example: "756.1234.5678.97" },
    entity: { name: "UID", format: "CHE-NNN.NNN.NNN", example: "CHE-123.456.789" },
    whereToFind: [
      { label: "בכרטיס AHV", url: "https://www.ahv.li/" },
      { label: "במכתבי Steuerverwaltung", url: "https://www.stv.llv.li/" }
    ],
    officialSource: "https://www.stv.llv.li/", oecdSource: OECD_TIN },
  { code: "MC", nameHe: "מונקו", nameEn: "Monaco", flag: "🇲🇨",
    tinNameHe: "אין TIN ליחידים", tinNameEn: "No TIN for individuals",
    individual: { name: "—", format: "מונקו אינה מנפיקה TIN ליחידים", example: "—", note: "לדיווח CRS משתמשים לרוב במספרי זיהוי חלופיים." },
    entity: { name: "RCI", format: "מספר רישום בלשכת המסחר", example: "00S00000" },
    whereToFind: [
      { label: "ב-Direction des Services Fiscaux", url: "https://service-public-entreprises.gouv.mc/" }
    ],
    officialSource: "https://service-public-entreprises.gouv.mc/", oecdSource: OECD_TIN },
  { code: "SM", nameHe: "סן מרינו", nameEn: "San Marino", flag: "🇸🇲",
    tinNameHe: "Codice ISS / COE", tinNameEn: "ISS Code / Economic Operator Code",
    individual: { name: "Codice ISS", format: "מספר ביטוח לאומי", example: "12345" },
    entity: { name: "COE", format: "5 ספרות", example: "12345" },
    whereToFind: [
      { label: "ב-Ufficio Tributario", url: "https://www.tributario.sm/" }
    ],
    officialSource: "https://www.tributario.sm/", oecdSource: OECD_TIN },
  { code: "AD", nameHe: "אנדורה", nameEn: "Andorra", flag: "🇦🇩",
    tinNameHe: "NRT", tinNameEn: "Número de Registre Tributari",
    individual: { name: "NRT", format: "אות + 6 ספרות + אות", example: "F-123456-A" },
    entity: { name: "NRT", format: "אות + 6 ספרות + אות", example: "A-123456-Z" },
    whereToFind: [
      { label: "ב-Departament de Tributs", url: "https://www.impostos.ad/" }
    ],
    officialSource: "https://www.impostos.ad/", oecdSource: OECD_TIN },
  { code: "GI", nameHe: "גיברלטר", nameEn: "Gibraltar", flag: "🇬🇮",
    tinNameHe: "TIN", tinNameEn: "Taxpayer Identification Number",
    individual: { name: "TIN", format: "עד 6 ספרות", example: "123456" },
    entity: { name: "Company Number", format: "עד 6 ספרות", example: "123456" },
    whereToFind: [
      { label: "ב-Income Tax Office", url: "https://www.gibraltar.gov.gi/finance/income-tax-office" }
    ],
    officialSource: "https://www.gibraltar.gov.gi/finance/income-tax-office", oecdSource: OECD_TIN },
);


