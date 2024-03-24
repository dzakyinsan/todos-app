import { Button, Card, Tag } from "antd";
import { QueryPokemonsData } from "../../graphql/queries/pokemonList";
import { PNG_IMAGE_ARTWORK_URL } from "../../constant/image";

import "./style.scss";

type TPokemonCard = QueryPokemonsData & {
  onClick?: () => void;
  onDelete?: () => void;
  nickname?: string;
};

const PokemonCard = ({ id, name, nickname = "", pokemon_v2_pokemons, pokemon_v2_generation, onClick, onDelete }: TPokemonCard) => {
  const pngSrc = `${PNG_IMAGE_ARTWORK_URL}/${name}.png`;
  const elmType = pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name;

  function mappingTypes() {
    const arrayTypes = pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => pokemon_v2_type.name);

    return arrayTypes.join(", ");
  }

  return (
    <Card className={`pokemon-card elm-${elmType}`} onClick={onClick}>
      <div>
        <h1>{nickname ? nickname : name}</h1>
        <p>{mappingTypes()}</p>
        {nickname ? (
          <Button type="primary" onClick={onDelete}>
            lepaskan
          </Button>
        ) : (
          <>
            <Tag bordered={false} className="tag-id">
              {id}
            </Tag>
            <Tag bordered={false} color="magenta">
              {pokemon_v2_generation.name}
            </Tag>
          </>
        )}
      </div>
      <picture>
        <source srcSet={pngSrc} />
        <source srcSet={pngSrc} />
        <img src={pngSrc} alt={name} height="110px" />
      </picture>
      {!nickname && <div className="pokeball-flat" />}
    </Card>
  );
};

export default PokemonCard;
