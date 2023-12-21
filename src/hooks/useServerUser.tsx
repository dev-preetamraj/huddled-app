import { updateServerUser } from '@/features/auth/authSlice';
import { fetchMeQueryString } from '@/graphql/usersGql';
import { AppDispatch } from '@/store';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useServerUser = (useCached: boolean = false) => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error, refetch } = useQuery<ProfileQuery>(
    fetchMeQueryString,
    {
      fetchPolicy: 'network-only',
      skip: useCached,
    }
  );

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
