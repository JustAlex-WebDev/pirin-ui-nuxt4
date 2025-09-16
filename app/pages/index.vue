<template>
  <v-row>
    <v-col cols="12">
      <v-sheet class="pa-6 mb-0" elevation="1" rounded>
        <h1 class="text-h4 mb-2 d-flex align-center ga-2">
          <!-- Icon -->
          <v-icon :icon="'mdi-home-outline'" size="x-small" color=""></v-icon>

          <!-- Title -->
          <span>Начало</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-subtitle-1 text-medium-emphasis">
          Добре дошли в началната страница на Пирин!
        </p>

        <!-- Log In Button -->
        <v-btn
          v-if="!isAuthenticated"
          @click="logIn(baseUrl)"
          color="primary"
          prepend-icon="mdi-login-variant"
        >
          Login
        </v-btn>

        <!-- Logout Button -->
        <v-btn
          v-else
          @click="logOut()"
          color="error"
          prepend-icon="mdi-logout-variant"
        >
          Logout
        </v-btn>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//
// Imports
//
import { useAuthClient } from "~/lib/auth-client";

//
// Composables
//
const { logIn, logOut, isAuthenticated } = useAuthClient();

//
// State
//
const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

//
// Metadata
//
definePageMeta({
  title: "Начало",
});
</script>
