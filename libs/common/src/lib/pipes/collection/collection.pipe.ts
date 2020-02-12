import { Pipe, PipeTransform } from '@angular/core';
import { KVP } from '../../models/key-value-pair';

/**
 * Converts a key value pair to an array for *ngFor to use
 * @example
 *   const object = { a: 1, b: 2, c: 3 }
 *
 *   <div *ngFor="let value of object | coll">
 *     Number: {{ value }}
 *   </div>
 */
@Pipe({
  name: 'coll',
  pure: false
})
export class CollectionPipe implements PipeTransform {

  transform(collection: KVP<any>): any[] {
    return Object.keys(collection).map((key) => collection[key]);
  }
}
