/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

const graphQlBuildSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/isAuth');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const DB = process.env.MONGO_URL.replace(
  '<USERNAME>',
  process.env.MONGO_USERNAME,
)
  .replace('<PASSWORD>', process.env.MONGO_PASSWORD)
  .replace('<DATABASE>', process.env.MONGO_DATABASE_NAME);

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlBuildSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  }),
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on server ${port}`);
});
