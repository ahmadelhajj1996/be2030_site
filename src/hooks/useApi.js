import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchData,
  createData,
  updateData,
  deleteData,
  patchData
} from "../services/general";

export const useGet = (key, url, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: () =>
      fetchData(url, {
        ...options.config,
        lang: options.lang, // pass language in config
      }),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    ...options,
  });
};

// POST hook
export const usePost = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ url, data, config }) => createData(url, data, config),
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries after successful creation
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

// PUT hook
export const usePut = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ url, data, config }) => updateData(url, data, config),
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries after successful update
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
      // Optionally update cache directly for better UX
      if (options.updateQuery) {
        queryClient.setQueryData({ queryKey: options.updateQuery }, (old) => ({
          ...old,
          ...data,
        }));
      }
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

// PATCH hook
export const usePatch = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ url, data, config }) => patchData(url, data, config),
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries after successful patch
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
      // Optionally update cache directly for better UX
      if (options.updateQuery) {
        queryClient.setQueryData({ queryKey: options.updateQuery }, (old) => ({
          ...old,
          ...data,
        }));
      }
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

// DELETE hook
export const useDelete = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ url, config }) => deleteData(url, config),
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries after successful deletion
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
      // Optionally remove item from cache directly
      if (options.removeFromQuery) {
        queryClient.setQueryData({ queryKey: options.removeFromQuery }, (old) =>
          old.filter((item) => item.id !== variables.id)
        );
      }
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
