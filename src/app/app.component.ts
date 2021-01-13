import { Component } from '@angular/core';
import { MyWorker, MyWorkerType } from './shared/models/worker.model';
import { FirstServicesService } from './shared/services/first-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'Список сотрудников';
  workers: MyWorker[];
  myWorkerType = MyWorkerType;
  edit: boolean = false;

  searchStr = '';

  workerUser = {
    id: 0,
    name: '',
    surname: '',
    phone: '',
    type: 1
  };
  constructor(
    private FirstServicesService: FirstServicesService, private router: Router
    ) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      let workers = this.FirstServicesService.getAll();
      this.workers = (await workers === null)||(await workers === undefined) ? [] : await workers;
    } catch (err) {
      console.error(err);
    }

    try {
      this.workers = await this.FirstServicesService.getAll();
    } catch (err) {
      console.log(err);
    }
  }

  getByType(type: number) {
    if (this.workers == undefined){
      this.workers = [];
    }
    return this.workers.filter((worker) => worker.type === type);
  }

  async onEditWorker(worker) {
    try {
      await this.FirstServicesService.putOneById(worker.id ,worker);
    } catch (err) {
      console.error(err);
    } finally {
      this.edit = false;
      this.getData();
    }
  }

  async onDeleteById(id: number) {
    try {
      await this.FirstServicesService.deleteOneById(id);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  async onAddWorker(worker: MyWorker) {
    try {
        let id =
          this.workers.length > 0
            ? this.workers[this.workers.length - 1].id + 1
            : 0;
        worker.id = id;
      await this.FirstServicesService.postOne(worker);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  onEditById(id: number) {
    let index = this.workers.findIndex((worker) => worker.id === id);
    this.workerUser = {
      id: this.workers[index].id,
      name: this.workers[index].name,
      surname: this.workers[index].surname,
      phone: this.workers[index].phone,
      type: this.workers[index].type
    }
    this.edit = true;
  }

  onCancelPopup() {
    this.edit = false;
  }
}
