import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayofObject:any[] , type:string): any[] {
    return arrayofObject.filter( (item)=>item.name.toLowerCase().includes(type.toLowerCase()) );
  }

}
