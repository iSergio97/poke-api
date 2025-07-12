import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import type { Pokemon } from "@/interface/pokemon.interface";

export const getPokemonById = async (id: number) => {
  const { data: pokemon } = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);

  for (const ability of pokemon.abilities) {
    const { data: abilityData } = await axios.get(ability.ability.url);

    ability.ability = {
      ...ability.ability,
      root: abilityData
    };
  }

  return pokemon;
};
