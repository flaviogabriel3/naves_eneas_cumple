import { DeviceSize } from "./devicesize.js";

export class CelestialObjects
{
    celestials = [];

    timeSapwn;
    deltaSpawn;
    currentScene;

    constructor (scene)
    {

        this.currentScene = scene;

        this.addCelestial('space', 'galaxia', scene);
        this.addCelestial('space', 'planetabrillante', scene);
        this.addCelestial('space','planetagaseoso', scene);
        this.addCelestial('space','planetagaseosoconanillos', scene);
        this.addCelestial('space','planetarocoso', scene);
        this.addCelestial('space','planetarocoso2', scene);
        this.addCelestial('space','sol', scene);
 
        this.spawn();
    }

    addCelestial(atlas, celestial, scene){
        const c = scene.add.image(-DeviceSize.WIDTH, -DeviceSize.HEIGHT, atlas, celestial).setOrigin(0);
        c.setVisible(false);
        c.setActive(false);
        c.setDepth(3);

        this.celestials.push(c);
    }


    spawn() {
        this.currentShow = this.celestials[Phaser.Math.Between(0, this.celestials.length - 1)];
        this.currentShow.setPosition(Phaser.Math.Between(-DeviceSize.WIDTH_MIDDLE + this.currentShow.width*0.5, DeviceSize.WIDTH_MIDDLE - this.currentShow.width*0.5), -DeviceSize.HEIGHT_MIDDLE - this.currentShow.height);
        this.timeSapwn = 10000 + Phaser.Math.Between(0, 5000)
        this.deltaSpawn = this.timeSapwn;

        this.currentShow.setVisible(true);
        this.currentShow.setActive(true);

        this.currentShow.setDepth(2);
    }

    update (time, delta)
    {
        this.deltaSpawn -= delta;
        if (this.deltaSpawn > 0) {
            this.currentShow.y += delta*0.3;
        } else {
            this.currentShow.setVisible(false);
            this.currentShow.setActive(false);
            
            this.spawn();
        }
    }
}