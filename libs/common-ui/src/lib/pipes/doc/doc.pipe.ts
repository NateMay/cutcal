import { Pipe, PipeTransform } from '@angular/core'
import { Observable } from 'rxjs'
import { FirestoreService, DocPredicate } from '../../services/fireStore/fireStore.service';

/**
 * @description Unwrapps a firestore document reference in the template
 * @example
 * ```html
 *   <div *ngIf="noteDoc | async as note">
 *     {{ (note.user | doc | async)?.name }}
 *   </div>
 * ```
 */

export interface DocPipeShape<T> {
  path: DocPredicate<T>
}
@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {
  constructor(private readonly db: FirestoreService) {}

  transform<T>(value: DocPipeShape<T>): Observable<T> {
    return this.db.doc$(value.path)
  }
}
