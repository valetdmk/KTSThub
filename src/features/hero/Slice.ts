import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store/store";

interface FeatureItem {
    img: string;
    title: string;
    desc: string;
}

interface FeaturesContent {
    left: FeatureItem[];
    right: FeatureItem[];
}

interface TopBlockContent {
    text: string;
    title: string;
    desc: string;
}

interface SixthSliceItem {
    text: string;
    title: string;
    desc: string;
}

interface HeroState {
    activeCard: number | null;
    activeTopBlock: number | null;
    carouselOffset: number;
    currentSection: number;
    leftBlocks: string[];
    rightBlocks: string[];
    sixthsliceData: Record<number, SixthSliceItem[]>;
    topBlockContent: Record<number, TopBlockContent>;
    featuresContent: Record<number, FeaturesContent>;
};

const initialState: HeroState = {
    activeCard: null,
    activeTopBlock: 1,
    carouselOffset: 0,
    currentSection: 1,
    leftBlocks: [],
    rightBlocks: [],
    sixthsliceData: {
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
    },
    topBlockContent: {
        1: { text: "TEXT1", title: "PM/UX-UI дизайнер/Глава проекта", desc: "Главное лицо проекта бла бла бла бла сделал там то то се пятое десятое" },
        2: { text: "TEXT2", title: "Backend разработка/Команда", desc: "Команда разработчиков, которые сделали проект" },
        3: { text: "TEXT3", title: "QA Инженер/Тестировщик", desc: "Специалист по тестированию и контролю каче��тва" },
    },
    featuresContent: {
        1: {
            left: [
                { img: "", title: "Реальный опыт IT-индустрии", desc: "Личный кабинет с вашими активностями." },
                { img: "", title: "Студентам", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: "", title: "Опыт командной работы", desc: "IT-специалисты команды и проекты в одном месте" },
            ],
            right: [
                { img: "", title: " Контакт с HR компаний", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: "", title: "Рабочие проекты в портфолио", desc: "IT-специалисты команды и проекты в одном месте" },
            ]
        },
        2: {
            left: [
                { img: "", title: "Реальный опыт IT-индустрии", desc: "Личный кабинет с вашими активностями." },
                { img: "", title: "Партнёрам", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: "", title: "Опыт командной работы", desc: "IT-специалисты команды и проекты в одном месте" },
            ],
            right: [
                { img: "", title: " Контакт с HR компаний", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: "", title: "Рабочие проекты в портфолио", desc: "IT-специалисты команды и проекты в одном месте" },
            ]
        },
        3: {
            left: [
                { img: "", title: "Реальный опыт IT-индустрии", desc: "Личный кабинет с вашими активностями." },
                { img: "", title: "Судьям", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: "", title: "Опыт командной работы", desc: "IT-специалисты команды и проекты в одном месте" },
            ],
            right: [
                { img: "", title: " Контакт с HR компаний", desc: "IT-специалисты команды и проекты в одном месте" },
                { img: "", title: "Рабочие проекты в портфолио", desc: "IT-специалисты команды и проекты в одном месте" },
            ]
        }
    },
};

const heroSlice = createSlice({
    name: "hero",
    initialState,
    reducers: {
        setActiveCard(state, action: PayloadAction<number | null>) {
            state.activeCard = action.payload;
        },
        setActiveTopBlock(state, action: PayloadAction<number | null>) {
            state.activeTopBlock = action.payload;
        },
        setCarouselOffset(state, action: PayloadAction<number>) {
            state.carouselOffset = action.payload;
        },
        setCurrentSection(state, action: PayloadAction<number>) {
            state.currentSection = action.payload;
        },
        resetHeroCarousel(state) {
            state.carouselOffset = 0;
        },
        setBlocks(state, action: PayloadAction<{ leftBlocks: string[]; rightBlocks: string[] }>) {
            state.leftBlocks = action.payload.leftBlocks;
            state.rightBlocks = action.payload.rightBlocks;
        },
        setImages(state, action: PayloadAction<{ forstudent1: string; forstudent2: string; forstudent3: string; forstudent4: string; forstudentcircle: string }>) {
            const { forstudent1, forstudent2, forstudent3, forstudent4, forstudentcircle } = action.payload;
            state.featuresContent[1].left[0].img = forstudent1;
            state.featuresContent[1].left[1].img = forstudentcircle;
            state.featuresContent[1].left[2].img = forstudent2;
            state.featuresContent[1].right[0].img = forstudent3;
            state.featuresContent[1].right[1].img = forstudent4;
            
            state.featuresContent[2].left[0].img = forstudent1;
            state.featuresContent[2].left[1].img = forstudentcircle;
            state.featuresContent[2].left[2].img = forstudent2;
            state.featuresContent[2].right[0].img = forstudent3;
            state.featuresContent[2].right[1].img = forstudent4;
            
            state.featuresContent[3].left[0].img = forstudent1;
            state.featuresContent[3].left[1].img = forstudentcircle;
            state.featuresContent[3].left[2].img = forstudent2;
            state.featuresContent[3].right[0].img = forstudent3;
            state.featuresContent[3].right[1].img = forstudent4;
        },
    },
});

export const {
    setActiveCard,
    setActiveTopBlock,
    setCarouselOffset,
    setCurrentSection,
    resetHeroCarousel,
    setBlocks,
    setImages,
} = heroSlice.actions;

export const selectHero = (state: RootState) => state.hero;
export const selectSixthsliceData = createSelector(selectHero, (hero) => hero.sixthsliceData);
export const selectFeaturesContent = createSelector(selectHero, (hero) => hero.featuresContent);

export const heroReducer = heroSlice.reducer;