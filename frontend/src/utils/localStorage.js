// Function to set a value in local storage
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting value in local storage:", error);
  }
};

// Function to get a value from local storage
export const getLocalStorage = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error("Error getting value from local storage:", error);
    return null;
  }
};
// Function to remove a value from local storage
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing value in local storage:", error);
  }
};
