export interface User {
  name?: string;
  email?: string;
  preferred_username?: string;
  roles?: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isInitialized: boolean;
  error: Error | null;
}
