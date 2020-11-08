console.log("TESTING");
var url_data = "https://gist.githubusercontent.com/leonalejandro/7611d6f3bf05cd4624427185d10c7ecc/raw/2f680f5f36e78f8fcfb4c21f4f4d2e587e7b2934/Co2_Emissions.json";
var url_data2 = "https://gist.githubusercontent.com/leonalejandro/1d1c5428a176e28907edd6fbe48a6dba/raw/3e65eb6a35199d90ce104d9e8436df5df63e79ea/Co2Emissions.csv";


var data_co2;

function getDataFromFile() {
    axios.get(url_data).then((response) => {
        var misDatos = [];
        var anio = 0;

        for (var i = 0; i < response.data.length; i++) {
            var datonuevo = {};
            datonuevo["zi"] = response.data[i].zi;
            datonuevo["zj"] = response.data[i].zj;
            datonuevo["co2_car_opeak"] = response.data[i].co2_car_opeak;
            datonuevo["co2_car_peak"] = response.data[i].co2_car_peak;
            datonuevo["co2_tm_peak"] = response.data[i].co2_tm_peak;
            datonuevo["co2_tm_opeak"] = response.data[i].co2_tm_opeak;
            datonuevo["anio"] = response.data[i].anio;
            
            misDatos.push(datonuevo);
        }
        data_co2 = misDatos;
        return misDatos;
    })
  };


  function getDataByAnioZona(anio, zonai){
    var misDatos = [];

    for (var i = 1; i < 20; i++) {
        console.log(data_co2.length);
    }
}

  function printData(){
    console.log(data_co2);
  };