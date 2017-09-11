import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    NgbDropdownModule
  ],
  exports: [
    SearchComponent
  ],
  declarations: [
    SearchComponent
  ]
})
export class SearchModule { }
