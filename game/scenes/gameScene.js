import {CelestialObjects} from "../celestialObjects.js";
import {Ship} from "../ship.js";
import { UILoadGame } from "../GUI/uiloadgame.js";
import { EnemyManager } from "../enemys/enemyManager.js";
import { ObstacleManager } from "../obstacles/obstaclesManager.js";
import { DeviceSize } from "../devicesize.js";
import { HUD } from "../GUI/hud.js";
import { ObstaclesAnim } from "../obstacles/obstaclesAnim.js";
import { OtherAnims } from "../weapons/OtherAnims.js";
import { MusicPlayer } from "./musicPlayer.js";
import { ConfigLevel } from "../configLevel.js";
import { GameEnd } from "../GUI/gameEnd.js";

export class GameScene extends Phaser.Scene
{
    lastFired = 0;
    containerAction;

    celestials;
    currentShip;
    enemyManager;
    obstaclesManager;
    
    musicPlayer;
    
    hud;

    countLevel;
    configLevel;

    constructor ()
    {
        super({ key: 'GameScene' });
    }

    preload ()
    {
        var uiLoadGame = new UILoadGame(this);
        this.obstaclesManager = new ObstacleManager(this);
        this.enemyManager = new EnemyManager(this);
        this.countLevel = 0;
    }

    create ()
    {
        this.celestials = new CelestialObjects(this);
        
        new ObstaclesAnim(this, DeviceSize.scaleFactorTextures);
        new OtherAnims(this, DeviceSize.scaleFactorTextures);

        this.bg = this.add.tileSprite(DeviceSize.WIDTH_MIDDLE, DeviceSize.HEIGHT_MIDDLE, DeviceSize.WIDTH, DeviceSize.HEIGHT, 'space', 'background').setScrollFactor(0);
        this.stars = this.add.tileSprite(DeviceSize.WIDTH_MIDDLE, DeviceSize.HEIGHT_MIDDLE, DeviceSize.WIDTH, DeviceSize.HEIGHT, 'obstacles', 'stars').setScrollFactor(0);
        
        this.containerAction = this.add.container(DeviceSize.WIDTH, DeviceSize.HEIGHT).setName('mainAction');

        this.containerAction.setDepth(4);
        this.containerAction.x=0;
        this.containerAction.y=0;

        this.currentShip = new Ship(this, DeviceSize.sacaleFactorX, DeviceSize.sacaleFactorY, DeviceSize.HEIGHT_MIDDLE);
        this.containerAction.add(this.currentShip.containerTouch);
        this.cameras.main.startFollow(this.containerAction);

        this.obstaclesManager.create(this);
        this.enemyManager.create(this);

        this.hud = new HUD(this);
        this.musicPlayer = new MusicPlayer(this);
        this.musicPlayer.play('mainMusic');
        this.configLevel = new ConfigLevel();
        this.newLevel();
        
        this.events.on('transitionstart', () => {this.scene.enable = false;});
        this.events.on('transitioncomplete', () => {this.scene.enable = true;});
    }

    createExplotions(){
        const config = {
            key: 'explode',
            frames: 'boom',
            frameRate: 30,
            repeat: -1,
            repeatDelay: 2000
        };

        this.anims.create(config);
    }

    update (time, delta)
    {
        if (this.scene.enable){
            this.bg.tilePositionY -= delta * 0.1;
            this.stars.tilePositionY -= delta * 0.2;
    
            this.currentShip.update(time, delta);
            this.obstaclesManager.update(time, delta);
            this.enemyManager.update(time, delta);
            this.celestials.update(time, delta);
        }
    }

    newLevel(){
        this.countLevel++;

        if (this.countLevel <= this.configLevel.maxLevels) {
            
            this.configLevel.setLevel(this.countLevel);
            this.currentShip.level(this.configLevel);
            
            this.obstaclesManager.level(this.configLevel);
            this.currentShip.setOverlapsObstacles(this.obstaclesManager);

            this.enemyManager.level(this.configLevel);
            this.currentShip.setOverlapsEnemys(this.enemyManager);
            
            this.hud.setLevel(this.countLevel);
        } else {
            this.scene.pause();
            this.scene.add('GameEnd', GameEnd, true, { x: 0, y: 0, source: this });            
        }
    }
}
