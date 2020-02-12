import { Pipe, PipeTransform } from '@angular/core'
import { Observable } from 'rxjs'
import { FirestoreService } from '../../services/fireStore/fireStore.service'

/**
 * Unwrapps a firestore document reference in the template
 * @example
 *   <div *ngIf="noteDoc | async as note">
 *     {{ (note.user | doc | async)?.name }}
 *   </div>
 */

@Pipe({
  name: 'doc',
})
export class DocPipe implements PipeTransform {
  constructor(private db: FirestoreService) {}

  transform(value: any): Observable<any> {
    return this.db.doc$(value.path)
  }
}
