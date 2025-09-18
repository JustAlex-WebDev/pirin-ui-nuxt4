<template>
  <LoginPage />
</template>

<script setup lang="ts">
//
// Imports
//
import LoginPage from "~/components/login-page/template/LoginPage.vue";

//
// Metadata
//

definePageMeta({
  layout: "auth",
  title: "Влизане",
  requiresAuth: false,
});

useHead({
  title: "Влизане - Система Пирин",
  meta: [
    {
      name: "description",
      content:
        "Влезте в системата Пирин за управление на лабораторна информация",
    },
  ],
});
</script>
