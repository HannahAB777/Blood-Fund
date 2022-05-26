import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_ADMIN = gql`
  mutation AddAdmin(
    $firstName: String!
    $lastName: String!
    $email: String!
    $medicalLicenseNumber: String!
    $password: String!
  ) {
    addAdmin(
      firstName: $firstName
      lastName: $lastName
      email: $email
      medicalLicenseNumber: $medicalLicenseNumber
      password: $password
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_RESULT = gql`
  mutation addResult(
    $patientFirstName: String!
    $patientLastName: String!
    $phoneNumber: String!
    $createdAt: Date!
  ) {
    addResult(
      patientFirstName: $patientFirstName
      patientLastName: $patientLastName
      phoneNumber: $phoneNumber
      createdAt: $createdAt
    ) {
      patientFirstName
      phoneNumber
    }
  }
`;

export const DELETE_RESULT = gql`
  mutation deleteResult(
    $patientFirstName: String!
    $patientLastName: String!
    $phoneNumber: String!
  ) {
    deleteResult(
      patientFirstName: $patientFirstName
      patientLastName: $patientLastName
      phoneNumber: $phoneNumber
    ) {
      _id
      firstName
    }
  }
`;

export const UPDATE_RESULT = gql`
mutation updateResult(
  $id: ID!
  $patientFirstName: String!
  $patientLastName: String!
  $phoneNumber: String!
) {
  updateResult(
    id: $id
    patientFirstName: $patientFirstName
    patientLastName: $patientLastName
    phoneNumber: $phoneNumber
  ) {
    firstName
    lastName
  }}
`;
