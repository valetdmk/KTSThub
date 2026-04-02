import { Navigation } from "../../widgets/navigation/ui/navigation"
import { Background } from "../../components/Background/Background";
import { Hero } from "../../components/Hero/Hero";
import { SecondSection } from "../../components/Hero/Hero2";

export const HomePage = () => {
  return (
    <div className="home">
      <Navigation />
      <Background />
      <Hero />
      <SecondSection />
    </div>
  );
};

