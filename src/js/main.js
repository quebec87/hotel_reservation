// Main.js
const roomsURL = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms";
const roomURL = "https://challenge.thef2e.com/api/thef2e2019/stage6/room/";
const token = "3tkZlYd8R8XzCo2BEJSVrWk0lfCjQetT7gYpB9DPwW0ojctPdzTXvOjZJ2vg";
let roomsData = [];
let myRoomData = {};
let currentid;
let selectDate = [];

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
            //console.log('data ' + data + "  sucess   " + data.success);
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
    myRoomData = roomData;
    var photoHtml = '<div class="grid-item row-item70" style="background-image:url(' + roomData.imageUrl[0] + ');"><a href="' + roomData.imageUrl[0] + '" data-lightbox="roomImgs"></a></div>' +
        '<div class="row-item30 column">' +
        '<div class="grid-item column-item" style="background-image:url(' + roomData.imageUrl[1] + ');"><a href="' + roomData.imageUrl[1] + '" data-lightbox="roomImgs"></a></div>' +
        '<div class="grid-item column-item" style="background-image:url(' + roomData.imageUrl[2] + ');"><a href="' + roomData.imageUrl[2] + '" data-lightbox="roomImgs"></a></div>' +
        '</div>';
    $('.photo-grid .row').append(photoHtml);
    lightbox.option({
        //showImageNumberLabel: false
        wrapAround: false
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
        language: 'zh',
        minDate: new Date(),
        range: true,
        toggleSelected: false,
        navTitles: {
            days: 'yyyy / m',
            months: 'yyyy',
            years: 'yyyy1 - yyyy2'
        },
        onSelect: function(formattedDate, date, inst) {
            selectDate = [];
            selectDate = date;
        }
    });
    $('.reservation-btn').click(reservationClicked);
    $('.reset-date-icon').click(hideReservationPane);
    $('.cancel-btn').click(hideReservationPane);
    $('.submit-btn').click(submitClicked);
    $('.reservation-form').parsley().on('form:submit', function() {
            return false; // Don't submit form for this demo
        })
        .on('form:success', function() {
            let _data = {
                "name": $('#name').val(),
                "tel": $('#phone').val(),
                "date[]": getMultiDateArr(selectDate[0], selectDate[1])
            }
            console.log('send ' + _data);
            sendReservationData(currentid, $.param(_data, true));
        })
    $('.back-btn').click(backClicked);
}

function sendReservationData(_currentid, _data) {
    var fullRoomURL = roomURL + _currentid + "?" + _data;
    fetch(fullRoomURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        // body: JSON.stringify(_data)
    }).then((response) => {
        return response.json();
    }).then((jsonData) => {
        console.log(jsonData);
        let top = $('body').scrollTop() + ($(window).height() - $('.reservation-pane_response').height()) * 0.5;
        $('.reservation-pane_response').css('top', top + 'px');
        if (jsonData.success == true) {
            $('.reservation-pane_response h2').html("預約成功");
            $('.reservation-pane_response p').html('');
            $('.reservation-pane_response').addClass('sucess');
        } else {
            $('.reservation-pane_response p').html(jsonData.message);
            $('.reservation-pane_response h2').html("預約失敗");
            $('.reservation-pane_response').addClass('fail');
        }
        $('.reservation-pane_content').fadeOut();
        $('.reservation-pane_response').show();
    }).catch((err) => {
        console.log('ERROR:', err);
    })
}


function reservationClicked() {
    if (selectDate.length == 0) {
        alert('Please select date.');
        return;
    }
    if (selectDate.length == 1) {
        alert('Please select check out date.');
        return;
    }
    let top = $('body').scrollTop() + ($(window).height() - $('.reservation-pane_content').height()) * 0.5;
    $('.reservation-pane_content').css('top', top + 'px');
    setResDate();
    $('.reservation-pane').show();
}

function submitClicked() {
    $('.reservation-form').submit();
}

function setResDate() {
    let checkinDate = selectDate[0];
    let checkoutDate = selectDate[1];
    let checkin = getDateString(checkinDate);
    let checkout = getDateString(checkoutDate);
    $('#res-date').val(checkin + ' - ' + checkout);
    $('#res-date')[0].addEventListener("input", function() {
        this.value = checkin + ' - ' + checkout;
    }, false);
    let dayCountArr = getDayCount(checkinDate, checkoutDate);
    $('.calc-normal').html(dayCountArr[0]);
    $('.calc-weekend').html(dayCountArr[1]);
    $('.calc-price_number').html(getPrice(dayCountArr));
}

function getDateString(_dateobj) {
    return _dateobj.getFullYear() + '/' + (_dateobj.getMonth() + 1) + '/' + _dateobj.getDate();
}

function getDayCount(_checkin, _checkout) {
    let normal = 0;
    let weekend = 0;
    for (var i = _checkin.getTime(); i < _checkout.getTime(); i += 86400000) {
        var day = new Date(i).getDay();
        if (day > 0 && day < 5) {
            normal++;
        } else {
            weekend++;
        }
    }
    return [normal, weekend];
}

function getPrice(_dayCountArr) {
    return myRoomData.normalDayPrice * _dayCountArr[0] + myRoomData.holidayPrice * _dayCountArr[1];
}


function getMultiDateArr(_checkin, _checkout) {
    var multiArr = [];
    for (var i = _checkin.getTime(); i < _checkout.getTime(); i += 86400000) {
        var mydate = new Date(i);
        var dateString = mydate.getFullYear() + '-' + paddingLeft((mydate.getMonth() + 1).toString(), 2) + '-' + paddingLeft(mydate.getDate().toString(), 2);
        multiArr.push(dateString);
    }
    return multiArr;
}

function paddingLeft(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return paddingLeft("0" + str, lenght);
}

function hideReservationPane() {
    $('.reservation-pane').hide();
}

function backClicked() {
    if ($('.reservation-pane_response').hasClass('sucess')) {
        $('#name').val('');
        $('#phone').val('');
        $('.reservation-pane_response').removeClass('sucess').hide();
    } else {
        $('.reservation-pane_response').removeClass('fail').hide();
    }
    hideReservationPane();
    $('.reservation-pane_content').css({
        "opacity": 1,
        "display": "block"
    });
}


$(document).ready(function() {
    //console.log(window.location)
    if (window.location.pathname.indexOf('room.html') == -1) {
        getHomeData();
    } else {
        currentid = window.location.search.substr(1);
        getRoomData(currentid);
    }
})