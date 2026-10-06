import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../shared/ui/Hero/Hero.scss";
import {
    setCurrentSection,
    selectors,
} from "../../../features/hero";

import Maria from "../../../shared/assets/Maria.png";
import Danil from "../../../shared/assets/Danil.png";
import Ksenia from "../../../shared/assets/Ksenia.png";



export const HeroSection = () => {
    const MAX_SECTION = 6;
    const PARTNER_APPLICATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf8lYYBIzyrj-PJ3Vq2rscPzG_aRkwe_f6eJZFF4Mgxo6CGUQ/viewform?usp=publish-editor";
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
        { name: "Maria", image: Maria },
        { name: "Danil", image: Danil },
        { name: "Ksenia", image: Ksenia },
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
        },
        {
            title: "Собери свою команду",
            text: "Находи единомышленников с нужным стеком, создавай команду и берись за проекты вместе.",
        },
        {
            title: "Прокачай портфолио",
            text: "Добавляй реальные проекты в профиль и показывай работодателям на что ты способен.",
        },
        {
            title: "Взойди на вершину\nрейтинга",
            text: "Участвуй в событиях, получай баллы и поднимайся в таблице лидеров сообщества.",
        },
        {
            title: "Следи за расписанием",
            text: "Все воркшопы, хакатоны, митапы и тренировки в одном календаре — ничего не пропустишь.",
        },
        {
            title: "Стань частью сообщества",
            text: "Общайся с разработчиками, дизайнерами и PM-ами, которые горят IT так же, как ты.",
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

    const scrollTrackToAdjacentCard = useCallback((
        track: HTMLDivElement | null,
        selector: string,
        direction: 1 | -1,
        afterScroll?: () => void
    ) => {
        if (!track) {
            return;
        }

        const cards = Array.from(track.querySelectorAll<HTMLElement>(selector));

        if (!cards.length) {
            return;
        }

        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let nearestCardIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(trackCenter - cardCenter);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestCardIndex = index;
            }
        });

        const targetIndex = Math.min(cards.length - 1, Math.max(0, nearestCardIndex + direction));
        const targetCard = cards[targetIndex];

        if (!targetCard) {
            return;
        }

        const targetScrollLeft = targetCard.offsetLeft + targetCard.offsetWidth / 2 - track.clientWidth / 2;

        track.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: "smooth",
        });

        afterScroll?.();
    }, []);

    const scrollTeamByCard = useCallback((direction: 1 | -1) => {
        const track = teamCarouselTrackRef.current;

        recenterTeamTrack();
        scrollTrackToAdjacentCard(track, ".team-card", direction, updateActiveTeamCard);
    }, [recenterTeamTrack, scrollTrackToAdjacentCard, updateActiveTeamCard]);

    const showPrevTeamMember = () => {
        scrollTeamByCard(-1);
    };

    const showNextTeamMember = () => {
        scrollTeamByCard(1);
    };

    const scrollPartnerByCard = useCallback((direction: 1 | -1) => {
        const track = partnerCarouselTrackRef.current;

        recenterPartnerTrack();
        scrollTrackToAdjacentCard(track, ".partner-spotlight", direction);
    }, [recenterPartnerTrack, scrollTrackToAdjacentCard]);

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
        const features = platformFeatureRefs.current.filter((element): element is HTMLDivElement => element !== null);

        if (!features.length) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
            const nextActiveIndex = features.indexOf(visibleEntry?.target as HTMLDivElement);

            if (nextActiveIndex >= 0) {
                setActivePlatformFeatureIndex((previous) => previous === nextActiveIndex ? previous : nextActiveIndex);
            }
        }, { rootMargin: "-22% 0px -48% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });

        features.forEach((feature) => observer.observe(feature));
        return () => observer.disconnect();
    }, []);

    const navigate = useNavigate();

    return (
        <div className={`sections-container ${currentSection === MAX_SECTION ? "sections-container--free-scroll" : ""}`}>
            <section id="slice1" className="hero">
                <a className={`hero_logo ${currentSection >= 2 ? 'fixed-on-scroll' : ''} hero_wordmark`} href="/" aria-label="KTSThack — на главную">KTST<span>hack</span></a>

                <div className="hero_content section-container">
                    <div className="hero_intro">
                        <p className="hero_intro_text">Проекты и люди для твоего IT-портфолио</p>
                        <p className="hero_intro_description">КЦТхак объединяет студентов, экспертов и компании вокруг реальных задач, хакатонов и командной работы.</p>
                        <button className={`hero_button ${currentSection >= 2 ? 'move-to-nav' : ''}`} onClick={() => navigate('/auth')}>
                            Присоединиться к нашему<br />миру КЦТхак
                        </button>
                    </div>
                </div>
            </section>

            <section id="slice2" className={`secondslice${currentSection === 2 ? " secondslice--active" : ""}`}>
                <div className="secondslice_inner section-container">
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
                <div className="section-container fourthslice_container">
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
                                            <span className="info-heading-spacer" aria-hidden="true" />
                                            <h3>{item.title}</h3>
                                            <span className="info-heading-spacer" aria-hidden="true" />
                                        </div>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </section>

                        <section id="slice4" className={`sixthslice ${currentSection === 4 ? "sixthslice--active" : ""}`}>
                            <div className="section-container spotlight-section-container">
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
                                            <div className={`partner-spotlight_content${partner.isPlaceholder ? " partner-spotlight_content--placeholder" : ""}`}>
                                                {partner.isPlaceholder ? (
                                                    <>
                                                        <a
                                                            className="partner-spotlight_action"
                                                            href={PARTNER_APPLICATION_URL}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            Стать Нашим Партнёром
                                                        </a>
                                                        <div className="partner-spotlight_placeholder">{partner.name}</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="partner-spotlight_avatar" aria-hidden="true">{partner.name.slice(0, 1)}</div>
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
                            </div>
                        </section>

                        <section id="slice5" className="teamslice">
                            <div className="section-container team-section-container">
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
                                            {member.member.image ? <img className="team-card_image" src={member.member.image} alt={member.member.name} loading="lazy" decoding="async" /> : <span className="team-card_initials" aria-label={member.member.name}>{member.member.name.slice(0, 1)}</span>}
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
                            </div>
                        </section>

                        <section id="slice6" className="faqslice">
                            <div className="section-container faq-section-container">
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
                            </div>
                        </section>

                    </div>
                );
            }
