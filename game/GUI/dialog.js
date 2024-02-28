import { DeviceSize } from "../devicesize.js"

export class Dialog extends Phaser.Scene
{
    targetPosicion;
    targetWidth;
    targetHeight;
    background;
    dialog;
    resetGame;
    resumeButton;

    timeAlpha = 2000;
    currentTime = 0;
    factorTime;

    source;

    create (data){
        this.targetWidth = DeviceSize.WIDTH * 0.9;
        this.targetHeight = DeviceSize.HEIGHT * 0.9;

        this.targetPosicion = new Phaser.Math.Vector2(DeviceSize.WIDTH_MIDDLE, DeviceSize.HEIGHT_MIDDLE);

        this.background = this.add.rectangle(this.targetPosicion.x, this.targetPosicion.y, this.targetWidth, this.targetHeight, 0xFFFFFF);
        this.background.setStrokeStyle(2, 0x00b0f0);
        this.background.alpha = 0.7;

        this.factorTime = 1/this.timeAlpha;
 
        this.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 500,
            onUpdate: (tween) => {

                const a = tween.getValue();
                this.dialog.alpha = a;
            }
        });

        this.dialog = this.add.container(0, 0);
        this.dialog.add(this.background);
        this.dialog.alpha = 0;
        this.background.alpha = 0.8;
        this.dialog.setDepth(6);
        this.source = data.source;
    }
}