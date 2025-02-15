import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Group {
  id: string;
  name: string;
}

interface GroupsState {
  groups: Group[];
}

const initialState: GroupsState = {
  groups: [
    { id: "sales", name: "Sales Team" },
    { id: "traffic", name: "Traffic Management" },
  ],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
  },
});

export const { addGroup, removeGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
