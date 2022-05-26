const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Admin {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    medicalLicenseNumber: String!
    password: String!
    results: [Result]
  }

  type Result {
    _id: ID
    patientFirstName: String!
    patientLastName: String!
    phoneNumber: String!
    createdAt: Date!
  }

  type Auth {
    token: ID
    user: Admin
  }

  type Query {
    admin: Admin
    results: [Result]
  }

  type Mutation {
    addAdmin(
      firstName: String!
      lastName: String!
      email: String!
      medicalLicenseNumber: String!
      password: String!
    ): Auth
    addResult(
      patientFirstName: String!
      patientLastName: String!
      phoneNumber: String!
      createdAt: Date!
    ): Result
    login(email: String!, password: String!): Auth
    deleteResult(
      patientFirstName: String!
      patientLastName: String!
      phoneNumber: String!
    ): Admin
    updateResult(
      id: ID!
      patientFirstName: String!
      patientLastName: String!
      phoneNumber: String!
    ): Admin
  }
`;

module.exports = typeDefs;
