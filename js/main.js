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
        nota1 = $('#nota1').val();
        nota2 = $('#nota2').val();
        nota3 = $('#nota3').val();

        calcNota = calcNota(nota1, nota2, nota3);

        if (calcNota < 0 || calcNota > 10) {
            alert("Você digitou uma nota inválida, tente novamente");
        }

        if (calcNota >= 7) {
            $("body").css("background-color", "#388e3c");
            $("#title").text("Você passou! Sua média foi " + calcNota.toFixed(1));
            $("#subtitle").remove();
            $("#nota1").remove();
            $("#nota2").remove();
            $("#nota3").remove();
            $("#addBtn").remove();
            $("#removeBtn").remove();
            $("#submit1").remove();
        } else if (calcNota < 4) {
            // não passou
        } else {
            // final
        }

    });

    $('#resetBtn').click(function() {
        location.reload();
    });
});


function calcNota(p1, p2, p3) {
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

    return (result / counter);

}
