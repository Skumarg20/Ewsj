import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  text: string;
  sender: string;
  timestamp: number;
}

interface ChatState {
  messages: Record<string, Message[]>;
}

const initialState: ChatState = {
  messages: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<{ groupId: string; message: Message }>) => {
      const { groupId, message } = action.payload;
      if (!state.messages[groupId]) {
        state.messages[groupId] = [];
      }
      state.messages[groupId].push(message);
    },
    clearMessages: (state, action: PayloadAction<string>) => {
      state.messages[action.payload] = [];
    },
  },
});

export const { sendMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
