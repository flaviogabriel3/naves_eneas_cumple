//import {LaserCannon} from "./weapons/laser_cannon.js";
import {CelestialObjects} from "./celestialObjects.js";
import {Obstacles} from "./obstacles.js";

export class Game extends Phaser.Scene
{
    lastFired = 0;
    containerAction;
    propultion;
    celestials;
    obstaclesObjects;


    preload ()
    {
        this.load.image('background', 'game/assets/space/nebula.jpg');
        this.load.image('stars', 'game/assets/space/stars.png');
        this.load.atlas('space', 'game/assets/space/space.png', 'game/assets/space/space.json');
    }
    create ()
    {
        this.celestials = new CelestialObjects(this);
        this.obstaclesObjects = new Obstacles(this);


        //  World size is 720 x 8000
        this.bg = this.add.tileSprite(360, 640, 720, 1280, 'background').setScrollFactor(0);
        this.stars = this.add.tileSprite(360, 640, 720, 1280, 'stars').setScrollFactor(0);

        this.containerAction = this.add.container(720, 1280).setName('mainAction');
        this.containerAction.setDepth(4);

        this.ship = this.add.image(128, 128, 'space', 'ship').setDepth(2);
        this.ship.setScale(1.5, 1.5);
        this.containerAction.x=0;
        this.containerAction.y = 0;

        this.ship.angle = -90;
        this.containerAction.add(this.ship);
        
        this.ship.x = 0;
        this.ship.y = 512;

        this.propultion = this.add.particles = this.add.particles(0, 0, 'space', {
            frame: 'blue',
            x: this.ship.x,
            y: this.ship.y + 64,
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

        this.propultion.setDepth(4);

        this.ship.setInteractive({ draggable: true });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            gameObject.setPosition(dragX, dragY);
            this.propultion.setPosition(gameObject.x, gameObject.y-512);

        });

        this.cameras.main.startFollow(this.containerAction);
    }

    update (time, delta)
    {   
        this.obstaclesObjects.update(time, delta);
        this.celestials.update(time, delta);

        this.bg.tilePositionY -= delta * 0.1;
        this.stars.tilePositionY -= delta * 0.2;
    }
}
