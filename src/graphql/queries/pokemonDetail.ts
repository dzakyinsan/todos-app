import { gql } from "@apollo/client";

export const GET_POKEMONS_DETAIL = gql`
  query getPokemonDetail($id: Int) {
    pokemon_v2_pokemonspecies(where: { id: { _eq: $id } }, order_by: { id: asc }) {
      id
      name
      pokemon_v2_pokemons(where: { id: { _eq: $id } }) {
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
      }
      pokemon_v2_generation {
        name
      }
      pokemon_v2_pokemonhabitat {
        name
      }
      capture_rate
      is_mythical
      is_legendary
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies(where: { _not: { id: { _eq: $id } } }) {
          name
        }
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
      pokemon_v2_pokemonstats: {
        base_stat: number;
        pokemon_v2_stat: {
          name: string;
        };
      }[];
    }[];
    pokemon_v2_generation: {
      name: string;
    };
    pokemon_v2_pokemonhabitat: {
      name: string;
    };
    capture_rate: number;
    is_mythical: boolean;
    is_legendary: boolean;
    pokemon_v2_evolutionchain: {
      pokemon_v2_pokemonspecies: {
        name: string;
      }[];
    };
  }[];
};

export type QueryPokemonDetails = FetchPokemonsResponse["pokemon_v2_pokemonspecies"];
export type QueryPokemonDetail = FetchPokemonsResponse["pokemon_v2_pokemonspecies"][0];
