import { SET_CLOSE_BRANCH_DATA } from "../actions";

const initialState = {
  closeBranchData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CLOSE_BRANCH_DATA: {
      const { closeBranchData } = action.payload;
      return {
        ...state,
        closeBranchData,
      };
    }
    default:
      return state;
  }
}
