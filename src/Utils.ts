import { ICollisions } from "./Interfaces/ICollisions";

const rectangularCollison = ({ rectangle1, rectangle2 }: ICollisions) => {
  return (
    rectangle1.xPosition + rectangle1.getWidth >= rectangle2.xPosition &&
    rectangle1.xPosition <= rectangle2.xPosition + rectangle2.getWidth &&
    rectangle1.yPosition <= rectangle2.yPosition + rectangle2.getHeight &&
    rectangle1.yPosition + rectangle1.getHeight >= rectangle2.yPosition
  );
};
let current = 0;

const setAnimationId = (id: number) => {
  current = id;
};

const getAnimationId = () => {
  return current;
};

const cancelAnimation = (window: Window, animationId: number) => {
  window.cancelAnimationFrame(animationId);
  window.cancelAnimationFrame(animationId - 1);
};

const requestAnimation = (window: Window, animationFun: () => void) => {
  return window.requestAnimationFrame(animationFun);
};

let battleAnimationFun: any = null;

const setBattleAnimationFun = (fun: any) => {
  battleAnimationFun = fun;
};

const getBattleAnimationFun = () => {
  return battleAnimationFun;
};

export {
  rectangularCollison,
  cancelAnimation,
  requestAnimation,
  setAnimationId,
  getAnimationId,
  setBattleAnimationFun,
  getBattleAnimationFun,
};
