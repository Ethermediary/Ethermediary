var pageWithLoading = ["myDeal"];
var pageToValidate = ["newDeal2Content", "newDeal3Content", "myDeal"];
var noMetamaskNeeded = ["index", "terms", "howitworks", "simulation"];
var dealData = {};

function onClick(content) {
  console.log(hasMetamask());
  if (!hasMetamask() && noMetamaskNeeded.indexOf(content) == -1) {
    sendPost("needMeta");
    return;
  }
  if (pageToValidate.indexOf(content) == -1) {
    requestPage(content);
    return;
  }

  let validationResult = validator.validateForm("mForm", getValidationData());
  if (validationResult.passed) {
    requestPage(content);
  } else {
    displayErrors(validationResult);
  }
}

///errorObj is {passed:bool, errors: [{inputName, errors:[str, str]}, {inputName, errors:[str,str]}]}
function displayErrors(errorObj) {
  var alerts = document.getElementsByClassName("alert");
  if (alerts.length == 0) return;

  clearErrors(alerts);

  //disp current errors
  for (let i = 0; i < errorObj.errors.length; i++) {
    //input Errors is {inputName, errors:[str, str]}
    let inputErrors = errorObj.errors[i];
    let disp = document.getElementById(
      "alert-" + inputErrors.inputName + "-disp"
    );
    let text = document.getElementById(
      "alert-" + inputErrors.inputName + "-text"
    );
    if (disp && text) {
      //set style to empty string, getting ride of "display:none"
      disp.style = "";
      text.innerHTML = getErrorHTML(inputErrors);
    }
  }
}

//get the error formated has HTML
function getErrorHTML(inputErrors) {
  let html = "";
  for (let k = 0; k < inputErrors.errors.length; k++) {
    html += inputErrors.errors[k];
    if (k != inputErrors.errors.length - 1) html += "<br/>";
  }
  return html;
}

function clearErrors(alerts) {
  //hide all the errors
  for (let i = 0; i < alerts.length; i++) {
    alerts[i].style = "display:none";
  }
}

function getValidationData() {
  let validationData = document.getElementById("validation");
  if (!validationData) return null;
  else return JSON.parse(validationData.innerText);
}

function saveDealData() {
  let mForm = document.getElementById("mForm");
  if (!mForm) return;
  let formData = validator.extractForm(mForm);

  for (prop in formData) {
    dealData[prop] = formData[prop];
  }
}

function populateFormWithDealData() {
  let form = document.getElementById("mForm");
  if (!form) return;

  for (prop in dealData) {
    setFormMember(form, prop, dealData[prop]);
  }
}

function populateDealData() {
  for (prop in dealData) {
    let element = document.getElementById("populate-" + prop);
    if (!element) continue;
    element.innerText = dealData[prop];
  }
}

function setFormMember(form, memberName, value) {
  for (var x = 0; x < form.elements.length; x++) {
    var field = form.elements[x];
    if (field.name == memberName) {
      field.value = value;
    }
  }
}

function requestPage(content) {
  saveDealData();
  if (pageWithLoading.indexOf(content) != -1) {
    sendPost("loading", () => sendPost(content));
  } else {
    sendPost(content);
  }
}

function sendPost(content, callback) {
  $.ajax({
    url: document.location.origin + "/" + content,
    type: "POST",
    //  data: JSON.stringify(data),
    //  processData: false,
    //  contentType: "application/json; charset=utf-8",
    error: console.log,
    success: function (data) {
      $("#content").html(data);
      populateDealData();
      populateFormWithDealData();
      if (callback) callback();
    },
  });
}

/** Check if client has Metamask & is connected to his account through it */
function hasMetamask() {
  return typeof ethereum !== 'undefined' && ethereum.isMetaMask;
}
