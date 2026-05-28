import Orange1 from "../../assets/Orange1.webp";
import Purple1 from "../../assets/Purple1.webp";
import faqBackOrange from "../../assets/faqBackOrange.webp";
import faqBackPurple from "../../assets/faqBackPurple.webp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "../../../features/hero";
import { scheduleIdleTask } from "../../lib/scheduleIdleTask";
import "./Background.scss";

export const Background = () => {
  const currentSection = useSelector(selectors.selectCurrentSection);
  const isFaqSection = currentSection === 6;
  const isFooterSection = currentSection === 7;
  const [isBaseBackgroundReady, setIsBaseBackgroundReady] = useState(false);
  const [isFaqBackgroundReady, setIsFaqBackgroundReady] = useState(false);

  useEffect(() => {
    return scheduleIdleTask(() => {
      setIsBaseBackgroundReady(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (isFaqSection) {
      setIsFaqBackgroundReady(true);
    }
  }, [isFaqSection]);

  if (isFooterSection) {
    return null;
  }

  const shouldShowFaqBackground = isFaqSection && isFaqBackgroundReady;
  const leftBackground = shouldShowFaqBackground ? faqBackOrange : isBaseBackgroundReady ? Orange1 : null;
  const rightBackground = shouldShowFaqBackground ? faqBackPurple : isBaseBackgroundReady ? Purple1 : null;

  if (!leftBackground || !rightBackground) {
    return null;
  }

  return (
    <>
      <img
        className={`bg bg--left ${shouldShowFaqBackground ? "bg--faq-left" : ""}`}
        src={leftBackground}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
      <img
        className={`bg bg--right ${shouldShowFaqBackground ? "bg--faq-right" : ""}`}
        src={rightBackground}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
    </>
  );
};
