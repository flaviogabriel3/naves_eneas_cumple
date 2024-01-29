import {CommonWeapon} from "./common_wapon.js";

export class Torpedo extends CommonWeapon {
    constructor (scene)
    {
        super(scene, 0, 0, 'torpedo');
    
        this.setBlendMode(1);
        this.setDepth(1);
        
        this.speed = 100;
        this.lifespan = 10;
    
        this._temp = new Phaser.Math.Vector2();
    }
}
