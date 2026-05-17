import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../shared/ui/Hero/Hero.scss";
import {
    setCurrentSection,
    setImages,
    selectors,
} from "../../../features/hero";

import logo from "../../../shared/assets/logo.png";
import heroLogo from "../../../shared/assets/heroLogo.png";
import boyngirlHome from "../../../shared/assets/boyngirlHome.png";

import forstudent1 from "../../../shared/assets/badge.png";
import forstudent2 from "../../../shared/assets/titleproject.png";
import forstudent3 from "../../../shared/assets/RainbowPic.png";
import forstudent4 from "../../../shared/assets/VectorRegistration.png";
import forstudentcircle from "../../../shared/assets/Group 239910.png";

import brain from "../../../shared/assets/brain.png";

import kybok from "../../../shared/assets/kybok.png";
import Arseniy from "../../../shared/assets/Arseniy.png";
import Maria from "../../../shared/assets/Maria.png";
import Danil from "../../../shared/assets/Danil.png";
import Ksenia from "../../../shared/assets/Ksenia.png";
import Artem from "../../../shared/assets/Artem.png";



export const HeroSection = () => {
    const MAX_SECTION = 6;
    const TEAM_LOOP_MULTIPLIER = 7;
    const TEAM_MIDDLE_LOOP_INDEX = Math.floor(TEAM_LOOP_MULTIPLIER / 2);
    const TEAM_MEMBERS = [
        { name: "Arseniy", image: Arseniy },
        { name: "Maria", image: Maria },
        { name: "Danil", image: Danil },
        { name: "Ksenia", image: Ksenia },
        { name: "Artem", image: Artem },
    ];
    const FAQ_ITEMS = [
        {
            question: "Что такое KTSThub?",
            answer:
                "Это платформа для хакатонов, командной работы и развития портфолио, где можно участвовать в событиях и находить команду.",
        },
        {
            question: "Кто может пользоваться платформой?",
            answer:
                "Студенты, участники хакатонов, наставники, организаторы и партнеры. Позже список можно уточнить под реальные роли проекта.",
        },
        {
            question: "Нужно ли регистрироваться заранее?",
            answer:
                "Да, так участник сможет заранее заполнить профиль, подать заявку и быстрее подключиться к событиям и командам.",
        },
        {
            question: "Можно ли участвовать без команды?",
            answer:
                "Да, смысл платформы как раз в том, чтобы помогать искать людей и собирать команду под хакатон или проект.",
        },
    ];
    const STUDENT_FEATURES = [
        {
            title: "Реальные кейсы",
            text: "Задачи от компаний, а не учебные примеры",
        },
        {
            title: "Своя команда",
            text: "Находи разработчиков, дизайнеров и PM-ов под проект",
        },
        {
            title: "Портфолио",
            text: "Реальные проекты вместо строчки \"Прошёл курс\"",
        },
        {
            title: "Рейтинг и баллы",
            text: "Участвуй, расти, попадай в топ",
        },
        {
            title: "Карьерный старт",
            text: "Лучших забирают на стажировку или оффер",
        },
    ];
    const dispatch = useDispatch();
    const currentSection = useSelector(selectors.selectCurrentSection);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const teamCarouselTrackRef = useRef<HTMLDivElement | null>(null);
    const teamDragStartX = useRef<number | null>(null);
    const teamDragStartScrollLeft = useRef(0);
    const [isTeamDragging, setIsTeamDragging] = useState(false);

    const scrollToSection = useCallback((sectionNum: number) => {
        const container = document.querySelector('.sections-container');
        const target = document.getElementById(`slice${sectionNum}`);
        if (target && container) {
            target.scrollIntoView({ behavior: 'smooth' });
            dispatch(setCurrentSection(sectionNum));
        }
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                scrollToSection(currentSection < MAX_SECTION ? currentSection + 1 : MAX_SECTION);
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
                        dispatch(setCurrentSection(sectionNum));
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
    }, [currentSection, scrollToSection, dispatch, MAX_SECTION]);

    useEffect(() => {
        dispatch(setImages({
            forstudent1,
            forstudent2,
            forstudent3,
            forstudent4,
            forstudentcircle,
        }));
    }, [dispatch]);

    const loopedTeamMembers = Array.from({ length: TEAM_LOOP_MULTIPLIER }, (_, loopIndex) =>
        TEAM_MEMBERS.map((member, memberIndex) => ({
            key: `${member.name}-${loopIndex}-${memberIndex}`,
            member,
        }))
    ).flat();

    const recenterTeamTrack = useCallback((force = false) => {
        const track = teamCarouselTrackRef.current;

        if (!track) {
            return;
        }

        const singleLoopWidth = track.scrollWidth / TEAM_LOOP_MULTIPLIER;

        if (!singleLoopWidth) {
            return;
        }

        const middleLoopStart = singleLoopWidth * TEAM_MIDDLE_LOOP_INDEX;
        const safeStart = singleLoopWidth;
        const safeEnd = singleLoopWidth * (TEAM_LOOP_MULTIPLIER - 2);

        if (force || track.scrollLeft < safeStart || track.scrollLeft > safeEnd) {
            const normalizedOffset =
                ((track.scrollLeft % singleLoopWidth) + singleLoopWidth) % singleLoopWidth;

            track.scrollLeft = middleLoopStart + normalizedOffset;
        }
    }, [TEAM_LOOP_MULTIPLIER, TEAM_MIDDLE_LOOP_INDEX]);

    const scrollTeamByCard = useCallback((direction: 1 | -1) => {
        const track = teamCarouselTrackRef.current;

        if (!track) {
            return;
        }

        const firstCard = track.querySelector<HTMLElement>(".team-card");
        const trackStyles = window.getComputedStyle(track);
        const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
        const fallbackCardWidth = track.clientWidth >= 960 ? track.clientWidth / 3 : Math.min(track.clientWidth * 0.82, 420);
        const cardWidth = firstCard?.offsetWidth ?? fallbackCardWidth;

        track.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: "smooth",
        });
    }, []);

    const showPrevTeamMember = () => {
        scrollTeamByCard(-1);
    };

    const showNextTeamMember = () => {
        scrollTeamByCard(1);
    };

    const handleTeamPointerDown = (clientX: number) => {
        const track = teamCarouselTrackRef.current;

        if (!track) {
            return;
        }

        teamDragStartX.current = clientX;
        teamDragStartScrollLeft.current = track.scrollLeft;
        setIsTeamDragging(true);
    };

    const handleTeamPointerMove = (clientX: number) => {
        const track = teamCarouselTrackRef.current;

        if (!track || teamDragStartX.current === null) {
            return;
        }

        track.scrollLeft = teamDragStartScrollLeft.current - (clientX - teamDragStartX.current);
    };

    const handleTeamPointerUp = () => {
        teamDragStartX.current = null;
        setIsTeamDragging(false);
        recenterTeamTrack();
    };

    useEffect(() => {
        const track = teamCarouselTrackRef.current;

        if (!track) {
            return;
        }

        const frameId = window.requestAnimationFrame(() => {
            recenterTeamTrack(true);
        });

        const handleResize = () => {
            recenterTeamTrack(true);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [recenterTeamTrack]);

    const showStickyHeader = currentSection >= 2;
    const navigate = useNavigate();

    return (
        <div className="sections-container">
            <section id="slice1" className="hero">
                <img className={`hero_logo ${showStickyHeader ? 'fixed-on-scroll' : ''}`} src={logo} alt="Р›РѕРіРѕС‚РёРї KTSThub" />

                <div className="hero_content">
                    <div className="hero_intro">
                        <img className="hero_intro_logo" src={heroLogo} alt="KTSThub" />
                        <p className="hero_intro_text">Мы дадим тебе портфолио и кейсы</p>
                        <button className={`hero_button ${showStickyHeader ? 'move-to-nav' : ''}`} onClick={() => navigate('/auth')}>
                            Войти в мир Хакатонов
                        </button>
                    </div>
                </div>
            </section>

            <section id="slice2" className="secondslice">
                <div className="secondslice_inner">
                    <div className="secondslice_content">
                        <h2>Для участников и студентов</h2>
                        <img
                            className="secondslice_image"
                            src={boyngirlHome}
                            alt="Для участников и студентов"
                        />
                        <div className="secondslice_arcstage">
                            <div className="secondslice_cards">
                                {STUDENT_FEATURES.map((item, index) => (
                                    <article
                                        key={item.title}
                                        className={`secondslice_card secondslice_card--${index + 1}`}
                                    >
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </article>
                                ))}
                            </div>
                            <svg
                                className="secondslice_smile"
                                viewBox="0 0 1500 360"
                                aria-hidden="true"
                            >
                                <path
                                    className="secondslice_smile-path"
                                    d="M30 40 Q750 498 1470 40"
                                />
                                <circle className="secondslice_smile-dot" cx="30" cy="40" r="20" />
                                <circle className="secondslice_smile-dot" cx="390" cy="211.75" r="20" />
                                <circle className="secondslice_smile-dot" cx="750" cy="269" r="20" />
                                <circle className="secondslice_smile-dot" cx="1110" cy="211.75" r="20" />
                                <circle className="secondslice_smile-dot" cx="1470" cy="40" r="20" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <section id="slice3" className="fourthslice">
                            <div className="platform-title">Наша платформа</div>
                            <div className="fourthslice_inner">
                                <h2>KCTHack<br />Platform</h2>
                                <p>Найди команду, реши реальный кейс,получи портфолио.</p>

                                <div className="info-block">
                                    <div className="info-content">
                                        <div className="info-heading">
                                            <img className="info-heading-icon info-heading-icon-left" src={brain} alt="" />
                                            <h3>Участвуй в хакатонах</h3>
                                            <img className="info-heading-icon info-heading-icon-right" src={kybok} alt="" />
                                        </div>
                                        <p>Регистрируйся на события, собирай команду и решай реальные кейсы от компаний-партнёров.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="slice4" className="sixthslice">
                            <div className="platform-title">Наши партнеры</div>
                            <div className="sixthslice_inner">
                                <div className="partners-grid">
                                    <div className="partner-placeholder">Партнёр 1</div>
                                    <div className="partner-placeholder">Партнёр 2</div>
                                    <div className="partner-placeholder">Партнёр 3</div>
                                    <div className="partner-placeholder">Партнёр 4</div>
                                    <div className="partner-placeholder">Партнёр 5</div>
                                    <div className="partner-placeholder">Партнёр 6</div>
                                </div>

                                <div className="gratitude-card">
                                    <p className="gratitude-card_name">Максим Сергеевич Грохульский</p>
                                    <p className="gratitude-card_role">Директор Колледжа Цифровых Технологий</p>
                                    <p className="gratitude-card_text">Максим Сергеевич выражает благодарность команде КЦТхак за проделанную работу</p>
                                </div>
                            </div>
                        </section>

                        <section id="slice5" className="teamslice">
                            <div className="platform-title">Наша команда</div>
                            <div className="teamslice_inner">
                                <button
                                    type="button"
                                    className="team-carousel_arrow"
                                    onClick={showPrevTeamMember}
                                    aria-label="Показать предыдущего участника"
                                >
                                    ←
                                </button>
                                <div
                                    ref={teamCarouselTrackRef}
                                    className={`team-carousel_track ${isTeamDragging ? "is-dragging" : ""}`}
                                    onScroll={() => recenterTeamTrack()}
                                    onMouseDown={(event) => handleTeamPointerDown(event.clientX)}
                                    onMouseMove={(event) => handleTeamPointerMove(event.clientX)}
                                    onMouseUp={handleTeamPointerUp}
                                    onMouseLeave={handleTeamPointerUp}
                                >
                                    {loopedTeamMembers.map((member) => (
                                        <div key={member.key} className="team-card">
                                            <img className="team-card_image" src={member.member.image} alt={member.member.name} />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="team-carousel_arrow"
                                    onClick={showNextTeamMember}
                                    aria-label="Показать следующего участника"
                                >
                                    →
                                </button>
                            </div>
                        </section>

                        <section id="slice6" className="faqslice">
                            <div className="platform-title">Популярные вопросы</div>
                            <div className="faqslice_inner">
                                <div className="faq-list">
                                    {FAQ_ITEMS.map((item, index) => {
                                        const isOpen = index === openFaqIndex;

                                        return (
                                            <article
                                                key={item.question}
                                                className={`faq-card ${isOpen ? "is-open" : ""}`}
                                            >
                                                <button
                                                    type="button"
                                                    className="faq-card_trigger"
                                                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                                                    aria-expanded={isOpen}
                                                >
                                                    <span>{item.question}</span>
                                                    <span className="faq-card_icon">{isOpen ? "−" : "+"}</span>
                                                </button>

                                                {isOpen && <p className="faq-card_answer">{item.answer}</p>}
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                );
            }
