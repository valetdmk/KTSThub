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
import panda from "../../../shared/assets/panda.png";
import partnerBack from "../../../shared/assets/PartnerBack.png";
import platformAuth from "../../../shared/assets/platformAuth.png";
import platformHero from "../../../shared/assets/platformHero.png";
import platformReting from "../../../shared/assets/platformReting.png";
import platformSchedule from "../../../shared/assets/platformSchedule.png";

import forstudent1 from "../../../shared/assets/badge.png";
import forstudent2 from "../../../shared/assets/titleproject.png";
import forstudent3 from "../../../shared/assets/RainbowPic.png";
import forstudent4 from "../../../shared/assets/VectorRegistration.png";
import forstudentcircle from "../../../shared/assets/Group 239910.png";

import brain from "../../../shared/assets/brain.png";
import joystick from "../../../shared/assets/joystick.png";
import kybok from "../../../shared/assets/kybok.png";
import lamp from "../../../shared/assets/lamp.png";
import molniya from "../../../shared/assets/molniya.png";
import pazl from "../../../shared/assets/pazl.png";
import unicorn from "../../../shared/assets/unicorn.png";
import Arseniy from "../../../shared/assets/Arseniy.png";
import Maria from "../../../shared/assets/Maria.png";
import Danil from "../../../shared/assets/Danil.png";
import Ksenia from "../../../shared/assets/Ksenia.png";
import Artem from "../../../shared/assets/Artem.png";
import footerOrange from "../../../shared/assets/footerOrange.png";
import footerPurple from "../../../shared/assets/footerPurple.png";



export const HeroSection = () => {
    const MAX_SECTION = 7;
    const PARTNER_LOOP_MULTIPLIER = 7;
    const PARTNER_MIDDLE_LOOP_INDEX = Math.floor(PARTNER_LOOP_MULTIPLIER / 2);
    const TEAM_LOOP_MULTIPLIER = 7;
    const TEAM_MIDDLE_LOOP_INDEX = Math.floor(TEAM_LOOP_MULTIPLIER / 2);
    const AUDIENCE_SLIDES = [
        {
            title: "Для участников и студентов",
            type: "students",
        },
        {
            title: "Для Партнёров",
            type: "partners",
        },
        {
            title: "Для Судьи",
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
            name: "Здесь могли бы быть Вы",
            role: "",
            title: "",
            text: "",
            isPlaceholder: true,
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
    const PLATFORM_FEATURES = [
        {
            title: "Участвуй в хакатонах",
            text: "Регистрируйся на события, собирай команду и решай реальные кейсы от компаний-партнёров.",
            leftIcon: brain,
            rightIcon: kybok,
            platformImage: platformAuth,
            platformImageClassName: "fourthslice_decor-image--auth",
        },
        {
            title: "Собери свою команду",
            text: "Находи единомышленников с нужным стеком, создавай команду и берись за проекты вместе.",
            leftIcon: unicorn,
            rightIcon: molniya,
            rightIconLarge: true,
            platformImage: platformHero,
            platformImageClassName: "fourthslice_decor-image--hero",
        },
        {
            title: "Прокачай портфолио",
            text: "Добавляй реальные проекты в профиль и показывай работодателям на что ты способен.",
            leftIcon: pazl,
            rightIcon: lamp,
            platformImage: platformAuth,
            platformImageClassName: "fourthslice_decor-image--auth",
        },
        {
            title: "Взойди на вершину\nрейтинга",
            text: "Участвуй в событиях, получай баллы и поднимайся в таблице лидеров сообщества.",
            leftIcon: joystick,
            rightIcon: kybok,
            platformImage: platformReting,
            platformImageClassName: "fourthslice_decor-image--rating",
        },
        {
            title: "Следи за расписанием",
            text: "Все воркшопы, хакатоны, митапы и тренировки в одном календаре — ничего не пропустишь.",
            leftIcon: unicorn,
            rightIcon: molniya,
            rightIconLarge: true,
            platformImage: platformSchedule,
            platformImageClassName: "fourthslice_decor-image--schedule",
        },
        {
            title: "Стань частью сообщества",
            text: "Общайся с разработчиками, дизайнерами и PM-ами, которые горят IT так же, как ты.",
            leftIcon: brain,
            leftIconMirrored: true,
            rightIcon: kybok,
            platformImage: platformAuth,
            platformImageClassName: "fourthslice_decor-image--auth",
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
    const [activeTeamCardKey, setActiveTeamCardKey] = useState("");
    const [activeAudienceIndex, setActiveAudienceIndex] = useState(0);
    const infoScrollInnerRef = useRef<HTMLDivElement | null>(null);
    const platformFeatureRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activePlatformFeatureIndex, setActivePlatformFeatureIndex] = useState(0);
    const [isPlatformPreviewOpen, setIsPlatformPreviewOpen] = useState(false);

    const snapTrackToClosestCard = useCallback((
        track: HTMLDivElement | null,
        selector: string,
        behavior: ScrollBehavior = "smooth"
    ) => {
        if (!track) {
            return;
        }

        const cards = Array.from(track.querySelectorAll<HTMLElement>(selector));

        if (!cards.length) {
            return;
        }

        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let nextScrollLeft = track.scrollLeft;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(trackCenter - cardCenter);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nextScrollLeft = cardCenter - track.clientWidth / 2;
            }
        });

        track.scrollTo({
            left: Math.max(0, nextScrollLeft),
            behavior,
        });
    }, []);

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
    const activePlatformFeature = PLATFORM_FEATURES[activePlatformFeatureIndex] ?? PLATFORM_FEATURES[0];

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

    const updateActiveTeamCard = useCallback(() => {
        const track = teamCarouselTrackRef.current;

        if (!track) {
            return;
        }

        const cards = Array.from(track.querySelectorAll<HTMLElement>(".team-card"));

        if (!cards.length) {
            return;
        }

        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let nextActiveCardKey = "";
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(trackCenter - cardCenter);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nextActiveCardKey = card.dataset.cardKey ?? "";
            }
        });

        setActiveTeamCardKey((prev) => (prev === nextActiveCardKey ? prev : nextActiveCardKey));
    }, []);

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
        const track = partnerCarouselTrackRef.current;

        partnerDragStartX.current = null;
        setIsPartnerDragging(false);
        recenterPartnerTrack();
        snapTrackToClosestCard(track, ".partner-spotlight");
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
        const track = teamCarouselTrackRef.current;

        teamDragStartX.current = null;
        setIsTeamDragging(false);
        recenterTeamTrack();
        snapTrackToClosestCard(track, ".team-card");
        updateActiveTeamCard();
    };

    useEffect(() => {
        const track = teamCarouselTrackRef.current;

        if (!track) {
            return;
        }

        const frameId = window.requestAnimationFrame(() => {
            recenterTeamTrack(true);
            updateActiveTeamCard();
        });

        const handleResize = () => {
            recenterTeamTrack(true);
            updateActiveTeamCard();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [recenterTeamTrack, updateActiveTeamCard]);

    useEffect(() => {
        const scrollContainer = infoScrollInnerRef.current;

        if (!scrollContainer) {
            return;
        }

        const updateActivePlatformFeature = () => {
            const scrollTop = scrollContainer.scrollTop;
            let nextActiveIndex = 0;

            platformFeatureRefs.current.forEach((element, index) => {
                if (!element) {
                    return;
                }

                if (scrollTop >= element.offsetTop - 16) {
                    nextActiveIndex = index;
                }
            });

            setActivePlatformFeatureIndex((prev) => (prev === nextActiveIndex ? prev : nextActiveIndex));
        };

        updateActivePlatformFeature();
        scrollContainer.addEventListener("scroll", updateActivePlatformFeature, { passive: true });
        window.addEventListener("resize", updateActivePlatformFeature);

        return () => {
            scrollContainer.removeEventListener("scroll", updateActivePlatformFeature);
            window.removeEventListener("resize", updateActivePlatformFeature);
        };
    }, []);

    useEffect(() => {
        if (!isPlatformPreviewOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsPlatformPreviewOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPlatformPreviewOpen]);

    const navigate = useNavigate();

    return (
        <div className="sections-container">
            <section id="slice1" className="hero">
                <img className={`hero_logo ${currentSection >= 2 ? 'fixed-on-scroll' : ''}`} src={logo} alt="Р›РѕРіРѕС‚РёРї KTSThub" />

                <div className="hero_content">
                    <div className="hero_intro">
                        <img className="hero_intro_logo" src={heroLogo} alt="KTSThub" />
                        <p className="hero_intro_text">Мы дадим тебе<br />портфолио и кейсы</p>
                        <button className={`hero_button ${currentSection >= 2 ? 'move-to-nav' : ''}`} onClick={() => navigate('/roles')}>
                            Присоединиться к нашему<br />миру КЦТхак
                        </button>
                    </div>
                </div>
            </section>

            <section id="slice2" className={`secondslice${currentSection === 2 ? " secondslice--active" : ""}`}>
                <div className="secondslice_inner">
                    <div className="secondslice_content" key={activeAudienceSlide.type}>
                        <div className="secondslice_header">
                            <h2>{activeAudienceSlide.title}</h2>
                            <div className="secondslice_arrows secondslice_arrows--mobile">
                                <button
                                    type="button"
                                    className="secondslice_arrow secondslice_arrow--up"
                                    onClick={showPrevAudienceSlide}
                                    aria-label="Показать предыдущий блок"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    className="secondslice_arrow secondslice_arrow--down"
                                    onClick={showNextAudienceSlide}
                                    aria-label="Показать следующий блок"
                                >
                                    ↓
                                </button>
                            </div>
                        </div>
                        <div className="secondslice_body">
                            <div className="secondslice_arrows secondslice_arrows--desktop">
                                <button
                                    type="button"
                                    className="secondslice_arrow secondslice_arrow--up"
                                    onClick={showPrevAudienceSlide}
                                    aria-label="Показать предыдущий блок"
                                >
                                    ↑
                                </button>
                                <button
                                    type="button"
                                    className="secondslice_arrow secondslice_arrow--down"
                                    onClick={showNextAudienceSlide}
                                    aria-label="Показать следующий блок"
                                >
                                    ↓
                                </button>
                            </div>
                            <div className="secondslice_cards">
                                {activeAudienceFeatures.map((item, index) => (
                                    <article
                                        key={`${activeAudienceSlide.type}-${item.title}`}
                                        className={`secondslice_card${index === 0 || index === activeAudienceFeatures.length - 1
                                            ? " secondslice_card--edge"
                                            : index === 2
                                                ? " secondslice_card--center secondslice_card--center-bottom"
                                                : " secondslice_card--center secondslice_card--center-top"}${index <= 1
                                            ? " secondslice_card--from-left"
                                            : index === 2
                                                ? " secondslice_card--from-bottom"
                                                : " secondslice_card--from-right"}`}
                                    >
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="slice3" className="fourthslice">
                <div className="platform-title">Наша платформа</div>
                <div className="fourthslice_inner">
                    <div className="info-scroll">
                        <div ref={infoScrollInnerRef} className="info-scroll_inner">
                            <div className="fourthslice_intro">
                                <h2>KCTHack<br />Platform</h2>
                                <p>Найди команду, реши реальный кейс,получи портфолио.</p>
                            </div>
                            {PLATFORM_FEATURES.map((item, index) => (
                                <div
                                    key={item.title}
                                    ref={(element) => {
                                        platformFeatureRefs.current[index] = element;
                                    }}
                                    className={`info-block${index === activePlatformFeatureIndex ? " info-block--active" : ""}`}
                                >
                                    <div className="info-content">
                                        <div className="info-heading">
                                            {item.leftIcon ? (
                                                <img
                                                    className={`info-heading-icon info-heading-icon-left${item.leftIconMirrored ? " info-heading-icon--mirrored" : ""}`}
                                                    src={item.leftIcon}
                                                    alt=""
                                                />
                                            ) : (
                                                <span className="info-heading-spacer" aria-hidden="true" />
                                            )}
                                            <h3>{item.title}</h3>
                                            {item.rightIcon ? (
                                                <img
                                                    className={`info-heading-icon info-heading-icon-right${item.rightIconLarge ? " info-heading-icon--large" : ""}`}
                                                    src={item.rightIcon}
                                                    alt=""
                                                />
                                            ) : (
                                                <span className="info-heading-spacer" aria-hidden="true" />
                                            )}
                                        </div>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="fourthslice_preview"
                        onClick={() => setIsPlatformPreviewOpen(true)}
                        aria-label={`Открыть изображение для блока ${activePlatformFeature.title}`}
                    >
                        <img
                            key={activePlatformFeature.title}
                            className={`fourthslice_preview-image ${activePlatformFeature.platformImageClassName}`}
                            src={activePlatformFeature.platformImage}
                            alt={activePlatformFeature.title}
                        />
                    </button>
                </div>
            </section>

                        <section id="slice4" className={`sixthslice ${currentSection === 4 ? "sixthslice--active" : ""}`}>
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
                                            <div className={`partner-spotlight_content${partner.isPlaceholder ? " partner-spotlight_content--placeholder" : ""}`}>
                                                {partner.isPlaceholder ? (
                                                    <div className="partner-spotlight_placeholder">{partner.name}</div>
                                                ) : (
                                                    <>
                                                        <div className="partner-spotlight_avatar">
                                                            <img src={panda} alt={partner.name} />
                                                        </div>
                                                        <div className="partner-spotlight_name">{partner.name}</div>
                                                        <p className="partner-spotlight_role">{partner.role}</p>
                                                        <p className="partner-spotlight_title">{partner.title}</p>
                                                        <p className="partner-spotlight_text">{partner.text}</p>
                                                    </>
                                                )}
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
                                    onScroll={() => {
                                        recenterTeamTrack();
                                        updateActiveTeamCard();
                                    }}
                                    onMouseDown={(event) => handleTeamPointerDown(event.clientX)}
                                    onMouseMove={(event) => handleTeamPointerMove(event.clientX)}
                                    onMouseUp={handleTeamPointerUp}
                                    onMouseLeave={handleTeamPointerUp}
                                    onTouchStart={(event) => handleTeamPointerDown(event.touches[0].clientX)}
                                    onTouchMove={(event) => handleTeamPointerMove(event.touches[0].clientX)}
                                    onTouchEnd={handleTeamPointerUp}
                                >
                                    {loopedTeamMembers.map((member) => (
                                        <div
                                            key={member.key}
                                            className={`team-card${activeTeamCardKey === member.key ? " is-active" : ""}`}
                                            data-card-key={member.key}
                                        >
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

                        <section id="slice7" className="footerslice">
                            <div className="footerslice_content">
                                <div className="footerslice_info">
                                    <h2>ООО “КЦТHack”</h2>
                                    <p className="footerslice_info-line">ИНН: 7777777777</p>
                                    <p className="footerslice_info-line">Актуальные сведения о проекте деятельности фирмы в IT-сфере</p>
                                    <p className="footerslice_info-note">
                                        Сайт защищён сервисом ....... (.....),
                                        <br />
                                        который может обрабатывать IP- адрес и иные технические данные пользователей для защиты веб-форм от спама и автоматических отправок.
                                    </p>
                                </div>
                                <div className="footerslice_right">
                                    <div className="footerslice_subscribe">
                                        <div className="footerslice_subscribe-copy">
                                            <h3>Войдите в мир КЦТхак</h3>
                                            <p>Анонсы предстаящих ивентов, нетворкинг сообщество и публикации</p>
                                        </div>
                                        <a
                                            className="footerslice_subscribe-button"
                                            href="https://t.me/kcthack"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Подписаться
                                        </a>
                                    </div>
                                    <div className="footerslice_contacts">
                                        <a href="mailto:kcthack@mail.ru">кцтhack@mail.ru</a>
                                        <a href="tel:+75671230000">+7 (567) 123-00-00</a>
                                    </div>
                                </div>
                                <div className="footerslice_bottom">
                                    <div className="footerslice_copy">©2021-2026 АНПОО "Колледж Цифровых Технологий"</div>
                                    <div className="footerslice_links">
                                        <span>Политика конфидециальности</span>
                                        <span>Условия и положения</span>
                                    </div>
                                </div>
                                <div className="footerslice_art" aria-hidden="true">
                                    <img className="footerslice_orange" src={footerOrange} alt="" />
                                    <img className="footerslice_purple" src={footerPurple} alt="" />
                                </div>
                            </div>
                        </section>

                        {isPlatformPreviewOpen ? (
                            <div
                                className="platform-preview-modal"
                                role="dialog"
                                aria-modal="true"
                                aria-label={activePlatformFeature.title}
                                onClick={() => setIsPlatformPreviewOpen(false)}
                            >
                                <button
                                    type="button"
                                    className="platform-preview-modal_close"
                                    onClick={() => setIsPlatformPreviewOpen(false)}
                                    aria-label="Закрыть полноэкранное изображение"
                                >
                                    ×
                                </button>
                                <div
                                    className="platform-preview-modal_inner"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <img
                                        className="platform-preview-modal_image"
                                        src={activePlatformFeature.platformImage}
                                        alt={activePlatformFeature.title}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                );
            }
