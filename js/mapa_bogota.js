        var width = 960,
				height = 500,
				centered;


				// Define color scale
				var color = d3v3.scale.linear()
				.domain([1, 20])
				.clamp(true)
				.range(['#fff', '#409A99']);

				var projection = d3v3.geo.mercator()
				
				// Center the Map in Colombia
				.center([-74.1, 4.65])
				.translate([width / 2, height / 2])
				.scale(75000);

				var path = d3v3.geo.path().projection(projection);

				// Set svg width & height
				var svg = d3v3.select(".dataviz2 > svg")
				.attr("width",width)  // apply width,height to svg
				.attr("height",height);

				svg.append('rect')
				.attr('class', 'background')
				.attr('width', width)
				.attr('height', height)
				;
				
				var g = svg.append('g');

				var effectLayer = g.append('g')
  				.classed('effect-layer', true);
				
				var mapLayer = g.append('g')
				.classed('map-layer', true);

				var dummyText = g.append('text')
				.classed('dummy-text', true)
				.attr('x', 10)
				.attr('y', 30)
				.style('opacity', 0);

				var dummyText2 = g.append('text')
				.classed('dummy-text', true)
				.attr('x', 10)
				.attr('y', 50)
				.style('opacity', 0);


				var bigText = g.append('text')
				.classed('big-text', true)
				.attr('x', 20)
				.attr('y', 45);


				d3v3.json("https://gist.githubusercontent.com/leonalejandro/e9d061963a65cfd4e26da33fd6df38b5/raw/b9984a536fb2cc490965ea82f327574a289c79b0/zonas_luti.json", function(err, mapData) { 

					var features = mapData.features;

					// Update color scale domain based on data
					color.domain([0, d3v3.max(features, nameLength)]);

					// Draw each province as a path
					mapLayer.selectAll('path')
						.data(features)
						.enter().append('path')
						.attr('d', path)
						.attr('vector-effect', 'non-scaling-stroke')
						.on('mouseover', mouseover)
						.on('mouseout', mouseout);

				});



				// Get province name
				function nameFn(d){
				return d && d.properties ? d.properties.UPlNombre : null;
				}

				// Get upz
				function upzFn(d){
				return d && d.properties ? d.properties.UPlCodigo : null;
				}


				// Get province name length
				function nameLength(d){
					var n = nameFn(d);
					return n ? n.length : 0;
				}


				function mouseover(d){
					// Highlight hovered province
					d3.select(this).style('fill', 'orange');
					dummyText.style('opacity', 1);
					dummyText2.style('opacity', 1);
					// Draw effects
					textArt(nameFn(d),upzFn(d));
				}

				function mouseout(d){
					// Highlight hovered province
					dummyText.style('opacity', 0);
					dummyText2.style('opacity', 0);
					d3.select(this).style('fill', 'white');

				}


				function textArt(text1, text2){
					dummyText.text(text1);
					dummyText2.text(text2);
				}