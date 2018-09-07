console.log("test");
const MainLink = "https://iknow.yotateam.com/pages/viewpage.action?pageId=138481526";

let modalframecombine = `
<div id="modal_form">
    <span id="modal_close">X</span>
    <!--TODO-->
    <form name="validate">
    <p><b>Введите ваш шаблон:</b></p>
    <p><textarea name="template" rows="10" cols="45" name="text" class="yota_newcombine_b_summary_tarif_text" id="yota_newcombine_b_tafir_template" placeholder="Пусто" onmousedown="mDown(this)" onmouseup="mUp(this)" onmouseover="mOver(this)" onmouseout="mOut(this)" ></textarea>
    <br><span class="error empty">Отсутствует текст.<br></span></p>
    <p>  <input type="button" name="check" value="Сохранить" id="savetemplatecombine"  onclick="saveTemplate()"></p>
</form>

</div>
<div id="overlay"></div>

`;



document.getElementById("yota_newcombine_notebnote").innerHTML =modalframecombine;
//////todo сделать функцию по переходе на ссылку

function OpenTemplateSaver() {

    // $(document).ready(function () { /
    // });
        // $('a#go').click( function(event){ // лoвим клик
        //     event.preventDefault(); /

        let temp = localStorage.getItem("userTemplate");
        if (!!temp) {
            document.getElementById("yota_newcombine_b_tafir_template").innerHTML = temp;
        }

        $('#overlay').fadeIn(400,
            function () {
                $('#modal_form')
                    .css('display', 'block') //
                    .animate({opacity: 1, top: '50%'}, 200); // плaвнo
            });
        // });


}
/* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
$('#modal_close, #overlay, #savetemplatecombine ').click(function () { // лoвим клик пo крестику или пoдлoжке
    $('#modal_form')
        .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
            function () { // пoсле aнимaции
                $(this).css('display', 'none'); // делaем ему display: none;
                $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                window.open(MainLink,"_self");
            }
        );
});
//TODO Переопределение функций
// importRateRussia = function(){
//     console.log("Добрый день");
//
//
// }


