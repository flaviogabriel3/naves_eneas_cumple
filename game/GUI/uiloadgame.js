import { DeviceSize } from "../devicesize.js";

export class UILoadGame
{
    constructor(scene) {
        scene.cameras.main.setBackgroundColor('0x86d8f6');
        var progress = scene.add.graphics();
            var configText = {
                x: DeviceSize.WIDTH*0.06,
                y: DeviceSize.HEIGHT*0.6,
                text: 'Cargando Cumple 8 de Eneas...',
                style: {
                    fontSize: 24*DeviceSize.sacaleFactorX + 'px',
                    fontFamily: 'Arial',
                    color: '#262e39',
                   }
            };

            var textLoader = scene.make.text(configText);
            
            scene.load.on('progress', function (value) {

                progress.clear();
                progress.lineGradientStyle(100, 0x43095e, 0x0a040e, 0x10041a, 0x0c020b, 7);
                progress.lineBetween(0, DeviceSize.HEIGHT*0.7, DeviceSize.WIDTH*value, DeviceSize.HEIGHT*0.7);

            });

            scene.load.on('complete', function () {
                progress.destroy();
                textLoader.destroy();
            });
    }
}


