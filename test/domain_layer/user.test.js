const { expect } = require('chai');

const domain_layer = {
  'user': require('../../src/domain_layer/user'),
};

describe('domain_layer/user', function() {

  describe('find_by_name()', function() {
    it('returns undefined if name does not match', function() {
      const user = domain_layer.user.find_by_name('FooBar');

      expect(user).to.be.undefined;
    });

    it('returns user based on user name', function() {
      const actual_user = domain_layer.user.find_by_name('Robert Webb');

      const expected_user = {
        'name'    : 'Robert Webb',
        'wont_eat': [ 'Bread', 'Pasta' ],
        'drinks'  : [ 'Vokda', 'Gin', 'Whisky', 'Rum' ],
      };

      expect(expected_user).to.be.an('object');
      expect(expected_user).to.have.deep.equal(actual_user);
    });
  });
});
