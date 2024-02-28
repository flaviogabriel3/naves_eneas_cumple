import { CommonWeapon } from "./commonWapon.js";

export class Laser extends CommonWeapon
{
    constructor (scene)
    {
        super(scene, 'space', 'laser');
        this.setBlendMode(1);
        this.travelTime = 700;
        this.factorTime = 1/this.travelTime;
    }

    fire(x, y){
        super.fire(x, y);
        this.scene.sound.play('laserGun');
    }
}