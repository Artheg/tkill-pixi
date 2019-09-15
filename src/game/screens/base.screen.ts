import { Application, Container } from "pixi.js";

export default class BaseScreen extends Container {
    constructor(protected app: Application) {
        super();
    }
}