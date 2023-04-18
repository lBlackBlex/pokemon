import gameMap from "./assets/Inburmon Map.png";
import foregroundMap from "./assets/foregroundObjects.png";
import playerDown from "./assets/player/down.png";
import playerUp from "./assets/player/up.png";
import playerLeft from "./assets/player/left.png";
import playerRight from "./assets/player/right.png";
import battleBackground from "./assets/battle/background.png";
import draggle from "./assets/battle/draggle.png";
import emby from "./assets/battle/emby.png";
import fireball from "./assets/battle/fireball.png";

const mapImg = new Image();
mapImg.src = gameMap;

const foregroundImg = new Image();
foregroundImg.src = foregroundMap;

const playerUpImg = new Image();
playerUpImg.src = playerUp;

const playerLeftImg = new Image();
playerLeftImg.src = playerLeft;

const playerRightImg = new Image();
playerRightImg.src = playerRight;

const playerDownImg = new Image();
playerDownImg.src = playerDown;

const battleBackgroundImg = new Image();
battleBackgroundImg.src = battleBackground;

const draggleImg = new Image();
draggleImg.src = draggle;

const embyImg = new Image();
embyImg.src = emby;

const fireballImg = new Image();
fireballImg.src = fireball;

export {
  mapImg,
  foregroundImg,
  playerUpImg,
  playerLeftImg,
  playerRightImg,
  playerDownImg,
  battleBackgroundImg,
  draggleImg,
  embyImg,
  fireballImg,
};
