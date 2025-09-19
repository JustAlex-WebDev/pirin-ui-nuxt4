<template>
  <v-row>
    <div
      class="w-100 d-flex flex-wrap ga-8 align-start align-sm-center justify-start justify-sm-center px-4"
    >
      <div style="max-width: 380px">
        <LoginContent
          title="Пирин"
          subtitle="Сървър осигуряващ интеграция между ЛИС iLab и НЗИС"
          description="Пирин е софтуерен продукт на SKYWARE Group осигуряващ 100%-ва интеграция между ЛИС iLab и НЗИС в реално време. Пирин е напълно автоматичен и при правилна конфигурация не изисква никаква администраторска интеракция."
          loginButtonText="Вход в Пирин"
        />
      </div>

      <div class="ml-0 ml-md-16 pl-0 pl-lg-16">
        <LoginIllustration
          image-src="/img/forest-sm.jpg"
          image-alt="Пирин – илюстрация на гора"
        />
      </div>
    </div>
  </v-row>
</template>

<script setup lang="ts">
//
// Imports
//
import LoginIllustration from "../molecules/LoginIllustration.vue";
import LoginContent from "./LoginContent.vue";
</script>
