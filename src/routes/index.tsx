import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { COUNTRIES, type CountryTin } from "@/data/tin-countries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, MapPin, FileText, Building2, User } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => {
    const url = "https://tin-navigator.netlify.app/";
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
  const country: CountryTin | undefined = COUNTRIES.find((c) => c.code === code);

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

  // Sort countries Hebrew alphabetically
  const sorted = [...COUNTRIES].sort((a, b) => a.nameHe.localeCompare(b.nameHe, "he"));

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-2xl px-5 py-5">
          <h1 className="text-xl font-bold tracking-tight">מאתר TIN — FATCA/CRS</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            בחר מדינה כדי לראות את שם ומבנה מספר זיהוי המס.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6 space-y-6">
        {/* Step 1: Country picker */}
        <section className="space-y-2">
          <label htmlFor="country" className="block text-sm font-semibold">
            1. בחר מדינה
          </label>
          <Select value={code} onValueChange={handleCountryChange}>
            <SelectTrigger id="country" className="h-12 text-base">
              <SelectValue placeholder="לחץ לבחירת מדינה" />
            </SelectTrigger>
            <SelectContent className="max-h-[60vh]">
              {sorted.map((c) => (
                <SelectItem key={c.code} value={c.code} className="text-base">
                  <span className="ml-2">{c.flag}</span>
                  {c.nameHe}{" "}
                  <span className="text-muted-foreground text-xs">({c.nameEn})</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {!country && (
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            התוצאות יופיעו כאן לאחר בחירת מדינה.
          </div>
        )}

        {country && (
          <>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground">
              ⚠️ מידע להתמצאות בלבד. אינו ייעוץ מס/משפטי ואינו מקור רשמי —
              יש לאמת מול הרשות המוסמכת לפני שימוש לצרכי FATCA/CRS.
            </div>

            {/* Step 2: TIN name + source */}
            <section className="rounded-xl border border-border bg-card p-5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none">{country.flag}</span>
                <div>
                  <p className="text-xs text-muted-foreground">שם המזהה המקומי</p>
                  <h2 className="text-lg font-bold leading-tight">{country.tinNameHe}</h2>
                  <p className="text-xs text-muted-foreground">{country.tinNameEn}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-medium">
                <a
                  href={country.officialSource}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => handleResultClick("official", "רשות המס המקומית", country.officialSource)}
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  רשות המס המקומית
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
              <h3 className="text-sm font-semibold">2. בחר סוג</h3>
              <Tabs defaultValue="individual">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="individual" className="gap-1.5">
                    <User className="h-4 w-4" />
                    יחיד
                  </TabsTrigger>
                  <TabsTrigger value="entity" className="gap-1.5">
                    <Building2 className="h-4 w-4" />
                    חברה / ישות
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="individual">
                  <TinBlock entry={country.individual} />
                </TabsContent>
                <TabsContent value="entity">
                  <TinBlock entry={country.entity} />
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
                  <AccordionTrigger className="text-base font-semibold hover:no-underline text-right">
                    <span className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        איפה ניתן למצוא את ה-{country.tinNameHe} שלי ב{country.nameHe}?
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
                              {w.label}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span>{w.label}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </>
        )}

        <footer className="pt-4 pb-8 space-y-2 text-center text-xs text-muted-foreground">
          <p className="font-semibold text-foreground/80">
            הבהרה משפטית
          </p>
          <p>
            אתר זה אינו גורם רשמי, אינו מסונף ל-OECD, ל-IRS או לכל רשות מס,
            ואינו מהווה ייעוץ מס, ייעוץ משפטי או חוות דעת מקצועית. המידע מוצג
            "AS IS" למטרות התמצאות בלבד, עשוי להיות חלקי או לא מעודכן, ואין
            להסתמך עליו לצורך דיווח FATCA/CRS או כל החלטה אחרת. יש לאמת כל
            פרט מול הרשות המוסמכת במדינה הרלוונטית ולהתייעץ עם איש מקצוע
            מוסמך. השימוש באתר הוא באחריות המשתמש בלבד.
          </p>
          <p>
            מקורות עיקריים:{" "}
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

function TinBlock({ entry }: { entry: CountryTin["individual"] }) {
  return (
    <div className="mt-2 space-y-3 rounded-xl border border-border bg-card p-5">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">שם</p>
        <p className="font-semibold">{entry.name}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">מבנה</p>
        <p className="text-sm">{entry.format}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">דוגמה</p>
        <code dir="ltr" className="mt-1 inline-block rounded-md bg-muted px-2.5 py-1.5 font-mono text-sm">
          {entry.example}
        </code>
      </div>
      {entry.note && (
        <p className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
          {entry.note}
        </p>
      )}
    </div>
  );
}
