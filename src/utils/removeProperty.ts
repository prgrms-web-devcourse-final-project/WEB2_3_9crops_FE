export function removeProperty<T, K extends keyof T>(obj: T, propertys: K[]): Omit<T, K> {
  const newObj = { ...obj };
  propertys.forEach((property) => {
    delete newObj[property];
  });
  return newObj;
}
