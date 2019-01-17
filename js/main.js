//margenes del grafico
var margin = {
    left: 80,
    right: 40,
    top: 40,
    bottom: 40
};
var datos;
//tamaño del grafico
var width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// se deben crear 2 escalas, una para las x y otra para las y
//creacion de escalas
//escala de color
var color = d3.scaleOrdinal(d3.schemeCategory10);


//creamos el espacio de trabajo
var svg = d3.select("#grafico") //conecto a un elemento del html
    .append("svg") //creo un objeto svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


//titulos de los ejes
// X Label
svg.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 70)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Meses");

// Y Label
svg.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height / 2))
    .attr("y", 20)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenew");


//leemos datos
d3.json("data/revenues.json").then(datos => {

    console.log(datos);

    // datos.sort((x, y)=>{
    //     return d3.descending(x.revenue, y.revenue);
    //  })
    //escala x band
    var x = d3.scaleBand()
        .domain(datos.map(d => d.month))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    //escala y linear
    var y = d3.scaleLinear()
        .domain([0, d3.max(datos, d => d.revenue)])
        .range([height, 0]);

    //creo un grupo qe contendra el eje ordenado
    g.append("g")
        .attr("class", "bottom axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    g.append("g")
        .attr("class", "left axis")
        .call(d3.axisLeft(y))

    //creamos los rectangulos
    var rects = g.selectAll("rect")
        .data(datos)
console.log("February")
    rects.enter()
        .append("rect")
        .attr("y", d=> {
            return y(d.revenue);
        })
        .attr("x", d=> {
            return x(d.month);
        })
        .attr("width", x.bandwidth)
        .attr("height", d=> {
            return height - y(d.revenue);
        })
        .attr("fill", d=>{ return color(d.month);});

});