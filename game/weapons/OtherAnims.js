export class OtherAnims{
    constructor(scene, scaleFactor){
        this.explodeAnims(scene, scaleFactor);
        this.propulsionAnims(scene, scaleFactor);
        this.impactShip(scene, scaleFactor);
    }

    explodeAnims(scene, scalefactor){
        if (scene.textures.exists('explode-enemy-sheet') == false){
            scene.textures.addSpriteSheetFromAtlas('explode-enemy-sheet', { atlas: 'space', frame: 'explosion', frameWidth: 64*scalefactor, frameHeight: 64*scalefactor, endFrame: 19 });
        }

        if (scene.anims.exists('explode-enemy-anim') == false){
           const config = {
                key: 'explode-enemy-anim',
                frames: 'explode-enemy-sheet',
                frameRate: 30,
                repeat: 0,
            };
    
            scene.anims.create(config);
        }

        if (scene.textures.exists('explode-obstacle-sheet') == false){
            scene.textures.addSpriteSheetFromAtlas('explode-obstacle-sheet', { atlas: 'space', frame: 'explodeObstacle', frameWidth: 128*scalefactor, frameHeight: 128*scalefactor, endFrame: 19 });
        }

        if (scene.anims.exists('explode-obstacle-anim') == false){
           const config = {
                key: 'explode-obstacle-anim',
                frames: 'explode-obstacle-sheet',
                frameRate: 30,
                repeat: 0,
            };
    
            scene.anims.create(config);
        }
    }

    propulsionAnims(scene, scalefactor){
        if (scene.textures.exists('torpedo-sheet') == false){
            scene.textures.addSpriteSheetFromAtlas('torpedo-sheet', { atlas: 'space', frame: 'propulsiontorpedo', frameWidth: 28*scalefactor, frameHeight: 64*scalefactor, endFrame: 5 });
        }

        if (scene.anims.exists('torpedo-anim') == false){
           const config = {
                key: 'torpedo-anim',
                frames: 'torpedo-sheet',
                frameRate: 30,
                repeat: -1,
            };
    
            scene.anims.create(config);
        }
    }

    impactShip(scene, scalefactor){
        if (scene.textures.exists('impact-ship-sheet') == false){
            scene.textures.addSpriteSheetFromAtlas('impact-ship-sheet', { atlas: 'space', frame: 'iconExplode', frameWidth: 80*scalefactor, frameHeight: 90*scalefactor, endFrame: 15 });
        }

        if (scene.anims.exists('impact-ship-anim') == false){
           const config = {
                key: 'impact-ship-anim',
                frames: 'impact-ship-sheet',
                frameRate: 30,
                repeat: 0,
            };
    
            scene.anims.create(config);
        }
    }
}