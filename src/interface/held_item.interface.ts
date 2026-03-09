import type { Item } from './item.interface';
import type { VersionDetail } from './version_detail.interface';

export interface HeldItem {
  item: Item;
  version_details: VersionDetail[];
}
