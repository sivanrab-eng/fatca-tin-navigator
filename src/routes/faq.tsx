import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ArrowRight, Download } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "שאלות נפוצות — מאתר TIN" },
      { name: "description", content: "תשובות לשאלות נפוצות על TIN, FATCA, CRS ואיך להשתמש במאתר." },
      { property: "og:title", content: "שאלות נפוצות — מאתר TIN" },
      { property: "og:description", content: "תשובות לשאלות נפוצות על TIN, FATCA, CRS ואיך להשתמש במאתר." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    question: "מה זה TIN ולמה הוא חשוב?",
    answer: `TIN — Tax Identification Number — הוא מספר זיהוי מס שמקצה כל מדינה לתושביה ולחברות הפועלות בה. בניגוד למה שחושבים, זה לא תמיד נקרא "TIN": בארה"ב זה SSN או ITIN, בבריטניה UTR או NINO, בישראל מספר תעודת זהות, בגרמניה Steueridentifikationsnummer, וכן הלאה.

החשיבות שלו נובעת משני דיני דיווח בינלאומיים — FATCA (Foreign Account Tax Compliance Act) של ארה"ב ו-CRS (Common Reporting Standard) של ה-OECD — שמחייבים גופים פיננסיים (בנקים, חברות ביטוח, קרנות נאמנות וכו') לדווח על חשבונות של לקוחות זרים למדינת המס של הלקוח. ללא TIN נכון, הדיווח עלול להיות חסר או שגוי, מה שעלול לעורר חקירה או קנסות.`,
  },
  {
    question: "איך בוחרים מדינה במאתר?",
    answer: `בדף הבית יש תיבת חיפוש עם רשימה נפתחת של למעלה מ-100 מדינות. אפשר לבחור מדינה בדרכים הבאות:

1. הקלדה — התחילו להקליד את שם המדינה בעברית או באנגלית, והרשימה תתקצר אוטומטית.
2. גלילה — פתחו את הרשימה וגללו עד למדינה הרצויה.
3. דגל — לכל מדינה מוצג דגל (emoji) לצד השם, כדי לזהות במהירות.

לאחר הבחירה, הכרטיסייה המרכזית תתמלא אוטומטית בכל המידע הרלוונטי: שם המזהה המקומי, מבנה המספר, דוגמאות והיכן ניתן למצוא אותו.`,
  },
  {
    question: "מה המשמעות של 'יחיד' לעומת 'חברה / ישות'?",
    answer: `כל מדינה משתמשת במערכות מס שונות לאנשים פרטיים ולגופים משפטיים (חברות, שותפויות, קרנות, אגודות שיתופיות וכו'):

• יחיד (Individual) — מתייחס לאדם פרטי. המזהה ניתן בדרך כלל בעת הלידה או בהגשת מסמכי הגירה. לדוגמה: מספר תעודת זהות בישראל, Social Security Number בארה"ב, מספר ביטוח לאומי במדינות רבות באירופה.

• חברה / ישות (Entity) — מתייחס לגוף משפטי. המזהה ניתן בעת רישום החברה או הקמת הישות. לדוגמה: מספר חברה (Company Number) באנגליה, SIREN בצרפת, Handelsregisternummer בגרמניה.

חשוב לבחור את הסוג הנכון כי הפורמט והמקורות שבהם מוצאים את המספר שונים לחלוטין.`,
  },
  {
    question: "איפה בדרך כלל מוצאים את ה-TIN?",
    answer: `המקור תלוי במדינה ובסוג הישות, אך כללית ניתן למצוא את המספר במקומות הבאים:

• תלוש שכר — כמעט תמיד מופיע במקום בולט.
• אזור אישי באתר רשות המס — לאחר התחברות עם שם משתמש וסיסמה.
• מסמכי הגשת דוח שנתי — כל דוח שנתי למס הכנסה כולל את המספר.
• מכתבי רשות המס — מכתבי אישור, חיווי או תזכורת.
• דרכון / תעודת זהות — במדינות רבות מספר ה-TIN זהה למספר תעודת הזהות או לדרכון.
• מסמכי רישום של חברה — תעודת רישום, פרוטוקולים, מסמכי התאגדות.
• חשבוניות רשמיות — במדינות מסוימות חובה להציג את מספר ה-TIN בחשבונית.

אם אינכם מוצאים את המספר, צרו קשר ישירות עם רשות המס המקומית.`,
  },
  {
    question: "האם המידע באתר מעודכן ומהימן?",
    answer: `המידע נאסף ממקורות רשמיים — בעיקר מפורטל ה-OECD ל-TIN (CRS) ומאתר TIN on Europa של הנציבות האירופית — ועובד בדקדקנות. עם זאת, חוקי מס והנהלים משתנים, ולכן המידע מוצג כהתמצאות בלבד ואינו מהווה ייעוץ מס או משפטי.

אנו ממליצים תמיד:
• לאמת כל פרט מול רשות המס המקומית.
• לבדוק את התאריך "עודכן לאחרונה" שמופיע בכל כרטיס תוצאה.
• להתייעץ עם רואה חשבון או עורך דין מוסמך לפני הגשת דוח FATCA/CRS רשמי.`,
  },
  {
    question: "איך מייצאים את התוצאות?",
    answer: `לאחר בחירת מדינה, שלושה כפתורי ייצוא מופיעים מתחת לכרטיסיית התוצאה:

1. העתק ללוח — מעתיק את כל הטקסט ללוח, כדי להדביק במייל או במסמך.
2. הורד כקובץ טקסט — יוצר קובץ .txt בעברית, הכולל את כל הפרטים בפורמט מסודר.
3. ייצא ל-PDF — פותח את תיבת ההדפסה של הדפדפן, שם ניתן לבחור "שמור כ-PDF".

הייצוא כולל את שם המדינה, המזהה המקומי, הפורמט, הדוגמאות, הערות והמקורות הרשמיים.`,
  },
  {
    question: "מה ההבדל בין FATCA ל-CRS?",
    answer: `שניהם הם מערכות דיווח בינלאומיות על חשבונות פיננסיים, אבל הן נבדלות בהיקף ובמטרה:

• FATCA (Foreign Account Tax Compliance Act) — חוק אמריקאי מ-2010 שמחייב גופים פיננסיים ברחבי העולם לדווח ל-IRS על חשבונות של אזרחים אמריקאים ותושבי ארה"ב לצמיתות (US persons). המטרה: למנוע הסתרת הכנסות מחוץ לארה"ב.

• CRS (Common Reporting Standard) — תקן בינלאומי שפותח על ידי ה-OECD (מ-2014) ומאומץ על ידי למעלה מ-100 מדינות. הוא דומה ל-FATCA מבחינת המכניזם (דיווח אוטומטי על חשבונות של תושבי מדינות אחרות), אבל הוא רב-צדדי — כל מדינה חברה מחליפה מידע עם כל המדינות האחרות החברות.

המאתר מסייע לשני הדינים כיוון ששניהם דורשים TIN נכון לכל מדינה מדווחת.`,
  },
  {
    question: "האם האתר שומר מידע אישי?",
    answer: `לא. האתר אינו כולל מערכת חשבונות, אינו שומר נתונים על המשתמשים ואינו שולח מידע אישי לשום שרת. כל הנתונים הם סטטיים (קובץ TypeScript מקומי) והחיפוש מתבצע אצל הלקוח בלבד — לא נשלחת שאילתה לאף שרת חיצוני.

האתר משתמש ב-Google Analytics באופן אנונימי (ללא IP) לצורך סטטיסטיקה כללית בלבד, ואינו משתמש בעוגיות זיהוי אישי. המשתמש יכול להוריד את האתר כאפליקציה (PWA) למכשיר הנייד — גם אז, כל המידע נשמר מקומית.`,
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">שאלות נפוצות</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          תשובות לשאלות הנפוצות ביותר על TIN, FATCA, CRS ואיך להשתמש במאתר.
        </p>

        <Accordion type="multiple" className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-card px-4"
            >
              <AccordionTrigger className="text-right text-sm font-semibold hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground whitespace-pre-wrap pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="pt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            חזרה לדף הבית
          </Link>
        </div>
      </main>
    </div>
  );
}
