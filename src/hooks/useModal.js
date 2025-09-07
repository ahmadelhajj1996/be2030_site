import { useReducer , useMemo } from "react";
import { modalActions, modalReducer } from "../constants/general";

export const useModal = () => {
  const [modalState, dispatch] = useReducer(modalReducer, {
    isModalOpen: false,
    isDeleteOpen: false,
    selectedItem: null,
    mode: null,
  });

  // Memoize all modal functions to maintain stable references
  const modalFunctions = useMemo(
    () => ({
      openViewModal: (item) => {
        dispatch({ type: modalActions.OPEN_VIEW, payload: item });
      },
      openAddModal: () => {
        dispatch({ type: modalActions.OPEN_ADD });
      },
      openFreezeModal: (item) => {
        dispatch({ type: modalActions.OPEN_FREEZE, payload: item });
      },
      openEditModal: (item) => {
        dispatch({ type: modalActions.OPEN_EDIT, payload: item });
      },
      openDeleteModal: (item) => {
        dispatch({ type: modalActions.OPEN_DELETE, payload: item });
      },
      closeAllModals: () => {
        dispatch({ type: modalActions.CLOSE_ALL });
      },
    }),
    []
  ); // Empty dependency array ensures these are created only once

  return {
    modalState,
    dispatch,
    ...modalFunctions,
  };
};
