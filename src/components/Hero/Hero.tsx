import "./Hero.scss"
import { HeroCard } from "./HeroCard";
import blockcentral from "../../Photos/blockcentral.png"
import block1left from "../../Photos/block1left.png"
import block2left from "../../Photos/block2left.png"
import block3left from "../../Photos/block3left.png"
import block4left from "../../Photos/block4left.png"
import block5left from "../../Photos/block5left.png"
import block1right from "../../Photos/block1right.png"
import block2right from "../../Photos/block2right.png"
import block3right from "../../Photos/block3right.png"
import block4right from "../../Photos/block4right.png"
import block5right from "../../Photos/block5right.png"
import Girl from "../../Photos/Girl.png"
import Boy from "../../Photos/Boy.png"
import card from "../../Photos/card.png"
import down from "../../Photos/down.png"
import numbers from "../../Photos/numbers.png"
import logo from "../../Photos/logo.png"
import Hack from "../../Photos/HacK.png"
import KCT from "../../Photos/KCT.png"


const leftBlocks = [block1left, block2left, block3left, block4left, block5left];
const rightBlocks = [block5right, block4right, block3right, block2right, block1right];

export const Hero = () => {
    return (
        <section className="hero">
            <img  className="hero_logo" src={logo} />
            <img className="hero_numbers" src={numbers} />

            <div className="hero_content">

                <div className="hero_center">
                        <img className="kct" src={KCT} />
                        <img className="hack" src={Hack} />

                    <p className="text-bottom-left">
                        Вы переходите в мир нового уровня погружения в ИТ-сферу разработки
                    </p>

                    <p className="text-top-right">
                        Вы переходите не просто в платформу,
                    </p>
                </div>

                <button className="hero_button">
                    Войти в мир хакатонов
                </button>

                <div className="hero_cards">
                    <img className="card card-left" src={card} />
                    <img className="card card-center" src={card} />
                    <img className="card card-right" src={card} />
                    <button className="cards_button">
                    <img className="card-down" src={down} />
                    </button>
                </div>

                

                <div className="hero_blocks">
                        {leftBlocks.map((img, i) => (
                            <img key={`left-${i}`} src={img} />
                        ))}

                        <img src={blockcentral} />

                        {rightBlocks.map((img, i) => (
                            <img key={`right-${i}`} src={img} />
                        ))}
                </div>

                <div className="hero_people">
                    <img className="hero_boy" src={Boy} />
                    <img className="hero_girl" src={Girl} />
                </div>

                <HeroCard
                    title="100+"
                    text="Участников и подписчиков"
                    className="top-right"
                    description="Наша цель по количеству людей в Telegram-сообществе."
                />
                <HeroCard
                    title="76%"
                    text="Получают реальные кейсы"
                    className="bottom-left"
                    description="Доля студентов, для которых доступ к реальным проектам - ключевая ценность. "
                />
                <HeroCard
                    title="40%"
                    text="Сокращение пути к офферу"
                    className="bottom-right"
                    description="На столько снижается время поиска первой работы благодаря участию в проекте."
                />
            </div>
        </section>
    )
}

