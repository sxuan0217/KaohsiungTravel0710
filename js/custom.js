var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
var data = '';
var attractions;
var attractionLen;
var btn = document.querySelector('.popular');
var list = document.querySelector('.list');
var AreaSearch = document.querySelector('.select');
var areaH3 = document.querySelector('.areaName');
xhr.onload = function () {
    data = (JSON.parse(xhr.responseText));
    attractions = data.result.records;
    attractionLen = data.result.records.length;
    var allArea = [];
    var selectArea;
    //將allarea的空陣列放入所有地區並排除重複後再放入selectArea中
    function upadateMenu() {
        for (var i = 0; i < attractionLen; i++) {
            allArea.push(attractions[i].Zone);
        }
        selectArea = allArea.filter(function (el, i, arr) {
            return arr.indexOf(el) === i;
        });

    }
    upadateMenu(); //開啟頁面時，更新一次
    //將selectArea組成字串放入AreaSearch物件中!
    var selectStr = '';
    for (var i = 0; i < selectArea.length; i++) {
        selectStr += '<option>' + selectArea[i] + '</option>';
        AreaSearch.innerHTML = '<option>--請選擇行政區--</option>' + selectStr;
    }
    AreaSearch.addEventListener('change', printData); //監聽AreaSearch
    btn.addEventListener('click', printData); //監聽btn
    //列出資料
    function printData(e) {
        var searchValue = e.target.value; //獲取點擊的物件的value
        var searchName = e.target.nodeName; //獲取點擊的物件的節點名稱

        if (searchName !== 'INPUT' && searchName !== 'SELECT') {
            return;
        }

        var str = "";
        for (var i = 0; attractionLen > i; i++) {
            if (searchValue == attractions[i].Zone) {
                areaH3.textContent = attractions[i].Zone;
                str += `<li class='countrybox '>\
         <div class="picture"style="background-image: url(` + attractions[i].Picture1 + `)";></div>\
         <div class="countryInfo">\
         <p><img class="iconSet" src="./img/icons_clock.png" alt="">` + attractions[i].Opentime + `</p>\
         <p><img class="iconSet" src="./img/icons_pin.png" alt="">` + attractions[i].Add + `</p>\
         <p><img class="iconSet" src="./img/icons_phone.png" alt="">` + attractions[i].Tel + `</p>\
         <p class="right"><img class="iconSet" src="./img/icons_tag.png" alt="">` + attractions[i].Ticketinfo + `</p>\
         </div>\
         </li>`
            }




        }
        list.innerHTML = str;
    }


}