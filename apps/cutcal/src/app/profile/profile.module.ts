import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileSideComponent } from './profile-side/profile-side.component';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [ProfileComponent, ProfileSideComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: '',
        outlet: 'side',
        component: ProfileSideComponent
      }
    ])
  ]
})
export class ProfileModule { }
