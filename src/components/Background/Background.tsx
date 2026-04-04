import Orange1 from "../../Photos/Orange1.png";
import Purple1 from "../../Photos/Purple1.png";
import "./Background.scss";

export const Background = () => {
  return (
    <>
      <img className="bg bg--left" src={Orange1} />
      <img className="bg bg--right" src={Purple1} />
    </>
  );
};