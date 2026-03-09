import type { DreamWorld } from './dream_world.interface';
import type { Home } from './home.interface';
import type { OfficialArtwork } from './oficial_art_work.interface';
import type { Showdown } from './showdown.interface';

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
  showdown: Showdown;
}
