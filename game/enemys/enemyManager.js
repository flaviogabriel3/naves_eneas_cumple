import { CollectionGameObject } from "../collectionGameObject.js";
import { DeviceSize } from "../devicesize.js";

export class EnemyManager{
    LINEAR_INTERPOLATE = 1;
    enemys;
    timeSpawn;
    t;

    maxCamikaseMode=0;
    countCamikaseMode=0;
    countRespawn=0;

    countEnemyRow;
    countEnemyColumn;
    maxEnemyRow;
    maxEnemyColumn
    xoffset;
    yoffset;
    xpadding;
    ypadding;
    enemyWidth;
    enemyHeight;
    timeToPosicion;

    currentScene;
    
    configLevel;

    shipLives;

    create(scene) {
        this.currentScene = scene;
        this.enemys = new CollectionGameObject(scene);
    }

    level(configLevel){
        this.configLevel = configLevel;

        this.maxEnemyRow = configLevel.maxEnemyRow;
        this.maxEnemyColumn = configLevel.maxEnemyColumn;
        this.maxCamikaseMode = configLevel.maxCamikaseMode;
        this.countRespawn = configLevel.maxRespawnEnemy;
        this.xpadding = 30;
        this.ypadding = 30;

        this.enemys.destroyAll();
        this.enemys.addMany(configLevel.enemyClass[0], configLevel.enemyforClassMax[0]);

        this.reset();
    }

    reset(){
        this.shipLives = this.configLevel.maxEnemyRow*this.configLevel.maxEnemyColumn;
        this.timeSpawn =  this.configLevel.enemyTimeSpawn;
        this.timeToPosicion =  this.configLevel.enemyTimeToPosicion;
        
        this.countEnemyRow = 0;
        this.countEnemyColumn = 1;
        this.xoffset = 0;
        this.yoffset = 0;
        this.t = this.timeSpawn;
        this.countCamikaseMode = this.maxCamikaseMode;
    }

    setOffsets(enemy){
        this.enemyWidth = enemy.body.width;
        this.enemyHeight = enemy.body.height;
        this.xoffset = (DeviceSize.WIDTH - (this.enemyWidth + this.xpadding)*this.maxEnemyColumn)*0.5 - this.enemyWidth*0.5 - this.xpadding;
        this.yoffset += this.ypadding;
    }

    update(time, delta){
        this.t -= delta;
        if (this.t <= 0){
            if (this.countEnemyRow < this.maxEnemyRow)
                this.countEnemyRow +=1;
            else{
                this.countEnemyRow = 1;
                this.countEnemyColumn +=1;
            }  
            
            if (this.countEnemyColumn <= this.maxEnemyColumn){
                this.spawn();
                this.t = this.timeSpawn;
            }
        }

        this.enemys.update(time, delta);
    }

    minusShips(){
        this.shipLives-=1;
  
        if (this.shipLives <= 0){
            this.countRespawn--;
            
            if (this.countRespawn > 0)
                this.reset();
            else
                this.currentScene.newLevel();
        }
    }

    spawn(){
        const enemys = this.enemys.get();
        if (enemys) {
  
            if (this.xoffset == 0)
                this.setOffsets(enemys);
            
            let px;
            let py;
            let isKamikase = false;

            if (this.countCamikaseMode > 0){
                px = this.currentScene.currentShip.x;
                py = this.currentScene.currentShip.y;
                this.countCamikaseMode--;
                isKamikase = true;
            }else{
                px = -DeviceSize.WIDTH_MIDDLE + this.xoffset + (this.enemyWidth + this.xpadding)*this.countEnemyColumn;
                py = -DeviceSize.HEIGHT_MIDDLE + this.yoffset + (this.enemyHeight + this.ypadding)*this.countEnemyRow;
            }
            enemys.spawn (new Phaser.Math.Vector2(Phaser.Math.Between(-DeviceSize.WIDTH_MIDDLE, DeviceSize.WIDTH_MIDDLE),-DeviceSize.HEIGHT_MIDDLE), new Phaser.Math.Vector2(px, py), 1000, this.LINEAR_INTERPOLATE, isKamikase);
        }
    }
}