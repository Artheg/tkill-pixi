import { Container, utils } from "pixi.js";

export interface IColliderContainer {
  eventEmitter: utils.EventEmitter;
  getColliders(): Container[];
}
