import * as PIXI from "pixi.js";

type Point =  {
    x: number,
    y: number
};

export default class PlayerContainer extends PIXI.Container {

    private diamond: PIXI.Sprite;

    constructor() {
        super();
        this.diamond = PIXI.Sprite.from("assets/img/diamond.png");
        this.addChild(this.diamond);
        this.diamond.pivot.x = 42.5;
        this.diamond.pivot.y = 60.5;
        this.diamond.x = 100;
        this.diamond.y = 100;
    }

    public update(rotateBy: number): void {
        const rotatedPoint = this.rotatePoint(this.diamond.position, {x: 0, y: 0}, rotateBy);
        this.diamond.position.x = rotatedPoint.x;
        this.diamond.position.y = rotatedPoint.y;
    }

    private rotatePoint(point: Point, center: Point, angle: number): Point {

        angle = (angle) * (Math.PI / 180); // Convert to radians
        const rotatedX = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x;
        const rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;
        return { x: rotatedX, y: rotatedY };
    }
}
