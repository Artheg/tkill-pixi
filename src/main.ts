import * as PIXI from "pixi.js";
import Game from "./game/game";

const app = new PIXI.Application({
    resolution: 0.5,
    width: 2560,
    height: 1440
});

window.onload = () => {
    document.body.appendChild(app.view);
    const game = new Game(app);

    document.body.oncontextmenu = (e) => {
        e.preventDefault();
    };
};

// const game = new Game(app.stage);
