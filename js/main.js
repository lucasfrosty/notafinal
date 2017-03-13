$(document).ready(function() {
    $(".nota").keydown(function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("#submit1").click(function() {
        var finalResult = 0;
        defineNotas();
        calcNota = calcNota(nota1, nota2, nota3, nota4, nota5);

        if (calcNota >= 4 && calcNota < 7) {

            nota = calcNota.toFixed(1);
            $("body").css("background-color", "#FFD740");
            $("footer").css("background-color", "#d5b334");
            $("#title").text("Sua média foi " + nota + "Você terá que fazer a prova final precisando tirar " + calcQuantoPrecisa(Number(nota)));

            usingBreakLine(17);
            usingBreakLine(76);
            removeThings();

            createFinalSubtitle();
            createFinalNoteInput();
            calcBtn(calcQuantoPrecisa(Number(nota)), finalResult);
            createResetBtn();

        } else if (calcNota >= 7 && calcNota <= 10) {
            success(calcNota.toFixed(1));

            if (calcNota == 10) {
              usingBreakLine(18);
            } else {
              usingBreakLine(17);
            }

            createResetBtn();

        } else if (calcNota < 4) {
            fail(calcNota.toFixed(1));
            usingBreakLine(17);
            createResetBtn();

        } else {
            invalid();
        }

    });

});

function invalid() {
    alert("Você digitou uma nota inválida, tente novamente");
    location.reload();
}

function usingBreakLine(index) {
    var $title = $("#title").html();
    $title = $title.substring(0, index) + "<br>" + $title.substring(index);
    $("#title").html($title);
}

function createFinalNoteInput() {
    var $input = $("<input>", {
        id: "notaFinal",
        "class": "form-control nota",
        "maxLength": 4,
        "placeholder": "Nota"
    });
    $(".form-inline").append($input);
}

function createFinalSubtitle() {
    $("#title").append("<h3>Digite sua nota no exame final:</h3>");
}

function createResetBtn() {
    var $button = $("<button>", {
        id: "resetBtn",
        "class": "btn btn-reset btn-lg"
    });
    $button.text("Voltar");
    $button.click(function() {
        location.reload();
    });
    $(".container").append($button);
}

function calcBtn(nota, finalResult) {
    var $button = $("<button>", {
        id: "submitFinal",
        "class": "btn btn-calc btn-lg"
    });
    $button.text("Calcular");
    $button.click(function() {
        notaFinal = $('#notaFinal').val();
        if (notaFinal != '') {
            finalResult = calcNotaFinal(nota, notaFinal);
            verifyFinalResult(finalResult.toFixed(1));
        }

    });
    $(".container").append($button);
}

function verifyFinalResult(finalResult) {
    if (finalResult >= 5 && finalResult < 10) {
        success(finalResult);
        usingBreakLine(17);
        $("#notaFinal").remove();
        $("#submitFinal").remove();
    } else if (finalResult < 5 && finalResult >= 0) {
        fail(finalResult);
        usingBreakLine(17);
        $("#notaFinal").remove();
        $("#submitFinal").remove();
    } else {
      invalid();
    }
}

function fail(nota) {
    $("body").css("background-color", "#e53935");
    $("footer").css("background-color", "#bb302d");
    $("#title").text("Sua média foi " + nota + "Você não passou :( ");

    removeThings();

}

function success(nota) {
    $("body").css("background-color", "#388e3c");
    $("footer").css("background-color", "#2a702d");
    $("#title").text('Sua média foi ' + nota + 'Parabéns, você passou!')
    removeThings();
}

function calcNota(p1, p2, p3, p4, p5) {
    var result = 0;
    var counter = 0;

    if (p1 != '') {
        numberP1 = Number(p1);
        result = result + numberP1;
        counter++;
    }

    if (p2 != '') {
        numberP2 = Number(p2);
        result += numberP2;
        counter++;
    }

    if (p3 != '') {
        numberP3 = Number(p3);
        result += numberP3;
        counter++;
    }

    if (p4 != '') {
        numberP4 = Number(p4);
        result += numberP4;
        counter++;
    }

    if (p5 != '') {
        numberP5 = Number(p5);
        result += numberP5;
        counter++;
    }

    return (result / counter);
}

function defineNotas() {
    nota1 = $('#nota1').val();
    nota2 = $('#nota2').val();
    nota3 = $('#nota3').val();
    nota4 = $('#nota4').val();
    nota5 = $('#nota5').val();
}

function removeThings() {
    $("#subtitle").remove();
    $("#nota1").remove();
    $("#nota2").remove();
    $("#nota3").remove();
    $("#nota4").remove();
    $("#nota5").remove();
    $("#submit1").remove();
}

function calcQuantoPrecisa(element) {
    diff = element - 4.0;
    return (6.5 - diff * 1.5).toFixed(1);
}

function calcNotaFinal(media, notaFinal) {
    diff = media - notaFinal;
    return Number((-(diff * 0.4) + 5.0));
}
