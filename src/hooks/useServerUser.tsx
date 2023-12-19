import { updateServerUser } from '@/features/auth/authSlice';
import { AppDispatch } from '@/store';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const query = gql`
  query MeQuery {
    me {
      id
      profilePicture
      coverPicture
      gender
      username
      bio
      relationshipStatus
      city
      lastLogin
    }
  }
`;

const useServerUser = (useCached: boolean = false) => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error, refetch } = useQuery<ProfileQuery>(query, {
    fetchPolicy: 'network-only',
    skip: useCached,
  });

  useEffect(() => {
    if (refetch) refetch();
  }, [refetch, useCached]);

  useEffect(() => {
    if (!loading && !error && data) {
      dispatch(updateServerUser(data.me));
    }
  }, [loading, error, data]);

  return {
    serverUser: data?.me,
    refetch,
    loading,
    error,
  };
};

export default useServerUser;
