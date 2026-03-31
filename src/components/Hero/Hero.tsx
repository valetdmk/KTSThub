import "./Hero.scss"
import { HeroCard } from "./HeroCard";
import Orange1 from "../../Photos/Orange1.png"
import Purple1 from "../../Photos/Purple1.png"
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

export const Hero = () => {
    return (
        <section className="hero">
            <header className="hero_header">
                <div className="hero_header_inner">
                <div className="hero_logo"></div>
                <nav className="hero_nav">
                    <a href="">О нас</a>
                    <a href="">Достижения</a>
                    <a href="">Разработчики</a>
                    <a href="">Партнеры</a>
                    <a href="">FAQ</a>
                </nav>
                </div>
            </header>

            <div className="hero_content">
                <h1 className="hero_title">
                    <span>КЦТ</span>
                    Hack
                </h1>

                <p className="hero_subtitle">
                    Вы переходите в мир нового уровня погружения в ИТ-сферу разработки
                </p>

                <button className="hero_button">
                    Войти в мир хакатонов
                </button>

                <div className="hero_blocks">
                        <img src={block1left} />
                        <img src={block2left} />
                        <img src={block3left} />
                        <img src={block4left} />
                        <img src={block5left} />
                        <img src={blockcentral} />
                        <img src={block5right} />
                        <img src={block4right} />
                        <img src={block3right} />
                        <img src={block2right} />
                        <img src={block1right} />
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
            <img className="hero_bg hero_bg--left" src={Orange1} />
            <img className="hero_bg hero_bg--right" src={Purple1} />

        </section>
    )
}