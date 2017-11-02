import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    const date: Date = new Date(parseInt(value, 10));

    if (isNaN(date.getTime())) {
      return value;
    }

    const hours = date.getUTCHours() ? `${date.getUTCHours()}:` : '';
    const minutes = hours && date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes();
    const seconds = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();

    return `${hours}${minutes}:${seconds}`;
  }

}
