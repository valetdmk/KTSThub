import { useState } from "react";
import "./Hero.scss"
import { HeroCard } from "./HeroCard"

import logo from "../../Photos/logo.png"
import numbers from "../../Photos/numbers.png"

import Hack from "../../Photos/HacK.png"
import KCT from "../../Photos/KCT.png"

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
import blockcentral from "../../Photos/blockcentral.png"

import card from "../../Photos/card.png"
import down from "../../Photos/down.png"

import Boy from "../../Photos/Boy.png"
import Girl from "../../Photos/Girl.png"

import secondtop from "../../Photos/secondtop.png"
import secondbottom from "../../Photos/secondbottom.png"
import forstudent1 from "../../Photos/forstudent1.png"
import forstudent2 from "../../Photos/forstudent2.png"
import forstudent3 from "../../Photos/forstudent3.png"
import forstudent4 from "../../Photos/forstudent4.png"
import forstudentcircle from "../../Photos/forstudentcircle.png"

import ikon from "../../Photos/ikon.png"
import LOGOTIP from "../../Photos/LOGOTIP.png"

import pazl from "../../Photos/pazl.png"
import brain from "../../Photos/brain.png"
import game from "../../Photos/game.png"
import unicorn from "../../Photos/unicorn.png"

const leftBlocks = [block1left, block2left, block3left, block4left, block5left];
const rightBlocks = [block5right, block4right, block3right, block2right, block1right];

export const Hero = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const featuresContent = {
        1: {
            left: [
                { img: forstudent1, title: "Реальный опыт IT-индустрии", desc: "Личный кабинет с вашими активностями." },
                { img: forstudentcircle, title: "Студентам", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: forstudent2, title: "Опыт командной работы", desc: "IT-специалисты команды и проекты в одном месте" },
            ],
            right: [
                { img: forstudent3, title: " Контакт с HR компаний", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: forstudent4, title: "Рабочие проекты в портфолио", desc: "IT-специалисты команды и проекты в одном месте" },
            ]
        },
        2: {
            left: [
                { img: forstudent1, title: "Реальный опыт IT-индустрии", desc: "Личный кабинет с вашими активностями." },
                { img: forstudentcircle, title: "Партнёрам", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: forstudent2, title: "Опыт командной работы", desc: "IT-специалисты команды и проекты в одном месте" },
            ],
            right: [
                { img: forstudent3, title: " Контакт с HR компаний", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: forstudent4, title: "Рабочие проекты в портфолио", desc: "IT-специалисты команды и проекты в одном месте" },
            ]
        },
        3: {
            left: [
                { img: forstudent1, title: "Реальный опыт IT-индустрии", desc: "Личный кабинет с вашими активностями." },
                { img: forstudentcircle, title: "Судьям", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: forstudent2, title: "Опыт командной работы", desc: "IT-специалисты команды и проекты в одном месте" },
            ],
            right: [
                { img: forstudent3, title: " Контакт с HR компаний", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: forstudent4, title: "Рабочие проекты в портфолио", desc: "IT-специалисты команды и проекты в одном месте" },
            ]
        }
    };

    const content = activeCard ? featuresContent[activeCard as keyof typeof featuresContent] : null;

    return (
        <>
            <section className="hero">
                <img  className="hero_logo" src={logo} alt="Логотип KTSThub" />
                <img className="hero_numbers" src={numbers} alt="Статистика проекта" />

                <div className="hero_content">

                    <div className="hero_center">
                            <img className="kct" src={KCT} alt="Логотип KCT" />
                            <img className="hack" src={Hack} alt="Логотип Хакathon" />

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
                        <img className="card card-left" src={card} alt="Карточка участника" />
                        <img className="card card-center" src={card} alt="Карточка участника" />
                        <img className="card card-right" src={card} alt="Карточка участника" />
                        <button className="cards_button">
                        <img className="card-down" src={down} alt="Показать ещё" loading="lazy" />
                        </button>
                    </div>

                    

                    <div className="hero_blocks">
                            {leftBlocks.map((img, i) => (
                                <img key={`left-${i}`} src={img} alt={`Блок ${i + 1}`} loading="lazy" />
                            ))}

                            <img src={blockcentral} alt="Центральный блок" loading="lazy" />

                            {rightBlocks.map((img, i) => (
                                <img key={`right-${i}`} src={img} alt={`Блок ${5 - i}`} loading="lazy" />
                            ))}
                    </div>

                    <div className="hero_people">
                        <img className="hero_boy" src={Boy} alt="Участник" loading="lazy" />
                        <img className="hero_girl" src={Girl} alt="Участница" loading="lazy" />
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

            <section className="secondslice">
                <div className="secondslice_inner">

                    <div className="left-block">
                        <img className="second-top" src={secondtop} alt="Фон верх" />
                        <img className="second-bottom" src={secondbottom} alt="Фон низ" />
                        <img className="boy2" src={Boy} alt="Участник" />
                    </div>

                    <div className="center-block">
                        <div className="features">

                            <div className="left-col">
                                {content ? (
                                    <>
                                        <div className="feature">
                                            <img src={content.left[0].img} alt="Иконка" />
                                            <div className="content">
                                                <h1>{content.left[0].title}</h1>
                                                <p>{content.left[0].desc}</p>
                                            </div>
                                        </div>

                                        <div className="feature">
                                            <img src={content.left[1].img} alt="Иконка" />
                                            <div className="content">
                                                <h1>{content.left[1].title}</h1>
                                                <p>{content.left[1].desc}</p>
                                            </div>
                                        </div>

                                        <div className="feature">
                                            <img src={content.left[2].img} alt="Иконка" />
                                            <div className="content">
                                                <h1>{content.left[2].title}</h1>
                                                <p>{content.left[2].desc}</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="feature">
                                            <img src={forstudent1} alt="Иконка" />
                                            <div className="content">
                                                <h1>Реальный опыт IT-индустрии</h1>
                                                <p>Личный кабинет с вашими активностями.</p>
                                            </div>
                                        </div>

                                        <div className="feature">
                                            <img src={forstudentcircle} alt="Иконка" />
                                            <div className="content">
                                                <h1>Студентам</h1>
                                                <p>IT-специалисты команды и проекты в одном месте.</p>
                                            </div>
                                        </div>

                                        <div className="feature">
                                            <img src={forstudent2} alt="Иконка" />
                                            <div className="content">
                                                <h1>Опыт командной работы</h1>
                                                <p>IT-специалисты команды и проекты в одном месте</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="right-col">
                                {content ? (
                                    <>
                                        <div className="feature">
                                            <img src={content.right[0].img} alt="Иконка" />
                                            <div className="content">
                                                <h1>{content.right[0].title}</h1>
                                                <p>{content.right[0].desc}</p>
                                            </div>
                                        </div>

                                        <div className="feature">
                                            <img src={content.right[1].img} alt="Иконка" />
                                            <div className="content">
                                                <h1>{content.right[1].title}</h1>
                                                <p>{content.right[1].desc}</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="feature">
                                            <img src={forstudent3} alt="Иконка" />
                                            <div className="content">
                                                <h1>Контакт с HR компаний</h1>
                                                <p>IT-специалисты команды и проекты в одном месте</p>
                                            </div>
                                        </div>

                                        <div className="feature">
                                            <img src={forstudent4} alt="Иконка" />
                                            <div className="content">
                                                <h1>Рабочие проекты в портфолио</h1>
                                                <p>IT-специалисты команды и проекты в одном месте.</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="right-block">
                        <div 
                            className={`info-card ${activeCard === 1 ? 'active' : ''}`}
                            onClick={() => setActiveCard(1)}
                        >
                            <span className="info-number">01</span>
                            <h2>Для<br />студентов</h2>
                            <p>Уникальная возможность раскрыть свой потенциал и сделать первый шаг к мечте!</p>
                        </div>

                        <div 
                            className={`info-card ${activeCard === 2 ? 'active' : ''}`}
                            onClick={() => setActiveCard(2)}
                        >
                            <span className="info-number">02</span>
                            <h2>Для<br />Партнеров</h2>
                            <p>Уникальная возможность раскрыть свой потенциал и сделать первый шаг к мечте!</p>
                        </div>

                        <div 
                            className={`info-card ${activeCard === 3 ? 'active' : ''}`}
                            onClick={() => setActiveCard(3)}
                        >
                            <span className="info-number">03</span>
                            <h2>Для<br />Судей</h2>
                            <p>Уникальная возможность раскрыть свой потенциал и сделать первый шаг к мечте!</p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="thirdslice">
                <div className="thirdslice_inner">
                    <img className="girl-mirrored" src={Girl} alt="Девушка" />
                    <div className="thirdslice_columns">
                        <div className="third-col">
                            <p>Кадры с ивентов результаты<br /> хакатонов<br />и успехи команд</p>
                            <div className="rect-block rect-block-info-bign" onClick={() => window.location.href = '/block7'}>Блок 7</div>
                            <div className="rect-block rect-block-info-small" onClick={() => window.location.href = '/block8'}>Блок 8</div>
                        </div>
                        <div className="third-col">
                            <div className="rect-block rect-block-large" onClick={() => window.location.href = '/block1'}>Блок 1</div>
                            <div className="rect-block" onClick={() => window.location.href = '/block2'}>Блок 2</div>
                            <div className="rect-block" onClick={() => window.location.href = '/block3'}>Блок 3</div>
                        </div>
                        <div className="third-col">
                            <div className="rect-block rect-block-large" onClick={() => window.location.href = '/block4'}>Блок 4</div>
                            <div className="rect-block" onClick={() => window.location.href = '/block5'}>
                                <div className="sub-blocks">
                                    <div className="sub-block" onClick={(e) => { e.stopPropagation(); window.location.href = '/block5a' }}>5a</div>
                                    <div className="sub-block" onClick={(e) => { e.stopPropagation(); window.location.href = '/block5b' }}>5b</div>
                                </div>
                            </div>
                            <div className="rect-block" onClick={() => window.location.href = '/block6'}>
                                <div className="sub-blocks">
                                    <div className="sub-block" onClick={(e) => { e.stopPropagation(); window.location.href = '/block6a' }}>6a</div>
                                    <div className="sub-block" onClick={(e) => { e.stopPropagation(); window.location.href = '/block6b' }}>6b</div>
                                </div>
                            </div>
                        </div>
                        <div className="third-col">
                            <div className="rect-block rect-block-info" onClick={() => window.location.href = '/block9'}>Блок 9</div>
                            <div className="rect-block rect-block-info-big" onClick={() => window.location.href = '/block10'}>Блок 10</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="fourthslice">
                            <div className="rectangle-top">
                                <img src={LOGOTIP} alt="Логотип" />
                            </div>
                            <div className="left-shapes">
                                <div className="shape-group">
                                    <img src={game} alt="game" />
                                    <img src={unicorn} alt="unicorn" />
                                </div>
                                <div className="shape-group">
                                    <img src={pazl} alt="pazl" />
                                    <img src={brain} alt="brain" />
                                </div>
                            </div>
                            <div className="right-shapes">
                                <div className="shape-group">
                                    <img src={game} alt="game" />
                                    <img src={unicorn} alt="unicorn" />
                                </div>
                                <div className="shape-group">
                                    <img src={pazl} alt="pazl" />
                                    <img src={brain} alt="brain" />
                                </div>
                            </div>
                            <div className="fourthslice_inner">
                                <h2>Все активности вашего соревнования на брендированной под вас платформе</h2>
                                <p>Самая удобная платформа по отзывам участников. От классического ИТ-марафона (Хакатона) и кейс-чемпионата до ИИ‑чемпионата с поддержкой докера и Быстрых собеседований (One Day/Weekend Offer). Все в одном месте: регистрация, тимбилдинг, полное брендирование и интерактивные инструменты.</p>

                                <div className="info-block">
                                    <img className="info-icon" src={ikon} alt="Иконка" />
                                    <div className="info-content">
                                        <h3>Регистрация участников</h3>
                                        <p>Сбор данных: анкета, мотивация, резюме, маркетинговая аналитика.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
