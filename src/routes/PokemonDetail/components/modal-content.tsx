import { useContext, useEffect, useState } from "react";
import { Button, Input, Space, message } from "antd";
import { useHistory } from "react-router-dom";
import { PNG_IMAGE_LITTLE } from "../../../constant/image";
import { QueryPokemonDetail } from "../../../graphql/queries/pokemonDetail";
import ForestImage from "./../../../assets/forest-bg.webp";
import TextBox from "./../../../assets/text-box.png";
import loadingImg from "./../../../assets/pokeball-loading.gif";
import MainContext from "../../../context/mainContext";

type IModalContent = {
  data: QueryPokemonDetail;
  onCancel: () => void;
  resetType?: () => void;
};

type TStage = "desc" | "success" | "failed";

const ModalContent = (props: IModalContent) => {
  const { data, onCancel } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const { push } = useHistory();
  const { state, dispatch } = useContext(MainContext);
  const [stage, setStage] = useState<TStage>("desc");
  const [loading, setLoading] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  const pngSrcAlt = `${PNG_IMAGE_LITTLE}/${data.name}.gif`;

  function popMessage(type: "success" | "error", message: string) {
    messageApi.open({
      type: type,
      content: message,
      className: "custom-class",
      style: {
        marginTop: "17vh",
      },
    });
  }

  function winProbability(percentProbability: number): Promise<boolean> {
    setLoading(true);
    return new Promise((resolve) => {
      let randomNum = Math.random() * 100;
      setTimeout(() => {
        resolve(randomNum < percentProbability ? true : false);
        setLoading(false);
      }, 2000);
    });
  }

  async function onCatch() {
    const result = await winProbability(data.capture_rate);
    if (result) {
      popMessage("success", "berhasil ditangkap");
      setStage("success");
    } else {
      popMessage("error", "gagal ditangkap");
      setStage("failed");
    }
  }

  function onSave() {
    const isUniq = state.myPokemons?.find((val: any) => val.nickname === pokemonName) || {};
    if (isUniq?.nickname) {
      popMessage("error", "nama sudah terdaftar");
    } else {
      dispatch({
        type: "add",
        payload: {
          ...data,
          nickname: pokemonName,
        },
      });
      push("/my-pokemons");
    }
  }

  function renderContent() {
    const content = {
      desc: renderMainModal(`rate menangkap pokemon ini adalah ${data.capture_rate}%, apakah kamu yakin ingin menangkapnya?`),
      success: renderMainModal("yeayy pokemon berhasil di tangkap, berikan nama untuk pokemonmu"),
      failed: renderMainModal("gagal menangkap pokemon, coba tangkap lagi"),
    };

    return content[stage];
  }

  const renderMainModal = (text: string) => {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 flex-dir-column">
        <img src={loading ? loadingImg : pngSrcAlt} alt={data.name} className="pokemon-image" />
        <img src={TextBox} alt="textbox" className="text-box" />
        <div className="text">
          <p>{text}</p>
          {stage === "success" ? (
            <Space.Compact>
              <Input placeholder="berikan pokemon name" onChange={(e) => setPokemonName(e.target.value)} />
              <Button onClick={onSave} disabled={!pokemonName}>
                simpan
              </Button>
            </Space.Compact>
          ) : (
            <>
              <Button type="text" onClick={onCancel} disabled={loading}>
                {" "}
                lepaskan
              </Button>
              <Button type="text" danger onClick={onCatch} disabled={loading}>
                tangkap
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="modal-forest-bg" style={{ backgroundImage: `url(${ForestImage})` }}>
      {contextHolder}
      {renderContent()}
    </div>
  );
};

export default ModalContent;
