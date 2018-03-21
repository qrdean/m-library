// Native angular modules
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { LoginComponent } from "./login/login.component";
import { BookListComponent } from "./book-list/book-list.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "books",
    component: BookListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LibraryRoutingModule {}
