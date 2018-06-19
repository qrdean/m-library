import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Material
import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule
} from "@angular/material";
// Okta
import { OktaAuthWrapper } from "./auth/okta.auth.wrapper";
import { AuthGuard } from "./auth/auth.guard.service";

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [OktaAuthWrapper, AuthGuard]
})
export class SharedModules {}
