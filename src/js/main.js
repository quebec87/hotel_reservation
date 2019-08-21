// Main.js
const roomsURL = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms";
const token = "3tkZlYd8R8XzCo2BEJSVrWk0lfCjQetT7gYpB9DPwW0ojctPdzTXvOjZJ2vg";
let roomsData = [];

function getData() {
    fetch(roomsURL, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then(function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                console.log('status ' + response.status);
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        })
        .then(function(data) {
            console.log('data ' + data + "  sucess   " + data.success);
            // for (var i = 0; i < data.items.length; i++) {
            //     var slide = '<div class="swiper-slide"><img src="' + data.items[i].imageUrl + '" data-src="' + data.items[i].imageUrl + '" alt="' + data.items[i].name + '" /></div>';
            //     $('.swiper-wrapper').append(slide);
            // }
            parseData(data);
        }).catch(function(error) {
            console.log('request failed', error);
            return error.response.json();
        });
}

function parseData(data) {
    for (var i = 0; i < data.items.length; i++) {
        roomsData.push(data.items[i]);
    }
    buildHtml();
}

function buildHtml() {
    for (var i = 0; i < roomsData.length; i++) {
        //bg
        var slide = '<div class="swiper-slide"><img src="' + roomsData[i].imageUrl + '" data-src="' + roomsData[i].imageUrl + '" alt="' + roomsData[i].name + '" /></div>';
        $('.swiper-wrapper').append(slide);
        //section
        var room = '<li class="room-block">' +
            '<img class="center-cropped" src="' + roomsData[i].imageUrl + '" alt="' + roomsData[i].name + '" />' +
            '<div class="room-info">' +
            '<h4>' + roomsData[i].name + '</h4>' +
            '<div class="price-info">' +
            '<h3>NT.<span class="normal-price">' + roomsData[i].normalDayPrice + '</span><span class="small">&nbsp;Weekday</span></h3>' +
            '<p class="small">NT.<span class="holiday-price">' + roomsData[i].holidayPrice + '</span>&nbsp;Weekend</p>' +
            '</div></div></li>';
        $('.rooms-pane').append(room);
    }
    buildApp();
}

function buildApp() {
    buildBg();
    buildRooms();
}

function buildBg() {
    var swiper = new Swiper('.swiper-container', {
        preloadImages: true,
        speed: 2000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoHeight: true,
        autoplay: {
            delay: 5000
        },
        loop: true,
    });
}

function buildRooms() {

}



getData();