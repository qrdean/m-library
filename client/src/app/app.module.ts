import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// Application Modules
import { AppRoutingModule } from "./app.routing";
import { LibraryModule } from "./library-components/library.module";
import { SharedModules } from "./shared/shared.module";
// Bootstrap Components
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    LibraryModule,
    BrowserModule,
    SharedModules,
    AppRoutingModule // must be last
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
