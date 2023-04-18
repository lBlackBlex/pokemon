import { createContext, Dispatch, SetStateAction, useState } from "react";
import { BattleTurn } from "../Enums/BattleTurn";
import { IBattle } from "../Interfaces/IBattle";

interface IBattleContext extends IBattle {
  setContext: Dispatch<SetStateAction<IBattle>>;
}

export const BattleContext = createContext<IBattleContext>({
  attack: {
    name: "",
    type: "",
    damage: 0,
  },
  turn: BattleTurn.Player,
  setContext: () => {},
});

interface Props {
  children: JSX.Element;
}

export function BattleContextProvider({ children }: Props) {
  const [battleInfo, setBattleInfo] = useState<IBattle>({
    attack: {
      name: "",
      type: "",
      damage: 0,
    },
    turn: BattleTurn.Player,
  });

  return (
    <BattleContext.Provider
      value={{
        attack: battleInfo.attack,
        turn: battleInfo.turn,
        setContext: setBattleInfo,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
}
