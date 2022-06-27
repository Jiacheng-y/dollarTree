import Matter from "matter-js";
import Money from "../Components/Game/Money";

export const CreateBox = (entities, { touches, screen }) => {
    let boxIds = 0;
    let world = entities["physics"].world;
    touches.filter(t => t.type === "press").forEach(t => {
      Matter.World.add(world, [Money]);
  
      entities[++boxIds] = Money;
    });
    return entities;
  };