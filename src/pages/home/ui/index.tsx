import { useEffect } from "react";
import { Navigation } from "../../../widgets/navigation/ui/navigation"
import { Background } from "../../../shared/ui/Background/Background";
import { HeroSection } from "../../../widgets/hero/ui/HeroSection";
import { scheduleIdleTask } from "../../../shared/lib/scheduleIdleTask";

export const HomePage = () => {
  useEffect(() => {
    return scheduleIdleTask(() => {
      void import("../../../pages/role-select/ui");

      void Promise.all([
        import("../../../shared/assets/participantRole.png"),
        import("../../../shared/assets/partnerRole.png"),
      ]).then((assets) => {
        assets.forEach(({ default: src }) => {
          const image = new window.Image();
          image.src = src;
        });
      });
    }, 500);
  }, []);

  return (
    <div className="home">
      <Navigation />
      <Background />
      <HeroSection />
    </div>
  );
};

