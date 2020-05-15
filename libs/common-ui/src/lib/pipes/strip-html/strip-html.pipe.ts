import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {
  transform(message: string): string {
    return !message
      ? ''
      : message
          .replace(/<(?:.|\n)*?>/gm, '')
          .replace(/&amp|;/g, '&')
          .replace(/&lt|;/g, '<')
          .replace(/&gt|;/g, '>')
  }
}
