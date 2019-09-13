import * as PIXI from "pixi.js";
import sound from "pixi-sound";
import BaseScreen from "../base.screen";
import PlayerContainer from "./player-container";
import Container from "./obstacles/container";
import CollisionManager from "../../managers/collision/collision.manager";
import SoundManager from "../../managers/sound/sound.manager";
import { SoundLibrary } from "../../managers/sound/sounds.library";

export default class GameScreen extends BaseScreen {
    private timePassed: number = 0;
    private currentAngle: number = 0;
    private rotateCoeff: number = 1.0;

    private angleDelta: number = 2500;

    private playerContainer: PlayerContainer;

    private collisionManager: CollisionManager;


    private containerDirection: {x: number, y: number} = {
        x: 1,
        y: 1
    };

    constructor(app: PIXI.Application) {
        super(app);
        this.collisionManager = new CollisionManager(app);
        
        this.playerContainer = new PlayerContainer();
        this.collisionManager.addMainCollider(this.playerContainer);

        this.addChild(this.playerContainer);

        let container = new Container();
        this.addChild(container);
        container.x = 1280;
        container.y = 720;
        this.collisionManager.addObstacleCollider(container);
        this.collisionManager.onCollisionEventEmmiter.addListener(CollisionManager.E_COLLISION, 
            (obstacle: Container) => {
                container.destroyCoin(obstacle);
                SoundManager.instance.playSound(SoundLibrary.CHIME);
            })

        this.collisionManager.start();

        app.ticker.add(() => {

            this.playerContainer.position = app.renderer.plugins.interaction.mouse.global;

            const delta = app.ticker.deltaTime / 1000;
            const rotateBy = this.angleDelta * delta * this.rotateCoeff;
            this.playerContainer.update(rotateBy);

            container.update(this.rotateCoeff * 0.01);
            container.x += -this.containerDirection.x * 2;
            container.y += this.containerDirection.y * 2;

            if (container.x > 1280 * 2 || container.y > 720 * 2
                || container.x < 0 || container.y < 0
                ) {
                container.destroy();
                container = new Container();
                this.collisionManager.addObstacleCollider(container);
                container.x = 1280;
                container.y = 720;
                this.containerDirection.x = Math.random() > 0.5 ? 1 : -1;
                this.containerDirection.y = Math.random() > 0.5 ? 1 : -1;
                this.addChild(container);
            }


        });

        app.renderer.plugins.interaction.on("pointerdown", (event: any) => {
            this.rotateCoeff = event.data.button === 0 ? 3 : 0.3;
        });

        app.renderer.plugins.interaction.on("pointerup", (event: any) => {
            this.rotateCoeff = 1;
        });
    }
}