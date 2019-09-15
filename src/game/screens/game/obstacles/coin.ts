import { Container, Sprite } from "pixi.js";

export default class Coin extends Container{
    private image: Sprite;
    constructor() {
        super();
        this.image = Sprite.from("assets/img/coin.png");
        this.addChild(this.image);
    }
}