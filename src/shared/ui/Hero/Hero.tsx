import { useState, useEffect, useCallback } from "react";
import "./Hero.scss"
import { HeroCard } from "../HeroCard"

import logo from "../../assets/logo.png"
import numbers from "../../assets/numbers.png"

import Hack from "../../assets/HacK.png"
import KCT from "../../assets/KCT.png"

import block1left from "../../assets/block1left.png"
import block2left from "../../assets/block2left.png"
import block3left from "../../assets/block3left.png"
import block4left from "../../assets/block4left.png"
import block5left from "../../assets/block5left.png"
import block1right from "../../assets/block1right.png"
import block2right from "../../assets/block2right.png"
import block3right from "../../assets/block3right.png"
import block4right from "../../assets/block4right.png"
import block5right from "../../assets/block5right.png"
import blockcentral from "../../assets/blockcentral.png"

import card from "../../assets/card.png"
import down from "../../assets/down.png"

import Boy from "../../assets/Boy.png"
import Girl from "../../assets/Girl.png"

import secondtop from "../../assets/secondtop.png"
import secondbottom from "../../assets/secondbottom.png"
import forstudent1 from "../../assets/forstudent1.png"
import forstudent2 from "../../assets/forstudent2.png"
import forstudent3 from "../../assets/forstudent3.png"
import forstudent4 from "../../assets/forstudent4.png"
import forstudentcircle from "../../assets/forstudentcircle.png"

import ikon from "../../assets/ikon.png"
import LOGOTIP from "../../assets/LOGOTIP.png"

import pazl from "../../assets/pazl.png"
import brain from "../../assets/brain.png"
import game from "../../assets/game.png"
import unicorn from "../../assets/unicorn.png"

import joystick from "../../assets/joystick.png"
import molniya from "../../assets/molniya.png"
import kybok from "../../assets/kybok.png"
import raceta from "../../assets/raceta.png"
import lamp from "../../assets/lamp.png"

import back5left from "../../assets/back5left.png"
import back5right from "../../assets/back5right.png"

const leftBlocks = [block1left, block2left, block3left, block4left, block5left];
const rightBlocks = [block5right, block4right, block3right, block2right, block1right];

const sixthsliceData = {
    1: [
        { text: "Компания А", title: "Спонсор", desc: "Генеральный партнёр хакатона" },
        { text: "Компания Б", title: "Спонсор", desc: "Технологический партнёр" },
        { text: "Компания В", title: "Спонсор", desc: "Партнёр программы" },
        { text: "Компания Г", title: "Спонсор", desc: "Стратегический партнёр" },
        { text: "Компания Д", title: "Спонсор", desc: "Информационный партнёр" },
    ],
    2: [
        { text: "Мария", title: "Разработчик", desc: "Менеджер проекта" },
        { text: "Данил", title: "Разработчик", desc: "Backend разработчик" },
        { text: "Ксения", title: "Разработчик", desc: "Frontend разработчик" },
        { text: "Арсений", title: "Разработчик", desc: "Дизайнер" },
        { text: "Артём", title: "Разработчик", desc: "Backend разработчик" },
    ],
    3: [
        { text: "Сергей", title: "Партнер", desc: "CTO компании Х" },
        { text: "Анна", title: "Партнер", desc: "Руководитель IT проектов" },
        { text: "Павел", title: "Партнер", desc: "Технический директор" },
        { text: "Наталья", title: "Партнер", desc: "Head of Development" },
        { text: "Артём", title: "Партнер", desc: "Product Manager" },
    ],
};

export const Hero = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [activeTopBlock, setActiveTopBlock] = useState<number | null>(1);
    const [carouselOffset, setCarouselOffset] = useState(0);
    const [currentSection, setCurrentSection] = useState(1);

    const scrollToSection = useCallback((sectionNum: number) => {
        const container = document.querySelector('.sections-container');
        const target = document.getElementById(`slice${sectionNum}`);
        if (target && container) {
            target.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(sectionNum);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                scrollToSection(currentSection < 6 ? currentSection + 1 : 6);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                scrollToSection(currentSection > 1 ? currentSection - 1 : 1);
            }
        };

        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault();
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionNum = parseInt(entry.target.id.replace('slice', ''));
                        setCurrentSection(sectionNum);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const sections = document.querySelectorAll('[id^="slice"]');
        sections.forEach((section) => observer.observe(section));

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('popstate', handlePopState);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('popstate', handlePopState);
            observer.disconnect();
        };
    }, [currentSection, scrollToSection]);

    const goToNextSection = () => {
        if (currentSection < 6) {
            scrollToSection(currentSection + 1);
        }
    };

    const topBlockContent = {
        1: { text: "TEXT1", title: "PM/UX-UI дизайнер/Глава проекта", desc: "Главное лицо проекта бла бла бла бла сделал там то то се пятое десятое" },
        2: { text: "TEXT2", title: "Backend разработка/Команда", desc: "Команда разработчиков, которые сделали проект" },
        3: { text: "TEXT3", title: "QA Инженер/Тестировщик", desc: "Специалист по тестированию и контролю качества" },
    };

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

    const currentTopContent = activeTopBlock ? topBlockContent[activeTopBlock as keyof typeof topBlockContent] : null;
    const content = activeCard ? featuresContent[activeCard as keyof typeof featuresContent] : null;

    const currentData = activeTopBlock ? sixthsliceData[activeTopBlock as keyof typeof sixthsliceData] : sixthsliceData[1];

    const handlePrev = () => {
        setCarouselOffset(prev => prev - 1);
    };

    const handleNext = () => {
        setCarouselOffset(prev => prev + 1);
    };

    const getDisplayItems = () => {
        const items = [];
        const totalItems = currentData.length;

        for (let i = -2; i <= 2; i++) {
            const index = ((carouselOffset + i) % totalItems + totalItems) % totalItems;
            items.push({
                ...currentData[index],
                position: i,
                key: `${activeTopBlock}-${carouselOffset}-${i}`
            });
        }

        return items;
    };

    const displayItems = getDisplayItems();

    return (
        <div className="sections-container">
            <section id="slice1" className="hero">
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
                        <button className="cards_button" onClick={goToNextSection}>
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

            <section id="slice2" className="secondslice">
                <div className="secondslice_inner">

                    <div className="left-block">
                        <img className="second-top" src={secondtop} alt="Фон верх" />
                        <img className="molniya-top" src={molniya} alt="Молния" />
                        <img className="kybok-top" src={kybok} alt="Кубок" />
                        <img className="unicorn-top" src={unicorn} alt="Единорог" />
                        <img className="lamp-top" src={lamp} alt="Лампа" />
                        <img className="boy2" src={Boy} alt="Участник" />
                        <img className="game-left" src={game} alt="Игра" />
                        <img className="raceta-bottom" src={raceta} alt="Ракета" />
                        <img className="joystick-bottom" src={joystick} alt="Джойстик" />
                        <img className="brain-bottom" src={brain} alt="Мозг" />
                        <img className="pazl-bottom" src={pazl} alt="Пазл" />
                        <img className="second-bottom" src={secondbottom} alt="Фон низ" />
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

            <section id="slice3" className="thirdslice">
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

            <section id="slice4" className="fourthslice">
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

                        <section id="slice5" className="fifthslice">
                            <img className="back5left" src={back5left} alt="" />
                            <img className="back5right" src={back5right} alt="" />
                            <div className="fifthslice_inner">
                                <div className="fifthslice_left_images">
                                    <div className="img-group-close">
                                        <img className="img-most-left-5" src={joystick} alt="" />
                                        <img className="img-top-left-5" src={kybok} alt="" />
                                    </div>
                                    <img className="img-right-5" src={molniya} alt="" />
                                    <img className="img-most-right-5" src={raceta} alt="" />
                                    <img className="img-right-5 img-lamp-5" src={lamp} alt="" />
                                </div>
                                <div className="fifthslice_rect">
                                    <p className="fifthslice_text">{currentTopContent ? currentTopContent.text : "TEXT"}</p>
                                    <p className="fifthslice_title">{currentTopContent ? currentTopContent.title : "PM/UX-UI дизайнер/Глава проекта"}</p>
                                    <p className="fifthslice_desc">{currentTopContent ? currentTopContent.desc : "Главное лицо проекта бла бла бла бла сделал там то то се пятое десятое"}</p>
                                </div>
                                <div className="fifthslice_right_images">
                                    <img className="right-pazl-5" src={pazl} alt="" />
                                    <img className="right-game-5" src={game} alt="" />
                                    <img className="right-brain-5" src={brain} alt="" />
                                    <img className="right-unicorn-5" src={unicorn} alt="" />
                                    <img className="right-game-second-5" src={game} alt="" />
                                    <img className="right-molniya-5" src={molniya} alt="" />
                                </div>
                                <div className="fifthslice_top_right">
                                    <div 
                                        className={`top-right-block ${activeTopBlock === 1 ? 'active' : ''}`}
                                        onClick={() => setActiveTopBlock(1)}
                                    >TEXT</div>
                                    <div 
                                        className={`top-right-block ${activeTopBlock === 2 ? 'active' : ''}`}
                                        onClick={() => setActiveTopBlock(2)}
                                    >TEXT</div>
                                    <div 
                                        className={`top-right-block ${activeTopBlock === 3 ? 'active' : ''}`}
                                        onClick={() => setActiveTopBlock(3)}
                                    >TEXT</div>
                                </div>
                            </div>
                        </section>

                        <section id="slice6" className="sixthslice">
                            <img className="back5left" src={back5left} alt="" />
                            <img className="back5right" src={back5right} alt="" />
                            <div className="sixthslice_container">
                                <div className="fifthslice_left_images">
                                    <div className="img-group-close">
                                        <img className="img-most-left" src={joystick} alt="" />
                                        <img className="img-top-left" src={kybok} alt="" />
                                    </div>
                                    <img className="img-right" src={molniya} alt="" />
                                    <img className="img-most-right" src={raceta} alt="" />
                                    <img className="img-right img-lamp" src={lamp} alt="" />
                                </div>
                                <button className="carousel-arrow carousel-arrow-left" onClick={handlePrev}>
                                    ←
                                </button>
                                <div className="sixthslice_cards">
                                    {displayItems.map((item) => (
                                        <div 
                                            key={item.key} 
                                            className={`fifthslice_rect sixth_${item.position === -2 ? 'left_2' : item.position === -1 ? 'left_1' : item.position === 0 ? 'center' : item.position === 1 ? 'right_1' : 'right_2'}`}
                                        >
                                            <p className="fifthslice_text">{item.text}</p>
                                            <p className="fifthslice_title">{item.title}</p>
                                            <p className="fifthslice_desc">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-arrow carousel-arrow-right" onClick={handleNext}>
                                    →
                                </button>
                                <div className="fifthslice_right_images">
                                    <img className="right-pazl" src={pazl} alt="" />
                                    <img className="right-game" src={game} alt="" />
                                    <img className="right-brain" src={brain} alt="" />
                                    <img className="right-unicorn" src={unicorn} alt="" />
                                    <img className="right-game-second" src={game} alt="" />
                                    <img className="right-molniya" src={molniya} alt="" />
                                </div>
                                <div className="fifthslice_top_right">
                                    <div 
                                        className={`top-right-block ${activeTopBlock === 1 ? 'active' : ''}`}
                                        onClick={() => { setActiveTopBlock(1); setCarouselOffset(0); }}
                                    >СПОНСОРЫ</div>
                                    <div 
                                        className={`top-right-block ${activeTopBlock === 2 ? 'active' : ''}`}
                                        onClick={() => { setActiveTopBlock(2); setCarouselOffset(0); }}
                                    >РАЗРАБОТЧИКИ</div>
                                    <div 
                                        className={`top-right-block ${activeTopBlock === 3 ? 'active' : ''}`}
                                        onClick={() => { setActiveTopBlock(3); setCarouselOffset(0); }}
                                    >ПАРТНЁРЫ</div>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            }