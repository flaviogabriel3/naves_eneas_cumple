import { DeviceSize } from "../devicesize.js";

export class Obstacle extends Phaser.Physics.Arcade.Sprite{
    source;
    target;

    timeTarget;
    currentTime;
    positionTo;

    currentScene;

    currentObstacle;
    
    factorTime;

    points = 1;
    hardness = 1;
    currentHardness=1;
    
    explode;

    constructor (scene)
    {
        super(scene, -DeviceSize.WIDTH_MIDDLE, -DeviceSize.HEIGHT_MIDDLE, "mine-anim");
        this.currentScene = scene;
  
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.explode= scene.add.sprite(0, 0, 'explode-obstacle-sheet', 19);
        this.explode.setDepth(5);
        this.explode.setVisible(false);

        this.setDepth(5);
        this.setPosition(0,0);

        this.visibility(false);
        this.body.debugShowBody = true;
    }

    update(time, delta){
        if (this.currentTime <= this.timeTarget)  {
            this.currentTime += delta;
            this.positionTo = this.interpolate(this.factorTime*this.currentTime);
            this.x = this.positionTo.x;
            this.y = this.positionTo.y;
        } else {
            this.visibility(false);
        }
    }

    visibility(isVisible){
        this.setActive(isVisible);
        this.setVisible(isVisible);
        this.body.enable = isVisible;

        this.x = -DeviceSize.WIDTH_MIDDLE;
        this.y = -DeviceSize.HEIGHT_MIDDLE; 
        
        if (isVisible == false)
            this.stop();
     }

     detonation(x, y){
        this.explode.x = x;
        this.explode.y = y;
        this.explode.play({
            key: 'explode-obstacle-anim',
        });
    }

    boom(){
        this.currentHardness -= 1;
        if (this.currentHardness <= 0) {
            this.detonation(this.x, this.y);
            this.currentScene.hud.setPoints(this.points);
            this.visibility(false);
        }
    }

    crash(){
        this.detonation(this.x, this.y);
        this.visibility(false);
        this.currentScene.hud.lessLife();
    }

    interpolate(t){
        return new Phaser.Math.Vector2(Phaser.Math.Interpolation.Linear([this.source.x, this.target.x], t), Phaser.Math.Interpolation.Linear([this.source.y, this.target.y], t));
     }

     spawn (source, target, timeTarget, key)
     {
        this.play(key);
        
        this.setPosition(source.x, source.x);
        this.source = source;
        this.target = target;
        this.timeTarget = timeTarget;
        this.visibility(true);
        this.currentTime = 0;

        this.body.width = this.width;
        this.body.height = this.height;

        this.factorTime = 1/this.timeTarget;
        this.currentHardness = this.hardness;
        this.explode.setVisible(true);
     }

     destroy(){
        this.explode.destroy();
        super.destroy();
     }

}