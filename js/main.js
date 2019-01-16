//margenes del grafico
var margin = {
    left: 40,
    right: 20,
    top: 20,
    bottom: 40
};

//tamaño del grafico

var width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// se deben crear 2 escalas, una para las x y otra para las y

var x = d3.scaleLinear()
    .domain([0, 5000]) //esto hace referencia al valor min y max de los valores en los datos
    .range([0, height]); //referencia al espacio que se tiene para dibujar

var g = d3.select("#grafico")
    .append("svg") //creo un objeto svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate("+margin.left+", "+margin.top+")");


g.append("g")
.attr("class","top axis")
.call(d3.axisTop(x))