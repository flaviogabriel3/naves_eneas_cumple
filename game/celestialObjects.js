export class CelestialObjects
{
    bluePlanet;
    starsFrom;
    currentShow;
    galaxy;
    brownPlanet;
    purplePlanet;
    sun;
    gasGiant;

    celestials;

    timeSapwn;
    deltaSpawn;

    constructor (scene)
    {

        this.galaxy = scene.add.image(-1280, -1280, 'space', 'galaxy').setBlendMode(1).setScrollFactor(0.6);

        scene.tweens.add({
            targets: this.galaxy,
            angle: 360,
            duration: 100000,
            ease: 'Linear',
            loop: -1
        });

        this.galaxy.setVisible(false);
        
        //this.add.image(3140, 2974, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6).setScale(0.8).setTint(0x882d2d);
        console.log("Constructor de Objetos celestiales");

        this.gasGiant = scene.add.image(-1280, -1280, 'space', 'gas-giant').setOrigin(0).setScrollFactor(0.6);
        this.gasGiant.setVisible(false);
        this.bluePlanet = scene.add.image(-1280, -1280, 'space', 'blue-planet').setOrigin(0).setScrollFactor(0.6);
        this.bluePlanet.setVisible(false);
        this.starsFrom = scene.add.image(-1280, -1280, 'space', 'eyes').setBlendMode(1).setScrollFactor(0.8);
        this.starsFrom.setVisible(false);
        this.brownPlanet = scene.add.image(-1280, -1280, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6);
        this.brownPlanet.setVisible(false);
        this.purplePlanet = scene.add.image(-1280, -1280, 'space', 'purple-planet').setOrigin(0).setScrollFactor(0.6);
        this.purplePlanet.setVisible(false);
        this.sun = scene.add.image(-1280, -1280, 'space', 'sun').setOrigin(0).setScrollFactor(0.6);
        this.sun.setVisible(false);


        this.celestials = [this.bluePlanet, this.starsFrom, this.brownPlanet, this.purplePlanet, this.sun, this.galaxy, this.gasGiant];
        this.spawn();
    }

    spawn() {
        this.currentShow = this.celestials[Phaser.Math.Between(0, this.celestials.length - 1)];
        this.currentShow.setPosition(Phaser.Math.Between(-360 + this.currentShow.width/2, 360 - this.currentShow.width/2), -800 - this.currentShow.height/2);
        this.timeSapwn = 10000 + Phaser.Math.Between(0, 5000)
        this.deltaSpawn = this.timeSapwn;
        this.currentShow.setVisible(true);
        this.currentShow.setDepth(2);
    }

    update (time, delta)
    {
        this.deltaSpawn -= delta;
        if (this.deltaSpawn > 0) {
            this.currentShow.y += delta*0.3;
        } else {
            this.currentShow.setVisible(false);
            this.spawn();
        }
    }
}