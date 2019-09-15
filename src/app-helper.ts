import { Application, Point } from "pixi.js";

export class AppHelper {

    constructor(private app: Application) {
    }

    public getMousePos(): Point {
        return this.app.renderer.plugins.interaction.mouse.global;
    }
}
