const btn = document.querySelector(".filter");
const inputElement = document.querySelector(".inputElement");
let country = inputElement.value;
btn.addEventListener("click", result);
//Country and statistics
function result() {
  let country = inputElement.value;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7c5f3345e3msh64b0829763559f9p1d50eajsn3d395267ec19",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  fetch(
    //`https://covid-193.p.rapidapi.com/statistics?country=all`,
     `https://covid-193.p.rapidapi.com/history?country=${country}&day=2022-11-20`,

    options
  )
    .then((response) => response.json())
    .then((json) => {
      let data = json.response[0];
       document.querySelector(".name").innerHTML = data.country;  
      document.querySelector(".activecase").innerHTML = data.cases.active;
      document.querySelector(".newcase").innerHTML = data.cases.new;
      document.querySelector(".recoveries").innerHTML = data.cases.recovered;
      document.querySelector(".deaths").innerHTML = data.deaths.total;
      document.querySelector(".totalcases").innerHTML = data.cases.total;
      document.querySelector(".tests").innerHTML = data.tests.total;
      document.querySelector(".date").innerHTML = data.time;
      //data: [data.cases.total, data.tests.total, data.deaths.total],
      //countrydata.push([data[x].time, data[x].cases]);
      let countryDataTime = [],
      countryDataCases = []
      data = json.response;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      let hoursInADay=function(){
        let i = 1, hours=[]
        while(i<=24){
            hours.push(i + ":00");
            i++;
        }
        return hours;
      }
      data.map(function(a,b){
        if(a.day == b.day){
            return this.time
        }
      });
     // console.log(hoursInADay)

    //   today = yyyy + "-" + mm + "-" + dd;
    let hr = hoursInADay();
    for (let t in hr) {
        countryDataCases.push(0)
        
    }
      for(let x in data){
        let time = new Date(data[x].time).toLocaleTimeString().split(":")
        countryDataCases [parseInt(time)-1] = data[x].cases.total
            
           // if(today == data[x].day){
                //  countryDataCases.push(
                //    data[x].cases.total,
                //    data[x].deaths.total,
                //    data[x].tests.total
                //  );
                 
            //      countryDataTime.push(new Date(data[x].time).toLocaleTimeString());
             //}
         
        }
    //    countryDataCases = [3000,5000,11000,20000,30000]
      var myChart = new Chart("myChart", {
        type: "line",
        data: {
          labels: hoursInADay(),
          datasets: [
            {
              label: "data",
              borderWidth: 1,
              data: countryDataCases,

              borderColor: "#00BEC1",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
}


