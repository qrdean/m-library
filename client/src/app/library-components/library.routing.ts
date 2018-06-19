// Native angular modules
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { LoginComponent } from "./login/login.component";
import { BookListComponent } from "./book-list/book-list.component";
import { AuthGuard } from "../shared/auth/auth.guard.service";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
    // canActivate: [AuthGuard]
  },
  {
    path: "books",
    component: BookListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LibraryRoutingModule {}
