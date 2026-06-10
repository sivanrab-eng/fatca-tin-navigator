// Phrase-level translator for Hebrew TIN data (formats, names, notes, where-to-find labels).
// Covers the most common recurring patterns. Unknown phrases fall back to Hebrew.
import type { Lang } from "@/lib/types";

type Dict = Partial<Record<Exclude<Lang, "he">, string>>;

// Whole-string exact translations (cover ~80% of formats/names by frequency)
const EXACT: Record<string, Dict> = {
  "מספר ייחודי": { en: "Unique number", es: "Número único", fr: "Numéro unique", ru: "Уникальный номер", zh: "唯一编号" },
  "מספר תיק מס": { en: "Tax file number", es: "Número de expediente fiscal", fr: "Numéro de dossier fiscal", ru: "Номер налогового дела", zh: "税务档案号" },
  "מספר רישום חברה": { en: "Company registration number", es: "Número de registro de empresa", fr: "Numéro d'enregistrement de société", ru: "Регистрационный номер компании", zh: "公司注册号" },
  "מספר רישום": { en: "Registration number", es: "Número de registro", fr: "Numéro d'enregistrement", ru: "Регистрационный номер", zh: "注册号" },
  "אין רשות מס מקומית": { en: "No local tax authority", es: "Sin autoridad fiscal local", fr: "Pas d'administration fiscale locale", ru: "Местный налоговый орган отсутствует", zh: "无当地税务机关" },
  "אין מס הכנסה מקומי": { en: "No local income tax", es: "Sin impuesto local sobre la renta", fr: "Pas d'impôt local sur le revenu", ru: "Местный подоходный налог отсутствует", zh: "无当地所得税" },
  "תעודת זהות": { en: "National ID", es: "Documento de identidad", fr: "Carte d'identité", ru: "Удостоверение личности", zh: "身份证" },
  "מספר חברה (ח.פ.)": { en: "Company number (CN)", es: "Número de empresa (CN)", fr: "Numéro de société (CN)", ru: "Номер компании (CN)", zh: "公司编号 (CN)" },
  "UTR או NINO": { en: "UTR or NINO", es: "UTR o NINO", fr: "UTR ou NINO", ru: "UTR или NINO", zh: "UTR 或 NINO" },
  "SSN (אזרח/תושב) או ITIN (זרים)": { en: "SSN (citizen/resident) or ITIN (foreigners)", es: "SSN (ciudadano/residente) o ITIN (extranjeros)", fr: "SSN (citoyen/résident) ou ITIN (étrangers)", ru: "SSN (гражданин/резидент) или ITIN (иностранцы)", zh: "SSN (公民/居民) 或 ITIN (外国人)" },
  "TIN (חברה)": { en: "TIN (entity)", es: "TIN (entidad)", fr: "TIN (entité)", ru: "TIN (организация)", zh: "TIN (实体)" },
  "TRN (חברה)": { en: "TRN (entity)", es: "TRN (entidad)", fr: "TRN (entité)", ru: "TRN (организация)", zh: "TRN (实体)" },
  "Kennitala (חברה)": { en: "Kennitala (entity)", es: "Kennitala (entidad)", fr: "Kennitala (entité)", ru: "Kennitala (организация)", zh: "Kennitala (实体)" },
  "DNI (תושב) / NIE (זר)": { en: "DNI (resident) / NIE (foreigner)", es: "DNI (residente) / NIE (extranjero)", fr: "DNI (résident) / NIE (étranger)", ru: "DNI (резидент) / NIE (иностранец)", zh: "DNI (居民) / NIE (外国人)" },
  // Common notes
  "הספרה האחרונה היא ספרת ביקורת.": { en: "The last digit is a check digit.", es: "El último dígito es de control.", fr: "Le dernier chiffre est un chiffre de contrôle.", ru: "Последняя цифра — контрольная.", zh: "最后一位是校验位。" },
  "ITIN מתחיל תמיד ב-9.": { en: "ITIN always begins with 9.", es: "El ITIN siempre empieza por 9.", fr: "L'ITIN commence toujours par 9.", ru: "ITIN всегда начинается с 9.", zh: "ITIN 始终以 9 开头。" },
  "ל-FATCA/CRS משתמשים ב-UTR אם מגישים Self Assessment, אחרת NINO.": { en: "For FATCA/CRS use UTR if filing Self Assessment, otherwise NINO.", es: "Para FATCA/CRS use UTR si presenta Self Assessment, de lo contrario NINO.", fr: "Pour FATCA/CRS, utilisez l'UTR si vous déposez Self Assessment, sinon NINO.", ru: "Для FATCA/CRS используйте UTR при подаче Self Assessment, иначе NINO.", zh: "用于 FATCA/CRS: 提交 Self Assessment 时使用 UTR，否则使用 NINO。" },
};

// Common Hebrew "where to find" label prefixes/keywords
const LABEL_REPLACEMENTS: { he: RegExp; t: Dict }[] = [
  { he: /^באזור האישי ב-?/, t: { en: "In your personal area at ", es: "En tu área personal en ", fr: "Dans votre espace personnel sur ", ru: "В личном кабинете на ", zh: "在个人区域：" } },
  { he: /^באזור האישי$/, t: { en: "In your personal online area", es: "En tu área personal", fr: "Dans votre espace personnel", ru: "В личном кабинете", zh: "在个人区域" } },
  { he: /^באתר רשות המסים\b/, t: { en: "On the tax authority website", es: "En el sitio de la autoridad fiscal", fr: "Sur le site de l'administration fiscale", ru: "На сайте налогового органа", zh: "在税务机关网站" } },
  { he: /^בתלוש שכר ובטופס /, t: { en: "On payslip and form ", es: "En la nómina y formulario ", fr: "Sur le bulletin de paie et le formulaire ", ru: "В расчётном листке и форме ", zh: "在工资单和表格 " } },
  { he: /^בתלוש שכר\b/, t: { en: "On your payslip", es: "En la nómina", fr: "Sur le bulletin de paie", ru: "В расчётном листке", zh: "在工资单上" } },
  { he: /^בטפסי /, t: { en: "On forms ", es: "En los formularios ", fr: "Sur les formulaires ", ru: "В формах ", zh: "在表格 " } },
  { he: /^בטופס /, t: { en: "On form ", es: "En el formulario ", fr: "Sur le formulaire ", ru: "В форме ", zh: "在表格 " } },
  { he: /^במכתבי /, t: { en: "On letters from ", es: "En cartas de ", fr: "Sur les courriers de ", ru: "В письмах от ", zh: "在 来信 " } },
  { he: /^במכתב /, t: { en: "On letter ", es: "En la carta ", fr: "Sur la lettre ", ru: "В письме ", zh: "在信函 " } },
  { he: /^בכרטיס /, t: { en: "On the card ", es: "En la tarjeta ", fr: "Sur la carte ", ru: "На карте ", zh: "在卡片 " } },
  { he: /^בתעודת הזהות הביומטרית או בספח$/, t: { en: "On the biometric ID or appendix", es: "En el DNI biométrico o anexo", fr: "Sur la carte d'identité biométrique ou son annexe", ru: "В биометрическом удостоверении или приложении", zh: "在生物特征身份证或附页上" } },
  { he: /^בתעודת הזהות /, t: { en: "On the national ID ", es: "En el documento de identidad ", fr: "Sur la carte d'identité ", ru: "В удостоверении личности ", zh: "在身份证 " } },
  { he: /^בתעודת הזהות$/, t: { en: "On the national ID", es: "En el documento de identidad", fr: "Sur la carte d'identité", ru: "В удостоверении личности", zh: "在身份证上" } },
  { he: /^בתעודת זהות /, t: { en: "On the national ID ", es: "En el documento de identidad ", fr: "Sur la carte d'identité ", ru: "В удостоверении личности ", zh: "在身份证 " } },
  { he: /^בתעודת זהות$/, t: { en: "On the national ID", es: "En el documento de identidad", fr: "Sur la carte d'identité", ru: "В удостоверении личности", zh: "在身份证上" } },
  { he: /^בדרכון /, t: { en: "On the passport ", es: "En el pasaporte ", fr: "Sur le passeport ", ru: "В паспорте ", zh: "在护照 " } },
  { he: /^בדרכון$/, t: { en: "On the passport", es: "En el pasaporte", fr: "Sur le passeport", ru: "В паспорте", zh: "在护照上" } },
  { he: /^באישור /, t: { en: "On the certificate ", es: "En el certificado ", fr: "Sur l'attestation ", ru: "В справке ", zh: "在证明 " } },
  { he: /^באפליקציית /, t: { en: "In the app ", es: "En la aplicación ", fr: "Dans l'application ", ru: "В приложении ", zh: "在应用程序 " } },
  { he: /^ברשם החברות \(לחברות\)$/, t: { en: "At the Companies Registrar (entities)", es: "En el Registro de Empresas (entidades)", fr: "Au Registre des sociétés (entités)", ru: "В реестре компаний (организации)", zh: "在公司注册处 (实体)" } },
  { he: /^ברשם /, t: { en: "At the registrar ", es: "En el registro ", fr: "Au registre ", ru: "В реестре ", zh: "在登记处 " } },
  { he: /^ב-?/, t: { en: "At ", es: "En ", fr: "Sur ", ru: "В ", zh: "在 " } },
];

const FOR_COMPANIES: Dict = { en: " (for companies)", es: " (para empresas)", fr: " (pour les sociétés)", ru: " (для компаний)", zh: " (适用于公司)" };
const FOR_ENTITIES: Dict = { en: " (entities)", es: " (entidades)", fr: " (entités)", ru: " (организации)", zh: " (实体)" };

function translateFormat(s: string, lang: Exclude<Lang, "he">): string {
  // Translate "N ספרות" / "N-M ספרות" / "עד N ספרות"
  const words = {
    digits: { en: "digits", es: "dígitos", fr: "chiffres", ru: "цифр", zh: "位数字" },
    letters: { en: "letters", es: "letras", fr: "lettres", ru: "букв", zh: "个字母" },
    letter: { en: "letter", es: "letra", fr: "lettre", ru: "буква", zh: "个字母" },
    chars: { en: "characters", es: "caracteres", fr: "caractères", ru: "символов", zh: "个字符" },
    char: { en: "character", es: "carácter", fr: "caractère", ru: "символ", zh: "个字符" },
    checkDigit: { en: "check digit", es: "dígito de control", fr: "chiffre de contrôle", ru: "контрольная цифра", zh: "校验位" },
    upTo: { en: "up to ", es: "hasta ", fr: "jusqu'à ", ru: "до ", zh: "最多 " },
    starts: { en: "starts with ", es: "empieza con ", fr: "commence par ", ru: "начинается с ", zh: "以 " },
    startsEnd: { en: "", es: "", fr: "", ru: "", zh: " 开头" },
  };
  let out = s;
  out = out.replace(/עד (\d+(?:-\d+)?)\s*ספרות/g, `${words.upTo[lang]}$1 ${words.digits[lang]}`);
  out = out.replace(/עד (\d+(?:-\d+)?)\s*תווים/g, `${words.upTo[lang]}$1 ${words.chars[lang]}`);
  out = out.replace(/עד (\d+(?:-\d+)?)\s*אותיות/g, `${words.upTo[lang]}$1 ${words.letters[lang]}`);
  out = out.replace(/(\d+(?:-\d+)?)\s*ספרות/g, `$1 ${words.digits[lang]}`);
  out = out.replace(/(\d+(?:-\d+)?)\s*תווים/g, `$1 ${words.chars[lang]}`);
  out = out.replace(/(\d+(?:-\d+)?)\s*אותיות/g, `$1 ${words.letters[lang]}`);
  out = out.replace(/(\d+)\s*תו(?!ו)/g, `$1 ${words.char[lang]}`);
  out = out.replace(/(\d+)\s*אות(?!ו)/g, `$1 ${words.letter[lang]}`);
  out = out.replace(/ספרת ביקורת/g, words.checkDigit[lang]);
  out = out.replace(/תו ביקורת/g, words.checkDigit[lang]);
  out = out.replace(/מתחיל ב-?/g, words.starts[lang]);
  // common connectors
  out = out.replace(/ \+ /g, " + ");
  return out;
}

export function tr(text: string | undefined, lang: Lang): string {
  if (!text) return "";
  if (lang === "he") return text;
  const l = lang as Exclude<Lang, "he">;
  // 1) Exact match
  if (EXACT[text]?.[l]) return EXACT[text]![l]!;

  // 2) Name patterns with parenthetical qualifiers
  const mCompany = text.match(/^(.+) \(חברה\)$/);
  if (mCompany) return `${tr(mCompany[1], lang)}${FOR_ENTITIES[l]}`;
  const mForCompanies = text.match(/^(.+) \(לחברות\)$/);
  if (mForCompanies) return `${tr(mForCompanies[1], lang)}${FOR_COMPANIES[l]}`;

  // 3) Where-to-find label prefixes
  for (const { he, t } of LABEL_REPLACEMENTS) {
    if (he.test(text)) {
      const replaced = text.replace(he, t[l] ?? "");
      // Recurse for any remaining Hebrew tokens inside (e.g. "באתר רשות המסים בארה\"ב")
      return translateFormat(replaced, l);
    }
  }

  // 4) Format-style translation (digits/letters/chars)
  if (/[א-ת]/.test(text)) {
    const formatted = translateFormat(text, l);
    if (formatted !== text) return formatted;
  }

  // 5) Fallback: original Hebrew
  return text;
}
