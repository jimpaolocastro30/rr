import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CreateUser(
    $username: String
    $password: String
    $emailAddress: String
    $firstName: String
    $lastName: String
    $contactNumber: String
  ) {
    createUser(
      input: {
        username: $username
        password: $password
        emailAddress: $emailAddress
        firstName: $firstName
        lastName: $lastName
        contactNumber: $contactNumber
      }
    ) {
      ok
      user {
        id
        username
        password
        email
      }
    }
  }
`;

const CREATE_USER_DETAILS = gql`
  mutation CreateUserDetails(
    $userId: ID
    $firstName: String
    $lastName: String
    $contactNumber: Int
  ) {
    createUserdetail(
      input: {
        userId: $userId
        firstName: $firstName
        lastName: $lastName
        contactNumber: $contactNumber
        homeAddress: "None"
        workAddress: "None"
      }
    ) {
      ok
    }
  }
`;

export { CREATE_USER, CREATE_USER_DETAILS }