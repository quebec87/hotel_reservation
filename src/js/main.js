// Main.js
const roomsURL = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms";
const roomURL = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/";
const token = "3tkZlYd8R8XzCo2BEJSVrWk0lfCjQetT7gYpB9DPwW0ojctPdzTXvOjZJ2vg";
let roomsData = [];

function getHomeData() {
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
        var room = '<li class="room-block" data-id="' + roomsData[i].id + '">' +
            '<a href="room.html?' + roomsData[i].id + '">' +
            '<img class="center-cropped" src="' + roomsData[i].imageUrl + '" alt="' + roomsData[i].name + '" />' +
            '<div class="room-info">' +
            '<h4>' + roomsData[i].name + '</h4>' +
            '<div class="price-info">' +
            '<h3>NT.<span class="normal-price">' + roomsData[i].normalDayPrice + '</span><span class="small">&nbsp;Weekday</span></h3>' +
            '<p class="small">NT.<span class="holiday-price">' + roomsData[i].holidayPrice + '</span>&nbsp;Weekend</p>' +
            '</div></div></a></li>';
        $('.rooms-pane').append(room);
    }
    buildApp();
}

function buildApp() {
    buildBg();
    // buildRooms();
}

function buildBg() {
    $('.logo').addClass('loaded');
    $('main').addClass('show');
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

function getRoomData(_currentid) {
    var fullRoomURL = roomURL + _currentid;
    console.log('full. ' + fullRoomURL);
    fetch(fullRoomURL, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
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
            buildSelectedRoom(data);
        }).catch(function(error) {
            console.log('request failed', error);
            return error.response;
        });
}

function buildRooms() {
    $('.room-block').on('click', function() {
        let currentid = $(this).attr('data-id');
        getRoomData(currentid);
    })
}


function buildSelectedRoom(data) {
    var roomData = data.room[0];
    var photoHtml = '<div class="grid-item row-item70" style="background-image:url(' + roomData.imageUrl[0] + ');"><a href="' + roomData.imageUrl[0] + '" data-lightbox="roomImgs"></a></div>' +
        '<div class="row-item30 column">' +
        '<div class="grid-item column-item" style="background-image:url(' + roomData.imageUrl[1] + ');"><a href="' + roomData.imageUrl[1] + '" data-lightbox="roomImgs"></a></div>' +
        '<div class="grid-item column-item" style="background-image:url(' + roomData.imageUrl[2] + ');"><a href="' + roomData.imageUrl[2] + '" data-lightbox="roomImgs"></a></div>' +
        '</div>';
    $('.photo-grid .row').append(photoHtml);
    lightbox.option({
        showImageNumberLabel: false
    });
    $('.room-name').html(roomData.name);
    $('.guest-limit').html(roomData.descriptionShort.GuestMin + ' ~ ' + roomData.descriptionShort.GuestMax);
    $('.bed-type').html(roomData.descriptionShort.Bed.toString());
    $('.bath').html(roomData.descriptionShort["Private-Bath"]);
    $('.room-size').html(roomData.descriptionShort.Footage);
    $('.description').html(roomData.description);
    $('.check-in').html(roomData.checkInAndOut.checkInEarly + " - " + roomData.checkInAndOut.checkInLate);
    $('.check-out').html(roomData.checkInAndOut.checkOut);
    for (var i = 0; i < $('.amenities li').length; i++) {
        var dataKey = $('.amenities li').eq(i).attr('id');
        var value = roomData.amenities[dataKey];
        if (value == true) {
            $('.amenities li').eq(i).addClass('yes');
        }
    }
    $('.normal-price').html(roomData.normalDayPrice);
    $('.holiday-price').html(roomData.holidayPrice);
    renderRoomPage();
}

function renderRoomPage() {
    $('main').addClass('show');
    $("#datepicker").datepicker({
        inline: true,
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        minDate: 0
    });
}


$(document).ready(function() {
    console.log(window.location)
    if (window.location.pathname == "/") {
        getHomeData();
    }
    if (window.location.pathname == '/room.html') {
        let currentid = window.location.search.substr(1);
        getRoomData(currentid);
    }
})