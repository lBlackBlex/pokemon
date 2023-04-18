import { Position } from "./IPosition";

interface IFrames {
  max: number | bigint | any;
  hold: number;
}

export interface ISprite {
  position: Position;
  image: HTMLImageElement;
  frames?: IFrames;
  sprites?: {
    up: HTMLImageElement;
    left: HTMLImageElement;
    right: HTMLImageElement;
    down: HTMLImageElement;
  };
  animate?: boolean;
  isEnemy?: boolean;
  show?: boolean;
  rotation?: number;
  name: string;
}
