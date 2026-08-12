import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject} from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {credentialsInterceptor} from './credentials-interceptor/credentials-interceptor';


import { routes } from './app.routes';
import {AuthService} from './auth/auth-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.checkSession();
    }),
    provideHttpClient(withInterceptors([credentialsInterceptor]))
  ]
};
