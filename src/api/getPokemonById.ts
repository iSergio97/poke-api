import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import type { Pokemon } from "@/interface/pokemon.interface";

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  const { data: pokemon } = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);

  // Obtener habilidades en paralelo
  const abilityPromises = pokemon.abilities.map(async (ability) => {
    try {
      const { data: abilityData } = await axios.get(ability.ability.url);
      return { ...ability, ability: { ...ability.ability, root: abilityData } };
    } catch (err) {
      console.error(`Error al cargar habilidad: ${ability.ability.name}`, err);
      return ability; // Devuelve sin root si falla
    }
  });

  // Obtener movimientos en paralelo
  const movePromises = pokemon.moves.map(async (move) => {
    try {
      const { data: moveData } = await axios.get(move.move.url);
      return { ...move, move: { ...move.move, moveRoot: moveData } };
    } catch (err) {
      console.error(`Error al cargar movimiento: ${move.move.name}`, err);
      return move; // Devuelve sin moveRoot si falla
    }
  });

  // Esperamos a que terminen ambas
  const [enrichedAbilities, enrichedMoves] = await Promise.all([
    Promise.all(abilityPromises),
    Promise.all(movePromises),
  ]);

  // Devolver nuevo objeto Pokémon enriquecido
  return {
    ...pokemon,
    abilities: enrichedAbilities,
    moves: enrichedMoves,
  };
};
