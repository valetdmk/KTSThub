import { useEffect, useRef } from "react";
import Orange1 from "../../Photos/Orange1.png";
import Purple1 from "../../Photos/Purple1.png";
import "./Background.scss";

export const Background = () => {
  const leftRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.hero_header');
      const left = leftRef.current;
      const right = rightRef.current;
      
      if (!nav) return;

      const navRect = nav.getBoundingClientRect();
      const navBottom = navRect.bottom;
      const navTop = navRect.top;

      [left, right].forEach((img) => {
        if (!img) return;
        const imgRect = img.getBoundingClientRect();
        const imgTop = imgRect.top;
        const imgBottom = imgRect.bottom;

        const isUnderNav = imgTop < navBottom && imgBottom > navTop;
        
        if (isUnderNav) {
          img.style.transform = `scale(6.3) translateX(${img === left ? '-5%' : '120px'})`;
          img.style.transition = 'transform 0.3s ease';
        } else {
          img.style.transform = img === left 
            ? 'translateX(-5%)' 
            : 'translate(120px, -120px)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <img ref={leftRef} className="bg bg--left" src={Orange1} />
      <img ref={rightRef} className="bg bg--right" src={Purple1} />
    </>
  );
};