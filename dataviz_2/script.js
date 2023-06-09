d3.csv("astronautas.csv", d3.autoType).then((data) => {
  let dataNA = data.filter( d => d.nacionalidad)
  let dataSum = sumMisionHsPorAnio(dataNA);
  let dataUS = sumMisionHsPorAnio(dataNA.filter(d => d.nacionalidad === "EE.UU."));
  let dataUSSR = sumMisionHsPorAnio(dataNA.filter(d => d.nacionalidad === "U.S.S.R/Rusia"));
  createChart(dataSum, dataUS, dataUSSR);
});

function sumMisionHsPorAnio(data) {
  const groupedData = d3.group(data, d => d.anio_mision);
  const sumData = Array.from(groupedData, ([anio_mision, datos]) => ({
    anio_mision,
    mision_hs_sum: d3.sum(datos, d => d.mision_hs)
  }));
  return sumData;
}
function maximo(data){
  i = 1
  maximo = data[0]
  while ( i < data.length){
    if (data[i] > maximo){
      maximo = data[i]
    }
  }
  return maximo
}


function createChart(data, dataUS, dataUSSR){
  let chart = Plot.plot({
    height:500,
    width:600,
    marginLeft:50,
    marginBottom:55,
    line:true,
    color:{
      legend:true
    },
    x:{
      domain:[d3.min(data, (d) => d.anio_mision),d3.max(data, (d) => d.anio_mision)],
      ticks:11,  
      label: 'Año',
      labelOffset: 40,
      tickFormat: d3.format("#.0f"),
      

    },
    y:{
      ticks:5,
      grid:true,
      label: 'Horas',
      labelOffset: 35,
      tickFormat: (d) => d / 1000 + "M",
      zero: false,
    },
    marks: [

      Plot.areaY(data, {
        x: "anio_mision", 
        y2: "mision_hs_sum", 
        sort: 'mision_hs_sum',
        sort: 'anio_mision',
        name: "Total",
        color:{
          legend:true
        },
        fillOpacity: 0.1
      }),
      Plot.lineY(data, {
        x: "anio_mision", 
        y: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision',
        name: "Total",
        color:{
          legend:true
        },
        strokeWidth: 1.5
      }),
      Plot.areaY(dataUSSR, {
        x: "anio_mision", 
        y2: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision', 
        name: "U.S.S.R/Rusia",
        fill: "blue",
        color:{
          legend:true
        },
        fillOpacity: 0.1
      }),
      Plot.lineY(dataUSSR, {
        x: "anio_mision", 
        y: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision',
        name: "U.S.S.R/Rusia",
        color:{
          legend:true
        },
        stroke: "blue",
        strokeWidth: 1.5
        
      }),
      Plot.areaY(dataUS, {
        x: "anio_mision", 
        y2: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision', 
        name: "EE.UU.",
        fill: "magenta",
        color:{
          legend:true
        },
        fillOpacity: 0.1
      }),
      Plot.lineY(dataUS, {
        x: "anio_mision", 
        y: "mision_hs_sum",
        sort: 'mision_hs_sum',
        sort: 'anio_mision',
        stroke: "magenta",
        name: "EE.UU.",
        color:{
          legend:true
        },
        strokeWidth: 1.5
      }),
      ],
      
  });
  
  d3.select("#chart")
    .append("div")
    .attr("class", "chart-title")
  
  d3.select("#chart").append(() => chart);

  
};