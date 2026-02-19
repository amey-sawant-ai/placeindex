import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TickerSection from "@/components/TickerSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SignalsSection from "@/components/SignalsSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <TickerSection />
      <ProblemSection />
      <HowItWorksSection />
      <SignalsSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}