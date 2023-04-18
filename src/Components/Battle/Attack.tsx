import React, { useEffect, useState } from "react";
import { Sprite } from "../../Classes/Sprite";
import {
  draggle,
  emby,
  fireball,
  oponentAttacks,
  playerAttacks,
} from "../../Constants";
import { BattleTurn } from "../../Enums/BattleTurn";
import { useBattleInfo } from "../../Hooks/UseBattle";
import { IAttack, IHealths } from "../../Interfaces/IBattle";
import { IBeast } from "../../Interfaces/IBeast";
import AttackDialog from "./AttackDialog";
import styles from "./Battle.module.css";
import HealthBar from "./HealthBar";

const monsters = {
  draggle: {
    name: "Draggle",
    health: 100,
  },
  emby: {
    name: "Toluca I",
    health: 100,
  },
};

const initialState = {
  attack: {
    name: "",
    type: "",
    damage: 0,
  },
  turn: BattleTurn.Player,
};

const Attack = () => {
  const { attack, turn, setBattleInfo } = useBattleInfo();
  const [showDialog, setShowDialog] = useState(false);
  const [dialog, setDialog] = useState("");

  const [oponent, setOponent] = useState<IBeast>({
    name: "Draggle",
    health: 100,
  });

  const [player, setPlayer] = useState<IBeast>({
    name: "Toluca I",
    health: 100,
  });

  const battleAttackSetup = (attack: IAttack, useCallback: boolean) => {
    const { atacker, recipient } = getTurns();
    setDialog(`${atacker.getName} uso ${attack.name}`);
    setBattleInfo({
      attack: {
        name: attack.name,
        type: attack.type,
        damage: attack.damage,
      },
      turn: turn == BattleTurn.Player ? BattleTurn.Oponent : BattleTurn.Player,
    });
    atacker.attack({
      attack: {
        name: attack.name,
        type: attack.type,
        damage: attack.damage,
      },
      recipient: recipient,
      callback: setShowDialog,
      useCallback,
    });
  };

  const playerAttack = (
    attackName: string,
    attackType: string,
    attackDamage: number
  ) => {
    setShowDialog(true);
    fireball.setRotation = 1;
    battleAttackSetup(
      {
        name: attackName,
        type: attackType,
        damage: attackDamage,
      },
      false
    );
  };

  const oponentAttack = () => {
    const selectedAttack =
      oponentAttacks[Math.floor(Math.random() * oponentAttacks.length)];

    fireball.setRotation = -2.2;
    battleAttackSetup(selectedAttack, true);
  };

  const getTurns = () => {
    const atacker = turn == BattleTurn.Player ? emby : draggle;
    const recipient = turn == BattleTurn.Player ? draggle : emby;
    return { atacker, recipient };
  };

  const setFainted = (monster: Sprite) => {
    setTimeout(() => {
      monster.faint();
      setPlayer(monsters.emby);
      setOponent(monsters.draggle);
      setBattleInfo(initialState);
      setShowDialog(false);
    }, 1500);
    setShowDialog(true);
    setDialog(`${monster.getName} ha caido.`);
  };

  const oponentTurn = () => {
    const newHealth = player.health - attack.damage;
    setPlayer({
      ...player,
      health: newHealth,
    });
    if (newHealth <= 0) {
      setFainted(emby);
    } else {
      console.log("con");
    }
  };

  const playerTurn = () => {
    const newHealth = oponent.health - attack.damage;
    setOponent({
      ...oponent,
      health: newHealth < 0 ? 0 : newHealth,
    });
    if (newHealth <= 0) {
      setFainted(draggle);
    } else {
      setTimeout(() => {
        oponentAttack();
      }, 2000);
    }
  };

  return (
    <div>
      <HealthBar
        oponent={oponent}
        player={player}
        playerTurn={playerTurn}
        oponentTurn={oponentTurn}
      ></HealthBar>
      <div className={styles.battleMenu}>
        {showDialog && (
          <AttackDialog>
            <div>{dialog}</div>
          </AttackDialog>
        )}
        <div className={styles.attacks}>
          {playerAttacks.map(({ name, type, damage }) => (
            <button
              key={name}
              className={styles.attackButton}
              onClick={() => playerAttack(name, type, damage)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className={styles.attackType}>
          <h1 className={styles.attackTypeText}>
            {attack.type.length > 0 ? attack.type : "Attack Type"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Attack;
