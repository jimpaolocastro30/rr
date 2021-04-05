import gql from "graphql-tag";

const CHANGEPASS_USER = gql`
  mutation ChangePassword(
    $userId: ID, 
    $username: String, 
    $password: String
    ) {
    updateUser(
      input: { 
        userId: $userId,
        username: $username, 
        password: $password 
      }) {
      user {
        username
        password
      }
      ok
    }
  }
`;

export { CHANGEPASS_USER };
