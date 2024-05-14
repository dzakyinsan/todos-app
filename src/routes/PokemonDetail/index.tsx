import { useQuery } from "@apollo/client";
import { Button, Col, Modal, Progress, Row } from "antd";
import { useState } from "react";
import { Slide } from "react-awesome-reveal";
import { useHistory, useParams } from "react-router-dom";

import { PNG_IMAGE_ARTWORK_URL, typeColor } from "../../constant";
import { GET_POKEMONS_DETAIL, QueryPokemonDetail } from "../../graphql/queries/pokemonDetail";
import { TModal } from "../../types/global";
import ModalContent from "./components/modal-content";
import MoreInfo from "./components/more-info";

import { ArrowRightOutlined } from "@ant-design/icons";
// import Pokeball from './../../assets/pokeball-logo.png';

import "./style.scss";


type TPokemonStat = QueryPokemonDetail["pokemon_v2_pokemons"][0]["pokemon_v2_pokemonstats"][0];

const PokemonDetail = () => {
  const { id } = useParams<any>();
  const [modal, setModal] = useState<TModal>();
  const { push } = useHistory();

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
  const pokemonEvolution = pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies || [];
  const pngSrcAlt = `${PNG_IMAGE_ARTWORK_URL}/${name}.png`;

  function onCloseModal() {
    setModal({ open: false });
  }

  function onOpenModal() {
    setModal({
      title: "",
      className: "catch-modal",
      contentTemplate: <ModalContent data={data?.pokemon_v2_pokemonspecies[0]} onCancel={onCloseModal} />,
      open: true,
      onCancel: onCloseModal,
    });
  }

  const style: any = {
    '--custom-color': typeColor[pokemonTypes[0]?.pokemon_v2_type?.name],
  };

  function toDetail(id: number) {
    push(`/pokemons/${id}`);
  }

  return loading ? (
    <div className="d-flex justify-content-center align-items-center" style={{ color: 'white', height: '100vh' }}>loading...</div>
  ) : (
    <div className="pokemon-detail">
      <Row className="p-2" gutter={[16, 16]}>
        <Col span={24}>
          <section className="image-section">
            <div style={style} className="box three" />
            <div style={style} className="box two" />
            <div style={style} className='box' />
            <div className="image-detail">
              <Row>
                <Col span={24}>
                  <Slide direction="down">
                    <h2>{name}</h2>
                    <h6>{`#${pokemonId}`}</h6>
                  </Slide>
                </Col>
                <Col span={24}>
                  <Slide direction="down">
                    <div className="d-flex justify-content-space-between">
                      <div className="m-top-1">
                        {pokemonTypes?.map(({ pokemon_v2_type }: any, i: number) => (
                          <img src={require(`./../../assets/types/${pokemon_v2_type?.name}.png`)} alt="type" height="40px" key={i} className="types-name" />
                        ))}
                      </div>
                      <div style={{ flex: '1' }} className="d-flex justify-content-center">
                        <img src={pngSrcAlt} alt={name} className="pokemon-img" />
                      </div>
                    </div>
                  </Slide>
                </Col>
                <Col span={24}>
                  <Slide direction="down">
                    <Button size="large" className="catch-btn" onClick={onOpenModal}>Catch</Button>
                  </Slide>
                </Col>
              </Row>
            </div>
          </section>
        </Col>
        <Col span={24}>
          <Slide direction="down">
            <section className="evol-section">
              <h1> Evolution Chain</h1>
              <Row gutter={[16, 16]}>
                {pokemonEvolution?.map((val: any, i: number) => {
                  const pngSrc = `${PNG_IMAGE_ARTWORK_URL}/${val.name}.png`;

                  return (
                    <Col key={i} xs={24} sm={8} className="d-flex between">
                      <div className={`card elm-${pokemonTypes[0]?.pokemon_v2_type?.name}`} onClick={() => toDetail(val.id)}>
                        <img src={pngSrc} alt={val.name} height="40px" />
                        <span>
                          <p>{val.name}</p>
                          {val.pokemon_v2_pokemonevolutions[0]?.min_level && (
                            <div className="level"> Lv {val.pokemon_v2_pokemonevolutions[0]?.min_level}</div>
                          )}
                        </span>
                      </div>
                      {i !== pokemonEvolution.length - 1 && (
                        <div className="arrow">
                          <ArrowRightOutlined rev={''} height="10px" />
                        </div>
                      )}
                    </Col>
                  );
                })}
              </Row>
            </section>
          </Slide>
        </Col>
        <Col xs={24} sm={24} md={14}>
          <Slide direction="down">
            <section className="stat-section">
              <div className="d-flex justify-content-center flex-dir-column">
                <h1>Base Stats</h1>
                {pokemon_v2_pokemons[0]?.pokemon_v2_pokemonstats?.map((val: TPokemonStat, i: number) => (
                  <div key={i} className="d-flex justify-content-space-between">
                    <span>{val?.pokemon_v2_stat?.name.replace("-", " ")}</span>
                    <Progress percent={val.base_stat} strokeColor={typeColor[pokemonTypes[0]?.pokemon_v2_type?.name]} style={{ width: "50%" }} format={(val) => <span style={{ color: "gray" }}>{val}</span>} />
                  </div>
                ))}
              </div>
            </section>
          </Slide>
        </Col>
        <Col xs={24} sm={24} md={10}>
          <Slide direction="down">
            <section className="info-section">
              <div className="d-flex justify-content-center flex-dir-column">
                <h1>More Info</h1>
                <MoreInfo habitat={pokemon_v2_pokemonhabitat?.name} generation={pokemon_v2_generation?.name} isLegendary={is_legendary} isMythical={is_mythical} captureRate={capture_rate} />
              </div>
            </section>
          </Slide>
        </Col>
      </Row>
      <Modal {...modal} footer={null}>
        {modal?.contentTemplate}
      </Modal>
    </div>
  );
};

export default PokemonDetail;
