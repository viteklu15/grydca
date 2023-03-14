let glavn_setup = false; // если 0 то главная если 1 то настройки 
riad_firebase("/riad");
setInterval(function() {

    riad_firebase("/riad");

    // fill datagraf array with dates from March 1, 2023 to March 10, 2023
    let arr = [];
    let arrd = [];


    //console.log(arr);

    // if (!glavn_setup) //обновление графига 
    // {
    //     var chartElement = document.querySelector('[data-bss-chart]');
    //     var chart = chartElement.chart;
    //     chart.data.labels = arr; //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    //     chart.data.datasets[0].data = arrd; //[10, 20, 30, 40, 45, 60, 70, 80, 90, 90]; // температура в нутри
    //     chart.data.datasets[1].data = [10, 45, 200, 40, 45, 60, 70, 80, 90, 90]; // температура почвы 
    //     chart.data.datasets[2].data = [10, 87, 30, 87, 45, 60, 70, 80, 90, 90]; // влажность 
    //     chart.update();
    // }



}, 5000);

//поиск элементов на странице 
let tem_vhutri = document.getElementById("t_vhutri");
let t_pohvu = document.getElementById("t_pohvu");
let h_pohva = document.getElementById("h_pohva");
let time_vnutr = document.getElementById("time_vnutr");
let set_t_on = document.getElementById("set_t_on");
let set_t_prit_fan = document.getElementById("set_t_prit_fan");
let set_vlaj_pritoh_fan = document.getElementById("set_vlaj_pritoh_fan");
//освещение
let set_osveh_on = document.getElementById("set_osveh_on");
let set_osveh_off = document.getElementById("set_osveh_off");

let set_poliv_interval_has = document.getElementById("set_poliv_interval_has");
let set_time_poliv_min = document.getElementById("set_time_poliv_min");
const powerCheckbox = document.getElementById("powerON"); // получаем ссылку на элемент
document.getElementById("powerON").addEventListener("change", switch_POWER) // сканируем на странице переключатель питания  
    ///////////////////////////////////////////////////////////////////////////////////////////////
riad_firebase_set("/set"); // чтение из базы какие настройки сейчас при загрузке страницы 

function update_temp(data) //обновляем значения температуры  с базы 
{
    tem_vhutri.textContent = data.t1vnutr + "°C";
    t_pohvu.textContent = data.t2poh + "°C";
    h_pohva.textContent = data.vlag + "%";

    let remainingSeconds = data.time_vnutr % 3600; // как получить оставшиеся секунды

    const hours = Math.trunc(data.time_vnutr / 3600);
    const minutes = Math.trunc(remainingSeconds / 60);
    const seconds = data.time_vnutr % 60;
    time_vnutr.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

}

function perevod_hasov(timeosv) { // для конвертации времени что бы отобразить 
    const date_on = new Date(timeosv * 1000);
    const hours = date_on.getUTCHours().toString().padStart(2, '0');;
    const minutes = date_on.getUTCMinutes().toString().padStart(2, '0');;
    //console.log(`${hours}:${minutes}`);
    return hours + ":" + minutes;
}

function update_set(data) { //отображаем настройки какие были при загрузке 
    set_t_on.value = data.set_t_on;
    set_t_prit_fan.value = data.set_t_prit_fan;
    set_vlaj_pritoh_fan.value = data.set_vlaj_pritoh_fan;
    set_osveh_on.value = perevod_hasov(data.osv.set_osveh_on);
    set_osveh_off.value = perevod_hasov(data.osv.set_osveh_off);
    set_poliv_interval_has.value = data.poliv.set_poliv_interval_has;
    set_time_poliv_min.value = data.poliv.set_time_poliv_min;
    powerCheckbox.checked = data.POWER.power; // инвертируем текущее состояние чекбокса Power(data.power);
    toggleCheckboxes(data.poliv.rejum);

}


function switch_POWER() { //calbec переключателя питания
    if (this.checked) {
        wrait_firebase("/set/POWER/power", true);
    } else {
        wrait_firebase("/set/POWER/power", false);
    }
}


document.getElementById('glavn').addEventListener('click', function() { // включаем главную страницу 
    document.getElementById('setup_menu').style.display = 'none';
    document.getElementById('char_index').style.display = 'flex';
    glavn_setup = false;
});

document.getElementById('setup').addEventListener('click', function() { // включаем страницу с настройками
    document.getElementById('setup_menu').style.display = 'flex';
    document.getElementById('char_index').style.display = 'none';
    glavn_setup = true;
});

function modifyPolivClous(val) { // для деоктивации кнопок ручного режима 
    const polivClous = document.querySelector('.poliv_clous');
    if (val) {
        polivClous.style.pointerEvents = 'none';
        polivClous.style.opacity = 0.3;
        console.log("Авто"); // код функции
    } else {
        polivClous.style.pointerEvents = 'all';
        polivClous.style.opacity = 1;
        console.log("Ручной"); // код функции
    }

}

function toggleCheckboxes(svith) { // функция для переключения радио кнопок 
    const checkbox1 = document.querySelector('#formCheck-1');
    const checkbox2 = document.querySelector('#formCheck-2');
    if (svith) {
        checkbox1.checked = true;
    } else {
        checkbox2.checked = true;
    }
    modifyPolivClous(svith);
    //console.log("радио"); // код функции
    //checkbox1.checked = !checkbox1.checked; //переключить на авто 

}
toggleCheckboxes();



const radio = document.getElementById('formCheck-2'); //отслеживаем нажатие кнопок ручной полив
radio.addEventListener('change', function() {
    wrait_firebase("/set/poliv/rejum", false);
    modifyPolivClous(false);
});

const radio1 = document.getElementById('formCheck-1'); //отслеживаем нажатие кнопок авто полив
radio1.addEventListener('change', function() {
    wrait_firebase("/set/poliv/rejum", true);
    modifyPolivClous(true);
});

function unixTrans(time_os) { //конвертируем часы из поля в unix для записи в базу  
    const [hours, minutes] = time_os.split(':');
    const date = new Date(Date.UTC(1970, 0, 1, hours, minutes, 0));
    const unixTime = date.getTime() / 1000;
    return unixTime;
}

var saveButton = document.getElementById('save_button'); // ищем на странице кнопку сохранить 
saveButton.addEventListener('click', saveButtonCallback); // запускаем вункцию калбек 

function saveButtonCallback() {
    console.log("Сохранить");
    wrait_firebase("/set/set_t_on", set_t_on.value);
    wrait_firebase("/set/set_t_prit_fan", set_t_prit_fan.value);
    wrait_firebase("/set/set_vlaj_pritoh_fan", set_vlaj_pritoh_fan.value);
    wrait_firebase("/set/set_vlaj_pritoh_fan", set_vlaj_pritoh_fan.value);
    wrait_firebase("/set/osv/set_osveh_on", unixTrans(set_osveh_on.value));
    wrait_firebase("/set/osv/set_osveh_off", unixTrans(set_osveh_off.value));
    // полив
    wrait_firebase("/set/poliv/set_poliv_interval_has", set_poliv_interval_has.value);
    wrait_firebase("/set/poliv/set_time_poliv_min", set_time_poliv_min.value);
}

var saveButton = document.getElementById('poliv_botton'); // ищем на странице кнопку полить принудительно 
saveButton.addEventListener('click', poliv_bottonCallback); // запускаем вункцию калбек 
function poliv_bottonCallback() {
    console.log("полить");
}

//document.getElementById('set_osveh_on').onchange = function() {
//    var value = this.value;
//    console.log(value); // Do something with the value
//}