'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////https://pogoda.yandex.ru/static/cities.xml


var customTemplates;
var searchOutRussia;
var searchRoaming;
var jsondata = {};
var jsondataOutRussia;
var init_rate_russia = void 0;
var init_rate_outrussia = void 0;

var enableAutoOpenRegion = true;

function StartInit() {

    Promise.all(rate_russia2.map(httpGet)).then(function (results) {
        jsondata.regions = results[0];
        jsondata.abca = results[1];
        jsondata.abcb = results[2];
        jsondata.modem = results[3];
        jsondata.plaphone = results[4];
        jsondata.plaphone_old = results[5];
        jsondata.tab_unlim = results[6];
        jsondata.tabt = results[7];
        jsondata.ph_unlim = results[8];
        jsondata.delivery = results[9];
        importRateRussia.call(jsondata);
    });

    init_rate_outrussia = new Initialization(rate_outrussia); //Инициализация условий МНР и Мнзвонков
    getJSON(rate_outrussia, importRateOutRussia); //Загрузка JSON условий, передача в обработчик
}

includeUserTemplate();

function httpGet(url) {

    return new Promise(function (resolve, reject) {

        var xmlRequest = $.ajax({
            method: "GET",
            url: url,
            timeout:4000,
            dataType: 'json',

            complete: function(jqXHR, textStatus) {
                if (textStatus === 'success') {
                    //debug.log( 'JSON', 'Успешно.');
                }
                if (textStatus === 'error') {
                    //debug.log('JSON' , 'Ошибка.');
                }
            },
            // success(data, textStatus, jqXHR):function
        });


        //TODO: TODO REQUESTS
        xmlRequest.done(function( msg ) {
            resolve(msg);

        });
        xmlRequest.fail(function( jqXHR, textStatus ) {
            //var error = new Error(textStatus);
            //error.code = this.status;
            //reject(error);
            debug.log( "JSON"," Request failed: " + textStatus );
        });
        debug.log( "JSONS"," Data Saved: " );
    });
}

var Initialization = function () {
    function Initialization(link) {
        _classCallCheck(this, Initialization);

        this.link = link;
        this.jsondata = {};
    }

    // геттер


    _createClass(Initialization, [{
        key: 'setData',
        value: function setData(value) {
            this.jsondata = value;
        }
    }, {
        key: 'data',
        get: function get() {
            return this.jsondata;
        },
        set: function set(newValue) {
            var copy = Object.assign({}, newValue);
            this.jsondata = copy;
        }
    }, {
        key: 'getLink',
        get: function get() {

            return this.link;
        }
    }]);

    return Initialization;
}();

//Получение JSON


function getJSON(link, callback, params) {

    var xmlRequest = $.ajax({
        method: "GET",
        url: link,
        timeout:4000,
        dataType: 'json',
    });


    //TODO: TODO REQUESTS
    xmlRequest.done(function( msg ) {
        callback.call(msg, params);
        debug.log( "getJSON",": Data Saved: " );
    });
    xmlRequest.fail(function( jqXHR, textStatus ) {
        debug.log( "getJSON",": Request failed: " + textStatus );
    });

}

//Ввод данных в РФ.
function importRateRussia(jsondatas) {

    customTemplates.enable();
    var choices1212 = [];
    var regions = jsondata.regions;
    customTemplates.clearStore();
    regions.forEach(function (item, i, arr) {
        {
            choices1212.push({
                value: regions[i].id.toString(),
                label: regions[i].name + " (" + regions[i].city + ") ",
                disabled: false,
                customProperties: { description: regions[i].keywords }
            });
        }
    });
    customTemplates.setChoices(choices1212, 'value', 'label', 0);
    checkParams(choiseRegionbylink);
}

function importRateOutRussia(jsondatas) {

    jsondataOutRussia = this;

    searchOutRussia.enable();
    searchOutRussia.clearStore();
    var listOutRussia = [];
    var OutRussia = jsondataOutRussia.intervoice;
    OutRussia.forEach(function (e) {
        {
            listOutRussia.push({
                value: e.id.toString(),
                label: e.name + " (" + e.zone + ") ",
                disabled: false,
                customProperties: { description: e.name + " (" + e.zone + ") " }
            });
        }
    });
    searchOutRussia.setChoices(listOutRussia, 'value', 'label', 0);
    searchOutRussia.placeholderValue = dictionaries.outplaceholderValue;

    searchOutRussia.searchPlaceholderValue = dictionaries.searchPlaceholderValue;

    searchRoaming.enable();
    searchRoaming.clearStore();
    var listRoaming = [];
    var Roaming = jsondataOutRussia.countries;
    Roaming.forEach(function (e) {
        {
            listRoaming.push({
                value: e.id.toString(),
                label: e.name,
                disabled: false,
                customProperties: { description: e.name }
            });
        }
    });
    searchRoaming.setChoices(listRoaming, 'value', 'label', 0);
}

$(window).ready(function () {

    debug.log("loaded");
});

function returnInfoBlock(type, text) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var block = arguments[3];

    block = block === undefined ? 0 : block;
    var htmlcode = '';
    var ttitle = '';
    if (title !== "") {
        ttitle = '<p class="title">' + title + '</p>';
    }

    var alertw = document.querySelectorAll('div.yota_newcombine_search_alt');

    var alert2 = alertw[block].querySelectorAll('div[class="yota_newcombine_notebnote"]');

    for (var x in alert2) {
        if (alert2.length > 0) alert2[x].innerHTML = "";
    }

    //<p className="title">Блаблабла</p>
    switch (type) {
        case "warning":
            htmlcode = '<div class="confluence-information-macro confluence-information-macro-warning conf-macro output-block" data-hasbody="true" data-macro-name="warning">' + ttitle + '<span class="aui-icon aui-icon-small aui-iconfont-error confluence-information-macro-icon"> </span><div class="confluence-information-macro-body"><p>' + text + '</p></div></div>';
            break;

        case "tip":
            htmlcode = '<div class="confluence-information-macro confluence-information-macro-tip conf-macro output-block" data-hasbody="true" data-macro-name="tip">' + ttitle + '<span class="aui-icon aui-icon-small aui-iconfont-approve confluence-information-macro-icon"> </span><div class="confluence-information-macro-body"><p>' + text + '</p></div></div>';
            break;

        case "note":
            htmlcode = '<div class="confluence-information-macro confluence-information-macro-note conf-macro output-block" data-hasbody="true" data-macro-name="note">' + ttitle + '<span class="aui-icon aui-icon-small aui-iconfont-warning confluence-information-macro-icon"> </span><div class="confluence-information-macro-body"><p>' + text + '</p></div></div>';
            break;

        case "info":
            htmlcode = '<div class="confluence-information-macro confluence-information-macro-information conf-macro output-block" data-hasbody="true" data-macro-name="info">' + ttitle + '<span class="aui-icon aui-icon-small aui-iconfont-info confluence-information-macro-icon"> </span><div class="confluence-information-macro-body"><p>' + text + '</p></div></div>';
            break;
        case "clear":
            htmlcode = '';

    }

    if (type !== "clear") {
        var elem = document.createElement('div');
        elem.className = "yota_newcombine_notebnote";
        elem.innerHTML = htmlcode;
        alertw[block].appendChild(elem);
    }
}

function createLegoBlock(type, callback) {
    var Template =
        '<div class="yota_newcombine_d-table">\
                <div class="yota_newcombine_d-tr yota_new_style">\
                    <div class="yota_newcombine_d-td yota_newcombine_no-p">\
                        <div class="yota_newcombine_d-table">\
                            <div class="yota_newcombine_d-tr">\
                                <div class="yota_newcombine_d-td">\
                            <textarea readonly class="yota_newcombine_b_summary_tarif_text pretextselect" id="yota_newcombine_b_tafir_summary_input_{{type}}" placeholder="{{textAreahold}}" onmousedown="mDown(this)" onmouseup="mUp(this)" onmouseover="mOver(this)" onmouseout="mOut(this)"></textarea>\
                              <div id="yota_copy_icon" onclick=\'copyTextRate(this)\'>  <label id="yota_copy_text" > </label></div>\
                        </div>\
                    </div>\
                    <div class="yota_newcombine_d-tr">\
                        <div class="yota_newcombine_d-td">\
                            <textarea readonly class="yota_newcombine_b_summary_tarif_text" id="yota_newcombine_b_tafir_summary_input1_{{type}}" placeholder="  " onmousedown="mDown(this)" onmouseup="mUp(this)" onmouseover="mOver(this)" onmouseout="mOut(this)"></textarea>\
                        </div>\
                    </div>\
                </div> \
            </div> \
            <div class="yota_newcombine_d-td yota_newcombine_no-p" > \
                <div  id="tapps_{{type}}" class="divTableCell"  >\
                    <div class="divTable">\
                    <div  class="yota_newcombine_divider" >    \
                        <div class="divTableBody yota_new_style_apps">\
                            <div class="divTableRow ">\
                                <input id="app-all_{{type}}" class="input_app-all" type="checkbox" name="select_apps_all_{{type}}" value="0" onchange=\'updateLegoInfo(this, "{{type}}")\'">   <label for="app-all_{{type}}" class="layout-buttons_gb">{{mainLabelApp}}</span></label>\
                                <% social.forEach(function(item) { %>\
                                <div class="divTableCell">\
                                    <input data-name="<%-item[0]%>" id="app-<%-item[0]%>_{{type}}" class="input_app-<%-item[0]%>" type="checkbox" name="select_apps_{{type}}" value="<%-item[1]%>" onchange=\'updateLegoInfo(this, "{{type}}")\'">  \
                                    <label for="app-<%-item[0]%>_{{type}}" class="layout-buttons"><span> <div data-name="<%-item[0]%>" class="b-voice-calculator__application-icon"> \
                                       <div class="b2c-voice-collect__app-price" data-name="app-social_{{type}}" data-for="<%-item[0]%>_{{type}}"  tooltip-position=\'left\'> <div class="b2c-voice-collect__app-price_text"> 20&#8381; </div> </div>   \
                                       </div></span></label>\
                                </div> \
                                <% }); %>\
                                 </div>\
                            <div class="divTableRow">\
                                 <% messenger.forEach(function(item) { %>\
                                <div class="divTableCell">\
                                    <input data-name="<%-item[0]%>" id="app-<%-item[0]%>_{{type}}" class="input_app-<%-item[0]%>" type="checkbox" name="select_apps_{{type}}" value="<%-item[1]%>" onchange=\'updateLegoInfo(this, "{{type}}")\'">  \
                                    <label for="app-<%-item[0]%>_{{type}}" class="layout-buttons"><span> <div data-name="<%-item[0]%>" class="b-voice-calculator__application-icon"> \
                                       <div class="b2c-voice-collect__app-price" data-name="app-social_{{type}}" data-for="<%-item[0]%>_{{type}}"  tooltip-position=\'left\'> <div class="b2c-voice-collect__app-price_text"> 20&#8381; </div> </div>   \
                                       </div></span></label>\
                                </div> \
                                <% }); %>\
                            </div>\
                            <div class="divTableRow">\
                                 <% media.forEach(function(item) { %>\
                                <div class="divTableCell">\
                                    <input data-name="<%-item[0]%>" id="app-<%-item[0]%>_{{type}}" class="input_app-<%-item[0]%>" type="checkbox" name="select_apps_{{type}}" value="<%-item[1]%>" onchange=\'updateLegoInfo(this, "{{type}}")\'">  \
                                    <label for="app-<%-item[0]%>_{{type}}" class="layout-buttons"><span> <div data-name="<%-item[0]%>" class="b-voice-calculator__application-icon"> \
                                       <div class="b2c-voice-collect__app-price" data-name="app-social_{{type}}" data-for="<%-item[0]%>_{{type}}"  tooltip-position=\'left\'> <div class="b2c-voice-collect__app-price_text"> 20&#8381; </div> </div>   \
                                       </div></span></label>\
                                </div> \
                                <% }); %>\
                            </div>\
                            <div class="divTableRow">\
                                <% other.forEach(function(item) { %>\
                                <div class="divTableCell">\
                                    <input data-name="<%-item[0]%>" id="app-<%-item[0]%>_{{type}}" class="input_app-<%-item[0]%>" type="checkbox" name="select_apps_{{type}}" value="<%-item[1]%>" onchange=\'updateLegoInfo(this, "{{type}}")\'">  \
                                    <label for="app-<%-item[0]%>_{{type}}" class="layout-buttons"><span> <div data-name="<%-item[0]%>" class="b-voice-calculator__application-icon"> \
                                       <div class="b2c-voice-collect__app-price" data-name="app-social_{{type}}" data-for="<%-item[0]%>_{{type}}"  tooltip-position=\'left\'> <div class="b2c-voice-collect__app-price_text"> 20&#8381; </div> </div>   \
                                       </div></span></label>\
                                </div> \
                                <% }); %>\
                            </div>\
                        </div> \
                         </div>\
                    </div>\
                </div> \
            </div> \
            <div id="tminute_{{type}}" class="divTableCell"  > \
               <div id="tminute_{{type}}_child" class="divTableCell"  >  </div>\
            </div> \
            <div id="tgbite_{{type}}" class="divTableCell" >\
                <div id="tgbite_{{type}}_child" class="divTableCell"  >  </div> \
            </div> \
        </div>\
    </div>  \
        <h2 id="{{idHeaderVoicePrice}}{{type}}">{{idHeaderVoicePriceText}}</h2><p> </p> \
        <h2 id="{{idHeaderAdding}}{{type}}">{{idHeaderAddingText}}</h2><p> </p>';

    var tmpl = _.template(TemplateFunction(Template));

    var data = {
        type: type,
        idHeaderVoicePriceText: dictionaries.idHeaderVoicePriceText,
        idHeaderAddingText: dictionaries.idHeaderAddingText,
        idHeaderVoicePrice: dictionaries.idHeaderVoicePrice,
        idHeaderAdding: dictionaries.idHeaderAdding,
        mainLabelApp: dictionaries.mainLabelApp,
        textAreahold: dictionaries.textAreahold,
        social: [ ["vk",1],["ig",4],["fb",3],["ok",2],["tw",5]],//<%-item%>
        messenger: [["vi",7],["wh",8],["sk",6]],//<%-item%>
        media: [["yt",9]],//<%-item%>
        other: [["sm",10]],//<%-item%>
        // <% items.forEach(function(item) { %>
        //     <li><%-item%></li>
        //     <% }); %>
        //<ul>\
        //   <% for (var i=1; i<=count; i++) { %> \
        //     <li><%=i%></li> \
        //   <% } %>\
        // </ul>
    };


    document.getElementById('yota_newcombine_legoyota_' + type).innerHTML = tmpl(data);

    callback.call();
}

function initRange() {
    var range = $('.input-range'),
        value = $('.range-value');

    range.attr('max', listTemplates.length - 1);
    value.html(listTemplates[range.attr('value')].name);

    range.on('input', function () {
        value.html('' + listTemplates[this.value].name);
        for (var x in listTemplates) {
            if (this.value === x) value.html('' + listTemplates[x].name);
            PhraseUpdate(null);
        }
    });
}

//
//TODO: ШАБЛОНИЗАТОР
//
//

function concateApps(Checked, Rate, Sym, LastSym) {
    LastSym = LastSym == undefined ? Sym : LastSym;
    var texttemp = "";

    for (var x in Checked) {
        for (var y in Rate) {
            if (Rate[y].id === Checked[x]) {
                if (Checked.length > 1) {
                    switch (x) {
                        case "0":
                            texttemp += '' + Rate[y].name;break;
                        case (Checked.length - 1).toString():
                            texttemp += '' + LastSym + Rate[y].name;
                            break;
                        default:
                            texttemp += '' + Sym + Rate[y].name;break;
                    }
                } else if (Checked.length === 1) {
                    texttemp += '' + Rate[y].name;
                }
            }
        }
    }

    return texttemp;
}

function concateSms(SmsStatus, Rate, Sym) {
    var texttemp = "";
    if (SmsStatus) {
        for (var y in Rate) {
            if (Rate[y].id === "sm") {
                texttemp = '' + Sym + Rate[y].name;
            }
        }
    }
    return texttemp;
}

function ToProcessText(cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, cur_sum, Rate, SmsStatus, Phrases, Checked, templates) {
    //TODO: шаблон
    if (templates.length !== 1) {
        var Template = "";
        // Минуты\Трафик\SMS\БМП
        if (cur_mCount === "0" && cur_gCount === "0" && Checked.length === 0 && !SmsStatus) {
            Template = "Не выбрано";
        } else if (cur_mCount === "0" && cur_gCount === "0" && Checked.length === 0 && SmsStatus) {
            Template = templates[8];
        } else if (cur_mCount !== "0" && cur_gCount === "0" && Checked.length === 0 && !SmsStatus) {
            Template = templates[9];
        } else if (cur_mCount !== "0" && cur_gCount === "0" && Checked.length === 0 && SmsStatus) {
            Template = templates[10];
        } else if (cur_mCount === "0" && cur_gCount === "0" && Checked.length > 0 && !SmsStatus) {
            Template = templates[11];
        } else if (cur_mCount === "0" && cur_gCount === "0" && Checked.length > 0 && SmsStatus) {
            Template = templates[12];
        } else if (cur_mCount !== "0" && cur_gCount === "0" && Checked.length > 0 && !SmsStatus) {
            Template = templates[13];
        } else if (cur_mCount !== "0" && cur_gCount === "0" && Checked.length > 0 && SmsStatus) {
            Template = templates[14];
        } else if (cur_mCount === "0" && cur_gCount !== "0" && Checked.length === 0 && !SmsStatus) {
            Template = templates[2];
        } else if (cur_mCount === "0" && cur_gCount !== "0" && Checked.length === 0 && SmsStatus) {
            Template = templates[7];
        } else if (cur_mCount === "0" && cur_gCount !== "0" && Checked.length > 0 && !SmsStatus) {
            Template = templates[1];
        } else if (cur_mCount === "0" && cur_gCount !== "0" && Checked.length > 0 && SmsStatus) {
            Template = templates[4];
        } else if (cur_mCount !== "0" && cur_gCount !== "0" && Checked.length > 0 && !SmsStatus) {
            Template = templates[6];
        } else if (cur_mCount !== "0" && cur_gCount !== "0" && Checked.length > 0 && SmsStatus) {
            Template = templates[0];
        } else if (cur_mCount !== "0" && cur_gCount !== "0" && Checked.length === 0 && !SmsStatus) {
            Template = templates[3];
        } else if (cur_mCount !== "0" && cur_gCount !== "0" && Checked.length === 0 && SmsStatus) {
            Template = templates[5];
        }
    } else {
        Template = templates[0];
    }

    var search = ["{{", "}}"];
    var replaceTo = ['<%=', '%>'];
    for (var t = 0; t < search.length; t++) {
        Template = Template.replace(new RegExp(search[t], 'g'), replaceTo[t]);
    }

    var searchIN = [Checked.length, cur_mCount, cur_gCount, SmsStatus];
    var replaceIN = ['APP', 'MIN', 'GB', 'SMS'];
    for (var t = 0; t < searchIN.length; t++) {
        if (searchIN[t] > 0 || searchIN[t]) {

            if (t === 0) {
                var forRaplace = Checked.length !== 1 ? "$2" : Checked.length === 1 && Checked[0] === "ok" ? "$2" : "$1";
                Template = Template.replace(new RegExp('\\(\\((.*?)(?:\\|)(.*?)\\)\\)', 'g'), forRaplace);
            }
            Template = Template.replace(new RegExp('\\[\\[(' + replaceIN[t] + '?)(?:\\:)(.*?)\\]\\]', 'g'), "$2");
        } else {
            Template = Template.replace(new RegExp('\\[\\[(' + replaceIN[t] + '?)(?:\\:)(.*?)\\]\\]', 'g'), "");
        }
    }

    var tmpl = _.template(Template);

    var data = {
        SMS1: concateSms(SmsStatus, Rate, ""),
        n: '\n',
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
        sm: ""

    };
    return tmpl(data);
}

// window.addEventListener("load", function(event) {
function checkParams(callback, callback2) {
    debug.log("All resources finished loading!");
    var params = window.location.search.replace('?', '').split('&').reduce(function (p, e) {
        var a = e.split('=');
        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
    }, {});
    if (params['region'] !== undefined) {

        getJSON(mf_id_ratio, callback, params['region'], callback2);
        if (params['random'] !== undefined && params['random'] === "true") {

            setTimeout(function () {
                callbackLink();
                var elm = document.querySelector('span[class="aui-header-logo-device"]');
                elm.className = "new_aui-header-logo-device";
                elm.style.fontSize = "12px";
                elm.innerHTML = dictionaries.logoText;
                document.querySelector('#header .aui-header').style.backgroundColor = "#00aeef";
                document.querySelector('#header').style.backgroundColor = "#00aeef";
                $('html, body').animate({ scrollTop: $(".yota_newcombine_search_alt").offset().top }, 500); // анимируем скроолинг к элементу scroll_el
            }, 500);
        }
    }
    if (params['settemplate'] !== undefined) {
        OpenTemplateSaver();
    }
    // });
}

function callbackLink(eto) {
    for (var x in type_lego) {
        var type = type_lego[x];
        var _mins = legorates[type].mins;
        var _gbites = legorates[type].gbites;
        randomLegoInfo("update", type, _mins.length, _gbites.length);
    }
}

var CheckedRegion = function () {
    function CheckedRegion(id) {
        _classCallCheck(this, CheckedRegion);

        this.id = id;
    }

    _createClass(CheckedRegion, [{
        key: 'getRegion',
        get: function get() {
            return this.id;
        }
    }, {
        key: 'setRegion',
        set: function set(newValue) {
            this.id = newValue;
        }
    }]);

    return CheckedRegion;
}();

var checkedRegionsId;
function choiseRegionbylink(region) {
    var obj = this.megafon_id;
    var reg1;
    // var reg1 = obj.find(x => x.region_id === region).id;
    for (var x in obj) {
        if (obj[x].region_id === region.toString()) {
            reg1 = obj[x].id;
        }
    }
    debug.log(reg1);
    checkedRegionsId = new CheckedRegion(reg1);
    debug.log(checkedRegionsId.getRegion);
    customTemplates.setValueByChoice(checkedRegionsId.getRegion);
    initLegoRates(checkedRegionsId.getRegion, initOtherRates);
}

function saveTemplate() {

    var expression = document.getElementById("yota_newcombine_b_tafir_template").value;
    if (!!expression) {
        localStorage.removeItem("hipchat.emoticons.data");
        localStorage.setItem("userTemplate", expression);
    } else {
        localStorage.removeItem("userTemplate");
    }
}
function includeUserTemplate() {
    var temp = localStorage.getItem("userTemplate");
    if (!!temp) {
        var obj = {
            name: "Пользовательский",
            phrases: [temp]
        };

        listTemplates.push(obj);
    } else {
        if (listTemplates[listTemplates.length - 1].name === "Пользовательский") {
            listTemplates.splice(listTemplates.length - 1, 1);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {

    StartInit(); //Общая инициализация
    initRange();

    //инициализация поисковой строки
    customTemplates = customTemplates = new Choices(document.getElementById('regions_call'), {
        searchFields: ['customProperties.description'],
        placeholderValue: dictionaries.placeholderValue,
        searchPlaceholderValue: dictionaries.searchPlaceholderValue,
        placeholder: true,
        loadingText: 'Loading...',
        noResultsText: dictionaries.noResultsText,
        noChoicesText: dictionaries.noChoicesText,
        itemSelectText: dictionaries.itemSelectText,
        renderChoiceLimit: -1,
        searchEnabled: true,
        searchChoices: true,
        searchFloor: 2,
        searchResultLimit: 4,
        position: 'bottom',
        shouldSort: true,
        prependValue: null,
        appendValue: null,
        callbackOnCreateTemplates: function callbackOnCreateTemplates(strToEl) {
            var classNames = this.config.classNames;
            var itemSelectText = this.config.itemSelectText;
            return {
                item: function item(data) {
                    return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(data.highlighted ? classNames.highlightedState : classNames.itemSelectable) + '"\
                  data-item\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.active ? 'aria-selected="true"' : '') + '\
                  ' + String(data.disabled ? 'aria-disabled="true"' : '') + '\
                  >\
                  <span style="margin-right:1px;"/> ' /*+ ' [<b>'  + String(data.groupId) + '</b>] ' */ + String(data.label) + ' ' + '\
                </div>\
              ');
                },
                choice: function choice(data) {
                    return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable) + '"\
                  data-select-text="' + String(itemSelectText) + '"\
                  data-choice \
                  ' + String(data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable') + '\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.groupId > 0 ? 'role="treeitem"' : 'role="option"') + '\
                  >\
                  <span style="margin-right:1px;"/> ' /*+ ' [<b>'  + String(data.groupId) + '</b>] ' */ + String(data.label) + ' ' + '\
                </div>\
              ');
                }
            };
        }
    });

    //евернт на изменение региона
    customTemplates.passedElement.addEventListener('change', function (e) {
        initLegoRates(e.detail.value, initOtherRates); //Загрузка JSON условий в РФ, передача в обработчик
    });

    searchOutRussia = new Choices(document.getElementById('countries_call'), {
        placeholderValue: dictionaries.roamplaceholderValue,
        searchPlaceholderValue: dictionaries.searchPlaceholderValue,
        placeholder: true
        //searchFields: ['label', 'value', 'customProperties.description'],
    });
    //евернт на изменение региона
    searchOutRussia.passedElement.addEventListener('change', function (e) {
        initOotRussiaRates(e.detail.value);
    });

    searchRoaming = new Choices(document.getElementById('roaming_call'), {
        placeholderValue: dictionaries.roamplaceholderValue,
        searchPlaceholderValue: dictionaries.searchPlaceholderValue,
        placeholder: true,
        searchFields: ['label', 'value', 'customProperties.description']
    });
    //евернт на изменение региона
    searchRoaming.passedElement.addEventListener('change', function (e) {
        initRoamingRatesProviders(e.detail.value, initRoamingRates);
    });

    if (checkedRegionsId !== undefined) customTemplates.setValueByChoice(checkedRegionsId.getRegion);
});

function VisibleClearBody(type) {

    var gchecks = document.querySelectorAll('input[type="radio"][name="radio_trafic_' + type + '"]');
    var mchecks = document.querySelectorAll('input[type="radio"][name="radio_minute_' + type + '"]');
    var appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps_' + type + '"]');

    document.getElementById("yota_newcombine_" + type).innerHTML = "";
    document.getElementById("yota_newcombine_nullbalance_" + type).innerHTML = "";
    document.getElementById("yota_newcombine_b_tafir_summary_input1_" + type).innerHTML = "";
    document.getElementById("yota_newcombine_b_tafir_summary_input1_" + type).innerHTML = "";
    document.getElementById("yota_newcombine_b_tafir_summary_input_" + type).innerHTML = "";
    document.getElementById("tminute_" + type).innerHTML = "";
    document.getElementById("tgbite_" + type).innerHTML = "";
    document.getElementById(dictionaries.idHeaderVoicePrice + type).nextElementSibling.innerHTML = "Выбери тариф и регион";
    document.getElementById(dictionaries.idHeaderAdding + type).nextElementSibling.innerHTML = "";
    // gchecks.forEach(function (item, i, arr) {
    //     if (gchecks[i].checked) gchecks[i].checked = false;
    // });
    // mchecks.forEach(function (item, i, arr) {
    //     if (mchecks[i].checked) mchecks[i].checked = false;
    // });
    // appitems.forEach(function (item, i, arr) {
    //     if (appitems[i].checked) appitems[i].checked = false;
    // });
    for (var x in gchecks){
        if (gchecks[x].checked) gchecks[x].checked = false;
    }
    for (var x in mchecks){
        if (mchecks[x].checked) mchecks[x].checked = false;
    }
    for (var x in appitems){
        if (appitems[x].checked) appitems[x].checked = false;
    }



    document.getElementById("yota_newcombine_legoyota_" + type).style.display = "block";
    document.getElementById("yota_newcombine_legoyota_" + type).style.visibility = "visible";
    document.getElementById("tminute_" + type).style.visibility = "visible";
    document.getElementById("tgbite_" + type).style.visibility = "visible";

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

{
    var mOver = function mOver(obj) {};

    var mOut = function mOut(obj) {};

    var mDown = function mDown(obj) {};

    var mUp = function mUp(obj) {};
}

var selected_items = []; //id чекнутых бмп

var SaveCheckedData = function () {
    function SaveCheckedData(type, cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, options, cheks) {
        _classCallCheck(this, SaveCheckedData);

        this.type = type;
        this.cur_mCount = cur_mCount;
        this.cur_mPrice = cur_mPrice;
        this.cur_gCount = cur_gCount;
        this.cur_gPrice = cur_gPrice;
        this.options = options;
        this.cheks = cheks;
    }
    // геттер


    _createClass(SaveCheckedData, [{
        key: 'data',
        get: function get() {
            return {
                type: this.type, cur_mCount: this.cur_mCount, cur_mPrice: this.cur_mPrice,
                cur_gCount: this.cur_gCount, cur_gPrice: this.cur_gPrice, options: this.options,
                cheks: this.cheks
            };
        }

        // сеттер
        ,
        set: function set(newValue) {
            this.type = newValue.type;
            this.cur_mCount = newValue.cur_mCount;
            this.cur_mPrice = newValue.cur_mPrice;
            this.cur_gCount = newValue.cur_gCount;
            this.cur_gPrice = newValue.cur_gPrice;
            this.options = newValue.options;
            this.cheks = newValue.cheks;
            //[this.firstName, this.lastName] = newValue.split(' ');
        }
    }]);

    return SaveCheckedData;
}();

var tempForSummary = {};
//функция вывода данных в первое окно при выделении опций (plaphone)
function summaryOutput(type, cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, options) {
    var reducer = function reducer(accumulator, currentValue) {
        return accumulator + currentValue;
    };
    var text,
        text1 = "";
    var cur_sum_app = [];
    var cur_sum = Number(Number(cur_mPrice) + Number(cur_gPrice));
    var gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_' + type + '"]:checked');
    var mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_' + type + '"]:checked');
    var appcheck = document.querySelectorAll('input[type="checkbox"][name="select_apps_' + type + '"]:checked');
    var smscheck = document.querySelectorAll('input[type="checkbox"][name="select_sms_' + type + '"]:checked');
    var appall = document.querySelector('input[type="checkbox"][name="select_apps_all_' + type + '"][value="0"]'); //галочка "все"
    if (appcheck.length === 0) selected_items = [];

    if (cur_mCount !== undefined) VoiceTariffs(type, cur_mCount);
    var tempobj = {};

    if (tempForSummary[type] == undefined) tempForSummary[type] = new SaveCheckedData(type, cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, options, cur_region_teriff[type].cheks);

    if (cur_mCount == undefined || cur_mPrice == undefined || cur_gCount == undefined || cur_gPrice == undefined) {
        tempobj = tempForSummary[type].data;
        cur_mCount = tempobj.cur_mCount;
        cur_mPrice = tempobj.cur_mPrice;
        cur_gCount = tempobj.cur_gCount;
        cur_gPrice = tempobj.cur_gPrice;
    }

    var sample = "";
    var SmsStatus = smscheck.length === 1;

    var appt = []; //Checked apps


    var temp4 = "";
    for (var app in appcheck){
        if (app < appcheck.length)   {
            appt.push(appcheck[app].getAttribute("data-name"));
            temp4 += appcheck[app].getAttribute("data-name") + " " + OptionsPhrases[appcheck[app].getAttribute("data-name")] + "\n";
        }

    }
    // appcheck.forEach(function (app) {
    //     appt.push(app.getAttribute("data-name"));
    //     temp4 += app.getAttribute("data-name") + " " + OptionsPhrases[app.getAttribute("data-name")] + "\n";
    // });

    var sum_apps = 0;
    if (appt.length > 0) {
        for (var x in appt) {
            for (var y in cur_region_teriff[type].cheks) {
                if (cur_region_teriff[type].cheks[y].id === appt[x]) {
                    sum_apps += Number(cur_region_teriff[type].cheks[y].price);
                }
            }
        }
    }

    if (SmsStatus) {
        for (var y in cur_region_teriff[type].cheks) {
            if (cur_region_teriff[type].cheks[y].id === "sm") {
                sum_apps += Number(cur_region_teriff[type].cheks[y].price);
            }
        }
    }
    cur_sum += sum_apps;

    var hardToVmode = document.getElementById("slider_phrase").value;
    var templates = listTemplates[hardToVmode].phrases;
    var textcur = ToProcessText(cur_mCount, cur_mPrice, cur_gCount, cur_gPrice, cur_sum, cur_region_teriff[type].cheks, SmsStatus, OptionsPhrases, appt, templates);

    document.getElementById("yota_newcombine_b_tafir_summary_input_" + type).innerHTML = textcur;

    if (gcheck.length + mcheck.length === 2) {
        //document.getElementById("yota_newcombine_b_tafir_summary_input_"+type).innerHTML = text;
        summaryOutput2(type, cur_region_teriff[type].cheks, appt, cur_mCount, cur_gCount);
    } else {}
}

//склоенние в зависимости от числа
function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

//функция вывода данных во второе окно при выделении опций (plaphone)
function summaryOutput2(type, apps, appt, cminut, cgbites) {

    var text = "";

    if (cgbites === "0") {
        text += phrasesInet[4].phrase;
    } else if (cgbites <= 3) {
        text += phrasesInet[0].phrase;
    } else if (cgbites < 15) {
        text += phrasesInet[1].phrase;
    } else if (cgbites < 30) {
        text += phrasesInet[2].phrase;
    } else if (cgbites >= 30) {
        text += phrasesInet[3].phrase;
    }

    //TODO: решить с кривым отображением

    document.getElementById("yota_newcombine_b_tafir_summary_input1_" + type).innerHTML = text;
}

//Функция на обновление переменных по выбанным приложениям (plaphone)

function checkApps(node, type, callback) {
    var text, appitems, appcheck, appall, gcheck, mcheck;

    appcheck = document.querySelectorAll('input[type="checkbox"][name="select_apps_' + type + '"]:checked'); //Выбрано среди приложений
    appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps_' + type + '"]'); //Все итемы приложжений
    appall = document.querySelector('input[type="checkbox"][name="select_apps_all_' + type + '"]'); //галочка "все"
    gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_' + type + '"]:checked');
    mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_' + type + '"]:checked');

    // if (!!appitems) return;


    //////////// Обработчик чекбокса (все\по отдельности)
    if ((node === "update" || node.className.search(/nameofclicktitle/i) >= 0) && !!appall) {
        //str.search( /лю/i )
        selected_items = [];
        appall.checked = appcheck.length === appitems.length && !appall.checked;
        for (var x in appcheck){
            if (appcheck[x].value !== 0 && x < appcheck.length) selected_items[x] = appcheck[x].value;
        }

        // appcheck.forEach(function (item, i, arr) {
        //     if (arr[i].value !== 0) selected_items[i] = arr[i].value;
        // });
    }
    if (node.type === "checkbox") {
        if (node.value > appall.value) {
            selected_items = [];
            appall.checked = appcheck.length === appitems.length && !appall.checked;
            for (var x in appcheck){
                if (appcheck[x].value !== 0 && x < appcheck.length) selected_items[x] = appcheck[x].value;
            }
        } else {
            for (var i in appitems){
                if (i < appitems.length) {
                    appitems[i].checked = !!appall.checked;
                    if (appall.checked) {
                        selected_items[i] = appitems[i].value;
                    } else {
                        selected_items = [];
                    }
                }
            }

            //
            // appitems.forEach(function (item, i, arr) {
            //     appitems[i].checked = !!appall.checked;
            //     if (appall.checked) {
            //         selected_items[i] = arr[i].value;
            //     } else {
            //         selected_items = [];
            //     }
            // });
        }
    }

    var apps = [];
    for (var e in appcheck){
        var templa = {};
        if (e < appcheck.length) {
            for (var x in legorates[type].apptype) {
                if (legorates[type].apptype[x].id === appcheck[e].getAttribute("data-name") && x < legorates[type].length) templa = legorates[type].apptype[x];
            }
            apps.push({phrase: OptionsPhrases[appcheck[e].getAttribute("data-name")], info: templa});

        }
    }
    // appcheck.forEach(function (e) {
    //     var templa = {};
    //     for (var x in legorates[type].apptype) {
    //         if (legorates[type].apptype[x].id === e.getAttribute("data-name")) templa = legorates[type].apptype[x];
    //     }
    //     apps.push({ phrase: OptionsPhrases[e.getAttribute("data-name")], info: templa });
    // });

    if (gcheck.length + mcheck.length !== 2) return;
    callback.call(null, node, type);
}

function updateLegoInfo(obj, types) {
    checkApps(obj, types, checkType);
    var texts = document.querySelector('#yota_newcombine_b_tafir_summary_input_' + types);
    var te1 = texts.nextElementSibling;

    var te2 = te1.querySelector('#yota_copy_text');
    if (te2.innerText === "СКОПИРОВАНО!") te2.innerText = '';
}
function PhraseUpdate(obj) {
    if (obj === null) {
        obj = "update";
    }
    for (var x in type_lego) {
        updateLegoInfo(obj, type_lego[x]);
    }
}

function getRandomInRange(min, max, l) {
    var arr = [],
        m = [],
        n = 0;
    if (max - min < l - 1) return;
    for (var i = 0; i <= max - min; i++) {
        m[i] = i + min;
    }for (var i = 0; i < l; i++) {
        n = Math.floor(Math.random() * m.length);arr[i] = m.splice(n, 1);
    };
    return arr;
}

function randomLegoInfo(obj, types, mins, gbites) {

    var gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_' + types + '"]'); //Выбрано среди трафика
    var mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_' + types + '"]'); //Выбрано среди минут
    var appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps_' + types + '"]'); //Все итемы приложжений
    var appall = document.querySelector('input[type="checkbox"][name="select_apps_all_' + types + '"]'); //галочка "все"


    var let1 = getRandomInRange(0, mcheck.length - 1, 1);
    var let2 = getRandomInRange(0, gcheck.length - 1, 1);

    for (var x2 in mcheck) {
        if (mcheck[x2].value === let1.toString()) mcheck[x2].checked = true;
    }

    for (var x1 in gcheck) {
        if (gcheck[x1].value === let2.toString()) gcheck[x1].checked = true;
    }

    rangeCheckedApps = rangeCheckedApps[0] > rangeCheckedApps[1] ? [0, 0] : rangeCheckedApps;
    var startRange = rangeCheckedApps[0] === 0 ? 1 : rangeCheckedApps[0];
    var stopRange = rangeCheckedApps[1] === 0 ? appitems.length : rangeCheckedApps[1] >= appitems.length ? appitems.length : rangeCheckedApps[1];

    var favApps = favoriteCheckedApps.length > 3 ? favoriteCheckedApps : [1, appitems.length];
    //TODO: пока не используется. Псевдорандом

    var arr = getRandomInRange(1, appitems.length, getRandomInRange(startRange, stopRange, 1));

    for (var x5 in appitems) {
        if (x5<appitems.length)appitems[x5].checked = false;
    }for (var x4 in appitems) {
        for (var x3 in arr) {

            if (appitems[x4].value === arr[x3].toString()) appitems[x4].checked = true;
        }
    }
    updateLegoInfo(obj, types);
}

//Функция на обновление переменных по выбранному тарифу (plaphone)
function checkType(node, type) {

    summaryOutput(type);
    var mcheck, gcheck, gchecks, mchecks;
    var cur_mCount, cur_mPrice, cur_gCount, cur_gPrice; //Выбранные минуты,цена,трафик,цена
    gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_' + type + '"]:checked'); //Выбрано среди трафика
    mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_' + type + '"]:checked'); //Выбрано среди минут
    gchecks = document.querySelectorAll('input[type="radio"][name="radio_trafic_' + type + '"]'); //Все итемы в трафике
    mchecks = document.querySelectorAll('input[type="radio"][name="radio_minute_' + type + '"]'); //Все итемы в минутах

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
    var mins = legorates[type].mins;
    var gbites = legorates[type].gbites;

    var apchecks11 = document.querySelectorAll('div[class="b2c-voice-collect__app-price"]');
    var tempapp = legorates[type].apptype;
    for (var ids in apchecks11){
        var dataname = apchecks11[ids];
        if (ids < apchecks11.length) {
            for (var x in tempapp) {
                if (dataname.getAttribute('data-for') === tempapp[x].id + "_" + type) {
                    dataname.innerHTML = tempapp[x].price + "&#8381;";
                }
            }
        }
    }

    // apchecks11.forEach(function (item, ids, arr) {
    //     var dataname = apchecks11[ids];
    //     for (var x in tempapp) {
    //         if (dataname.getAttribute('data-for') === tempapp[x].id + "_" + type) {
    //             dataname.innerHTML = tempapp[x].price + "&#8381;";
    //         }
    //     }
    // });

    var elem = document.getElementById('tminute_' + type);
    while (elem.firstChild) {
        if (elem.firstChild) elem.removeChild(elem.firstChild);
    }

    //TODO: Перестать использовать таблицы, черт
    var tr1 = document.createElement('tr');
    tr1.innerHTML = '<td nowrap id="labletd_' + type + '"><label class="layout-buttons_gb ' + type + ' nameofclicktitle" onclick=\'randomLegoInfo(this, "' + type + '", "' + mins.length + '" , "' + gbites.length + '")\'>'+ dictionaries.mainLabelMins+'</label></td>';
    elem.appendChild(tr1);

    mins.forEach(function (item, i, arr) {
        var tr = document.createElement('tr');


        var Template = dictionaries.mainLabelItemMin;
        var tmpl = _.template(TemplateFunction(Template));

        var data = {
            mcount: item[0],
            mprice: item[1],
        };


        tr.innerHTML = '<td id="tdminute_' + i + '_' + type + '" nowrap><input value="' + i + '" id="iminute_' + i + '_' + type + '" class="input_radio_minute" name="radio_minute_' + type + '" type="radio"  onchange=\'updateLegoInfo(this, "' + type + '")\'><label for="iminute_' + i + '_' + type + '" class="layout-buttons_gb">' + tmpl(data) + '</label></td>';


        elem.appendChild(tr);
    });
    var elem1 = document.getElementById('tgbite_' + type);
    while (elem1.firstChild) {
        if (elem1.firstChild) elem1.removeChild(elem1.firstChild);
    }

    var tr2 = document.createElement('tr');

    tr2.innerHTML = '<td nowrap id="labletd_' + type + '"><label class="layout-buttons_gb ' + type + ' nameofclicktitle" onclick=\'randomLegoInfo(this, "' + type + '", "' + mins.length + '" , "' + gbites.length + '")\' >'+ dictionaries.mainLabelGibs+'</label></td>';
    elem1.appendChild(tr2);

    gbites.forEach(function (item, i, arr) {
        var tr2 = document.createElement('tr');

        var Template = dictionaries.mainLabelItemGb;
        var tmpl = _.template(TemplateFunction(Template));

        var data = {
            gcount: item[0],
            gprice: item[1],
        };

        tr2.innerHTML = '<td id="tdgbite__' + i + '_' + type + '" nowrap><input value="' + i + '" id="igbite_' + i + '_' + type + '" class="input_radio_gbite" name="radio_trafic_' + type + '" type="radio" onchange=\'updateLegoInfo(this, "' + type + '")\'><label for="igbite_' + i + '_' + type + '" class="layout-buttons_gb">' + tmpl(data) + '</label></td>';
        elem1.appendChild(tr2);
    });
}

//Функция заполнения при выборе региона (да, это переменная, а не функция. Мне лень)
var cur_region_teriff = {};

//TODO: уведомления
function initLegoRates(region, callback) {


    for (var x in jsondata.regions){
        if (region === jsondata.regions[x].id){
            cur_region_teriff = jsondata.regions[x];
        }
    }

    var statusRegion = cur_region_teriff.numreg === "00" ? "reg" : cur_region_teriff.have_voice !== "true" ? "no" : cur_region_teriff.have_modem === "true" ? "vm" : "v";

    switch (statusRegion) {
        case "vm":
            returnInfoBlock("clear", "");break;
        case "v":
            returnInfoBlock("warning", dictionaries.modemNoLaunch);break;
        case "m":
            returnInfoBlock("warning", dictionaries.voiceNoLaunch);break;
        case "no":
            returnInfoBlock("warning", dictionaries.regionNoLaunch);break;
        case "reg":
            returnInfoBlock("clear", "");break;
        default:
            break;
    }

    var list = [];
    for (var x in jsondata.delivery) {
        if (region === jsondata.delivery[x].id) {
            list.push(jsondata.delivery[x]);
        }
    }
    cur_region_teriff.deliv = list;

    //TODO Первоначальная инициализация и запись тарифов
    for (var x in type_rates) {
        var name = type_rates[x];

        for (var x in jsondata[name]){
            if (region === jsondata[name][x].id){
                try {
                    cur_region_teriff[name] = jsondata[name][x];
                } catch (e) {
                    cur_region_teriff[name] = "Nodata";
                }
            }
        }


    }

    var _loop = function _loop(x) {
        var type = type_lego[x];

        for (var x in jsondata[type]){
            if (region === jsondata[type][x].id){
                try {
                    cur_region_teriff[type]  = jsondata[type][x];
                } catch (e) {
                    cur_region_teriff[type]  = "Nodata";
                }
            }
        }



        createLegoBlock(type, function () {

            if (cur_region_teriff.have_voice === "true") {

                var apptype = {};
                VisibleClearBody(type);

                for (var key in unlimApps) {
                    apptype[key] = unlimApps[key];
                }

                for (var app in apptype) {
                    switch (apptype[app].group) {
                        case "messenger":
                            apptype[app].price = cur_region_teriff[type].messenger;;break;
                        case "social":
                            apptype[app].price = cur_region_teriff[type].social;break;
                        case "youtube":
                            apptype[app].price = cur_region_teriff[type].youtube;break;
                        case "sms":
                            apptype[app].price = cur_region_teriff.sms_base;break;
                        case "deleted":
                            /*unlimApps[app].price = unlimApps[app].price;*/break;
                        default:
                            break;

                    }
                }
                //TODO: добавить приложения

                var objRate = { mins: cur_region_teriff[type].mins, gbites: cur_region_teriff[type].gbites, apptype: apptype };

                addRow(type, cur_region_teriff.id, objRate);
                getLocalTime(cur_region_teriff.timeid, WriteTime2);
            }
        });
    };

    for (var x in type_lego) {
        _loop(x);
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
    var yota_newcombine_nullbalance_plaphone = document.getElementById('yota_newcombine_nullbalance_plaphone');
    var yota_newcombine_nullbalance_tabt = document.getElementById('yota_newcombine_nullbalance_tabt');

    if (checked_region.have_modem === "false" && checked_region.have_voice === "false") {
        yota_newcombine_modem.innerHTML = ' ';
        yota_newcombine_unlim_phone.innerHTML = ' ';
        yota_newcombine_unlim_tab.innerHTML = ' ';
        yota_newcombine_old_plaphone.innerHTML = ' ';
        yota_newcombine_abca.innerHTML = ' ';
        yota_newcombine_abcb.innerHTML = ' ';
        yota_newcombine_unlim_phone_archived.innerHTML = ' ';
        yota_newcombine_unlim_phone.innerHTML = ' ';
        yota_newcombine_legoyota_plaphone.innerHTML = ' ';
        yota_newcombine_legoyota_tabt.innerHTML = ' ';
        yota_newcombine_nullbalance_plaphone.innerHTML = ' ';
        yota_newcombine_nullbalance_tabt.innerHTML = ' ';
        yota_newcombine_plaphone.innerHTML = ' ';
        yota_newcombine_tabt.innerHTML = ' ';
        return;
    }

    var unlim_phone = checked_region.ph_unlim.tariffs;
    var list_unlim_phone = "";
    var list_unlim_phone_archived = "";
    // name = current, mins
    unlim_phone.forEach(function (e) {
        var Template = dictionaries.unlim_phone_element;
        var tmpl = _.template(TemplateFunction(Template));
        if (e.name === "current") {



            for (var x in e.mins) {
                var data = {
                    mcount: e.mins[x][0],
                    mprice: e.mins[x][1],
                };
     list_unlim_phone += tmpl(data)+'<br>';
            }
        } else if (e.name === "archived") {
            for (var x in e.mins) {
                var data = {
                    mcount: e.mins[x][0],
                    mprice: e.mins[x][1],
                };
    list_unlim_phone_archived+= tmpl(data)+'<br>';
            }
        }
    });

    var Template1 = dictionaries.text_of_yota_newcombine_unlim_phone;

    var tmpl = _.template(TemplateFunction(Template1));

    var data = {
        region_name: checked_region.name,
        list_unlim_phone: list_unlim_phone,
        voice_add_100: checked_region.voice_add_100,
        sms_base: checked_region.sms_base,
        t2hour: checked_region.t2hour,
        t24hour: checked_region.t24hour,
        sms_over_pack: checked_region.sms_over_pack,
        min_over_pack: checked_region.min_over_pack,
    };


    var text_of_yota_newcombine_unlim_phone = tmpl(data);
    //TODO: Добавить примечания в отдельную матрицу

    yota_newcombine_unlim_phone.innerHTML = text_of_yota_newcombine_unlim_phone;

    data.list_unlim_phone = list_unlim_phone_archived;
    var text_of_yota_newcombine_unlim_phone_archived = tmpl(data);
    //TODO: Добавить примечания в отдельную матрицу
    if (list_unlim_phone_archived.length !== 0) yota_newcombine_unlim_phone_archived.innerHTML = text_of_yota_newcombine_unlim_phone_archived;else {
        yota_newcombine_unlim_phone_archived.innerHTML = "";
    }

    Template1 = dictionaries.text_of_yota_newcombine_yota_newcombine_abcb;

    tmpl = _.template(TemplateFunction(Template1));

    data = {
        region_name: checked_region.name,
        mins: checked_region.abcb.current.mins,
        gigs: checked_region.abcb.current.gb,
        unlimapps:checked_region.abcb.current.unlimapps,
        voice_add_100: checked_region.voice_add_100,
        gb_add_5:checked_region.gb_add_5,
        sms_base:checked_region.sms_base,
        sms_over_pack:checked_region.sms_over_pack,
        min_over_pack: checked_region.min_over_pack,
    };

    var text_of_yota_newcombine_yota_newcombine_abcb = tmpl(data);
    yota_newcombine_abcb.innerHTML = text_of_yota_newcombine_yota_newcombine_abcb;

    Template1 = dictionaries.text_of_yota_newcombine_yota_newcombine_abca;

    tmpl = _.template(TemplateFunction(Template1));

    data = {
        region_name: checked_region.name,
        tariffs: checked_region.abca.tariffs,
        unlimapps:checked_region.abca.unlimapps,
        voice_add_100: checked_region.voice_add_100,
        gb_add_5:checked_region.gb_add_5,
        sms_base:checked_region.sms_base,
        sms_over_pack:checked_region.sms_over_pack,
        min_over_pack: checked_region.min_over_pack,
    };

    var text_of_yota_newcombine_yota_newcombine_abca = tmpl(data);
    yota_newcombine_abca.innerHTML = text_of_yota_newcombine_yota_newcombine_abca;



    if (checked_region.plaphone_old !== undefined) {
        var lis_plaphone_old = "";
        lis_plaphone_old += "<tr><b>Минуты</b><br>";
        for (var x in checked_region.plaphone_old.mins) {
            lis_plaphone_old += checked_region.plaphone_old.mins[x][0] + ' \u043C\u0438\u043D\u0443\u0442 - ' + checked_region.plaphone_old.mins[x][1] + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        }lis_plaphone_old += "<tr><b>Интернет</b><br>";
        for (var x in checked_region.plaphone_old.gbites) {
            lis_plaphone_old += checked_region.plaphone_old.gbites[x][0] + ' \u0413\u0411 - ' + checked_region.plaphone_old.gbites[x][1] + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        }


        Template1 = dictionaries.text_of_yota_newcombine_old_plaphone;

        tmpl = _.template(TemplateFunction(Template1));

        data = {
            region_name: checked_region.name,
            lis_plaphone_old: lis_plaphone_old,
            social: checked_region.plaphone_old.social,
            messenger: checked_region.plaphone_old.messenger,
            youtube: checked_region.plaphone_old.youtube,
            voice_add_100: checked_region.voice_add_100,
            gb_add_5:checked_region.gb_add_5,
            sms_base:checked_region.sms_base,
            sms_over_pack:checked_region.sms_over_pack,
            min_over_pack: checked_region.min_over_pack,
        };


        var text_of_yota_newcombine_old_plaphone = tmpl(data);
    } else var text_of_yota_newcombine_old_plaphone = "";
    yota_newcombine_old_plaphone.innerHTML = text_of_yota_newcombine_old_plaphone;


    Template1 = dictionaries.text_of_yota_newcombine_unlim_tab;

    tmpl = _.template(TemplateFunction(Template1));

    data = {
        region_name: checked_region.name,
        day: checked_region.tab_unlim.day,
        mounth: checked_region.tab_unlim.mounth,
        year: checked_region.tab_unlim.year,
        procentas: checked_region.tab_unlim.procentas,
        min_pag: checked_region.tab_unlim.min_pag,
        sms_pag: checked_region.tab_unlim.sms_pag,
        in_roam: checked_region.tab_unlim.in_roam,
    };

    var text_of_yota_newcombine_unlim_tab = tmpl(data);
    yota_newcombine_unlim_tab.innerHTML = text_of_yota_newcombine_unlim_tab;



    if (checked_region.have_modem === "true") {

        Template1 = dictionaries.text_of_yota_newcombine_modem;

        tmpl = _.template(TemplateFunction(Template1));

        data = {
            region_name: checked_region.name,
            rangeprice: checked_region.modem.rangeprice,
            rangespeed: checked_region.modem.rangespeed,
            year:  checked_region.modem.year,
            turbo: checked_region.modem.turbo,
            list: checked_region.modem.list,
            free: checked_region.modem.free,
        };

        var text_of_yota_newcombine_modem =  tmpl(data);
    } else {
        var text_of_yota_newcombine_modem = ' ';
    }
    yota_newcombine_modem.innerHTML = text_of_yota_newcombine_modem;

    ////////////////////////////////////////////////////////////////<hr> <tr><td colspan="2" align ="center" ><b> ${checked_region.name} </b></td></tr>
    var list_plaphone = "";
    list_plaphone += "<b>Минуты</b><br>";
    for (var x in checked_region.plaphone.mins) {
        list_plaphone += checked_region.plaphone.mins[x][0] + ' \u043C\u0438\u043D\u0443\u0442 - ' + checked_region.plaphone.mins[x][1] + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
    }list_plaphone += "<b>Интернет</b><br>";
    for (var x in checked_region.plaphone.gbites) {
        list_plaphone += checked_region.plaphone.gbites[x][0] + ' \u0413\u0411 - ' + checked_region.plaphone.gbites[x][1] + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';

    }

    Template1 = dictionaries.text_of_yota_newcombine_plaphone;

    tmpl = _.template(TemplateFunction(Template1));

    data = {
        region_name: checked_region.name,
        list_plaphone: list_plaphone,
        social: checked_region.plaphone.social,
        messenger: checked_region.plaphone.messenger,
        youtube: checked_region.plaphone.youtube,
        voice_add_100: checked_region.voice_add_100,
        gb_add_5:checked_region.gb_add_5,
        sms_base:checked_region.sms_base,
        sms_over_pack:checked_region.sms_over_pack,
        min_over_pack: checked_region.min_over_pack,
    };


    var text_of_yota_newcombine_plaphone = tmpl(data);
    yota_newcombine_plaphone.innerHTML = text_of_yota_newcombine_plaphone;

    var deliv = cur_region_teriff.deliv;
    var text = '';var data = [];
    for (var x in deliv) {
        if (deliv[x].type === "phone") {
            data.push({ region: deliv[x].region, tpio: deliv[x].tpio, ft: deliv[x].ft, im: deliv[x].im, sv: deliv[x].sv, rtk: deliv[x].rtk, altname: deliv[x].altname });
        }
    }
    if (data.length === 1) {
        if (data[0].tpio === data[0].ft) text += '\u0412 \u043D\u0430\u0448\u0435\u0439 \u0422\u041F\u0438\u041E \u0438\u043B\u0438 \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u0435: ' + data[0].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        if (data[0].tpio !== data[0].ft) text += '\u0412 \u043D\u0430\u0448\u0435\u0439 \u0422\u041F\u0438\u041E: ' + data[0].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439, \u0432\u043E \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u0435: ' + data[0].ft + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        text += '\u041F\u0440\u0438 \u0437\u0430\u043A\u0430\u0437\u0435 \u043D\u0430 \u043D\u0430\u0448\u0435\u043C \u0441\u0430\u0439\u0442\u0435 \u0438\u043B\u0438 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438: ' + data[0].im + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
        text += '\u0412 \u0415\u0432\u0440\u043E\u0441\u0435\u0442\u0438 \u0438\u043B\u0438 \u0421\u0432\u044F\u0437\u043D\u043E\u043C: ' + data[0].sv + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
        text += '\u0412 \u0420\u043E\u0441\u0442\u0435\u043B\u0435\u043A\u043E\u043C\u0435: ' + data[0].rtk + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
    } else if (data.length > 1) {
        if (data[0].tpio === data[1].tpio) text += '\u0412 \u043D\u0430\u0448\u0435\u0439 \u0422\u041F\u0438\u041E \u0438\u043B\u0438 \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u0435: ' + data[0].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        if (data[0].tpio !== data[1].tpio) text += '\u0412 \u043D\u0430\u0448\u0435\u0439 \u0422\u041F\u0438\u041E \u0438\u043B\u0438 \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u0435: \u0432 ' + data[0].altname + ': ' + data[0].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439, \u0432 ' + data[1].altname + ': ' + data[1].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439,<br>';
        text += '\u041F\u0440\u0438 \u0437\u0430\u043A\u0430\u0437\u0435 \u043D\u0430 \u043D\u0430\u0448\u0435\u043C \u0441\u0430\u0439\u0442\u0435 \u0438\u043B\u0438 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438: ' + data[0].im + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
        if (data[0].sv === data[1].sv) text += '\u0412 \u0415\u0432\u0440\u043E\u0441\u0435\u0442\u0438 \u0438\u043B\u0438 \u0421\u0432\u044F\u0437\u043D\u043E\u043C: ' + data[0].sv + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        if (data[0].sv !== data[1].sv) text += '\u0412 \u0415\u0432\u0440\u043E\u0441\u0435\u0442\u0438 \u0438\u043B\u0438 \u0421\u0432\u044F\u0437\u043D\u043E\u043C: \u0412 ' + data[0].altname + ': ' + data[0].sv + ' \u0440\u0443\u0431\u043B\u0435\u0439, \u0412 ' + data[1].altname + ': ' + data[1].sv + ' \u0440\u0443\u0431\u043B\u0435\u0439,<br>';
        text += '\u0412 \u0420\u043E\u0441\u0442\u0435\u043B\u0435\u043A\u043E\u043C\u0435: ' + data[0].rtk + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
    }
    cur_region_teriff.dostavka = text;

    //
    ///TODO: сделать инициализацию ранее
    var text_of_yota_newcombine_nullbalance_plaphone = '<table style="width: 400px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 40%;"><col style="width: 60%;"><col style="width: 25%;"></colgroup><tbody>\n \n    <td width="100" valign="top" >' + cur_region_teriff.dostavka + ' </td>\n    </tbody></table>';
    yota_newcombine_nullbalance_plaphone.innerHTML = text_of_yota_newcombine_nullbalance_plaphone;

    ////////////////////////////////////////////////////////////////
    var list_tabt = "";
    list_tabt += "<b>Минуты</b><br>";
    for (var x in checked_region.tabt.mins) {
        list_tabt += checked_region.tabt.mins[x][0] + ' \u043C\u0438\u043D\u0443\u0442 - ' + checked_region.tabt.mins[x][1] + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
    }list_tabt += "<b>Интернет</b><br>";
    for (var x in checked_region.tabt.gbites) {
        list_tabt += checked_region.tabt.gbites[x][0] + ' \u0413\u0411 - ' + checked_region.tabt.gbites[x][1] + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
    }


    Template1 = dictionaries.text_of_yota_newcombine_plaphone; //общий шаблон , да

    tmpl = _.template(TemplateFunction(Template1));

    data = {
        region_name: checked_region.name,
        list_plaphone: list_tabt,
        social: checked_region.tabt.social,
        messenger: checked_region.tabt.messenger,
        youtube: checked_region.tabt.youtube,
        voice_add_100: checked_region.voice_add_100,
        gb_add_5:checked_region.gb_add_5,
        sms_base:checked_region.sms_base,
        sms_over_pack:checked_region.tabt.sms_pag,
        min_over_pack: checked_region.tabt.voice_pag,
    };



    var text_of_yota_newcombine_tabt =  tmpl(data);
    yota_newcombine_tabt.innerHTML = text_of_yota_newcombine_tabt;

    var text1 = '';var data1 = [];
    for (var x in deliv) {
        if (deliv[x].type === "tablet") {
            data1.push({ region: deliv[x].region, tpio: deliv[x].tpio, ft: deliv[x].ft, im: deliv[x].im, sv: deliv[x].sv, rtk: deliv[x].rtk, altname: deliv[x].altname });
        }
    }
    if (data1.length === 1) {
        if (data1[0].tpio === data1[0].ft) text1 += '\u0412 \u043D\u0430\u0448\u0435\u0439 \u0422\u041F\u0438\u041E \u0438\u043B\u0438 \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u0435: ' + data1[0].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        if (data1[0].tpio !== data1[0].ft) text1 += '\u0412 \u043D\u0430\u0448\u0435\u0439 \u0422\u041F\u0438\u041E: ' + data1[0].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439, \u0432\u043E \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u0435: ' + data1[0].ft + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        text1 += '\u041F\u0440\u0438 \u0437\u0430\u043A\u0430\u0437\u0435 \u043D\u0430 \u043D\u0430\u0448\u0435\u043C \u0441\u0430\u0439\u0442\u0435 \u0438\u043B\u0438 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438: ' + data1[0].im + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
        text1 += '\u0412 \u0415\u0432\u0440\u043E\u0441\u0435\u0442\u0438 \u0438\u043B\u0438 \u0421\u0432\u044F\u0437\u043D\u043E\u043C: ' + data1[0].sv + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
        text1 += '\u0412 \u0420\u043E\u0441\u0442\u0435\u043B\u0435\u043A\u043E\u043C\u0435: ' + data1[0].rtk + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
    } else if (data1.length > 1) {
        if (data1[0].tpio === data1[1].tpio) text1 += '\u0412 \u043D\u0430\u0448\u0435\u0439 \u0422\u041F\u0438\u041E \u0438\u043B\u0438 \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u0435: ' + data1[0].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        if (data1[0].tpio !== data1[1].tpio) text1 += '\u0412 \u043D\u0430\u0448\u0435\u0439 \u0422\u041F\u0438\u041E \u0438\u043B\u0438 \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u0435: \u0432 ' + data1[0].altname + ': ' + data1[0].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439, \u0432 ' + data1[1].altname + ': ' + data1[1].tpio + ' \u0440\u0443\u0431\u043B\u0435\u0439,<br>';
        text1 += '\u041F\u0440\u0438 \u0437\u0430\u043A\u0430\u0437\u0435 \u043D\u0430 \u043D\u0430\u0448\u0435\u043C \u0441\u0430\u0439\u0442\u0435 \u0438\u043B\u0438 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438: ' + data1[0].im + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
        if (data1[0].sv === data1[1].sv) text1 += '\u0412 \u0415\u0432\u0440\u043E\u0441\u0435\u0442\u0438 \u0438\u043B\u0438 \u0421\u0432\u044F\u0437\u043D\u043E\u043C: ' + data1[0].sv + ' \u0440\u0443\u0431\u043B\u0435\u0439<br>';
        if (data1[0].sv !== data1[1].sv) text1 += '\u0412 \u0415\u0432\u0440\u043E\u0441\u0435\u0442\u0438 \u0438\u043B\u0438 \u0421\u0432\u044F\u0437\u043D\u043E\u043C: \u0412 ' + data1[0].altname + ': ' + data1[0].sv + ' \u0440\u0443\u0431\u043B\u0435\u0439, \u0412 ' + data1[1].altname + ': ' + data1[1].sv + ' \u0440\u0443\u0431\u043B\u0435\u0439,<br>';
        text1 += '\u0412 \u0420\u043E\u0441\u0442\u0435\u043B\u0435\u043A\u043E\u043C\u0435: ' + data1[0].rtk + ' \u0440\u0443\u0431\u043B\u0435\u0439.<br>';
    }
    cur_region_teriff.dostavka_t = text1;

    var text_of_yota_newcombine_nullbalance_tabt = '<table style="width: 400px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 25%;"><col style="width: 50%;"><col style="width: 25%;"></colgroup><tbody>\n \n    <td width="100" valign="top" >' + cur_region_teriff.dostavka_t + ' </td>\n    </tbody></table>';
    yota_newcombine_nullbalance_tabt.innerHTML = text_of_yota_newcombine_nullbalance_tabt;

    var element_yota_newcombine_archived_plaphone = document.querySelector('li.menu-item.bv-localtab a[href*="plaphone_old"]');
    if (!checked_region.plaphone_old) {
        element_yota_newcombine_archived_plaphone.style.opacity = 0.3;
    } else {
        element_yota_newcombine_archived_plaphone.style.opacity = 1;
    }
}

//TODO Отображение условий в домашнем регионе и нет для конструторов
function VoiceTariffs(type, mins) {

    var textVoiceSMS = document.getElementById("id-Тарифы[Тест]-СтоимостьвызововиSMS_" + type).nextElementSibling;
    var textUslugi = document.getElementById("id-Тарифы[Тест]-Дополнительныеуслуги_" + type).nextElementSibling;
    textVoiceSMS.innerHTML = "";textUslugi.innerHTML = "";
    var node = document.createElement('p');
    var node2 = document.createElement('p');
    var gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic_' + type + ']:checked'); //Выбрано среди трафика
    var mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute_' + type + ']:checked'); //Выбрано среди минут


    var texthtml = "";
    var texthtml2 = "";
    var dostavka = type === type_lego[0] ? cur_region_teriff.dostavka : cur_region_teriff.dostavka_t;
    texthtml = '<div class="table-wrap" style=""><table class="relative-table confluenceTable" style="width: 600px;"><colgroup><col style="width: 85%;"><col style="width: 15%;"></colgroup><tbody>';

    if (type === type_lego[0]) {

        var Template0 = dictionaries.type_legoPlaphoneVoice0; //общий шаблон , да
        var Template1 = dictionaries.type_legoPlaphoneVoice; //общий шаблон , да

        var tmpl0 = _.template(TemplateFunction(Template0));
        var tmpl1 = _.template(TemplateFunction(Template1));

        var data = {
            pag_voice_inbound: cur_region_teriff.pag_voice_inbound,
            pag_voice: cur_region_teriff.pag_voice,
            pag_sms: cur_region_teriff.pag_sms,
            min_over_pack: cur_region_teriff.min_over_pack,
            sms_over_pack: cur_region_teriff.sms_over_pack,


        };



        if (mins === "0") {
            texthtml +=  tmpl0(data);
        } else {
            texthtml +=  tmpl1(data);
        }
    } else if (type === type_lego[1]) {

        var Template0 = dictionaries.type_legoTabtVoice0; //общий шаблон , да
        var Template1 = dictionaries.type_legoTabtVoice; //общий шаблон , да

        var tmpl0 = _.template(TemplateFunction(Template0));
        var tmpl1 = _.template(TemplateFunction(Template1));

        var data = {

            voice_pag: cur_region_teriff.tabt.voice_pag,
            pag_voice: cur_region_teriff.pag_voice,
            sms_pag: cur_region_teriff.tabt.sms_pag,


        };

        if (mins === "0") {
            texthtml +=  tmpl0(data);
        } else {
            texthtml += tmpl1(data);
        }
    }

    texthtml += '</tbody></table></div>';
    node.innerHTML = texthtml;
    textVoiceSMS.appendChild(node);
}

function initOotRussiaRates(checked_contry) {

    var yota_newcombine_outrussia = document.getElementById('yota_newcombine_outrussia');
    var countries = jsondataOutRussia.intervoice;

    countries.forEach(function (e) {
        {
            if (e.id.toString() === checked_contry) {


                var  Template1 = dictionaries.text_of_yota_newcombine_outrussia; //общий шаблон , да

                var tmpl = _.template(TemplateFunction(Template1));

                var data = {
                    zone: e.zone,
                    name: e.name,
                    minute: e.minute,
                    sms: e.sms,
                    mms: e.mms,

                };




                var text_of_yota_newcombine_outrussia = tmpl(data);
                yota_newcombine_outrussia.innerHTML = text_of_yota_newcombine_outrussia;
            }
        }
    });
}

function initRoamingRatesProviders(checked_contry, callback) {
    var roaming = jsondataOutRussia;

    var rate = {};
    var provider = [];
    var provider_lte = [];

    for (var x in roaming.countries) {
        if (checked_contry === roaming.countries[x].id) {
            rate =  roaming.countries[x];
        }
    }

    for (var x in roaming.providers) {
        if (checked_contry === roaming.providers[x].id) {
            provider.push(roaming.providers[x]);
        }
    }

    for (var x in roaming.providers_lte) {
        if (checked_contry === roaming.providers_lte[x].id) {
            provider_lte.push(roaming.providers_lte[x]);
        }
    }

    var current_country_provider = { rate: rate, provider: provider, provider_lte: provider_lte };
    callback.call(current_country_provider);
}

function initRoamingRates(checked_contry) {

    checked_contry = this;
    switch (checked_contry.rate.status) {
        case "closed":
            returnInfoBlock("warning", dictionaries.roamingClosed, undefined, 2);break;
        case "no_inet":
            returnInfoBlock("warning", dictionaries.roamingNoInet, undefined, 2);break;
        case "open":
            returnInfoBlock("clear", "", undefined, 2);break;
        default:
            returnInfoBlock("warning", checked_contry.rate.status, undefined, 2);break;
    }

    var yota_newcombine_roaming_providers = document.getElementById('yota_newcombine_roaming_providers');
    var yota_newcombine_roaming_providers_lte = document.getElementById('yota_newcombine_roaming_providers_lte');
    var yota_newcombine_roaming = document.getElementById('yota_newcombine_roaming');


    var  Template1 = dictionaries.text_of_yota_newcombine_roaming; //общий шаблон , да

    var tmpl = _.template(TemplateFunction(Template1));

    var data = {
        countryname: checked_contry.rate.name,
        mb_price: checked_contry.rate.mb_price,
        paid_mb:checked_contry.rate.paid_mb,
        free_mb: checked_contry.rate.free_mb,
        invoice: checked_contry.rate.invoice,
        m30min: checked_contry.rate.m30min,
        out_rf: checked_contry.rate.out_rf,
        out_country: checked_contry.rate.out_country,
        out_other: checked_contry.rate.out_other,
        out_sms: checked_contry.rate.out_sms,
        in_sms: checked_contry.rate.in_sms,
        out_mms: checked_contry.rate.out_mms,
        mb_base: checked_contry.rate.mb_base,
    };
    var text_of_yota_newcombine_roaming = tmpl(data);
    yota_newcombine_roaming.innerHTML = text_of_yota_newcombine_roaming;

    var operators = "";
    var providers = checked_contry.provider;//[0];

    for (var i = 0; i < providers.length; i++) {
        operators += '<tr><b>' + checked_contry.rate.name + '</b></tr><br> ';
        var p = providers[i].providers;
        if (providers[i].name !== "") operators += '<tr><b>' + providers[i].name + '</b></tr><br> ';
        for (var x in p) {
            operators += '<tr>' + p[x] + '</tr><br> ';
        }
    }

    var text_of_yota_newcombine_roaming_providers = ' <tbody>' + operators + '</tbody> ';
    yota_newcombine_roaming_providers.innerHTML = text_of_yota_newcombine_roaming_providers;

    var operators_lte = "";
    var providers_lte = checked_contry.provider_lte; //TODO [0]

    for (var i = 0; i < providers_lte.length; i++) {
        operators_lte += '<tr><b>' + providers_lte[i].name + '</b></tr><br> ';
        var p = providers_lte[i].providers;
        for (var x in p) {
            operators_lte += '<tr>' + p[x] + '</tr><br> ';
        }
    }

    var text_of_yota_newcombine_roaming_providers_lte = '<tbody>' + operators_lte + '</tbody> ';
    yota_newcombine_roaming_providers_lte.innerHTML = text_of_yota_newcombine_roaming_providers_lte;

    var element_yota_newcombine_roaming_providers_lte = document.querySelector('li.menu-item.bv-localtab a[href*="roaming_providers_lte"]');
    if (operators_lte === "") {
        element_yota_newcombine_roaming_providers_lte.style.opacity = 0.3;
    } else {
        element_yota_newcombine_roaming_providers_lte.style.opacity = 1;
    }

    var element_yota_newcombine_roaming_providers = document.querySelector('li.menu-item.bv-localtab a[href*="roaming_providers"]');
    if (operators === "") {
        element_yota_newcombine_roaming_providers.style.opacity = 0.3;
    } else {
        element_yota_newcombine_roaming_providers.style.opacity = 1;
    }
}

function include(src) {
    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.appendChild(script);
}

function KeyPress(e) {
    var evtobj = window.event ? event : e;
    if (evtobj.keyCode === 70 && evtobj.ctrlKey || evtobj.shiftKey && evtobj.keyCode === 70) {
        customTemplates.showDropdown();

        setTimeout(function () {
            $('input.choices__input.choices__input--cloned').focus();
        }, 300);
    }
}

function WriteTime2(time) {
    time = this;
    var cur = document.getElementById("search_time_new_combine_label");
    cur.innerHTML = '<b>' + time.toString() + '</b> ';
}
var myTimer1;

var daysofweek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
function getLocalTime(timezone, callback) {

    var cur = document.getElementById("search_time_new_combine_label");
    cur.innerHTML = ' ';

    var xmlRequest = $.ajax({
        method: "GET",
        url: "https://cors.io/?https://yandex.com/time/sync.json?",
        timeout:4000,
        data: {geo: timezone},
        dataType: 'json',

        complete: function(jqXHR, textStatus) {
            if (textStatus === 'success') {
                debug.log('getTimeStamp",": Успешно.');
            }
            if (textStatus === 'error') {
                debug.log('getTimeStamp",": Ошибка.');
            }
        },
        // success(data, textStatus, jqXHR):function
    });


    //TODO: TODO REQUESTS
    xmlRequest.done(function( msg ) {
        getTimeStamp(msg, callback, timezone);
        debug.log( "getTimeStamp",": Data Saved: " );
    });
    xmlRequest.fail(function( jqXHR, textStatus ) {
        debug.log( "getTimeStamp",": Request failed: " + textStatus );
    });



    // try {
    //     // сразу вернуть значение
    //     return 1;
    //
    // } catch (e) {
    //     /* ... */
    // } finally {
    //     alert( 'finally' );
    // }



}

function getTimeStamp(response, callback, timezone) {

    clearInterval(myTimer1);

    var time = response.clocks[timezone].offset;
    var targetDate = new Date(); // Current date/time of user computer
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60; // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC


    var offsets = time; // get DST and time zone offsets in milliseconds
    var localdate = new Date(timestamp * 1000 + offsets); // Date object containing current time of target location
    var refreshDate = new Date(); // get current date again to calculate time elapsed between targetDate and now
    var timezonemsk = offsets / 1000 / 60 / 60 - 3;
    if (timezonemsk >= 0) timezonemsk = "+" + timezonemsk;
    var millisecondselapsed = refreshDate - targetDate; // get amount of time elapsed between targetDate and now
    localdate.setMilliseconds(localdate.getMilliseconds() + millisecondselapsed); // update localdate to account for any time elapsed

    myTimer1 = setInterval(function () {
        localdate.setSeconds(localdate.getSeconds() + 1);

        callback.call(localdate.toLocaleTimeString() + ' (MSK' + timezonemsk + ') ');
    }, 1000); //(${daysofweek[ localdate.getDay() ]})
}

function copyTextRate(elem) {

    var tex = elem.parentNode.querySelector('textarea');
    var texts = elem.querySelector('#yota_copy_text');
    var tmp = document.createElement('INPUT'),
        // Создаём новый текстовой input
        focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)


    if (tex.innerHTML) {
        try {
            tmp.value = tex.innerHTML; // Временному input вставляем текст для копирования
            document.body.appendChild(tmp); // Вставляем input в DOM
            tmp.select(); // Выделяем весь текст в input
            document.execCommand('copy'); // Магия! Копирует в буфер выделенный текст (см. команду выше)
            document.body.removeChild(tmp); // Удаляем временный input
            focus.focus(); // Возвращаем фокус туда, где был


            texts.innerText = 'Скопировано!';
        } catch (e) {
            texts.innerText = 'Ошибка!';
        }
    }
}

document.onkeydown = KeyPress;
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {}
};

function animation() {
    jdun.style.top = "98px";
    jdun.style.visibility = "visible ";
    var start = Date.now();
    var ttt = -100;
    var timer = setInterval(function () {
        var timePassed = Date.now() - start;
        ttt += 2;
        jdun.style.backgroundPositionX = ttt + 'px';

        if (ttt > 400) {
            clearInterval(timer);jdun.style.top = "-200px";jdun.style.visibility = "hidden";
        }
    }, 6);
}

window.addEventListener("DOMContentLoaded", function () {

    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    }

    function mask(event) {
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function (a) {
            return (/[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            );
        });
        if (event.type == "blur") {
            if (this.value.length == 2) this.value = "";
        } else setCursorPosition(this.value.length, this);
    }
    var input = document.querySelector("#number_bla_search");
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
});

var regexpAZ = new RegExp(/[A-Z]/i);
var regexp09 = new RegExp(/[0-9]/i);

function Cleaner(enable) {

    document.getElementById("number_bla_search").disabled = !enable;
}

function Cleaner2() {

    document.getElementById("number_bla_label").innerHTML = "";
}

function showCount() {
    var number = number_bla_search.value;
    var re = /^(\+7 )(\(\d{3}\) )(\d{3} )(\d{4})/;
    if (re.test(number)) {
        number = number.replace(/(?:\+7 \()(\d{3})(?:\) )(\d{3})(?: )(\d{4})/ig, "7$1$2$3"); //(\+7)([\d]*);
        CheckingStart(number);
    }
}

number_bla_search.onkeyup = number_bla_search.oninput = showCount;
number_bla_search.onpropertychange = function () {
    if (event.propertyName == "value") showCount();
};
number_bla_search.oncut = function () {
    setTimeout(showCount, 0); // на момент oncut значение еще старое
};

function CheckingStart(number) {
    animation();
    Cleaner2();
    if (!!number) number = document.getElementById("number_bla_search").value;

    var re = /^(\+7 )(\(\d{3}\) )(\d{3} )(\d{4})/;
    if (re.test(number)) {
        number = number.replace(/(?:\+7 \()(\d{3})(?:\) )(\d{3})(?: )(\d{4})/ig, "7$1$2$3"); //(\+7)([\d]*);


        Cleaner(false);

        compareNumber(number, alertFinished, Kody_Request, Logging);
    } else {
        document.getElementById("number_bla_label").innerHTML = dictionaries.widgetNocorrect;
    }
}

function alertFinished(number, Kody_Request, Logging) {
    var info = this;
    SearchNumberFinished(info, number, Kody_Request, Logging);
}

function SearchNumberFinished(info, number, Kody_Request, Logging) {
    var text = {};
    if (info === null || info === undefined) {
        text = {number: number, operator: "", region: "", id: ""};
        Cleaner(true);
        Kody_Request(text, "Тест", Logging, WriteData);
    } else {
        if (info.operator !== undefined) {

            text = {number: number, operator: info.operator, region: info.region, id: info.region_id};
            Kody_Request(text, "Тест", Logging, WriteData);
        }
    }

  
}

function WriteTime(time) {
    time = this;
    var cur = document.getElementById("number_bla_label2");
    var tmpl = _.template(TemplateFunction(dictionaries.widgetTime));
    var data = { time: time.toString(), };
     cur.innerHTML = tmpl(data);
}

function WriteData(text) {
    Cleaner(true);
    var datais = this;
    var cur = document.getElementById("number_bla_label");

    setTimeout(function () {

        if (datais.stat === "error") {
            cur.innerHTML = datais.text;
            return;
        }

        var img = "";
        if (datais.img_operator !== undefined) {
            img = '<img width="18" src="' + datais.img_operator + '" style="margin-bottom:-3px;margin-left:3px" />';
        }
        var region = "";

        if (datais.country === "Россия") {
            var number = datais.result_number.replace(/(?:\+7 )(?:\()(\d{3})(?:\))(?: )(\d{3})(?:-)(\d{2})(?:-)(\d{2})/ig, "$1$2$3$4"); //(\+7)([\d]*);
            if (datais.name_operator === undefined) {
                var  Template = dictionaries.widgetNoOperator; //общий шаблон , да

                var tmpl = _.template(TemplateFunction(Template));

                var data = {
                    region: datais.region_op,
                    country:datais.country,
                    number: datais.result_number,
                };

                cur.innerHTML =  tmpl(data);
            } else {
                region = datais.region_op + ' (' + datais.country + ')';
                if (text.id !== undefined && enableAutoOpenRegion) {
                    getJSON(mf_id_ratio, choiseRegionbylink, text.id);
                    if (datais.name_operator === "МТС") funcNagiev();
                } else {}


                Template = dictionaries.widgetInfo; //общий шаблон , да

                tmpl = _.template(TemplateFunction(Template));

                data = {
                    region: region,
                    img: img,
                    name_operator: datais.name_operator,
                    pool_op: datais.pool_op,
                    mnp_status: datais.mnp_status,
                    country:datais.country,
                    number: datais.result_number,
                    color_operator: datais.color_operator,
                };
                cur.innerHTML = tmpl(data);

                if (datais.mnp_status === "номер перенесен") {
                    data.mnp_info = datais.mnp_info;
                    Template = dictionaries.widgetInfoMnp; //общий шаблон , да
                    tmpl = _.template(TemplateFunction(Template));
                    cur.innerHTML += tmpl(data);
                }
            }
        } else {
            Template = dictionaries.widgetNoRussia; //общий шаблон , да

            tmpl = _.template(TemplateFunction(Template));

            data = {
                number: datais.result_number,
                country: datais.country,
                name_operator: datais.name_operator,
                img: img,
                color_operator: datais.color_operator,
            };

            cur.innerHTML =  tmpl(data);
        }
    }, 1000);
}
function funcNagiev() {
    nag_blablabla.style.top = "-105px";
    nag_blablabla.style.visibility = "visible ";
    nag_blablabla.style.visibility = "visible ";
    var start = Date.now(); // сохранить время начала
    var ttt = 200;
    var timer = setInterval(function () {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;
        ttt -= 2;
        nag_blablabla.style.backgroundPositionX = ttt + 'px';

        if (ttt < 50) {
            clearInterval(timer);
        }
    }, 7);
    setTimeout(function () {
        var timer1 = setInterval(function () {
            ttt += 2;
            nag_blablabla.style.backgroundPositionX = ttt + 'px';

            if (ttt > 200) {
                clearInterval(timer1);
                nag_blablabla.style.top = "-800px";
                nag_blablabla.style.visibility = "hidden";
            }
        }, 7);
    }, 1500);
}
//number, alertFinished, Kody_Request, Logging
function compareNumber(number, alertFinished, Kody_Request, Logging) {
    var object = this;
    document.getElementById("number_bla_label").innerHTML = dictionaries.widgetLoadindText;


    var xmlRequest = $.ajax({
        method: "GET",
        url: "https://cors.io/?http://www.megafon.ru/api/mfn/info?",
        data: { msisdn:number },
        timeout:4000,
        dataType: 'json',
        complete: function(jqXHR, textStatus) {
            if (textStatus === 'success') {
                debug.log('APIMF','Успешно.');  }
            if (textStatus === 'error') {
                debug.log('APIMF',': Ошибка.' + jqXHR.readyState + " " + jqXHR.statusText + " " + jqXHR.status + " ");
                //abort()
            }
        },
        // success(data, textStatus, jqXHR):function
    });
//TODO: TODO REQUESTS
    xmlRequest.done(function( msg ) {
        alertFinished.call(msg, number, Kody_Request, Logging);
        debug.log( "APIMF",": Data Saved: " );
    });
    xmlRequest.fail(function( jqXHR, textStatus ) {
        debug.log( "APIMF",": Request failed: " + textStatus );
        alertFinished.call(null, number, Kody_Request, Logging);
        //TODO:
        Cleaner(true);
        document.getElementById("number_bla_label").innerHTML = dictionaries.widgetLoadingError;
    });


}


function Logging(data, WriteData, text) {
    if (data.search(/(errorload)/g) !== -1) {
        //TODO: наименования ошибок
        var object = { stat: "error", text: dictionaries.widgetLoadingError};
        WriteData.call(object, text);
        return;
    }

    if (data.search(/({неизвестно})/g) !== -1) {

        var object = { stat: "error", text: dictionaries.widgetNumberIncorrect };
        WriteData.call(object, text);
    } else {
            data = data.replace(new RegExp(/(\<s\>)(.*?)(\<\/s>)/, 'g'), "");

        var _object = {};
        var result_number,
            img_operator,
            color_operator,
            name_operator,
            country,
            region_op,
            mnp_status,
            mnp_info,
            orig_op,
            pool_start,
            pool_op,
            info_op,
            time,
            mnp_infoi,
            num_part= "";
        if (data.search(/(Ошибка)(.*)(не найден)/g) !== -1) {
            _object = { stat: "error", text: dictionaries.widgetNumberNofound };
            WriteData.call(_object, text);
            return;
        }
        //
        if (data.search(/(\<img.*src\=\")/g) !== -1) {
            img_operator = data.match(/(https\:\/\/www\.kody\.su\/img)(.*?)(?=\")/g)[0];
        }

        if (data.search(/(style\=\"color)/g) !== -1) {
            color_operator = data.replace(new RegExp(/(?:[\s\S]*)(?:\<span style=\"color\:)(.*?)(?=\"\>)(?:[\s\S]*)/, 'g'), '$1');
        } else {
            color_operator = "#205081";
        }

        result_number = data.replace(new RegExp(/(?:[\s\S]*)(?:<span class="result_number">)(.*?)(?=\<\/span>)(?:[\s\S]*)/, 'g'), '$1');

        country = data.replace(new RegExp(/(?:[\s\S]*?)(?:\<strong\>)(.*?)(?=\<\/strong>)(?:[\s\S]*)/, 'g'), '$1');
        //

        ///(\<img.*src\=\")(.*?)(?=\")(.*?)
        if (country === "Россия") {
            //
            info_op = data.replace(new RegExp(/(?:[\s\S]*?)(?:Код сотового оператора[\s\S]*?)(?:\<strong\>)(.*?)(?=\<\/strong>)(?:[\s\S]*)/, 'g'), '$1');

            if (data.search(/(.*?)(?= \[)/g) !== -1) {

                if (data.search(/(?:[\s\S]*)(?:\<span style=\"color\:.*)(?:\"\>)(.*?)(?=\<\/span>)(?:[\s\S]*)/g) !== -1) {
                    name_operator = data.replace(new RegExp(/(?:[\s\S]*?)(?:\<span style=\"color\:.*)(?:\"\>)(.*?)(?:\<\/span>)(?:[\s\S]*)/, 'g'), '$1');
                } else {
                    //TODO:
                    name_operator = data.replace(new RegExp(/(?:[\s\S]*)(?:\<div class\=\"result_row\"\>.*\<\/span\>)(.*?)(?=\<\/div>)(?:[\s\S]*)/, 'g'), '$1');
                }
                region_op = info_op.replace(new RegExp(/(?:[\s\S]*?)(?:\[)(.*?)(?=\])(?:[\s\S]*)/, 'g'), '$1');
                num_part = data.replace(new RegExp(/(?:[\s\S]*?)(?:\<td class\=\"part-tel\"\>)([\d]{3}?)(?=\<\/td>)(?:[\s\S]*)/, 'g'), '$1');
                orig_op = info_op.match(/(.*?)(?= \[)/g)[0];
                pool_start = data.match(/[\d]{7}/g);
                pool_op = '' + num_part + pool_start[0] + ' - ' + num_part + pool_start[1];
                mnp_status = data.replace(new RegExp(/(?:[\s\S]*)(?:\<div class=\"result_bdpn bdpn\"\>БДПН\: \<b\>)(.*?)(?=\<\/b\>)(?:[\s\S]*)/, 'g'), '$1');
                if (mnp_status === "номер перенесен") {
                    mnp_info = data.replace(new RegExp(/(?:[\s\S]*)(?:\<div class=\"result_bdpn bdpn\"\>БДПН\: \<b\>.*\<\/b\> - )(.*?)(?=\<\/div>)(?:[\s\S]*)/, 'g'), '$1');
                } else {
                    mnp_info = "-";
                }
            } else {
                orig_op = "Не определен";
                region_op = info_op[1];
            }

            time = data.replace(new RegExp(/(?:[\s\S]*)(?:\<span id\=\"kody_time\".*data\=\")(.*?)(?=\"\>.*\<\/span\>)(?:[\s\S]*)/, 'g'), '$1');
        } else {
            name_operator = data.replace(new RegExp(/(?:[\s\S]*)(?:\<div class\=\"result_row\"\>.*\<\/span\>)(.*?)(?=\<\/div>)(?:[\s\S]*)/, 'g'), '$1');
        }

        _object = {
            result_number: result_number,
            img_operator: img_operator,
            color_operator: color_operator,
            name_operator: name_operator,
            country: country,
            region_op: region_op,
            orig_op: orig_op,
            mnp_info: mnp_info,
            mnp_status: mnp_status,
            pool_op: pool_op, time: time };
        document.getElementById("number_bla_search").value = "";
        WriteData.call(_object, text);
    }
}

function Kody_Request(text, idelem, Logging, WriteData) {

    //errorload timeout

    var e = text.number,
        o = document.getElementById(idelem),
        n = CharsetDetect();

    try {
        var xmlRequest = $.ajax({
            method: "POST",
            url: "https://www.kody.su/embed/widget.php?ref=" + document.referrer,
            data: { number:e, charset: n},
            timeout:4000,
            success: function(json) {
                // какие-то действия с полученными данными
            },
            error: function(xhr, ajaxOptions, thrownError) {
                //debug.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            },
            complete: function(jqXHR, textStatus) {
                if (textStatus === 'success') {
                    //debug.log( "APIKODY",'Успешно.');
                }
                if (textStatus === 'error') {
                    //debug.log( "APIKODY",'APIKODY: Ошибка.');
                }
            },
            // success(data, textStatus, jqXHR):function
        });


//TODO: TODO REQUESTS
        xmlRequest.done(function( msg ) {
            Logging.call(o, msg, WriteData, text);
            debug.log( "APIKODY","Data Saved");

        });
        xmlRequest.fail(function( jqXHR, textStatus ) {
            Logging.call(o, "errorload timeout", WriteData, text);
            debug.log( "APIKODY","Request failed: " + textStatus );

        });


    } catch (r) {
        window.console && debug.log( r);
    }
}

function CharsetDetect() {
    for (var e = document.getElementsByTagName("meta"), t = 0; t < e.length; t++) {
        if (e[t].getAttribute("charset")) return e[t].getAttribute("charset");
    }return "";
}

$('#modal_close1, #overlay1, #savetemplatecombine ').click(function () {
    // лoвим клик пo крестику или пoдлoжке
    $('#modal_form1').animate({ opacity: 0, top: '45%' }, 200, // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
        function () {
            // пoсле aнимaции
            $(this).css('display', 'none'); // делaем ему display: none;
            $('#overlay1').fadeOut(400); // скрывaем пoдлoжку
        });
});


window.onerror = function(message, url, lineNumber) {
    debug.log( "Поймана ошибка!\n" +
        "Сообщение: " + message + "\n(" + url + ":" + lineNumber + ")");
};


function TemplateFunction(Template) {
    var search = ["{{", "}}"];
    var replaceTo = ['<%=', '%>'];
    for (var t = 0; t < search.length; t++) {
        Template = Template.replace(new RegExp(search[t], 'g'), replaceTo[t]);
    }
    return Template;
}



function setDebug(isDebug) {
    if (isDebug) {
        window.debug = {
            log: window.console.log.bind(window.console, 'NEWYT: %s: %s'),
            error: window.console.error.bind(window.console, 'NEWYT: error: %s'),
            info: window.console.info.bind(window.console, 'NEWYT: info: %s'),
            warn: window.console.warn.bind(window.console, 'NEWYT: warn: %s')
        };
    } else {
        var __no_op = function() {};

        window.debug = {
            log: __no_op,
            error: __no_op,
            warn: __no_op,
            info: __no_op
        }
    }
}

setDebug(true);

// ...

// debug.log('wat', 'Yay custom levels.'); // -> wat: Yay custom levels.    (line X)
// debug.info('This is info.');            // -> info: This is info.        (line Y)
// debug.error('Bad stuff happened.');     // -> error: Bad stuff happened. (line Z)
///!!!!!!! OpenTemplateSaver()
var dictionaries = {
    mainLabelMins: "Пакеты минут:  ",
    mainLabelGibs: "Пакеты трафика: ",
    mainLabelItemMin: "{{mcount}} минут за {{mprice}} рублей ",
    mainLabelItemGb: "{{gcount}} ГБ за {{gprice}} рублей ",
    mainLabelApp: "Все опции и БМП",
    idHeaderVoicePrice: "id-Тарифы[Тест]-СтоимостьвызововиSMS_",
    idHeaderVoicePriceText: "Стоимость вызовов и SMS",
    idHeaderAdding: "id-Тарифы[Тест]-Дополнительныеуслуги_",
    idHeaderAddingText:"Подробнее",
    logoText: "Реклама Yota вместо логотипа",
    placeholderValue: 'Выберите регион',
    searchPlaceholderValue: 'Наверное, это поле поиска..',
    loadingText: 'Loading...',
    noResultsText: 'Не найдено вариантов. Реклама Yota в поисковой строке',
    noChoicesText: 'Что-то пошло не так :(',
    textAreahold: "Пока ничего не выбрано :( ",
    itemSelectText: 'Выбрать',
    outplaceholderValue: 'Выберите страну',
    roamplaceholderValue: 'Выберите страну',
    BodyVoicePrice: "Выбери тариф и регион",
    modemNoLaunch: "Модем не запущен",
    voiceNoLaunch: "Голос не запущен",
    regionNoLaunch: "Регион не запущен",

    unlim_phone_element: "Пакет {{mcount}} минут - {{mprice}} рублей",
    var2: "",
    var3: "",
    var4: "",

    text_of_yota_newcombine_unlim_phone: '<tbody> <tr><tr><hr></tr>' +
        '<tr><b>{{region_name}}</b></tr><br>' +
        '<tr><b>Тарифные пакеты</b><br>' +
        '{{list_unlim_phone}}</tr>' +
        '<tr><b>Интернет</b><br>' +
        'Безлимитный интернет</tr><br>' +
        '<tr><b>Опции</b><br>' +
        'Доп. пакет 100 минут: {{voice_add_100}} руб.<br>' +
        'Пакет SMS: {{sms_base}} руб.</tr><br> ' +
        '<tr><b>Опция «Общий доступ в интернет»</b><br>' +
        '2 часа на максимальной скорости -  {{t2hour}} руб.<br>' +
        '24 часа на максимальной скорости - {{t24hour}} руб.</tr><br> ' +
        '<tr><b>Дополнительно</b><br>' +
        'SMS/MMS (поштучно, руб.): {{sms_over_pack}} руб.<br>' +
        'Стоимость минуты сверх пакета (руб.): {{min_over_pack}} руб</tr><br> ' +
        '<tr><b>Примечания</b> (будут заполнены позже)<br></tr> ' +
        '</tr></tbody>',


    text_of_yota_newcombine_yota_newcombine_abcb: '<tbody> <tr><tr><hr></tr>' +
        '<tr><b>{{region_name}}</b></tr><br>' +
        '<tr><b>Минуты</b><br>' +
        '{{mins}}<br></tr>' +
        '<tr><b>Трафик</b><br>' +
        '{{gigs}}<br></tr>' +
        '<tr><b>Безлимитные Мобильные приложения</b><br>' +
        '{{unlimapps}} . <br>' +
        '</tr><br>' +
        '<tr><b>Опции</b><br>' +
        'Доп. пакет 100 минут: {{voice_add_100}} руб.<br>' +
        'Доп. пакет 5 Гб: {{gb_add_5}} руб.<br>' +
        'Пакет SMS: {{sms_base}} руб.</tr><br> ' +
        '<tr><b>Дополнительно</b><br>' +
        'SMS/MMS (поштучно, руб.): {{sms_over_pack}} руб.<br>' +
        'Стоимость минуты сверх пакета (руб.): {{min_over_pack}} руб</tr><br> ' +
        '</tr></tbody>',


    text_of_yota_newcombine_yota_newcombine_abca: '<tbody> <tr><tr><hr></tr>' +
        '<tr><b>{{region_name}}</b></tr><br>' +
        '<tr><b>Тарифные пакеты</b><br>' +
        '{{tariffs}}<br></tr>' +
        '<tr><b>Опция БМП</b><br> ' +
        'Безлимитные Мобильные приложения - {{unlimapps}} рублей<br>' +
        '</tr><br>' +
        '<tr><b>Опции</b><br>' +
        'Доп. пакет 100 минут: {{voice_add_100}} руб.<br>' +
        'Доп. пакет 5 Гб: {{gb_add_5}} руб.<br>' +
        'Пакет SMS: {{sms_base}} руб.</tr><br> ' +
        '<tr><b>Дополнительно</b><br>' +
        'SMS/MMS (поштучно, руб.): {{sms_over_pack}} руб.<br>' +
        'Стоимость минуты сверх пакета (руб.): {{min_over_pack}} руб</tr><br> ' +
        '</tr></tbody>',


    text_of_yota_newcombine_old_plaphone: '<tbody> <tr><tr><hr></tr>' +
        '<tr><b>{{region_name}}</b></tr><br> ' +
        '{{lis_plaphone_old}}<br></tr>' +
        '<tr><b>Опция БМП</b><br> ' +
        'Безлимитные Мобильные приложения<br>' +
        'Вконтакте, Одноклассники, Facebook, Instagram, Twitter: по {{social}} руб.<br>' +
        'Skype, Viber, Whatsapp: по {{messenger}} руб.<br>' +
        'Youtube: {{youtube}} руб.<br>' +
        '</tr><br>' +
        '<tr><b>Опции</b><br>' +
        'Доп. пакет 100 минут: {{voice_add_100}} руб.<br>' +
        'Доп. пакет 5 Гб: {{gb_add_5}} руб.<br>' +
        'Пакет SMS: {{sms_base}} руб.</tr><br> ' +
        '<tr><b>Дополнительно</b><br>' +
        'SMS/MMS (поштучно, руб.): {{sms_over_pack}} руб.<br>' +
        'Стоимость минуты сверх пакета (руб.): {{min_over_pack}} руб</tr><br> ' +
        '</tr></tbody>',


    text_of_yota_newcombine_unlim_tab: '<tbody> <tr><tr><hr></tr>' +
        '<tr><b>{{region_name}}</b></tr><br> ' +
        '<tr><b>Тарифные пакеты</b><br> ' +
        'Тариф День: {{day}} рублей<br>' +
        'Тариф Месяц: {{mounth}} рублей<br>' +
        'Тариф Год: {{year}} рублей<br> ' +
        '<tr><b>Стоимость месяца при подключении на год</b><br>  ' +
        '275 рублей ' +
        '</tr><br>' +
        '<tr><b>Скидка при подключении на год: </b> {{procentas}}.<br> ' +
        '<tr><b>Тетеринг</b><br>' +
        'Бесплатный тетеринг на скорости до 128 Кбит/с. Платного тетеринга нет.<br> </tr>' +
        '<tr><b>Дополнительно</b><br>' +
        'Голосовые исходящие вызовы — {{min_pag}} руб. за минуту.<br>' +
        'SMS/MMS — {{sms_pag}} руб. за штуку.<br>' +
        'Входящие звонки, за пределами домашнего региона — {{in_roam}} руб. за минуту.<br> ' +
       '</tr></tbody>',

    text_of_yota_newcombine_modem: '<tbody>' +
    '            <tr><tr><hr></tr>' +
    '            <tr><b>{{region_name}}</b></tr><br>' +
    '            <tr><b>Диапазон цен</b><br>' +
    '            {{rangeprice}}</tr><br>' +
    '            <tr><b>Диапазон скоростей</b><br>' +
    '            {{rangespeed}}</tr><br>' +
    '            <tr><b>Длинные тарифы</b><br>' +
    '            {{year}}<br>' +
    '            </tr><tr>' +
    '            <b>Турбокнопки</b><br>' +
    '            {{turbo}}<br>' +
    '            </tr><tr>' +
    '            <b>Список тарифов (30 дней)</b><br>' +
    '            {{list}}' +
    '            </tr><tr>' +
    '            <b>БСД и БГ</b><br>' +
    '            {{free}}<br>' +
    '            </tr></tr></tbody>',
    list_plaphone: '',

    text_of_yota_newcombine_plaphone: '<table style="width: 800px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 40%;"><col style="width: 60%;"><col style="width: 25%;"></colgroup> <tbody>' +
        ' <tr ><td colspan="2"  align ="center" ><div class="pretextselect"><b>{{region_name}} </b></div></td></tr>' +
        '   <tr>' +
        '    <td width="100" valign="top"> {{list_plaphone}} </td>' +
        '    <td  valign="top"> <table style="width: 350px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 75%;"><col style="width: 25%;"></colgroup>  <tbody>   ' +
        '             <tr><td colspan="2" align ="center"><hr></td></tr>' +
        '             <tr><td colspan="2" align ="center">' +
        '         <table width="100%"  class="pretextselect" ><colgroup><col style="width: 75%;"><col style="width: 25%;"></colgroup>' +
        '                <tr><td colspan="2" align ="center"><b>Безлимитные приложения:</b><br></td></tr> ' +
        '                <tr><td colspan="2" align ="center"><hr></td></tr>  ' +
        '                <tr><td align ="left" >Вконтакте, Одноклассники, Facebook, Instagram, Twitter:</td> <td align ="right" >по {{social}} руб. </td></tr>' +
        '                <tr><td align ="left">Skype, Viber, Whatsapp:</td>  <td align ="right" >по {{messenger}} руб.</td></tr> ' +
        '                <tr><td align ="left">Youtube:</td>  <td align ="right" >{{youtube}} руб.</td></tr> ' +
        '         </table>' +
        '         </td></tr> ' +
        '         <tr><td colspan="2" align ="center">' +
        '          ' +
        '                <hr><tr><td colspan="2" align ="center"><b>Опции:</b><br></td></tr> ' +
        '                <tr><td colspan="2" align ="center"><hr></td></tr> ' +
        '                <tr class="pretextselect"><td align ="left">Доп. пакет 100 минут:</td>  <td align ="right" >{{voice_add_100}} руб.</td></tr> ' +
        '                <tr class="pretextselect"><td align ="left">Доп. пакет 5 Гб:</td>  <td align ="right" >{{gb_add_5}} руб.</td></tr> ' +
        '                <tr class="pretextselect"><td align ="left">Пакет SMS:</td>  <td align ="right" >{{sms_base}} руб.</td></tr>  ' +
        '         ' +
        '         </td></tr> ' +
        '         <tr><td colspan="2" align ="center">' +
        '         ' +
        '                <hr><tr><td colspan="2" align ="center"><b>Дополнительно:</b><br></td></tr> ' +
        '                <tr class="pretextselect"><td colspan="2" align ="center"><hr></td></tr> ' +
        '                <tr class="pretextselect"><td align ="left">SMS/MMS (поштучно, руб.):</td>  <td align ="right" >{{sms_over_pack}} руб.</td></tr> ' +
        '                <tr class="pretextselect"><td align ="left">Стоимость минуты сверх пакета (руб.): </td>  <td align ="right" >{{min_over_pack}} руб.</td></tr> ' +
        '         ' +
        '         </td></tr></tbody></table> </td> </tr></tbody></table>',


    text_of_yota_newcombine_nullbalance_plaphone: '<table style="width: 400px;"  border="0" cellpadding="0" cellspacing="0"><colgroup><col style="width: 40%;"><col style="width: 60%;"><col style="width: 25%;"></colgroup><tbody>' +
    ' ' +
    '    <td width="100" valign="top" >{{cur_region_teriff.dostavka}} </td>' +
    '    </tbody></table>',

    list_tabt: '',





    type_legoPlaphoneVoice0: ' <tr><td class="confluenceTd">Исходящие в домашний регион на других операторов: </td><td class="confluenceTd">{{pag_voice_inbound}} руб./мин.</td></tr>\n' +
    '                    <tr><td class="confluenceTd">Исходящие в другой регион на других операторов: </td><td class="confluenceTd">{{pag_voice}} руб./мин.</td></tr>\n' +
    '                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd">{{pag_voice_inbound}} руб./шт.</td></tr> \n' +
    '                    <tr><td class="confluenceTd">Входящие вызовы (в домашнем регионе): </td><td class="confluenceTd"> Бесплатные </td></tr>\n' +
    '                    <tr><td class="confluenceTd">Входящие вызовы (вне домашнего региона): </td><td class="confluenceTd">{{pag_voice}} руб./мин.</td></tr>\n' +
    '                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">{{pag_sms}} руб./шт.</td></tr>\n' +
    '                    <tr><td class="confluenceTd" colspan="2">При подключении «дополнительных 100 минут» звонки Yota-Yota становятся бесплатными и не расходуют пакет минут, вся тарификация - как при активном пакете </td>',

    type_legoPlaphoneVoice: '<tr><td class="confluenceTd">Стоимость минуты сверх пакета на всех операторов РФ: </td><td class="confluenceTd">{{min_over_pack}} руб./мин.</td></tr> \n' +
    '                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd"> Не тарифицируются </td></tr> \n' +
    '                    <tr><td class="confluenceTd">Входящие вызовы: </td><td class="confluenceTd"> Бесплатные </td></tr>\n' +
    '                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">{{sms_over_pack}} руб./шт.</td></tr>',




    type_legoTabtVoice0: '<tr><td class="confluenceTd">Стоимость минуты на всех операторов РФ: </td><td class="confluenceTd">{{voice_pag}} руб./мин.</td></tr> \n' +
    '                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd">{{voice_pag}} руб./мин.</td></tr> \n' +
    '                     <tr><td class="confluenceTd" colspan="2">Входящие вызовы в любом регионе (кроме Республики Крым и г. Севастополя) — бесплатны. </td> \n' +
    '                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">{{sms_pag}} руб./шт.</td></tr>\n' +
    '                    <tr><td class="confluenceTd" colspan="2">При подключении «дополнительных 100 минут» вся тарификация - как при активном пакете </td>',


    type_legoTabtVoice: '<tr><td class="confluenceTd">Стоимость минуты сверх пакета на всех операторов РФ: </td><td class="confluenceTd">{{voice_pag}} руб./мин.</td></tr> \n' +
    '                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd"> Не тарифицируются </td></tr> \n' +
    '                     <tr><td class="confluenceTd" colspan="2">Входящие вызовы в любом регионе (кроме Республики Крым и г. Севастополя) — бесплатны. </td> \n' +
    '                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">{{sms_pag}} руб./шт.</td></tr>',


    text_of_yota_newcombine_outrussia: '<div className="b-roaming-operators-table i-bem"> \n' +
    '                    <ul id="myTable_MN" className="b-roaming-operators-table__inner" style="font-size: 14px;"> \n' +
    '                    <li><b style="color:#00bbf2">{{zone}}</b></li>\n' +
    '                    <li>Страна: {{name}}</li>\n' +
    '                    <li>Исходящие вызовы: {{minute}} р./мин.</li>\n' +
    '                    <li>SMS: {{sms}} р./шт.</li>\n' +
    '                    <li>MMS: {{mms}} р./шт.</li>\n' +
    '                    </ul>\n' +
    '                </div>',

    text_of_yota_newcombine_roaming: '<div className="b-roaming-operators-table i-bem">              <tbody> \n' +
    '            <tr><b>{{countryname}}</b></tr><br>\n' +
    '            <tr><b>Интернет.</b><br>\n' +
    '            Стоимость 1 мегабайта при наличии подключенного пакета: {{mb_price}} руб. Тарификация по 100 КБ.<br>\n' +
    '            После использования {{paid_mb}} платных МБ, {{free_mb}} МБ - бесплатно.</tr><br>\n' +
    '            <tr><b>Звонки.</b><br>\n' +
    '            <br>Стоимость входящих звонков: {{invoice}} руб./мин.<br>\n' +
    '            Стоимость опции "30 минут бесплатных входящих в день": {{m30min}} руб.</tr><br>\n' +
    '            <tr>Минута: <ul> \n' +
    '            <li>исходящих звонков в РФ: {{out_rf}} руб.</li>\n' +
    '            <li>исходящих звонков внутри страны: {{out_country}} руб.</li>\n' +
    '            <li>исходящих звонков в другие страны: {{out_other}} руб. </li>\n' +
    '            </ul><b>SMS</b> (включая бесплатные в РФ номера): <ul>\n' +
    '            <li>исходящие: {{out_sms}} руб.</li>\n' +
    '            <li>входящие : {{in_sms}} руб.</li>\n' +
    '            </ul><b>MMS</b>: <ul>\n' +
    '            <li>исходящие: {{out_mms}</li>\n' +
    '            <li>входящие: Стоимость интернет-сессии.</li></ul>\n' +
    '            </tr><tr><br>Стоимость 1 Мб, если не оплачен основной пакет (Базовый, Региональный, ...): {{mb_base} руб.<br>\n' +
    '            Стоимость минуты исходящих звонков на спутниковые сети (Thuraya, Inmarsat,...): 313 руб./мин.</tr></tr></tbody>  </table></div>',

    roamingClosed: "В данной стране нет подключения к сети, роуминг закрыт",
    roamingNoInet:"В данной стране нет доступа к интернету",


    widgetNocorrect: "Введите корректный номер, пожалуйста",
    widgetTime: "Время в регионе: <b>{{time}}</b> ", //поправить

    widgetNoOperator: 'Номер: <b>{{number}}</b>.  <br>' +
    'Регион: {{region}} ({{country}})<br> ',

    widgetRegion: '${data.region_op} (${data.country})',

    widgetInfo: ' Номер: <b>{{number}}</b>.  <br>\
    Оператор: {{img}} <span style="color:{{color_operator}}"><b>{{name_operator}}</b>.</span>\
    <a target="_blank" href="https://zniis.ru/bdpn/check?num={{number}}">  Перепроверить </a><br>\
    Регион: {{region}}<br>\
    Из дипазона: {{pool_op}}<br>\
    MNP: {{mnp_status}} <br>',

    widgetInfoMnp: 'INFO: <b>{{mnp_info}}</b>.  <br> ',

    widgetNoRussia: 'Номер: <b>{{number}}</b>.  <br>\n' +
    'Оператор: {{img}}<span style="color:{{color_operator}}">' +
    '<b>{{name_operator}}</b>.</span><br>\n' +
    'Страна: {{country}}<br>',

    widgetLoadindText: 'Подождём загрузку... ',
    widgetLoadingError: "Ошибка загрузки. Повторите попытку",
    widgetNumberIncorrect: "Номер некорректный",
    widgetNumberNofound: "Ошибка. Номер не найден",
    // <% messenger.forEach(function(item) { %>
    //                                 <div class="divTableCell">
    //                                     <input data-name="<%-item[0]%>" id="app-<%-item[0]%>_{{type}}" class="input_app-<%-item[0]%>" type="checkbox" name="select_apps_{{type}}" value="<%-item[1]%>" onchange='updateLegoInfo(this, "{{type}}")'">
    //                                     <label for="app-<%-item[0]%>_{{type}}" class="layout-buttons"><span> <div data-name="<%-item[0]%>" class="b-voice-calculator__application-icon">
    //                                        <div class="b2c-voice-collect__app-price" data-name="app-social_{{type}}" data-for="<%-item[0]%>_{{type}}"  tooltip-position='left'> <div class="b2c-voice-collect__app-price_text"> 20&#8381; </div> </div>
    //                                        </div></span></label>
    //                                 </div>
    //                                 <% }); %>



};

///TODO: Сделать удобное добавление приложений
