<template>
  <v-row no-gutters class="fill-height">
    <!-- Left Side - Login Form -->
    <v-col cols="12" class="d-flex align-center justify-center">
      <v-container class="pa-8">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="10" lg="8">
            <v-card elevation="0" class="transparent">
              <v-card-text class="pa-0">
                <!-- Logo/Brand -->
                <div class="text-center mb-8">
                  <v-img
                    src="/pirin-icon.png"
                    alt="Pirin Logo"
                    width="80"
                    height="80"
                    class="mx-auto mb-4"
                  />
                  <h1 class="text-h3 font-weight-bold text-primary mb-2">
                    Добре дошли
                  </h1>
                  <p class="text-h6 text-medium-emphasis">
                    Влезте в системата Пирин
                  </p>
                </div>

                <!-- Loading State -->
                <div v-if="isLoading" class="text-center py-8">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="64"
                    class="mb-4"
                  />
                  <p class="text-body-1">Зареждане...</p>
                </div>

                <!-- Login Form -->
                <div v-else>
                  <!-- Error Alert -->
                  <v-alert
                    v-if="error"
                    type="error"
                    class="mb-6"
                    closable
                    @click:close="clearError"
                  >
                    {{ error }}
                  </v-alert>

                  <!-- Login Button -->
                  <v-btn
                    color="primary"
                    size="x-large"
                    block
                    rounded="lg"
                    class="mb-4 text-none font-weight-bold"
                    :loading="signingIn"
                    @click="handleLogin"
                  >
                    <v-icon start>mdi-login</v-icon>
                    Влизане с Keycloak
                  </v-btn>

                  <!-- Info -->
                  <v-card variant="tonal" color="info" class="mt-6">
                    <v-card-text>
                      <v-icon start color="info">mdi-information</v-icon>
                      Използвайте вашите корпоративни данни за влизане в
                      системата.
                    </v-card-text>
                  </v-card>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//
// Composables
//
const { init, login, isAuthenticated, error, clearError } = useAuth();

//
// State
//
const isLoading = ref(true);
const signingIn = ref(false);

//
// Methods
//
const handleLogin = async () => {
  signingIn.value = true;
  try {
    // Pass the intended redirect URL
    await login(window.location.origin + "/");
  } catch (err) {
    console.error("Login failed:", err);
  } finally {
    signingIn.value = false;
  }
};

//
// Lifecycle
//
onMounted(async () => {
  try {
    // Check if already authenticated
    await init("check-sso");

    if (isAuthenticated.value) {
      // Redirect to home if already logged in
      await navigateTo("/", { replace: true });
    }
  } catch (err) {
    console.error("Auth check failed:", err);
  } finally {
    isLoading.value = false;
  }
});

//
// Meta
//
definePageMeta({
  layout: "auth",
  title: "Влизане",
  requiresAuth: false, // Important: login page doesn't require auth
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
