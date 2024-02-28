export class ImagesResources{
    constructor(scene) {
        this.loadHD(scene);
    }

    loadHD(scene){
        const low = (screen.width < 720);
        this.loadImagesGame(scene, low);
        this.loadGUI(scene, low);
    }

    loadImagesGame(scene, low){
        if (low){
            scene.load.atlas('space', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/sprites/spacelow.png', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/sprites/spacelow.json');
            scene.load.atlas('obstacles', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/sprites/obstacleslow.png', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/sprites/obstacleslow.json');
        } else {
            scene.load.atlas('space', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/sprites/space.png', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/sprites/space.json');
            scene.load.atlas('obstacles', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/sprites/obstacles.png', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/sprites/obstacles.json');
        }
    }

    loadGUI(scene, low){
        if (low)
            scene.load.atlas('gui', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/gui/guilow.png', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/gui/guilow.json');
        else
            scene.load.atlas('gui', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/gui/gui.png', 'https://github.com/flaviogabriel3/naves_eneas_cumple/game/assets/gui/gui.json');
    }
}
