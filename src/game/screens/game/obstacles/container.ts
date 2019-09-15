import { Container, utils} from "pixi.js";
import Coin from "./coin";
import { IColliderContainer } from "./iColliderContainer";
import { GeometryUtil } from "../../../../utils/geometry.util";

export default class ObstacleContainer extends Container implements IColliderContainer {

    public static readonly E_ELEMENT_DESTROYED: string = "E_ELEMENT_DESTROYED";

    public eventEmitter: utils.EventEmitter = new utils.EventEmitter();

    private canvas: Container;
    private coins: Container[];

    constructor() {
        super();
        this.canvas = new Container();
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
            const rotatedPoint = GeometryUtil.rotatePoint(coin.position, {x: 0, y: 0}, angle);

            coin.position.x = rotatedPoint.x;
            coin.position.y = rotatedPoint.y;

            this.coins.push(coin);
        }
    }

    public destroyCoin(coin: Container): void {
        this.coins.splice(this.coins.indexOf(coin), 1);
        this.eventEmitter.emit(ObstacleContainer.E_ELEMENT_DESTROYED, coin);
        this.canvas.removeChildAt(this.canvas.getChildIndex(coin));
        coin.destroy();
    }

    public getColliders(): Container[] {
        return this.coins;
    }

    public update(rotateBy: number): void {
        this.canvas.rotation += rotateBy;
    }
}
