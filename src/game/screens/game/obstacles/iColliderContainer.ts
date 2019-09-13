import * as PIXI from "pixi.js";

export interface IColliderContainer{ 
    getColliders(): PIXI.Container[];
    eventEmitter: PIXI.utils.EventEmitter;
}