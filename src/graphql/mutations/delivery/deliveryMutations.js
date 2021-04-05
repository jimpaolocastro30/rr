import gql from "graphql-tag";

export const CHECK_PRICE = gql`
  mutation CheckPrice(
    $userId: ID
    $pickup: PickupInput
    $destination: DestinationInput
  ) {
    checkPrice(
      input: {
        userId: $userId
        pickup: $pickup
        destination: $destination 
      }
    ) {
      calculateOrder
    }
  }
`;

export const CONFIRM_BOOKING = gql`
  mutation confirmBook(
    $userId: ID
    $serviceProviderId: ID
    $pickup: PickupInput
    $destination: DestinationInput
    $pickUpDate: DateTime
    $dropOffDate: DateTime
    $recipientMobileNumber: String
    $recipientAddress: String
    $pickupMobileNumber: String
    $pickupAddress: String
  ) {
    createRideDetail(
    input: {
      userId: $userId
      serviceProviderId: $serviceProviderId
      pickup: $pickup
      destination: $destination
      pickUpDate: $pickUpDate
      dropOffDate: $dropOffDate
      recipientMobileNumber: $recipientMobileNumber
      recipientAddress: $recipientAddress
      pickupMobileNumber: $pickupMobileNumber
      pickupAddress: $pickupAddress
    }
    ) {
      ok
      rideDetail {
        id
        userId {
          id
          username
        }
        serviceProvider {
          id
          name
        }
        recipientAddress
        recipientMobileNumber
        pickupAddress
        pickupMobileNumber
        serviceProviderFee
        convenienceFee
        orderId
        rideStatus
        pickupLatitude
        pickupLongitude
        pickupName
        dropoffLatitude
        dropoffLongitude
        dropoffName
      }
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation cancelBooking(
    $orderId: ID
    $serviceProviderId: ID
    $rideId: ID
  ) {
    checkPrice(
      orderId: $orderId
      serviceProviderId: $serviceProviderId
      rideId: $rideId
    ) {
      ok
      rideDetail {
        rideStatus
      }
    }
  }
`;
