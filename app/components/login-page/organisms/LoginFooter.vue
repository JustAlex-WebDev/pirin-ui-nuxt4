<template>
  <v-footer class="px-6 py-2 bg-grey-lighten-4" app>
    <div class="d-flex align-center justify-space-between w-100">
      <!-- Company Logo -->
      <v-btn
        :href="companyUrl"
        target="_blank"
        variant="plain"
        class="pa-2"
        :ripple="false"
      >
        <v-img
          :src="logoSrc"
          :lazy-src="logoSrc"
          :alt="logoAlt"
          contain
          height="24"
          width="auto"
          class="opacity-75 transition-opacity"
        >
          <!-- Loading placeholder -->
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular indeterminate color="grey" size="16" />
            </div>
          </template>
        </v-img>
      </v-btn>

      <v-spacer />

      <!-- App Version -->
      <VersionBadge :version="version" />
    </div>
  </v-footer>
</template>

<script setup lang="ts">
//
// Imports
//
import VersionBadge from "../molecules/VersionBadge.vue";

//
// Props
//
interface Props {
  logoSrc: string;
  logoAlt: string;
  companyUrl: string;
  version: string;
}

defineProps<Props>();
</script>
