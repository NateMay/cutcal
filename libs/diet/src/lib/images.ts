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

export function createImage(url: string, uploaderId?: string): Image {
  return {
    url,
    votes: 0,
    uploaderId,
  }
}
