import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Sanitizes data for the template
 * @refrence {@link https://stackoverflow.com/questions/49419662/why-sanitizer-bypasssecuritytruststyle-returns-warning-when-setting-style-backg Stackoverflow}
 * @example
 *   photo = '../../../assets/images/april.jpg';
 *
 *   <img [style.background-image]="'url(' + photo + ')' | sanitize">
 */
@Pipe({
  name: 'sanitize',
})
export class StyleSanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string): any {
    return !value ? value : this.domSanitizer.bypassSecurityTrustStyle(value)
  }
}
