import { Navigation } from "../../widgets/navigation/ui/navigation"
import { Background } from "../../components/Background/Background";
import { Hero } from "../../components/Hero/Hero";

export const HomePage = () => {
  return (
    <div className="home">
      <Navigation />
      <Background />
      <Hero />
    </div>
  );
};

