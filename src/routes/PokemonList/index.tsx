import { Col, Row, Input } from "antd";
import { Waypoint } from "react-waypoint";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QueryPokemonsData, GET_POKEMONS } from "../../graphql/queries/pokemonList";
import PokemonCard from "../../components/PokemonCard";
import LoadingCard from "../../components/LoadingCard";
import { INITIAL_FILTER } from "../../constant/variables";
import { SearchProps } from "antd/es/input/Search";

import "./style.scss";

const { Search } = Input;

const PokemonList = () => {
  const history = useHistory();
  const { data, fetchMore, loading, refetch, error } = useQuery(GET_POKEMONS, {
    variables: INITIAL_FILTER,
    notifyOnNetworkStatusChange: true,
  });

  function toDetail(id: number) {
    history.push(`/pokemons/${id}`);
  }

  const onSearch: SearchProps["onSearch"] = (value) => {
    refetch({
      name: value,
    });
  };

  return (
    <div className="pokemon-list-container">
      <Search className="m-bottom-1" placeholder="Search pokemon" onSearch={onSearch} size="large" />
      <Row className="mb-2">
        {data?.pokemon_v2_pokemonspecies.map((pokemon: QueryPokemonsData, i: any) => (
          <Col xs={24} sm={12} md={12} lg={12} xl={8} key={i} style={{ padding: "5px" }}>
            <PokemonCard {...pokemon} onClick={() => toDetail(pokemon.id)} />
            {i === data.pokemon_v2_pokemonspecies.length - 1 && (
              <Waypoint
                onEnter={() => {
                  fetchMore({
                    variables: {
                      offset: data.pokemon_v2_pokemonspecies[data.pokemon_v2_pokemonspecies.length - 1].id,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return {
                        pokemon_v2_pokemonspecies: [...prev.pokemon_v2_pokemonspecies, ...fetchMoreResult.pokemon_v2_pokemonspecies],
                      };
                    },
                  });
                }}
              />
            )}
          </Col>
        ))}
      </Row>
      {loading && <LoadingCard />}
    </div>
  );
};

export default PokemonList;
