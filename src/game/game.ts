import * as PIXI from "pixi.js";
import ScreenManager from "./screen-manager";

export default class Game extends PIXI.Container {

    private screenManager: ScreenManager;
    constructor(private stage: PIXI.Container) {
        super();

        this.screenManager = new ScreenManager();

        stage.addChild(new PIXI.Text("Game Ready", {fill: "white"}));
        console.log("hello there!");
    }
}