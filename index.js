import {GameScene} from "./game/scenes/gameScene.js";
import {GameMenu} from "./game/GUI/gameMenu.js";
import { DeviceSize } from "./game/devicesize.js";

DeviceSize.init();

const config = {
    type: Phaser.AUTO,
    width: DeviceSize.WIDTH,
    height: DeviceSize.HEIGHT,
    backgroundColor: '#000000',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        },
        audio: {
            disableWebAudio: true
        }
    },
    scene: [GameMenu, GameScene]
};

const game = new Phaser.Game(config);