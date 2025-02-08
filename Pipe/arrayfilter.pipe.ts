import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayfilter',
  standalone: true
})
export class ArrayfilterPipe implements PipeTransform {

  transform(items: any[], index: number): unknown {
    return items.filter((x: any) => x.floorNo === index)
  }

}
