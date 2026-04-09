import { Navigation } from "../../../widgets/navigation/ui/navigation"
import { Background } from "../../../shared/ui/Background/Background";
import { Hero } from "../../../shared/ui/Hero/Hero";

export const HomePage = () => {
  return (
    <div className="home">
      <Navigation />
      <Background />
      <Hero />
    </div>
  );
};

