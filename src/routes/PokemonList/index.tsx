import { Col, Row } from "antd";
import { Waypoint } from "react-waypoint";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QueryPokemonsData, GET_POKEMONS } from "../../graphql/queries/pokemonList";
import PokemonCard from "../../components/PokemonCard";
import LoadingCard from "../../components/LoadingCard";

import "./style.scss";

const INITIAL_FILTER = {
  name: "",
  generationId: 0,
  typeId: 0,
  limit: 30,
  offset: 0,
};

const PokemonList = () => {
  const history = useHistory();
  const { data, fetchMore, loading } = useQuery(GET_POKEMONS, {
    variables: INITIAL_FILTER,
    notifyOnNetworkStatusChange: true,
  });

  function toDetail(id: number) {
    history.push(`/pokemons/${id}`);
  }

  return (
    <div className="pokemon-list-container">
      <Row gutter={[16, 16]} className="mb-2">
        {data?.pokemon_v2_pokemonspecies.map((pokemon: QueryPokemonsData, i: any) => (
          <Col xs={24} sm={12} md={12} lg={12} xl={8} key={i}>
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
