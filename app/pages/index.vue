<template>
  <!-- Page Header -->
  <AnalyticsPageHeader
    :title="pageConfig.header.title"
    :subtitle="pageConfig.header.subtitle"
    :description="pageConfig.header.description"
  />

  <!-- Analytics Cards Grid -->
  <AnalyticsCardsGrid
    :cards="analyticsCards"
    :loading="loading"
    moreInfoText="Повече информация"
    :showMoreInfo="true"
  />

  <!-- Table Section Header -->
  <AnalyticsSectionHeader
    :title="pageConfig.tableSection.title"
    :description="pageConfig.tableSection.description"
  />

  <!-- Analytics Table Component -->
  <AnalyticsTable
    :items="data || []"
    :headers="tableHeaders"
    :loading="loading"
    item-key="visitDate"
  />
</template>

<script setup lang="ts">
//
// Imports
//
import AnalyticsPageHeader from "~/components/home-page/molecules/AnalyticsPageHeader.vue";
import AnalyticsSectionHeader from "~/components/home-page/molecules/AnalyticsSectionHeader.vue";
import AnalyticsTable from "~/components/home-page/molecules/AnalyticsTable.vue";
import AnalyticsCardsGrid from "~/components/home-page/organisms/AnalyticsCardsGrid.vue";

//
// Composables
//
const {
  loading,
  data,
  analyticsCards,
  pageConfig,
  tableHeaders,
  fetchLast5Days,
} = useHomePage();

//
// Lifecycle
//
onMounted(() => {
  fetchLast5Days();
});

//
// Metadata
//
definePageMeta({
  title: "Начало",
});
</script>
