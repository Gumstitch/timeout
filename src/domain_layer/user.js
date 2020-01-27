const data_access_layer = {
  'user': require('../../src/data_access_layer/user'),
};

/**
 * @param {String} name of the user to search for
 * @returns {Object} the found user
 */
function find_by_name(user_name) {
  const { users } = data_access_layer.user.retrieve();
  const user = users.find(({ name }) => name === user_name);

  return user;
}

module.exports = {
  find_by_name,
};
