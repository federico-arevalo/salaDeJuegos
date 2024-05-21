import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideHttpClient } from '@angular/common/http';

export const firebase = {
  apiKey: 'AIzaSyB7LEFFtXHKQz3RlMUCafXxbbbvxY2Po3I',
  authDomain: 'federicoarevalosaladejuegos.firebaseapp.com',
  projectId: 'federicoarevalosaladejuegos',
  storageBucket: 'federicoarevalosaladejuegos.appspot.com',
  messagingSenderId: '479732795335',
  appId: '1:479732795335:web:dd64887a06d50e6fe77be2',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'federicoarevalosaladejuegos',
          appId: '1:479732795335:web:dd64887a06d50e6fe77be2',
          storageBucket: 'federicoarevalosaladejuegos.appspot.com',
          apiKey: 'AIzaSyB7LEFFtXHKQz3RlMUCafXxbbbvxY2Po3I',
          authDomain: 'federicoarevalosaladejuegos.firebaseapp.com',
          messagingSenderId: '479732795335',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    {
      provide: FIREBASE_OPTIONS,
      useValue: {
        apiKey: 'AIzaSyB7LEFFtXHKQz3RlMUCafXxbbbvxY2Po3I',
        authDomain: 'federicoarevalosaladejuegos.firebaseapp.com',
        projectId: 'federicoarevalosaladejuegos',
        storageBucket: 'federicoarevalosaladejuegos.appspot.com',
        messagingSenderId: '479732795335',
        appId: '1:479732795335:web:dd64887a06d50e6fe77be2',
      },
    },
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
  ],
};
