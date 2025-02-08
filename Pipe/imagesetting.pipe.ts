import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'imagesetting',
})
export class ImagesettingPipe implements PipeTransform {
  // value: unknown, ...args: unknown[]
  transform(value: string): unknown {
    if (value === null || value.length === 0) {
      return 'assets/images/default.png';
    } else {
      return value;
    }
  }
}
