import { UILoadGame } from "./uiloadgame.js";
import { Button } from "./button.js";
import { DeviceSize } from "../devicesize.js";
import { ImagesResources } from "../scenes/imageResources.js";
import { AudioResources } from "../scenes/audioResources.js";

export class GameMenu extends Phaser.Scene {
    contanierMenu;

    start;
    fullscreen;
    audioResources;
    contanierMenu;
    music;
    bg;
    stars;
    welcome;
    hsv;
    robotEneas;
    textwolcome;
    i=0;

    constructor ()
    {
        super({ key: 'GameMenu', active: true });
    }

    preload(){
        new UILoadGame(this);
        new ImagesResources(this);
        this.audioResources = new AudioResources(this)
    }

    create ()
    {
        this.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 500,
            onUpdate: (tween) => {

                const a = tween.getValue();
                this.contanierMenu.alpha = a;
            }
        });

        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.bg = this.add.tileSprite(DeviceSize.WIDTH_MIDDLE, DeviceSize.HEIGHT_MIDDLE, DeviceSize.WIDTH, DeviceSize.HEIGHT, 'space', 'background').setScrollFactor(0);
        this.stars = this.add.tileSprite(DeviceSize.WIDTH_MIDDLE, DeviceSize.HEIGHT_MIDDLE, DeviceSize.WIDTH, DeviceSize.HEIGHT, 'obstacles', 'stars').setScrollFactor(0);

        this.contanierMenu = this.add.container(0, 0);

        this.robotEneas = this.add.image(DeviceSize.WIDTH*0.25, DeviceSize.HEIGHT*0.75, 'gui', 'robotEneas' );

        this.start = new Button(DeviceSize.WIDTH*0.67, DeviceSize.HEIGHT*0.7, 'COMENZAR', this, function(scene){
            scene.sound.play('click');
            
            const fx = scene.cameras.main.postFX.addWipe(0.3, 1, 1);

            scene.scene.transition({
                target: 'GameScene',
                duration: 2000,
                moveBelow: true,
                onUpdate: (progress) => {

                    fx.progress = progress;

                }
            });
        });

        this.fullscreen = new Button(DeviceSize.WIDTH*0.67, this.start.y + this.start.height, 'Pantalla Completa', this, function(scene){
            scene.sound.play('click');

            if (scene.scale.isFullscreen){
                scene.fullscreen.setLabel('Pantalla Completa');
                scene.scale.stopFullscreen();
            } else{
                scene.fullscreen.setLabel('Pantalla Normal');
                scene.scale.startFullscreen();
            }
        });

        const backgroundW = DeviceSize.WIDTH*0.9;
        const backgroundH = DeviceSize.HEIGHT*0.9;

        this.welcome = this.add.rectangle(DeviceSize.WIDTH_MIDDLE, DeviceSize.HEIGHT_MIDDLE, backgroundW ,backgroundH, 0xFFFFFF);
        this.welcome.alpha = 0.7;
        this.welcome.setStrokeStyle(2, 0x00b0f0);

        this.contanierMenu.add(this.welcome);
        this.contanierMenu.add(this.robotEneas);
        this.contanierMenu.add(this.fullscreen);
        this.contanierMenu.add(this.start);

        let fz = 42*DeviceSize.sacaleFactorY + 'px';
        this.title = this.make.text({
            x: DeviceSize.WIDTH_MIDDLE,
            y: DeviceSize.HEIGHT*0.1,
            text: 'Misión: Cumpleaños de Eneas',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: 'Arial', 
                fontSize: fz,
                wordWrap: { width: backgroundW }
            }
        });
        this.contanierMenu.add(this.title);
        this.title.setStroke('#262e39', 5);

        fz = 36*DeviceSize.sacaleFactorY + 'px';
        this.textwolcome = this.make.text({
            x: DeviceSize.WIDTH_MIDDLE,
            y: DeviceSize.HEIGHT_MIDDLE*0.7,
            text: 'Has sido seleccionado. El destino de la humanidad está en tus manos. La tierra esta siendo atacada por naves alienígenas.\n¿Tienes lo necesario para enfrentar este desafío?\nTu misión será destruirlas, al igual que los meteoritos que se aproximan.\n¡Diviértete y gana la mayor cantidad de puntos!',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: 'Arial', 
                fontSize: fz,
                fill:'#000000',
                wordWrap: { width: backgroundW }
            }
        });
        this.contanierMenu.add(this.textwolcome);
       
        this.contanierMenu.alpha = 0;
     }

     update (time, delta)
    {
        this.bg.tilePositionY -= delta * 0.1;
        this.stars.tilePositionY -= delta * 0.2;

        const top = this.hsv[this.i].color;
        const bottom = this.hsv[359 - this.i].color;

        this.title.setTint(top, top, bottom, bottom);

        this.i++;

        if (this.i === 360)
        {
            this.i = 0;
        }

    }

}