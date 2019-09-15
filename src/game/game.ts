import { Application, Container, Text } from "pixi.js";
import ScreenManager from "./screens/screen.manager";
import SoundManager from "./managers/sound/sound.manager";

export default class Game extends Container {

    private screenManager: ScreenManager;
    private soundManager: SoundManager;
    constructor(private app: Application) {
        super();

        this.screenManager = new ScreenManager(app);
        this.soundManager = new SoundManager();

        app.stage.addChild(new Text("Game Ready", {fill: "white"}));
        app.stage.addChild(this.screenManager.getScreenContainer());
        console.log("hello there!");
    }
}