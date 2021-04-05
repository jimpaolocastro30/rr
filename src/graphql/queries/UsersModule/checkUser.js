import gql from "graphql-tag";

const CHECK_EXISTING_USER = gql`
  query getExisting($mobileNumber: String, $email: String){
    checkExisting(
      input:{
        mobileNumber: $mobileNumber,
        email: $email
      }
    )
  }
`;
export { CHECK_EXISTING_USER };
