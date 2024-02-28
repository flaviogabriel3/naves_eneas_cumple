import { DeviceSize } from "../devicesize.js";

export class EnemyGeneric extends Phaser.Physics.Arcade.Image
{
    source;
    target;
    timeTarget;
    typeInterpolation;
    currentTime;
    positionTo;
    explode;
    factorTime;
    timeiddle;
    deltaIddle = 30;
    state = 0;
    points = 1;

    hardness = 1;
    currentHardness=1;
    currentScene;
    kamikaseMode=false;

    constructor (scene, atlas, texture)
    {
        super(scene, -DeviceSize.HEIGHT_MIDDLE, -DeviceSize.HEIGHT_MIDDLE, atlas, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.explode= scene.add.sprite(0, 0, 'explode-enemy-sheet', 19);
        this.explode.setVisible(false);

        this.visibility(false);
        this.body.debugShowBody = true;
        this.setDepth(5);
        this.currentScene = scene;
    }


    iddle(time, delta){
        this.currentTime += delta;

        if (this.currentTime > this.timeiddle) {
            this.positionTo.x = this.x;
            this.positionTo.y = this.y;

            this.deltaIddle = -this.deltaIddle;
            this.currentTime = 0;
       } else
            if (this.kamikaseMode) {
                this.x = Phaser.Math.Interpolation.Linear([this.positionTo.x, this.currentScene.currentShip.containerTouch.x], this.factorTime*this.currentTime);
                this.y = Phaser.Math.Interpolation.Linear([this.positionTo.y, this.currentScene.currentShip.containerTouch.y], this.factorTime*this.currentTime);
            } else
                this.x = Phaser.Math.Interpolation.Linear([this.positionTo.x, this.target.x + this.deltaIddle], this.factorTime*this.currentTime);
    }

    goToTarget(time, delta){
        if (this.currentTime <= this.timeTarget)  {
            this.currentTime += delta;
            this.positionTo = this.interpolate(this.factorTime*this.currentTime);
            this.x = this.positionTo.x;
            this.y = this.positionTo.y;
        } else{
            this.state = 1;
            this.timeiddle = 500;

            if (this.kamikaseMode)
                this.factorTime = 1/2000;
            else
                this.factorTime = 1/this.timeiddle;
            
            this.currentTime = 0;
            this.positionTo.x = this.target.x;
        }
    }

    spawn (source, target, timeTarget, typeInterpoation, kamikaseMode)
    {
        this.setPosition(source.x, source.x);
        this.source = source;
        this.target = target;
        this.timeTarget = timeTarget;
        this.typeInterpolation = typeInterpoation;
        this.visibility(true);
        this.currentTime = 0;
        this.factorTime = 1/this.timeTarget;
        this.state = 0;
        this.currentHardness = this.hardness;
        this.kamikaseMode = kamikaseMode;
        this.explode.setVisible(true);
     }

     interpolate(t){
        if (this.typeInterpolation == 1)
            return new Phaser.Math.Vector2(Phaser.Math.Interpolation.Linear([this.source.x, this.target.x], t), Phaser.Math.Interpolation.Linear([this.source.y, this.target.y], t));
     }

     visibility(isVisible){
        this.setActive(isVisible);
        this.setVisible(isVisible);
        this.body.enable = isVisible;

        this.x = -DeviceSize.HEIGHT_MIDDLE;
        this.y = -DeviceSize.HEIGHT_MIDDLE;
     }

    boom(){
        this.currentHardness -= 1;

        if (this.currentHardness <= 0) {
            this.currentScene.hud.setPoints(this.points);
            this.detonation(this.x, this.y);
            this.visibility(false);
            this.currentScene.enemyManager.minusShips();
        }
    }

    crash(){
        this.detonation(this.x, this.y);
        this.visibility(false);
        this.currentScene.hud.lessLife();
        this.currentScene.enemyManager.minusShips();
    }

    detonation(x, y){
        this.explode.x = x;
        this.explode.y = y;

        this.explode.play({
            key: 'explode-enemy-anim',
        });
    }

    update (time, delta)
    {
        if (this.state==0)
            this.goToTarget(time, delta);
        else
            this.iddle(time, delta);
        
    }

    destroy(){
        this.explode.destroy();
        super.destroy();
     }
}