import Matter from "matter-js";
import Money from "../Objects/Money";

export const createBox = (entities, { touches, dispatch, events, screen }) => {
    let boxIds = 0;
    let world = entities["physics"].world;
    let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.015);
    
    if (events.length) {
      for (i = 0; i < events.length; i++) {
        if (events[i].type === "shake-tree") {
          for (i=0;i<3;i++) {
            let body = Matter.Bodies.rectangle(
              events[i].pageX,
              events[i].pageY,
              boxSize,
              boxSize,
              { //optional parameters
                frictionAir: 0.021,
                restitution: 1.0
              }
            );
        
            Matter.World.add(world, [body]);
        
            entities[++boxIds] = {
              body: body,
              size: [boxSize, boxSize],
              renderer: Money
            };
          }
        }
      }
    }

    return entities; 
    
};