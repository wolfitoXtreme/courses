export const updateState = (state: any, newValues: any) => {
  return {
    ...state,
    ...newValues,
  };
};
