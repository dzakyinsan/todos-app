type TMoreInfo = {
  habitat: string;
  generation: string;
  isMythical: boolean;
  isLegendary: boolean;
  captureRate: number;
};

const MoreInfo = (props: TMoreInfo) => {
  const { habitat, generation, isLegendary, isMythical, captureRate } = props;
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
      value: isLegendary,
    },
    {
      name: "Mythical",
      value: isMythical,
    },
  ];
  return (
    <>
      {dataMore.map((val, i) => (
        <div className="d-flex justify-content-space-between more-info" key={i}>
          <span>{val.name}</span>
          <span>{val.value}</span>
        </div>
      ))}
    </>
  );
};

export default MoreInfo;
