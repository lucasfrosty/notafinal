const GRIDS_LENGTH = 5;

$(document).ready(function() {
  $(".grid").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(
    e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
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



  $("#submit-button").click(function() {
    var avarage = getAvarage();

    if (avarage >= 4 && avarage < 7) {

      var grid = avarage.toFixed(2);
      $("body").css("background-color", "#dfba33");
      $("#title").text("Sua média foi " + grid);
      createNewSubtitle("Você terá que fazer a prova final precisando tirar "
      + howMuchNeededToPass(Number(grid)), "final-subtitle");
      $("meta[name=theme-color]").setAttribute("content", "#a1851f");

      removeThings();

      createNewSubtitle("Digite sua nota no exame final:", "final-subtitle-2");
      // createFinalGridText();
      createFinalGridInput();
      createResetButton('btn-reset-sm');
      calcButton(howMuchNeededToPass(Number(grid)));

    } else if (avarage >= 7 && avarage <= 10) {
      failOrSuccess(avarage.toFixed(2), true, false);

    } else if (avarage < 4) {
      failOrSuccess(avarage.toFixed(2), false, false);
    } else {
      invalid();
    }

  });

});


function getValidGrids () {
  var grids = [];

  for (var i = 1; i <= GRIDS_LENGTH; i++) {
    if (($(`#grid-${i}`).val())) {
      grids.push(Number($(`#grid-${i}`).val()));
      $(`#grid-${i}`).val('');
    }
  }

  return grids;
}

function getAvarage() {
  var grids = getValidGrids();
  var sumGrids = grids.reduce((sumGrids, grid) => sumGrids + grid, 0);
  var avarage = sumGrids / grids.length;

  return avarage;
}

function invalid() {
  alert("Você digitou uma nota inválida, tente novamente");
  location.reload();
}

function createNewSubtitle(text, id) {
  var $new_subtitle = $("<h3>", {
    id: id
  });
  $new_subtitle.text(text);
  $("#title").append($new_subtitle);
}

function createFinalGridInput() {
  var $final_input = $("<input>", {
    id: "final-input",
    "type": "tel",
    "class": "form-control grid",
    "maxLength": 4,
    "placeholder": "Nota"
  });
  $(".form-inline").append($final_input);
}

function createResetButton(buttonClass) {

  var $reset_button = $("<button>", {
    id: "reset-button",
    "class": "btn btn-lg " + buttonClass
  });
  $reset_button.text("Voltar");
  $reset_button.click(function() {
    location.reload();
  });

  $(".container").append($reset_button);
}

function calcButton(grid, finalResult) {
  var $calc_button = $("<button>", {
    id: "submit-final",
    "class": "btn btn-calc-sm btn-lg"
  });
  $calc_button.text("Calcular");
  $calc_button.click(function() {
    var gridFinal = $('#final-input').val();
    if (gridFinal && (gridFinal >= 0 && gridFinal <= 10)) {
      var finalResult = calcFinalGrid(grid, gridFinal);
      verifyFinalResult(finalResult.toFixed(2));
    } else {
      alert('Nota inválida, tente novamente');
    }

  });
  $(".container").append($calc_button);
}

function verifyFinalResult(finalResult) {

  (function removeInputAndCalcButton () {
    $("#final-input").remove();
    $("#submit-final").remove();
  })();

  if (finalResult >= 5 && finalResult < 10) {
    failOrSuccess(finalResult, true, true);
  } else if (finalResult < 5 && finalResult >= 0) {
    failOrSuccess(finalResult, false, true);
  } else {
    invalid();
  }

}

function failOrSuccess(grid, failOrSuccess, isFinalInput) {

  if (failOrSuccess) {
    var content = {
      bodyBackgroundColor: "#499149",
      subtitleText: "Parabéns, você passou!",
      themeColor: "#1e4b1e"
    };
  }
  else {
    var content = {
      bodyBackgroundColor: "#BC4F4F",
      iconBackgroundColor: "#3c8ca3",
      subtitleText: "Você não passou :(",
      themeColor: "#591c1c"
    };
  }

  if (!isFinalInput) {
    removeThings();
  }

  $("body").css("background-color", content.bodyBackgroundColor);
  $("#floating-button").css("background", content.iconBackgroundColor);
  $("meta[name=theme-color]").setAttribute("content", content.themeColor);
  $("#title").text("Sua média foi " + grid);
  createNewSubtitle(content.subtitleText, "new-subtitle");
  $('#reset-button').remove();
  createResetButton('btn-reset');

}

function removeThings() {
  $("#subtitle").remove();
  $("#submit-button").remove();

  for (var i = 1; i <= GRIDS_LENGTH; i++) {
    $(`#grid-${i}`).remove();
  }

}

function howMuchNeededToPass(element) {
  var diff = element - 4.0;
  return (6.5 - diff * 1.5).toFixed(2);
}

function calcFinalGrid(media, gridFinal) {
  var diff = media - gridFinal;
  return Number(5.0 - (diff * 0.4));
}
