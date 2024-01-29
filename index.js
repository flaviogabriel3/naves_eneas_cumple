import {Game} from "./game/main.js";

const config = {
    type: Phaser.AUTO,
    width: 720,
    height: 1280,

    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: Game
};

const game = new Phaser.Game(config);