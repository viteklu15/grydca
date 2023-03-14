const dropdownMenu = document.querySelector('.dropdown-menu');

riad_firebase_graf("/graf/");
var today = new Date();
let skolkodey = 0;

function data_chart(data) {

    const str = JSON.stringify(data);
    const parsedData = JSON.parse(str);

    const dataArray = [];

    for (let date in parsedData) {
        for (let time in parsedData[date]) {
            const t_vhutri = parsedData[date][time].t_vhutri;
            const t_pohvu = parsedData[date][time].t_pohvu;
            const h_pohva = parsedData[date][time].h_pohva;
            dataArray.push({ date, time, t_vhutri, t_pohvu, h_pohva });
        }
    }

    let dta_array = []; // создаем пустой массив
    let t_vhutri_array = []; // создаем пустой массив
    let t_pohvu_array = []; // создаем пустой массив
    let h_pohva_array = []; // создаем пустой массив


    today.setDate(today.getDate() - skolkodey);


    for (let index = skolkodey; index < dataArray.length; index++) {

        if (dataArray[index].date == today.toLocaleDateString().replace(/\./g, "-")) {
            skolkodey = index;
            break
        }
    }


    for (let index = skolkodey; index < dataArray.length; index++) {
        dta_array.push(dataArray[index].date + " " + dataArray[index].time);
        t_vhutri_array.push(dataArray[index].t_vhutri);
        t_pohvu_array.push(dataArray[index].t_pohvu);
        h_pohva_array.push(dataArray[index].h_pohva);
    }
    if (!glavn_setup) //обновление графига 
    {
        var chartElement = document.querySelector('[data-bss-chart]');
        var chart = chartElement.chart;

        chart.data.labels = dta_array //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']; //dataArray.date; //
        chart.data.datasets[0].data = t_vhutri_array; //[10, 20, 30, 40, 45, 60, 70, 80, 90, 90]; // температура в нутриdataArray.t_vhutri;
        chart.data.datasets[1].data = t_pohvu_array; //[10, 45, 200, 40, 45, 60, 70, 80, 90, 90]; // температура почвы 
        chart.data.datasets[2].data = h_pohva_array; //[10, 87, 30, 87, 45, 60, 70, 80, 90, 90]; // влажность 
        chart.update();
    }




    //console.log(dataArray[0].date);

    //console.log(dataArray.length);
}

dropdownMenu.addEventListener('click', function(e) { // сробатывает после выбора настройки графика 
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const selectedItem = e.target.id;


        today = new Date();

        if (selectedItem == "chart_segodhy") {
            skolkodey = 0;
        } else if (selectedItem == "chart_3dey") {
            skolkodey = 2;
        } else if (selectedItem == "chart_10dey") {
            skolkodey = 9;
        }

        riad_firebase_graf("/graf/");
        // for (let index = 0; index < 10; index++) {

        // for (let index = 0; index < 24; index++) {
        // const adr = "/graf/" + today.toLocaleDateString().replace(/\./g, "-") + "/" + index + ":00";
        // console.log(adr); // prints the previous date
        // wrait_firebase(adr, {
        // "t_vhutri": index + 4,
        // "t_pohvu": index + 3,
        // "h_pohva": index + 5
        // });
        // }

        // today.setDate(today.getDate() - 1);
        // }

        //get the date one day before the current date




        // add your logic here
    }
});