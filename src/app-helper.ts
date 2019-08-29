import * as PIXI from "pixi.js";

export class AppHelper {

    constructor(private app: PIXI.Application) {
    }

    public getMousePos(): PIXI.Point {
        return this.app.renderer.plugins.interaction.mouse.global;
    }
}
