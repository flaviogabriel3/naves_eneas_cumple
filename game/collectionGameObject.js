export class CollectionGameObject{
    collectionsUse = [];
    collectionAvailable = [];
    scene;
    length = 0;

    constructor(scene){
        this.collectionAvailable = [];
        this.collectionsUse = [];
        this.scene = scene;
    }

    add(classGameObect){
        this.collectionAvailable.push(new classGameObect(this.scene));
        this.length += 1;
    }

    addMany(classGameObect, count){
        for (let i=0; i < count; i++)
            this.collectionAvailable.push(new classGameObect(this.scene));

        this.length += count;
    }

    get(){
        const gOPop = this.collectionAvailable.pop();
        this.collectionsUse.push(gOPop);
        return gOPop;
    }

    restore(gameObject){
        const index = this.collectionsUse.indexOf(gameObject);
        this.collectionsUse.splice(index, 1);
        this.collectionAvailable.push(gameObject);
    }

    removeAndDestroy(gameObject){
        const index = this.collectionAvailable.indexOf(gameObject);
        this.collectionAvailable.splice(index, 1);

        index = this.collectionsUse.indexOf(gameObject);
        this.collectionsUse.splice(index, 1);

        gameObject.destoy();
    }

    update(time, delta){
        this.collectionsUse.forEach((element) => {
            if (element)
                if (element.visible)
                    element.update(time, delta);              
                else
                    this.restore(element);
        });
    }

    destroyAll(){
        this.collectionAvailable.forEach((element) => {
            if (element)
                element.destroy();
        });

        this.collectionsUse.forEach((element) => {
            if (element)
                element.destroy();
        });
        
        this.collectionsUse = [];
        this.collectionAvailable = [];
    }
}
