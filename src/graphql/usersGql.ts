import { gql } from '@apollo/client';

export const fetchMeQueryString = gql`
  query MeQuery {
    me {
      id
      email
      username
      firstName
      lastName
      profilePicture
      coverPicture
      bio
      gender
      relationshipStatus
      street
      city
      state
      postalCode
      country
      isHuddledVerified
      lastLogin
    }
  }
`;

export const suggestedUsersQueryString = gql`
  query SuggestedUserQuery(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    suggestedUsers(first: $first, last: $last, after: $after, before: $before) {
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

export const userBydQueryString = gql`
  query GetUserById($userId: String!) {
    userById(userId: $userId) {
      id
      email
      username
      firstName
      lastName
      bio
      profilePicture
      coverPicture
      isHuddledVerified
    }
  }
`;

export const updateProfileMutationString = gql`
  mutation UpdateProfile(
    $username: String
    $gender: GenderEnum
    $relationshipStatus: RelationshipEnum
    $street: String
    $city: String
    $state: String
    $postalCode: String
    $country: String
  ) {
    updateProfile(
      username: $username
      gender: $gender
      relationshipStatus: $relationshipStatus
      street: $street
      city: $city
      state: $state
      postalCode: $postalCode
      country: $country
    ) {
      user {
        id
      }
    }
  }
`;
