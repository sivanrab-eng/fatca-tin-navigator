# אתר חיפוש TIN לצורכי FATCA/CRS

## מה נבנה

אתר חד-עמודי שבו המשתמש בוחר מדינה מרשימה של 100+ מדינות OECD, ומקבל בפלט מפורט:
- שם המזהה המקומי (TIN equivalent)
- מבנה הפורמט ליחיד (Individual) — אורך, אותיות/ספרות, דוגמה
- מבנה הפורמט לישות/חברה (Entity)
- היכן למצוא את המספר (מסמכים, אזורים אישיים ברשויות המס)
- קישור למקור OECD הרשמי

## מבנה האפליקציה

### Routes
- `/` — מסך הבית: חיפוש מדינה + תוצאה
- `/about` — הסבר קצר על FATCA/CRS ומה זה TIN
- `/country/$code` — דף תוצאה ייעודי (shareable, SEO-friendly) לכל מדינה

### רכיבים מרכזיים
- `CountrySearch` — Combobox עם חיפוש (שם המדינה בעברית/אנגלית + ISO code), עם דגלי אמוג'י
- `TinResultCard` — כרטיס תוצאה עם 4 בלוקים:
  1. שם המזהה ושפה מקומית
  2. מבנה ליחיד (Individual) — formatted, עם דוגמה
  3. מבנה לישות (Entity) — formatted, עם דוגמה
  4. איפה למצוא — רשימת מקורות (תלוש שכר, אזור אישי, מסמכי רשם וכו')
- `LanguageToggle` — מתג עברית/אנגלית (RTL/LTR אוטומטי)

## מקור הנתונים

קובץ סטטי `src/data/tin-countries.ts` עם טיפוס מובנה:

```ts
type CountryTin = {
  code: string;            // ISO 3166-1 alpha-2
  nameEn: string;
  nameHe: string;
  flag: string;            // emoji
  tinName: { en: string; he: string };   // "UTR / NINO", "SSN / ITIN / EIN"
  individual: {
    format: string;        // "10 digits" / "QQ123456C"
    example: string;
    regex?: string;
    notes: { en: string; he: string };
  };
  entity: {
    format: string;
    example: string;
    regex?: string;
    notes: { en: string; he: string };
  };
  whereToFind: { en: string[]; he: string[] };  // bullet list
  officialSourceUrl: string;  // OECD CRS portal לפי מדינה
};
```

הנתונים יילקחו ממאגר ה-OECD AEOI TIN portal הציבורי + רשויות מקומיות. ל-100+ מדינות אקבץ את הנתונים בהדרגה — מתחילים עם 30 הכי נפוצות באיכות מלאה, השאר עם שדות בסיס + לינק למקור OECD.

## שפה ולוקליזציה
- ברירת מחדל: עברית, RTL
- מתג לאנגלית, LTR
- `lang` ו-`dir` ב-`<html>` מתעדכנים דינמית
- כל הטקסטים ב-`src/i18n/strings.ts`

## עיצוב

לאחר אישור התוכנית, אייצר 3 כיווני עיצוב מרונדרים (שאלת `prototype`) ותבחר אחד. ה-3 ישתפו פלטה/טיפוגרפיה אך ייבדלו בקומפוזיציה (לדוגמה: dense reference-tool / clean consumer search / official-document feel).

## פרטים טכניים

- TanStack Start, file-based routing (`src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/country.$code.tsx`)
- `head()` ייחודי לכל route + לכל מדינה (SEO: "TIN format for United Kingdom — FATCA")
- shadcn `Command` לחיפוש המדינה
- ללא backend — הכל סטטי
- Disclaimer ברור: "המידע להתמצאות בלבד, לא תחליף לייעוץ רשמי"

## מחוץ לסקופ (גרסה ראשונה)
- שליפה חיה מ-OECD
- ולידציה בפועל של TIN שהוזן (אפשר להוסיף בעתיד עם regex)
- חשבון משתמש / שמירה
