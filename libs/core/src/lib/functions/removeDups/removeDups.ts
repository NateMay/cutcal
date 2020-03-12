export const removeDups = <T>(array: T[]): Partial<T>[] => [...new Set(array)]
