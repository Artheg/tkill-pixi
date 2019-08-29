import * as PIXI from "pixi.js";
import BaseScreen from "../base.screen";
import PlayerContainer from "./player-container";
import Container from "./container";

export default class GameScreen extends BaseScreen {
    private timePassed: number = 0;
    private currentAngle: number = 0;

    private angleDelta: number = 2500;

    private playerContainer: PlayerContainer;

    private containerDirection: {x: number, y: number} = {
        x: 1,
        y: 1
    };

    constructor(app: PIXI.Application) {
        super(app);

        this.playerContainer = new PlayerContainer();
        this.addChild(this.playerContainer);

        let container = new Container();
        this.addChild(container);
        container.x = 1280;
        container.y = 720;

        app.ticker.add(() => {

            this.playerContainer.position = app.renderer.plugins.interaction.mouse.global;

            const delta = app.ticker.deltaTime / 1000;
            const rotateBy = this.angleDelta * delta;
            this.playerContainer.update(rotateBy);

            container.update(0.01);
            container.x += -this.containerDirection.x * 10;
            container.y += this.containerDirection.y * 10;

            if (container.x > 1280 * 2 || container.y > 720 * 2
                || container.x < 0 || container.y < 0
                ) {
                container.destroy();
                container = new Container();
                container.x = 1280;
                container.y = 720;
                this.containerDirection.x = Math.random() > 0.5 ? 1 : -1;
                this.containerDirection.y = Math.random() > 0.5 ? 1 : -1;
                this.addChild(container);
            }

        }, null, 1);

        app.renderer.plugins.interaction.on("pointerdown", (event: any) => {
            this.angleDelta = event.data.button === 0 ? 5000 : 1000;
        });

        app.renderer.plugins.interaction.on("pointerup", (event: any) => {
            this.angleDelta = 2500;
        });
    }
}