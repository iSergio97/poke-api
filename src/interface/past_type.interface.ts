import type { Type } from './type.interface';

export interface PastType {
  generation: {
    name: string;
    url: string;
  }[];
  types: Type[];
}
