import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

/**
 * @description Sanitizes data for the template
 * @see {@link https://stackoverflow.com/questions/49419662/why-sanitizer-bypasssecuritytruststyle-returns-warning-when-setting-style-backg Stackoverflow}
 * @example
 * ```html
 *   <img [style.background-image]="'url(' + photoUrl + ')' | sanitize">
 * ```
 */
@Pipe({
  name: 'sanitize'
})
export class StyleSanitizerPipe implements PipeTransform {
  constructor(private readonly domSanitizer: DomSanitizer) {}

  transform(value: string): any {
    return !value ? value : this.domSanitizer.bypassSecurityTrustStyle(value)
  }
}
