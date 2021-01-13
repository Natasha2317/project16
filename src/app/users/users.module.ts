
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MyfilterPipe } from 'src/app/shared/pipes/myfilter.pipe';
import { GenerateAgePipe } from 'src/app/shared/pipes/generate-age.pipe';
import { DepartamentPipe } from 'src/app/shared/pipes/departament.pipe';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';


@NgModule({
  declarations: [UsersComponent, UserEditComponent, UserListComponent, MyfilterPipe, SortPipe, DepartamentPipe, GenerateAgePipe],
  imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule, TextMaskModule],
})
export class UsersModule {}
