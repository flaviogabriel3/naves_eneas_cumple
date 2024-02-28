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
            scene.load.atlas('space', '../game/assets/sprites/spacelow.png', '../game/assets/sprites/spacelow.json');
            scene.load.atlas('obstacles', '../game/assets/sprites/obstacleslow.png', '../game/assets/sprites/obstacleslow.json');
        } else {
            scene.load.atlas('space', '../game/assets/sprites/space.png', '../game/assets/sprites/space.json');
            scene.load.atlas('obstacles', '../game/assets/sprites/obstacles.png', '../game/assets/sprites/obstacles.json');
        }
    }

    loadGUI(scene, low){
        if (low)
            scene.load.atlas('gui', '../game/assets/gui/guilow.png', '../game/assets/gui/guilow.json');
        else
            scene.load.atlas('gui', '../game/assets/gui/gui.png', '../game/assets/gui/gui.json');
    }
}