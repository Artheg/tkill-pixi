import * as PIXI from "pixi.js";
import BaseScreen from "../base.screen";
import PlayerContainer from "./player-container";

export default class GameScreen extends BaseScreen {
    private timePassed: number = 0;
    private currentAngle: number = 0;

    private angleDelta: number = 2500;

    private playerContainer: PlayerContainer;
    private offset: { x: number, y: number } = {
        x: 25,
        y: 25
    }
    constructor(app: PIXI.Application) {
        super(app);

        this.playerContainer = new PlayerContainer();
        this.addChild(this.playerContainer);

        app.ticker.add(() => {

            this.playerContainer.position = app.renderer.plugins.interaction.mouse.global;

            const delta = app.ticker.deltaTime / 1000;
            const rotateBy = this.angleDelta * delta;
            this.playerContainer.update(rotateBy);

        }, null, 1);

        app.renderer.plugins.interaction.on("pointerdown", (event: any) => {
            this.angleDelta = event.data.button === 0 ? 5000 : 1000;
        });

        app.renderer.plugins.interaction.on("pointerup", (event: any) => {
            this.angleDelta = 2500;
        });
    }
}