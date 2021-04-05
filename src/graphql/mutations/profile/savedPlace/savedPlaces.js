import gql from "graphql-tag";

const ADD_SAVED_PLACE = gql`
  mutation AddSavedPlace($userdetail_id: ID!, $address: String!, $latitude: Float!, $longitude: Float!, $placeType: String!) {
    addSavedplace(input: { userdetailId: $userdetail_id, address: $address, latitude: $latitude, longitude: $longitude, placeType: $placeType }) {
      ok
    }
  }
`;

export { ADD_SAVED_PLACE };
