import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { COUNTRIES, getLastUpdated, type CountryTin } from "@/data/tin-countries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, MapPin, FileText, Building2, User, Download, Printer, Copy, Languages, ChevronsUpDown, Check, Mail, FileCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { tr } from "@/lib/tin-i18n";
import { cn } from "@/lib/utils";
import { InstallButton } from "@/components/InstallButton";
import { useOverflowCheck } from "@/lib/use-overflow-check";
import { DemoTour, type DemoStep } from "@/components/DemoTour";
import { Play } from "lucide-react";

const DEMO_T: Record<Lang, {
  button: string; next: string; prev: string; exit: string; finish: string;
  stepOf: (i: number, n: number) => string;
  s1t: string; s1b: string;
  s2t: string; s2b: string;
  s3t: string; s3b: string;
  s4t: string; s4b: string;
  s5t: string; s5b: string;
}> = {
  he: {
    button: "הדגמה", next: "הבא", prev: "הקודם", exit: "סיים", finish: "סיום",
    stepOf: (i, n) => `שלב ${i} מתוך ${n}`,
    s1t: "בחר שפה", s1b: "האתר תומך ב-6 שפות. כאן מחליפים בין עברית, אנגלית, ספרדית, צרפתית, רוסית וסינית.",
    s2t: "בחר מדינה", s2b: "לוחצים כאן כדי לפתוח רשימת 238 מדינות. אפשר להקליד כדי לחפש. לצורך ההדגמה בחרנו את גרמניה.",
    s3t: "צפייה בפרטי ה-TIN", s3b: "מקבלים את שם המזהה המקומי, המבנה שלו, דוגמה, איפה מוצאים אותו וקישורים למקורות רשמיים.",
    s4t: "ייצוא ושליחה", s4b: "אפשר להעתיק, להוריד כקובץ טקסט או PDF, ואפילו לשלוח את הפרטים ישירות ב-Gmail.",
    s5t: "זהו!", s5b: "כלי חינמי ופתוח לכל מי שצריך לזהות פורמט TIN לצורכי FATCA/CRS. שתפו הלאה 🙌",
  },
  en: {
    button: "Demo", next: "Next", prev: "Back", exit: "Skip", finish: "Done",
    stepOf: (i, n) => `Step ${i} of ${n}`,
    s1t: "Pick a language", s1b: "The site supports 6 languages. Switch between English, Hebrew, Spanish, French, Russian and Chinese here.",
    s2t: "Select a country", s2b: "Click to open the list of 238 countries. You can type to search. For the demo we picked Germany.",
    s3t: "See the TIN details", s3b: "You get the local identifier name, format, example, where to find it, and links to the official sources.",
    s4t: "Export & share", s4b: "Copy the results, download as text or PDF, or send them straight through Gmail.",
    s5t: "That's it!", s5b: "A free open tool for anyone who needs to identify a TIN format for FATCA/CRS. Share it forward 🙌",
  },
  es: {
    button: "Demo", next: "Siguiente", prev: "Atrás", exit: "Omitir", finish: "Listo",
    stepOf: (i, n) => `Paso ${i} de ${n}`,
    s1t: "Elige un idioma", s1b: "El sitio admite 6 idiomas. Cambia aquí entre español, inglés, hebreo, francés, ruso y chino.",
    s2t: "Selecciona un país", s2b: "Haz clic para abrir la lista de 238 países. Puedes escribir para buscar. Para la demo elegimos Alemania.",
    s3t: "Ver los detalles del TIN", s3b: "Obtienes el nombre del identificador local, el formato, un ejemplo, dónde encontrarlo y enlaces a las fuentes oficiales.",
    s4t: "Exportar y compartir", s4b: "Copia los resultados, descárgalos como texto o PDF, o envíalos directamente por Gmail.",
    s5t: "¡Eso es todo!", s5b: "Una herramienta gratuita y abierta para quien necesite identificar un formato TIN para FATCA/CRS 🙌",
  },
  fr: {
    button: "Démo", next: "Suivant", prev: "Retour", exit: "Passer", finish: "Terminé",
    stepOf: (i, n) => `Étape ${i} sur ${n}`,
    s1t: "Choisissez une langue", s1b: "Le site prend en charge 6 langues. Basculez ici entre français, anglais, hébreu, espagnol, russe et chinois.",
    s2t: "Sélectionnez un pays", s2b: "Cliquez pour ouvrir la liste des 238 pays. Vous pouvez taper pour rechercher. Pour la démo nous avons choisi l'Allemagne.",
    s3t: "Voir les détails du TIN", s3b: "Vous obtenez le nom local, le format, un exemple, où le trouver, et des liens vers les sources officielles.",
    s4t: "Exporter et partager", s4b: "Copiez les résultats, téléchargez-les en texte ou PDF, ou envoyez-les directement via Gmail.",
    s5t: "C'est tout !", s5b: "Un outil gratuit et ouvert pour quiconque doit identifier un format TIN pour FATCA/CRS 🙌",
  },
  ru: {
    button: "Демо", next: "Далее", prev: "Назад", exit: "Пропустить", finish: "Готово",
    stepOf: (i, n) => `Шаг ${i} из ${n}`,
    s1t: "Выберите язык", s1b: "Сайт поддерживает 6 языков. Здесь можно переключаться между русским, английским, ивритом, испанским, французским и китайским.",
    s2t: "Выберите страну", s2b: "Нажмите, чтобы открыть список из 238 стран. Можно вводить для поиска. Для демо мы выбрали Германию.",
    s3t: "Информация о TIN", s3b: "Вы получите название местного идентификатора, формат, пример, где его найти и ссылки на официальные источники.",
    s4t: "Экспорт и отправка", s4b: "Скопируйте результаты, скачайте как текст или PDF, или отправьте прямо через Gmail.",
    s5t: "Готово!", s5b: "Бесплатный открытый инструмент для всех, кому нужен формат TIN для FATCA/CRS 🙌",
  },
  zh: {
    button: "演示", next: "下一步", prev: "上一步", exit: "跳过", finish: "完成",
    stepOf: (i, n) => `第 ${i} 步，共 ${n} 步`,
    s1t: "选择语言", s1b: "本站支持6种语言。在此切换中文、英语、希伯来语、西班牙语、法语和俄语。",
    s2t: "选择国家", s2b: "点击此处打开238个国家的列表，可以键入进行搜索。演示中我们选择了德国。",
    s3t: "查看 TIN 详情", s3b: "获取本地标识符名称、格式、示例、在哪里查找以及官方来源的链接。",
    s4t: "导出与分享", s4b: "复制结果、下载为文本或 PDF，或直接通过 Gmail 发送。",
    s5t: "就是这样！", s5b: "面向所有需要识别 FATCA/CRS TIN 格式的用户的免费开源工具 🙌",
  },
};

type Lang = "he" | "en" | "es" | "fr" | "ru" | "zh";

export const LANGUAGES: { code: Lang; native: string; dir: "rtl" | "ltr" }[] = [
  { code: "he", native: "עברית", dir: "rtl" },
  { code: "en", native: "English", dir: "ltr" },
  { code: "es", native: "Español", dir: "ltr" },
  { code: "fr", native: "Français", dir: "ltr" },
  { code: "ru", native: "Русский", dir: "ltr" },
  { code: "zh", native: "中文", dir: "ltr" },
];

type Strings = {
  title: string; subtitle: string;
  step1: string; placeholder: string; noResults: string; empty: string; disclaimer: string;
  localName: string; localAuth: string;
  step2: string; individual: string; entity: string;
  name: string; format: string; example: string;
  whereTitle: (tin: string, country: string) => string;
  sourcesTitle: string; sourcesIntro: string;
  localAuthLabel: string; oecdLabel: string; euLabel: string; lastUpdatedLabel: string;
  copy: string; download: string; pdf: string; previewPdf: string; sendGmail: string;
  copied: string; copyErr: string; downloaded: string; dlErr: string;
  pdfOpened: string; pdfErr: string; gmailOpened: string; legal: string; legalText: string; sourcesFooter: string; languageLabel: string;
  exportCountry: string; exportNote: string;
  exportWhere: (tin: string) => string;
  exportSources: string; exportDisclaimer: string;
};

const T: Record<Lang, Strings> = {
  he: {
    title: "מאתר TIN — FATCA/CRS", subtitle: "בחר מדינה כדי לראות את שם ומבנה מספר זיהוי המס.",
    step1: "1. בחר מדינה", placeholder: "חפש או בחר מדינה", noResults: "לא נמצאו תוצאות",
    empty: "התוצאות יופיעו כאן לאחר בחירת מדינה.",
    disclaimer: "⚠️ מידע להתמצאות בלבד. אינו ייעוץ מס/משפטי ואינו מקור רשמי — יש לאמת מול הרשות המוסמכת לפני שימוש לצרכי FATCA/CRS.",
    localName: "שם המזהה המקומי", localAuth: "רשות המס המקומית",
    step2: "2. בחר סוג", individual: "יחיד", entity: "חברה / ישות",
    name: "שם", format: "מבנה", example: "דוגמה",
    whereTitle: (tin, country) => `איפה ניתן למצוא את ה-${tin} שלי ב${country}? לחץ על החץ לפירוט`,
    sourcesTitle: "מקורות ועדכון אחרון", sourcesIntro: "המידע נאסף מהמקורות הרשמיים הבאים:",
    localAuthLabel: "רשות המס המקומית", oecdLabel: "OECD — מאגר TIN לצורכי CRS",
    euLabel: "נציבות האיחוד האירופי — TIN on Europa", lastUpdatedLabel: "עודכן לאחרונה",
    copy: "העתק ללוח", download: "הורד כקובץ טקסט", pdf: "ייצא ל-PDF (הדפסה)", previewPdf: "הורד PDF לבדיקה", sendGmail: "שלח בג'ימייל",
    copied: "התוצאות הועתקו ללוח", copyErr: "לא ניתן להעתיק — בחר ידנית",
    downloaded: "הקובץ הורד", dlErr: "שגיאה בהורדת הקובץ",
    pdfOpened: "נפתח דיאלוג הדפסה — בחר 'שמור כ-PDF'", pdfErr: "שגיאה בייצוא ל-PDF", gmailOpened: "נפתח Gmail עם התוצאות — צרף את ה-PDF במידת הצורך",
    legal: "הבהרה משפטית",
    legalText: "אתר זה אינו גורם רשמי, אינו מסונף ל-OECD, ל-IRS או לכל רשות מס, ואינו מהווה ייעוץ מס, ייעוץ משפטי או חוות דעת מקצועית. המידע מוצג \"AS IS\" למטרות התמצאות בלבד, עשוי להיות חלקי או לא מעודכן, ואין להסתמך עליו לצורך דיווח FATCA/CRS או כל החלטה אחרת. יש לאמת כל פרט מול הרשות המוסמכת במדינה הרלוונטית ולהתייעץ עם איש מקצוע מוסמך. השימוש באתר הוא באחריות המשתמש בלבד.",
    sourcesFooter: "מקורות עיקריים:",
    languageLabel: "שפה",
    exportCountry: "מדינה", exportNote: "הערה",
    exportWhere: (tin) => `איפה ניתן למצוא את ה-${tin}:`,
    exportSources: "מקורות:",
    exportDisclaimer: "מידע להתמצאות בלבד. אינו ייעוץ מס/משפטי. יש לאמת מול הרשות המוסמכת.",
  },
  en: {
    title: "TIN Finder — FATCA/CRS", subtitle: "Select a country to view the name and format of its Tax Identification Number.",
    step1: "1. Select a country", placeholder: "Search or choose a country", noResults: "No results found",
    empty: "Results will appear here after selecting a country.",
    disclaimer: "⚠️ Informational only. Not tax/legal advice and not an official source — verify with the relevant authority before using for FATCA/CRS.",
    localName: "Local identifier name", localAuth: "Local tax authority",
    step2: "2. Choose type", individual: "Individual", entity: "Company / Entity",
    name: "Name", format: "Format", example: "Example",
    whereTitle: (tin, country) => `Where can I find my ${tin} in ${country}? Click the arrow for details`,
    sourcesTitle: "Sources & last updated", sourcesIntro: "Data was compiled from the following official sources:",
    localAuthLabel: "Local tax authority", oecdLabel: "OECD — TIN portal (CRS)",
    euLabel: "European Commission — TIN on Europa", lastUpdatedLabel: "Last updated",
    copy: "Copy to clipboard", download: "Download as text file", pdf: "Export to PDF (print)", previewPdf: "Download PDF to verify", sendGmail: "Send via Gmail",
    copied: "Results copied to clipboard", copyErr: "Cannot copy — select manually",
    downloaded: "File downloaded", dlErr: "Download error",
    pdfOpened: "Print dialog opened — choose 'Save as PDF'", pdfErr: "PDF export error", gmailOpened: "Gmail opened with the results — attach the PDF if needed",
    legal: "Legal disclaimer",
    legalText: "This website is not an official body, is not affiliated with the OECD, the IRS, or any tax authority, and does not constitute tax advice, legal advice, or a professional opinion. The information is provided \"AS IS\" for informational purposes only, may be partial or outdated, and should not be relied upon for FATCA/CRS reporting or any other decision. Please verify every detail with the competent authority in the relevant country and consult a qualified professional. Use of this website is at the user's sole responsibility.",
    sourcesFooter: "Primary sources:",
    languageLabel: "Language",
    exportCountry: "Country", exportNote: "Note",
    exportWhere: (tin) => `Where to find your ${tin}:`,
    exportSources: "Sources:",
    exportDisclaimer: "Informational only. Not tax/legal advice. Verify with the competent authority.",
  },
  es: {
    title: "Buscador de TIN — FATCA/CRS", subtitle: "Seleccione un país para ver el nombre y formato del Número de Identificación Fiscal.",
    step1: "1. Seleccionar país", placeholder: "Busque o elija un país", noResults: "No se encontraron resultados",
    empty: "Los resultados aparecerán aquí después de seleccionar un país.",
    disclaimer: "⚠️ Solo informativo. No es asesoramiento fiscal/legal ni una fuente oficial — verifique con la autoridad competente antes de usar para FATCA/CRS.",
    localName: "Nombre del identificador local", localAuth: "Autoridad fiscal local",
    step2: "2. Elegir tipo", individual: "Persona física", entity: "Empresa / Entidad",
    name: "Nombre", format: "Formato", example: "Ejemplo",
    whereTitle: (tin, country) => `¿Dónde puedo encontrar mi ${tin} en ${country}? Haga clic en la flecha para más detalles`,
    sourcesTitle: "Fuentes y última actualización", sourcesIntro: "Datos recopilados de las siguientes fuentes oficiales:",
    localAuthLabel: "Autoridad fiscal local", oecdLabel: "OCDE — Portal TIN (CRS)",
    euLabel: "Comisión Europea — TIN on Europa", lastUpdatedLabel: "Última actualización",
    copy: "Copiar al portapapeles", download: "Descargar como texto", pdf: "Exportar a PDF (imprimir)", previewPdf: "Descargar PDF para verificar", sendGmail: "Enviar por Gmail",
    copied: "Resultados copiados", copyErr: "No se puede copiar — seleccione manualmente",
    downloaded: "Archivo descargado", dlErr: "Error de descarga",
    pdfOpened: "Diálogo de impresión abierto — elija 'Guardar como PDF'", pdfErr: "Error al exportar PDF", gmailOpened: "Gmail abierto con los resultados — adjunte el PDF si es necesario",
    legal: "Aviso legal",
    legalText: "Este sitio web no es un organismo oficial, no está afiliado a la OCDE, al IRS ni a ninguna autoridad fiscal, y no constituye asesoramiento fiscal, asesoramiento legal ni una opinión profesional. La información se proporciona \"TAL CUAL\" solo con fines informativos, puede ser parcial o estar desactualizada, y no debe utilizarse para la declaración FATCA/CRS ni para ninguna otra decisión. Verifique cada detalle con la autoridad competente del país correspondiente y consulte a un profesional cualificado. El uso de este sitio web es responsabilidad exclusiva del usuario.",
    sourcesFooter: "Fuentes principales:",
    languageLabel: "Idioma",
    exportCountry: "País", exportNote: "Nota",
    exportWhere: (tin) => `Dónde encontrar su ${tin}:`,
    exportSources: "Fuentes:",
    exportDisclaimer: "Solo informativo. No es asesoramiento fiscal/legal. Verifique con la autoridad competente.",
  },
  fr: {
    title: "Recherche TIN — FATCA/CRS", subtitle: "Sélectionnez un pays pour voir le nom et le format du numéro d'identification fiscale.",
    step1: "1. Sélectionner un pays", placeholder: "Recherchez ou choisissez un pays", noResults: "Aucun résultat trouvé",
    empty: "Les résultats apparaîtront ici après la sélection d'un pays.",
    disclaimer: "⚠️ À titre informatif uniquement. Pas un conseil fiscal/juridique ni une source officielle — vérifiez auprès de l'autorité compétente avant utilisation pour FATCA/CRS.",
    localName: "Nom de l'identifiant local", localAuth: "Administration fiscale locale",
    step2: "2. Choisir le type", individual: "Particulier", entity: "Société / Entité",
    name: "Nom", format: "Format", example: "Exemple",
    whereTitle: (tin, country) => `Où puis-je trouver mon ${tin} en ${country} ? Cliquez sur la flèche pour les détails`,
    sourcesTitle: "Sources et dernière mise à jour", sourcesIntro: "Données compilées à partir des sources officielles suivantes :",
    localAuthLabel: "Administration fiscale locale", oecdLabel: "OCDE — Portail TIN (CRS)",
    euLabel: "Commission européenne — TIN on Europa", lastUpdatedLabel: "Dernière mise à jour",
    copy: "Copier dans le presse-papiers", download: "Télécharger en texte", pdf: "Exporter en PDF (imprimer)", previewPdf: "Télécharger le PDF pour vérifier", sendGmail: "Envoyer via Gmail",
    copied: "Résultats copiés", copyErr: "Impossible de copier — sélectionnez manuellement",
    downloaded: "Fichier téléchargé", dlErr: "Erreur de téléchargement",
    pdfOpened: "Boîte d'impression ouverte — choisissez 'Enregistrer en PDF'", pdfErr: "Erreur d'export PDF", gmailOpened: "Gmail ouvert avec les résultats — joignez le PDF si nécessaire",
    legal: "Mentions légales",
    legalText: "Ce site web n'est pas un organisme officiel, n'est pas affilié à l'OCDE, à l'IRS ou à aucune autorité fiscale, et ne constitue pas un conseil fiscal, un conseil juridique ou une opinion professionnelle. Les informations sont fournies \"EN L'ÉTAT\" à titre informatif uniquement, peuvent être partielles ou obsolètes, et ne doivent pas être utilisées pour la déclaration FATCA/CRS ou toute autre décision. Veuillez vérifier chaque détail auprès de l'autorité compétente du pays concerné et consulter un professionnel qualifié. L'utilisation de ce site web est sous la seule responsabilité de l'utilisateur.",
    sourcesFooter: "Sources principales :",
    languageLabel: "Langue",
    exportCountry: "Pays", exportNote: "Note",
    exportWhere: (tin) => `Où trouver votre ${tin} :`,
    exportSources: "Sources :",
    exportDisclaimer: "À titre informatif uniquement. Pas un conseil fiscal/juridique. Vérifiez auprès de l'autorité compétente.",
  },
  ru: {
    title: "Поиск TIN — FATCA/CRS", subtitle: "Выберите страну, чтобы увидеть название и формат идентификационного номера налогоплательщика.",
    step1: "1. Выберите страну", placeholder: "Найдите или выберите страну", noResults: "Результаты не найдены",
    empty: "Результаты появятся здесь после выбора страны.",
    disclaimer: "⚠️ Только для справки. Не является налоговой/юридической консультацией или официальным источником — проверьте у компетентного органа перед использованием для FATCA/CRS.",
    localName: "Название местного идентификатора", localAuth: "Местный налоговый орган",
    step2: "2. Выберите тип", individual: "Физ. лицо", entity: "Компания / Организация",
    name: "Название", format: "Формат", example: "Пример",
    whereTitle: (tin, country) => `Где найти мой ${tin} в ${country}? Нажмите на стрелку для подробностей`,
    sourcesTitle: "Источники и последнее обновление", sourcesIntro: "Данные собраны из следующих официальных источников:",
    localAuthLabel: "Местный налоговый орган", oecdLabel: "ОЭСР — портал TIN (CRS)",
    euLabel: "Европейская комиссия — TIN on Europa", lastUpdatedLabel: "Последнее обновление",
    copy: "Копировать в буфер", download: "Скачать как текст", pdf: "Экспорт в PDF (печать)", previewPdf: "Скачать PDF для проверки", sendGmail: "Отправить через Gmail",
    copied: "Результаты скопированы", copyErr: "Не удалось скопировать — выделите вручную",
    downloaded: "Файл загружен", dlErr: "Ошибка загрузки",
    pdfOpened: "Открыт диалог печати — выберите 'Сохранить как PDF'", pdfErr: "Ошибка экспорта PDF", gmailOpened: "Gmail открыт с результатами — при необходимости прикрепите PDF",
    legal: "Юридическая оговорка",
    legalText: "Этот веб-сайт не является официальным органом, не аффилирован с ОЭСР, Налоговым управлением США (IRS) или каким-либо налоговым органом, и не является налоговой консультацией, юридической консультацией или профессиональным мнением. Информация предоставляется \"КАК ЕСТЬ\" только в информационных целях, может быть неполной или устаревшей, и не должна использоваться для отчетности FATCA/CRS или любых других решений. Пожалуйста, проверьте каждую деталь у компетентного органа в соответствующей стране и проконсультируйтесь с квалифицированным специалистом. Использование этого веб-сайта осуществляется исключительно на ответственность пользователя.",
    sourcesFooter: "Основные источники:",
    languageLabel: "Язык",
    exportCountry: "Страна", exportNote: "Примечание",
    exportWhere: (tin) => `Где найти ваш ${tin}:`,
    exportSources: "Источники:",
    exportDisclaimer: "Только для справки. Не является налоговой/юридической консультацией. Проверьте у компетентного органа.",
  },
  zh: {
    title: "TIN 查询器 — FATCA/CRS", subtitle: "选择国家以查看税号的名称和格式。",
    step1: "1. 选择国家", placeholder: "搜索或选择国家", noResults: "未找到结果",
    empty: "选择国家后结果将显示在此处。",
    disclaimer: "⚠️ 仅供参考。不是税务/法律建议或官方来源 — 在用于 FATCA/CRS 之前请向主管部门核实。",
    localName: "本地标识符名称", localAuth: "当地税务机关",
    step2: "2. 选择类型", individual: "个人", entity: "公司 / 实体",
    name: "名称", format: "格式", example: "示例",
    whereTitle: (tin, country) => `在${country}哪里可以找到我的 ${tin}？点击箭头查看详情`,
    sourcesTitle: "来源与最后更新", sourcesIntro: "数据来自以下官方来源:",
    localAuthLabel: "当地税务机关", oecdLabel: "OECD — TIN 门户(CRS)",
    euLabel: "欧盟委员会 — TIN on Europa", lastUpdatedLabel: "最后更新",
    copy: "复制到剪贴板", download: "下载为文本", pdf: "导出 PDF(打印)", previewPdf: "下载 PDF 以验证", sendGmail: "通过 Gmail 发送",
    copied: "结果已复制", copyErr: "无法复制 — 请手动选择",
    downloaded: "文件已下载", dlErr: "下载错误",
    pdfOpened: "打印对话框已打开 — 选择'另存为 PDF'", pdfErr: "PDF 导出错误", gmailOpened: "已打开 Gmail 并填入结果 — 如需附上 PDF 请手动附加",
    legal: "法律声明",
    legalText: "本网站并非官方机构，不隶属于经合组织(OECD)、美国国税局(IRS)或任何税务机关，也不构成税务建议、法律建议或专业意见。信息仅以\"现状\"提供，仅供参考，可能不完整或过时，且不应依赖其进行FATCA/CRS申报或任何其他决策。请向相关国家的主管部门核实每个细节，并咨询合格的专业人士。使用本网站的风险由用户自行承担。",
    sourcesFooter: "主要来源：",
    languageLabel: "语言",
    exportCountry: "国家", exportNote: "备注",
    exportWhere: (tin) => `在哪里可以找到您的 ${tin}：`,
    exportSources: "来源：",
    exportDisclaimer: "仅供参考。不是税务/法律建议。请向主管部门核实。",
  },
};

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-inherit rounded-sm px-0.5 font-semibold">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function buildExportText(country: CountryTin, lang: Lang, t: Strings): string {
  const cName = lang === "he" ? country.nameHe : country.nameEn;
  const cNameAlt = lang === "he" ? country.nameEn : "";
  const cTin = lang === "he" ? country.tinNameHe : country.tinNameEn;
  const cTinAlt = lang === "he" ? country.tinNameEn : "";
  const sep = "────────────────────────────────────────";
  const lines: string[] = [];
  lines.push(t.title);
  lines.push(sep);
  lines.push(`${t.exportCountry}: ${country.flag}  ${cName}${cNameAlt ? `  (${cNameAlt})` : ""}`);
  lines.push(`${t.localName}: ${cTin}${cTinAlt ? `  /  ${cTinAlt}` : ""}`);
  lines.push("");
  lines.push(`▌ ${t.individual}`);
  lines.push(`  • ${t.name}:    ${tr(country.individual.name, lang)}`);
  lines.push(`  • ${t.format}:  ${tr(country.individual.format, lang)}`);
  lines.push(`  • ${t.example}: ${country.individual.example}`);
  if (country.individual.note) lines.push(`  • ${t.exportNote}: ${tr(country.individual.note, lang)}`);
  lines.push("");
  lines.push(`▌ ${t.entity}`);
  lines.push(`  • ${t.name}:    ${tr(country.entity.name, lang)}`);
  lines.push(`  • ${t.format}:  ${tr(country.entity.format, lang)}`);
  lines.push(`  • ${t.example}: ${country.entity.example}`);
  if (country.entity.note) lines.push(`  • ${t.exportNote}: ${tr(country.entity.note, lang)}`);
  lines.push("");
  lines.push(`▌ ${t.exportWhere(cTin)}`);
  country.whereToFind.forEach((w) => {
    const label = tr(w.label, lang);
    lines.push(`  • ${label}${w.url ? `\n      → ${w.url}` : ""}`);
  });
  lines.push("");
  lines.push(`▌ ${t.exportSources}`);
  lines.push(`  • ${t.localAuthLabel}: ${country.officialSource}`);
  if (country.oecdSource) lines.push(`  • ${t.oecdLabel}: ${country.oecdSource}`);
  if (country.euTinSource) lines.push(`  • ${t.euLabel}: ${country.euTinSource}`);
  lines.push(`  • ${t.lastUpdatedLabel}: ${getLastUpdated(country)}`);
  lines.push("");
  lines.push(sep);
  lines.push(t.exportDisclaimer);
  return lines.join("\n");
}

function downloadTxt(country: CountryTin, lang: Lang, t: Strings) {
  try {
    const text = buildExportText(country, lang, t);
    const blob = new Blob(["\uFEFF" + text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TIN-${country.code}-${lang}.txt`;
    a.rel = "noopener";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 1000);
    toast.success(t.downloaded);
  } catch (e) {
    console.error(e);
    toast.error(t.dlErr);
  }
}

async function copyToClipboard(country: CountryTin, lang: Lang, t: Strings) {
  const text = buildExportText(country, lang, t);
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast.success(t.copied);
  } catch (e) {
    console.error(e);
    toast.error(t.copyErr);
  }
}

function buildExportHtml(country: CountryTin, lang: Lang, t: Strings) {
  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";
  const cName = lang === "he" ? country.nameHe : country.nameEn;
  const cNameAlt = lang === "he" ? country.nameEn : "";
  const cTin = lang === "he" ? country.tinNameHe : country.tinNameEn;
  const cTinAlt = lang === "he" ? country.tinNameEn : "";
  const esc = (s: string) =>
    String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const link = (url?: string, label?: string) =>
    url ? `<a href="${esc(url)}" target="_blank" rel="noreferrer noopener">${esc(label ?? url)}</a>` : esc(label ?? "");

  const block = (title: string, entry: CountryTin["individual"]) => `
    <section class="card">
      <h2>${esc(title)}</h2>
      <dl>
        <dt>${esc(t.name)}</dt><dd>${esc(tr(entry.name, lang))}</dd>
        <dt>${esc(t.format)}</dt><dd>${esc(tr(entry.format, lang))}</dd>
        <dt>${esc(t.example)}</dt><dd><code>${esc(entry.example)}</code></dd>
        ${entry.note ? `<dt>${esc(t.exportNote)}</dt><dd class="note">${esc(tr(entry.note, lang))}</dd>` : ""}
      </dl>
    </section>`;

  const whereItems = country.whereToFind.map((w) => {
    const label = esc(tr(w.label, lang));
    return `<li>${w.url ? `<a href="${esc(w.url)}" target="_blank" rel="noreferrer noopener">${label}</a>` : label}</li>`;
  }).join("");

  const sources: string[] = [];
  sources.push(`<li><strong>${esc(t.localAuthLabel)}:</strong> ${link(country.officialSource)}</li>`);
  if (country.oecdSource) sources.push(`<li><strong>${esc(t.oecdLabel)}:</strong> ${link(country.oecdSource)}</li>`);
  if (country.euTinSource) sources.push(`<li><strong>${esc(t.euLabel)}:</strong> ${link(country.euTinSource)}</li>`);

  return `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8"><title>TIN — ${esc(cName)}</title>
<style data-tin-export-style="true">
  *{box-sizing:border-box}
  body{font-family:system-ui,-apple-system,"Segoe UI",Arial,sans-serif;padding:24px;line-height:1.55;color:#111;max-width:760px;margin:0 auto;background:#fff}
  header{border-bottom:2px solid #111;padding-bottom:12px;margin-bottom:18px}
  h1{font-size:22px;margin:0 0 4px;font-weight:700}
  .sub{color:#555;font-size:13px}
  .flag{font-size:28px;vertical-align:middle;margin:0 6px}
  h2{font-size:14px;margin:0 0 8px;text-transform:uppercase;letter-spacing:.05em;color:#444}
  .card{border:1px solid #ddd;border-radius:8px;padding:14px 16px;margin:12px 0;background:#fafafa;page-break-inside:avoid}
  dl{display:grid;grid-template-columns:max-content 1fr;gap:6px 14px;margin:0}
  dt{font-weight:600;color:#555;font-size:12px;text-transform:uppercase;letter-spacing:.04em;align-self:start;padding-top:2px}
  dd{margin:0;font-size:14px}
  code{background:#eef;padding:2px 6px;border-radius:4px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px}
  .note{font-size:12px;color:#555;font-style:italic}
  ul{margin:6px 0 0;padding-${dir === "rtl" ? "right" : "left"}:20px}
  li{margin:4px 0;font-size:13px}
  a{color:#0a58ca;text-decoration:underline;word-break:break-word}
  footer{margin-top:18px;padding-top:10px;border-top:1px solid #ddd;font-size:11px;color:#666;line-height:1.5}
  .meta{display:flex;justify-content:space-between;font-size:11px;color:#666;margin-top:6px}
  @media print{ body{padding:0} a{color:#0a58ca} }
</style></head><body>
<header>
  <h1>${esc(t.title)}</h1>
  <div class="sub"><span class="flag">${esc(country.flag)}</span><strong>${esc(cName)}</strong>${cNameAlt ? ` <span style="color:#888">(${esc(cNameAlt)})</span>` : ""}</div>
  <div class="sub" style="margin-top:4px"><strong>${esc(t.localName)}:</strong> ${esc(cTin)}${cTinAlt ? ` / ${esc(cTinAlt)}` : ""}</div>
</header>

${block(t.individual, country.individual)}
${block(t.entity, country.entity)}

<section class="card">
  <h2>${esc(t.exportWhere(cTin))}</h2>
  <ul>${whereItems}</ul>
</section>

<section class="card">
  <h2>${esc(t.sourcesTitle)}</h2>
  <ul>${sources.join("")}</ul>
  <div class="meta"><span>${esc(t.lastUpdatedLabel)}</span><span>${esc(getLastUpdated(country))}</span></div>
</section>

<footer>${esc(t.exportDisclaimer)}</footer>
</body></html>`;
}

async function exportPdf(country: CountryTin, lang: Lang, t: Strings) {
  const filename = `TIN-${country.code}-${lang}.pdf`;
  try {
    const blob = await generatePdfBlob(country, lang, t);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    toast.success(t.pdfOpened);
  } catch (e) {
    console.error("PDF export failed", e);
    // Fallback: open printable HTML in a new tab
    try {
      const html = buildExportHtml(country, lang, t);
      const htmlBlob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(htmlBlob);
      const win = window.open(url, "_blank");
      if (!win) {
        toast.error(t.pdfErr);
        URL.revokeObjectURL(url);
        return;
      }
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      toast.success(t.pdfOpened);
    } catch (e2) {
      console.error(e2);
      toast.error(t.pdfErr);
    }
  }
}

async function generatePdfBlob(country: CountryTin, lang: Lang, t: Strings): Promise<Blob> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const html = buildExportHtml(country, lang, t);
  const container = document.createElement("div");
  container.innerHTML = html;
  // Strip the <html><head><body> wrapper — html2pdf works on the inner element
  const body = container.querySelector("body");
  const target = document.createElement("div");
  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";
  const width = Math.min(760, Math.max(320, window.innerWidth - 24));
  target.setAttribute("dir", dir);
  target.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    `width:${width}px`,
    "background:#fff",
    "color:#111",
    "pointer-events:none",
    "z-index:-1",
    "overflow:visible",
  ].join(";");
  target.innerHTML = body ? body.innerHTML : html;
  // Inline the styles from the generated HTML
  const styleTag = container.querySelector("style");
  if (styleTag) target.prepend(styleTag.cloneNode(true));
  document.body.appendChild(target);
  try {
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const canvas = await html2canvas(target, {
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: width,
      onclone: (doc: Document) => {
        doc.querySelectorAll('style:not([data-tin-export-style]), link[rel="stylesheet"]').forEach((el) => el.remove());
        const clonedBody = doc.body;
        if (clonedBody) {
          clonedBody.style.background = "#ffffff";
          clonedBody.style.color = "#111111";
        }
      },
    });

    if (!canvas.width || !canvas.height) {
      throw new Error("PDF canvas is empty");
    }

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;
    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    let y = margin;
    let remainingHeight = contentHeight;
    pdf.addImage(imgData, "JPEG", margin, y, contentWidth, contentHeight);
    remainingHeight -= pageHeight - margin * 2;

    while (remainingHeight > 0) {
      pdf.addPage();
      y = margin - (contentHeight - remainingHeight);
      pdf.addImage(imgData, "JPEG", margin, y, contentWidth, contentHeight);
      remainingHeight -= pageHeight - margin * 2;
    }

    const blob = pdf.output("blob");
    if (!blob.size) {
      throw new Error("PDF blob is empty");
    }
    return blob;
  } finally {
    target.remove();
  }
}

async function sendViaGmail(country: CountryTin, lang: Lang, t: Strings) {
  const cName = lang === "he" ? country.nameHe : country.nameEn;
  const subject = `${t.title} — ${country.flag} ${cName}`;
  const bodyText = buildExportText(country, lang, t);
  const filename = `TIN-${country.code}-${lang}.pdf`;

  try {
    const pdfBlob = await generatePdfBlob(country, lang, t);
    const file = new File([pdfBlob], filename, { type: "application/pdf" });

    // Mobile/PWA: use Web Share with file attachment (Gmail appears in share sheet)
    const nav = navigator as Navigator & {
      canShare?: (data: { files?: File[] }) => boolean;
      share?: (data: { files?: File[]; title?: string; text?: string }) => Promise<void>;
    };
    if (nav.canShare && nav.share && nav.canShare({ files: [file] })) {
      try {
        await nav.share({ files: [file], title: subject, text: bodyText });
        toast.success(t.gmailOpened);
        return;
      } catch (err: unknown) {
        // User canceled — don't fall through
        if (err && typeof err === "object" && "name" in err && (err as { name: string }).name === "AbortError") return;
        console.warn("share failed, falling back", err);
      }
    }

    // Desktop fallback: download the PDF + open Gmail compose with body
    const dlUrl = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = dlUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(dlUrl), 30000);

    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&su=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(bodyText);
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    toast.success(t.gmailOpened);
  } catch (e) {
    console.error(e);
    toast.error(t.pdfErr);
  }
}

export const Route = createFileRoute("/")({
  head: () => {
    const url = "https://www.tinfinder.info/";
    const title = "מאתר TIN לצורכי FATCA/CRS — חיפוש מספר זיהוי מס לפי מדינה";
    const description = "כלי חינמי לאיתור שם ומבנה מספר זיהוי המס (TIN) בכל מדינה — ליחיד ולחברה, כולל היכן ניתן למצוא אותו, לצורכי דיווח FATCA ו-CRS.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: "TIN, FATCA, CRS, מספר זיהוי מס, Tax Identification Number, דיווח מס בינלאומי" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [
        { rel: "canonical", href: url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "מאתר TIN — FATCA/CRS",
            url,
            inLanguage: "he",
            applicationCategory: "FinanceApplication",
            description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  const [code, setCode] = useState<string>("");
  const [lang, setLang] = useState<Lang>("he");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!open) setSearchQuery("");
  }, [open]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tin_lang");
      if (saved && LANGUAGES.some((l) => l.code === saved)) setLang(saved as Lang);
    } catch {}
  }, []);
  const t = T[lang];
  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";
  const popoverRef = useOverflowCheck<HTMLDivElement>({
    label: "country-popover",
    when: open,
    dir,
  });
  const changeLang = (next: Lang) => {
    setLang(next);
    try { localStorage.setItem("tin_lang", next); } catch {}
    trackEvent("lang_toggle", { lang: next });
  };
  const country: CountryTin | undefined = COUNTRIES.find((c) => c.code === code);
  const cName = (c: CountryTin) => (lang === "he" ? c.nameHe : c.nameEn);
  const cTin = (c: CountryTin) => (lang === "he" ? c.tinNameHe : c.tinNameEn);

  const handleCountryChange = (value: string) => {
    setCode(value);
    const selected = COUNTRIES.find((c) => c.code === value);
    trackEvent("country_select", {
      country_code: value,
      country_name: selected?.nameEn ?? value,
    });
  };

  const handleResultClick = (
    linkType: "official" | "oecd" | "eu_tin" | "where_to_find",
    label: string,
    url: string
  ) => {
    trackEvent("result_click", {
      link_type: linkType,
      country_code: country?.code ?? "",
      label,
      url,
    });
  };

  // Sort countries alphabetically by active language
  const sortLocale = lang === "he" ? "he" : lang === "zh" ? "zh" : lang === "ru" ? "ru" : "en";
  const sorted = [...COUNTRIES].sort((a, b) =>
    lang === "he" ? a.nameHe.localeCompare(b.nameHe, "he") : a.nameEn.localeCompare(b.nameEn, sortLocale)
  );

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-2xl px-5 py-5 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight">{t.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <InstallButton />
            <div className="flex items-center gap-1.5">
              <Languages className="h-4 w-4 text-muted-foreground" aria-label={t.languageLabel} />
              <Select value={lang} onValueChange={(v) => changeLang(v as Lang)}>
                <SelectTrigger className="h-9 w-auto min-w-[110px] text-sm" aria-label={t.languageLabel}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>{l.native}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6 space-y-6">
        {/* Step 1: Country picker */}
        <section className="space-y-2">
          <label htmlFor="country" className="block text-sm font-semibold">
            {t.step1}
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="country"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="h-12 w-full justify-between text-base"
              >
                {code ? (
                  <span className="flex items-center truncate">
                    <span className={cn("inline-block", dir === "rtl" ? "ml-2" : "mr-2")}>
                      {country?.flag ?? COUNTRIES.find((c) => c.code === code)?.flag}
                    </span>
                    <span className="truncate">
                      {country ? cName(country) : COUNTRIES.find((c) => c.code === code)?.nameEn}
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">{t.placeholder}</span>
                )}
                <ChevronsUpDown className={cn("h-4 w-4 shrink-0 opacity-50", dir === "rtl" ? "mr-2" : "ml-2")} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              ref={popoverRef}
              dir={dir}
              className="w-[min(var(--radix-popover-trigger-width),calc(100vw-16px))] max-w-[calc(100vw-16px)] max-h-[min(calc(100dvh-24px),var(--radix-popper-available-height))] overflow-hidden p-0"
              align={dir === "rtl" ? "end" : "start"}
              side="bottom"
              sideOffset={4}
              collisionPadding={8}
            >
              <Command dir={dir} className="w-full overflow-hidden">
                <CommandInput
                  placeholder={t.placeholder}
                  className={cn("h-10 text-base", dir === "rtl" ? "text-right" : "text-left")}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList className="w-full max-h-[calc(min(calc(100dvh-24px),var(--radix-popper-available-height))-48px)]">
                  <CommandEmpty>{t.noResults}</CommandEmpty>
                  <CommandGroup>
                    {sorted.map((c) => (
                      <CommandItem
                        key={c.code}
                        value={`${cName(c)} ${c.nameEn} ${c.code}`}
                        onSelect={() => {
                          handleCountryChange(c.code);
                          setOpen(false);
                        }}
                        className={cn(
                          "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-2 text-base",
                          dir === "rtl" ? "text-right" : "text-left"
                        )}
                      >
                        <span className={cn("inline-block pt-0.5", dir === "rtl" ? "order-3" : "order-1")}>{c.flag}</span>
                        <span className={cn("min-w-0", dir === "rtl" ? "order-2 text-right" : "order-2")}>
                          <span className="block truncate">
                            {highlightMatch(cName(c), searchQuery)}
                          </span>
                          {lang === "he" && (
                            <span dir="ltr" className="mt-0.5 block w-full truncate text-right text-xs text-muted-foreground">
                              {highlightMatch(c.nameEn, searchQuery)}
                            </span>
                          )}
                        </span>
                        <Check
                          className={cn(
                            "h-4 w-4 shrink-0 pt-0.5",
                            dir === "rtl" ? "order-1" : "order-3",
                            code === c.code ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </section>

        {!country && (
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            {t.empty}
          </div>
        )}

        {country && (
          <>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground">
              {t.disclaimer}
            </div>


            {/* Step 2: TIN name + source */}
            <section className="rounded-xl border border-border bg-card p-5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none">{country.flag}</span>
                <div>
                  <p className="text-xs text-muted-foreground">{t.localName}</p>
                  <h2 className="text-lg font-bold leading-tight">{cTin(country)}</h2>
                  <p className="text-xs text-muted-foreground">{lang === "he" ? country.tinNameEn : country.tinNameHe}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-medium">
                <a
                  href={country.officialSource}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => handleResultClick("official", t.localAuth, country.officialSource)}
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {t.localAuth}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {country.oecdSource && (
                  <a
                    href={country.oecdSource}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => handleResultClick("oecd", "OECD TIN", country.oecdSource!)}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    OECD TIN
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {country.euTinSource && (
                  <a
                    href={country.euTinSource}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => handleResultClick("eu_tin", "EU TIN", country.euTinSource!)}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    EU TIN
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </section>

            {/* Step 3: Individual / Entity toggle */}
            <section className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-sm font-semibold">{t.step2}</h3>
              <Tabs defaultValue="individual">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="individual" className="gap-1.5">
                    <User className="h-4 w-4" />
                    {t.individual}
                  </TabsTrigger>
                  <TabsTrigger value="entity" className="gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {t.entity}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="individual">
                  <TinBlock entry={country.individual} t={t} lang={lang} />
                </TabsContent>
                <TabsContent value="entity">
                  <TinBlock entry={country.entity} t={t} lang={lang} />
                </TabsContent>
              </Tabs>
            </section>

            {/* Step 4: Where to find — collapsible */}
            <section className="animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Accordion type="single" collapsible>
                <AccordionItem
                  value="where"
                  className="rounded-xl border border-border bg-card px-4"
                >
                  <AccordionTrigger className={`text-base font-semibold hover:no-underline ${dir === "rtl" ? "text-right" : "text-left"}`}>
                    <span className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      {t.whereTitle(cTin(country), cName(country))}
                    </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pb-2">
                      {country.whereToFind.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          {w.url ? (
                            <a
                              href={w.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              onClick={() => handleResultClick("where_to_find", w.label, w.url!)}
                              className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                              {tr(w.label, lang)}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span>{tr(w.label, lang)}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Step 5: Sources & last updated */}
            <section className="rounded-xl border border-border bg-card p-5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <div className="flex items-start gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="space-y-1">
                  <h3 className="text-base font-semibold leading-tight">{t.sourcesTitle}</h3>
                  <p className="text-xs text-muted-foreground">{t.sourcesIntro}</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground shrink-0">•</span>
                  <a
                    href={country.officialSource}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => handleResultClick("official", t.localAuthLabel, country.officialSource)}
                    className="inline-flex items-center gap-1 text-primary hover:underline break-all"
                  >
                    {t.localAuthLabel}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </li>
                {country.oecdSource && (
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground shrink-0">•</span>
                    <a
                      href={country.oecdSource}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => handleResultClick("oecd", t.oecdLabel, country.oecdSource!)}
                      className="inline-flex items-center gap-1 text-primary hover:underline break-all"
                    >
                      {t.oecdLabel}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </li>
                )}
                {country.euTinSource && (
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground shrink-0">•</span>
                    <a
                      href={country.euTinSource}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => handleResultClick("eu_tin", t.euLabel, country.euTinSource!)}
                      className="inline-flex items-center gap-1 text-primary hover:underline break-all"
                    >
                      {t.euLabel}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </li>
                )}
              </ul>
              <div className="pt-2 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
                <span>{t.lastUpdatedLabel}</span>
                <time dateTime={getLastUpdated(country)} className="font-mono font-medium text-foreground">
                  {getLastUpdated(country)}
                </time>
              </div>
            </section>


            {/* Export buttons */}
            <section className="flex flex-wrap gap-2 animate-in fade-in duration-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  trackEvent("export", { format: "copy", country_code: country.code });
                  copyToClipboard(country, lang, t);
                }}
                className="gap-1.5"
              >
                <Copy className="h-4 w-4" />
                {t.copy}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  trackEvent("export", { format: "txt", country_code: country.code });
                  downloadTxt(country, lang, t);
                }}
                className="gap-1.5"
              >
                <Download className="h-4 w-4" />
                {t.download}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  trackEvent("export", { format: "pdf", country_code: country.code });
                  exportPdf(country, lang, t);
                }}
                className="gap-1.5"
              >
                <Printer className="h-4 w-4" />
                {t.pdf}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  trackEvent("export", { format: "pdf_preview", country_code: country.code });
                  try {
                    const blob = await generatePdfBlob(country, lang, t);
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `TIN-${country.code}-${lang}-preview.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    setTimeout(() => URL.revokeObjectURL(url), 30000);
                    toast.success(t.downloaded);
                  } catch (e) {
                    console.error("PDF preview download failed", e);
                    toast.error(t.pdfErr);
                  }
                }}
                className="gap-1.5"
              >
                <FileCheck className="h-4 w-4" />
                {t.previewPdf}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  trackEvent("export", { format: "gmail", country_code: country.code });
                  sendViaGmail(country, lang, t);
                }}
                className="gap-1.5"
              >
                <Mail className="h-4 w-4" />
                {t.sendGmail}
              </Button>
            </section>
          </>
        )}

        <footer className="pt-4 pb-8 space-y-2 text-center text-xs text-muted-foreground">
          <p className="font-semibold text-foreground/80">
            {t.legal}
          </p>
          <p>
            {t.legalText}
          </p>
          <p>
            <Link to="/faq" className="text-primary hover:underline">
              שאלות נפוצות
            </Link>
            {" · "}
            {t.sourcesFooter}{" "}
            <a
              href="https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:underline"
            >
              OECD AEOI Portal
            </a>
            {" · "}
            <a
              href="https://ec.europa.eu/taxation_customs/tin/tinByCountry.html"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:underline"
            >
              EU TIN On-the-Web
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

function TinBlock({ entry, t, lang }: { entry: CountryTin["individual"]; t: (typeof T)[Lang]; lang: Lang }) {
  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";
  return (
    <div className="mt-2 space-y-3 rounded-xl border border-border bg-card p-5">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{t.name}</p>
        <p className="font-semibold">{tr(entry.name, lang)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{t.format}</p>
        <p dir={dir} className="text-sm">{tr(entry.format, lang)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{t.example}</p>
        <code dir="ltr" className="mt-1 inline-block rounded-md bg-muted px-2.5 py-1.5 font-mono text-sm">
          {entry.example}
        </code>
      </div>
      {entry.note && (
        <p className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
          {tr(entry.note, lang)}
        </p>
      )}
    </div>
  );
}
