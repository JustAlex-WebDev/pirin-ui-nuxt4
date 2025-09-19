<template>
  <v-tabs
    v-model="internalActiveTab"
    :color="color"
    :bg-color="backgroundColor"
    :density="density"
    :grow="grow"
    class="mb-4"
  >
    <v-tab
      v-for="tab in tabs"
      :key="tab.key"
      :value="tab.key"
      :prepend-icon="tab.icon"
    >
      {{ tab.label }}
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
interface Tab {
  key: string;
  label: string;
  icon?: string;
}

interface Props {
  tabs: Tab[];
  modelValue: string;
  color?: string;
  backgroundColor?: string;
  density?: "default" | "comfortable" | "compact";
  grow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: "primary",
  backgroundColor: "surface",
  density: "default",
  grow: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const internalActiveTab = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>
