import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './splash';

export const routedComponents: any[] = [SplashComponent];

const routes: Routes = [
  { path: '', component: SplashComponent, data: { animation: 'splashPage' } },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
