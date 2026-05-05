import { Navigation } from "../../../widgets/navigation/ui/navigation"
import { Background } from "../../../shared/ui/Background/Background";
import { HeroSection } from "../../../widgets/hero/ui/HeroSection";

export const HomePage = () => {
  return (
    <div className="home">
      <Navigation />
      <Background />
      <HeroSection />
    </div>
  );
};

