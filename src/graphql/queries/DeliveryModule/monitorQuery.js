import gql from "graphql-tag";

const MONITOR_QUERY = gql`
    query MonitorRide($orderId: String!, $spId: String!) {
        monitorRide(orderId: $orderId, spId: $spId)
    } 
`
export { MONITOR_QUERY };
