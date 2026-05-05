import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";

export const selectHero = (state: RootState) => state.hero;
export const selectSixthsliceData = createSelector(selectHero, (hero) => hero.sixthsliceData);
export const selectFeaturesContent = createSelector(selectHero, (hero) => hero.featuresContent);
