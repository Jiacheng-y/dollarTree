import Matter from "matter-js";

const physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine
    
    // time.delta: difference between current time and previously-retrieved time
    // update entities with the latest information
    Matter.Engine.update(engine, time.delta)

    return entities;
}  

export default physics;