import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../shared/ui/Hero/Hero.scss";
import {
    setCurrentSection,
    selectors,
} from "../../../features/hero";

import Danil from "../../../shared/assets/Danil.png";
import Ksenia from "../../../shared/assets/Ksenia.png";
import Maria from "../../../shared/assets/Maria.png";

const PARTNER_APPLICATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf8lYYBIzyrj-PJ3Vq2rscPzG_aRkwe_f6eJZFF4Mgxo6CGUQ/viewform?usp=publish-editor";

export const HeroSection = () => {
    const MAX_SECTION = 6;
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
    const PARTNER_SPOTLIGHT = {
        name: "Максим Сергеевич",
        role: "Директор “Колледжа Цифровых Технологий” ИТ-колледж",
        title: "Максим Сергеевич выражает благодарность команде КЦТхак за проделанную работу",
        text: "Спасибо КЦТхак за эффективное и профессиональную платформу со своей созданной экосистемой...",
    };
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
    const [activePartnerSlide, setActivePartnerSlide] = useState(0);
    const [activeAudienceIndex, setActiveAudienceIndex] = useState(0);
    const infoScrollInnerRef = useRef<HTMLDivElement | null>(null);
    const platformFeatureRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activePlatformFeatureIndex, setActivePlatformFeatureIndex] = useState(0);

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
                            <div className="platform-title sixthslice_partner-heading">Наши партнёры</div>
                            <div className="sixthslice_carousel">
                                <button
                                    type="button"
                                    className="sixthslice_arrow"
                                    onClick={() => setActivePartnerSlide((slide) => (slide - 1 + 2) % 2)}
                                    aria-label="Предыдущий слайд"
                                >
                                    ←
                                </button>
                                <div className="sixthslice_inner" aria-live="polite">
                                    {activePartnerSlide === 0 ? (
                                        <article className="partner-spotlight sixthslice_slide" key="partner">
                                            <div className="partner-spotlight_content">
                                                <div className="partner-spotlight_avatar" aria-hidden="true">{PARTNER_SPOTLIGHT.name.slice(0, 1)}</div>
                                                <div className="partner-spotlight_name">{PARTNER_SPOTLIGHT.name}</div>
                                                <p className="partner-spotlight_role">{PARTNER_SPOTLIGHT.role}</p>
                                                <p className="partner-spotlight_title">{PARTNER_SPOTLIGHT.title}</p>
                                                <p className="partner-spotlight_text">{PARTNER_SPOTLIGHT.text}</p>
                                            </div>
                                        </article>
                                    ) : (
                                        <article className="sixthslice_slide sixthslice_invitation" key="invitation">
                                            <div className="sixthslice_invitation-card">
                                                <p>Здесь могли бы быть вы</p>
                                                <a className="sixthslice_partner-link" href={PARTNER_APPLICATION_URL} target="_blank" rel="noreferrer">
                                                    Стать нашим партнером
                                                </a>
                                            </div>
                                        </article>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    className="sixthslice_arrow"
                                    onClick={() => setActivePartnerSlide((slide) => (slide + 1) % 2)}
                                    aria-label="Следующий слайд"
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
                                <article className="team-member">
                                    <img className="team-member_image" src={Danil} alt="Хасанов Данил" loading="lazy" decoding="async" />
                                    <div className="team-member_name">Хасанов Данил</div>
                                    <div className="team-member_direction">Back-End</div>
                                    <div className="team-member_role">разработчик</div>
                                </article>
                                <article className="team-member">
                                    <img className="team-member_image" src={Ksenia} alt="Качура Ксения" loading="lazy" decoding="async" />
                                    <div className="team-member_name">Качура Ксения</div>
                                    <div className="team-member_direction">Front-End</div>
                                    <div className="team-member_role">разработчик</div>
                                </article>
                                <article className="team-member">
                                    <img className="team-member_image" src={Maria} alt="Хомутова Мария" loading="lazy" decoding="async" />
                                    <div className="team-member_name">Хомутова Мария</div>
                                    <div className="team-member_direction">Организатор</div>
                                    <div className="team-member_role">Project Manager</div>
                                </article>
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
