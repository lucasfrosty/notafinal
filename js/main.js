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
        defineNotas();
        calcNota = calcNota(nota1, nota2, nota3, nota4, nota5);

        if (calcNota < 0 || calcNota > 10) {
            alert("Você digitou uma nota inválida, tente novamente");
            location.reload();
        }

        if (calcNota >= 7 && calcNota <= 10) {
            $("body").css("background-color", "#388e3c");
            $("footer").css("background-color", "#2a702d");
            $("#title").text('Sua média foi ' + calcNota.toFixed(1) + 'Parabéns, você passou!');

            usingBreakLine(17);
            removeThings();
            createResetBtn();

        } else if (calcNota < 4) {
            $("body").css("background-color", "#e53935");
            $("footer").css("background-color", "#bb302d");
            $("#title").text("Sua média foi " + calcNota.toFixed(1) + "Você não passou :( ");


            usingBreakLine(17);
            removeThings();
            createResetBtn();

        } else {
            nota = calcNota.toFixed(1);
            $("body").css("background-color", "#FFD740");
            $("footer").css("background-color", "#d5b334");
            $("#title").text("Sua média foi " + nota + "Você terá que fazer a prova final precisando tirar " + calcNotaFinal(Number(nota)) + "   Boa sorte!");

            usingBreakLine(17);
            usingBreakLine(76);
            usingBreakLine(76);

            removeThings();
            createResetBtn();
        }

    });

});

function usingBreakLine(index) {
    var title = $("#title").html();
    title = title.substring(0, index) + "<br>" + title.substring(index);
    $("#title").html(title);
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

function calcNotaFinal(element) {
    switch (element) {
        case 4.0:
            return 6.5;
            break;
        case 4.1:
            return 6.35;
            break;
        case 4.2:
            return 6.2;
            break;
        case 4.3:
            return 6.05
            break;
        case 4.4:
            return 5.9;
            break;
        case 4.5:
            return 5.75;
            break;
        case 4.6:
            return 5.6;
            break;
        case 4.7:
            return 5.45;
            break;
        case 4.8:
            return 5.3;
            break;
        case 4.9:
            return 5.15;
            break;
        case 5.0:
            return 5;
            break;
        case 5.1:
            return 4.85;
            break;
        case 5.2:
            return 4.7;
            break;
        case 5.3:
            return 4.55;
            break;
        case 5.4:
            return 4.4;
            break;
        case 5.5:
            return 4.25;
            break;
        case 5.6:
            return 4.1;
            break;
        case 5.7:
            return 3.95;
            break;
        case 5.8:
            return 3.8;
            break;
        case 5.9:
            return 3.65;
            break;
        case 6.0:
            return 3.5;
            break;
        case 6.1:
            return 3.35;
            break;
        case 6.2:
            return 3.2;
            break;
        case 6.3:
            return 3.05;
            break;
        case 6.4:
            return 2.9;
            break;
        case 6.5:
            return 2.75;
            break;
        case 6.6:
            return 2.6;
            break;
        case 6.7:
            return 2.45;
            break;
        case 6.8:
            return 2.3;
            break;
        case 6.9:
            return 2.15;
            break;
        default:
            return 0;
    }
}
