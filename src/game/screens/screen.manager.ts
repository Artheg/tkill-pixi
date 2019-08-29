import * as PIXI from "pixi.js";
import BaseScreen from "./base.screen";
import GameScreen from "./game/game.screen";
import { MenuScreen } from "./menu/menu.screen";

export type ScreenID = "MENU" | "GAME";

export type ScreenDict = { [key in ScreenID]: BaseScreen };

export default class ScreenManager {
    private screens: ScreenDict;
    private screenContainer: PIXI.Container;

    constructor(private app: PIXI.Application) {
        this.screens = {
            GAME: new GameScreen(app),
            MENU: new MenuScreen(app)
        };

        this.screenContainer = new PIXI.Container();
        this.changeScreen("GAME");
    }

    public getScreenContainer(): PIXI.Container {
        return this.screenContainer;
    }

    public changeScreen(id: ScreenID): void {
        console.log("hello");
        this.screenContainer.removeChildren();
        this.screenContainer.addChild(this.screens[id]);
    }
}