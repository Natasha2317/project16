import { Component, OnInit } from '@angular/core';
import { MyWorker } from 'src/app/shared/models/worker.model';
import { FirstServicesService } from 'src/app/shared/services/first-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: MyWorker[];
  searchStr = '';
  option = "id";
  reverse = false;

  constructor(private FirstServicesService: FirstServicesService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let users = this.FirstServicesService.getAll();
      this.users = (await users === null)||(await users === undefined) ? [] : await users;
    } catch (err) {
      console.error(err);
    }

    try {
      this.users = await this.FirstServicesService.getAll();
    } catch (err) {
      console.log(err);
    }
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  async onDelete(id: number) {
    try {
      await this.FirstServicesService.deleteOneById(id);
    } catch (err) {
      console.error(err);
    }
    this.getData();
  }
}

