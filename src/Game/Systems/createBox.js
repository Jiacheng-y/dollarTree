import Matter from "matter-js";
import Money from "../Objects/Money";

export const createBox = (entities, { touches, dispatch, events, screen }) => {
    let boxIds = 0;
    let world = entities["physics"].world;
    let boxSize = 40;
    
    //console.log(events);

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        if (events[i].type === "shake-tree") {
          for (i=0;i<3;i++) {
            let coin = Money(world, "white", {x: 50, y: 100 }, {width: 40, height: 40});
        
            Matter.World.add(world, [coin]);
        
            entities[++boxIds] = {
              body: coin,
              size: [boxSize, boxSize],
              renderer: Money
            };
          }
        }
      }
    }

    return entities; 
    
};