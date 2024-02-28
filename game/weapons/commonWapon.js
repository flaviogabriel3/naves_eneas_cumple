import { DeviceSize } from "../devicesize.js";

export class CommonWeapon extends Phaser.Physics.Arcade.Image
{
    travelTime;
    factorTime;
    source;
    target;
    t;
    currentTime;

    constructor (scene, spriteSheet, weapon)
    {
        super(scene, 0, 0, spriteSheet, weapon);
        this.currentScene = scene;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.visibility(false);
        this.setDepth(5);
        this.target = -DeviceSize.HEIGHT_MIDDLE;
    }

    visibility(isVisible){
        this.setActive(isVisible);
        this.setVisible(isVisible);
        this.body.enable = isVisible;
     }

     fire (x, y)
     {
         this.source = y;
         this.target = y - DeviceSize.HEIGHT;
         this.y = y;
         this.x = x;
         this.currentTime = 0;
         this.visibility(true);
      }

    update (time, delta)
    {
        this.currentTime+=delta;
        this.y = Phaser.Math.Interpolation.Linear([this.source, this.target], this.currentTime*this.factorTime);
   
        if (this.y < this.target)
            this.visibility(false);
    }
}