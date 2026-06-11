// Phrase-level translator for Hebrew TIN data (formats, names, notes, where-to-find labels).
// Covers the most common recurring patterns. Unknown phrases fall back to Hebrew.
export type Lang = "he" | "en" | "es" | "fr" | "ru" | "zh";
type NonHe = Exclude<Lang, "he">;
type Dict = Partial<Record<NonHe, string>>;

// Whole-string exact translations
const EXACT: Record<string, Dict> = {
  // TIN names
  "מספר ייחודי": { en: "Unique number", es: "Número único", fr: "Numéro unique", ru: "Уникальный номер", zh: "唯一编号" },
  "מספר תיק מס": { en: "Tax file number", es: "Número de expediente fiscal", fr: "Numéro de dossier fiscal", ru: "Номер налогового дела", zh: "税务档案号" },
  "מספר רישום חברה": { en: "Company registration number", es: "Número de registro de empresa", fr: "Numéro d'enregistrement de société", ru: "Регистрационный номер компании", zh: "公司注册号" },
  "מספר רישום": { en: "Registration number", es: "Número de registro", fr: "Numéro d'enregistrement", ru: "Регистрационный номер", zh: "注册号" },
  "מספר רישום מס": { en: "Tax registration number", es: "Número de registro fiscal", fr: "Numéro d'enregistrement fiscal", ru: "Номер налоговой регистрации", zh: "税务登记号" },
  "מספר רישום VAT": { en: "VAT registration number", es: "Número de registro de IVA", fr: "Numéro de TVA", ru: "Регистрационный номер НДС", zh: "增值税登记号" },
  "מספר רישום בחברה": { en: "Corporate registration number", es: "Número de registro corporativo", fr: "Numéro d'enregistrement d'entreprise", ru: "Корпоративный регистрационный номер", zh: "公司登记号" },
  "מספר רישום בלשכת המסחר": { en: "Chamber of Commerce registration number", es: "Número de registro de la Cámara de Comercio", fr: "Numéro d'enregistrement de la Chambre de commerce", ru: "Регистрационный номер торговой палаты", zh: "商会注册号" },
  "מספר אישי": { en: "Personal number", es: "Número personal", fr: "Numéro personnel", ru: "Личный номер", zh: "个人编号" },
  "מספר זהות": { en: "ID number", es: "Número de identidad", fr: "Numéro d'identité", ru: "Идентификационный номер", zh: "身份证号" },
  "מספר זהות לאומי": { en: "National ID number", es: "Número de identidad nacional", fr: "Numéro d'identité national", ru: "Национальный идентификационный номер", zh: "国民身份证号" },
  "מספר תעודת זהות": { en: "ID card number", es: "Número de cédula de identidad", fr: "Numéro de carte d'identité", ru: "Номер удостоверения личности", zh: "身份证号码" },
  "מספר זהות / מספר חברה": { en: "ID number / Company number", es: "Número de identidad / Número de empresa", fr: "Numéro d'identité / Numéro de société", ru: "ID / Номер компании", zh: "身份证号 / 公司号" },
  "מספר ביטוח לאומי": { en: "Social security number", es: "Número de seguridad social", fr: "Numéro de sécurité sociale", ru: "Номер социального страхования", zh: "社会保险号" },
  "תעודת זהות": { en: "National ID", es: "Documento de identidad", fr: "Carte d'identité", ru: "Удостоверение личности", zh: "身份证" },
  "מספר חברה (ח.פ.)": { en: "Company number (CN)", es: "Número de empresa (CN)", fr: "Numéro de société (CN)", ru: "Номер компании (CN)", zh: "公司编号 (CN)" },
  "מספר RUC + DV": { en: "RUC number + check digit", es: "Número RUC + DV", fr: "Numéro RUC + DV", ru: "Номер RUC + контрольная цифра", zh: "RUC 编号 + 校验位" },
  "UTR או NINO": { en: "UTR or NINO", es: "UTR o NINO", fr: "UTR ou NINO", ru: "UTR или NINO", zh: "UTR 或 NINO" },
  "SSN (אזרח/תושב) או ITIN (זרים)": { en: "SSN (citizen/resident) or ITIN (foreigners)", es: "SSN (ciudadano/residente) o ITIN (extranjeros)", fr: "SSN (citoyen/résident) ou ITIN (étrangers)", ru: "SSN (гражданин/резидент) или ITIN (иностранцы)", zh: "SSN (公民/居民) 或 ITIN (外国人)" },
  "TIN (חברה)": { en: "TIN (entity)", es: "TIN (entidad)", fr: "TIN (entité)", ru: "TIN (организация)", zh: "TIN (实体)" },
  "TRN (חברה)": { en: "TRN (entity)", es: "TRN (entidad)", fr: "TRN (entité)", ru: "TRN (организация)", zh: "TRN (实体)" },
  "Kennitala (חברה)": { en: "Kennitala (entity)", es: "Kennitala (entidad)", fr: "Kennitala (entité)", ru: "Kennitala (организация)", zh: "Kennitala (实体)" },
  "DNI (תושב) / NIE (זר)": { en: "DNI (resident) / NIE (foreigner)", es: "DNI (residente) / NIE (extranjero)", fr: "DNI (résident) / NIE (étranger)", ru: "DNI (резидент) / NIE (иностранец)", zh: "DNI (居民) / NIE (外国人)" },
  "TIN (ID יחיד / USCC חברה)": { en: "TIN (individual ID / USCC entity)", es: "TIN (ID individual / USCC entidad)", fr: "TIN (ID individuel / USCC entité)", ru: "TIN (ID физлица / USCC организация)", zh: "TIN (个人 ID / USCC 实体)" },
  "GIIN של מוסד פיננסי": { en: "GIIN of a financial institution", es: "GIIN de una institución financiera", fr: "GIIN d'une institution financière", ru: "GIIN финансового учреждения", zh: "金融机构的 GIIN" },
  // No-TIN notes
  "אין TIN": { en: "No TIN", es: "Sin TIN", fr: "Pas de TIN", ru: "TIN отсутствует", zh: "无 TIN" },
  "אין TIN ליחידים": { en: "No TIN for individuals", es: "Sin TIN para personas físicas", fr: "Pas de TIN pour les particuliers", ru: "TIN для физлиц отсутствует", zh: "个人无 TIN" },
  "ללא TIN מקומי": { en: "No local TIN", es: "Sin TIN local", fr: "Pas de TIN local", ru: "Местного TIN нет", zh: "无当地 TIN" },
  "אין רשות מס מקומית": { en: "No local tax authority", es: "Sin autoridad fiscal local", fr: "Pas d'administration fiscale locale", ru: "Местный налоговый орган отсутствует", zh: "无当地税务机关" },
  "אין מס הכנסה מקומי": { en: "No local income tax", es: "Sin impuesto local sobre la renta", fr: "Pas d'impôt local sur le revenu", ru: "Местный подоходный налог отсутствует", zh: "无当地所得税" },
  "BVI אינן מנפיקות TIN ליחידים": { en: "BVI does not issue TINs to individuals", es: "Las BVI no emiten TIN para personas físicas", fr: "Les BVI ne délivrent pas de TIN aux particuliers", ru: "BVI не выдаёт TIN физлицам", zh: "BVI 不向个人发放 TIN" },
  "RMI אינה מנפיקה TIN": { en: "RMI does not issue TINs", es: "RMI no emite TIN", fr: "RMI ne délivre pas de TIN", ru: "RMI не выдаёт TIN", zh: "RMI 不发放 TIN" },
  "TCI אינן מנפיקות TIN": { en: "TCI does not issue TINs", es: "TCI no emiten TIN", fr: "TCI ne délivrent pas de TIN", ru: "TCI не выдают TIN", zh: "TCI 不发放 TIN" },
  "ונואטו אינה מטילה מס הכנסה": { en: "Vanuatu does not impose income tax", es: "Vanuatu no aplica impuesto sobre la renta", fr: "Vanuatu n'impose pas d'impôt sur le revenu", ru: "Вануату не взимает подоходный налог", zh: "瓦努阿图不征收所得税" },
  "ותיקן אינה מנפיקה TIN": { en: "Vatican does not issue TINs", es: "El Vaticano no emite TIN", fr: "Le Vatican ne délivre pas de TIN", ru: "Ватикан не выдаёт TIN", zh: "梵蒂冈不发放 TIN" },
  "ברמודה אינה מנפיקה TIN ליחידים": { en: "Bermuda does not issue TINs to individuals", es: "Bermudas no emite TIN para personas físicas", fr: "Les Bermudes ne délivrent pas de TIN aux particuliers", ru: "Бермуды не выдают TIN физлицам", zh: "百慕大不向个人发放 TIN" },
  "כווית אינה מנפיקה TIN ליחידים": { en: "Kuwait does not issue TINs to individuals", es: "Kuwait no emite TIN para personas físicas", fr: "Le Koweït ne délivre pas de TIN aux particuliers", ru: "Кувейт не выдаёт TIN физлицам", zh: "科威特不向个人发放 TIN" },
  "עומאן אינה מנפיקה TIN ליחידים": { en: "Oman does not issue TINs to individuals", es: "Omán no emite TIN para personas físicas", fr: "Oman ne délivre pas de TIN aux particuliers", ru: "Оман не выдаёт TIN физлицам", zh: "阿曼不向个人发放 TIN" },
  "מונקו אינה מנפיקה TIN ליחידים": { en: "Monaco does not issue TINs to individuals", es: "Mónaco no emite TIN para personas físicas", fr: "Monaco ne délivre pas de TIN aux particuliers", ru: "Монако не выдаёт TIN физлицам", zh: "摩纳哥不向个人发放 TIN" },
  "נאורו אינה מנפיקה TIN": { en: "Nauru does not issue TINs", es: "Nauru no emite TIN", fr: "Nauru ne délivre pas de TIN", ru: "Науру не выдаёт TIN", zh: "瑙鲁不发放 TIN" },
  "איי קיימן אינם מנפיקים TIN ליחידים": { en: "Cayman Islands do not issue TINs to individuals", es: "Las Islas Caimán no emiten TIN para personas físicas", fr: "Les Îles Caïmans ne délivrent pas de TIN aux particuliers", ru: "Каймановы острова не выдают TIN физлицам", zh: "开曼群岛不向个人发放 TIN" },
  "איי בהאמה אינן מנפיקות TIN": { en: "Bahamas does not issue TINs", es: "Las Bahamas no emiten TIN", fr: "Les Bahamas ne délivrent pas de TIN", ru: "Багамы не выдают TIN", zh: "巴哈马不发放 TIN" },
  "אנגווילה אינה מנפיקה TIN": { en: "Anguilla does not issue TINs", es: "Anguila no emite TIN", fr: "Anguilla ne délivre pas de TIN", ru: "Ангилья не выдаёт TIN", zh: "安圭拉不发放 TIN" },
  "לדיווח CRS משתמשים בדרך כלל ב-FI ID של מוסד פיננסי או במספרים חלופיים.": { en: "For CRS reporting, the FI ID of a financial institution or alternative numbers are typically used.", es: "Para informes CRS, normalmente se usa el FI ID de una institución financiera u otros números alternativos.", fr: "Pour le reporting CRS, on utilise généralement le FI ID d'une institution financière ou d'autres numéros.", ru: "Для отчётности CRS обычно используют FI ID финансового учреждения или альтернативные номера.", zh: "用于 CRS 报告时，通常使用金融机构的 FI ID 或其他替代编号。" },
  "לדיווח CRS משתמשים במספר הזהות האזרחי (Civil ID).": { en: "For CRS reporting, the Civil ID number is used.", es: "Para informes CRS se utiliza el número de identidad civil (Civil ID).", fr: "Pour le reporting CRS, on utilise le numéro d'identité civile (Civil ID).", ru: "Для отчётности CRS используют номер Civil ID.", zh: "用于 CRS 报告时使用公民身份证号 (Civil ID)。" },
  "לדיווח CRS משתמשים בתעודת זהות לאומית.": { en: "For CRS reporting, the national ID is used.", es: "Para informes CRS se utiliza el documento de identidad nacional.", fr: "Pour le reporting CRS, on utilise la carte d'identité nationale.", ru: "Для отчётности CRS используют национальное удостоверение личности.", zh: "用于 CRS 报告时使用国民身份证。" },
  "לדיווח CRS משתמשים לרוב במספרי זיהוי חלופיים.": { en: "For CRS reporting, alternative identification numbers are typically used.", es: "Para informes CRS suelen utilizarse otros números de identificación.", fr: "Pour le reporting CRS, on utilise généralement d'autres numéros d'identification.", ru: "Для отчётности CRS обычно используют альтернативные идентификаторы.", zh: "用于 CRS 报告时通常使用替代识别号。" },
  "חלק מהולנד הקריבית; לעיתים משתמשים ב-BSN הולנדי או במספר מקומי של Belastingdienst Caribisch Nederland.": { en: "Part of the Caribbean Netherlands; sometimes the Dutch BSN is used, or a local number from Belastingdienst Caribisch Nederland.", es: "Parte de los Países Bajos Caribeños; a veces se utiliza el BSN neerlandés o un número local de Belastingdienst Caribisch Nederland.", fr: "Partie des Pays-Bas caribéens ; on utilise parfois le BSN néerlandais ou un numéro local de Belastingdienst Caribisch Nederland.", ru: "Часть Карибских Нидерландов; иногда используется голландский BSN или местный номер Belastingdienst Caribisch Nederland.", zh: "属于荷兰加勒比地区；有时使用荷兰 BSN 或 Belastingdienst Caribisch Nederland 的本地编号。" },
  "מחוז מעבר לים של צרפת; משתמש במערכת המיסוי הצרפתית.": { en: "French overseas department; uses the French tax system.", es: "Departamento de ultramar francés; usa el sistema fiscal francés.", fr: "Département français d'outre-mer ; utilise le système fiscal français.", ru: "Заморский департамент Франции; использует французскую налоговую систему.", zh: "法国海外省；使用法国税务系统。" },
  // Common notes
  "הספרה האחרונה היא ספרת ביקורת.": { en: "The last digit is a check digit.", es: "El último dígito es de control.", fr: "Le dernier chiffre est un chiffre de contrôle.", ru: "Последняя цифра — контрольная.", zh: "最后一位是校验位。" },
  "ITIN מתחיל תמיד ב-9.": { en: "ITIN always begins with 9.", es: "El ITIN siempre empieza por 9.", fr: "L'ITIN commence toujours par 9.", ru: "ITIN всегда начинается с 9.", zh: "ITIN 始终以 9 开头。" },
  "ל-FATCA/CRS משתמשים ב-UTR אם מגישים Self Assessment, אחרת NINO.": { en: "For FATCA/CRS use UTR if filing Self Assessment, otherwise NINO.", es: "Para FATCA/CRS use UTR si presenta Self Assessment, de lo contrario NINO.", fr: "Pour FATCA/CRS, utilisez l'UTR si vous déposez Self Assessment, sinon NINO.", ru: "Для FATCA/CRS используйте UTR при подаче Self Assessment, иначе NINO.", zh: "用于 FATCA/CRS: 提交 Self Assessment 时使用 UTR，否则使用 NINO。" },
};

// Common Hebrew "where to find" label prefixes/keywords
const LABEL_REPLACEMENTS: { he: RegExp; t: Dict }[] = [
  { he: /^באזור האישי ב-?/, t: { en: "In your personal area at ", es: "En tu área personal en ", fr: "Dans votre espace personnel sur ", ru: "В личном кабинете на ", zh: "在个人区域：" } },
  { he: /^באזור האישי של /, t: { en: "In your personal area at ", es: "En tu área personal de ", fr: "Dans votre espace personnel ", ru: "В личном кабинете ", zh: "在个人区域：" } },
  { he: /^באזור האישי /, t: { en: "In your personal area at ", es: "En tu área personal en ", fr: "Dans votre espace personnel sur ", ru: "В личном кабинете на ", zh: "在个人区域：" } },
  { he: /^באזור אישי /, t: { en: "In your personal area at ", es: "En tu área personal en ", fr: "Dans votre espace personnel sur ", ru: "В личном кабинете на ", zh: "在个人区域：" } },
  { he: /^באזור האישי$/, t: { en: "In your personal online area", es: "En tu área personal", fr: "Dans votre espace personnel", ru: "В личном кабинете", zh: "在个人区域" } },
  { he: /^באתר רשות המסים\b/, t: { en: "On the tax authority website", es: "En el sitio de la autoridad fiscal", fr: "Sur le site de l'administration fiscale", ru: "На сайте налогового органа", zh: "在税务机关网站" } },
  { he: /^באתר ה-?/, t: { en: "On the website of ", es: "En el sitio de ", fr: "Sur le site de ", ru: "На сайте ", zh: "在网站 " } },
  { he: /^בתלוש שכר ובמסמכי /, t: { en: "On payslip and documents of ", es: "En la nómina y documentos de ", fr: "Sur le bulletin de paie et les documents de ", ru: "В расчётном листке и документах ", zh: "在工资单和 " } },
  { he: /^בתלוש שכר ובטופס /, t: { en: "On payslip and form ", es: "En la nómina y formulario ", fr: "Sur le bulletin de paie et le formulaire ", ru: "В расчётном листке и форме ", zh: "在工资单和表格 " } },
  { he: /^בתלוש שכר או בטופס /, t: { en: "On payslip or form ", es: "En la nómina o formulario ", fr: "Sur le bulletin de paie ou le formulaire ", ru: "В расчётном листке или форме ", zh: "在工资单或表格 " } },
  { he: /^בתלוש שכר \(/, t: { en: "On payslip (", es: "En la nómina (", fr: "Sur le bulletin de paie (", ru: "В расчётном листке (", zh: "在工资单 (" } },
  { he: /^בתלוש שכר\b/, t: { en: "On your payslip", es: "En la nómina", fr: "Sur le bulletin de paie", ru: "В расчётном листке", zh: "在工资单上" } },
  { he: /^בהצהרת המס \(/, t: { en: "On the tax return (", es: "En la declaración de la renta (", fr: "Sur la déclaration de revenus (", ru: "В налоговой декларации (", zh: "在纳税申报表 (" } },
  { he: /^בהצהרת מס \(/, t: { en: "On the tax return (", es: "En la declaración de impuestos (", fr: "Sur la déclaration d'impôts (", ru: "В налоговой декларации (", zh: "在纳税申报表 (" } },
  { he: /^בהצהרת מס\b/, t: { en: "On the tax return", es: "En la declaración de impuestos", fr: "Sur la déclaration d'impôts", ru: "В налоговой декларации", zh: "在纳税申报表" } },
  { he: /^בשומת המס \(/, t: { en: "On the tax assessment (", es: "En la liquidación fiscal (", fr: "Sur l'avis d'imposition (", ru: "В налоговом извещении (", zh: "在税务评定 (" } },
  { he: /^בשומת מס \(/, t: { en: "On the tax assessment (", es: "En la liquidación fiscal (", fr: "Sur l'avis d'imposition (", ru: "В налоговом извещении (", zh: "在税务评定 (" } },
  { he: /^בשומת מס /, t: { en: "On the tax assessment ", es: "En la liquidación fiscal ", fr: "Sur l'avis d'imposition ", ru: "В налоговом извещении ", zh: "在税务评定 " } },
  { he: /^בשומות /, t: { en: "On assessments from ", es: "En las liquidaciones de ", fr: "Sur les avis de ", ru: "В извещениях ", zh: "在 评定 " } },
  { he: /^בהחזרי מס \(/, t: { en: "On tax returns / refunds (", es: "En las declaraciones / reembolsos (", fr: "Sur les déclarations / remboursements (", ru: "В возвратах налога (", zh: "在退税 (" } },
  { he: /^בהחזרי מס\b/, t: { en: "On tax returns / refunds", es: "En las declaraciones de impuestos", fr: "Sur les déclarations d'impôts", ru: "В возвратах налога", zh: "在退税单" } },
  { he: /^בהודעת /, t: { en: "On notice of ", es: "En el aviso de ", fr: "Sur l'avis de ", ru: "В уведомлении ", zh: "在通知 " } },
  { he: /^בחשבון אישי מול /, t: { en: "On personal account with ", es: "En la cuenta personal con ", fr: "Sur le compte personnel auprès de ", ru: "В личном счёте у ", zh: "在与 ... 的个人账户 " } },
  { he: /^בטפסי /, t: { en: "On forms ", es: "En los formularios ", fr: "Sur les formulaires ", ru: "В формах ", zh: "在表格 " } },
  { he: /^בטופס /, t: { en: "On form ", es: "En el formulario ", fr: "Sur le formulaire ", ru: "В форме ", zh: "在表格 " } },
  { he: /^במכתבי /, t: { en: "On letters from ", es: "En cartas de ", fr: "Sur les courriers de ", ru: "В письмах от ", zh: "在来信 " } },
  { he: /^במכתבים מ-?/, t: { en: "On letters from ", es: "En cartas de ", fr: "Sur les courriers de ", ru: "В письмах от ", zh: "在来信 " } },
  { he: /^במכתב פתיחת תיק עוסק$/, t: { en: "On the business file opening letter", es: "En la carta de apertura de actividad", fr: "Sur la lettre d'ouverture de dossier professionnel", ru: "В письме об открытии налогового досье", zh: "在开业登记信函" } },
  { he: /^במכתב רישום מס$/, t: { en: "On the tax registration letter", es: "En la carta de registro fiscal", fr: "Sur la lettre d'immatriculation fiscale", ru: "В письме о налоговой регистрации", zh: "在税务登记信函" } },
  { he: /^במכתב /, t: { en: "On letter ", es: "En la carta ", fr: "Sur la lettre ", ru: "В письме ", zh: "在信函 " } },
  { he: /^בכרטיס ביטוח בריאות$/, t: { en: "On the health insurance card", es: "En la tarjeta de seguro sanitario", fr: "Sur la carte d'assurance maladie", ru: "На карте медицинского страхования", zh: "在健康保险卡上" } },
  { he: /^בכרטיס בריאות הצהוב$/, t: { en: "On the yellow health card", es: "En la tarjeta sanitaria amarilla", fr: "Sur la carte santé jaune", ru: "На жёлтой медицинской карте", zh: "在黄色健康卡上" } },
  { he: /^בכרטיס ה-?/, t: { en: "On the card ", es: "En la tarjeta ", fr: "Sur la carte ", ru: "На карте ", zh: "在卡片 " } },
  { he: /^בכרטיס /, t: { en: "On the card ", es: "En la tarjeta ", fr: "Sur la carte ", ru: "На карте ", zh: "在卡片 " } },
  { he: /^בתעודת הזהות הביומטרית או בספח$/, t: { en: "On the biometric ID or appendix", es: "En el DNI biométrico o anexo", fr: "Sur la carte d'identité biométrique ou son annexe", ru: "В биометрическом удостоверении или приложении", zh: "在生物特征身份证或附页上" } },
  { he: /^בתעודת הזהות ה?/, t: { en: "On the national ID ", es: "En el documento de identidad ", fr: "Sur la carte d'identité ", ru: "В удостоверении личности ", zh: "在身份证 " } },
  { he: /^בתעודת הזהות$/, t: { en: "On the national ID", es: "En el documento de identidad", fr: "Sur la carte d'identité", ru: "В удостоверении личности", zh: "在身份证上" } },
  { he: /^בתעודת זהות /, t: { en: "On the national ID ", es: "En el documento de identidad ", fr: "Sur la carte d'identité ", ru: "В удостоверении личности ", zh: "在身份证 " } },
  { he: /^בתעודת זהות$/, t: { en: "On the national ID", es: "En el documento de identidad", fr: "Sur la carte d'identité", ru: "В удостоверении личности", zh: "在身份证上" } },
  { he: /^בתעודת ה-?/, t: { en: "On the ", es: "En la ", fr: "Sur la ", ru: "В ", zh: "在 " } },
  { he: /^בדרכון\/ת\.?ז\.?\s*/, t: { en: "On the passport / ID ", es: "En el pasaporte / DNI ", fr: "Sur le passeport / carte d'identité ", ru: "В паспорте / удостоверении личности ", zh: "在护照 / 身份证 " } },
  { he: /^בדרכון ישראלי$/, t: { en: "On an Israeli passport", es: "En el pasaporte israelí", fr: "Sur le passeport israélien", ru: "В израильском паспорте", zh: "在以色列护照上" } },
  { he: /^בדרכון /, t: { en: "On the passport ", es: "En el pasaporte ", fr: "Sur le passeport ", ru: "В паспорте ", zh: "在护照 " } },
  { he: /^בדרכון$/, t: { en: "On the passport", es: "En el pasaporte", fr: "Sur le passeport", ru: "В паспорте", zh: "在护照上" } },
  { he: /^ברישיון נהיגה /, t: { en: "On the driving licence ", es: "En el permiso de conducir ", fr: "Sur le permis de conduire ", ru: "В водительском удостоверении ", zh: "在驾驶执照 " } },
  { he: /^באישור התושבות \(/, t: { en: "On the residency certificate (", es: "En el certificado de residencia (", fr: "Sur le certificat de résidence (", ru: "В справке о резидентстве (", zh: "在居留证明 (" } },
  { he: /^באישור משלם מסים$/, t: { en: "On the taxpayer certificate", es: "En el certificado de contribuyente", fr: "Sur l'attestation de contribuable", ru: "В справке налогоплательщика", zh: "在纳税人证明" } },
  { he: /^באישור משלם מס$/, t: { en: "On the taxpayer certificate", es: "En el certificado de contribuyente", fr: "Sur l'attestation de contribuable", ru: "В справке налогоплательщика", zh: "在纳税人证明" } },
  { he: /^באישור ניכוי מס במקור$/, t: { en: "On the withholding-tax certificate", es: "En el certificado de retención en origen", fr: "Sur l'attestation de retenue à la source", ru: "В справке о налоге у источника", zh: "在预扣税证明" } },
  { he: /^באישור רישום משלם מס$/, t: { en: "On the taxpayer registration certificate", es: "En el certificado de registro de contribuyente", fr: "Sur l'attestation d'immatriculation fiscale", ru: "В свидетельстве о налоговой регистрации", zh: "在纳税人登记证明" } },
  { he: /^באישור /, t: { en: "On the certificate ", es: "En el certificado ", fr: "Sur l'attestation ", ru: "В справке ", zh: "在证明 " } },
  { he: /^באפליקציית /, t: { en: "In the app ", es: "En la aplicación ", fr: "Dans l'application ", ru: "В приложении ", zh: "在应用程序 " } },
  { he: /^ברשם החברות \(לחברות\)$/, t: { en: "At the Companies Registrar (entities)", es: "En el Registro de Empresas (entidades)", fr: "Au Registre des sociétés (entités)", ru: "В реестре компаний (организации)", zh: "在公司注册处 (实体)" } },
  { he: /^ברשם החברות$/, t: { en: "At the Companies Registrar", es: "En el Registro de Empresas", fr: "Au Registre des sociétés", ru: "В реестре компаний", zh: "在公司注册处" } },
  { he: /^ברשם החברות /, t: { en: "At the Companies Registrar ", es: "En el Registro de Empresas ", fr: "Au Registre des sociétés ", ru: "В реестре компаний ", zh: "在公司注册处 " } },
  { he: /^ברשם המאוחד /, t: { en: "At the unified registry ", es: "En el registro unificado ", fr: "Au registre unifié ", ru: "В едином реестре ", zh: "在统一登记处 " } },
  { he: /^ברשם /, t: { en: "At the registrar ", es: "En el registro ", fr: "Au registre ", ru: "В реестре ", zh: "在登记处 " } },
  // Only strip leading "ב-" / "ב" when followed by a Latin letter/digit (org name), never when it begins a Hebrew word
  { he: /^ב-(?=[\p{L}\d])(?![\u0590-\u05FF])/u, t: { en: "At ", es: "En ", fr: "Sur ", ru: "В ", zh: "在 " } },
  { he: /^ב(?=[A-Za-z\d])/, t: { en: "At ", es: "En ", fr: "Sur ", ru: "В ", zh: "在 " } },
];

const FOR_COMPANIES: Dict = { en: " (for companies)", es: " (para empresas)", fr: " (pour les sociétés)", ru: " (для компаний)", zh: " (适用于公司)" };
const FOR_ENTITIES: Dict = { en: " (entities)", es: " (entidades)", fr: " (entités)", ru: " (организации)", zh: " (实体)" };
const RESIDENT_FOREIGN: Dict = { en: " (resident / foreigner)", es: " (residente / extranjero)", fr: " (résident / étranger)", ru: " (резидент / иностранец)", zh: " (居民 / 外国人)" };
const INDIVIDUAL: Dict = { en: " (individual)", es: " (individual)", fr: " (individuel)", ru: " (физлицо)", zh: " (个人)" };
const VAT_TIN: Dict = { en: " (VAT TIN)", es: " (TIN para IVA)", fr: " (TIN pour TVA)", ru: " (TIN для НДС)", zh: " (增值税 TIN)" };

function translateFormat(s: string, lang: NonHe): string {
  const w: Record<string, Record<NonHe, string>> = {
    digits: { en: "digits", es: "dígitos", fr: "chiffres", ru: "цифр", zh: "位数字" },
    letters: { en: "letters", es: "letras", fr: "lettres", ru: "букв", zh: "个字母" },
    letter: { en: "letter", es: "letra", fr: "lettre", ru: "буква", zh: "个字母" },
    chars: { en: "characters", es: "caracteres", fr: "caractères", ru: "символов", zh: "个字符" },
    char: { en: "character", es: "carácter", fr: "caractère", ru: "символ", zh: "个字符" },
    checkDigit: { en: "check digit", es: "dígito de control", fr: "chiffre de contrôle", ru: "контрольная цифра", zh: "校验位" },
    upTo: { en: "up to ", es: "hasta ", fr: "jusqu'à ", ru: "до ", zh: "最多 " },
    starts: { en: "starts with ", es: "empieza con ", fr: "commence par ", ru: "начинается с ", zh: "以 " },
    alnum: { en: "alphanumeric", es: "alfanuméricos", fr: "alphanumériques", ru: "буквенно-цифровых", zh: "字母数字" },
    branch: { en: "branch", es: "sucursal", fr: "agence", ru: "филиал", zh: "分支" },
    like: { en: "like", es: "como", fr: "comme", ru: "как", zh: "类似" },
    or: { en: "or", es: "o", fr: "ou", ru: "или", zh: "或" },
    nationalId: { en: "national ID", es: "documento de identidad", fr: "carte d'identité", ru: "национальный ID", zh: "国民身份证" },
    sometimes: { en: "sometimes", es: "a veces", fr: "parfois", ru: "иногда", zh: "有时" },
    programSuffix: { en: "program suffix", es: "sufijo de programa", fr: "suffixe de programme", ru: "суффикс программы", zh: "项目后缀" },
    individual: { en: "individual", es: "individual", fr: "individuel", ru: "физлицо", zh: "个人" },
    entity: { en: "entity", es: "entidad", fr: "entité", ru: "организация", zh: "实体" },
    foreigners: { en: "foreigners", es: "extranjeros", fr: "étrangers", ru: "иностранцы", zh: "外国人" },
    citizenResident: { en: "citizen/resident", es: "ciudadano/residente", fr: "citoyen/résident", ru: "гражданин/резидент", zh: "公民/居民" },
    foreigner: { en: "foreigner", es: "extranjero", fr: "étranger", ru: "иностранец", zh: "外国人" },
    resident: { en: "resident", es: "residente", fr: "résident", ru: "резидент", zh: "居民" },
    forCompanies: { en: "for companies", es: "para empresas", fr: "pour les sociétés", ru: "для компаний", zh: "适用于公司" },
    forVAT: { en: "VAT TIN", es: "TIN para IVA", fr: "TIN pour TVA", ru: "TIN для НДС", zh: "增值税 TIN" },
    company: { en: "company", es: "empresa", fr: "société", ru: "компания", zh: "公司" },
    of: { en: "of", es: "de", fr: "de", ru: "у", zh: "的" },
    populationRegistry: { en: "population registry", es: "registro de población", fr: "registre de la population", ru: "реестр населения", zh: "人口登记处" },
    tax: { en: "tax authority", es: "autoridad fiscal", fr: "administration fiscale", ru: "налоговый орган", zh: "税务机关" },
  };
  let out = s;
  // Country-name "like X" patterns inside parens
  const countryLike: [RegExp, string][] = [
    [/כמו פינלנד/g, "Finland"], [/כמו נורווגיה/g, "Norway"], [/כמו צרפת/g, "France"],
    [/כמו בלגיה/g, "Belgium"], [/כמו ספרד/g, "Spain"], [/כמו דנמרק/g, "Denmark"],
  ];
  for (const [re, name] of countryLike) out = out.replace(re, `${w.like[lang]} ${name}`);

  // Numeric quantities with units
  out = out.replace(/עד (\d+(?:-\d+)?)\s*ספרות/g, `${w.upTo[lang]}$1 ${w.digits[lang]}`);
  out = out.replace(/עד (\d+(?:-\d+)?)\s*תווים/g, `${w.upTo[lang]}$1 ${w.chars[lang]}`);
  out = out.replace(/עד (\d+(?:-\d+)?)\s*אותיות/g, `${w.upTo[lang]}$1 ${w.letters[lang]}`);
  out = out.replace(/(\d+(?:[-–]\d+)?)\s*ספרות/g, `$1 ${w.digits[lang]}`);
  out = out.replace(/(\d+(?:[-–]\d+)?)\s*תווים אלפאנומריים/g, `$1 ${w.alnum[lang]} ${w.chars[lang]}`);
  out = out.replace(/(\d+(?:[-–]\d+)?)\s*תווים/g, `$1 ${w.chars[lang]}`);
  out = out.replace(/(\d+(?:[-–]\d+)?)\s*אותיות\/ספרות/g, `$1 ${w.letters[lang]}/${w.digits[lang]}`);
  out = out.replace(/(\d+(?:[-–]\d+)?)\s*אותיות/g, `$1 ${w.letters[lang]}`);
  out = out.replace(/(\d+)\s*תו(?!ו)/g, `$1 ${w.char[lang]}`);
  out = out.replace(/(\d+)\s*אות(?!ו|י)/g, `$1 ${w.letter[lang]}`);
  out = out.replace(/(\d+)\s*ספרות סניף/g, `$1 ${w.digits[lang]} ${w.branch[lang]}`);
  out = out.replace(/ספרת ביקורת/g, w.checkDigit[lang]);
  out = out.replace(/תו ביקורת/g, w.checkDigit[lang]);
  out = out.replace(/מתחיל ב-?/g, w.starts[lang]);
  out = out.replace(/אלפאנומריים/g, w.alnum[lang]);
  out = out.replace(/אלפאנומרי/g, w.alnum[lang]);
  out = out.replace(/לעיתים/g, w.sometimes[lang]);
  out = out.replace(/סיומת תוכנית/g, w.programSuffix[lang]);
  out = out.replace(/TIN למע״מ/g, w.forVAT[lang]);
  out = out.replace(/למע״מ/g, w.forVAT[lang]);
  out = out.replace(/לחברות/g, w.forCompanies[lang]);
  out = out.replace(/\(יחיד\)/g, `(${w.individual[lang]})`);
  out = out.replace(/\(חברה\)/g, `(${w.entity[lang]})`);
  out = out.replace(/\(זרים\)/g, `(${w.foreigners[lang]})`);
  out = out.replace(/\(זר\)/g, `(${w.foreigner[lang]})`);
  out = out.replace(/\(תושב\)/g, `(${w.resident[lang]})`);
  out = out.replace(/\(אזרח\/תושב\)/g, `(${w.citizenResident[lang]})`);
  out = out.replace(/\(מספר זהות לאומי\)/g, `(${w.nationalId[lang]})`);
  // Connectors and bare tokens (no ASCII word boundaries around Hebrew)
  out = out.replace(/(^|[\s(])או(?=[\s)]|$)/g, `$1${w.or[lang]}`);
  out = out.replace(/(^|\s)או ב-?(?=[A-Za-z0-9])/g, `$1${w.or[lang]} `);
  out = out.replace(/(^|\s)או ב/g, `$1${w.or[lang]} `);
  out = out.replace(/ובטופס /g, ` + ${{ en: "form ", es: "formulario ", fr: "formulaire ", ru: "форма ", zh: "表格 " }[lang]}`);
  out = out.replace(/ובמכתב /g, ` + ${{ en: "letter ", es: "carta ", fr: "lettre ", ru: "письмо ", zh: "信函 " }[lang]}`);
  out = out.replace(/ובמסמכי /g, ` + ${{ en: "documents of ", es: "documentos de ", fr: "documents de ", ru: "документы ", zh: "文件 " }[lang]}`);
  out = out.replace(/בתלוש שכר/g, { en: "on payslip", es: "en la nómina", fr: "sur le bulletin de paie", ru: "в расчётном листке", zh: "在工资单" }[lang]);
  out = out.replace(/בהחזרי מס/g, { en: "on tax returns", es: "en las declaraciones", fr: "sur les déclarations", ru: "в возвратах налога", zh: "在退税" }[lang]);
  out = out.replace(/בספח/g, { en: "in appendix", es: "en el anexo", fr: "dans l'annexe", ru: "в приложении", zh: "在附页" }[lang]);
  out = out.replace(/שהוגש לעסק/g, { en: "filed for the business", es: "presentado para la empresa", fr: "déposé pour l'entreprise", ru: "поданный за бизнес", zh: "为企业提交" }[lang]);
  out = out.replace(/קופת הפיצויים/g, { en: "severance fund", es: "fondo de indemnización", fr: "caisse d'indemnités", ru: "фонд выходных пособий", zh: "解雇金基金" }[lang]);
  out = out.replace(/קרן פנסיה/g, { en: "pension fund", es: "fondo de pensiones", fr: "caisse de retraite", ru: "пенсионный фонд", zh: "养老基金" }[lang]);
  out = out.replace(/קנטונלית/g, { en: "(cantonal)", es: "(cantonal)", fr: "(cantonal)", ru: "(кантональная)", zh: "(州级)" }[lang]);
  out = out.replace(/של IRD/g, { en: "from IRD", es: "del IRD", fr: "de l'IRD", ru: "от IRD", zh: "由 IRD" }[lang]);
  out = out.replace(/בקשה מקוונת/g, { en: "online request", es: "solicitud en línea", fr: "demande en ligne", ru: "онлайн-запрос", zh: "在线申请" }[lang]);
  out = out.replace(/אזור אישי/g, { en: "personal area", es: "área personal", fr: "espace personnel", ru: "личный кабинет", zh: "个人区域" }[lang]);
  out = out.replace(/רשם החברות/g, { en: "Companies Registrar", es: "Registro de Empresas", fr: "Registre des sociétés", ru: "Реестр компаний", zh: "公司注册处" }[lang]);
  out = out.replace(/הפלסטיק/g, { en: "(plastic)", es: "(plástico)", fr: "(plastique)", ru: "(пластиковая)", zh: "(塑料)" }[lang]);
  out = out.replace(/הזהות הבלגי/g, { en: "Belgian ID", es: "DNI belga", fr: "carte d'identité belge", ru: "бельгийское удостоверение", zh: "比利时身份证" }[lang]);
  // Bare standalone tokens (after numeric replacements above)
  out = out.replace(/(^|[\s+(])אות(?=[\s)+]|$)/g, `$1${w.letter[lang]}`);
  out = out.replace(/(^|[\s+(])אותיות(?=[\s)+]|$)/g, `$1${w.letters[lang]}`);
  out = out.replace(/(^|[\s+(])ספרות(?=[\s)+]|$)/g, `$1${w.digits[lang]}`);
  out = out.replace(/(^|\s)סניף(?=\s|$)/g, `$1${w.branch[lang]}`);
  out = out.replace(/אותיות\/ספרות/g, `${w.letters[lang]}/${w.digits[lang]}`);
  // Country adjectives following "national ID " / "passport "
  const adj: Record<string, Record<NonHe, string>> = {
    "האלבנית": { en: "(Albanian)", es: "(albanés)", fr: "(albanaise)", ru: "(албанское)", zh: "(阿尔巴尼亚)" },
    "אלבנית": { en: "(Albanian)", es: "(albanés)", fr: "(albanaise)", ru: "(албанское)", zh: "(阿尔巴尼亚)" },
    "הגאורגית": { en: "(Georgian)", es: "(georgiano)", fr: "(géorgienne)", ru: "(грузинское)", zh: "(格鲁吉亚)" },
    "המולדבית": { en: "(Moldovan)", es: "(moldavo)", fr: "(moldave)", ru: "(молдавское)", zh: "(摩尔多瓦)" },
    "המונטנגרית": { en: "(Montenegrin)", es: "(montenegrino)", fr: "(monténégrine)", ru: "(черногорское)", zh: "(黑山)" },
    "המקדונית": { en: "(Macedonian)", es: "(macedonio)", fr: "(macédonienne)", ru: "(македонское)", zh: "(北马其顿)" },
    "הסרבית": { en: "(Serbian)", es: "(serbio)", fr: "(serbe)", ru: "(сербское)", zh: "(塞尔维亚)" },
    "הקזחית": { en: "(Kazakh)", es: "(kazajo)", fr: "(kazakhe)", ru: "(казахстанское)", zh: "(哈萨克)" },
    "בולגרית": { en: "(Bulgarian)", es: "(búlgaro)", fr: "(bulgare)", ru: "(болгарское)", zh: "(保加利亚)" },
    "פולנית": { en: "(Polish)", es: "(polaco)", fr: "(polonaise)", ru: "(польское)", zh: "(波兰)" },
    "צ׳כית": { en: "(Czech)", es: "(checo)", fr: "(tchèque)", ru: "(чешское)", zh: "(捷克)" },
    "רומנית": { en: "(Romanian)", es: "(rumano)", fr: "(roumaine)", ru: "(румынское)", zh: "(румынское)" },
    "הולנדית": { en: "(Dutch)", es: "(neerlandés)", fr: "(néerlandaise)", ru: "(голландское)", zh: "(荷兰)" },
    "הולנדי": { en: "(Dutch)", es: "(neerlandés)", fr: "(néerlandais)", ru: "(голландское)", zh: "(荷兰)" },
    "שוודי": { en: "(Swedish)", es: "(sueco)", fr: "(suédois)", ru: "(шведское)", zh: "(瑞典)" },
    "ישראלי": { en: "(Israeli)", es: "(israelí)", fr: "(israélien)", ru: "(израильское)", zh: "(以色列)" },
  };
  for (const [he, dict] of Object.entries(adj)) {
    out = out.replace(new RegExp(`\\s${he}(?=$|[\\s.,)])`, "g"), ` ${dict[lang]}`);
  }
  return out;
}

export function tr(text: string | undefined, lang: Lang): string {
  if (!text) return "";
  if (lang === "he") return text;
  const l = lang as NonHe;
  if (EXACT[text]?.[l]) return EXACT[text]![l]!;

  const mCompany = text.match(/^(.+) \(חברה\)$/);
  if (mCompany) return `${tr(mCompany[1], lang)}${FOR_ENTITIES[l]}`;
  const mForCompanies = text.match(/^(.+) \(לחברות\)$/);
  if (mForCompanies) return `${tr(mForCompanies[1], lang)}${FOR_COMPANIES[l]}`;
  const mIndiv = text.match(/^(.+) \(יחיד\)$/);
  if (mIndiv) return `${tr(mIndiv[1], lang)}${INDIVIDUAL[l]}`;
  const mVat = text.match(/^(.+) \(TIN למע״מ\)$/);
  if (mVat) return `${tr(mVat[1], lang)}${VAT_TIN[l]}`;
  const mResForeign = text.match(/^(.+) \(תושב\) \/ (.+) \(זר\)$/);
  if (mResForeign) return `${mResForeign[1]} / ${mResForeign[2]}${RESIDENT_FOREIGN[l]}`;

  for (const { he, t } of LABEL_REPLACEMENTS) {
    if (he.test(text)) {
      const replaced = text.replace(he, t[l] ?? "");
      return translateFormat(replaced, l);
    }
  }

  if (/[\u0590-\u05FF]/.test(text)) {
    const formatted = translateFormat(text, l);
    if (formatted !== text) return formatted;
  }

  return text;
}
