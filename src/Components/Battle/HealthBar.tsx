import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sprite } from "../../Classes/Sprite";
import { draggle, emby } from "../../Constants";
import { BattleTurn } from "../../Enums/BattleTurn";
import { useBattleInfo } from "../../Hooks/UseBattle";
import { IHealths } from "../../Interfaces/IBattle";
import { IBeast } from "../../Interfaces/IBeast";
import styles from "./Battle.module.css";

interface Props {
  oponent: IBeast;
  player: IBeast;
  oponentTurn: () => void;
  playerTurn: () => void;
}

const HealthBar = ({ oponent, player, playerTurn, oponentTurn }: Props) => {
  const { turn } = useBattleInfo();

  useEffect(() => {
    if (turn == BattleTurn.Player) oponentTurn();
    else playerTurn();
  }, [turn]);

  return (
    <>
      <div className={styles.oponentHealthContainer}>
        <h1>{oponent.name}</h1>
        <div className={styles.healthBar}>
          <div className={styles.healthBarBackground}></div>
          <div
            className={styles.healthBarMain}
            style={{ width: `${oponent.health}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.playerHealthContainer}>
        <h1>{player.name}</h1>
        <div className={styles.healthBar}>
          <div className={styles.healthBarBackground}></div>
          <div
            className={styles.healthBarMain}
            style={{ width: `${player.health}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default HealthBar;
