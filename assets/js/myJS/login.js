function button_logCallback() { 
 const email = document.getElementById('exampleInputEmail').value;
 const password = document.getElementById('exampleInputPassword').value;     
    localStorage.setItem("user_name", email); // запоминаем в браузере логин 
    localStorage.setItem("user_password", password);// запоминаем в браузере пароль 
 console.log(`Email: ${email}, Password: ${password}`);
}

var button_log = document.getElementById('button_log');// ищем на странице кнопку логин 
button_log.addEventListener('click', button_logCallback); // запускаем вункцию калбек


