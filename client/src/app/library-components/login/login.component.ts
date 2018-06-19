import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OktaAuthWrapper } from "../../shared/auth/okta.auth.wrapper";
import { OAuthService } from "angular-oauth2-oidc";
import { OktaAuthService } from "@okta/okta-angular";
@Component({
  selector: "library-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  loginForm: FormGroup;
  isAuthenticated: boolean;

  constructor(
    // public oktaAuth: OktaAuthService,
    // private oktaAuthWrapper: OktaAuthWrapper,
    private formBuilder: FormBuilder,
    private oauthService: OAuthService
  ) {}
  // async ngOnInit() {
  //   // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  //   this.buildForm();
  // }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    console.log(this.oauthService.getAccessToken());
    const claims = this.oauthService.getIdentityClaims();
    console.log(claims);
    if (!claims) {
      return null;
    }

    return claims["name"];
  }

  // onSubmit() {
  //   this.oktaAuthWrapper
  //     .login(
  //       this.loginForm.get("username").value,
  //       this.loginForm.get("password").value
  //     )
  //     .catch(err => console.error("error logging in", err));
  // }
}
