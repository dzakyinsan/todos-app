import { Card, Tag } from "antd";
import { QueryPokemonsData } from "../../graphql/queries/pokemonList";

import "./style.scss";

const PNG_IMAGE_URL =
  "https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const WEBP_IMAGE_URL =
  "https://cdn.statically.io/gh/afiiif/pokemon-assets/main/artwork/webp";

const PokemonCard = ({
  id,
  name,
  pokemon_v2_pokemons,
  pokemon_v2_generation,
}: QueryPokemonsData[0]) => {
  const pngSrc = `${PNG_IMAGE_URL}/${id}.png`;
  const elmType = pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name;

  function mappingTypes() {
    const arrayTypes = pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
      ({ pokemon_v2_type }) => pokemon_v2_type.name
    );

    return arrayTypes.join(", ");
  }

  return (
    <Card className={`elm-${elmType}`}>
      <div>
        <h1>{name}</h1>
        <p>{mappingTypes()}</p>
        <Tag bordered={false} className="tag-id">{id}</Tag>
        <Tag bordered={false} color="magenta">
          {pokemon_v2_generation.name}
        </Tag>
      </div>
      <picture>
        <source srcSet={pngSrc} />
        <source srcSet={pngSrc} />
        <img src={pngSrc} alt={name} height="110px" />
      </picture>
      <div className="pokeball-flat" />
    </Card>
  );
};

export default PokemonCard;
