import Orange1 from "../../assets/Orange1.png";
import Purple1 from "../../assets/Purple1.png";
import faqBackOrange from "../../assets/faqBackOrange.png";
import faqBackPurple from "../../assets/faqBackPurple.png";
import { useSelector } from "react-redux";
import { selectors } from "../../../features/hero";
import "./Background.scss";

export const Background = () => {
  const currentSection = useSelector(selectors.selectCurrentSection);
  const isFaqSection = currentSection === 6;
  const isFooterSection = currentSection === 7;
  const leftBackground = currentSection === 6 ? faqBackOrange : Orange1;
  const rightBackground = currentSection === 6 ? faqBackPurple : Purple1;

  if (isFooterSection) {
    return null;
  }

  return (
    <>
      <img className={`bg bg--left ${isFaqSection ? "bg--faq-left" : ""}`} src={leftBackground} />
      <img className={`bg bg--right ${isFaqSection ? "bg--faq-right" : ""}`} src={rightBackground} />
    </>
  );
};
