import type { Ability } from './ability.interface';
import type { Cries } from './cries.interface';
import type { Form } from './form.interface';
import type { Index } from './index.interface';
import type { Mfe } from './mfe.interface';
import type { Species } from './species.interface';
import type { Sprites } from './sprites.interface';
import type { HeldItem } from './held_item.interface';
import type { PastType } from './past_type.interface';
import type { Types } from './types.interface';

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Form[];
  game_indices: Index[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Mfe[];
  name: string;
  order: number;
  // past_abilities: any[];
  past_types: PastType[];
  species: Species;
  sprites: Sprites;
  stats: StaticRange[];
  types: Types[];
  weight: number;
}
