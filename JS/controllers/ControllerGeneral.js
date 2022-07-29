"use strict";

const minCks = 1; //minimos de checks permitidos

//campos tipo select
let selects = document.getElementsByTagName("select");
let lblSelects = document.getElementsByClassName("lblSelect");

//todos los campos tipo input se van validando por el tipo de dato
let inputs = document.getElementsByTagName("input");
let lblInputs = document.getElementsByClassName("lblInput");

//campos tipo fieldSet valida los campos tipo radio y checkbox
let fieldSetList = document.getElementsByTagName("fieldset");

//Campos tipo TextArea
let textAreas = document.getElementsByTagName("textArea");
let lblTextAreas = document.getElementsByClassName("lblTextArea");

function ValidarCampos() {
  let ckSel = false;
  let fieldsetName;
  let fieldID;
  let fieldLegend;
  let cantCks;
  let tipoElemento;

  /***********************************************************************/
  //validar los campos SELECT
  for (var i = 0; i < selects.length; i++) {
    if (selects[i].required == true) {
      if (
        selects[i].value == "" ||
        selects[i].value == null ||
        selects[i].value == undefined
      ) {
        ImprimirMsjError(
          "Seleccione un valor para: " + lblSelects[i].textContent
        );
        ResaltarInputInvalido(selects[i].id);
        ResaltarLabelInvalido(lblSelects[i].id);
        return false;
      }
    }
  } //fin validar los campos SELECT

  /***********************************************************************/
  //validar los campos INPUTS
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].required == true) {
      //valido los campos INPUTS tipo TEXT
      if (
        inputs[i].type.toLowerCase() == "text" &&
        (inputs[i].value == "" ||
          inputs[i].value == null ||
          inputs[i].value == undefined)
      ) {
        ImprimirMsjError(
          lblInputs[i].textContent + " es requerido. ¡Favor validar!"
        );
        ResaltarInputInvalido(inputs[i].id);
        ResaltarLabelInvalido(lblInputs[i].id);
        return false;
      }

      //valido los campos INPUTS tipo TEL
      if (
        inputs[i].type.toLowerCase() == "tel" &&
        (inputs[i].value == "" ||
          inputs[i].value == null ||
          inputs[i].value == undefined)
      ) {
        ImprimirMsjError(
          lblInputs[i].textContent + " es requerido. ¡Favor validar!"
        );
        ResaltarInputInvalido(inputs[i].id);
        ResaltarLabelInvalido(lblInputs[i].id);
        return false;
      }

      //valido los campos email
      if (inputs[i].type.toLowerCase() == "email") {
        if (
          inputs[i].value == "" ||
          inputs[i].value == null ||
          inputs[i].value == undefined
        ) {
          ImprimirMsjError(
            lblInputs[i].textContent + " es requerido. ¡Favor validar!"
          );
          ResaltarInputInvalido(inputs[i].id);
          ResaltarLabelInvalido(inputs[i].id);
          return false;
        } else {
          let valArroba = /^[a-z._\d]+@[a-z\d]+\.[a-z]+\.?[a-z]+?$/;
          if (valArroba.test(inputs[i].value) == false) {
            ImprimirMsjError(
              lblInputs[i].textContent +
                " tiene formato inválido. ¡Favor validar!"
            );
            ResaltarInputInvalido(inputs[i].id);
            ResaltarLabelInvalido(inputs[i].id);
            return false;
          }
        }
      }

      //valido los campos INPUTS tipo password
      if (inputs[i].type.toLowerCase() == "password") {
        if (
          inputs[i].value == "" ||
          inputs[i].value == null ||
          inputs[i].value == undefined
        ) {
          ImprimirMsjError(
            lblInputs[i].textContent + " es requerido, ¡Favor validar!"
          );
          ResaltarInputInvalido(inputs[i].id);
          ResaltarLabelInvalido(lblInputs[i].id);
          return false;
        }
      }

      //valido los campos INPUTS tipo DATE
      if (inputs[i].type.toLowerCase() == "date") {
        if (
          inputs[i].value == "" ||
          inputs[i].value == null ||
          inputs[i].value == undefined
        ) {
          ImprimirMsjError("¡" + lblInputs[i].textContent + " es requerido!");
          ResaltarInputInvalido(inputs[i].id);
          ResaltarLabelInvalido(lblInputs[i].id);
          return false;
        }
      }

      //valido los campos INPUTS tipo NUMBER
      if (inputs[i].type.toLowerCase() == "number") {
        if (
          inputs[i].value == "" ||
          inputs[i].value == null ||
          inputs[i].value == undefined
        ) {
          //ImprimirMsjError('Cantidad requerida, ¡Favor validar!');
          ImprimirMsjError(
            lblInputs[i].textContent + " es requerido, ¡Favor validar!"
          );
          ResaltarInputInvalido(inputs[i].id);
          ResaltarLabelInvalido(lblInputs[i].id);
          return false;
        } else {
          if (
            Number(inputs[i].value) < Number(inputs[i].min) ||
            Number(inputs[i].value) > Number(inputs[i].max)
          ) {
            ImprimirMsjError(
              "Cantidad " +
                inputs[i].value +
                " debe estar entre " +
                inputs[i].min +
                " y " +
                inputs[i].max +
                " ¡Favor validar!"
            );
            ResaltarInputInvalido(inputs[i].id);
            ResaltarLabelInvalido(lblInputs[i].id);
            return false;
          }
        }
      }
    }
  } //fin validar inputs

  /***********************************************************************/
  //validar FieldSets
  for (var i = 0; i < fieldSetList.length; i++) {
    tipoElemento = "";
    cantCks = 0;
    ckSel = false;
    fieldID = fieldSetList[i].id;
    fieldLegend = fieldSetList[i].children[0].id;
    fieldsetName = fieldSetList[i].children[0].textContent;

    for (var j = 0; j < fieldSetList[i].children.length; j++) {
      let elementChildIntoFildSet = fieldSetList[i].children[j];
      let typeElement = elementChildIntoFildSet.getAttribute("type");

      //valida radios
      if (
        typeElement != null &&
        typeElement != undefined &&
        typeElement.toLowerCase() == "radio"
      ) {
        tipoElemento = "radio";
        if (elementChildIntoFildSet.checked) {
          ckSel = true;
        }
      }

      //valida checkbox
      if (
        typeElement != null &&
        typeElement != undefined &&
        typeElement.toLowerCase() == "checkbox"
      ) {
        tipoElemento = "checkbox";
        if (elementChildIntoFildSet.checked) {
          ckSel = true;
          cantCks++;
        }
      }
    }
    if (tipoElemento == "radio" && ckSel == false) {
      ImprimirMsjError(fieldsetName + "es requerida, ¡Favor validar! ");
      ResaltarInputInvalido(fieldID);
      ResaltarLabelInvalido(fieldLegend);
      return false;
    }

    if (
      tipoElemento == "checkbox" &&
      minCks > 0 &&
      (ckSel == false || cantCks < minCks)
    ) {
      ImprimirMsjError("Seleccione al menos " + minCks + " " + fieldsetName);
      ResaltarInputInvalido(fieldID);
      ResaltarLabelInvalido(fieldLegend);
      return false;
    }
  } //fin validar FieldSets

  /***********************************************************************/
  //validar los campos TEXTAREA
  for (var i = 0; i < textAreas.length; i++) {
    if (textAreas[i].required == true) {
      if (
        textAreas[i].value == "" ||
        textAreas[i].value == null ||
        textAreas[i].value == undefined
      ) {
        ImprimirMsjError(
          "Este valor es requerido: " + lblTextAreas[i].textContent
        );
        ResaltarInputInvalido(textAreas[i].id);
        ResaltarLabelInvalido(lblTextAreas[i].id);
        return false;
      }
    }
  } //fin validar los campos TEXTAREA
}

function ImprimirMsjError(pmensaje) {
  Swal.fire({
    title: "¡Error!",
    text: pmensaje,
    icon: "error",
    confirmButtonText: "Ok",
  });
}
function ResaltarLabelInvalido(pLabelId) {
  var elementLabel = document.getElementById(pLabelId);
  var styleOrigin = elementLabel.style;
  elementLabel.style = "color:red";
  setTimeout(function () {
    elementLabel.style = styleOrigin;
  }, 5000);
}

function ResaltarInputInvalido(pInputId) {
  var elementLabel = document.getElementById(pInputId);
  var styleOrigin = elementLabel.style;
  elementLabel.style = "border: 1px solid red;";
  setTimeout(function () {
    elementLabel.style = styleOrigin;
  }, 5000);
}
