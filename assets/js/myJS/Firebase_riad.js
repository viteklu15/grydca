const username = localStorage.getItem("user_name");
const password = localStorage.getItem("user_password");
var log_ok = false;


//console.log(username);
//console.log(password);

var login = "";
var URL_BAZA = "https://testesp-918b4-default-rtdb.europe-west1.firebasedatabase.app"
var jsoncon = ".json";

function logokfuncc(pas) // проверка пароля 
{
    if (pas == password) {
        console.log("логин ок ");
        log_ok = true;
    } else {
        console.log("неверный пароль");
        alert('Неверный пароль или Email');
        window.location.href = 'login.html'; //перебросить на другую страницу 
    }
}


function riad_firebasePas(key) // функция для чтения с базы с паролем  
{
    var url = URL_BAZA + login + key + jsoncon;
    //console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            logokfuncc(data);
        });

}

function riad_firebase(key) // функция для чтения с базы  riad 
{
    var url = URL_BAZA + login + key + jsoncon;
    //console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            update_temp(data);
        });

}

function riad_firebase_set(key) // функция для чтения с базы  настроик set
{
    var url = URL_BAZA + login + key + jsoncon;
    //console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            update_set(data);
        });
}




if ((username != null && password != null) && (username != "" && password != "")) // проверяем есть ли в браузере логин и пароль 
{
    console.log("login и пароль есть в браузере проверяем с базой");
    login = username.replace(/\.[^.]+$/, ""); // убираем все что после точки 
    login = "/" + login;
    riad_firebasePas("/pas"); // запрос пароля в базе 

} else {
    console.log("нет логина ");
    window.location.href = 'login.html'; //перебросить на другую страницу 
}


function wrait_firebase(key, data) { //функция записи 

    var url = URL_BAZA + login + key + jsoncon;

    fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // do something with the data
        })
        .catch(error => {
            // handle error
        });
}

// riad_firebase("/pas"); 

//wrait_firebase("/riad",{
//     "t1vnutr": -5.23,
//    "t2poh": 10,
//   "time_vnutr": 45689,
//  "vlag": 45
//});