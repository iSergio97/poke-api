import type { SearchPokemon } from './search_pokemon.interface';

export interface Search {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchPokemon[];
}
