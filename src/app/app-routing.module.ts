import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from "./components/search/search.component";
import { WikiComponent } from "./components/wiki/wiki.component";
import {LifeComponent} from "./components/life/life.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'life', component: LifeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
