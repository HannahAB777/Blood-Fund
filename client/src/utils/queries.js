import { gql } from '@apollo/client';

export const QUERY_ADMIN = gql`
  query admin {
    Admin {
      _id
    firstName
    lastName
    email
    medicalLicenseNumber
    password
    }
  }
`;

export const QUERY_RESULT = gql`
query result {
  results {
  _id
  patientFirstName
  patientLastName
  phoneNumber
  createdAt
  }
}
`;