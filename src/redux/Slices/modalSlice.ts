import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  integrationModal: {
    isOpen: boolean;
    accountData: any | null;
  };
};

const initialState: ModalState = {
  integrationModal: {
    isOpen: false,
    accountData: null,
  },
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openIntegrationModal: (state, action: PayloadAction<any>) => {
      state.integrationModal.isOpen = true;
      state.integrationModal.accountData = action.payload;
    },
    closeIntegrationModal: (state) => {
      state.integrationModal.isOpen = false;
      state.integrationModal.accountData = null;
    },
  },
});

export const { openIntegrationModal, closeIntegrationModal } = modalSlice.actions;
export default modalSlice.reducer;
