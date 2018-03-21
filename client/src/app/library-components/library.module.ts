// Native angular
import { NgModule } from "@angular/core";
// Routing
import { LibraryRoutingModule } from "./library.routing";
// Components
import { LoginComponent } from "./login/login.component";
import { BookListComponent } from "./book-list/book-list.component";
// Shared Modules
import { SharedModules } from "./../shared/shared.module";
// Service
import { LibraryService } from "./library.service";

@NgModule({
  declarations: [LoginComponent, BookListComponent],
  imports: [SharedModules, LibraryRoutingModule],
  providers: [LibraryService]
})
export class LibraryModule {}
