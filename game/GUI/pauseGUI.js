import { Button } from "./button.js";
import { Dialog } from "./dialog.js";
import { DeviceSize } from "../devicesize.js"

export class PauseGame extends Dialog
{
    resetGame;
    resumeButton;
    satelite;
    hsv;
    textPause;
    timePoint = 0;
    textPoint = '';
    amountPoint = 0;
    fullscreen;
    i=0;

    create (data){
        super.create(data);

        this.hsv = Phaser.Display.Color.HSVColorWheel();

        this.resumeButton = new Button(this.targetPosicion.x, this.targetPosicion.y + this.targetHeight*0.1 , "Reanudar", this, function (currentScene)
        {
            currentScene.sound.play('click');
            currentScene.source.scene.resume();
            currentScene.scene.remove();
         });

         this.resumeButton.alpha = 0;

         this.resetGame = new Button(this.targetPosicion.x, this.resumeButton.y + this.resumeButton.button.height, "Reiniciar", this, function (currentScene)
         {
            currentScene.sound.play('click');
            currentScene.source.scene.restart();
            currentScene.scene.remove();
         });

                  
        this.fullscreen = new Button(this.targetPosicion.x, this.resetGame.y + this.resetGame.button.height, '', this, function(scene){
            scene.sound.play('click');

            if (scene.scale.isFullscreen){
                scene.fullscreen.setLabel('Pantalla Completa');
                scene.scale.stopFullscreen();
            } else{
                scene.fullscreen.setLabel('Pantalla Normal');
                scene.scale.startFullscreen();
            }
        });

        if (this.scale.isFullscreen)
            this.fullscreen.setLabel('Pantalla Normal');
        else
            this.fullscreen.setLabel('Pantalla Completa');

         let fz = 42*DeviceSize.sacaleFactorY + 'px';
         this.title = this.make.text({
             x: DeviceSize.WIDTH_MIDDLE,
             y: this.targetHeight*0.2,
             text: 'Misión: Cumpleaños de Eneas',
             origin: { x: 0.5, y: 0.5 },
             style: {
                 fontFamily: 'Arial', 
                 fontSize: fz,
                 wordWrap: { width: this.targetWidth }
             }
         });
         this.title.setStroke('#262e39', 5);

         this.satelite = this.add.image(DeviceSize.WIDTH_MIDDLE, this.targetHeight*0.4, 'space', 'satelite' );

         fz = 36*DeviceSize.sacaleFactorY + 'px';
         this.textPause = this.make.text({
             x: DeviceSize.WIDTH_MIDDLE,
             y: this.targetHeight*0.5,
             text: 'Pausa, esperando señal',
             origin: { x: 0.5, y: 0.5 },
             style: {
                 fontFamily: 'Arial', 
                 fontSize: fz,
                 fill:'#000000',
                 wordWrap: { width: this.targetWidth }
             }
         });

        this.resetGame.alpha = 0;
        this.dialog.add(this.fullscreen);

        this.dialog.add(this.textPause);
        this.dialog.add(this.title);
        this.dialog.add(this.resetGame);
        this.dialog.add(this.resumeButton);
        this.dialog.add(this.satelite);
        this.resetGame.alpha =1;
        this.resumeButton.alpha = 1;
        
    }

    update (time, delta)
    {
        super.update(time, delta);

        this.timePoint += delta;
        if (this.timePoint > 1000){
            this.textPoint = ''
            this.timePoint = 0;
            this.amountPoint++;
            if (this.amountPoint > 3) this.amountPoint = 0;
            for (let p = 0; p<this.amountPoint; p++){this.textPoint=this.textPoint + '.'}
        }

        this.textPause.text='Pausa, esperando señal' + this.textPoint;

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