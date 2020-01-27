const { expect } = require('chai');

const domain_layer = {
  'venue': require('../../src/domain_layer/venue'),
  'user' : require('../../src/domain_layer/user'),
};

const data_access_layer = {
  'venue': require('../../src/data_access_layer/venue'),
};

describe('domain_layer/venue', function() {
  
  describe('get_users_choices()', function() {
    it('returns correct schema for a user who cant drink in a venue', function() {
      const { venues } = data_access_layer.venue.retrieve();
      const user = domain_layer.user.find_by_name('Robert Webb');

      const result = domain_layer.venue.compose_matches_schema(venues, [ user ]);

      expect(result.Wagamama.cant_drink).to.have.members([ 'Robert Webb' ]);
      expect(result.Fabrique.cant_drink).to.have.members([ 'Robert Webb' ]);
      expect(result['El Cantina'].cant_drink).to.have.members([ 'Robert Webb' ]);
      expect(result['Sultan Sofrasi'].cant_drink).to.have.members([ 'Robert Webb' ]);
      expect(result['Tally Joe'].cant_drink).to.have.members([ 'Robert Webb' ]);
    });

    it('returns correct schema for a user who cant eat in a venue', function() {
      const { venues } = data_access_layer.venue.retrieve();
      const user = domain_layer.user.find_by_name('Bobby Robson');

      const result = domain_layer.venue.compose_matches_schema(venues, [ user ]);

      expect(result['El Cantina'].cant_eat).to.have.members([ 'Bobby Robson' ]);
    });

    it('returns correct schema for two users who cant eat or drink in a venue', function() {
      const { venues } = data_access_layer.venue.retrieve();
      const user_one = domain_layer.user.find_by_name('Bobby Robson');
      const user_two = domain_layer.user.find_by_name('Robert Webb');

      const result = domain_layer.venue.compose_matches_schema(venues, [ user_one, user_two ]);

      expect(result['El Cantina'].cant_eat).to.have.members([ 'Bobby Robson' ]);

      expect(result.Wagamama.cant_drink).to.have.members([ 'Robert Webb' ]);
      expect(result.Fabrique.cant_drink).to.have.members([ 'Robert Webb' ]);
      expect(result['El Cantina'].cant_drink).to.have.members([ 'Robert Webb' ]);
      expect(result['Sultan Sofrasi'].cant_drink).to.have.members([ 'Robert Webb' ]);
      expect(result['Tally Joe'].cant_drink).to.have.members([ 'Robert Webb' ]);
    });
  });
});
