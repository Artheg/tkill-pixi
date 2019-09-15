import { Application, Container } from "pixi.js";
import BaseScreen from "./base.screen";
import GameScreen from "./game/game.screen";
import { MenuScreen } from "./menu/menu.screen";

export type ScreenID = "MENU" | "GAME";

export type ScreenDict = { [key in ScreenID]: BaseScreen };

export default class ScreenManager {
    private screens: ScreenDict;
    private screenContainer: Container;

    constructor(private app: Application) {
        this.screens = {
            GAME: new GameScreen(app),
            MENU: new MenuScreen(app)
        };

        this.screenContainer = new Container();
        this.changeScreen("GAME");
    }

    public getScreenContainer(): Container {
        return this.screenContainer;
    }

    public changeScreen(id: ScreenID): void {
        console.log("hello");
        this.screenContainer.removeChildren();
        this.screenContainer.addChild(this.screens[id]);
    }
}