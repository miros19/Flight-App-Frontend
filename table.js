export class Table{
    constructor(containerId){
        this.container = document.getElementById(containerId)
        this.table = document.createElement("table")
        this.header = document.createElement("thead")
        this.body = document.createElement("tbody")
        this.container.appendChild(this.table)
        this.table.appendChild(this.header)
        this.table.appendChild(this.body)
    }

    renderTable(data){
        if (this.body.innerHTML == ""){
            this.renderHeader(data)
            this.renderBody(data)
        } else {
            this.updateTable(data)
        }
    }

    renderHeader(data){
        this.header.innerHTML = ""
        const headers = Object.keys(data[0])
        for (let header of headers){
            const th = document.createElement("th")
            th.innerHTML = header.charAt(0).toUpperCase() + header.slice(1);
            this.header.appendChild(th)
        }
    }

    renderBody(data){
        this.body.innerHTML = ""
        for (let row of data){
            const tr = document.createElement("tr")
            tr.setAttribute("icao", row.icao)
            for (let value of Object.values(row)){
                let td = document.createElement("td")
                td.innerHTML = value
                tr.appendChild(td)
            }
            this.body.appendChild(tr)
        }
    }

    updateTable(data){
        for (let row of data){
            const icao = row.icao
            const dataList = Object.values(row)
            let tr = this.body.querySelector(`[icao=${icao}]`)
            const cells = tr.querySelectorAll("td")
            for(let i = 0; i < dataList.length; i++){
                cells[i].innerHTML = dataList[i]
            }
        }
    }
}