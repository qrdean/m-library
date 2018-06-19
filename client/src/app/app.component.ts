import { Component } from "@angular/core";
import { OAuthService, JwksValidationHandler } from "angular-oauth2-oidc";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    console.log(window.location.origin);
    this.oauthService.redirectUri = "http://localhost:4200/";
    this.oauthService.clientId = "0oaefbpyfyxj0ypa60h7";
    this.oauthService.scope = "openid profile email";
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.issuer =
      "https://dev-399800.oktapreview.com/oauth2/default";
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  title = "My Library";
}
