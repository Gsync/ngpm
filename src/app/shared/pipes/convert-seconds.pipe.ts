import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSeconds'
})
export class ConvertSecondsPipe implements PipeTransform {
  // NOTE: this should work until 24 hours
  transform(value: number): any {
    const dateTime = new Date(null);
    dateTime.setSeconds(value);
    return dateTime.toISOString().substr(11, 8);
  }
}
