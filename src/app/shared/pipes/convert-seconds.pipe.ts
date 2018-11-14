import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSeconds'
})
export class ConvertSecondsPipe implements PipeTransform {
  transform(value: number): any {
    return (
      Math.floor(value / 3600) +
      ':' +
      Math.floor(value / 60) +
      ':' +
      Math.floor(value % 60)
    );
  }
}
