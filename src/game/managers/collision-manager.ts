;
import { IColliderContainer } from "game/screens/game/iColliderContainer";

//Detects collisions of mainCollider with obstacleCollider's 
//Fires an event in case of the collision

export default class CollisionManager {

    public static readonly E_COLLISION: string = "E_COLLISION";


    public onCollisionEventEmmiter: PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();

    private mainCollider!: PIXI.Container;
    private obstacleColliders: PIXI.Container[];

    constructor(private app: PIXI.Application) {
        this.obstacleColliders = [];
    }

    public addMainCollider(mainCollider: PIXI.Container): void {
        this.mainCollider = mainCollider;
    }

    public addObstacleCollider(obstacleCollider: IColliderContainer): void {
        this.obstacleColliders = this.obstacleColliders.concat(obstacleCollider.getColliders());
    }

    public start(): void {
        if (!this.mainCollider) {
            throw new Error("ERROR::Collision Manager: property mainCollider is not set") 
        }

        this.app.ticker.add(this.detectCollisions);
    }

    private detectCollisions = ():void => {
        for (let i = 0; i < this.obstacleColliders.length; i++) {
            const obstacle = this.obstacleColliders[i];
            const isCollidingWithMain = this.checkIfCollides(obstacle, this.mainCollider);
            if (isCollidingWithMain) {
                this.onCollisionEventEmmiter.emit(CollisionManager.E_COLLISION, obstacle);
            }
        }
    }

    private checkIfCollides(a: PIXI.Container, b: PIXI.Container): boolean {
        const aBounds = a.getBounds();
        const bBounds = b.getBounds();
        return aBounds.x + aBounds.width > bBounds.x && 
               aBounds.x < bBounds.x + bBounds.width && 
               aBounds.y + aBounds.height > bBounds.y && 
               aBounds.y < bBounds.y + bBounds.height;
    }

    public stop(): void {
        this.app.ticker.remove(this.detectCollisions);
    }
}