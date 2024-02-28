import { GameOver } from "./GUI/gameOver.js";
import { CollectionGameObject } from "./collectionGameObject.js";

export class Ship
{
    containerTouch;
    touchArea;
    currentShip;
    currentScene;

    propultion;
    bullets;
    lastFired = 0;
    speedBullet;
    bulletDelay;

    soundEnemyExplode;
    soundObstaclesExplode;
    soundShipExplode;

    explode;
    countlives=3;

    constructor (scene, scaleFactorX, scalefactorY, heightScreen)
    {
        this.currentScene = scene;
        this.touchArea = scene.add.image(256*scaleFactorX, 256*scalefactorY, 'space', 'toucharea');
        this.containerTouch = scene.add.container(256*scaleFactorX, 256*scalefactorY).setName('containerTouch');

        this.currentShip = scene.physics.add.image(128*scaleFactorX, 128*scalefactorY, 'space', 'ship').setDepth(2);
        this.currentShip.x = 0;
        this.currentShip.y = 0;
        this.currentShip.body.debugShowBody = true;
  
        this.touchArea.x = 0;
        this.touchArea.y = 0;

        this.containerTouch.add(this.currentShip);
        this.containerTouch.add(this.touchArea);

        this.containerTouch.x = 0;
        this.containerTouch.y = heightScreen - this.currentShip.height;

        this.propultion = scene.add.particles(0, 0, 'space', {
            frame: 'blue',
            x: this.currentShip.x,
            y: this.currentShip.y + 64*scalefactorY,
            frame: 'white',
            color: [ 0x96e0da, 0x937ef3 ],
            colorEase: 'quart.out',
            lifespan: 400,
            angle: { min: 95, max: 85 },
            scale: { start: 0.6, end: 0, ease: 'sine.in' },
            speed: { min: 250, max: 350 },
            advance: 500,
            blendMode: 'ADD'
        });

        this.propultion.setDepth(2);
        this.containerTouch.add(this.propultion);

        this.containerTouch.setSize(this.touchArea.width, this.touchArea.height);
        this.containerTouch.setInteractive();

        scene.input.setDraggable(this.containerTouch);

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.explode= scene.add.sprite(0, 0, 'explode-obstacle-sheet', 19);
        this.explode.setDepth(6);
        this.explode.visible = false;
        this.bullets = new CollectionGameObject(scene);
   }

    crash(scene){
        this.countlives -= 1;

        if (this.countlives==0) {
            this.explode.visible = true;
            this.currentShip.visible = false;
            this.currentShip.body.enable = false;
            this.propultion.visible = false;
            this.touchArea.visible = false;

            this.containerTouch.disableInteractive();
            this.explode.x =this.containerTouch.x;
            this.explode.y = this.containerTouch.y;
            
            this.currentScene.sound.play('shipExplode')

            this.explode.on('animationcomplete', function (){
                scene.scene.pause();
                scene.scene.add('GameOver', GameOver, true, {source: scene});
            });

            this.explode.play({
                key: 'explode-obstacle-anim',
            });
        }
    }

    setOverlapsObstacles(obstaclesManager){
        const overlapBullets = (bullet, obstacleOverlap) => {
            this.currentScene.sound.play('obstacleExplode')
            bullet.visibility(false);
            obstacleOverlap.boom();
          }

        const overlapObstacles = (ship, obstacleOverlap) => {
            this.currentScene.sound.play('obstacleExplode')
            obstacleOverlap.crash(this);
            this.crash(this.currentScene);
        }
        
        this.setOverlaps(this.bullets.collectionAvailable, obstaclesManager.obstacles, overlapBullets);
        this.setOverlaps(this.bullets.collectionsUse, obstaclesManager.obstacles, overlapBullets);

        this.setOverlaps([this.currentShip], obstaclesManager.obstacles, overlapObstacles);
  
    }

    setOverlapsEnemys(enemyManager){
        const overlapBullets = (bullet, enemy) => {
            this.currentScene.sound.play('enemyExplode')
            bullet.visibility(false);
            enemy.boom();
         }

         const overlapEnemy = (ship, enemy) => {
            this.currentScene.sound.play('enemyExplode')
            enemy.crash();
            this.crash(this.currentScene);
         }
         
         this.setOverlaps(this.bullets.collectionAvailable, enemyManager.enemys, overlapBullets);
         this.setOverlaps(this.bullets.collectionsUse, enemyManager.enemys, overlapBullets);

         this.setOverlaps([this.currentShip], enemyManager.enemys, overlapEnemy);
    }

    setOverlaps(arraySource, collectionGameObject2, callback){
        arraySource.forEach(object1 => {
            collectionGameObject2.collectionAvailable.forEach(object2 =>{
                this.currentScene.physics.add.overlap(object1, object2, callback);
            });

            collectionGameObject2.collectionsUse.forEach(object2 =>{
                this.currentScene.physics.add.overlap(object1, object2, callback);
            });
        });
    }

    update (time, delta)
    {
        if (this.bullets != null && time > this.lastFired)
        {
            const bullet = this.bullets.get();

            if (bullet)
            {
                bullet.fire(this.containerTouch.x, this.containerTouch.y);
                this.lastFired = time + this.bulletDelay;
            }
        }

        this.bullets.update(time, delta);
    }
    
    level(configLevel) {
        this.lastFired = 0;
        
        this.bullets.destroyAll();
        this.bullets.addMany(configLevel.weapon, 4);
        
        this.bulletDelay = configLevel.bulletDelay;
    }

    pause(){
        this.containerTouch.disableInteractive();
    }

    resume(){
        this.containerTouch.setInteractive();
    }
}