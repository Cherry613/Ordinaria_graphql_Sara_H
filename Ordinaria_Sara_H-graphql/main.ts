import {ApolloServer} from "npm:@apollo/server@4.9.5"
import {startStandaloneServer} from "npm:@apollo/server@4.9.5/standalone"
//import mongoose from "npm:mongoose@8.0.0";

import { typeDefs } from "./graphql/schema.ts";
import { Query } from "./resolvers/Query.ts";
import { Mutation } from "./resolvers/Mutation.ts";

//conexion a mongo
/*import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if(!MONGO_URL) {
  console.log("No Mongo URL found");
  Deno.exit(1);
}

try{
  await mongoose.connect(MONGO_URL);
  console.log("Conectado a mongo");
}catch(error){
  console.log(error.message);
}*/

  
const server = new ApolloServer ({
  typeDefs,
  resolvers:{
    Query,
    Mutation
  }
});
const {url} = await startStandaloneServer(server);
console.log(`🚀 server ready at ${url}`)