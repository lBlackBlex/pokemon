import { Dispatch, SetStateAction } from "react";
import { Sprite } from "../Classes/Sprite";
import { BattleTurn } from "../Enums/BattleTurn";

export interface IBattleAnimation {
  initiated: boolean;
}

export interface IBattle {
  attack: IAttack;
  turn: BattleTurn;
}

export interface IAttack {
  name: string;
  type: string;
  damage: number;
}

export interface IBattleAttack {
  attack: IAttack;
  recipient: Sprite;
  callback: Dispatch<SetStateAction<boolean>>;
  useCallback: boolean;
}

export interface IHealths {
  p: number;
  o: number;
}
