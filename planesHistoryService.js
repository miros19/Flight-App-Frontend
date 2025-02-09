//Queue = require("./queue")

import { Queue } from "./queue.js"

export class PlanesHistoryService{
    constructor(){
        this.planes = {}
    }

    push(args){
        for (let element of args){
            const icao = element.icao
            if (!this.planes[icao]){
                this.planes[icao] = new Queue()
            } else {
                if (this.planes[icao].getLength() == 20){
                    this.planes[icao].shift()
                }
                this.planes[icao].push(element)
            }
        }
    }
}