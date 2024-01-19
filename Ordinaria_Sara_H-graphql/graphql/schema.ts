export const typeDefs = `#graphql
    type Ejemplo {
        id: ID!,
    }

    type Query {
        getEjemplo: []
    }

    type Mutation {
        addEjemplo(ejemplo: String!): String!
    }
`
