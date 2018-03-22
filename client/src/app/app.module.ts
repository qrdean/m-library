import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// Okta
import { OktaAuthModule, OktaCallbackComponent } from "@okta/okta-angular";
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

const appRoutes: Routes = [
  {
    path: "implicit/callback",
    component: OktaCallbackComponent
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    LibraryModule,
    BrowserModule,
    SharedModules,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(config),
    AppRoutingModule // must be last
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
