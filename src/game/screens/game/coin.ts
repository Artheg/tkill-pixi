import * as PIXI from "pixi.js";


export default class Coin extends PIXI.Container{
    private image: PIXI.Sprite;
    constructor() {
        super();
        this.image = PIXI.Sprite.from("assets/img/coin.png");
        this.addChild(this.image);
    }
}