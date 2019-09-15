import { Application, utils, Container } from "pixi.js";
import { IColliderContainer } from "game/screens/game/obstacles/iColliderContainer";

//Detects collisions of mainCollider with obstacleCollider's
//Fires an event in case of the collision

export default class CollisionManager {
  public static readonly E_COLLISION: string = "E_COLLISION";

  public onCollisionEventEmmiter: utils.EventEmitter = new utils.EventEmitter();

  private mainCollider!: Container;
  private obstacleColliders: Container[];

  constructor(private app: Application) {
    this.obstacleColliders = [];
  }

  public addMainCollider(mainCollider: Container): void {
    this.mainCollider = mainCollider;
  }

  public addObstacleCollider(obstacleCollider: IColliderContainer): void {
    this.obstacleColliders = this.obstacleColliders.concat(
      obstacleCollider.getColliders()
    );
    obstacleCollider.eventEmitter.addListener(
      "E_ELEMENT_DESTROYED",
      (element: any) => {
        this.stop();
        this.obstacleColliders.splice(
          this.obstacleColliders.indexOf(element),
          1
        );
        this.start();
      }
    );
  }

  public start(): void {
    if (!this.mainCollider) {
      throw new Error(
        "ERROR::Collision Manager: property mainCollider is not set"
      );
    }

    this.app.ticker.add(this.detectCollisions);
  }

  private detectCollisions = (): void => {
    for (let i = 0; i < this.obstacleColliders.length; i++) {
      const obstacle = this.obstacleColliders[i];
      const isCollidingWithMain = this.checkIfCollides(
        obstacle,
        this.mainCollider
      );
      if (isCollidingWithMain) {
        this.onCollisionEventEmmiter.emit(
          CollisionManager.E_COLLISION,
          obstacle
        );
      }
    }
  };

  private checkIfCollides(a: Container, b: Container): boolean {
    const aBounds = a.getBounds();
    const bBounds = b.getBounds();
    return (
      aBounds.x + aBounds.width > bBounds.x &&
      aBounds.x < bBounds.x + bBounds.width &&
      aBounds.y + aBounds.height > bBounds.y &&
      aBounds.y < bBounds.y + bBounds.height
    );
  }

  public stop(): void {
    this.app.ticker.remove(this.detectCollisions);
  }
}
