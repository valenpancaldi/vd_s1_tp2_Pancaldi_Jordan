d3.csv("astronautas.csv", d3.autoType).then(data => {
  
  var cant_nacio = d3.rollup(data, v => v.length, d => d.nacionalidad)
  console.log(cant_nacio)
  var data2 = Array.from(cant_nacio).map(([key, value]) => {
      return {
          'nacionalidad': key,
          'cantidad': value 
      }
    })

    console.log(data2);

  var chart= Plot.plot({
    x: {
      label: "Pais",
      padding: -1
    },
    y: {
      label: "Cantidad",
      grid: true
    },
    width:1000,
    height: 400,
    marginLeft: 25 ,
    marginRight: 150,
    
    marks: [
      Plot.ruleX(data2, {
        x: 'nacionalidad',
        y: 'cantidad'
    }),
      Plot.text(data2, {
      x: "nacionalidad",
      y: "cantidad",
      text: d=> d.cantidad,
      dx:+10,
      }),
    
      Plot.ruleY([0]),
      Plot.barY(data2, {x: "nacionalidad", y: "frequency",insetLeft: 0.5 ,insetRight: 0.5}),
      Plot.dot(data2, {
        x: 'nacionalidad', 
        y: 'cantidad', 
        fill: 'black', 
        r:3}),
        
    ]
      
  })
  d3.select('#chart').append(() => chart)
})

