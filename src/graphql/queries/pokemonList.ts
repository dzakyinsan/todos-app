import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query getPokemons(
    $name: String
    $offset: Int
    $limit: Int
  ) {
    pokemon_v2_pokemonspecies(
      order_by: { id: asc }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      pokemon_v2_pokemons {
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
      pokemon_v2_generation {
        name
      }
    }
  }
`;

type FetchPokemonsResponse = {
  pokemon_v2_pokemonspecies: {
    id: number;
    name: string;
    pokemon_v2_pokemons: {
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: {
          name: string;
        };
      }[];
    }[];
    pokemon_v2_generation: {
      name: string;
    };
  }[];
};

export type QueryPokemonsDatas = FetchPokemonsResponse["pokemon_v2_pokemonspecies"];
export type QueryPokemonsData = FetchPokemonsResponse["pokemon_v2_pokemonspecies"][0];

// export const useGetPokemons = (filter: QueryPokemonFilter) => {
//   const { name, generationId, typeId, offset } = filter;

//   return gql`
//     query getPokemons {
//       pokemon_v2_pokemonspecies(
//         order_by: { id: asc }
//         limit: 30
//         offset: ${offset}
//         # offset: 0
//         where: {
//           name: { _ilike: "%${name}%" }
//           ${generationId ? `generation_id: { _eq: ${generationId} }` : ""}
//           ${
//             typeId
//               ? `pokemon_v2_pokemons: { pokemon_v2_pokemontypes: { type_id: { _eq: ${typeId} } } }`
//               : ""
//           }
//         }
//       ) {
//         id
//         name
//         pokemon_v2_pokemons {
//           pokemon_v2_pokemontypes {
//             pokemon_v2_type {
//               name
//             }
//           }
//         }
//         pokemon_v2_generation {
//           name
//         }
//       }
//     }
//   `;
// };
