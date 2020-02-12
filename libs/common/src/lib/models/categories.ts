

export class CategoryVM {
  name: string;
  img: string;
  // score?: number;
  constructor(name: string, img: string) {
    this.name = name;
    this.img = img;
  }
}

export const CATEGORIES: CategoryVM[] = [
  new CategoryVM('Dairy and Egg Products', 'dairy1.svg'), // 0
  new CategoryVM('Spices and Herbs', 'spices1.svg'), // 1
  new CategoryVM('Baby Foods', 'baby-food1.svg'), // 2
  new CategoryVM('Fats and Oils', 'oil1.svg'), // 3
  new CategoryVM('Poultry Products', 'poultry1.svg'), // 4
  new CategoryVM('Soups, Sauces, and Gravies', 'soup1.svg'), // 5
  new CategoryVM('Sausages and Luncheon Meats', 'sausage1.svg'), // 6
  new CategoryVM('Breakfast Cereals', 'cereal2.svg'), // 7
  new CategoryVM('Snacks', 'snack1.svg'), // 8
  new CategoryVM('Fruits and Fruit Juices', 'fruit1.svg'), // 9
  new CategoryVM('Pork Products', 'pork1.svg'), // 10
  new CategoryVM('Vegetables and Vegetable Products', 'vegies1.svg'), // 11
  new CategoryVM('Nut and Seed Products', 'nuts1.svg'), // 12
  new CategoryVM('Beef Products', 'beef1.svg'), // 13
  new CategoryVM('Beverages', 'beverage1.svg'), // 14
  new CategoryVM('Finfish and Shellfish Products', 'fish1.svg'), // 15
  new CategoryVM('Legumes and Legume Products', 'peanut1.svg'), // 16
  new CategoryVM('Lamb, Veal, and Game Products', 'lamb.svg'), // 17
  new CategoryVM('Baked Products', 'baked3.svg'), // 18
  new CategoryVM('Sweets', 'candy1.svg'), // 19
  new CategoryVM('Cereal Grains and Pasta', 'pasta3.svg'), // 20
  new CategoryVM('Fast Foods', 'fast-food1.svg'), // 21
  new CategoryVM('Meals, Entrees, and Side Dishes', 'entre2.svg'), // 22
  new CategoryVM('American Indian/Alaska Native Foods', 'igloo.svg'), // 23
  new CategoryVM('Restaurant Foods', 'chef.svg') // 24
];
