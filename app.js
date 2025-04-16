// Глобальные переменные
let device = null;
let characteristic = null;
let serviceUuid = '0000ffe0-0000-1000-8000-00805f9b34fb'; // Замените на UUID вашего сервиса ESP32
let characteristicUuid = '0000ffe1-0000-1000-8000-00805f9b34fb'; // Замените на UUID характеристики ESP32

// Элементы DOM
const scanBtn = document.getElementById('scanBtn');
const devicesList = document.getElementById('devicesList');
const connectedDevice = document.getElementById('connectedDevice');
const deviceName = document.getElementById('deviceName');
const disconnectBtn = document.getElementById('disconnectBtn');
const servicesList = document.getElementById('servicesList');
const dataInput = document.getElementById('dataInput');
const sendDataBtn = document.getElementById('sendDataBtn');
const receivedData = document.getElementById('receivedData');
const status = document.getElementById('status');

// Обработчики событий
scanBtn.addEventListener('click', scanDevices);
disconnectBtn.addEventListener('click', disconnectDevice);
sendDataBtn.addEventListener('click', sendData);

// Функция сканирования устройств
async function scanDevices() {
    try {
        status.textContent = 'Сканирование устройств...';
        devicesList.innerHTML = '';
        
        device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: [serviceUuid]
        });
        
        device.addEventListener('gattserverdisconnected', onDisconnected);
        
        deviceName.textContent = device.name || 'Безымянное устройство';
        devicesList.innerHTML = `<div class="device-item">Найдено: ${device.name || 'Безымянное устройство'}</div>`;
        
        status.textContent = 'Подключение к устройству...';
        await connectToDevice();
        
    } catch (error) {
        status.textContent = `Ошибка: ${error}`;
        console.error('Ошибка:', error);
    }
}

// Функция подключения к устройству
async function connectToDevice() {
    try {
        const server = await device.gatt.connect();
        status.textContent = 'Получение сервисов...';
        
        const services = await server.getPrimaryServices();
        servicesList.innerHTML = '';
        
        for (const service of services) {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item';
            serviceItem.innerHTML = `<strong>Сервис:</strong> ${service.uuid}`;
            
            const characteristics = await service.getCharacteristics();
            for (const char of characteristics) {
                const charItem = document.createElement('div');
                charItem.className = 'characteristic-item';
                charItem.innerHTML = `<strong>Характеристика:</strong> ${char.uuid}`;
                serviceItem.appendChild(charItem);
                
                if (char.uuid === characteristicUuid) {
                    characteristic = char;
                    await characteristic.startNotifications();
                    characteristic.addEventListener('characteristicvaluechanged', handleNotifications);
                }
            }
            
            servicesList.appendChild(serviceItem);
        }
        
        connectedDevice.style.display = 'block';
        status.textContent = 'Успешно подключено!';
        
    } catch (error) {
        status.textContent = `Ошибка подключения: ${error}`;
        console.error('Ошибка подключения:', error);
    }
}

// Обработчик отключения
function onDisconnected(event) {
    const disconnectedDevice = event.target;
    status.textContent = `Устройство ${disconnectedDevice.name || ''} отключено`;
    connectedDevice.style.display = 'none';
    devicesList.innerHTML = '';
}

// Функция отключения от устройства
function disconnectDevice() {
    if (device && device.gatt.connected) {
        device.gatt.disconnect();
    }
}

// Обработчик уведомлений
function handleNotifications(event) {
    const value = event.target.value;
    const decoder = new TextDecoder();
    const message = decoder.decode(value);
    receivedData.textContent += `Получено: ${message}\n`;
}

// Функция отправки данных
async function sendData() {
    if (!characteristic || !device.gatt.connected) {
        status.textContent = 'Не подключено к устройству';
        return;
    }
    
    const data = dataInput.value;
    if (!data) {
        status.textContent = 'Введите данные для отправки';
        return;
    }
    
    try {
        const encoder = new TextEncoder();
        await characteristic.writeValue(encoder.encode(data));
        status.textContent = 'Данные отправлены';
        dataInput.value = '';
    } catch (error) {
        status.textContent = `Ошибка отправки: ${error}`;
        console.error('Ошибка отправки:', error);
    }
}

// Проверка поддержки Web Bluetooth
if (!navigator.bluetooth) {
    status.textContent = 'Ваш браузер не поддерживает Web Bluetooth API';
    scanBtn.disabled = true;
}