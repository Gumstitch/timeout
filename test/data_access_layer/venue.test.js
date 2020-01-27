const { expect } = require('chai');

const data_access_layer = {
  'venue': require('../../src/data_access_layer/venue'),
};

describe('data_access_layer/venue', function() {

  describe('retrieve()', function() {
    it('returns an array of all nine venues', function() {
      const { venues } = data_access_layer.venue.retrieve();

      expect(venues).to.be.an('array');
      expect(venues).to.be.lengthOf(9);
    });
  });
});
