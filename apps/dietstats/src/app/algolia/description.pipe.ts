import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'desc'
})
export class DescriptionPipe implements PipeTransform {
  transform(fullDesc: string, maxChars: number = 500): string {
    if (fullDesc.length <= maxChars) return fullDesc
    const _500 = fullDesc.substring(0, 500)
    return _500.substring(0, _500.lastIndexOf('. '))
  }
}
