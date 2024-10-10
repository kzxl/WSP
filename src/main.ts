/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './config';
import { LoginComponent } from './component/login';

bootstrapApplication(LoginComponent, appConfig)
  .catch((err) => console.error(err));
