import { DeviceSize } from "../devicesize.js";
import { PauseGame } from "./pauseGUI.js";

export class HUD{
    puntajeLabel;
    recordPoints;
    iconlives = [];
    currentScene;
    buttonPause;
    explode;
    levelLabel;
    areaLabelLevel;
    levelEmmiter;

    constructor(scene){
        let fz = 48*DeviceSize.sacaleFactorY + 'px';
        this.currentScene = scene;

        const hudImage = scene.add.image(0, 0, 'gui', 'hud');   
        hudImage.y = -DeviceSize.HEIGHT_MIDDLE + hudImage.height*0.5;
        hudImage.setDepth(6);

        this.puntajeLabel = scene.add.text(0, -DeviceSize.HEIGHT_MIDDLE, "Puntaje: 0")
            .setOrigin(0)
            .setStyle({fontSize: fz, fontFamily: 'Arial'});
        this.puntajeLabel.setTint(0x3dafbf, 0xffff00, 0x0000ff, 0x1fea48);
        this.puntajeLabel.y = hudImage.y - this.puntajeLabel.height*0.5;
        this.puntajeLabel.setDepth(6);
        this.recordPoints = 0;
        const offsetIconLife = 30;

        for (let i = 0; i < this.currentScene.currentShip.countlives; i++){
            const il = scene.add.image(0, 0, 'gui','iconlive');
            il.y = -DeviceSize.HEIGHT_MIDDLE + hudImage.height*0.5;
            il.x = offsetIconLife - DeviceSize.WIDTH_MIDDLE + (i+1)*il.width + 15*(i+1);
            il.setDepth(6);
            this.iconlives.push(il);
        }

        this.buttonPause = scene.add.image(0, 0, 'gui','buttonpause');
        this.buttonPause.x = DeviceSize.WIDTH_MIDDLE - this.buttonPause.width;
        this.buttonPause.y = DeviceSize.HEIGHT_MIDDLE - this.buttonPause.height;
        this.buttonPause.setInteractive().on('pointerdown', function(){
            scene.sound.play('click');
            scene.scene.pause();
            scene.scene.add('PauseGame', PauseGame, true, { x: 0, y: 0, source: scene });
        })
        this.buttonPause.setDepth(6);
        this.explode= scene.add.sprite(0, 0, 'impact-ship-sheet', 15);

        this.levelLabel = scene.add.text(0, -DeviceSize.HEIGHT_MIDDLE, "Level - 1")
            .setOrigin(0)
            .setStyle({fontSize: fz, fontFamily: 'Arial'});
        this.levelLabel.setTint(0x3dafbf, 0xffff00, 0x0000ff, 0x1fea48);
        this.levelLabel.x = -DeviceSize.WIDTH_MIDDLE + this.levelLabel.width*0.08;
        this.levelLabel.y = DeviceSize.HEIGHT_MIDDLE - this.levelLabel.height*1.8;
        this.levelLabel.setDepth(6);

        this.levelEmmiter = scene.add.particles(0, 0, 'space', {
            frame: 'white',
            blendMode: 'ADD',
            lifespan: 80,
            quantity: 1,
            duration: 1000,
            scale: { start: 0.5, end: 0.1 },
            emitting: false
        });
        this.areaLabelLevel = new Phaser.Geom.Rectangle(this.levelLabel.x, this.levelLabel.y, this.puntajeLabel.width, this.puntajeLabel.height);
        this.levelEmmiter.addEmitZone({ type: 'edge', source: this.areaLabelLevel, quantity: 32, total: 64 });
        this.levelEmmiter.setDepth(6);
    }

    setPoints(points){
        this.recordPoints += points;
        this.puntajeLabel.text = "Puntaje: " + this.recordPoints;
    }
 
    lessLife(){
        if (this.currentScene.currentShip.countlives > 0){
            const i = this.iconlives[this.currentScene.currentShip.countlives - 1];
            this.explode.x = i.x;
            this.explode.y = i.y;
    
            this.explode.play({
                key: 'impact-ship-anim',
            });

            i.setVisible(false);
            i.setActive(false);
        }
    }

    setLevel(level){
        this.levelLabel.text = "Level - " + level;
        this.levelEmmiter.start(5);
    }
}