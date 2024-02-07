// index.js

const express = require("express");

const { graphqlHTTP } = require("express-graphql");

const taskSchema = require("./taskSchema");

const taskResolver = require("./taskResolver");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: taskSchema,
    rootValue: taskResolver,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
