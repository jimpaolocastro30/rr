import gql from "graphql-tag";

const PERSONAL_INFO = gql`
  query GetUserInfo($id: Int) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      userdetailsSet{
        id
        firstName
        lastName
        contactNumber
        savedplacesSet {
          id
          address
          placeType
          latitude
          longitude
        }
      }
    }
  }
`;
export { PERSONAL_INFO };
