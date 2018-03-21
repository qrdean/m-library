import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
// Material
import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule
} from "@angular/material";
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
