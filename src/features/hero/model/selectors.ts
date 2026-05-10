import { createSelector } from "@reduxjs/toolkit";
import type { HeroState } from "./Types";

type State = {
  hero: HeroState;
};

const root = (state: State) => state.hero;

const selectActiveCard = createSelector([root], (hero) => hero.activeCard);
const selectActiveTopBlock = createSelector([root], (hero) => hero.activeTopBlock);
const selectCarouselOffset = createSelector([root], (hero) => hero.carouselOffset);
const selectCurrentSection = createSelector([root], (hero) => hero.currentSection);
const selectSixthsliceData = createSelector([root], (hero) => hero.sixthsliceData);
const selectFeaturesContent = createSelector([root], (hero) => hero.featuresContent);
const selectTopBlockContent = createSelector([root], (hero) => hero.topBlockContent);

export const selectors = {
    root,
    selectActiveCard,
    selectActiveTopBlock,
    selectCarouselOffset,
    selectCurrentSection,
    selectSixthsliceData,
    selectFeaturesContent,
    selectTopBlockContent,
};
