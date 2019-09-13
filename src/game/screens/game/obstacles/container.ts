import * as PIXI from "pixi.js";
import Coin from "./coin";
import { IColliderContainer } from "./iColliderContainer";

export default class Container extends PIXI.Container implements IColliderContainer {

    public static readonly E_ELEMENT_DESTROYED: string = "E_ELEMENT_DESTROYED";

    public eventEmitter: PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();

    private canvas: PIXI.Container;
    private coins: PIXI.Container[];

    constructor() {
        super();
        this.canvas = new PIXI.Container();
        this.coins = [];

        this.addChild(this.canvas);
        const coinCount = 10;
        for (let i = 0; i < coinCount; i++) {
            const coin = new Coin();
            this.canvas.addChild(coin);
            coin.pivot.x = 50;
            coin.pivot.y = 50;
            coin.x = 100;
            coin.y = 100;
            const angle = (i / coinCount) * 360;
            const rotatedPoint = this.rotatePoint(coin.position, {x: 0, y: 0}, angle);

            coin.position.x = rotatedPoint.x;
            coin.position.y = rotatedPoint.y;

            this.coins.push(coin);
        }
    }

    public destroyCoin(coin: PIXI.Container) {
        this.coins.splice(this.coins.indexOf(coin), 1);
        this.eventEmitter.emit(Container.E_ELEMENT_DESTROYED, coin);
        this.canvas.removeChildAt(this.canvas.getChildIndex(coin));
        coin.destroy();
    }

    public getColliders(): PIXI.Container[] {
        return this.coins;
    }

    public update(rotateBy: number): void {
        // const rotatedPoint = this.rotatePoint(this.canvas.position, {x: 0, y: 0}, rotateBy);
        // this.canvas.position.x = rotatedPoint.x;
        // this.canvas.position.y = rotatedPoint.y;

        this.canvas.rotation += rotateBy;
    }

    private rotatePoint(point: Point, center: Point, angle: number): Point {
        angle = (angle) * (Math.PI / 180); // Convert to radians
        const rotatedX = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x;
        const rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;
        return { x: rotatedX, y: rotatedY };
    }
}

type Point =  {
    x: number,
    y: number
};