export default class PlaneFrame{
    constructor(icao, lat, lon, speed, alt, timestamp){
        this.icao = icao
        this.lat = lat
        this.lon = lon
        this.speed = speed
        this.alt = alt
        this.timestamp = timestamp
    }
}