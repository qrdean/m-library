import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
// Material
import { MatToolbarModule } from "@angular/material";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, BrowserModule, MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
