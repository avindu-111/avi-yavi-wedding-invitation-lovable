import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { WeddingIntro } from "@/components/wedding/WeddingIntro";
import { Envelope } from "@/components/wedding/Envelope";
import { ThemeToggle } from "@/components/wedding/ThemeToggle";
import { Countdown, Details, Footer, Hero, Invitation, Petals, Rsvp, Venue } from "@/components/wedding/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Avindu & Yavishka · 20 January 2027" },
      { name: "description", content: "You're invited to the wedding of Avindu & Yavishka at Ruwanara Royal Majestry, Narammala on 20 January 2027." },
      { property: "og:title", content: "Avindu & Yavishka · Wedding Invitation" },
      { property: "og:description", content: "Join us on 20 January 2027 at Ruwanara Royal Majestry, Narammala. RSVP online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [stage, setStage] = useState<"envelope" | "welcome" | "invitation">("envelope");
  const finishIntro = useCallback(() => setStage("invitation"), []);
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {stage === "envelope" && <Envelope key="env" onOpen={() => setStage("welcome")} />}
        {stage === "welcome" && <WeddingIntro key="welcome" onComplete={finishIntro} />}
      </AnimatePresence>
      <ThemeToggle />
      {stage === "invitation" && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative overflow-x-hidden">
          <Petals />
          <div className="relative z-10">
            <Hero />
            <Invitation />
            <Countdown />
            <Details />
            <Venue />
            <Rsvp />
            <Footer />
          </div>
        </motion.main>
      )}
    </MotionConfig>
  );
}
