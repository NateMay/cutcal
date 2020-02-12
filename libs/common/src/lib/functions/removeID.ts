
export function removeId<T extends { _id?: string }>(data: T): T {

  const newData = {...data};

  delete newData._id;

  return newData;
}
