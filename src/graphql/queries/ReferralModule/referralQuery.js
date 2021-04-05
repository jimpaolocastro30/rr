import gql from "graphql-tag";

const REFERRAL_QUERY = gql`
    query GetReferralInfo($referralCode: String) {
        getReferralInfo(referralCode: $referralCode) {
            id
            user {
                id
                username
            }
            referralCode
            referrer
            firstRide
            firstTopup
            topupEarnings
            rideEarnings
        }
    } 
`
export { REFERRAL_QUERY };
