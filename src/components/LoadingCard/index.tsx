import { Col, Row, Skeleton } from "antd";
import noPokemonImg from "./../../assets/no-pokemon.png";

export const LoadingCard = () => {
  const LOADING_VARIABLES = [1, 2, 3, 4, 5, 6];

  return (
    <Row>
      {LOADING_VARIABLES.map((val) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={8} key={val} style={{ padding: "5px" }}>
          <Skeleton.Button active block size="large" />
        </Col>
      ))}
    </Row>
  );
};

export const renderNoData = (title: string) => (
  <div className="d-flex justify-content-center align-items-center flex-dir-column" style={{ height: "50vh" }}>
    <>
      <img src={noPokemonImg} alt="no-data" width="100px" />
      <h3 style={{ color: "white" }}>{title}</h3>
    </>
  </div>
);
