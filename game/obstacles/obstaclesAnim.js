export class ObstaclesAnim{
    constructor(scene, scalefactor){
        if (scene.textures.exists('mine-sheet') == false){
            scene.textures.addSpriteSheetFromAtlas('mine-sheet', { atlas: 'obstacles', frame: 'mine', frameWidth: 64*scalefactor });
            scene.textures.addSpriteSheetFromAtlas('asteroid1-sheet', { atlas: 'obstacles', frame: 'asteroid1', frameWidth: 96*scalefactor });
            scene.textures.addSpriteSheetFromAtlas('asteroid2-sheet', { atlas: 'obstacles', frame: 'asteroid2', frameWidth: 96*scalefactor });
            scene.textures.addSpriteSheetFromAtlas('asteroid3-sheet', { atlas: 'obstacles', frame: 'asteroid3', frameWidth: 96*scalefactor });
            scene.textures.addSpriteSheetFromAtlas('asteroid4-sheet', { atlas: 'obstacles', frame: 'asteroid4', frameWidth: 64*scalefactor });
        }
         
        if (scene.anims.exists('mine-anim') == false){
            scene.anims.create({ key: 'mine-anim', frames: scene.anims.generateFrameNumbers('mine-sheet', { start: 0, end: 15 }), frameRate: 20, repeat: -1 });
            scene.anims.create({ key: 'asteroid1-anim', frames: scene.anims.generateFrameNumbers('asteroid1-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
            scene.anims.create({ key: 'asteroid2-anim', frames: scene.anims.generateFrameNumbers('asteroid2-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
            scene.anims.create({ key: 'asteroid3-anim', frames: scene.anims.generateFrameNumbers('asteroid3-sheet', { start: 0, end: 24 }), frameRate: 20, repeat: -1 });
            scene.anims.create({ key: 'asteroid4-anim', frames: scene.anims.generateFrameNumbers('asteroid4-sheet', { start: 0, end: 23 }), frameRate: 20, repeat: -1 });
        }
    }
}
