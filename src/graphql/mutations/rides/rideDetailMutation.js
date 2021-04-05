import gql from "graphql-tag";

const CREATE_RIDE_DETAIL = gql`
  mutation CreateRideDetail(
    $pickUp: String,
    $destination: String,
    $pickUpDate: DateTime,
    $dropOffDate: DateTime,
    $convenienceFee: Int,
    $serviceProviderFee: Int,
    $rideStatus: Boolean
  ) {
    createRideDetail(
      id: 1,
      input: {
        pickUp: $pickUp
        destination: $destination
        pickUpDate: $pickUpDate
        dropOffDate: $dropOffDate
        convenienceFee: $convenienceFee
        serviceProviderFee: $serviceProviderFee
        rideStatus: $rideStatus
      }
    ) {
      ok
    }
  }
`;

export { CREATE_RIDE_DETAIL }