var isSessionRunning = true;

$('#sessionPlus').click(function() {
  var sessTime = parseInt($('#session-time').text(), 10);
  if (sessTime < 60) {
    sessTime++;
  };

  $('#session-time').text(sessTime);

  var rotation = sessTime * 6;
  $('#hand').css({
    'transform': 'rotate(' + rotation + 'deg)',
    '-webkit-transform': 'rotate(' + rotation + 'deg)',
    '-moz-transform': 'rotate(' + rotation + 'deg)',
    '-o-transform': 'rotate(' + rotation + 'deg)',
    '-ms-transform': 'rotate(' + rotation + 'deg)'
  });

  if(isSessionRunning){
    updateTimeLimit(sessTime);
  } 
});

$('#sessionMinus').click(function() {
  var sessTime = parseInt($('#session-time').text(), 10);
  if (sessTime > 0) {
    sessTime--;
  };
  $('#session-time').text(sessTime);
  var rotation = sessTime * 6;
  $('#hand').css({
    'transform': 'rotate(' + rotation + 'deg)',
    '-webkit-transform': 'rotate(' + rotation + 'deg)',
    '-moz-transform': 'rotate(' + rotation + 'deg)',
    '-o-transform': 'rotate(' + rotation + 'deg)',
    '-ms-transform': 'rotate(' + rotation + 'deg)'
  });

  if(isSessionRunning){
    updateTimeLimit(sessTime);
  }
});

$('#breakPlus').click(function() {
  var brTime = parseInt($('#break-time').text(), 10);
  if (brTime < 10) {
    brTime++;
  };

  $('#break-time').text(brTime);
  var rotation = brTime * 6;
  $('#bhand').css({
    'transform': 'rotate(' + rotation + 'deg)',
    '-webkit-transform': 'rotate(' + rotation + 'deg)',
    '-moz-transform': 'rotate(' + rotation + 'deg)',
    '-o-transform': 'rotate(' + rotation + 'deg)',
    '-ms-transform': 'rotate(' + rotation + 'deg)'
  });

  if(!isSessionRunning){
    updateTimeLimit(brTime);
  }
});

$('#breakMinus').click(function() {
  var brTime = parseInt($('#break-time').text(), 10);
  if (brTime > 0) {
    brTime--;
  };

  $('#break-time').text(brTime);
  var rotation = brTime * 6;
  $('#bhand').css({
    'transform': 'rotate(' + rotation + 'deg)',
    '-webkit-transform': 'rotate(' + rotation + 'deg)',
    '-moz-transform': 'rotate(' + rotation + 'deg)',
    '-o-transform': 'rotate(' + rotation + 'deg)',
    '-ms-transform': 'rotate(' + rotation + 'deg)'
  });

  if(!isSessionRunning){
    updateTimeLimit(brTime);
  }
});

$('#play-button').click(function() {

  var playButton = $('#play-button');

  //Pause button clicked
  if (playButton.hasClass('fa-pause-circle')) {
    playButton.removeClass('fa-pause-circle').addClass('fa-play-circle');
    $('button').removeAttr('disabled');

    var timeLimit = (function(){
        var arr = $('#time-left').text().split(":");

        return parseInt(arr[0], 10) * 60 + parseInt(arr[1], 10);
      })();

      //pause the timer
      setTimeout(Timer(timeLimit).pause, 1000);
  }


  //Play button clicked
  else {
    if (playButton.hasClass('fa-play-circle')) {
      playButton.removeClass('fa-play-circle').addClass('fa-pause-circle');
      $('button').attr('disabled', 'disabled');

      //get time limit to pass to timer function

      var timeLimit = (function(){
        var arr = $('#time-left').text().split(":");

        return parseInt(arr[0], 10) * 60 + parseInt(arr[1], 10);
      })();

      //play the timer
      setTimeout(Timer(timeLimit).play, 1000);
    }
  }
});

var Timer = function(timeLimit){
  var secondsElapsed = 0;

  this.running = true;

  this.started = false;

  var timeoutID;

  var updateTimer = function(){
    if(secondsElapsed < timeLimit && this.running){
      secondsElapsed++;

      var Time = new Date(-30*60*1000 - secondsElapsed * 1000 + timeLimit * 1000);
      var Minutes = Time.getMinutes();
      var Seconds = Time.getSeconds();
      updateTimeLimit(Minutes, Seconds);

      timeoutID = setTimeout(updateTimer, 1000);
    }
    else{
      if (this.running && isSessionRunning) {
        isSessionRunning = false;
        timeLimit = parseInt($('#break-time').text(), 10) * 60;
        updateTimeLimit(timeLimit / 60);
        setTimeout(updateTimer, 1000);
      }
    }
  };

  var play = function(){
    this.running = true;
    if(!this.started){
      updateTimer();
      this.started = true;
    }
    
  }

  var pause = function(){
    this.running = false;
  }

  return {
    play : play,
    pause : pause
  }
};

function updateTimeLimit(min, sec){
  sec = sec || 0;
  $('#time-left').text((min < 10 ? '0': '') + min + ":" + (sec < 10 ? '0': '') + sec);

  var rotation = min * 6;
  if(isSessionRunning){
    $('#hand').css({
      'transform': 'rotate(' + rotation + 'deg)',
      '-webkit-transform': 'rotate(' + rotation + 'deg)',
      '-moz-transform': 'rotate(' + rotation + 'deg)',
      '-o-transform': 'rotate(' + rotation + 'deg)',
      '-ms-transform': 'rotate(' + rotation + 'deg)'
    });
  }
  else{
    $('#bhand').css({
      'transform': 'rotate(' + rotation + 'deg)',
      '-webkit-transform': 'rotate(' + rotation + 'deg)',
      '-moz-transform': 'rotate(' + rotation + 'deg)',
      '-o-transform': 'rotate(' + rotation + 'deg)',
      '-ms-transform': 'rotate(' + rotation + 'deg)'
    });
  }
}