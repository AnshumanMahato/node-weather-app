//jshint esversion:6
const weatherForm = document.querySelector('form');
const query = document.querySelector('input[type="text"]');
const messageBox = document.querySelector('.message');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const address = query.value;

    fetch('/weather?address=' + encodeURI(address)).then((res) => {
    res.json().then((data) => {
        if(data.error) {
            messageBox.innerHTML = '<strong>Error:</strong>' + data.error;
        }
        else {
            messageBox.innerHTML = '<h3>Forecast</h3>';
            messageBox.innerHTML += '<strong>Address:</strong>' + data.address;
            messageBox.innerHTML += '<br><strong>Location:</strong>' + data.location;
            messageBox.innerHTML += '<br><strong>Forecast:</strong>' + data.forecast;
        }
    });
});
});
