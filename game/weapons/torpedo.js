import { DeviceSize } from "../devicesize.js";
import { CommonWeapon } from "./commonWapon.js";

export class Torpedo extends CommonWeapon
{
    propulsion;
    offestPropultion;
    
    constructor (scene)
    {
        super(scene, 'space', 'torpedo');
 
        this.setBlendMode(1);
        this.propulsion= scene.add.sprite(0, 0, 'torpedo-sheet', 5);
        this.offestPropultion = this.height*0.5 + this.propulsion.height*0.5;
        
        this.travelTime = 1000;
        this.factorTime = 1/this.travelTime;
        this.visibility(false);
    }

    update(time, delta){
        super.update(time, delta);
        this.propulsion.x = this.x;
        this.propulsion.y = this.y + this.offestPropultion;
    }

    fire(x, y){
        super.fire(x, y);
        this.scene.sound.play('misil');
    }

    visibility(isVisible){
        if (isVisible){
            this.propulsion.x = this.x;
            this.propulsion.y = this.y + this.offestPropultion;
            this.propulsion.visible = true;
            this.propulsion.play({
                key: 'torpedo-anim',
            });
        } else if (this.propulsion != null) {
            this.propulsion.anims.stop();
            this.propulsion.visible = false;
        }
        super.visibility(isVisible);
    }

    destroy(){
        this.propulsion.destroy();
        super.destroy();
    }
}