import { useEffect } from "react";
import { Navigation } from "../../../widgets/navigation/ui/navigation"
import { HeroSection } from "../../../widgets/hero/ui/HeroSection";
import { scheduleIdleTask } from "../../../shared/lib/scheduleIdleTask";

export const HomePage = () => {
  useEffect(() => {
    return scheduleIdleTask(() => {
      void import("../../../pages/role-select/ui");

    }, 500);
  }, []);

  return (
    <div className="home">
      <Navigation />
      <HeroSection />
    </div>
  );
};

