import { EnemyGeneric } from "./enemyGeneric.js";

export class Enemy2 extends EnemyGeneric
{
    constructor (scene)
    {
        super(scene, 'space', 'enemigo2');
        this.hardness = 1;
        scene.tweens.add({
            targets: this,
            angle: 360,
            duration: 1000,
            ease: 'Linear',
            loop: -1
        });
    }
}