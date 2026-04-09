import Orange1 from "../../assets/Orange1.png";
import Purple1 from "../../assets/Purple1.png";
import "./Background.scss";

export const Background = () => {
  return (
    <>
      <img className="bg bg--left" src={Orange1} />
      <img className="bg bg--right" src={Purple1} />
    </>
  );
};