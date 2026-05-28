import block1left from "../../assets/block1left.png";
import block2left from "../../assets/block2left.png";
import block3left from "../../assets/block3left.png";
import block4left from "../../assets/block4left.png";
import block5left from "../../assets/block5left.png";
import block1right from "../../assets/block1right.png";
import block2right from "../../assets/block2right.png";
import block3right from "../../assets/block3right.png";
import block4right from "../../assets/block4right.png";
import block5right from "../../assets/block5right.png";
import blockcentral from "../../assets/blockcentral.png";

interface ImageProps {
    className?: string;
    alt?: string;
}

export const Block1Left = ({ className, alt = "Блок 1" }: ImageProps) => (
    <img className={className} src={block1left} alt={alt} loading="lazy" />
);
export const Block2Left = ({ className, alt = "Блок 2" }: ImageProps) => (
    <img className={className} src={block2left} alt={alt} loading="lazy" />
);
export const Block3Left = ({ className, alt = "Блок 3" }: ImageProps) => (
    <img className={className} src={block3left} alt={alt} loading="lazy" />
);
export const Block4Left = ({ className, alt = "Блок 4" }: ImageProps) => (
    <img className={className} src={block4left} alt={alt} loading="lazy" />
);
export const Block5Left = ({ className, alt = "Блок 5" }: ImageProps) => (
    <img className={className} src={block5left} alt={alt} loading="lazy" />
);

export const Block1Right = ({ className, alt = "Блок 1" }: ImageProps) => (
    <img className={className} src={block5right} alt={alt} loading="lazy" />
);
export const Block2Right = ({ className, alt = "Блок 2" }: ImageProps) => (
    <img className={className} src={block4right} alt={alt} loading="lazy" />
);
export const Block3Right = ({ className, alt = "Блок 3" }: ImageProps) => (
    <img className={className} src={block3right} alt={alt} loading="lazy" />
);
export const Block4Right = ({ className, alt = "Блок 4" }: ImageProps) => (
    <img className={className} src={block2right} alt={alt} loading="lazy" />
);
export const Block5Right = ({ className, alt = "Блок 5" }: ImageProps) => (
    <img className={className} src={block1right} alt={alt} loading="lazy" />
);

export const BlockCentral = ({ className, alt = "Центральный блок" }: ImageProps) => (
    <img className={className} src={blockcentral} alt={alt} loading="lazy" />
);