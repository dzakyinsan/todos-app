export type TState = {
  myPokemons: any[];
  isSuccess: boolean;
};

type TAction = {
  type: "add" | "delete";
  payload: any;
};

export const initialState = {
  myPokemons: [],
  isSuccess: false,
};

export const mainReducer = (state: TState, action: TAction) => {
  const dataParsed = JSON.parse(localStorage.getItem("myPokemons") || "");
  switch (action.type) {
    case "add":
      let isSuccess = state.isSuccess;
      if (action.payload) {
        dataParsed?.unshift(action.payload);
        localStorage.setItem("myPokemons", JSON.stringify(dataParsed));
        isSuccess = true;
      }

      return {
        ...state,
        myPokemons: dataParsed,
        isSuccess,
      };
    case "delete":
      const updatedData = dataParsed.filter((val: any) => val.nickname !== action.payload.nickname);
      localStorage.setItem("myPokemons", JSON.stringify(updatedData));
      return {
        ...state,
        myPokemons: updatedData,
      };
    default:
      return state;
  }
};
