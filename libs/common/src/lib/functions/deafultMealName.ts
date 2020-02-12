
export function defaultMealName(date: Date): string {
  const hour = date.getHours();
  if (hour < 5) return 'Snack';
  else if (hour < 9) return 'Breakfast';
  else if (hour < 11) return 'Brunch';
  else if (hour < 14) return 'Lunch';
  else if (hour < 16) return 'Snack';
  else if (hour < 20) return 'Dinner';
  else return 'Snack';
}
