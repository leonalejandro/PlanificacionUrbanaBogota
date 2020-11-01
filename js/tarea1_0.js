const _urlData = "https://www.datos.gov.co/resource/56cv-jshf.json";

width = 620;
height = 400;

margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
}

var a = 10;
var getData = (url) => {
    axios.get(url).then((response) => {
        console.log(response.data);
        var misDatos = [];
        for (var i = 0; i < response.data.length; i++) {
            var datonuevo = {};
            datonuevo["cultivo"] = response.data[i].cultivo;
            datonuevo["valor"] = response.data[i].area_sembrada_ha;
            misDatos.push(datonuevo);
        }
        generateviz(misDatos);
        console.log(misDatos);
    })
}


var generateviz = (data) => {
    x = d3.scaleBand()
        .domain(data.map(d=>d.cultivo))
        .rangeRound([margin.left,width-margin.right]);

    y = d3.scaleLinear()
        .domain([(d3.max(data, d=>+d.valor)),(d3.min(data, d=>d.valor)-100)])
        .range([margin.top, height-margin.bottom]);  
    

    yAxis = g => g
        .attr("transform",`translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    xAxis = g => g
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom(x));

    svg = d3.select(".dataviz > svg")
    .attr("id","viz")
    .attr("viewBox", [0,0,width,height]);
    
    svg.selectAll('.bars').data([data]).join('g').attr('class','bars')
    .attr("fill","steelblue")
    .selectAll("rect")
    .data(d=>d)
    .join("rect")
    .attr("y",d=>y(d.valor))
    .attr("x",(d)=>x(d.cultivo))
    .attr("height",d=>y(d3.min(data, d=>+d.valor)-100)-y(+d.valor))
    .attr("width",20);


    svg.selectAll('.xaxis').data([0]).join('g').attr('class','xaxis')
    .call(xAxis);
    
    svg.selectAll('.yaxis').data([0]).join('g').attr('class','yaxis')
    .call(yAxis);

  }


getData(_urlData)