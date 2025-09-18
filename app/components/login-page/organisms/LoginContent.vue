<template>
  <div class="d-flex flex-column ga-2">
    <!-- Heading -->
    <span class="text-h2 font-weight-bold">
      {{ title }}
    </span>

    <!-- Subheading -->
    <span class="text-h6 mb-2 font-weight-bold">
      {{ subtitle }}
    </span>

    <!-- Description -->
    <p class="text-body-1 mb-2">
      {{ description }}
    </p>

    <!-- Login Button -->
    <v-btn
      :elevation="0"
      color="primary"
      rounded="lg"
      size="large"
      prepend-icon="mdi-login"
      @click="login()"
    >
      {{ loginButtonText }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
//
// Composables
//
const { login } = useAuth();

//
// Props
//
interface Props {
  title: string;
  subtitle: string;
  description: string;
  loginButtonText: string;
}

defineProps<Props>();
</script>
