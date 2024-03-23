import { useContext } from "react";
import MainContext from "../../context/mainContext";
import { Col, Row } from "antd";
import PokemonCard from "../../components/PokemonCard";

const MyPokemons = () => {
  const {
    state: { myPokemons },
  } = useContext(MainContext);

  console.log({ local: localStorage.getItem("myPokemons") });

  return (
    <div>
      <p>my pokemons</p>
      <Row className="mb-2">
        {myPokemons?.map((val, i) => (
          <Col xs={24} sm={12} md={12} lg={12} xl={8} key={i} style={{ padding: "5px" }}>
            <PokemonCard {...val} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyPokemons;
