import gql from "graphql-tag";

const CHECK_QUOTE_SERVICE_PROVIDERS_QUERY = gql`
    query DeliveryQuote(
        $origin: String!,
        $destination: String!,
        $size: String,
    ){
        getDeliveryQuote(
            origin: $origin
            destination: $destination
            size: $size
        ) {
            deliveryRequest {
                origin
                destination
            }
            deliveryResponse {
                origin {
                    name
                    lng
                    lat
                }
                destination {
                    name
                    lng
                    lat
                }
            }
            quoteResponse {
                distance
                duration
                fees {
                    provider
                    fee
                }
            }
        }
    }
`;
export { CHECK_QUOTE_SERVICE_PROVIDERS_QUERY };
