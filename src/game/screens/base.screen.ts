import * as PIXI from "pixi.js";

export default class BaseScreen extends PIXI.Container {
    constructor(protected app: PIXI.Application) {
        super();
    }
}