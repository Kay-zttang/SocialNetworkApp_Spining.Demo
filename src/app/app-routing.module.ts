import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import { PostsComponent } from './main/posts/posts.component';

const routes: Routes = [{path:'auth', component: AuthComponent},
                        {path:'main', component: MainComponent},
                        {path:'profile', component: ProfileComponent},
                        {path:'registeration', component: RegisterationComponent},
                        {path:'posts', component: PostsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
