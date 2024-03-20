import { Col, Row, Progress } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import MoreInfo from "./components/more-info";
import { GET_POKEMONS_DETAIL, QueryPokemonDetail } from "../../graphql/queries/pokemonDetail";
import { PNG_IMAGE_ARTWORK_URL } from "../../constant/image";
import Pokeball from "./../../assets/pokeball-logo-2.png";

import "./style.scss";

type TPokemonStat = QueryPokemonDetail["pokemon_v2_pokemons"][0]["pokemon_v2_pokemonstats"][0];

const PokemonDetail = () => {
  const { id } = useParams<any>();

  const { data, fetchMore, loading } = useQuery(GET_POKEMONS_DETAIL, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const {
    id: pokemonId,
    name,
    pokemon_v2_pokemons,
    pokemon_v2_pokemonhabitat,
    pokemon_v2_generation,
    pokemon_v2_evolutionchain,
    is_mythical,
    is_legendary,
    capture_rate,
  } = data?.pokemon_v2_pokemonspecies[0] || {};

  const pokemonTypes = (data && pokemon_v2_pokemons[0]?.pokemon_v2_pokemontypes) || [];

  const pngSrcAlt = `${PNG_IMAGE_ARTWORK_URL}/${name}.png`;

  return loading ? (
    <div>loading...</div>
  ) : (
    <Row className={`card-detail elm-${pokemonTypes[0]?.pokemon_v2_type?.name}`}>
      <Col md={24} lg={12}>
        <img src={require(`./../../assets/icons/${pokemonTypes[0]?.pokemon_v2_type?.name}.svg`)} alt="backdrop" className="backdrop-image" />
        <div className="d-flex justify-content-center flex-dir-column m-1">
          <span className="pokemon-id">{`#${pokemonId}`}</span>
          <div className="d-flex justify-content-center">
            <img src={pngSrcAlt} alt={data?.pokemon_v2_pokemonspecies[0]?.name} className="pokemon-image" />
          </div>
          <div className="d-flex justify-content-center m-2 w-100">
            <span className="name-tag">
              <img src={Pokeball} alt="pokeball-img" />
              {name}
            </span>
            {pokemonTypes?.map(({ pokemon_v2_type }: any, i: number) => (
              <img src={require(`./../../assets/types/${pokemon_v2_type?.name}.png`)} alt="type" height="40px" style={{ marginLeft: "5px", marginTop: "6px" }} key={i} className="types-name" />
            ))}
          </div>
        </div>
      </Col>
      <Col span={24} lg={{ span: 10, offset: 2 }}>
        <div className="d-flex justify-content-center flex-dir-column m-1">
          <div>
            <h1>Base Stats</h1>
            {pokemon_v2_pokemons[0]?.pokemon_v2_pokemonstats?.map((val: TPokemonStat, i: number) => (
              <div key={i} className="d-flex justify-content-space-between">
                <span>{val?.pokemon_v2_stat?.name.replace("-", " ")}</span>
                <Progress percent={val.base_stat} strokeColor={"#ffe58f"} style={{ width: "50%" }} format={(val) => <span style={{ color: "white" }}>{val}</span>} />
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-center flex-dir-column m-1">
          <div>
            <h1>More Info</h1>
            <MoreInfo habitat={pokemon_v2_pokemonhabitat.name} generation={pokemon_v2_generation.name} isLegendary={is_legendary} isMythical={is_mythical} captureRate={capture_rate} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PokemonDetail;
