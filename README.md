# Github collector

## Task

* Create a service with single API endpoint to search for GitHub users by the programming language in repositories
* Each user in the response should contain the username, name, avatar url and number of followers
* The service should be developed with TypeScript
* The service should be covered with tests
* Create a Dockerfile to run the service

## Useful links
[Search by language](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories#search-by-language)  
[How to generate API token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## Requirements
* `docker v.20.x.x`

## Setting up
This software works with Github private key info.

This information should never be in public access, 
so you should generate your personal key and override
the default config.

The easy way is to do this:
```
cd <project directory>
echo '{"credentials": {"github": {"apiKey": "<INSERT YOUR KEY HERE>"}}}' > config/production.json
```

## Build docker container
* move to `github_collector` directory 
* enter `docker build . -t github_collector`

## Run server

To run server, print command:
```
docker run -p 8000:8000 github_collector
```
Examlpes to test endpoints:

```
http://0.0.0.0:8000/api/v1/language/rust/page/1/users
http://0.0.0.0:8000/api/v1/language/python/page/3/users
```

Note that there is Github API limit: 1000 result to search query, so this request will return error:
```
http://0.0.0.0:8000/api/v1/language/java/page/100/users
```

These queries will return error due to invalid parameters:
```
http://0.0.0.0:8000/api/v1/language//page/1/users
http://0.0.0.0:8000/api/v1/language/java/page/some-string/users
```

Result structure should be like this:
```
{
  "msg": "ok",
  "totalCount": 1,
  "users": [
      {
      "username": "wizzzard91",
      "name": "Bulat Nabiullin",
      "avatarUrl": "https://avatars.githubusercontent.com/u/10063799?v=4",
      "followers": 2
    },
  ]
}
```


## Setting up local developer environment
Requires packages:
* `npm`
* `node`

Building project:
```
echo '{"credentials": {"github": {"apiKey": "<INSERT YOUR KEY HERE>"}}}' > config/development.json
npm i
npm run build
```

Starting project:
```
npm start
```
