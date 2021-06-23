"use strict";

// Form Step 1
function next_step1() {
  var firstName = document.validationForm.firstName.value;
  var lastName = document.validationForm.lastName.value;

  if (firstName == "" || firstName.length < 2) {
    //alert('1');
    document.getElementById("firstNameErr").style.display = "block";
    document.getElementById("firstNameErr").innerHTML = "Please enter first name";
    document.getElementById("firstName").focus();
    return false;
  } else if (lastName == "") {
    document.getElementById("lastNameErr").style.display = "block";
    document.getElementById("lastNameErr").innerHTML = "Please enter last name";
    document.getElementById("lastName").focus();
    return false;
  } else {
    document.getElementById("prog2").classList.add("active");
    document.getElementById("valdatinStep1").style.display = "none";
    document.getElementById("valdatinStep2").style.display = "block";
    document.getElementById("action1").style.display = "none";
    document.getElementById("action2").style.display = "block"; //return true;

    document.getElementById("firstNameErr").style.display = "none";
    document.getElementById("lastNameErr").style.display = "none";
  }
}

function multiFocus(e) {
  document.getElementById(e + "Err").style.display = "none";
} // Form Step 2


function next_step2() {
  var phoneNum = document.validationForm.phoneNum.value;

  if (phoneNum == "" || phoneNum.length < 2) {
    //alert('1');
    document.getElementById("phoneNumErr").style.display = "block";
    document.getElementById("phoneNumErr").innerHTML = "Please contact number";
    document.getElementById("phoneNum").focus();
    return false;
  } else {
    document.getElementById("prog3").classList.add("active");
    document.getElementById("valdatinStep2").style.display = "none";
    document.getElementById("valdatinStep3").style.display = "block";
    document.getElementById("action2").style.display = "none";
    document.getElementById("action3").style.display = "block"; //return true;

    document.getElementById("phoneNumErr").style.display = "none";
  }
}

function previous_step1() {
  document.getElementById("prog2").classList.remove("active");
  document.getElementById("valdatinStep1").style.display = "block";
  document.getElementById("valdatinStep2").style.display = "none";
  document.getElementById("action1").style.display = "block";
  document.getElementById("action2").style.display = "none";
}