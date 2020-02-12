/**
 * Firebase schema for images
 */
// DISTANT (gamification) https://angular-university.io/lesson/firestore-transactions - auto increment via function
export interface Image {
  url?: string
  path?: string
  votes?: number
  uploaderId?: string
}
