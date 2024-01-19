export const typeDefs = `#graphql
    type Contacto {
        id: ID!
        nombre_completo: String!
        num_tlf: String!
        pais: String!
    }

    type Query {
        getContact(id: ID!): Contacto!
        getContacts: [Contacto]!
    }

    type Mutation {
        addContact(nombre_completo: String!, num_tlf: String!): Contacto!
        deleteContact(id: ID!): Boolean!
        updateContact(id: ID!, nombre_completo: String, num_tlf: String): Contacto!
    }


`
