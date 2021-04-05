import gql from "graphql-tag";

const LOGIN_USER = gql`
  mutation Login(
    $username: String!
    $password: String!
  ) {
    tokenAuth(
        username: $username
        password: $password
    ) {
        token
        user{
          id
          username
          userdetailsSet{
            firstName
            lastName
            homeAddress
            workAddress
            token
            contactNumber
          }
          referralSet{
            referralCode
            earnedTotal
            rideEarnings
            user{
              username
            }
          }
        }
    }
  }
`;

export { LOGIN_USER }