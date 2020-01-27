const domain_layer = {
  'user': require('./user'),
};

const data_access_layer = {
  'venue': require('../../src/data_access_layer/venue'),
};

/**
 * @param {String[]} names to match with venue offerings
 * @returns {String} a list of venues and names of those whose preferences don't match
 */
function get_users_match(user_names) {
  const found_users = user_names.map(name => domain_layer.user.find_by_name(name));
  const { venues } = data_access_layer.venue.retrieve();

  const schema = compose_matches_schema(venues, found_users);

  const message = compose_message(schema);
  return message;
}

/* Private functions */

function compose_matches_schema(venues, users) {
  const schema = {};

  venues.forEach(venue => {
    schema[venue.name] = {};
    schema[venue.name].cant_eat = [];
    schema[venue.name].cant_drink = [];

    users.forEach(user => {
      const drinks_match = get_mismatched_drinks(venue.drinks, user.drinks);

      if(!drinks_match) {
        schema[venue.name].cant_drink.push(user.name);
      }

      const food_mismatch = get_mismatched_food(venue.food, user.wont_eat);

      if(food_mismatch) {
        schema[venue.name].cant_eat.push(user.name);
      }
    });
  });

  return schema;
}

function compose_message(schema) {
  let message = '';

  for (const [ venue_name, users ] of Object.entries(schema)) {
    message += `\n ${venue_name}`;

    users.cant_eat.forEach(person => {
      message += `\n   There is nothing for ${person} to eat here`;
    });

    users.cant_drink.forEach(person => {
      message += `\n   There is nothing for ${person} to drink here`;
    });
  }

  return message;
}

function parse_drinks(venue_drinks) {
  const venue_drinks_lowercase = venue_drinks.map(drink => drink.toLowerCase());

  // Replace spelling of vokda with vodka
  const index_of_mispelling = venue_drinks_lowercase.indexOf('vokda');
  if(index_of_mispelling !== -1) {
    venue_drinks_lowercase[index_of_mispelling] = 'vodka';
  }

  return venue_drinks_lowercase;
}

function get_mismatched_drinks(venue_drinks, user_drinks) {
  const user_drinks_lowercase = user_drinks.map(name => name.toLowerCase());
  const parsed_venue_drinks = parse_drinks(venue_drinks);

  const drinks_match = parsed_venue_drinks.some(
    venue_drink => user_drinks_lowercase.includes(venue_drink)
  );

  return drinks_match;
}

function get_mismatched_food(venue_food, user_wont_eat) {
  const venue_food_lowercase = venue_food.map(name => name.toLowerCase());
  const user_food_lowercase = user_wont_eat.map(name => name.toLowerCase());

  const food_match = venue_food_lowercase.every(
    item => user_food_lowercase.indexOf(item) > -1
  );

  return food_match;
}

module.exports = {
  get_users_match,

  // TODO do not expose private functions, currently only for testing
  compose_matches_schema,
};
