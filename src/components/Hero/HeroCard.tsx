import "./HeroCard.scss";

interface Props {
    title: string;
    text: string;
    description: string;
    className?: string;
}

export const HeroCard = ({ title, text, description, className }: Props) => {
    return (
        <div className={`hero-card ${className}`}>
            <h3>{title}</h3>
            <p className="main">{text}</p>
            <p className="desc">{description}</p>
        </div>
    )
}