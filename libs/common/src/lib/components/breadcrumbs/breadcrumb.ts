export class BreadCrumb {

  label: string;
  route?: string[];

  constructor(label: string, route?: string[]) {
    this.label = label;
    this.route = route;
  }
}
