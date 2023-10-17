import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button"; 
import { NgArrayPipesModule } from 'ngx-pipes';
import {MatDividerModule} from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './main/posts/posts.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import { FilterPipe } from './main/posts/filter.pipe';

import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    ProfileComponent,
    PostsComponent,
    RegisterationComponent,
    FilterPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    NgArrayPipesModule,
    MatDividerModule,
    AppRoutingModule,
  ],
  providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
