import { Button } from "./button.js";
import { Dialog } from "./dialog.js";
import { DeviceSize } from "../devicesize.js"

export class GameEnd extends Dialog
{
    resetGame;
    robotEneas;
    hsv;
    textPause;
    timePoint = 0;
    textPoint = '';
    amountPoint = 0;
    fullscreen;
    puntajeLabel;
    i=0;

    create (data){
        super.create(data);

        this.source.musicPlayer.play('endMusic');

        this.hsv = Phaser.Display.Color.HSVColorWheel();

         this.resetGame = new Button(DeviceSize.WIDTH*0.67, DeviceSize.HEIGHT*0.7, "Reiniciar", this, function (currentScene)
         {
            currentScene.source.musicPlayer.stop();
            currentScene.sound.play('click');
            currentScene.source.scene.restart();
            currentScene.scene.remove();
         });

                  
        this.fullscreen = new Button(DeviceSize.WIDTH*0.67, this.resetGame.y + this.resetGame.button.height, '', this, function(scene){
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
             y: this.targetHeight*0.1,
             text: 'Misión: Cumpleaños de Eneas',
             origin: { x: 0.5, y: 0.5 },
             style: {
                 fontFamily: 'Arial', 
                 fontSize: fz,
                 wordWrap: { width: this.targetWidth }
             }
         });
         this.title.setStroke('#262e39', 5);

         this.robotEneas = this.add.image(DeviceSize.WIDTH*0.25, DeviceSize.HEIGHT*0.75, 'gui', 'robotEneas' );

         fz = 36*DeviceSize.sacaleFactorY + 'px';
         this.textPause = this.make.text({
             x: DeviceSize.WIDTH_MIDDLE,
             y: this.targetHeight*0.4,
             text: 'Haz salvado al planeta de la invasión.\n\n Te invitamos a festejar la victoria con los demás guerreros el sábado 9 de marzo en Rufino Mir 265 de 13.15 a 17.45 hs.\n\n¡¡¡No faltes!!!',
             origin: { x: 0.5, y: 0.5 },
             style: {
                 fontFamily: 'Arial', 
                 fontSize: fz,
                 fill:'#000000',
                 wordWrap: { width: this.targetWidth }
             }
         });

         fz = 42*DeviceSize.sacaleFactorY + 'px';
         this.puntajeLabel = this.add.text(this.robotEneas.x , this.targetHeight*0.6, "")
         .setOrigin(0)
         .setStyle({fontSize: fz, fontFamily: 'Arial'});
         this.puntajeLabel.setTint(0x3d49bf, 0x00beff, 0xff00af, 0x000000);
         this.puntajeLabel.text = "Lograste: " + 0 +  ' puntos';
         this.dialog.add(this.puntajeLabel);

         this.tweens.addCounter({
            from: 0,
            to: this.source.hud.recordPoints,
            duration: 500,
            delay: 500,
            ease: 'linear',
            onUpdate: tween =>
            {
                const value = Math.round(tween.getValue());
                this.puntajeLabel.setText('Lograste: ' + value + ' puntos');
            }
        });

        this.dialog.add(this.fullscreen);
        this.dialog.add(this.textPause);
        this.dialog.add(this.title);
        this.dialog.add(this.resetGame);
        this.dialog.add(this.robotEneas);
        this.resetGame.alpha =1;
   }

    update (time, delta)
    {
        super.update(time, delta);

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