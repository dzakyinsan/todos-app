import { Tag } from "antd";

type TMoreInfo = {
  habitat: string;
  generation: string;
  isMythical: boolean;
  isLegendary: boolean;
  captureRate: number;
};

const MoreInfo = (props: TMoreInfo) => {
  const { habitat = "", generation, isLegendary, isMythical, captureRate } = props;
  const dataMore = [
    {
      name: "Habitat",
      value: habitat,
    },
    {
      name: "Generation",
      value: generation,
    },
    {
      name: "Capture Rate",
      value: `${captureRate}%`,
    },
    {
      name: "Legendary",
      value: isLegendary ? <Tag color="#ee292f">Legendary</Tag> : "-",
    },
    {
      name: "Mythical",
      value: isMythical ? <Tag color="#f2cd5e">Mythical</Tag> : "-",
    },
  ];
  return (
    <>
      {dataMore.map((val, i) => (
        <div className="more-info" key={i}>
          <span>{val.name}</span>
          <span className="gray">{val.value}</span>
        </div>
      ))}
    </>
  );
};

export default MoreInfo;
