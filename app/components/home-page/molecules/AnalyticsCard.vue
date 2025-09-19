<template>
  <v-card
    class="d-flex flex-column text-white fill-height"
    :color="backgroundColor"
    elevation="0"
    :data-testid="`stats-card-${cardKey}`"
  >
    <!-- Card Content -->
    <v-card-text class="py-2 flex-grow-1">
      <h1 class="pb-0">
        <v-icon size="26" :icon="icon" class="mr-2" />
        <span>{{ displayValue }}</span>
      </h1>

      <small class="text-white font-weight-bold opacity-80">
        {{ title }}
      </small>
    </v-card-text>

    <v-divider class="text-white" />

    <!-- Actions -->
    <v-card-actions class="justify-center py-0" v-if="showMoreInfo">
      <v-btn
        block
        variant="text"
        size="small"
        color="white"
        @click="handleCardAction(cardKey)"
      >
        {{ moreInfoText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
//
// Composables
//
const { handleCardAction } = useHomePage();

//
// Props
//
interface Props {
  cardKey: string;
  title: string;
  value: number;
  displayValue?: string;
  icon: string;
  backgroundColor: string;
  showMoreInfo?: boolean;
  moreInfoText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  displayValue: "",
  showMoreInfo: true,
  moreInfoText: "Повече информация",
});

//
// Computed Properties
//
const displayValue = computed(() => {
  return props.displayValue || props.value.toString();
});
</script>
