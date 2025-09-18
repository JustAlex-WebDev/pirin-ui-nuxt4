<template>
  <v-row>
    <!-- Content Section -->
    <v-col cols="12" md="4" class="d-flex align-center justify-center">
      <LoginContent
        title="Пирин"
        subtitle="Сървър осигуряващ интеграция между ЛИС iLab и НЗИС"
        description="Пирин е софтуерен продукт на SKYWARE Group осигуряващ 100%-ва интеграция между ЛИС iLab и НЗИС в реално време. Пирин е напълно автоматичен и при правилна конфигурация не изисква никаква администраторска интеракция."
        loginButtonText="Вход в Пирин"
      />
    </v-col>

    <!-- Illustration Section -->
    <v-col cols="12" md="8" class="d-flex align-center justify-center">
      <LoginIllustration
        image-src="/img/forest-sm.jpg"
        image-alt="Пирин – илюстрация на гора"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//
// Imports
//
import LoginIllustration from "../molecules/LoginIllustration.vue";
import LoginContent from "./LoginContent.vue";
</script>
