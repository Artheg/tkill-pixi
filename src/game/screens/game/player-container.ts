import { Container, Sprite } from "pixi.js";
import { GeometryUtil } from "../../../utils/geometry.util";

export default class PlayerContainer extends Container {

    private diamond: Sprite;

    constructor() {
        super();
        this.diamond = Sprite.from("assets/img/diamond_s.png");
        this.addChild(this.diamond);
        this.diamond.pivot.x = 11;
        this.diamond.pivot.y = 15.5;
        this.diamond.x = 100;
        this.diamond.y = 100;
    }

    public update(rotateBy: number): void {
        const rotatedPoint = GeometryUtil.rotatePoint(this.diamond.position, {x: 0, y: 0}, rotateBy);
        this.diamond.position.x = rotatedPoint.x;
        this.diamond.position.y = rotatedPoint.y;
    }
}
