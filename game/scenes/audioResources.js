export class AudioResources{
    currentMusic;
    currentScene;
    
    constructor(scene){
        this.currentScene = scene;
        this.loadMusics(scene);
        this.loadFxSound(scene);
    }

    loadFxSound(scene){
        scene.load.audio('enemyExplode', [
            'game/assets/audio/fx/EnemyExplode.m4a'
        ]);

        scene.load.audio('laserGun', [
            'game/assets/audio/fx/LaserGun.m4a'
        ]);

        scene.load.audio('misil', [
            'game/assets/audio/fx/Misil.m4a'
        ]);

        scene.load.audio('obstacleExplode', [
            'game/assets/audio/fx/obstacleExplode.m4a'
        ]);

        scene.load.audio('shipExplode', [
            'game/assets/audio/fx/ShipExplode.m4a'
        ]);

        scene.load.audio('gameOver', [
            'game/assets/audio/music/GameOver.m4a'
        ]);

        scene.load.audio('click', [
            'game/assets/audio/fx/click.mp3'
        ]);
    }

    loadMusics(scene){
        scene.load.audio('mainMusic', [
            'game/assets/audio/music/music.m4a'
        ]);

        scene.load.audio('endMusic', [
            'game/assets/audio/music/EndGame.m4a'
        ]);
    }
}