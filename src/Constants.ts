import { Sprite } from "./Classes/Sprite";
import { OponentAttacks, PlayerAttacks } from "./Enums/Attacks";
import {
  battleBackgroundImg,
  draggleImg,
  embyImg,
  fireballImg,
  foregroundImg,
  mapImg,
  playerDownImg,
  playerLeftImg,
  playerRightImg,
  playerUpImg,
} from "./Images";
import { IBattleAnimation } from "./Interfaces/IBattle";

const canvasWidth = 1024;
const canvasHeight = 576;

const mapOffset = {
  x: 150,
  y: 15,
};

const background = new Sprite({
  position: {
    x: mapOffset.x,
    y: mapOffset.y,
  },
  image: mapImg,
  name: "",
});

const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImg,
  name: "",
});

const foreground = new Sprite({
  position: {
    x: mapOffset.x,
    y: mapOffset.y,
  },
  image: foregroundImg,
  name: "",
});

const player = new Sprite({
  position: {
    x: 200,
    y: 400,
  },
  image: playerDownImg,
  frames: {
    max: 4,
    hold: 10,
  },
  sprites: {
    up: playerUpImg,
    left: playerLeftImg,
    right: playerRightImg,
    down: playerDownImg,
  },
  name: "",
});

let draggle: Sprite;

let emby: Sprite;

const initMonsters = () => {
  draggle = new Sprite({
    position: {
      x: 800,
      y: 100,
    },
    image: draggleImg,
    frames: {
      max: 4,
      hold: 30,
    },
    animate: true,
    isEnemy: true,
    name: "Draggle",
  });
  emby = new Sprite({
    position: {
      x: 280,
      y: 325,
    },
    image: embyImg,
    frames: {
      max: 4,
      hold: 30,
    },
    animate: true,
    name: "Toluca I",
  });
};

const keys = {
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

const BATTLE_PROBABILITY = 0.01;

const canvasBackground = "#3A3A52";

const playerAttacks = [
  { name: PlayerAttacks.Validando, type: "Normal", damage: 10 },
  { name: PlayerAttacks.Inyeccion, type: "Fuego", damage: 50 },
  { name: PlayerAttacks.Attack3, type: "Attack Type", damage: 10 },
  { name: PlayerAttacks.Attack4, type: "Attack Type", damage: 10 },
];

const oponentAttacks = [
  { name: OponentAttacks.Granito, type: "Granito", damage: 35 },
  { name: OponentAttacks.RF, type: "Normal", damage: 50 },
  { name: OponentAttacks.Version, type: "Fuego", damage: 40 },
  { name: OponentAttacks.Quesadilla, type: "Queso", damage: 10 },
  { name: OponentAttacks.Documentacion, type: "Tecnico", damage: 30 },
];

const fireball = new Sprite({
  position: {
    x: 280,
    y: 325,
  },
  image: fireballImg,
  show: false,
  frames: {
    max: 4,
    hold: 10,
  },
  animate: true,
  rotation: 1,
  name: "",
});

const battle: IBattleAnimation = {
  initiated: false,
};

export {
  BATTLE_PROBABILITY,
  canvasWidth,
  canvasHeight,
  mapOffset,
  background,
  foreground,
  player,
  keys,
  canvasBackground,
  battleBackground,
  draggle,
  emby,
  playerAttacks,
  fireball,
  oponentAttacks,
  initMonsters,
  battle,
};
