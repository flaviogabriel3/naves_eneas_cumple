import { Enemy1 } from "./enemys/enemy1.js";
import { Enemy2 } from "./enemys/enemy2.js";
import { Torpedo } from "./weapons/torpedo.js";
import { Laser } from "./weapons/laser.js";

export class ConfigLevel{
    maxEnemyRow;
    maxEnemyColumn;
    maxCamikaseMode;
    enemyTimeSpawn
    enemyTimeToPosicion;
    enemyClass;
    maxRespawnEnemy;

    weapon;

    obstacleMinTimeTarget;
    obstacleMaxTimeTarget;
    obstacleMaxSpawn;
    obstacleTimeSpawn;
    bulletDelay;

    maxLevels = 8;

    constructor(){
    }

    setLevel(level){
        switch (level){
            case 1:
                this.maxEnemyRow = 1; //Filas de enegimos
                this.maxEnemyColumn = 4; //columnas de enemigos
                this.maxCamikaseMode = 0; //cantidad de kamikases por enemigos puesto en escena
                this.enemyTimeSpawn = 500; //tiempo en milisegundos en que van apareciendo los enemigos cuando se ponen en escena
                this.enemyTimeToPosicion = 2000; //tiempo en milisegundos hasta que van a su posición.
                this.maxRespawnEnemy = 3; //cantidad de veces que apacen los enemigos antes de pasar al nuevo nivel 
            
                this.weapon = Torpedo;  //cantidad de veces que aparecen los enemigos antes de pasar al nuevo nivel 
                this.bulletDelay = 333; //tiempo en milisegundos entre cada disparo.
            
                this.obstacleMinTimeTarget = 4000; //tiempo mínimo de viaje de un obstaculo
                this.obstacleMaxTimeTarget = 5000; //tiempo máximo de viaje de un obstaculo
                this.obstacleMaxSpawn = 3; //cantidad de obstaculos cada vez que se ponen en escena.
                this.obstacleTimeSpawn = 5000; //tiempo en milisegundos en que aparecen nuevos obstaculos.

                this.enemyClass = [Enemy1]; //tipos de enemigos enemigos
                this.enemyforClassMax = [this.maxEnemyRow*this.maxEnemyColumn] //cantidad de enemigos en escena.
            break;

            case 2:
                this.maxEnemyRow = 2; //Filas de enegimos
                this.maxEnemyColumn = 4; //columnas de enemigos
                this.maxCamikaseMode = 0; //cantidad de kamikases por enemigos puesto en escena
                this.enemyTimeSpawn = 500; //tiempo en milisegundos en que van apareciendo los enemigos cuando se ponen en escena
                this.enemyTimeToPosicion = 2000; //tiempo en milisegundos hasta que van a su posición.
                this.maxRespawnEnemy = 4; //cantidad de veces que apacen los enemigos antes de pasar al nuevo nivel 
            
                this.weapon = Torpedo;  //cantidad de veces que aparecen los enemigos antes de pasar al nuevo nivel 
                this.bulletDelay = 333; //tiempo en milisegundos entre cada disparo.
            
                this.obstacleMinTimeTarget = 4000; //tiempo mínimo de viaje de un obstaculo
                this.obstacleMaxTimeTarget = 5000; //tiempo máximo de viaje de un obstaculo
                this.obstacleMaxSpawn = 3; //cantidad de obstaculos cada vez que se ponen en escena.
                this.obstacleTimeSpawn = 4000; //tiempo en milisegundos en que aparecen nuevos obstaculos.

                this.enemyClass = [Enemy1]; //tipos de enemigos enemigos
                this.enemyforClassMax = [this.maxEnemyRow*this.maxEnemyColumn] //cantidad de enemigos en escena.
            break;

            case 3:
                this.maxEnemyRow = 2; //Filas de enegimos
                this.maxEnemyColumn = 4; //columnas de enemigos
                this.maxCamikaseMode = 2; //cantidad de kamikases por enemigos puesto en escena
                this.enemyTimeSpawn = 500; //tiempo en milisegundos en que van apareciendo los enemigos cuando se ponen en escena
                this.enemyTimeToPosicion = 2000; //tiempo en milisegundos hasta que van a su posición.
                this.maxRespawnEnemy = 4; //cantidad de veces que apacen los enemigos antes de pasar al nuevo nivel 
            
                this.weapon = Torpedo;  //cantidad de veces que aparecen los enemigos antes de pasar al nuevo nivel 
                this.bulletDelay = 333; //tiempo en milisegundos entre cada disparo.
            
                this.obstacleMinTimeTarget = 4000; //tiempo mínimo de viaje de un obstaculo
                this.obstacleMaxTimeTarget = 5000; //tiempo máximo de viaje de un obstaculo
                this.obstacleMaxSpawn = 3; //cantidad de obstaculos cada vez que se ponen en escena.
                this.obstacleTimeSpawn = 4000; //tiempo en milisegundos en que aparecen nuevos obstaculos.

                this.enemyClass = [Enemy1]; //tipos de enemigos enemigos
                this.enemyforClassMax = [this.maxEnemyRow*this.maxEnemyColumn] //cantidad de enemigos en escena.
            break;

             case 4:
                this.maxEnemyRow = 1;
                this.maxEnemyColumn = 4;
                this.maxCamikaseMode = 4;
                this.enemyTimeSpawn = 500;
                this.enemyTimeToPosicion = 2000;
                this.maxRespawnEnemy = 4;
            
                this.weapon = Torpedo;
                this.bulletDelay = 233;
            
                this.obstacleMinTimeTarget = 4000;
                this.obstacleMaxTimeTarget = 5000;
                this.obstacleMaxSpawn = 4;
                this.obstacleTimeSpawn = 3000;

                this.enemyClass = [Enemy2];
                this.enemyforClassMax = [this.maxEnemyRow*this.maxEnemyColumn]
            break;

            case 5:
                this.maxEnemyRow = 2;
                this.maxEnemyColumn = 4;
                this.maxCamikaseMode = 4;
                this.enemyTimeSpawn = 500;
                this.enemyTimeToPosicion = 2000;
                this.maxRespawnEnemy = 4;
            
                this.weapon = Laser;
                this.bulletDelay = 233;
            
                this.obstacleMinTimeTarget = 4000;
                this.obstacleMaxTimeTarget = 5000;
                this.obstacleMaxSpawn = 4;
                this.obstacleTimeSpawn = 3000;

                this.enemyClass = [Enemy2];
                this.enemyforClassMax = [this.maxEnemyRow*this.maxEnemyColumn]
            break;

            case 6:
                this.maxEnemyRow = 2;
                this.maxEnemyColumn = 4;
                this.maxCamikaseMode = 6;
                this.enemyTimeSpawn = 500;
                this.enemyTimeToPosicion = 2000;
                this.maxRespawnEnemy = 4;
            
                this.weapon = Laser;
                this.bulletDelay = 233;
            
                this.obstacleMinTimeTarget = 4000;
                this.obstacleMaxTimeTarget = 5000;
                this.obstacleMaxSpawn = 6;
                this.obstacleTimeSpawn = 3000;

                this.enemyClass = [Enemy2];
                this.enemyforClassMax = [this.maxEnemyRow*this.maxEnemyColumn]
            break;

            case 7:
                this.maxEnemyRow = 3;
                this.maxEnemyColumn = 4;
                this.maxCamikaseMode = 8;
                this.enemyTimeSpawn = 500;
                this.enemyTimeToPosicion = 2000;
                this.maxRespawnEnemy = 4;
            
                this.weapon = Laser;
                this.bulletDelay = 233;
            
                this.obstacleMinTimeTarget = 4000;
                this.obstacleMaxTimeTarget = 5000;
                this.obstacleMaxSpawn = 6;
                this.obstacleTimeSpawn = 3000;

                this.enemyClass = [Enemy2];
                this.enemyforClassMax = [this.maxEnemyRow*this.maxEnemyColumn]
            break;

            case 8:
                this.maxEnemyRow = 4;
                this.maxEnemyColumn = 4;
                this.maxCamikaseMode = 8;
                this.enemyTimeSpawn = 500;
                this.enemyTimeToPosicion = 2000;
                this.maxRespawnEnemy = 5;
            
                this.weapon = Laser;
                this.bulletDelay = 233;
            
                this.obstacleMinTimeTarget = 4000;
                this.obstacleMaxTimeTarget = 5000;
                this.obstacleMaxSpawn = 8;
                this.obstacleTimeSpawn = 2000;

                this.enemyClass = [Enemy2];
                this.enemyforClassMax = [this.maxEnemyRow*this.maxEnemyColumn]
            break;


        }

    }


}
