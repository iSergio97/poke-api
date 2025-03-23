import type { MoveLearnMethod } from './move_learn_method.interface';
import type { VersionGroup } from './version_group.interface';

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  order?: number;
  version_group: VersionGroup;
}
