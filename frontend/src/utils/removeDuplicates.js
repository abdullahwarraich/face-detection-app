export function removeDuplicatesById(array) {
  const uniqueIds = new Set();
  // Use filter to create a new array with unique objects based on id
  const uniqueArray = array.filter((obj) => {
    if (!uniqueIds.has(obj.id)) {
      uniqueIds.add(obj.id);
      return true;
    }
    return false;
  });

  return uniqueArray;
}
