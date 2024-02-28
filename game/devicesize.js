export class DeviceSize{
    static WIDTH=0;
    static HEIGHT=0;
    static WIDTH_MIDDLE=0;
    static HEIGHT_MIDDLE=0;
    static sacaleFactorX = 1;
    static sacaleFactorY = 1;
    static scaleFactorTextures=1;
    static aspectRatio=1;

    static init() {
        if (screen.height > screen.width)
            this.aspectR = screen.height/screen.width;
        else
            this.aspectR = screen.width/screen.height;
        
        if (screen.width < 720){
            this.scaleFactorTextures = 0.5;
            this.sacaleFactorX = 0.5;
            this.sacaleFactorY = 0.5;
            this.WIDTH = 360;
            this.HEIGHT = this.WIDTH *this.aspectR;
        }else {
            this.WIDTH = 720;
            this.HEIGHT = this.WIDTH *this.aspectR;
        }
        
        this.WIDTH_MIDDLE = this.WIDTH*0.5;
        this.HEIGHT_MIDDLE = this.HEIGHT*0.5;
    }
}