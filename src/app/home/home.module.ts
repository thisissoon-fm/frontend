import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerModule } from '../player';
import { SearchModule } from '../search';
import { HomeRoutingModule, routedComponents } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PlayerModule,
    SearchModule,
    HomeRoutingModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class HomeModule { }
