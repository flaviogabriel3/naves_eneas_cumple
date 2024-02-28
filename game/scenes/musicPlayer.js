export class MusicPlayer{
    currentScene;
    currentMusic;

    constructor(scene){
        this.currentScene = scene;
    }
    
    play(nameMusic){
        let m = this.currentScene.sound.get(nameMusic);

        if (m == null){
            m = this.currentScene.sound.add(nameMusic, {
                delay: 0,
                loop: true
            });

            m.play();
        } else
            m.play();
        
        if (this.currentMusic != null && this.currentMusic != m){
            this.currentMusic.stop();
        }

        this.currentMusic = m;
    }

    stop(nameMusic){
        this.currentScene.sound.get(nameMusic).stop();
    }

    stop(){
        if (this.currentMusic != null)
            this.currentMusic.stop();
    }
}