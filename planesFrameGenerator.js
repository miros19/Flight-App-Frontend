export class PlanesFrameGenerator{
    constructor(){
        this.planes = {}

        for (let i = 0; i < 5; i++){
            this.planes[this.createRandomICAO(4)] = [i * 10.0, 0]
        }

        this.constans = {
            "speed": 800,
            "lon": 0.2864788975654116,
            "alt": 9000
        }
    }

    generateFrames(){
        frames = []
        for (const [key, value] of Object.entries(this.planes)){
            frames.push(this._generateFrame(key, value))
        }
        return frames
    }

    _generateFrame(plane, data){
        data[1] += this.constans.lon
        if (data[1] > 180){
            data[1] *= -1
            data[1] += this.constans.lon
        }
        const frame = {
            "icao": plane,
            "speed": this.constans.speed,
            "lat": data[0],
            "lon": data[1],
            "alt": this.constans.alt,
            "timestamp": new Date().toLocaleString()
        }
        return frame
    }

    createRandomICAO(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
      
}