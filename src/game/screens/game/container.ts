import * as PIXI from "pixi.js";
import Coin from "./coin";

export default class Container extends PIXI.Container {
    private canvas: PIXI.Container;
    constructor() {
        super();
        this.canvas = new PIXI.Container();
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

        }
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