import { useContext } from "react";
import MainContext from "../../context/mainContext";
import { Col, Row } from "antd";
import PokemonCard from "../../components/PokemonCard";

const MyPokemons = () => {
  const {
    state: { myPokemons },
    dispatch,
  } = useContext(MainContext);

  function handleDelete(nickname: string) {
    dispatch({
      type: "delete",
      payload: {
        nickname,
      },
    });
  }

  return (
    <div>
      <h3 style={{ color: "white" }}>my pokemons</h3>
      <Row className="mb-2">
        {myPokemons?.map((val, i) => (
          <Col xs={24} sm={12} md={12} lg={12} xl={8} key={i} style={{ padding: "5px" }}>
            <PokemonCard {...val} onDelete={() => handleDelete(val.nickname)} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyPokemons;
