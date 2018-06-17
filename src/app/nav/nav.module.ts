import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserModule } from '../user';
import { AuthModule } from '../auth';
import { SharedModule } from '../shared';

import { NavComponent } from './nav.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, AuthModule, UserModule],
  declarations: [NavComponent],
  exports: [NavComponent]
})
export class NavModule {}
