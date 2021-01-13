import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyWorker, MyWorkerType } from 'src/app/shared/models/worker.model';
import { FirstServicesService } from 'src/app/shared/services/first-services.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  id: number;
  user: MyWorker;
  personForm: FormGroup;
  myWorkerType = MyWorkerType;

  public mask = ['+', 7, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]

  constructor(
    private activatedRouter: ActivatedRoute,
    private FirstServicesService: FirstServicesService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.personForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      type: new FormControl(0, [Validators.required])
    });
    this.getData();
  }

  async getData() {
    if ((this.id !== null)&&(this.id !== undefined)) {
      try {
        let user = this.FirstServicesService.getOneById(this.id);
        this.user = await user;
      } catch (err) {
        console.error(err);
      }
      this.personForm.patchValue({
        name: this.user.name,
        surname: this.user.surname,
        patronymic: this.user.patronymic,
        phone: this.user.phone,
        email: this.user.email,
        birthday: this.user.birthday,
        type: this.user.type
      });
    }
  }

  async onSave() {
    if ((this.id !== null)&&(this.id !== undefined)) {
      try {
        await this.FirstServicesService.putOneById(this.id, this.personForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.FirstServicesService.postOne(this.personForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async onDelete() {
    try {
      await this.FirstServicesService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/users']);
  }
}