import { EnemyGeneric } from "./enemyGeneric.js";

export class Enemy1 extends EnemyGeneric
{
    constructor (scene)
    {
        super(scene, 'space', 'enemigo1');
        this.hardness = 1;
    }
}