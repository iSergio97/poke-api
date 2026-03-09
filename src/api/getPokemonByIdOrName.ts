import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import type { Pokemon } from "@/interface/pokemon.interface";

export const getPokemonByIdOrName = async (id: number | string): Promise<Pokemon> => {
  try {
    const { data: pokemon } = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);

    // Esperamos a que terminen ambas
    const [enrichedAbilities, enrichedMoves] = await Promise.all([
      enrich(
        pokemon.abilities, // lista
        (a) => a.ability.url, // función para obtener la URL. Por cada elemento que se itere, se usara el valor de a.ability.url para hacer la petición
        (a, data) => ({ ...a, ability: { ...a.ability, root: data } }) // función para fusionar datos
      ),

      enrich(
        pokemon.moves, // lista
        (m) => m.move.url, // función para obtener la URL. Por cada elemento que se itere, se usara el valor de m.move.url para hacer la petición
        (m, data) => ({ ...m, move: { ...m.move, moveRoot: data } }) // función para fusionar datos
      ),
    ]);

    // Devolver nuevo objeto Pokémon enriquecido
    return {
      ...pokemon,
      abilities: enrichedAbilities,
      moves: enrichedMoves,
    };
  } catch (error) {
    console.error(`Error al obtener Pokémon con ID o nombre ${id}:`, error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

const enrich = async <T>(list: T[], getURL: (item: T) => string, merge: (item: T, data: any) => T) => {
  return Promise.all(
    list.map(async (item) => {
      try {
        const { data } = await axios.get(getURL(item));
        return merge(item, data);
      } catch (error) {
        console.error(`Error al enriquecer item con URL ${getURL(item)}:`, error);
        return item; // Devuelve el item original si falla
      }
    })
  );
}
