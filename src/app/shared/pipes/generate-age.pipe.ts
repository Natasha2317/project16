import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'generateAge'
})
export class GenerateAgePipe implements PipeTransform {

  transform(birthday: Date) {
    return moment().diff(birthday, 'years', false);
  }

}
