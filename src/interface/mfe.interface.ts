import type { Move } from './move.interface';
import type { VersionGroupDetail } from './version_group_detail.interface';

export interface Mfe {
  move: Move;
  version_group_details: VersionGroupDetail[];
}
