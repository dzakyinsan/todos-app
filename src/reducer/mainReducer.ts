type TState = {
  myPokemons: any[];
};

type TAction = {
  type: "add" | "delete";
  payload: any;
};

export const initialState = {
  myPokemons: [],
};

export const mainReducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case "add":
      const dataParsed = JSON.parse(localStorage.getItem("myPokemons") || "");

      if (action.payload) {
        dataParsed?.push(action.payload);
        localStorage.setItem("myPokemons", JSON.stringify(dataParsed));
      }

      return {
        ...state,
        myPokemons: dataParsed,
      };
    case "delete":
      console.log("delete");
      return state;
    default:
      return state;
  }
};
