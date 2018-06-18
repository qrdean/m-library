import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// Okta
import { OktaAuthModule, OktaCallbackComponent } from "@okta/okta-angular";
import { OAuthModule } from "angular-oauth2-oidc";
// Application Modules
import { AppRoutingModule } from "./app.routing";
import { LibraryModule } from "./library-components/library.module";
import { SharedModules } from "./shared/shared.module";
// Bootstrap Components
import { AppComponent } from "./app.component";

const config = {
  issuer: "https://dev-399800.oktapreview.com",
  redirectUri: "http://localhost:4200/implicit/callback",
  clientId: "0oaefbpyfyxj0ypa60h7"
};

// const appRoutes: Routes = [
//   {
//     path: "implicit/callback",
//     component: OktaCallbackComponent
//   }
// ];

@NgModule({
  declarations: [AppComponent],
  imports: [
    LibraryModule,
    BrowserModule,
    FormsModule,
    SharedModules,
    HttpClientModule,
    OAuthModule.forRoot(),
    // RouterModule.forRoot(),
    // OktaAuthModule.initAuth(config),
    AppRoutingModule // must be last
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
