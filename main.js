import './style.css';
import {Map, View, Feature} from 'ol';
import Control from 'ol/control/Control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { PlanesFrameGenerator } from "./planesFrameGenerator.js"
import { PlanesHistoryService } from "./planesHistoryService.js"
import { Table } from "./table.js"
import { Point } from 'ol/geom.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import {fromLonLat} from 'ol/proj.js';

onload = initialize()

function initialize(){
    window.planesFrameGenerator = new PlanesFrameGenerator()
    window.planesHistoryService = new PlanesHistoryService()

    window.alternateFrameGenerator = new PlanesFrameGenerator()
    window.alternateHistoryService = new PlanesHistoryService()

    window.kmhTable = new Table("table-kmh-container")
    window.mphTable = new Table("table-mph-container")
    window.alternateTable = new Table("table-alternate-container")

    window.planesSource = new VectorSource({})

    for (const [plane, coords] of Object.entries(window.planesFrameGenerator.planes)){
      let feature = new Feature({
        geometry: new Point(fromLonLat(coords))
      })
      window.planesSource.addFeature(feature)
    }

    window.planesLayer = new VectorLayer({
      source: planesSource
    })

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        window.planesLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    const tables = new Control({
      element: document.getElementById("tables")
    })

    map.addControl(tables)

    window.map = map

    render()

    setInterval(render, 1000)

    document.getElementById("table-filter").onkeyup = filterTable
}



function render(){
  const data = window.planesFrameGenerator.generateFrames()

  window.planesHistoryService.push(data)
  let mphData = structuredClone(data)
  mphData = mphData.map((element) => {
      element.speed *= 0.621371192
      return element
  })
  const alternateData = window.alternateFrameGenerator.generateFrames()
  window.alternateHistoryService.push(alternateData)

  window.kmhTable.renderTable(data)
  window.mphTable.renderTable(mphData)
  window.alternateTable.renderTable(alternateData)
  renderPlanes(data)
}

function renderPlanes(data){
  window.planesSource.clear()
  for (let plane of data){
    const coords = fromLonLat([plane.lon, plane.lat])
    const feature = new Feature({
      geometry: new Point(coords)
    })
    window.planesSource.addFeature(feature)
  }
}

function filterTable(){
  const input = document.getElementById("table-filter")
  const filter = input.value.toUpperCase()
  const table = window.kmhTable
  const rows = table.body.querySelectorAll("tr")
  for (let row of rows){
    let cell = row.querySelectorAll("td")[0]
    let txtValue = cell.textContent || cell.innerText;
    if (txtValue.indexOf(filter) == -1){
      row.style.display = "none"
    } else {
      row.style.display = ""
    }
  }
}
