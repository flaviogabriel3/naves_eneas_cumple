import { Obstacle } from "./obstacle.js";
import { DeviceSize } from "../devicesize.js";
import { CollectionGameObject } from "../collectionGameObject.js";

export class ObstacleManager{
    obstacles;
    minTimeTarget = 2000;
    maxTimeTarget = 3000;
    maxSpawn = 5;
    timeSpawn = 3000;
    t;

    obstaclesOptions;
    currentScene;

    constructor(scene) {
        this.currentScene = scene;
        this.obstaclesOptions = ["mine-anim", "asteroid1-anim", "asteroid2-anim", "asteroid3-anim", "asteroid4-anim"];
    }

    create(scene) {
        this.currentScene = scene;
        this.t = this.timeSpawn;
        this.obstacles = new CollectionGameObject(scene);
    }

    update(time, delta){
        this.t -= delta;

        if (this.t <= 0){
            for (let i = 0; i < this.maxSpawn; i++){
                this.spawn();
            } 

            this.t = this.timeSpawn;
        }

        this.obstacles.update(time, delta);
    }

    level(configLevel){
        if (this.obstacles.length == 0) 
            this.obstacles.addMany(Obstacle, configLevel.obstacleMaxSpawn);
        else if( this.obstacles.length < configLevel.obstacleMaxSpawn)
            this.obstacles.addMany(Obstacle, configLevel.obstacleMaxSpawn - this.obstacles.length);

        this.minTimeTarget = configLevel.obstacleMinTimeTarget;
        this.maxTimeTarget = configLevel.obstacleMaxTimeTarget;
        this.maxSpawn = configLevel.obstacleMaxSpawn;
        this.timeSpawn = configLevel.obstacleTimeSpawn;
    }

    spawn(){
        const obstacle = this.obstacles.get();
        if (obstacle) {
            const source = new Phaser.Math.Vector2(Phaser.Math.Between(-DeviceSize.WIDTH_MIDDLE, DeviceSize.WIDTH_MIDDLE), -DeviceSize.HEIGHT_MIDDLE);
            const target = new Phaser.Math.Vector2(Phaser.Math.Between(-DeviceSize.WIDTH_MIDDLE, DeviceSize.WIDTH_MIDDLE), DeviceSize.HEIGHT_MIDDLE);
            const timeTarget = Phaser.Math.Between(this.minTimeTarget, this.maxTimeTarget);
            const key = this.obstaclesOptions[Phaser.Math.Between(0, this.obstaclesOptions.length - 1)];

            obstacle.spawn (source, target, timeTarget, key);
        }
    }
}