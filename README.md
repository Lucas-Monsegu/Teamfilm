# Teamfilm

A website made so that a group of people can rate and comment movies.

You can see my hosted version [here](https://teamfilm.vercel.app/)

![soul](images/soul.png)

# How it works

It uses discord as an auth system. To give access to the website you need to have a discord server and add a certain role (env_variable) to the users. Users that have this role will be whitelisted. Everyone can see the comments but only whitelisted people can create/edit them.

# Technos

## Backend

- Postgres database
- Express js
- [themoviedb](https://www.themoviedb.org)
- [discord Oauth](https://discord.com/developers/docs/topics/oauth2)

## Frontend

- Vuejs
- [Vuetify](https://vuetifyjs.com/en/)
- [Lottie](https://airbnb.design/lottie/)

## Hosting

- For the front [Vercel](https://vercel.com/)
- For the backend + DB [Railway](https://railway.app/)