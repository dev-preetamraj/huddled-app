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

export const discoverPeopleQueryString = gql`
  query {
    suggestedUsers {
      id
      email
      username
      firstName
      lastName
      profilePicture
      isHuddledVerified
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
      profilePicture
      isHuddledVerified
    }
  }
`;
