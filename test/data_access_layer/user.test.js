const { expect } = require('chai');

const data_access_layer = {
  'user': require('../../src/data_access_layer/user'),
};

describe('data_access_layer/user', function() {

  describe('retrieve()', function() {
    it('returns an array of all seven users', function() {
      const { users } = data_access_layer.user.retrieve();

      expect(users).to.be.an('array');
      expect(users).to.be.lengthOf(7);
    });
  });
});
