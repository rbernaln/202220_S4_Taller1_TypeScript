
import { Serie } from './serie.js';

import { dataSerie } from './dataSeries.js';

let seriesTbody: HTMLElement = document.getElementById('series')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalSeasonsElm: HTMLElement = document.getElementById("Avg-seasons")!;


btnfilterByName.onclick = () => applyFilterByName();

renderSeriesInTable(dataSerie);

totalSeasonsElm.innerHTML = `${getAvgSeasons(dataSerie)}`


function renderSeriesInTable(series: Serie[]): void {
  console.log('Desplegando series');
  series.forEach((serie) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${serie.numero}</td>
                            <td>${serie.nombre}</td>
                           <td>${serie.canal}</td>
                           <td>${serie.temporadas}</td>`;
    seriesTbody.appendChild(trElement);
  });
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearSeriesInTable();
  let coursesFiltered: Serie[] = searchSerieByName(text, dataSerie);
  renderSeriesInTable(coursesFiltered);
}

function searchSerieByName(nameKey: string, series: Serie[]) {
  return nameKey === '' ? dataSerie : series.filter( c => 
    c.nombre.match(nameKey));
}


function getAvgSeasons(series: Serie[]): number {
  let totalCredits: number = 0;
  series.forEach((serie) => totalCredits = totalCredits + serie.temporadas);
  totalCredits=totalCredits/8;
  return totalCredits;
}

function clearSeriesInTable() {
  while (seriesTbody.hasChildNodes()) {
    if (seriesTbody.firstChild != null) {
      seriesTbody.removeChild(seriesTbody.firstChild);
     
    }
  }
}