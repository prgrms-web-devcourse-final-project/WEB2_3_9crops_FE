export function removeProperty<T, K extends keyof T>(obj: T, property: K): Omit<T, K> {
  const newObj = { ...obj };
  delete newObj[property];
  return newObj;
}
