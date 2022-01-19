
// SET up dependent fields of Channel: Ad Platform, Campaign type, campaign objective, activation type
var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Paid Search | Google | Ad Group");// translation page
var wsOptions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dependent Dropdown Fields"); // business rules of dropdown
var options = wsOptions.getRange(2,1,wsOptions.getLastRow()-1,2).getValues(); // select all data for business rules of dropdown

function dropDown (){
  var list = ["a","b"]; 
  var cell = ws.getRange("F3"); 
  applyValidationToCell (list, cell);
}

function onEdit(e) {
  var activeCell = e.range;
  var val = activeCell.getValue();
  var r = activeCell.getRow();
  var c = activeCell.getColumn();
  var wsName = activeCell.getSheet().getName();
  if (wsName == "Paid Search | Google | Ad Group" && c === 4 && r >1) {
    if (val === ""){
      ws.getRange(r,6).clearContent();
      ws.getRange(r,6).clearDataValidations();
    } else {
      ws.getRange(r,6).clearContent();
    var filteredOptions = options.filter (function (o) {return o[0] === val});
    var listToApply = filteredOptions.map(function (o) {return o[1]});
    var cell = ws.getRange(r,6);
    applyValidationToCell (listToApply, cell);
  }
  }
  
}

function applyValidationToCell (list, cell) {

  var rule = SpreadsheetApp.newDataValidation().requireValueInList(list).setAllowInvalid(false).build();
  cell.setDataValidation(rule);
};
