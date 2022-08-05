import { writable } from "svelte/store";

const POKE_URL = "https://pokeapi.co/api/v2/pokemon";
const POKE_IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

const callPokeAPI = async (url) => {
    const res = await fetch(url);
    return await res.json();
}

export const fetchPokemon = async (id, limit, offset = 0) => {
    const url = `${POKE_URL}?limit=${limit}` + (offset ? `&offset=${offset}` : "")
    const { results } = await callPokeAPI(url);
    const loadedPokemon = results.map(({ name }, index) => {
        const id = offset + index + 1
        const image = `${POKE_IMAGE}${id}.png`

        return { id, name, image }
    });

    pokeMap.set(id, loadedPokemon)
    Pokemon.set(loadedPokemon)
}

const pokeDetails = {};
const pokeMap = new Map();
export const Pokemon = writable([]);
export const Region = writable('1');

export const fetchRegion = ({ id, limit, offset }) => {
    if (pokeMap.has(id)) {
        Pokemon.set(pokeMap.get(id))
        return;
    }

    return fetchPokemon(id, limit, offset);
}

export const getPokemonById = async (pokeId) => {
    if (pokeDetails[pokeId]) return pokeDetails[pokeId];

    try {
        const url = `${POKE_URL}/${pokeId}`;
        const data = await callPokeAPI(url);

        pokeDetails[pokeId] = data
        return data;
    } catch (pokeError) {
        console.error(pokeError)
        return;
    }
}