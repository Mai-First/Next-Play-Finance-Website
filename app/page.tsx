import ContactSection from "@/components/ContactSection";
import CurriculumCards from "@/components/CurriculumCards";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import JoinMission from "@/components/JoinMission";
import MissionReveal from "@/components/MissionReveal";
import Nav from "@/components/Nav";
import ProblemStats from "@/components/ProblemStats";
import TeamRoster from "@/components/TeamRoster";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProblemStats />
      <CurriculumCards />
      <MissionReveal />
      <TeamRoster />
      <JoinMission />
      <FAQAccordion />
      <ContactSection />
      <Footer />
    </main>
  );
}
