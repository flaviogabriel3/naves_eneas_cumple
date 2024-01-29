export class Obstacles
{
    currentObstacle;
    obstaclesOptions;
    velocityObstacle;


    constructor (scene)
    {


        //  Prepare some spritesheets and animations
        scene.textures.addSpriteSheetFromAtlas('mine-sheet', { atlas: 'space', frame: 'mine', frameWidth: 64 });
        scene.textures.addSpriteSheetFromAtlas('asteroid1-sheet', { atlas: 'space', frame: 'asteroid1', frameWidth: 96 });
        scene.textures.addSpriteSheetFromAtlas('asteroid2-sheet', { atlas: 'space', frame: 'asteroid2', frameWidth: 96 });
        scene.textures.addSpriteSheetFromAtlas('asteroid3-sheet', { atlas: 'space', frame: 'asteroid3', frameWidth: 96 });
        scene.textures.addSpriteSheetFromAtlas('asteroid4-sheet', { atlas: 'space', frame: 'asteroid4', frameWidth: 64 });

        scene.anims.create({ key: 'mine-anim', frames: scene.anims.generateFrameNumbers('mine-sheet', { start: 0, end: 15 }), frameRate: 20, repeat: -1 });
        scene.anims.create({ key: 'asteroid1-anim', frames: scene.anims.generateFrameNumbers('asteroid1-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
        scene.anims.create({ key: 'asteroid2-anim', frames: scene.anims.generateFrameNumbers('asteroid2-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
        scene.anims.create({ key: 'asteroid3-anim', frames: scene.anims.generateFrameNumbers('asteroid3-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
        scene.anims.create({ key: 'asteroid4-anim', frames: scene.anims.generateFrameNumbers('asteroid4-sheet', { start: 0, end: 23 }), frameRate: 20, repeat: -1 });

        
        this.obstaclesOptions = ["mine-anim", "asteroid1-anim", "asteroid2-anim", "asteroid3-anim", "asteroid4-anim"];

        this.currentObstacle = scene.add.sprite(128, 128);
        this.currentObstacle.setDepth(2);
        this.currentObstacle.setPosition(0,0);

        this.spawn();
    }

    spawn() {
        this.currentObstacle.play(this.obstaclesOptions[Phaser.Math.Between(0, this.obstaclesOptions.length - 1)]);
        this.currentObstacle.setPosition(Phaser.Math.Between(-360 + this.currentObstacle.width/2, 360 - this.currentObstacle.width/2), -800 - this.currentObstacle.height/2);
        this.timeSapwn = 5000 + Phaser.Math.Between(0, 5000)
        this.deltaSpawn = this.timeSapwn;
        this.currentObstacle.setVisible(true);
        this.currentObstacle.setDepth(2);
        this.velocityObstacle = Phaser.Math.Between(0.4, 0.6)
        this.deltaSpawn = this.timeSapwn;
    }

    update (time, delta)
    {
        this.deltaSpawn -= delta;
        if (this.deltaSpawn > 0) {
            this.currentObstacle.y += delta*this.velocityObstacle;
        } else {
            this.currentObstacle.setVisible(false);
            this.spawn();
        }
    }
}