import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Detect iOS (no beforeinstallprompt support)
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Mac") && "ontouchend" in document);
    setIsIOS(ios);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Listen for appinstalled
    const installedHandler = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      toast.success("האפליקציה הותקנה בהצלחה!", { duration: 3000 });
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  if (isInstalled) return null;

  const handleInstall = async () => {
    if (isIOS) {
      // iOS: show instructions
      toast.info(
        'לחץ על כפתור "שתף" (Share) בסafari ובחר "הוסף למסך הבית" (Add to Home Screen)',
        { duration: 6000 }
      );
      return;
    }

    if (!deferredPrompt) {
      toast.info("התקנה זמינה בדפדפנים נתמכים (Chrome, Edge, Samsung Internet)");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      toast.success("האפליקציה הותקנה בהצלחה!");
    }
    setDeferredPrompt(null);
  };

  // Only show if we have a deferred prompt OR we're on iOS
  if (!deferredPrompt && !isIOS) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleInstall}
      className="gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500"
      aria-label="התקן אפליקציה"
    >
      <Download className="h-4 w-4" />
      {isIOS ? "הוסף למסך הבית" : "התקן אפליקציה"}
    </Button>
  );
}
