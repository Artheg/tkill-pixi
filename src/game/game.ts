import * as PIXI from "pixi.js";
import ScreenManager from "./screens/screen.manager";

export default class Game extends PIXI.Container {

    private screenManager: ScreenManager;
    constructor(private app: PIXI.Application) {
        super();

        this.screenManager = new ScreenManager(app);

        app.stage.addChild(new PIXI.Text("Game Ready", {fill: "white"}));
        app.stage.addChild(this.screenManager.getScreenContainer());
        console.log("hello there!");
    }
}