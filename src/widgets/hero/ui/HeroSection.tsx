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
import partnerLending from "../../../shared/assets/partnerLending.png";
import judgeLending from "../../../shared/assets/judgeLending.png";
import panda from "../../../shared/assets/panda.png";
import partnerBack from "../../../shared/assets/PartnerBack.png";
import frameToFAQ from "../../../shared/assets/frameToFAQ.png";

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
    const PARTNER_LOOP_MULTIPLIER = 7;
    const PARTNER_MIDDLE_LOOP_INDEX = Math.floor(PARTNER_LOOP_MULTIPLIER / 2);
    const TEAM_LOOP_MULTIPLIER = 7;
    const TEAM_MIDDLE_LOOP_INDEX = Math.floor(TEAM_LOOP_MULTIPLIER / 2);
    const AUDIENCE_SLIDES = [
        {
            title: "Для участников и студентов",
            image: boyngirlHome,
            alt: "Для участников и студентов",
            type: "students",
        },
        {
            title: "Для Партнёров",
            image: partnerLending,
            alt: "Для партнёров",
            type: "partners",
        },
        {
            title: "Для Судьи",
            image: judgeLending,
            alt: "Для судьи",
            type: "judges",
        },
    ] as const;
    const PARTNER_SPOTLIGHTS = [
        {
            name: "Максим Сергеевич",
            role: "Директор “Колледжа Цифровых Технологий” ИТ-колледж",
            title: "Максим Сергеевич выражает благодарность команде КЦТхак за проделанную работу",
            text: "Спасибо КЦТхак за эффективное и профессиональную платформу со своей созданной экосистемой...",
        },
        {
            name: "Анна Викторовна",
            role: "Руководитель партнёрских программ",
            title: "Анна Викторовна отмечает высокий уровень организации и внимания к деталям",
            text: "Проект показывает, как образовательная и технологическая среда могут работать вместе и приносить реальную пользу...",
        },
        {
            name: "Илья Андреевич",
            role: "Куратор цифровых инициатив",
            title: "Илья Андреевич благодарит команду за качественную реализацию платформы",
            text: "Решение выглядит целостным, удобным для пользователей и хорошо продуманным с точки зрения экосистемы...",
        },
        {
            name: "Елена Сергеевна",
            role: "Представитель индустриального партнёра",
            title: "Елена Сергеевна подчёркивает ценность платформы для совместной работы и роста команд",
            text: "Особенно важно, что продукт не просто красивый, а помогает выстраивать устойчивое взаимодействие внутри сообщества...",
        },
    ];
    const TEAM_MEMBERS = [
        { name: "Arseniy", image: Arseniy },
        { name: "Maria", image: Maria },
        { name: "Danil", image: Danil },
        { name: "Ksenia", image: Ksenia },
        { name: "Artem", image: Artem },
    ];
    const FAQ_ITEMS = [
        {
            question: "Что это вообще за платформа?",
            answer:
                "Это сообщество, где студенты делают реальные IT-проекты, работают в командах и получают практический опыт через хакатоны и задачи от партнёров.",
        },
        {
            question: "Это бесплатно?",
            answer:
                "Да, участие бесплатное.",
        },
        {
            question: "Сколько времени нужно уделять?",
            answer:
                "В среднем 5–10 часов в неделю (зависит от проекта и твоей вовлеченности).",
        },
        {
            question: "Как попасть в проект?",
            answer:
                "После запуска ты сможешь: выбрать направление, откликнуться на проект и начать участие.",
        },
        {
            question: "Это похоже на хакатоны?",
            answer:
                "Да, но шире. Есть и хакатоны, и долгосрочные проекты.",
        },
        {
            question: "Будут ли реальные задачи от компаний?",
            answer:
                "Да, мы планируем работать с партнёрами, чтобы участники решали реальные кейсы.",
        },
        {
            question: "Можно ли собрать свою команду?",
            answer:
                "Да, можно присоединиться к существующей или собрать свою.",
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
    const PARTNER_FEATURES = [
        {
            title: "Живые кандидаты",
            text: "Смотри студентов в деле, а не по резюме",
        },
        {
            title: "Дешевле найма",
            text: "Хакатон вместо долгого рекрутинга",
        },
        {
            title: "Прямой контакт",
            text: "Забирай лучших на стажировку или оффер сразу после защиты",
        },
        {
            title: "HR-бренд",
            text: "Стань компанией, в которую хотят попасть",
        },
        {
            title: "Закрой технический долг",
            text: "Передай реальную задачу команде студентов",
        },
    ];
    const JUDGE_FEATURES = [
        {
            title: "Живые проекты",
            text: "Оценивай реальные решения, а не учебные работы",
        },
        {
            title: "Влияние на индустрию",
            text: "Помогай лучшим студентам попасть в профессию",
        },
        {
            title: "Выбирай Лучших",
            text: "Рекомендуй тех, кого хотелбы видеть в своей команде",
        },
        {
            title: "нетворкинг",
            text: "Знакомься с мотивированными ребятами напрямую",
        },
        {
            title: "Давай честный фидбэк",
            text: "Твоя оценка меняет каарьерный путь участника",
        },
    ];
    const AUDIENCE_FEATURES = {
        students: STUDENT_FEATURES,
        partners: PARTNER_FEATURES,
        judges: JUDGE_FEATURES,
    } as const;
    const dispatch = useDispatch();
    const currentSection = useSelector(selectors.selectCurrentSection);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const partnerCarouselTrackRef = useRef<HTMLDivElement | null>(null);
    const partnerDragStartX = useRef<number | null>(null);
    const partnerDragStartScrollLeft = useRef(0);
    const [isPartnerDragging, setIsPartnerDragging] = useState(false);
    const teamCarouselTrackRef = useRef<HTMLDivElement | null>(null);
    const teamDragStartX = useRef<number | null>(null);
    const teamDragStartScrollLeft = useRef(0);
    const [isTeamDragging, setIsTeamDragging] = useState(false);
    const [activeAudienceIndex, setActiveAudienceIndex] = useState(0);

    const scrollToSection = useCallback((sectionNum: number) => {
        const container = document.querySelector('.sections-container');
        const target = document.getElementById(`slice${sectionNum}`);
        if (target && container) {
            target.scrollIntoView({ behavior: 'smooth' });
            dispatch(setCurrentSection(sectionNum));
        }
    }, [dispatch]);

    const activeAudienceSlide = AUDIENCE_SLIDES[activeAudienceIndex];
    const activeAudienceFeatures = AUDIENCE_FEATURES[activeAudienceSlide.type];

    const showPrevAudienceSlide = useCallback(() => {
        setActiveAudienceIndex((prev) => (prev - 1 + AUDIENCE_SLIDES.length) % AUDIENCE_SLIDES.length);
    }, [AUDIENCE_SLIDES.length]);

    const showNextAudienceSlide = useCallback(() => {
        setActiveAudienceIndex((prev) => (prev + 1) % AUDIENCE_SLIDES.length);
    }, [AUDIENCE_SLIDES.length]);

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

    const loopedPartnerSpotlights = Array.from({ length: PARTNER_LOOP_MULTIPLIER }, (_, loopIndex) =>
        PARTNER_SPOTLIGHTS.map((partner, partnerIndex) => ({
            key: `${partner.name}-${loopIndex}-${partnerIndex}`,
            partner,
        }))
    ).flat();

    const loopedTeamMembers = Array.from({ length: TEAM_LOOP_MULTIPLIER }, (_, loopIndex) =>
        TEAM_MEMBERS.map((member, memberIndex) => ({
            key: `${member.name}-${loopIndex}-${memberIndex}`,
            member,
        }))
    ).flat();

    const recenterPartnerTrack = useCallback((force = false) => {
        const track = partnerCarouselTrackRef.current;

        if (!track) {
            return;
        }

        const singleLoopWidth = track.scrollWidth / PARTNER_LOOP_MULTIPLIER;

        if (!singleLoopWidth) {
            return;
        }

        const middleLoopStart = singleLoopWidth * PARTNER_MIDDLE_LOOP_INDEX;
        const safeStart = singleLoopWidth;
        const safeEnd = singleLoopWidth * (PARTNER_LOOP_MULTIPLIER - 2);

        if (force || track.scrollLeft < safeStart || track.scrollLeft > safeEnd) {
            const normalizedOffset =
                ((track.scrollLeft % singleLoopWidth) + singleLoopWidth) % singleLoopWidth;

            track.scrollLeft = middleLoopStart + normalizedOffset;
        }
    }, [PARTNER_LOOP_MULTIPLIER, PARTNER_MIDDLE_LOOP_INDEX]);

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

    const scrollPartnerByCard = useCallback((direction: 1 | -1) => {
        const track = partnerCarouselTrackRef.current;

        if (!track) {
            return;
        }

        const firstCard = track.querySelector<HTMLElement>(".partner-spotlight");
        const trackStyles = window.getComputedStyle(track);
        const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
        const fallbackCardWidth = track.clientWidth;
        const cardWidth = firstCard?.offsetWidth ?? fallbackCardWidth;

        track.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: "smooth",
        });
    }, []);

    const showPrevPartner = () => {
        scrollPartnerByCard(-1);
    };

    const showNextPartner = () => {
        scrollPartnerByCard(1);
    };

    const handlePartnerPointerDown = (clientX: number) => {
        const track = partnerCarouselTrackRef.current;

        if (!track) {
            return;
        }

        partnerDragStartX.current = clientX;
        partnerDragStartScrollLeft.current = track.scrollLeft;
        setIsPartnerDragging(true);
    };

    const handlePartnerPointerMove = (clientX: number) => {
        const track = partnerCarouselTrackRef.current;

        if (!track || partnerDragStartX.current === null) {
            return;
        }

        track.scrollLeft = partnerDragStartScrollLeft.current - (clientX - partnerDragStartX.current);
    };

    const handlePartnerPointerUp = () => {
        partnerDragStartX.current = null;
        setIsPartnerDragging(false);
        recenterPartnerTrack();
    };

    useEffect(() => {
        const track = partnerCarouselTrackRef.current;

        if (!track) {
            return;
        }

        const frameId = window.requestAnimationFrame(() => {
            recenterPartnerTrack(true);
        });

        const handleResize = () => {
            recenterPartnerTrack(true);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [recenterPartnerTrack]);

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
                            Присоединиться к нашей команде
                        </button>
                    </div>
                </div>
            </section>

            <section id="slice2" className="secondslice">
                <div className="secondslice_inner">
                    <div className="secondslice_content" key={activeAudienceSlide.type}>
                        <h2>{activeAudienceSlide.title}</h2>
                        <div className="secondslice_media">
                            <button
                                type="button"
                                className="secondslice_arrow secondslice_arrow--left"
                                onClick={showPrevAudienceSlide}
                                aria-label="Показать предыдущий блок"
                            >
                                ←
                            </button>
                            <div className="secondslice_image-frame">
                                {activeAudienceSlide.type === "students" ? (
                                    <img
                                        className="secondslice_image"
                                        src={boyngirlHome}
                                        alt="Для участников и студентов"
                                    />
                                ) : activeAudienceSlide.type === "partners" ? (
                                    <img
                                        className="secondslice_image secondslice_image--audience"
                                        src={partnerLending}
                                        alt="Для партнёров"
                                    />
                                ) : (
                                    <img
                                        className="secondslice_image secondslice_image--audience"
                                        src={judgeLending}
                                        alt="Для судьи"
                                    />
                                )}
                            </div>
                            <button
                                type="button"
                                className="secondslice_arrow secondslice_arrow--right"
                                onClick={showNextAudienceSlide}
                                aria-label="Показать следующий блок"
                            >
                                →
                            </button>
                        </div>
                        <div className="secondslice_arcstage">
                            <div className="secondslice_cards">
                                {activeAudienceFeatures.map((item, index) => (
                                    <article
                                        key={`${activeAudienceSlide.type}-${item.title}`}
                                        className={`secondslice_card secondslice_card--${index + 1}${index === 0 || index === 4 ? " secondslice_card--tall secondslice_card--raised" : " secondslice_card--wide"}`}
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
                                <defs>
                                    <linearGradient
                                        id="secondsliceSmileDotFill"
                                        x1="0%"
                                        y1="100%"
                                        x2="31.06%"
                                        y2="6.36%"
                                    >
                                        <stop offset="10.77%" stopColor="#FF7345" />
                                        <stop offset="93.64%" stopColor="#CF3BEE" />
                                    </linearGradient>
                                </defs>
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
                                <button
                                    type="button"
                                    className="team-carousel_arrow"
                                    onClick={showPrevPartner}
                                    aria-label="Показать предыдущего партнёра"
                                >
                                    ←
                                </button>
                                <div
                                    ref={partnerCarouselTrackRef}
                                    className={`partner-carousel_track ${isPartnerDragging ? "is-dragging" : ""}`}
                                    onScroll={() => recenterPartnerTrack()}
                                    onMouseDown={(event) => handlePartnerPointerDown(event.clientX)}
                                    onMouseMove={(event) => handlePartnerPointerMove(event.clientX)}
                                    onMouseUp={handlePartnerPointerUp}
                                    onMouseLeave={handlePartnerPointerUp}
                                    onTouchStart={(event) => handlePartnerPointerDown(event.touches[0].clientX)}
                                    onTouchMove={(event) => handlePartnerPointerMove(event.touches[0].clientX)}
                                    onTouchEnd={handlePartnerPointerUp}
                                >
                                    {loopedPartnerSpotlights.map(({ key, partner }) => (
                                        <article key={key} className="partner-spotlight">
                                            <img
                                                className="partner-spotlight_background"
                                                src={partnerBack}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                            <div className="partner-spotlight_content">
                                                <div className="partner-spotlight_avatar">
                                                    <img src={panda} alt={partner.name} />
                                                </div>
                                                <div className="partner-spotlight_name">{partner.name}</div>
                                                <p className="partner-spotlight_role">{partner.role}</p>
                                                <p className="partner-spotlight_title">{partner.title}</p>
                                                <p className="partner-spotlight_text">{partner.text}</p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="team-carousel_arrow"
                                    onClick={showNextPartner}
                                    aria-label="Показать следующего партнёра"
                                >
                                    →
                                </button>
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
                                                {isOpen && (
                                                    <img
                                                        className="faq-card_frame"
                                                        src={frameToFAQ}
                                                        alt=""
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <button
                                                    type="button"
                                                    className="faq-card_trigger"
                                                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                                                    aria-expanded={isOpen}
                                                >
                                                    <span>{item.question}</span>
                                                    <span className="faq-card_icon">{isOpen ? "−" : "+"}</span>
                                                </button>

                                                {isOpen && (
                                                    <div className="faq-card_answer">
                                                        <p>{item.answer}</p>
                                                    </div>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                );
            }
