const _urlData = "/PlanificacionUrbanaBogota/Data/alphabet.json";

width = 620;
height = 500;

margin = ({top: 20, right: 0, bottom: 30, left: 40})

var a = 10;

 
var getData2 = (url) => {
  var misDatos = [];
  d3.csv(url, function(data) {

    var datonuevo = {};
    datonuevo["name"] = data.letter;
    datonuevo["value"] = data.frequency;

    misDatos.push(datonuevo);
 });

  //console.log(misDatos);
  generateviz(misDatos);
}



var getData = (url) => {
    axios.get(url).then((response) => {
        console.log(response.data);
        var misDatos = [];
        for (var i = 0; i < response.data.length; i++) {
            var datonuevo = {};
            datonuevo["name"] = response.data[i].letter;
            datonuevo["value"] = response.data[i].frequency;
            misDatos.push(datonuevo);
        }
        generateviz(misDatos);
        console.log(misDatos);
    })
}


var generateviz = (data) => {

    console.log(data);
    x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1);



  y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  
  xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove());

  
  const svg = d3.select(".dataviz > svg")
      .attr("viewBox", [0, 0, width, height])
      .call(zoom);

  svg.append("g")
      .attr("class", "bars")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

  svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
  }


  function zoom(svg) {
    const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
  
    svg.call(d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent(extent)
        .extent(extent)
        .on("zoom", zoomed));
  
    function zoomed(event) {
      x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
      svg.selectAll(".bars rect").attr("x", d => x(d.name)).attr("width", x.bandwidth());
      svg.selectAll(".x-axis").call(xAxis);
    }
  }


getData(_urlData)