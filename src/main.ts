import * as PIXI from "pixi.js";
import Game from "./game/game";

const app = new PIXI.Application({
    width: 320,
    height: 320
});

window.onload = () => {
    document.body.appendChild(app.view);
    const game = new Game(app.stage);
}

// const game = new Game(app.stage);
