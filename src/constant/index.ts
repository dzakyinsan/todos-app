import MaleChar from './../assets/man.png'
import FemaleChar from './../assets/woman.png'

export const PNG_IMAGE_URL = "https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
export const PNG_IMAGE_ARTWORK_URL = "https://img.pokemondb.net/artwork/vector/large";
export const PNG_IMAGE_LITTLE = "https://img.pokemondb.net/sprites/black-white/anim/normal";

export const INITIAL_FILTER = {
    name: "",
    generationId: 0,
    typeId: 0,
    limit: 30,
    offset: 0,
};

export const Character_options = [
    {
        type: 'male',
        image: MaleChar
    },
    {
        type: 'female',
        image: FemaleChar
    }
]

export const GREETING_DATA = [
    {
        text: 'Hello, welcome to pokemon deck world'
    }

]

export const greetingtext: any = {
    step1: `Welcome to Pokémon Deck World! We're thrilled to have you join us on this exciting journey.`,
    step2: 'Choose Your Gender: Before we dive into the adventure, let us know your preferred gender. Are you a Pokémon Trainer ready to conquer the world as a male or female?',
    step3: `Once you've selected your gender, please provide us with your name. What shall we call you on this epic journey?`,
    step4: `! Get ready to immerse yourself in the thrilling world of Pokémon Deck World! Explore diverse regions, challenge formidable Gym Leaders, and build your ultimate deck to compete against other Trainers. Your Pokémon journey awaits!`
}

export const typeColor: any = {
    undefined: '#e5e7eb',
    bug: '#9dc130',
    dark: '#5f606d',
    dragon: '#0773c7',
    electric: '#edd53f',
    fairy: '#ef97e6',
    fighting: '#d94256',
    fire: '#fc6c6d',
    flying: '#9bb4e8',
    ghost: '#7975d4',
    grass: '#5dbe62',
    ground: '#d78555',
    ice: '#98d8d8',
    normal: '#9a9da1',
    poison: '#b563ce',
    psychic: '#f85888',
    rock: '#cec18c',
    steel: '#b8b8d0',
    water: '#60a5fa',
}