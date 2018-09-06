var customTemplates;
var searchOutRussia;
var searchRoaming;
var jsondata = {};
var jsondataOutRussia;
let init_rate_russia;
let init_rate_outrussia;

function StartInit() {


    Promise.all( rate_russia2.map(httpGet) )
        .then(results => {
            jsondata.regions = results[0];
            jsondata.abca = results[1];
            jsondata.abcb = results[2];
            jsondata.modem = results[3];
            jsondata.plaphone = results[4];
            jsondata.plaphone_old = results[5];
            jsondata.tab_unlim = results[6];
            jsondata.tabt = results[7];
            jsondata.ph_unlim = results[8];
            importRateRussia.call(jsondata);
        });
    // init_rate_russia = new Initialization(rate_russia);
    // getJSON(rate_russia, importRateRussia);

    init_rate_outrussia = new Initialization(rate_outrussia); //Инициализация условий МНР и Мнзвонков
    getJSON(rate_outrussia, importRateOutRussia); //Загрузка JSON условий, передача в обработчик





}



function httpGet(url) {

    return new Promise(function(resolve, reject) {
        var reqw = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        reqw.open( 'GET', url , true );
        reqw.responseType = 'json';
        reqw.onreadystatechange = function () {

            if ( reqw.readyState === 4 && reqw.status === 200)   { resolve(reqw.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                //reject(error);
            }
        };
        reqw.onerror = function() {  reject(new Error("Network Error")); };
        reqw.send();

    });

}




class Initialization {
    constructor(link) {
        this.link = link;
        this.jsondata = {};
    }

    // геттер
    get data() {
        return this.jsondata;
    }
    get getLink() {

        return this.link;
    }

    set data(newValue) {
        var copy = Object.assign({}, newValue);
        //'https://raw.githubusercontent.com/mobilkot/yt/master/rate_russia.json'
        //[this.firstName, this.lastName] = newValue.split(' ');
        //this.link = newValue;
        this.jsondata = copy;

    }

    setData(value)
    {
        this.jsondata = value;
    }



}

//Получение JSON
function getJSON(link, callback, params){

    var reqw = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    reqw.open( 'GET', link , true );
    reqw.responseType = 'json';
    reqw.onreadystatechange = function () {

        if ( reqw.readyState === 4 && reqw.status === 200)   callback.call(reqw.response, params);
    };
    reqw.send( null );
}



//Ввод данных в РФ.
function importRateRussia(jsondatas) {


    customTemplates.enable();
    let choices1212= [];
    let regions = jsondata.regions;
    customTemplates.clearStore();
    regions.forEach(function (item, i, arr) {
        {
            choices1212.push({
                value: regions[i].id.toString(),
                label: regions[i].name + " (" + regions[i].city + ") ",
                disabled: false,
                customProperties: {description: regions[i].keywords}
            });
        }
    });
    customTemplates.setChoices(choices1212, 'value', 'label', 0);
    checkParams(choiseRegionbylink);


}



function importRateOutRussia(jsondatas) {


    jsondataOutRussia= this;

    searchOutRussia.enable();
    searchOutRussia.clearStore();
    let listOutRussia= [];
    let OutRussia = jsondataOutRussia.intervoice;
    OutRussia.forEach(function (e) {
        {
            listOutRussia.push({
                value: e.id.toString(),
                label: e.name + " (" + e.zone + ") ",
                disabled: false,
                customProperties: {description: e.name + " (" + e.zone + ") "}
            });
        }
    });
    searchOutRussia.setChoices(listOutRussia, 'value', 'label', 0);
    searchOutRussia.placeholderValue= 'Выберите страну';

    searchOutRussia.searchPlaceholderValue= 'Наверное, это поле поиска..';

    searchRoaming.enable();
    searchRoaming.clearStore();
    let listRoaming= [];
    let Roaming = jsondataOutRussia.countries;
    Roaming.forEach(function (e) {
        {
            listRoaming.push({
                value: e.id.toString(),
                label: e.name,
                disabled: false,
                customProperties: {description: e.name}
            });
        }
    });
    searchRoaming.setChoices(listRoaming, 'value', 'label', 0);

}


$( window  ).ready(function() {
    // checkParams(choiseRegionbylink);
    console.log("loaded");
});


function returnInfoBlock(type, text, title = "") {

    var htmlcode=``;
    var ttitle = ``;
    if (title !== "") {ttitle = `<p class="title">${title}</p>`}
    //<p className="title">Блаблабла</p>
    switch (type) {
        case "warning":
            htmlcode=`<div class="confluence-information-macro confluence-information-macro-warning conf-macro output-block" data-hasbody="true" data-macro-name="warning">${ttitle}<span class="aui-icon aui-icon-small aui-iconfont-error confluence-information-macro-icon"> </span><div class="confluence-information-macro-body"><p>${text}</p></div></div>`;
            break;

        case "tip":
            htmlcode=`<div class="confluence-information-macro confluence-information-macro-tip conf-macro output-block" data-hasbody="true" data-macro-name="tip">${ttitle}<span class="aui-icon aui-icon-small aui-iconfont-approve confluence-information-macro-icon"> </span><div class="confluence-information-macro-body"><p>${text}</p></div></div>`;
            break;

        case "note":
            htmlcode=`<div class="confluence-information-macro confluence-information-macro-note conf-macro output-block" data-hasbody="true" data-macro-name="note">${ttitle}<span class="aui-icon aui-icon-small aui-iconfont-warning confluence-information-macro-icon"> </span><div class="confluence-information-macro-body"><p>${text}</p></div></div>`;
            break;

        case "info":
            htmlcode=`<div class="confluence-information-macro confluence-information-macro-information conf-macro output-block" data-hasbody="true" data-macro-name="info">${ttitle}<span class="aui-icon aui-icon-small aui-iconfont-info confluence-information-macro-icon"> </span><div class="confluence-information-macro-body"><p>${text}</p></div></div>`;
            break;
        case "clear":
            htmlcode=``;
            break;

    }
    var alert = document.getElementById('yota_newcombine_notebnote');
    alert.innerHTML = htmlcode;
}



 function createLegoBlock(type,callback) {
     document.getElementById('yota_newcombine_legoyota_'+type).innerHTML=
         ` <div class="yota_newcombine_d-table">

        <div class="yota_newcombine_d-tr">
            <div class="yota_newcombine_d-td yota_newcombine_no-p">
                <div class="yota_newcombine_d-table">
                    <div class="yota_newcombine_d-tr">
                        <div class="yota_newcombine_d-td">
                            <textarea readonly class="yota_newcombine_b_summary_tarif_text" id="yota_newcombine_b_tafir_summary_input_${type}" placeholder="Пока ничего не выбрано :( " onmousedown="mDown(this)" onmouseup="mUp(this)" onmouseover="mOver(this)" onmouseout="mOut(this)"></textarea>
                        </div>
                    </div>
                    <div class="yota_newcombine_d-tr">
                        <div class="yota_newcombine_d-td">
                            <textarea readonly class="yota_newcombine_b_summary_tarif_text" id="yota_newcombine_b_tafir_summary_input1_${type}" placeholder="  " onmousedown="mDown(this)" onmouseup="mUp(this)" onmouseover="mOver(this)" onmouseout="mOut(this)"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="yota_newcombine_d-td yota_newcombine_no-p" >
                <div  id="tapps_${type}" class="divTableCell"  >
                    <div class="divTable">
                        <div class="divTableBody">
                            <div class="divTableRow">
                                <input id="app-all_${type}" class="input_app-all" type="checkbox" name="select_apps_all_${type}" value="0" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-all_${type}" class="layout-buttons_gb">Все опции и БМП		</span></label>
                                <div class="divTableCell">
                                    <input data-name="vk" id="app-vk_${type}" class="input_app-vk" type="checkbox" name="select_apps_${type}" value="1" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-vk_${type}" class="layout-buttons"><span> <div data-name="vk" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"><div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg"><circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle><circle class="activated" fill="#5A7DA3" cx="20.5" cy="20.5" r="60"></circle> <path d="M28.8 20.4c.7-.9 1.4-1.9 2-2.8.3-.4.4-.9.7-1.4 0 0 0-.1.1-.1v-.3c-.2-.4-.5-.4-.8-.4h-3.9c-.6 0-.8.1-1 .7-.3.6-.5 1.2-.8 1.7-.4.9-.9 1.7-1.5 2.5-.3.4-.6.7-.9 1-.2.2-.5.2-.7-.1-.2-.2-.3-.5-.3-.8V19v-2.9c0-.2 0-.4-.1-.6-.1-.3-.4-.5-.8-.5H17c-.5 0-.8.2-1.1.6-.1.2-.1.3.1.3.4.1.8.3 1 .6.1.2.2.4.2.6.2 1.1.2 2.3 0 3.5 0 .2-.1.5-.2.7-.2.3-.4.4-.8.2-.2-.1-.4-.3-.5-.5-.4-.6-.9-1.2-1.3-1.9-.3-.5-.6-1.1-.9-1.7-.2-.4-.3-.7-.5-1.1-.2-.5-.6-.8-1.1-.8H8.5c-.2 0-.4.1-.5.3v.3c.3.7.6 1.4 1 2.1.6 1.1 1.2 2.3 1.8 3.4.5.9 1.1 1.7 1.7 2.6.7 1 1.5 1.8 2.4 2.5 1 .7 2.1 1.2 3.3 1.4.9.2 1.7.2 2.6.1.5 0 .7-.3.8-.8.1-.5.1-.9.2-1.4.1-.3.2-.6.4-.8.2-.2.5-.2.8 0 .3.2.6.5.9.8.4.5.9.9 1.3 1.4.5.5 1.2.8 2 .8h3.3c.6 0 .8-.2.9-.7v-.2c-.2-.8-.8-1.4-1.3-2L28 23.2c-.1-.1-.2-.2-.3-.4-.2-.4-.2-.8.1-1.1.4-.5.7-.9 1-1.3z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social_${type}" data-for="vk_${type}"  tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                </div>

                                <div class="divTableCell">
                                    <input data-name="ig" id="app-ig_${type}" class="input_app-ig" type="checkbox" name="select_apps_${type}" value="4" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-ig_${type}" class="layout-buttons"><span> <div data-name="vk" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"><div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg"><circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle><circle class="activated" fill="#D22C78" cx="20.5" cy="20.5" r="60"></circle> <path d="M21.9 7h-3.2C12.2 7 7 12.3 7 18.7v3.1c0 6.5 5.3 11.7 11.7 11.7h3.2c6.5 0 11.7-5.3 11.7-11.7v-3.1C33.6 12.2 28.4 7 21.9 7zm9.6 14.7c0 5.3-4.3 9.6-9.6 9.6h-3.2c-5.3 0-9.6-4.3-9.6-9.6v-3.1c0-5.3 4.3-9.6 9.6-9.6h3.2c2.4 0 4.6.9 6.2 2.3-.2 0-.3-.1-.5-.1-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8v-.3c1.3 1.6 2.1 3.7 2.1 5.9v3.1zm-11.1-8.3c-3.8 0-6.9 3.1-6.9 6.9 0 3.8 3.1 6.9 6.9 6.9 3.8 0 6.9-3.1 6.9-6.9 0-3.8-3.1-6.9-6.9-6.9zm0 11.7c-2.7 0-4.8-2.2-4.8-4.8 0-2.7 2.2-4.8 4.8-4.8 2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8z" fill="#FFF"></path></svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social_${type}" data-for="ig_${type}"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>

                                </div>
                                <div class="divTableCell">
                                    <input data-name="fb" id="app-fb_${type}" class="input_app-fb" type="checkbox" name="select_apps_${type}" value="3" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-fb_${type}" class="layout-buttons"><span> <div data-name="fb" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">   <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#6781CA" cx="20.5" cy="20.5" r="60"></circle> <path d="M24.4 13.8h2.3v-3.5H23c-4.6 0-4.4 5.3-4.4 5.3v2.6h-3.1v3.5h3.1V31.5h4v-9.8h3.2l.5-3.5h-3.7v-2.6c.1-1.9 1.8-1.8 1.8-1.8z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social_${type}" data-for="fb_${type}"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                </div>
                                <div class="divTableCell">
                                    <input data-name="ok" id="app-ok_${type}" class="input_app-ok" type="checkbox" name="select_apps_${type}" value="2" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-ok_${type}" class="layout-buttons"><span> <div data-name="ok" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">   <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#FC8924" cx="20.5" cy="20.5" r="60"></circle> <path d="M27.24444 23.7c-.5 1.3-1.7 1.6-3 1.7-.4.2-.9.3-1.4.5.1.2.3.4.4.5l2.7 2.7c.7.8.8 1.8.1 2.5-.7.7-1.7.6-2.5-.1-.8-.9-1.7-1.7-2.6-2.6-.2-.1-.3-.3-.6-.5-.5.6-1 1.1-1.5 1.6-.5.6-1.1 1.2-1.7 1.7-.7.7-1.8.7-2.4 0-.6-.6-.6-1.6.1-2.3.9-.9 1.9-1.8 2.8-2.7l.5-.5c-.8-.3-1.5-.5-2.2-.8-.4-.2-.7-.4-1.1-.6-.8-.5-1.1-1.5-.6-2.3.5-.7 1.5-1 2.4-.5 1.2.7 2.5 1.1 3.9 1.1 1.3 0 2.6-.2 3.7-.9s2.3-.7 3 .9v.6zm-6.7-2.2c-3.3 0-5.8-2.5-5.9-5.8 0-3.1 2.7-5.7 5.9-5.7 3.3 0 5.9 2.6 5.9 5.8 0 3.5-3 5.8-5.9 5.7zm0-8.2c-1.3 0-2.5 1.1-2.5 2.5 0 1.3 1.2 2.4 2.5 2.4 1.4 0 2.5-1.1 2.5-2.5 0-1.3-1.1-2.4-2.5-2.4z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social_${type}"  data-for="ok_${type}"  tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                </div>
                                <div class="divTableCell">
                                    <input data-name="tw" id="app-tw_${type}" class="input_app-tw" type="checkbox" name="select_apps_${type}" value="5" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-tw_${type}" class="layout-buttons"><span>  <div data-name="twitter" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg"> <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#55B2F0" cx="20.5" cy="20.5" r="60"></circle> <path d="M31.7 13.94628c-1.1.7-2.1.8-2.1.8 1.7-1.5 1.6-2.4 1.6-2.4-1.3 1-2.5 1.1-2.5 1.1-2.5-2.5-5-1-5-1-3.1 2-2.1 4.8-2.1 4.8-5.2-.3-8.5-4.6-8.5-4.6-1.8 3.8 1.2 5.7 1.2 5.7-.7.1-1.8-.5-1.8-.5.6 4.1 3.3 4.1 3.3 4.1-.5.4-1.8.2-1.8.2 1.3 3.1 3.8 2.8 3.8 2.8-2 2.2-5.8 1.8-5.8 1.8 3.6 2.9 8.7 1.7 8.7 1.7 9.6-2.2 9.1-12.4 9.1-12.4 1.7-.8 1.9-2.1 1.9-2.1z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social_${type}" data-for="tw_${type}"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                </div></div>
                            <div class="divTableRow">
                                <div class="divTableCell">
                                    <input data-name="vi" id="app-vi_${type}" class="input_app-vi" type="checkbox" name="select_apps_${type}" value="7" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-vi_${type}" class="layout-buttons"><span>  <div data-name="viber" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">  <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle>  <circle class="activated" fill="#A589D7" cx="20.5" cy="20.5" r="60"></circle> <path d="M30.9861006 14.9555556s1.3 3.8.2 9.9c0 0-.3 6.7-12.5 5.6l-1.8 2c-1.4 1.6-2.5 1.2-2.4-.9l.1-1.7s-4-.7-5.20000001-4.9c-1.1-4.3.5-10 .5-10s.80000001-2.9 3.40000001-3.8c0 0 6.9-2.60000004 14 0 0 0 2.8.9 3.7 3.8zm-1.6 9.3c.9-5.1-.1-8.3-.1-8.4-.7-2.4-3.1-3.1-3.1-3.1-5.9-2.1-11.7 0-11.7 0-2.2.8-2.9 3.2-2.9 3.2s-1.4 4.8-.4 8.4c1 3.6 4.1 4.1 4.1 4.1v3.8c0 .5.2.5.5.2l3.1-3.6c10.2 1 10.5-4.6 10.5-4.6zm-13.8-4.5c-.6-1.2-.9-2.1-.9-2.7 0-.6.2-.8.3-1 .1-.2.9-.6 1-.7.1-.1.8-.2 1 .2.3.4.8 1.1 1.2 1.6.6.8 0 1.3-.2 1.5-.3.4-.4.5-.4.9s1.3 1.8 1.6 2.1c.3.3 1.6 1.5 2 1.5.4.1.9-.4 1.1-.5.6-.4 1-.4 1.3-.3.3.1 1.4 1.2 1.7 1.5.5.4.3.7.3.7s-.7 1.2-.8 1.3c-.1.2-.4.3-1 .3s-1.2-.1-2.8-.9c-1.2-.7-2.4-1.8-3.1-2.4-.5-.5-1.6-1.7-2.3-3.1zm7.3.2c-.2 0-.4-.2-.4-.4-.1-1.5-1.3-1.5-1.4-1.5-.2 0-.4-.2-.4-.4s.2-.4.4-.4c.7 0 2.1.5 2.2 2.3 0 .2-.1.4-.4.4.1 0 0 0 0 0zm1.4.5c-.2 0-.4-.2-.4-.4 0-1.1-.3-2-.9-2.5-.9-.9-2.3-.9-2.3-.9-.2 0-.4-.2-.4-.4s.2-.4.4-.4c.1 0 1.7 0 2.9 1.1.8.7 1.1 1.8 1.1 3.1 0 .3-.1.4-.4.4zm1.4.5c-.2 0-.4-.2-.4-.4 0-1.7-.5-3.1-1.4-4-1.5-1.4-3.7-1.3-3.8-1.3-.2 0-.4-.1-.4-.4 0-.2.1-.4.4-.4.1 0 2.6-.1 4.3 1.5 1.1 1.1 1.7 2.6 1.7 4.5 0 .4-.1.5-.4.5z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-messenger_${type}"  data-for="vi_${type}"  tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                </div>
                                <div class="divTableCell">
                                    <input data-name="wh" id="app-wh_${type}" class="input_app-wh" type="checkbox" name="select_apps_${type}" value="8" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-wh_${type}" class="layout-buttons"><span>   <div data-name="whatsapp" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">  <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle>  <circle class="activated" fill="#1BD86D" cx="20.5" cy="20.5" r="60"></circle> <path d="M20.2 9C14.1 9 9.1 14 9.1 20.1c0 2.1.6 4 1.5 5.6l-1 3.8-.3 1-.3 1 5.9-1.6c1.6.8 3.3 1.3 5.2 1.3 6.1 0 11.1-5 11.1-11.1C31.3 14 26.4 9 20.2 9zm0 20.4c-1.6 0-3.1-.4-4.4-1.1l-.6-.3-.7.2-2.8.8.7-2.7.2-.7-.4-.7c-.8-1.4-1.3-3-1.3-4.7 0-5.1 4.2-9.3 9.3-9.3 5.1 0 9.3 4.2 9.3 9.3 0 5.1-4.1 9.2-9.3 9.2zm5.2-6.8c-.9-.4-1.7-.9-1.7-.9-.6-.4-1 .2-1 .2-.3.4-.7.8-.7.8-.6.6-1.2.1-1.2.1-2.4-1.4-3.2-2.9-3.2-2.9s-.5-.6.2-1.1c.7-.5.4-1.3.4-1.3l-.7-1.8c-.6-1.4-1.9-.4-1.9-.4-1.4.9-1.1 2.5-1.1 2.5.1.7.7 2 .7 2s.6 1.2 1.8 2.5l.8.8.3.3c.6.5.6.5.9.7 1.6 1.1 3.4 1.3 3.4 1.3 2.5.5 3.5-1.7 3.5-1.7.3-.8-.5-1.1-.5-1.1z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-messenger_${type}"  data-for="wh_${type}"  tooltip-position='left'> 20&#8381; </div>  </div> </div></span></label>
                                </div>
                                <div class="divTableCell">
                                    <input data-name="sk" id="app-sk_${type}" class="input_app-sk" type="checkbox" name="select_apps_${type}" value="6" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-sk_${type}" class="layout-buttons"><span>   <div data-name="skype" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg"> <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#5DC0FF" cx="20.5" cy="20.5" r="60"></circle> <path d="M31.05408 21.88594c.2-1.2.3-2.5.1-3.6-.9-5.4-6-9.3-11.5-8.5-.3.1-.6 0-.9-.1-2.3-1.2-5.1-.8-7 1-1.8 1.8-2.3 4.6-1.1 6.9.1.2.1.4.1.7-.1.6-.1 1.1-.1 1.7 0 .3 0 .7.1 1 .6 5.9 6 10 11.9 9.1.1 0 .4 0 .5.1 1.1.6 2.3.7 3.5.5 3.9-.7 6.1-4.7 4.5-8.4-.1-.1-.1-.2-.1-.4zm-7.4 4.8c-1.8.5-3.6.5-5.3 0-1.6-.5-2.8-1.5-3.3-3.1-.4-1.2.4-2 1.6-1.9.5.1.9.4 1.1.8.1.3.3.5.4.8.4.9 1.2 1.4 2.1 1.5.8.1 1.6 0 2.3-.3.3-.1.6-.3.7-.6.6-.7.4-1.6-.2-2.1-.7-.5-1.5-.7-2.3-.8-1.1-.2-2.3-.5-3.3-.9-1.1-.5-2-1.2-2.3-2.4-.4-1.5.1-2.6 1.2-3.6 1-.8 2.2-1.1 3.5-1.2h.9c1.2 0 2.3.1 3.4.7.8.4 1.5.9 1.8 1.8.2.4.3.9.1 1.3-.1.5-.5.9-1 1-.6.1-1.1 0-1.5-.5-.1-.2-.4-.5-.5-.8-.5-.8-1.2-1.3-2.2-1.3-.4 0-.9 0-1.3.1s-.7.3-1.1.5c-.5.5-.5 1.2.1 1.7.4.3.8.4 1.3.6 1.1.3 2.2.5 3.3.8.6.1 1.2.4 1.7.7 2.5 1.2 2.3 4.2 1 5.8-.5.6-1.3 1.1-2.2 1.4z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-messenger_${type}" data-for="sk_${type}"   tooltip-position='left'> 20&#8381; </div>  </div></div></span></label>
                                </div>

                            </div>
                            <div class="divTableRow">
                                <div class="divTableCell">
                                    <input data-name="yt" id="app-yt_${type}" class="input_app-yt" type="checkbox" name="select_apps_${type}" value="9" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-yt_${type}" class="layout-buttons"><span>   <div data-name="youtube" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">  <g fill="none" fill-rule="evenodd"> <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#FE2E2E" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#path" cx="20.5" cy="20.5" r="60"></circle>  <path fill="#FFF" d="M31.452 16.773s-.216-1.577-.876-2.272c-.838-.912-1.777-.916-2.207-.97-3.084-.231-7.708-.231-7.708-.231h-.01s-4.625 0-7.708.232c-.431.053-1.37.057-2.208.969-.66.695-.875 2.272-.875 2.272s-.22 1.853-.22 3.705v1.736c0 1.853.22 3.705.22 3.705s.214 1.577.875 2.272c.838.912 1.94.884 2.43.979 1.762.176 7.49.23 7.49.23s4.63-.007 7.714-.239c.43-.054 1.37-.058 2.207-.97.66-.695.876-2.272.876-2.272s.22-1.852.22-3.705v-1.736c0-1.852-.22-3.705-.22-3.705z"></path> <path class="activated" fill="#FD2E2E" d="M18.38 24.319v-6.432l5.953 3.227z"></path> </g> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-media_${type}" data-for="yt_${type}"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                </div>
                            </div>
                            <div class="divTableRow">
                                <div class="divTableCell">

                                    <input data-name="sm" id="app-sm_${type}" class="input_app-sm" type="checkbox" name="select_sms_${type}" value="10" onchange='updateLegoInfo(this, "${type}")'">  <label for="app-sm_${type}" class="layout-buttons"><span>  <div data-name="sms" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="-3 -6 30 30" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" stroke="none" >  <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#8cd073" cx="20.5" cy="20.5" r="60"></circle> <path  d="M18,7c0.542,0,1,0.458,1,1v7c0,0.542-0.458,1-1,1h-8H9.171L9,16.171V16H7H6c-0.542,0-1-0.458-1-1V8c0-0.542,0.458-1,1-1H18    M18,5H6C4.35,5,3,6.35,3,8v7c0,1.65,1.35,3,3,3h1v3l3-3h8c1.65,0,3-1.35,3-3V8C21,6.35,19.65,5,18,5z"/> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-sms_${type}" data-for="sm_${type}"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="divTableCell" >
                <!-- <tr> <td nowrap><input id="app-all" class="input_app-all" type="checkbox" name="select_apps_all" value="0" onchange="checkApps(this)">  <label for="app-all" class="layout-buttons">Все БМП		</span></label>   </td></tr>-->
            </div>
            <div id="tminute_${type}" class="divTableCell"  > 
               <div id="tminute_${type}_child" class="divTableCell"  >  </div>
            </div> 
            <div id="tgbite_${type}" class="divTableCell" >
                <div id="tgbite_${type}_child" class="divTableCell"  >  </div> 
            </div>

        </div>
    </div>



<h2 id="id-Тарифы[Тест]-СтоимостьвызововиSMS_${type}">Стоимость вызовов и SMS  </h2><p> </p>
<h2 id="id-Тарифы[Тест]-Дополнительныеуслуги_${type}">Подробнее</h2><p> </p>`;


     callback.call();
 }

{

    var range = $('.input-range'),
        value = $('.range-value');


    range.attr('max', listTemplates.length - 1);
    value.html(listTemplates[range.attr('value')].name);

    range.on('input', function () {
        value.html(`${listTemplates[this.value].name}`);
        for (x in listTemplates) {
            if (this.value === x) value.html(`${listTemplates[x].name}`);
            PhraseUpdate(null);
        }
    });

}

//
//TODO: ШАБЛОНИЗАТОР
//
//

function concateApps(Checked, Rate, Sym, LastSym) {
    LastSym = (LastSym == undefined)? Sym: LastSym;
    var texttemp = "";

    for (x in Checked)
    {
        for (y in Rate) {
            if (Rate[y].id === Checked[x]) {
                if (Checked.length > 1) {
                    switch(x) {
                        case "0":   texttemp += `${Rate[y].name}`; break;
                        case (Checked.length - 1).toString():
                            texttemp +=  `${LastSym}${Rate[y].name}`;
                            break;
                        default:   texttemp += `${Sym}${Rate[y].name}`; break;
                    }

                } else if (Checked.length === 1) {
                    texttemp += `${Rate[y].name}`;
                }
            }
        }
    }

    return texttemp;
}

function concateSms(SmsStatus, Rate, Sym) {
    var texttemp = "";
    if (SmsStatus) {
        for (y in Rate) {
            if (Rate[y].id === "sm") {
                texttemp = `${Sym}${Rate[y].name}`;
            }
        }
    }
    return texttemp;
}

function ToProcessText(cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, cur_sum, Rate, SmsStatus, Phrases, Checked, templates)  {
//TODO: шаблон
    if (templates.length !== 1) {
   var Template = "";
    // Минуты\Трафик\SMS\БМП
                   if (cur_mCount === "0" && cur_gCount === "0" && Checked.length === 0 && !SmsStatus) { Template = "Не выбрано";}
              else if (cur_mCount === "0" && cur_gCount === "0" && Checked.length === 0 && SmsStatus) {  Template = templates[8]; }
              else if (cur_mCount !== "0" && cur_gCount === "0" && Checked.length === 0 && !SmsStatus)  {  Template = templates[9]; }
              else if (cur_mCount !== "0" && cur_gCount === "0" && Checked.length === 0 && SmsStatus) {  Template = templates[10]; }
              else if (cur_mCount === "0" && cur_gCount === "0" && Checked.length > 0 && !SmsStatus) {  Template = templates[11]; }
              else if (cur_mCount === "0" && cur_gCount === "0" && Checked.length > 0 && SmsStatus) {  Template = templates[12]; }
              else if (cur_mCount !== "0" && cur_gCount === "0" && Checked.length > 0 && !SmsStatus){  Template = templates[13]; }
              else if (cur_mCount !== "0" && cur_gCount === "0" && Checked.length > 0 && SmsStatus) {  Template = templates[14]; }
              else if (cur_mCount === "0" && cur_gCount !== "0" && Checked.length === 0 && !SmsStatus) {  Template = templates[2]; }
              else if (cur_mCount === "0" && cur_gCount !== "0" && Checked.length === 0 && SmsStatus) {  Template = templates[7]; }
              else if (cur_mCount === "0" && cur_gCount !== "0" && Checked.length > 0 && !SmsStatus) {  Template = templates[1]; }
              else if (cur_mCount === "0" && cur_gCount !== "0" && Checked.length > 0 && SmsStatus) {  Template = templates[4]; }
              else if (cur_mCount !== "0" && cur_gCount !== "0" && Checked.length > 0 && !SmsStatus) {  Template = templates[6]; }
              else if (cur_mCount !== "0" && cur_gCount !== "0" && Checked.length > 0 && SmsStatus) {  Template = templates[0]; }
              else if (cur_mCount !== "0" && cur_gCount !== "0" && Checked.length === 0 && !SmsStatus) {  Template = templates[3]; }
              else if (cur_mCount !== "0" && cur_gCount !== "0" && Checked.length === 0 && SmsStatus) {  Template = templates[5]; }

    } else {
        Template = templates[0]
    }

    var search = ["{{", "}}"];
    var replaceTo = ['<%=', '%>'];
    for (t = 0; t < search.length; t++) {
        Template = Template.replace(new RegExp(search[t], 'g'), replaceTo[t]);
    }


    var searchIN = [Checked.length, cur_mCount, cur_gCount, SmsStatus];
    var replaceIN = ['APP', 'MIN', 'GB', 'SMS'];
    for (t = 0; t < searchIN.length; t++) {
        if (searchIN[t] > 0 || searchIN[t]) {

            if (t === 0) {
                var forRaplace = (Checked.length !== 1)? "$2": (Checked.length === 1 && Checked[0] === "ok")? "$2": "$1";
                Template = Template.replace(new RegExp('\\(\\((.*?)(?:\\|)(.*?)\\)\\)', 'g'), forRaplace);
            }
            Template = Template.replace(new RegExp('\\[\\[('+replaceIN[t]+'?)(?:\\:)(.*?)\\]\\]', 'g'), "$2");
        } else {
            Template = Template.replace(new RegExp('\\[\\[('+replaceIN[t]+'?)(?:\\:)(.*?)\\]\\]', 'g'), "");
        }

    }



    var tmpl = _.template(Template);


    var data = {
        SMS1: concateSms(SmsStatus, Rate,""),
        n: '\n' ,
        RUB1: "&#8381;",
        RUB2: declOfNum(cur_sum, ['рубль', 'рубля', 'рублей']),
        RUB3: "руб.",
        Apps1: concateApps(Checked, Rate, " + "),
        Apps2: concateApps(Checked, Rate, ", ", " и "),
        summary: cur_sum,
        mcount: cur_mCount,
        gcount: cur_gCount,
        mprice: cur_mPrice,
        gprice: cur_gPrice,
        gb2: declOfNum(cur_gCount, ['гигабайт', 'гигабайта', 'гигабайт']),
        gb1: "Gb",
        gb3: "Гб",
        uapps1: "ВК, ОК, Instagram и Facebook", //к чему (безлимитный доступ к )
        uapps2: "ВК (20р), ОК (20р), Instagram(20р) и Facebook(20р)", //что (Безлимитные )
        uapps3: "ВК, ОК, Instagram по 20 рублей и Whatsapp за 10 рублей", //что (Безлимитные )
        uapps4: "",
        uapps5: "",
        uapps6: "",
        vk: "", //Все приложения, но основной шаблон для ВК
        ok: "",
        fb: "",
        ig: "",
        wh: "",
        vi: "",
        sk: "",
        yt: "",
        tw: "",
        sm: "",

    };
    return tmpl(data);





}

// window.addEventListener("load", function(event) {
function checkParams(callback, callback2) {
    console.log("All resources finished loading!");
    var params = window
        .location
        .search
        .replace('?', '')
        .split('&')
        .reduce(
            function (p, e) {
                var a = e.split('=');
                p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        );
    if (params['region'] !== undefined) {

        getJSON(mf_id_ratio, callback, params['region'], callback2);
        if (params['random'] !== undefined && params['random'] === "true") {

            setTimeout( function(){
                callbackLink();
                var elm = document.querySelector('span[class="aui-header-logo-device"]');
                elm.className = "new_aui-header-logo-device";
                elm.style.fontSize  = "12px";
                elm.innerHTML = "Реклама Yota вместо логотипа";
                document.querySelector('#header .aui-header').style.backgroundColor  = "#00aeef";
                 document.querySelector('#header').style.backgroundColor  = "#00aeef";
                $('html, body').animate({ scrollTop: $(".yota_newcombine_search_alt").offset().top }, 500); // анимируем скроолинг к элементу scroll_el

            }, 500 );
        }
    }
// });
}

function callbackLink(eto) {
    for (x in type_lego)
    {
        let type = type_lego[x];
        let mins = legorates[type].mins;
        let gbites = legorates[type].gbites;
        randomLegoInfo("update", type, mins.length , gbites.length);
    }


}

class CheckedRegion {
    constructor(id) {  this.id = id;   }
    get getRegion() { return this.id; }
    set setRegion(newValue) {  this.id = newValue; }
}
var checkedRegionsId;
function choiseRegionbylink(region){
    var obj = this.megafon_id;
    var reg1 = obj.find(x => x.region_id === region).id;

    checkedRegionsId = new CheckedRegion(reg1);
    console.log( checkedRegionsId.getRegion);
    customTemplates.setValueByChoice(checkedRegionsId.getRegion);
    initLegoRates(checkedRegionsId.getRegion, initOtherRates);
}



document.addEventListener('DOMContentLoaded', function() {




    StartInit(); //Общая инициализация


    //инициализация поисковой строки
    customTemplates =  customTemplates = new Choices(document.getElementById('regions_call'), {
        searchFields: ['customProperties.description'],
        placeholderValue: 'Выберите страну',
        searchPlaceholderValue: 'Наверное, это поле поиска..',
        placeholder: true,
        loadingText: 'Loading...',
        noResultsText: 'Не найдено вариантов. Реклама Yota в поисковой строке',
        noChoicesText: 'Что-то пошло не так :(',
        itemSelectText: 'Выбрать',
        renderChoiceLimit: -1,
        searchEnabled: true,
        searchChoices: true,
        searchFloor: 2,
        searchResultLimit: 4,
        position: 'bottom',
        shouldSort: true,
        prependValue: null,
        appendValue: null,
        callbackOnCreateTemplates: function(strToEl) {
            var classNames = this.config.classNames;
            var itemSelectText = this.config.itemSelectText;
            return {
                item: function(data) {
                    return strToEl('\
                <div\
                  class="'+ String(classNames.item) + ' ' + String(data.highlighted ? classNames.highlightedState : classNames.itemSelectable) + '"\
                  data-item\
                  data-id="'+ String(data.id) + '"\
                  data-value="'+ String(data.value) + '"\
                  '+ String(data.active ? 'aria-selected="true"' : '') + '\
                  '+ String(data.disabled ? 'aria-disabled="true"' : '') + '\
                  >\
                  <span style="margin-right:1px;"/> ' /*+ ' [<b>'  + String(data.groupId) + '</b>] ' */+ String(data.label) + ' ' + '\
                </div>\
              ');
                },
                choice: function(data) {
                    return strToEl('\
                <div\
                  class="'+ String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable) + '"\
                  data-select-text="'+ String(itemSelectText) + '"\
                  data-choice \
                  '+ String(data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable') + '\
                  data-id="'+ String(data.id) + '"\
                  data-value="'+ String(data.value) + '"\
                  '+ String(data.groupId > 0 ? 'role="treeitem"' : 'role="option"') + '\
                  >\
                  <span style="margin-right:1px;"/> ' /*+ ' [<b>'  + String(data.groupId) + '</b>] ' */+ String(data.label) + ' ' + '\
                </div>\
              ');
                },
            };
        },
    });

    //евернт на изменение региона
    customTemplates.passedElement.addEventListener('change', function(e) {
        initLegoRates(e.detail.value, initOtherRates); //Загрузка JSON условий в РФ, передача в обработчик
    });


    searchOutRussia = new Choices(document.getElementById('countries_call'), {
        placeholderValue: 'Выберите страну',
        searchPlaceholderValue: 'Наверное, это поле поиска..',
        placeholder: true,
        //searchFields: ['label', 'value', 'customProperties.description'],
    });
    //евернт на изменение региона
    searchOutRussia.passedElement.addEventListener('change', function(e) {
        initOotRussiaRates(e.detail.value);
    });


    searchRoaming = new Choices(document.getElementById('roaming_call'), {
        placeholderValue: 'This is a placeholder set in the config',
        searchPlaceholderValue: 'Наверное, это поле поиска..',
        placeholder: true,
        searchFields: ['label', 'value', 'customProperties.description'],
    });
    //евернт на изменение региона
    searchRoaming.passedElement.addEventListener('change', function(e) {
        initRoamingRatesProviders(e.detail.value, initRoamingRates);
    });

    if (checkedRegionsId!==undefined) customTemplates.setValueByChoice(checkedRegionsId.getRegion);


});

function VisibleClearBody(type) {

    var gchecks = document.querySelectorAll('input[type="radio"][name="radio_trafic_'+type+'"]');
    var mchecks = document.querySelectorAll('input[type="radio"][name="radio_minute_'+type+'"]');
    var appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps_'+type+'"]');



    document.getElementById("yota_newcombine_b_tafir_summary_input1_"+type).innerHTML = "";
    document.getElementById("yota_newcombine_b_tafir_summary_input_"+type).innerHTML = "";
    document.getElementById("tminute_"+type).innerHTML = "";
    document.getElementById("tgbite_"+type).innerHTML = "";
    document.getElementById("id-Тарифы[Тест]-СтоимостьвызововиSMS_"+type).nextElementSibling.innerHTML = "Выбери тариф и регион";
    document.getElementById("id-Тарифы[Тест]-Дополнительныеуслуги_"+type).nextElementSibling.innerHTML = "Выбери тариф и регион";
    gchecks.forEach(function(item, i, arr) {  if (gchecks[i].checked) gchecks[i].checked = false; });
    mchecks.forEach(function(item, i, arr) {  if (mchecks[i].checked) mchecks[i].checked = false; });
    appitems.forEach(function(item, i, arr) {  if (appitems[i].checked) appitems[i].checked = false; });
    document.getElementById("yota_newcombine_legoyota_"+type).style.display = "block";
    document.getElementById("yota_newcombine_legoyota_"+type).style.visibility = "visible";
    document.getElementById("tminute_"+type).style.visibility = "visible";
    document.getElementById("tgbite_"+type).style.visibility = "visible";

/*    document.getElementById("yota_newcombine_legoyota_plaphone").style.display = "none";
    document.getElementById("yota_newcombine_legoyota_tabt").style.display = "none";*/
    // document.getElementById("yota_newcombine_legoyota").style.visibility = "hidden";

    switch (type) {
        case "clear":
            /*  document.getElementById("switch-radio-off-2").checked = false;
              document.getElementById("switch-radio-on-2").checked = false;*/
            break;
        case "lego":case "plaphone":case "tabt":
        break;
        default:
    }


}

{ function mOver(obj) {  } function mOut(obj) { } function mDown(obj) { } function mUp(obj) { } }







var selected_items = []; //id чекнутых бмп





class SaveCheckedData {
    constructor(type, cur_mCount,  cur_mPrice, cur_gCount, cur_gPrice, options, cheks) {
        this.type = type;
        this.cur_mCount = cur_mCount;
        this.cur_mPrice = cur_mPrice;
        this.cur_gCount =  cur_gCount;
        this.cur_gPrice =  cur_gPrice;
        this.options =  options;
        this.cheks =  cheks;
    }
    // геттер
    get data() {
        return {
           type: this.type, cur_mCount: this.cur_mCount, cur_mPrice: this.cur_mPrice,
            cur_gCount: this.cur_gCount, cur_gPrice: this.cur_gPrice, options: this.options,
            cheks: this.cheks,
    };
    }

    // сеттер
    set data(newValue) {
        this.type = newValue.type;
        this.cur_mCount = newValue.cur_mCount;
        this.cur_mPrice = newValue.cur_mPrice;
        this.cur_gCount =  newValue.cur_gCount;
        this.cur_gPrice =  newValue.cur_gPrice;
        this.options =  newValue.options;
        this.cheks =  newValue.cheks;
        //[this.firstName, this.lastName] = newValue.split(' ');
    }

}


var tempForSummary = {};
//функция вывода данных в первое окно при выделении опций (plaphone)
function summaryOutput(type, cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, options) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var text, text1 = "";
    var cur_sum_app = [];
    var cur_sum = Number(Number(cur_mPrice) + Number(cur_gPrice));
    var  gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_'+type+'"]:checked');
    var  mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_'+type+'"]:checked');
    var  appcheck = document.querySelectorAll('input[type="checkbox"][name="select_apps_'+type+'"]:checked');
    var  smscheck = document.querySelectorAll('input[type="checkbox"][name="select_sms_'+type+'"]:checked');
    var  appall = document.querySelector('input[type="checkbox"][name="select_apps_all_'+type+'"][value="0"]'); 		//галочка "все"
    if (appcheck.length===0)  selected_items = [];

    if (cur_mCount !== undefined) VoiceTariffs(type, cur_mCount);
    var tempobj = {};

   if (tempForSummary[type] == undefined) tempForSummary[type]  = new SaveCheckedData(type, cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, options, cur_region_teriff[type].cheks);

    if (cur_mCount == undefined || cur_mPrice == undefined || cur_gCount == undefined ||  cur_gPrice == undefined)
    {
        tempobj = tempForSummary[type].data;
        cur_mCount = tempobj.cur_mCount;
        cur_mPrice = tempobj.cur_mPrice;
        cur_gCount = tempobj.cur_gCount;
        cur_gPrice = tempobj.cur_gPrice;

    }

    var sample = "";
    SmsStatus = (smscheck.length === 1);

    let appt = []; //Checked apps


    var temp4 = "";
    appcheck.forEach(function (app) {
        appt.push(app.getAttribute("data-name"));
        temp4 += app.getAttribute("data-name") + " " + OptionsPhrases[app.getAttribute("data-name")] + "\n";
    });


    var sum_apps = 0;
    if (appt.length > 0) {
        for (x in appt)
        {
            for (y in cur_region_teriff[type].cheks) {
                if (cur_region_teriff[type].cheks[y].id === appt[x]) {
                    sum_apps += Number(cur_region_teriff[type].cheks[y].price);
                }

            }
        }
    }

    if (SmsStatus) {
        for (y in cur_region_teriff[type].cheks) {
            if (cur_region_teriff[type].cheks[y].id === "sm") {
                sum_apps += Number(cur_region_teriff[type].cheks[y].price);
            }

        }
    }
    cur_sum += sum_apps;



    var hardToVmode = document.getElementById("slider_phrase").value;
    var  templates = listTemplates[hardToVmode].phrases;
    var textcur = ToProcessText(cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, cur_sum, cur_region_teriff[type].cheks, SmsStatus, OptionsPhrases, appt, templates);




    document.getElementById("yota_newcombine_b_tafir_summary_input_"+type).innerHTML = textcur;



    if ( (gcheck.length + mcheck.length)  === 2 )  {
        //document.getElementById("yota_newcombine_b_tafir_summary_input_"+type).innerHTML = text;
        summaryOutput2(type, selected_items, cur_mCount ,cur_gCount);
    } else {

    }



}



//склоенние в зависимости от числа
function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

//функция вывода данных во второе окно при выделении опций (plaphone)
function summaryOutput2(type, apps, cminut, cgbites) {

    var text = "";


    if (cgbites === "0") { text += phrasesInet[4].phrase; }
    else if (cgbites <= 7) {  text += phrasesInet[0].phrase;  }
    else if (cgbites <= 15) { text += phrasesInet[1].phrase; }
    else if (cgbites <= 30) { text += phrasesInet[2].phrase; }
    else if (cgbites > 30) { text += phrasesInet[3].phrase; }

    if( apps.length > 0 && cgbites !== "0") {
        text += ", включая безлимитный доступ к ";
        apps.forEach(function(item, i, arr) {
            text += unlimApps[item-1].name + ", ";
        });
    } else if( apps.length > 0 && cgbites === "0")  {
        text += ", при этом будут безлимитные ";
        apps.forEach(function(item, i, arr) {
            text += unlimApps[item-1].name + ", ";
        });
    }

    document.getElementById("yota_newcombine_b_tafir_summary_input1_"+type).innerHTML = text;
}


//Функция на обновление переменных по выбанным приложениям (plaphone)

function checkApps(node, type, callback) {
    var text, appitems, appcheck, appall, gcheck, mcheck;



    appcheck = document.querySelectorAll('input[type="checkbox"][name="select_apps_'+type+'"]:checked');      //Выбрано среди приложений
    appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps_'+type+'"]');        		//Все итемы приложжений
    appall   = document.querySelector('input[type="checkbox"][name="select_apps_all_'+type+'"]'); 		//галочка "все"
    gcheck   = document.querySelectorAll('input[type="radio"][name="radio_trafic_'+type+'"]:checked');
    mcheck   = document.querySelectorAll('input[type="radio"][name="radio_minute_'+type+'"]:checked');




    //////////// Обработчик чекбокса (все\по отдельности)
    if (node === "update" || node.className.search( /nameofclicktitle/i ) >= 0 ) { //str.search( /лю/i )
        selected_items = [];
        appall.checked = (appcheck.length === appitems.length) && (!appall.checked);
        appcheck.forEach(function (item, i, arr) {
            if (arr[i].value !== 0) selected_items[i] = arr[i].value;
        });
    }
    if( node.type === "checkbox") {
        if (node.value > appall.value) {
            selected_items = [];
            appall.checked = (appcheck.length === appitems.length) && (!appall.checked);
            appcheck.forEach(function (item, i, arr) {
                if (arr[i].value !== 0) selected_items[i] = arr[i].value;
            });

        } else {
            appitems.forEach(function (item, i, arr) {
                appitems[i].checked = !!(appall.checked);
                if (appall.checked) {
                    selected_items[i] = arr[i].value;
                }
                else {
                    selected_items = [];
                }

            });
        }
    }



    var apps = [];
    appcheck.forEach(function(e) {
        var templa = {};
        for (x in legorates[type].apptype) {
            if (legorates[type].apptype[x].id === e.getAttribute("data-name")) templa = legorates[type].apptype[x];
        }
        apps.push({phrase: OptionsPhrases[e.getAttribute("data-name")], info: templa});
    });

    if ( (gcheck.length + mcheck.length)  !== 2 )  return;
            callback.call(null, node, type);

}



function updateLegoInfo(obj, types) {
     checkApps(obj, types, checkType);

}
function PhraseUpdate(obj) {
    if (obj === null) { obj = "update"}
        for (x in type_lego) {
            updateLegoInfo(obj, type_lego[x]);
        }
}



function getRandomInRange(min,max,l) {var arr = [],m = [],n = 0;
        if (max - min < l-1) return;
        for (var i=0; i<=(max-min); i++)m[i] = i + min;
        for (var i=0; i<l; i++) {n = Math.floor(Math.random()*(m.length)); arr[i]=m.splice(n,1);};
        return arr
    }




function randomLegoInfo(obj, types, mins, gbites) {


    var gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_'+types+'"]');        //Выбрано среди трафика
    var mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_'+types+'"]');        //Выбрано среди минут
    var appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps_'+types+'"]');        		//Все итемы приложжений
    var appall = document.querySelector('input[type="checkbox"][name="select_apps_all_'+types+'"]'); 		//галочка "все"


    var let1 = getRandomInRange(0, (mcheck.length - 1), 1);
    var let2 = getRandomInRange(0, (gcheck.length - 1), 1);

    for(x2 in mcheck)
    {
        if (mcheck[x2].value === let1.toString())
            mcheck[x2].checked = true;
    }

    for(x1 in gcheck)
    {
        if (gcheck[x1].value === let2.toString())
            gcheck[x1].checked = true;
    }





    rangeCheckedApps = (rangeCheckedApps[0] > rangeCheckedApps[1]) ? [0, 0] : rangeCheckedApps;
    var startRange  = (rangeCheckedApps[0] === 0) ? 1 : rangeCheckedApps[0];
    var stopRange =  (rangeCheckedApps[1] === 0) ? appitems.length :
        (rangeCheckedApps[1] >= appitems.length ) ? appitems.length  : rangeCheckedApps[1];

    var favApps = (favoriteCheckedApps.length > 3) ?  favoriteCheckedApps : [1, appitems.length];
    //TODO: пока не используется. Псевдорандом

    var arr = getRandomInRange(1,appitems.length, getRandomInRange(startRange, stopRange, 1) );


    for(x5 in appitems)  appitems[x5].checked = false;

    for(x4 in appitems) {
        for (x3 in arr) {

            if (appitems[x4].value === arr[x3].toString())
                appitems[x4].checked = true;
        }
    }
    updateLegoInfo(obj, types);



}



//Функция на обновление переменных по выбранному тарифу (plaphone)
function checkType(node, type) {

    summaryOutput(type);
    var  mcheck, gcheck, gchecks, mchecks;
    var cur_mCount, cur_mPrice, cur_gCount, cur_gPrice; //Выбранные минуты,цена,трафик,цена
    gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_'+type+'"]:checked');        //Выбрано среди трафика
    mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_'+type+'"]:checked');        //Выбрано среди минут
    gchecks = document.querySelectorAll('input[type="radio"][name="radio_trafic_'+type+'"]');        //Все итемы в трафике
    mchecks = document.querySelectorAll('input[type="radio"][name="radio_minute_'+type+'"]');        //Все итемы в минутах

    if (mcheck[0] !== undefined && gcheck[0] !== undefined) {
        cur_mCount = legorates[type].mins[mcheck[0].value][0];
        cur_mPrice = legorates[type].mins[mcheck[0].value][1];
        cur_gCount = legorates[type].gbites[gcheck[0].value][0];
        cur_gPrice = legorates[type].gbites[gcheck[0].value][1];

    }

    summaryOutput(type, cur_mCount, cur_mPrice, cur_gCount, cur_gPrice);
}

var legorates = {};
function addRow(type, region, objRate) {


    legorates[type] = objRate;
    cur_region_teriff[type].cheks = legorates[type].apptype;
    mins = legorates[type].mins;
    gbites = legorates[type].gbites;

    var apchecks11 = document.querySelectorAll('div[class="b2c-voice-collect__app-price"]');
    var tempapp = legorates[type].apptype;
    apchecks11.forEach(function(item, ids, arr) {
        var dataname = apchecks11[ids];
            for (x in tempapp)
            {
                if (dataname.getAttribute('data-for') ===  tempapp[x].id + "_" +type) {
                    dataname.innerHTML = tempapp[x].price + "&#8381;";
                }
            }
    });


    var elem = document.getElementById(`tminute_${type}`);
    while (elem.firstChild) { if (elem.firstChild) elem.removeChild(elem.firstChild);  }

    //TODO: Перестать использовать таблицы, черт
    var tr1 = document.createElement('tr');
    tr1.innerHTML = `<td nowrap id="labletd_${type}"><label class="layout-buttons_gb ${type} nameofclicktitle" onclick='randomLegoInfo(this, "${type}", "${mins.length}" , "${gbites.length}")'>Пакеты минут:  </label></td>`;
    elem.appendChild(tr1);


    mins.forEach(function(item,i,arr){
        var tr = document.createElement('tr');
        tr.innerHTML = `<td id="tdminute_${i}_${type}" nowrap><input value="${i}" id="iminute_${i}_${type}" class="input_radio_minute" name="radio_minute_${type}" type="radio"  onchange='updateLegoInfo(this, "${type}")'><label for="iminute_${i}_${type}" class="layout-buttons_gb">${item[0]} минут за ${item[1]} рублей </label></td>`;
        elem.appendChild(tr);
    });
    var elem1 = document.getElementById(`tgbite_${type}`);
    while (elem1.firstChild) { if (elem1.firstChild) elem1.removeChild(elem1.firstChild);  }

    var tr2 = document.createElement('tr');
    tr2.innerHTML = `<td nowrap id="labletd_${type}"><label class="layout-buttons_gb ${type} nameofclicktitle" onclick='randomLegoInfo(this, "${type}", "${mins.length}" , "${gbites.length}")' >Пакеты трафика:  </label></td>`;
    elem1.appendChild(tr2);


    gbites.forEach(function(item,i,arr){
        var tr2 = document.createElement('tr');
        tr2.innerHTML = `<td id="tdgbite__${i}_${type}" nowrap><input value="${i}" id="igbite_${i}_${type}" class="input_radio_gbite" name="radio_trafic_${type}" type="radio" onchange='updateLegoInfo(this, "${type}")'><label for="igbite_${i}_${type}" class="layout-buttons_gb">${item[0]} ГБ за ${item[1]} рублей </label></td>`;
        elem1.appendChild(tr2);
    });
}


//Функция заполнения при выборе региона (да, это переменная, а не функция. Мне лень)
var cur_region_teriff = {};

//ЗАполнение конструкторных тарифов
//TODO: уведомления
function initLegoRates(region, callback) {


    var map = new Map(jsondata.regions.map(el=>[el.id,el]));
    var item = map.get(region);
    cur_region_teriff = item;


    if (cur_region_teriff.have_modem === "false" && cur_region_teriff.have_voice === "false")  returnInfoBlock("warning", "Регион не запущен");
    else if (cur_region_teriff.have_voice === "false")  returnInfoBlock("warning", "Голос не запущен");
    else if (cur_region_teriff.have_modem === "false")  returnInfoBlock("warning", "Модем не запущен");
    else returnInfoBlock("clear", "");


    //TODO Первоначальная инициализация и запись тарифов
    for (x in type_rates) {
        let name = type_rates[x];
        map = new Map(jsondata[name].map(el => [el.id, el]));
        try {
            item = map.get(region);
            cur_region_teriff[name] = item;
        } catch (e) {
            cur_region_teriff[name] = "Nodata";
        }
    }
    for (x in type_lego) {
        let type = type_lego[x];


        map = new Map(jsondata[type].map(el=>[el.id,el]));
        item = map.get(region);
        cur_region_teriff[type] = item;


        createLegoBlock(type, function () {

            if( cur_region_teriff.have_voice === "true") {

                var apptype = {};
                VisibleClearBody(type);


                for (var key in unlimApps)  {apptype[key] = unlimApps[key];}

                for (var app in apptype) {
                    switch (apptype[app].group){
                        case "messenger": apptype[app].price = cur_region_teriff[type].messenger;; break;
                        case "social": apptype[app].price = cur_region_teriff[type].social; break;
                        case "youtube": apptype[app].price = cur_region_teriff[type].youtube; break;
                        case "sms": apptype[app].price = cur_region_teriff.sms_base; break;
                        case "deleted": /*unlimApps[app].price = unlimApps[app].price;*/ break;
                        default: break;

                    }
                }

                var objRate = {mins: cur_region_teriff[type].mins, gbites: cur_region_teriff[type].gbites, apptype};

                addRow(type, cur_region_teriff.id, objRate);
            }
        });
    }

    callback.call(cur_region_teriff);




}

function initOtherRates(checked_region) {

    checked_region = this;
    // if (checked_region.have_voice === "false" ) return;
    var yota_newcombine_old_plaphone = document.getElementById('yota_newcombine_old_plaphone');
    var yota_newcombine_abca = document.getElementById('yota_newcombine_abca');
    var yota_newcombine_abcb = document.getElementById('yota_newcombine_abcb');
    var yota_newcombine_legoyota_tabt = document.getElementById('yota_newcombine_legoyota_tabt');
    var yota_newcombine_legoyota_plaphone = document.getElementById('yota_newcombine_legoyota_plaphone');
    var yota_newcombine_unlim_phone = document.getElementById('yota_newcombine_unlim_phone');
    var yota_newcombine_unlim_tab = document.getElementById('yota_newcombine_unlim_tab');
    var yota_newcombine_modem = document.getElementById('yota_newcombine_modem');
    var yota_newcombine_unlim_phone_archived = document.getElementById('yota_newcombine_unlim_phone_archived');
    var yota_newcombine_plaphone = document.getElementById('yota_newcombine_plaphone');
    var yota_newcombine_tabt = document.getElementById('yota_newcombine_tabt');
    var yota_newcombine_nullbalance_phone = document.getElementById('yota_newcombine_nullbalance_phone');
    var yota_newcombine_nullbalance_tab = document.getElementById('yota_newcombine_nullbalance_tab');


    if (checked_region.have_modem ===  "false" && checked_region.have_voice ===  "false") {
        yota_newcombine_modem.innerHTML = ` `;
        yota_newcombine_unlim_phone.innerHTML = ` `;
        yota_newcombine_unlim_tab.innerHTML = ` `;
        yota_newcombine_old_plaphone.innerHTML = ` `;
        yota_newcombine_abca.innerHTML = ` `;
        yota_newcombine_abcb.innerHTML = ` `;
        yota_newcombine_unlim_phone_archived.innerHTML = ` `;
        yota_newcombine_unlim_phone.innerHTML = ` `;
        yota_newcombine_legoyota_plaphone.innerHTML = ` `;
        yota_newcombine_legoyota_tabt.innerHTML = ` `;
        return;
    }



    var unlim_phone = checked_region.ph_unlim.tariffs;
    var list_unlim_phone = "";
    var list_unlim_phone_archived = "";
// name = current, mins
    unlim_phone.forEach(function (e) {

        if (e.name === "current") {
            for (x in e.mins) {
                list_unlim_phone += `Пакет ${e.mins[x][0]} минут - ${e.mins[x][1]} рублей<br>`;
            }
        } else if (e.name === "archived") {
            for (x in e.mins) {
                list_unlim_phone_archived += `Пакет ${e.mins[x][0]} минут - ${e.mins[x][1]} рублей<br>`;
            }
        }

    });

    var text_of_yota_newcombine_unlim_phone = `<tbody> <tr><tr><hr></tr>
<tr><b>${checked_region.name}</b></tr><br>
<tr><b>Тарифные пакеты</b><br>
${list_unlim_phone}</tr>
<tr><b>Интернет</b><br>
Безлимитный интернет</tr><br>
<tr><b>Опции</b><br>
Доп. пакет 100 минут: ${checked_region.voice_add_100} руб.<br>
Пакет SMS: ${checked_region.sms_base} руб.</tr><br>
<tr><b>Опция «Общий доступ в интернет»</b><br>
2 часа на максимальной скорости -  ${checked_region.t2hour} руб.<br>
24 часа на максимальной скорости - ${checked_region.t24hour} руб.</tr><br>
<tr><b>Дополнительно</b><br>
SMS/MMS (поштучно, руб.): ${checked_region.sms_over_pack} руб.<br>
Стоимость минуты сверх пакета (руб.): ${checked_region.min_over_pack} руб</tr><br>
<tr><b>Примечания</b> (будут заполнены позже)<br></tr>
</tr></tbody>`;
//TODO: Добавить примечания в отдельную матрицу
    yota_newcombine_unlim_phone.innerHTML = text_of_yota_newcombine_unlim_phone;


    var text_of_yota_newcombine_unlim_phone_archived = `<tbody> <tr><tr><hr></tr>
<tr><b>${checked_region.name}</b></tr><br>
<tr><b>Тарифные пакеты</b><br>
${list_unlim_phone_archived}</tr>
<tr><b>Интернет</b><br>
Безлимитный интернет</tr><br>
<tr><b>Опции</b><br>
Доп. пакет 100 минут: ${checked_region.voice_add_100} руб.<br>
Пакет SMS: ${checked_region.sms_base} руб.</tr><br>
<tr><b>Опция «Общий доступ в интернет»</b><br>
2 часа на максимальной скорости -  ${checked_region.t2hour} руб.<br>
24 часа на максимальной скорости - ${checked_region.t24hour} руб.</tr><br>
<tr><b>Дополнительно</b><br>
SMS/MMS (поштучно, руб.): ${checked_region.sms_over_pack} руб.<br>
Стоимость минуты сверх пакета (руб.): ${checked_region.min_over_pack} руб</tr><br>
<tr><b>Примечания</b> (будут заполнены позже)<br></tr>
</tr></tbody>`;
//TODO: Добавить примечания в отдельную матрицу
    if (list_unlim_phone_archived.length !== 0)
        yota_newcombine_unlim_phone_archived.innerHTML = text_of_yota_newcombine_unlim_phone_archived;
    else {
        yota_newcombine_unlim_phone_archived.innerHTML = "";
    }

    var text_of_yota_newcombine_yota_newcombine_abcb = `<tbody> <tr><tr><hr></tr>
<tr><b>${checked_region.name}</b></tr><br>
<tr><b>Тарифные пакеты</b><br>
${checked_region.abcb.current.mins}<br></tr>
<tr><b>Безлимитные Мобильные приложения</b><br>
${checked_region.abcb.current.unlimapps} . <br>
</tr><br>
<tr><b>Опции</b><br>
Доп. пакет 100 минут: ${checked_region.voice_add_100} руб.<br>
Доп. пакет 5 Гб: ${checked_region.gb_add_5} руб.<br>
Пакет SMS: ${checked_region.sms_base} руб.</tr><br> 
<tr><b>Дополнительно</b><br>
SMS/MMS (поштучно, руб.): ${checked_region.sms_over_pack} руб.<br>
Стоимость минуты сверх пакета (руб.): ${checked_region.min_over_pack} руб</tr><br> 
</tr></tbody>`;
    yota_newcombine_abcb.innerHTML = text_of_yota_newcombine_yota_newcombine_abcb;

    var text_of_yota_newcombine_yota_newcombine_abca = `<tbody> <tr><tr><hr></tr>
<tr><b>${checked_region.name}</b></tr><br>
<tr><b>Тарифные пакеты</b><br>
${checked_region.abca.tariffs}<br></tr>
<tr><b>Опция БМП</b><br> 
Безлимитные Мобильные приложения - ${checked_region.abca.unlimapps} рублей<br>
</tr><br>
<tr><b>Опции</b><br>
Доп. пакет 100 минут: ${checked_region.voice_add_100} руб.<br>
Доп. пакет 5 Гб: ${checked_region.gb_add_5} руб.<br>
Пакет SMS: ${checked_region.sms_base} руб.</tr><br> 
<tr><b>Дополнительно</b><br>
SMS/MMS (поштучно, руб.): ${checked_region.sms_over_pack} руб.<br>
Стоимость минуты сверх пакета (руб.): ${checked_region.min_over_pack} руб</tr><br> 
</tr></tbody>`;
    yota_newcombine_abca.innerHTML = text_of_yota_newcombine_yota_newcombine_abca;

    if (checked_region.plaphone_old !== undefined) {
        var lis_plaphone_old = "";
        lis_plaphone_old += "<tr><b>Минуты</b><br>";
        for (x in checked_region.plaphone_old.mins) lis_plaphone_old += `${checked_region.plaphone_old.mins[x][0]} минут - ${checked_region.plaphone_old.mins[x][1]} рублей<br>`;
        lis_plaphone_old += "<tr><b>Интернет</b><br>";
        for (x in checked_region.plaphone_old.gbites) lis_plaphone_old += `${checked_region.plaphone_old.gbites[x][0]} ГБ - ${checked_region.plaphone_old.gbites[x][1]} рублей<br>`;


        var text_of_yota_newcombine_old_plaphone = `<tbody> <tr><tr><hr></tr>
<tr><b>${checked_region.name}</b></tr><br> 
${lis_plaphone_old}<br></tr>
<tr><b>Опция БМП</b><br> 
Безлимитные Мобильные приложения<br>
Вконтакте, Одноклассники, Facebook, Instagram, Twitter: по ${checked_region.plaphone_old.social} руб.<br>
Skype, Viber, Whatsapp: по ${checked_region.plaphone_old.messenger} руб.<br>
Youtube: ${checked_region.plaphone_old.youtube} руб.<br>
</tr><br>
<tr><b>Опции</b><br>
Доп. пакет 100 минут: ${checked_region.voice_add_100} руб.<br>
Доп. пакет 5 Гб: ${checked_region.gb_add_5} руб.<br>
Пакет SMS: ${checked_region.sms_base} руб.</tr><br> 
<tr><b>Дополнительно</b><br>
SMS/MMS (поштучно, руб.): ${checked_region.sms_over_pack} руб.<br>
Стоимость минуты сверх пакета (руб.): ${checked_region.min_over_pack} руб</tr><br> 
</tr></tbody>`;
    }
    else  var text_of_yota_newcombine_old_plaphone = "";
    yota_newcombine_old_plaphone.innerHTML = text_of_yota_newcombine_old_plaphone;



    var text_of_yota_newcombine_unlim_tab = `<tbody> <tr><tr><hr></tr>
<tr><b>${checked_region.name}</b></tr><br> 
<tr><b>Тарифные пакеты</b><br> 
Тариф День: ${checked_region.tab_unlim.day} рублей<br>
Тариф Месяц: ${checked_region.tab_unlim.mounth} рублей<br>
Тариф Год: ${checked_region.tab_unlim.year} рублей<br> 
<tr><b>Стоимость месяца при подключении на год</b><br>  
275 рублей 
</tr><br>
<tr><b>Скидка при подключении на год: </b> ${checked_region.tab_unlim.procentas}.<br> 
<tr><b>Тетеринг</b><br>
Бесплатный тетеринг на скорости до 128 Кбит/с. Платного тетеринга нет.<br> </tr>
<tr><b>Дополнительно</b><br>
Голосовые исходящие вызовы — ${checked_region.tab_unlim.min_pag} руб. за минуту.<br>
SMS/MMS — ${checked_region.tab_unlim.sms_pag} руб. за штуку.<br>
Входящие звонки, за пределами домашнего региона — ${checked_region.tab_unlim.in_roam} руб. за минуту.<br> 
</tr></tbody>`;
    yota_newcombine_unlim_tab.innerHTML = text_of_yota_newcombine_unlim_tab;


    if (checked_region.have_modem ===  "true" ) {
        var text_of_yota_newcombine_modem = `<tbody>
            <tr><tr><hr></tr>
            <tr><b>${checked_region.name}</b></tr><br>
            <tr><b>Диапазон цен</b><br>
            ${checked_region.modem.rangeprice}</tr><br>
            <tr><b>Диапазон скоростей</b><br>
            ${checked_region.modem.rangespeed}</tr><br>
            <tr><b>Длинные тарифы</b><br>
            ${checked_region.modem.year}<br>
            </tr><tr>
            <b>Турбокнопки</b><br>
            ${checked_region.modem.turbo}<br>
            </tr><tr>
            <b>Список тарифов (30 дней)</b><br>
            ${checked_region.modem.list}
            </tr><tr>
            <b>БСД и БГ</b><br>
            ${checked_region.modem.free}<br>
            </tr></tr></tbody>`;
    } else {
        var text_of_yota_newcombine_modem = ` `;
    }
    yota_newcombine_modem.innerHTML = text_of_yota_newcombine_modem;



    ////////////////////////////////////////////////////////////////<hr> <tr><td colspan="2" align ="center" ><b> ${checked_region.name} </b></td></tr>
    var list_plaphone = "";
    list_plaphone += "<b>Минуты</b><br>";
    for (x in checked_region.plaphone.mins) list_plaphone += `${checked_region.plaphone.mins[x][0]} минут - ${checked_region.plaphone.mins[x][1]} рублей<br>`;
    list_plaphone += "<b>Интернет</b><br>";
    for (x in checked_region.plaphone.gbites) list_plaphone += `${checked_region.plaphone.gbites[x][0]} ГБ - ${checked_region.plaphone.gbites[x][1]} рублей<br>`;


    var text_of_yota_newcombine_plaphone = `<table style="width: 800px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 40%;"><col style="width: 60%;"><col style="width: 25%;"></colgroup><tbody>
 <tr><td colspan="2"  align ="center"><b> ${checked_region.name} </b></td></tr>
   <tr>
     <tr><td ><hr></td></tr><td width="100" valign="top"> ${list_plaphone} </td>
    <td  valign="top">

            <table style="width: 350px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 75%;"><col style="width: 25%;"></colgroup>  <tbody>   
            <tr><td colspan="2" align ="center"><hr></td></tr><tr><td colspan="2" align ="center"><b>Безлимитные Мобильные приложения</b><br></td></tr>
             <tr><td colspan="2" align ="center"><hr></td></tr> 
            <tr><td align ="left">Вконтакте, Одноклассники, Facebook, Instagram, Twitter:</td> <td align ="right" >по ${checked_region.plaphone.social} руб. </td></tr>
            <tr><td align ="left">Skype, Viber, Whatsapp:</td>  <td align ="right" >по ${checked_region.plaphone.messenger} руб.</td></tr> 
            <tr><td align ="left">Youtube:</td>  <td align ="right" >${checked_region.plaphone.youtube} руб.</td></tr> 
            <tr><td colspan="2" align ="center"><br><br><hr></td></tr><tr><td colspan="2" align ="center"><b>Опции</b><br></td></tr>
            <tr><td colspan="2" align ="center"><hr></td></tr> 
            <tr><td align ="left">Доп. пакет 100 минут:</td>  <td align ="right" >${checked_region.voice_add_100} руб.</td></tr> 
            <tr><td align ="left">Доп. пакет 5 Гб:</td>  <td align ="right" >${checked_region.gb_add_5} руб.</td></tr> 
            <tr><td align ="left">Пакет SMS:</td>  <td align ="right" >${checked_region.sms_base} руб.</td></tr>  
            <tr><td colspan="2" align ="center"><br><br><hr></td></tr><tr><td colspan="2" align ="center"><b>Дополнительно</b><br></td></tr> 
             <tr><td colspan="2" align ="center"><hr></td></tr> 
            <tr><td align ="left">SMS/MMS (поштучно, руб.):</td>  <td align ="right" >${checked_region.sms_over_pack} руб.</td></tr> 
            <tr><td align ="left">Стоимость минуты сверх пакета (руб.): </td>  <td align ="right" >${checked_region.min_over_pack} руб.</td></tr> 
            </tbody></table>
    
    </td>
    
    </tr></tbody></table>`;
yota_newcombine_plaphone.innerHTML = text_of_yota_newcombine_plaphone;

    var text_of_yota_newcombine_nullbalance_phone = `<table style="width: 200px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 40%;"><col style="width: 60%;"><col style="width: 25%;"></colgroup><tbody>
 
    <td width="100" valign="top" >${cur_region_teriff.dostavka} </td>
    </tbody></table>`;
    yota_newcombine_nullbalance_phone.innerHTML = text_of_yota_newcombine_nullbalance_phone;




    ////////////////////////////////////////////////////////////////
    var list_tabt = "";
    list_tabt += "<b>Минуты</b><br>";
    for (x in checked_region.tabt.mins) list_tabt += `${checked_region.tabt.mins[x][0]} минут - ${checked_region.tabt.mins[x][1]} рублей<br>`;
    list_tabt += "<b>Интернет</b><br>";
    for (x in checked_region.tabt.gbites) list_tabt += `${checked_region.tabt.gbites[x][0]} ГБ - ${checked_region.tabt.gbites[x][1]} рублей<br>`;


    var text_of_yota_newcombine_tabt = `<table style="width: 800px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 40%;"><col style="width: 60%;"><col style="width: 25%;"></colgroup> <tbody>
 <tr><td colspan="2"  align ="center"><b> ${checked_region.name} </b></td></tr>
   <tr>
    <td width="100" valign="top"> ${list_tabt} </td>
    <td  valign="top">

            <table style="width: 350px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 75%;"><col style="width: 25%;"></colgroup>  <tbody>   
             <tr><td colspan="2" align ="center"><hr></td></tr><tr><td colspan="2" align ="center"><b>Безлимитные Мобильные приложения</b><br></td></tr>
              <tr><td colspan="2" align ="center"><hr></td></tr> 
            <tr><td align ="left">Вконтакте, Одноклассники, Facebook, Instagram, Twitter:</td> <td align ="right" >по ${checked_region.tabt.social} руб. </td></tr>
            <tr><td align ="left">Skype, Viber, Whatsapp:</td>  <td align ="right" >по ${checked_region.tabt.messenger} руб.</td></tr> 
            <tr><td align ="left">Youtube:</td>  <td align ="right" >${checked_region.tabt.youtube} руб.</td></tr> 
             <tr><td colspan="2" align ="center"><br><br><hr></td></tr><tr><td colspan="2" align ="center"><b>Опции</b><br></td></tr> 
              <tr><td colspan="2" align ="center"><hr></td></tr> 
            <tr><td align ="left">Доп. пакет 100 минут:</td>  <td align ="right" >${checked_region.voice_add_100} руб.</td></tr> 
            <tr><td align ="left">Доп. пакет 5 Гб:</td>  <td align ="right" >${checked_region.gb_add_5} руб.</td></tr> 
            <tr><td align ="left">Пакет SMS:</td>  <td align ="right" >${checked_region.sms_base} руб.</td></tr>  
             <tr><td colspan="2" align ="center"><br><br><hr></td></tr><tr><td colspan="2" align ="center"><b>Дополнительно</b><br></td></tr> 
              <tr><td colspan="2" align ="center"><hr></td></tr> 
            <tr><td align ="left">SMS/MMS (поштучно, руб.):</td>  <td align ="right" >${checked_region.tabt.sms_pag} руб.</td></tr> 
            <tr><td align ="left">Стоимость минуты сверх пакета (руб.): </td>  <td align ="right" >${checked_region.tabt.voice_pag} руб.</td></tr> 
            </tbody></table>
    
    </td>
   
    </tr></tbody></table>`;
    yota_newcombine_tabt.innerHTML = text_of_yota_newcombine_tabt;

    var text_of_yota_newcombine_nullbalance_tab = `<table style="width: 200px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 25%;"><col style="width: 50%;"><col style="width: 25%;"></colgroup><tbody>
 
    <td width="100" valign="top" >${cur_region_teriff.dostavka_t} </td>
    </tbody></table>`;
    yota_newcombine_nullbalance_tab.innerHTML = text_of_yota_newcombine_nullbalance_tab;


}


//TODO Отображение условий в домашнем регионе и нет для конструторов
function VoiceTariffs(type, mins) {


    var textVoiceSMS = document.getElementById("id-Тарифы[Тест]-СтоимостьвызововиSMS_"+type).nextElementSibling;
    var textUslugi = document.getElementById("id-Тарифы[Тест]-Дополнительныеуслуги_"+type).nextElementSibling;
    textVoiceSMS.innerHTML = ""; textUslugi.innerHTML = "";
    var node = document.createElement('p');
    var node2 = document.createElement('p');
    gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_'+type+']:checked');        //Выбрано среди трафика
    mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_'+type+']:checked');        //Выбрано среди минут



    var texthtml = "";
    var texthtml2 = "";
    var dostavka = (type === type_lego[0]) ? cur_region_teriff.dostavka : cur_region_teriff.dostavka_t;
    texthtml = `<div class="table-wrap" style=""><table class="relative-table confluenceTable" style="width: 600px;"><colgroup><col style="width: 85%;"><col style="width: 15%;"></colgroup><tbody>`;
    texthtml2 = texthtml;
    if (type === type_lego[0]) {

        if (mins === "0") {
            texthtml += `
                    <tr><td class="confluenceTd">Исходящие в домашний регион на других операторов: </td><td class="confluenceTd">${cur_region_teriff.pag_voice_inbound} руб./мин.</td></tr>
                    <tr><td class="confluenceTd">Исходящие в другой регион на других операторов: </td><td class="confluenceTd">${cur_region_teriff.pag_voice} руб./мин.</td></tr>
                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd">${cur_region_teriff.pag_voice_inbound} руб./шт.</td></tr> 
                    <tr><td class="confluenceTd">Входящие вызовы (в домашнем регионе): </td><td class="confluenceTd"> Бесплатные </td></tr>
                    <tr><td class="confluenceTd">Входящие вызовы (вне домашнего региона): </td><td class="confluenceTd">${cur_region_teriff.pag_voice} руб./мин.</td></tr>
                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">${cur_region_teriff.pag_sms} руб./шт.</td></tr>
                    <tr><td class="confluenceTd" colspan="2">При подключении «дополнительных 100 минут» звонки Yota-Yota становятся бесплатными и не расходуют пакет минут, вся тарификация - как при активном пакете </td> `;
        } else {
            texthtml += `
                    <tr><td class="confluenceTd">Стоимость минуты сверх пакета на всех операторов РФ: </td><td class="confluenceTd">${cur_region_teriff.min_over_pack} руб./мин.</td></tr> 
                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd"> Не тарифицируются </td></tr> 
                    <tr><td class="confluenceTd">Входящие вызовы: </td><td class="confluenceTd"> Бесплатные </td></tr>
                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">${cur_region_teriff.sms_over_pack} руб./шт.</td></tr> `;
        }
    } else if (type === type_lego[1]) {

        if (mins === "0") {
            texthtml += `
                    <tr><td class="confluenceTd">Стоимость минуты на всех операторов РФ: </td><td class="confluenceTd">${cur_region_teriff.tabt.voice_pag} руб./мин.</td></tr> 
                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd">${cur_region_teriff.tabt.voice_pag} руб./мин.</td></tr> 
                     <tr><td class="confluenceTd" colspan="2">Входящие вызовы в любом регионе (кроме Республики Крым и г. Севастополя) — бесплатны. </td> 
                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">${cur_region_teriff.tabt.sms_pag} руб./шт.</td></tr>
                    <tr><td class="confluenceTd" colspan="2">При подключении «дополнительных 100 минут» вся тарификация - как при активном пакете </td>  `;
        } else {
            texthtml += `
                    <tr><td class="confluenceTd">Стоимость минуты сверх пакета на всех операторов РФ: </td><td class="confluenceTd">${cur_region_teriff.tabt.voice_pag} руб./мин.</td></tr> 
                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd"> Не тарифицируются </td></tr> 
                     <tr><td class="confluenceTd" colspan="2">Входящие вызовы в любом регионе (кроме Республики Крым и г. Севастополя) — бесплатны. </td> 
                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">${cur_region_teriff.tabt.sms_pag} руб./шт.</td></tr> `;
        }
    }

    // texthtml2 += `
    //                 <tr><td class="confluenceTd">Дополнительный пакет 100 минут: </td><td class="confluenceTd">${cur_region_teriff.voice_add_100} руб.</td></tr>
    //                 <tr><td class="confluenceTd">Дополнительный пакет 5 Гб: </td><td class="confluenceTd"> ${cur_region_teriff.gb_add_5} руб.</td></tr>
    //                 <tr><td class="confluenceTd">Пакет SMS: </td><td class="confluenceTd"> ${cur_region_teriff.sms_base} руб. </td></tr>
    //                 <tr><td class="confluenceTd" colspan="2"><b>Безлимитные приложения: <br></b>
    //                 Вконтакте, Одноклассники, Facebook, Instagram, Twitter: по ${cur_region_teriff[type].social} руб.<br>
    //                 Skype, Viber, Whatsapp: по ${cur_region_teriff[type].messenger} руб.<br>
    //                 Youtube: ${cur_region_teriff[type].youtube} руб.<br></td></tr>
    //                 <br><tr><td class="confluenceTd" colspan="2"><b>Доставка: <br></b>
    //                 ${dostavka}<br></td></tr> `;




    texthtml += `</tbody></table></div>`;
    // texthtml2 += `</tbody></table></div>`;
    node.innerHTML = texthtml;
    textVoiceSMS.appendChild(node);
    // node2.innerHTML = texthtml2;
    // textUslugi.appendChild(node2);



}



function initOotRussiaRates(checked_contry) {

    var yota_newcombine_outrussia = document.getElementById('yota_newcombine_outrussia');
    var countries = jsondataOutRussia.intervoice;


    countries.forEach(function (e) {
        {
            if (e.id.toString() === checked_contry) {

                var text_of_yota_newcombine_outrussia = `    <div className="b-roaming-operators-table i-bem"> 
                    <ul id="myTable_MN" className="b-roaming-operators-table__inner" style="font-size: 14px;"> 
                    <li><b style="color:#00bbf2">${e.zone}</b></li>
                    <li>Страна: ${e.name}</li>
                    <li>Исходящие вызовы: ${e.minute} р./мин.</li>
                    <li>SMS: ${e.sms} р./шт.</li>
                    <li>MMS: ${e.mms} р./шт.</li>
                    </ul>
                </div>`;
                yota_newcombine_outrussia.innerHTML = text_of_yota_newcombine_outrussia;

            }
        }
    });


//     var unlim_phone = checked_region.ph_unlim.tariffs;
//     var list_unlim_phone = "";
//     var list_unlim_phone_archived = "";
// // name = current, mins
//     unlim_phone.forEach(function (e) {
//
//         if (e.name === "current") {
//             for (x in e.mins) {
//                 list_unlim_phone += `Пакет ${e.mins[x][0]} минут - ${e.mins[x][1]} рублей<br>`;
//             }
//         } else if (e.name === "archived") {
//             for (x in e.mins) {
//                 list_unlim_phone_archived += `Пакет ${e.mins[x][0]} минут - ${e.mins[x][1]} рублей<br>`;
//             }
//         }
//
//     });









}


function initRoamingRatesProviders(checked_contry, callback) {
    var roaming = jsondataOutRussia;

    var rate = {};
    var provider = [];
    var provider_lte = [];

    let map = new Map(roaming.countries.map(el=>[el.id,el]));
    rate = map.get(checked_contry);
    provider_lte.push( roaming.providers_lte.filter(function(a){ return a.id === checked_contry }));
    provider.push( roaming.providers.filter(function(a){ return a.id === checked_contry }));

    var current_country_provider = {rate: rate, provider: provider, provider_lte: provider_lte};
    callback.call(current_country_provider);
}


function initRoamingRates(checked_contry) {


    checked_contry = this;
    switch (checked_contry.rate.status) {
        case "closed": returnInfoBlock("warning", "В данной стране нет подключения к сети, роуминг закрыт"); break;
        case "no_inet": returnInfoBlock("warning", "В данной стране нет доступа к интернету"); break;
        default: returnInfoBlock("clear", ""); break;
    }


    var yota_newcombine_roaming_providers = document.getElementById('yota_newcombine_roaming_providers');
    var yota_newcombine_roaming_providers_lte = document.getElementById('yota_newcombine_roaming_providers_lte');
    var yota_newcombine_roaming = document.getElementById('yota_newcombine_roaming');


                var text_of_yota_newcombine_roaming = `    <div className="b-roaming-operators-table i-bem">              <tbody> 
            <tr><b>${checked_contry.rate.name}</b></tr><br>
            <tr><b>Интернет.</b><br>
            Стоимость 1 мегабайта при наличии подключенного пакета: ${checked_contry.rate.mb_price} руб. Тарификация по 100 КБ.<br>
            После использования ${checked_contry.rate.paid_mb} платных МБ, ${checked_contry.rate.free_mb} МБ - бесплатно.</tr><br>
            <tr><b>Звонки.</b><br>
            <br>Стоимость входящих звонков: ${checked_contry.rate.invoice} руб./мин.<br>
            Стоимость опции "30 минут бесплатных входящих в день": ${checked_contry.rate.m30min} руб.</tr><br>
            <tr>Минута: <ul> 
            <li>исходящих звонков в РФ: ${checked_contry.rate.out_rf} руб.</li>
            <li>исходящих звонков внутри страны: ${checked_contry.rate.out_country} руб.</li>
            <li>исходящих звонков в другие страны: ${checked_contry.rate.out_other} руб. </li>
            </ul><b>SMS</b> (включая бесплатные в РФ номера): <ul>
            <li>исходящие: ${checked_contry.rate.out_sms} руб.</li>
            <li>входящие : ${checked_contry.rate.in_sms} руб.</li>
            </ul><b>MMS</b>: <ul>
            <li>исходящие: ${checked_contry.rate.out_mms}</li>
            <li>входящие: Стоимость интернет-сессии.</li></ul>
            </tr><tr><br>Стоимость 1 Мб, если не оплачен основной пакет (Базовый, Региональный, ...): ${checked_contry.rate.mb_base} руб.<br>
            Стоимость минуты исходящих звонков на спутниковые сети (Thuraya, Inmarsat,...): 313 руб./мин.</tr></tr></tbody>  </table></div>`;
                yota_newcombine_roaming.innerHTML = text_of_yota_newcombine_roaming;

    var operators = "";
    var providers = checked_contry.provider[0];


    for (var i = 0; i < providers.length; i++) {
        operators += `<tr><b>${checked_contry.rate.name}</b></tr><br> `;
       var p = providers[i].providers;
       if (providers[i].name !=="") operators += `<tr><b>${providers[i].name}</b></tr><br> `;
          for (var x in p) {
              operators += `<tr>${p[x]}</tr><br> `;
          }
    }

    var text_of_yota_newcombine_roaming_providers = ` 
            <tbody> 
            ${operators}
            </tbody> `;
    yota_newcombine_roaming_providers.innerHTML = text_of_yota_newcombine_roaming_providers;


    var operators_lte = "";
    var providers_lte = checked_contry.provider_lte[0];


    for (var i = 0; i < providers_lte.length; i++) {
        operators_lte += `<tr><b>${providers_lte[i].name}</b></tr><br> `;
        var p = providers_lte[i].providers;
        for (var x in p) {
            operators_lte += `<tr>${p[x]}</tr><br> `;
        }
    }

    var text_of_yota_newcombine_roaming_providers_lte = ` 
            <tbody> 
            ${operators_lte}
            </tbody> `;
    yota_newcombine_roaming_providers_lte.innerHTML = text_of_yota_newcombine_roaming_providers_lte;


    var element_yota_newcombine_roaming_providers_lte = document.querySelector('li.menu-item.bv-localtab a[href*="roaming_providers_lte"]');
    if (operators_lte === "") {
        element_yota_newcombine_roaming_providers_lte.style.opacity = 0.3;
    } else {element_yota_newcombine_roaming_providers_lte.style.opacity = 1;}


    var element_yota_newcombine_roaming_providers = document.querySelector('li.menu-item.bv-localtab a[href*="roaming_providers"]');
    if (operators === "") {
        element_yota_newcombine_roaming_providers.style.opacity = 0.3;
    } else {element_yota_newcombine_roaming_providers.style.opacity = 1;}

}













function KeyPress(e) {
    var evtobj = window.event? event : e
    if ((evtobj.keyCode === 70 && evtobj.ctrlKey) || (evtobj.keyCode === 70)) {
        customTemplates.showDropdown();

        setTimeout( function(){
            $('input.choices__input.choices__input--cloned').focus();
        }, 300 );


    }

}






document.onkeydown = KeyPress;
document.onreadystatechange = function() {
    if (document.readyState === 'complete') {

        //var textVoiceSMS = document.getElementById("yota_newcombine_notebnote");
        // textVoiceSMS.innerHTML =
        //fn();
    }
};



