import {
  Compiler,
  Component,
  ComponentFactoryResolver,
  Injector,
  NgModuleFactory,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

@Component({
  selector: 'cc-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  @ViewChild('anchor1', { read: ViewContainerRef }) anchor1: ViewContainerRef
  @ViewChild('anchor2', { read: ViewContainerRef }) anchor2: ViewContainerRef

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private injector: Injector
  ) {}

  // lazyloading components and modules
  async loadComponent(): Promise<void> {
    const {
      AmPmToggleComponent,
      DatePickerModule,
      DatePickerInputComponent,
    } = await import('@cutcal/common')
    // self contained component
    const factory1 = this.factoryResolver.resolveComponentFactory(
      AmPmToggleComponent
    )
    this.anchor1.createComponent(factory1)
    // full module
    const moduleFactory = await this.loadModuleFactory(DatePickerModule)
    const moduleRef = moduleFactory.create(this.injector)
    const factory2 = moduleRef.componentFactoryResolver.resolveComponentFactory(
      DatePickerInputComponent
    )
    this.anchor2.createComponent(factory2)
  }

  private async loadModuleFactory(t: any): Promise<NgModuleFactory<any>> {
    return t instanceof NgModuleFactory
      ? t
      : await this.compiler.compileModuleAsync(t)
  }
}
