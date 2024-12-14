// dataStore.js
let users = []; // Array to store user data

// dataStore.js
const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

const clearUsers = () => {
  localStorage.removeItem("users");
};

// Export the functions
module.exports = {
  addUser,
  getUsers,
  clearUsers,
};
