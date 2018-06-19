import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OktaAuthWrapper } from "../../shared/auth/okta.auth.wrapper";
import { OAuthService } from "@okta/okta-auth-js";

@Component({
  selector: "library-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private oktaAuthWrapper: OktaAuthWrapper,
    private formBuilder: FormBuilder // private oauthService: OAuthService
  ) {}
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    this.oktaAuthWrapper
      .login(
        this.loginForm.get("username").value,
        this.loginForm.get("password").value
      )
      .catch(err => console.error("error logging in", err));
  }
}
