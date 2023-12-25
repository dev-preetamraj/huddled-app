import { gql } from '@apollo/client';

export const friendRequestsQueryString = gql`
  query FriendRequestsQuery(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    friendRequests(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          email
          username
          firstName
          lastName
          profilePicture
          isHuddledVerified
        }
      }
    }
  }
`;

export const sentRequestsQueryString = gql`
  query SentRequestsQuery(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    sentRequests(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          email
          username
          firstName
          lastName
          profilePicture
          isHuddledVerified
        }
      }
    }
  }
`;
