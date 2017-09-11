import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    StoreModule,
    CommonModule
  ],
  exports: [
    SearchComponent
  ],
  declarations: [
    SearchComponent
  ]
})
export class SearchModule { }
