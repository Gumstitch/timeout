## Code Submission - Ewan Roberts

I have followed a Domain Driven Development approach and looking forward to hearing your thoughts! :)

## Steps for setup:

In order to install the dependances run:

`npm install`

In order to run the server run:

`node index.js`

As per the test I spent very little time on the User Interface but a get request with a payload (a bit painful :P) like this will return
your results:

URL: `localhost:3000/v1/venue`

Request body:
```
{
  "names": ["Robert Webb", "Gary Jones"]
}
```
Response:

```
 El Cantina
   There is nothing for Robert Webb to drink here
 Twin Dynasty
 Spice of life
 The Cambridge
 Wagamama
   There is nothing for Robert Webb to drink here
 Sultan Sofrasi
   There is nothing for Robert Webb to drink here
 Spirit House
 Tally Joe
   There is nothing for Robert Webb to drink here
 Fabrique
   There is nothing for Robert Webb to drink here
```

In order to run the tests you should be at root and run

`mocha test/**`

## Test output
```
data_access_layer/user
    retrieve()
      ✓ returns an array of all seven users

  data_access_layer/venue
    retrieve()
      ✓ returns an array of all nine venues

  domain_layer/user
    find_by_name()
      ✓ returns undefined if name does not match
      ✓ returns user based on user name

  domain_layer/venue
    get_users_choices()
      ✓ returns all venues when no mismatch
      ✓ returns correct schema for a user who cant drink in a venue
      ✓ returns correct schema for a user who cant eat in a venue
      ✓ returns correct schema for two users who cant eat or drink in a venue

  8 passing (17ms)
  ```

Any questions do get in touch at `ewan-roberts@hotmail.com`
