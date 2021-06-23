'use strict';

$(function () {
  //Horizontal form basic
  $('#wizard_horizontal').steps({
    headerTag: 'h2',
    bodyTag: 'section',
    transitionEffect: 'slideLeft',
    onInit: function onInit(event, currentIndex) {
      setButtonWavesEffect(event);
    },
    onStepChanged: function onStepChanged(event, currentIndex, priorIndex) {
      setButtonWavesEffect(event);
    }
  }); //Vertical form basic

  $('#wizard_vertical').steps({
    headerTag: 'h2',
    bodyTag: 'section',
    transitionEffect: 'slideLeft',
    stepsOrientation: 'vertical',
    onInit: function onInit(event, currentIndex) {
      setButtonWavesEffect(event);
    },
    onStepChanged: function onStepChanged(event, currentIndex, priorIndex) {
      setButtonWavesEffect(event);
    }
  }); //Advanced form with validation

  var form = $('#wizard_with_validation').show();
  form.steps({
    headerTag: 'h3',
    bodyTag: 'fieldset',
    transitionEffect: 'slideLeft',
    onInit: function onInit(event, currentIndex) {
      //Set tab width
      var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
      var tabCount = $tab.length;
      $tab.css('width', 100 / tabCount + '%'); //set button waves effect

      setButtonWavesEffect(event);
    },
    onStepChanging: function onStepChanging(event, currentIndex, newIndex) {
      if (currentIndex > newIndex) {
        return true;
      }

      if (currentIndex < newIndex) {
        form.find('.body:eq(' + newIndex + ') label.error').remove();
        form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
      }

      form.validate().settings.ignore = ':disabled,:hidden';
      return form.valid();
    },
    onStepChanged: function onStepChanged(event, currentIndex, priorIndex) {
      setButtonWavesEffect(event);
    },
    onFinishing: function onFinishing(event, currentIndex) {
      form.validate().settings.ignore = ':disabled';
      return form.valid();
    },
    onFinished: function onFinished(event, currentIndex) {
      alert("Good job!", "Submitted!", "success");
    }
  });
  form.validate({
    highlight: function highlight(input) {
      $(input).parents('.form-line').addClass('error');
    },
    unhighlight: function unhighlight(input) {
      $(input).parents('.form-line').removeClass('error');
    },
    errorPlacement: function errorPlacement(error, element) {
      $(element).parents('.form-group').append(error);
    },
    rules: {
      'confirm': {
        equalTo: '#password'
      }
    }
  });
});

function setButtonWavesEffect(event) {
  $(event.currentTarget).find('[role="menu"] li a').removeClass('waves-effect');
  $(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('waves-effect');
}