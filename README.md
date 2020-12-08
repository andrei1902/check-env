# check-env [![CircleCI](https://circleci.com/gh/ekmartin/check-env.svg?style=svg)](https://circleci.com/gh/ekmartin/check-env)

> Makes sure that all required environment variables are set. 


## Install

```sh
$ npm install --save check-env
```


## Usage

```js
var checkEnv = require('check-env');
checkEnv(['REQUIRED_VAR', 'OTHER_VAR', 'ENV_VAR']);
// => Throws an error if one of the variables aren't set.
```
OR REGISTER A CALLBACK FOR SPECIFIC VARIABLES

```js
var checkEnv = require('check-env');
checkEnv([
  'REQUIRED_VAR',
  { title: 'UNUSED_VAR', cb: () => { console.warn('Dear devops people, we\'re no longer using this so you can stop providing it') }},
  { title: 'OUTDATED_VAR', cb: () => {
    if (Number('KEY_VALUE_1994'.substr(id.length - 4)) <= 2000) console.log('"OUTDATED_VAR" value is deprecated and needs to be updated"')
  }}
]);
// => Throws an error if one of the variables aren't set or calls the callbacks if any are provided.
```

## CLI Usage

1. Install as a project dependency as above
2. Add to a [lifecycle script](https://docs.npmjs.com/misc/scripts) such as
   `prestart`
3. `npm start` will bail out (`exit(1)`) with a hard to miss error message if environment variables are not set

### Example:

In package.json:

```json
{
  "prestart": "check-env AWS_KEY MONGO_URL",
  "start": "node index.js"
}
```


```
$ echo $MONGO_URL
# (nothing)

$ npm start
 ________________________________________
< Missing environment variable MONGO_URL >
 ----------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

$ echo $?
1
```
