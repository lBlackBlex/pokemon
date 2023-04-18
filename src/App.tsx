import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Canvas from "./Components/Canvas/Canvas";
import { MovementKeys } from "./Enums/MovementKeys";
import { collisions } from "./Data/collisions";
import { Boundary } from "./Classes/Boundary";
import {
  cancelAnimation,
  rectangularCollison,
  requestAnimation,
  setAnimationId,
  setBattleAnimationFun,
} from "./Utils";
import { BattleZones } from "./Data/BattleZones";
import { IBattleAnimation } from "./Interfaces/IBattle";
import BattleInitiated from "./Components/Battle/BattleInitiated";
import {
  background,
  battle,
  battleBackground,
  BATTLE_PROBABILITY,
  canvasBackground,
  canvasHeight,
  canvasWidth,
  draggle,
  emby,
  fireball,
  foreground,
  initMonsters,
  keys,
  mapOffset,
  player,
} from "./Constants";
import { gsap } from "gsap";
import BattleInterface from "./Components/Battle/BattleInterface";
import styles from "./App.module.css";
import "./assets/Fonts/PressStart2P-Regular.ttf";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const app = useRef<HTMLDivElement>(null);

  const [showBattle, setshowBattle] = useState(false);

  const boundariesMap = useMemo(() => {
    let collisionsMap: Array<any> = [];
    for (let i = 0; i < collisions.length; i += 14) {
      collisionsMap.push(collisions.slice(i, 14 + i));
    }

    const boundaries: Array<any> = [];

    collisionsMap.map((row, i) => {
      row.map((symbol: number, j: number) => {
        if (symbol === 226) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + mapOffset.x,
                y: i * Boundary.height + mapOffset.y,
              },
            })
          );
        }
      });
    });

    return boundaries;
  }, [collisions]);

  const battleZonesMap = useMemo(() => {
    let battleZonesMap: Array<any> = [];
    for (let i = 0; i < BattleZones.length; i += 14) {
      battleZonesMap.push(BattleZones.slice(i, 14 + i));
    }

    const battleZones: Array<any> = [];

    battleZonesMap.map((row, i) => {
      row.map((symbol: number, j: number) => {
        if (symbol === 226) {
          battleZones.push(
            new Boundary({
              position: {
                x: j * Boundary.width + mapOffset.x,
                y: i * Boundary.height + mapOffset.y,
              },
            })
          );
        }
      });
    });

    return battleZones;
  }, [BattleZones]);

  const setupCanvas = (canvas: HTMLCanvasElement) => {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    initMonsters();
    animate();
    // animateBattle();
  };

  const loadMap = (ctx: CanvasRenderingContext2D) => {
    background.draw(ctx);
    boundariesMap.map((boundary) => boundary.draw(ctx));
    battleZonesMap.map((battleZone) => battleZone.draw(ctx));
  };

  window.addEventListener("keydown", (e) => {
    const key = MovementKeys[e.key as keyof typeof MovementKeys];
    const value = keys[key];
    if (value) value.pressed = true;
  });

  window.addEventListener("keyup", (e) => {
    const key = MovementKeys[e.key as keyof typeof MovementKeys];
    const value = keys[key];
    if (value) value.pressed = false;
  });

  const movables = [
    background,
    ...boundariesMap,
    foreground,
    ...battleZonesMap,
  ];

  const setBattle = (animationId: any) => {
    if (!battle.initiated) {
      if (
        keys.ArrowDown.pressed ||
        keys.ArrowLeft.pressed ||
        keys.ArrowRight.pressed ||
        keys.ArrowUp.pressed
      ) {
        for (let i = 0; i < battleZonesMap.length; i++) {
          const battleZone = battleZonesMap[i];
          if (
            rectangularCollison({
              rectangle1: player,
              rectangle2: battleZone,
            }) &&
            Math.random() < BATTLE_PROBABILITY
          ) {
            console.log("battle");
            gsap.to("#userInterface", {
              display: "block",
            });
            initMonsters();
            cancelAnimation(window, animationId);
            requestAnimation(window, animateBattle);
            battle.initiated = true;
            setshowBattle(true);
            break;
          }
        }
      }
    }
  };

  const animateBattle = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setAnimationId(requestAnimation(window, animateBattle));
    battleBackground.draw(ctx);
    draggle.draw(ctx);
    emby.draw(ctx);
    fireball.draw(ctx);
    console.log("battle animation");
  };

  const animate = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const animationId = requestAnimation(window, animate);
    console.log("animation");
    loadMap(ctx);
    player.draw(ctx);
    foreground.draw(ctx);

    setBattle(animationId);

    let moving = true;
    player.isMoving = false;

    if (battle.initiated) return;

    if (keys.ArrowUp.pressed) {
      player.isMoving = true;
      player.setImage = player.getSprites?.up as HTMLImageElement;
      for (let i = 0; i < boundariesMap.length; i++) {
        const boundary = boundariesMap[i];
        if (
          rectangularCollison({
            rectangle1: player,
            rectangle2: new Boundary({
              position: {
                x: boundary.xPosition,
                y: boundary.yPosition + 3,
              },
            }),
          })
        ) {
          console.log("collision");
          moving = false;
          break;
        }
      }
      if (moving) movables.map((movable) => (movable.yPosition += 3));
    } else if (keys.ArrowLeft.pressed) {
      player.isMoving = true;
      player.setImage = player.getSprites?.left as HTMLImageElement;
      for (let i = 0; i < boundariesMap.length; i++) {
        const boundary = boundariesMap[i];
        if (
          rectangularCollison({
            rectangle1: player,
            rectangle2: new Boundary({
              position: {
                x: boundary.xPosition + 3,
                y: boundary.yPosition,
              },
            }),
          })
        ) {
          console.log("collision");
          moving = false;
          break;
        }
      }
      if (moving) movables.map((movable) => (movable.xPosition += 3));
    } else if (keys.ArrowDown.pressed) {
      player.isMoving = true;
      player.setImage = player.getSprites?.down as HTMLImageElement;
      for (let i = 0; i < boundariesMap.length; i++) {
        const boundary = boundariesMap[i];
        if (
          rectangularCollison({
            rectangle1: player,
            rectangle2: new Boundary({
              position: {
                x: boundary.xPosition,
                y: boundary.yPosition - 3,
              },
            }),
          })
        ) {
          console.log("collision");
          moving = false;
          break;
        }
      }
      if (moving) movables.map((movable) => (movable.yPosition -= 3));
    } else if (keys.ArrowRight.pressed) {
      player.isMoving = true;
      player.setImage = player.getSprites?.right as HTMLImageElement;
      for (let i = 0; i < boundariesMap.length; i++) {
        const boundary = boundariesMap[i];
        if (
          rectangularCollison({
            rectangle1: player,
            rectangle2: new Boundary({
              position: {
                x: boundary.xPosition - 3,
                y: boundary.yPosition,
              },
            }),
          })
        ) {
          console.log("collision");
          moving = false;
          break;
        }
      }
      if (moving) movables.map((movable) => (movable.xPosition -= 3));
    }
  };

  setBattleAnimationFun(animate);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setupCanvas(canvas);
    const context = canvas.getContext("2d");
    if (!context) return;
    draw(context);
  }, []);

  useLayoutEffect(() => {
    gsap.to("#userInterface", {
      display: "none",
    });
    const ctx = gsap.context(() => {
      if (showBattle) {
        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                gsap.to("#userInterface", {
                  display: "block",
                });
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
      }
    }, app);

    return () => ctx.revert();
  }, [showBattle]);

  return (
    <div ref={app} className={styles.mainFrame}>
      <BattleInitiated></BattleInitiated>
      <Canvas innerRef={canvasRef}></Canvas>;
      <div id="userInterface">{<BattleInterface></BattleInterface>}</div>
    </div>
  );
}

export default App;
