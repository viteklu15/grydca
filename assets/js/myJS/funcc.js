setInterval(function() {
	var chartElement = document.querySelector('[data-bss-chart]');
	 var chart = chartElement.chart;
	 chart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
	chart.data.datasets[0].data = [10, 20, 30, 40, 45, 60, 70, 80, 90];
    chart.data.datasets[1].data = [10, 45, 30, 40, 45, 60, 70, 80, 90];
	  chart.update();
	
    let tem_vhutri = document.getElementById("t_vhutri");

// Update the text content of the element
tem_vhutri.textContent = "55,00°C";
    
    
	}, 5000);

function switch_POWER () { //calbec переключателя питания
  if(this.checked) {
    console.log("ок");
  } else {
    console.log("false");
  }
}
document.getElementById("powerON").addEventListener("change",switch_POWER) // сканируем на странице переключатель питания  

function togglePower() { // функция для изминения состояния переключателя питания питания 
  const powerCheckbox = document.getElementById("powerON"); // получаем ссылку на элемент
  powerCheckbox.checked = !powerCheckbox.checked; // инвертируем текущее состояние чекбокса
}

document.getElementById('glavn').addEventListener('click', function(){ // включаем главную страницу 
    document.getElementById('setup_menu').style.display = 'none';
    document.getElementById('char_index').style.display = 'flex';
});

document.getElementById('setup').addEventListener('click', function(){ // включаем страницу с настройками
    document.getElementById('setup_menu').style.display = 'flex';
    document.getElementById('char_index').style.display = 'none';
});

function modifyPolivClous(val) { // для деоктивации кнопок ручного режима 
    const polivClous = document.querySelector('.poliv_clous');
   if(val)
   {
     polivClous.style.pointerEvents = 'none';
     polivClous.style.opacity = 0.3;  
       console.log("Авто");  // код функции
   }
    else
    {
        polivClous.style.pointerEvents = 'all';
        polivClous.style.opacity = 1;  
        console.log("Ручной");  // код функции
    }
   
}

function toggleCheckboxes() { // функция для переключения радио кнопок 
  const checkbox1 = document.querySelector('#formCheck-1');
  const checkbox2 = document.querySelector('#formCheck-2');
console.log("радио");  // код функции
  //checkbox1.checked = !checkbox1.checked; //переключить на авто 
  checkbox2.checked = true;
}
toggleCheckboxes();


  
const radio = document.getElementById('formCheck-2');//отслеживаем нажатие кнопок ручной полив
radio.addEventListener('change', function() {
 // console.log("Ручной");  // код функции
     modifyPolivClous(false);
});

const radio1 = document.getElementById('formCheck-1');//отслеживаем нажатие кнопок авто полив
radio1.addEventListener('change', function() {
  //console.log("Авто");  // код функции
    modifyPolivClous(true);
});

var saveButton = document.getElementById('save_button');// ищем на странице кнопку сохранить 
saveButton.addEventListener('click', saveButtonCallback); // запускаем вункцию калбек 
function saveButtonCallback() { 
 console.log("Сохранить");
}

var saveButton = document.getElementById('poliv_botton');// ищем на странице кнопку полить принудительно 
saveButton.addEventListener('click', poliv_bottonCallback); // запускаем вункцию калбек 
function poliv_bottonCallback() { 
 console.log("полить");
}


 
