import { useContext } from "react";
import { BattleContext } from "../Context/BattleContext";

export function useBattleInfo() {
  const { attack, turn, setContext } = useContext(BattleContext);
  return { attack, turn, setBattleInfo: setContext };
}
