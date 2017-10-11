import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: string): any {
    const date: Date = new Date(value);

    if (isNaN(date.getTime())) {
      return value;
    }

    const hours = date.getUTCHours() ? `${date.getUTCHours()}:` : '';
    const minutes = hours && date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes();
    const seconds = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();

    return `${hours}${minutes}:${seconds}`;
  }

}
