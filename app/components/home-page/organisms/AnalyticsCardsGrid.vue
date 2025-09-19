<template>
  <v-row class="my-2">
    <!-- Loading Skeletons -->
    <template v-if="loading">
      <v-col
        v-for="i in cards"
        :key="`skeleton-${i}`"
        cols="12"
        :lg="getCardSize(cards.length)"
        :md="cards.length > 3 ? '6' : '4'"
        sm="6"
        xs="12"
      >
        <AnalyticsCardSkeleton />
      </v-col>
    </template>

    <!-- Actual Cards -->
    <template v-else>
      <v-col
        v-for="card in cards"
        :key="card.key"
        cols="12"
        :lg="getCardSize(cards.length)"
        :md="cards.length > 3 ? '6' : '4'"
        sm="6"
        xs="12"
      >
        <AnalyticsCard
          :card-key="card.key"
          :title="card.title"
          :value="card.value"
          :display-value="card.displayValue"
          :icon="card.icon"
          :background-color="card.backgroundColor"
          :show-more-info="showMoreInfo"
          :more-info-text="moreInfoText"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script setup lang="ts">
//
// Imports
//
import AnalyticsCard from "../molecules/AnalyticsCard.vue";
import AnalyticsCardSkeleton from "../molecules/AnalyticsCardSkeleton.vue";

//
// Types
//
interface AnalyticsCardData {
  key: string;
  title: string;
  value: number;
  displayValue?: string;
  icon: string;
  backgroundColor: string;
}

//
// Props
//
interface Props {
  cards: AnalyticsCardData[];
  loading?: boolean;
  showMoreInfo?: boolean;
  moreInfoText?: string;
  skeletonCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showMoreInfo: true,
  moreInfoText: "Повече информация",
  skeletonCount: 3,
});

//
// Methods
//
const getCardSize = (cardCount: number): string => {
  if (cardCount === 3) return "4";
  if (cardCount === 4) return "3";
  return "4";
};
</script>
