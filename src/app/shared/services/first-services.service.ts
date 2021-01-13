import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/shared/services/basehttp.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FirstServicesService extends BaseHttp {
  constructor(public http: HttpClient) {
    super(http, 'workers');
  }
}
