export type TState = {
  profile: {
    name: string;
    gender: string;
  }
  myPokemons: any[];
  isSuccess: boolean;
  tour: boolean
};

type TAction = {
  type: "add-pokemon" | "add-profile" | "delete" | "tour";
  payload: any
};

export const initialState = {
  profile: {},
  myPokemons: [],
  isSuccess: false,
  tour: true
};

export const mainReducer = (state: TState, action: TAction) => {
  let isSuccess = state.isSuccess;
  const dataParsed = JSON.parse(localStorage.getItem("myPokemons") || "");
  switch (action.type) {
    case "add-pokemon":
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
    case "add-profile":
      let profileParsed = JSON.parse(localStorage.getItem('profile') || "")
      if (action.payload) {
        profileParsed = {
          ...profileParsed,
          ...action.payload
        }
        localStorage.setItem("profile", JSON.stringify(profileParsed));
      }

      return {
        ...state,
        profile: profileParsed,
      };
    case "delete":
      const updatedData = dataParsed.filter((val: any) => val.nickname !== action.payload);
      localStorage.setItem("myPokemons", JSON.stringify(updatedData));
      return {
        ...state,
        myPokemons: updatedData,
      };
    case 'tour':
      if (!action.payload) {
        localStorage.setItem('tour', 'false');
        return { ...state, tour: false }
      }
      return { ...state, tour: (action.payload === 'true') }

    default:
      return state;
  }
};
