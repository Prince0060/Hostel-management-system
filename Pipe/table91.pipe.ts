import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'table91',
})
export class Table91Pipe implements PipeTransform {
  transform(items: any[]): any {
    var specialHeaders = ['select', 'delete', 'actions'];
    if (!items) {
      return items;
    }
    return items.filter((el) => {
      return specialHeaders.indexOf(el) < 0;
    });
  }
}
