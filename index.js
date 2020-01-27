const express = require('express');
const app     = express();
const joi     = require('joi');

const PORT = 3000;

const domain_layer = {
  'venue': require('./src/domain_layer/venue'),
};

app.use(express.static(__dirname));
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on port' ${PORT}`));

const REQUEST_SCHEMA = joi.object().keys({
  'names': joi.array().items(joi.string()).optional().allow(null),
}).optional().options({ 'stripUnknown': true });

function parse_input_parameters(event) {
  const {
    'value': validated_path_parameters,
    'error': path_validation_error,
  } = REQUEST_SCHEMA.validate(event.body);

  if(path_validation_error) {
    throw new Error(path_validation_error);
  }

  const { names } = validated_path_parameters;

  return {
    names,
  };
}

app.get('/v1/venue', (request, response) => {
  const { names } = parse_input_parameters(request);

  const message = domain_layer.venue.get_users_match(names);

  response.send(message);
});
