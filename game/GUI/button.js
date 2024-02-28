import { DeviceSize } from "../devicesize.js";

export class Button extends Phaser.GameObjects.Container
{
    label;
    button;
    currentScene;

    constructor(x, y, label, scene, callback) 
    {
        let fz = 32*DeviceSize.sacaleFactorX + 'px';
        super(scene, x, y);
        this.currentScene = scene;

        this.button = new Phaser.GameObjects.Image(scene, 0, 0, 'gui', 'button');
        this.label = scene.add.text(0, 0, label)
        .setOrigin(0.5)
        .setPadding(20)
        
        .setStyle({fontSize: fz,
        fontFamily: 'Arial', fill:'#262e39' });

        this.add(this.button);
        this.add(this.label);

        this.setSize(this.button.width, this.button.height);

        this.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => callback(this.currentScene))
        .on('pointerover', () => this.label.setStyle({ fill: '#FFFFFF' }))
        .on('pointerout', () => this.label.setStyle({ fill: '#262e39' }));
    }

    setLabel(label){
        this.label.text = label;
    }
}