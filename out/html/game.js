(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;

    // Add your custom code here.
  };

  var TITLE = "Social Democracy: Petrograd 1917" + '_' + "Autumn Chen";

window.showMap = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('map')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('map');
    }
};

window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('library');
    }
};

fetch("img/European Russia Map.svg")
    .then(response => response.text())
    .then(svg => {
        document.getElementById("map-container").innerHTML = svg;
    });
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };

  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };

  window.enableImages = function() {
      window.dendryUI.show_portraits = true;
      window.dendryUI.saveSettings();
  };

  window.disableImages = function() {
      window.dendryUI.show_portraits = false;
      window.dendryUI.saveSettings();
  };
  
  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      document.body.classList.remove('dark-mode');
      window.dendryUI.saveSettings();
  };
  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
  };

  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    var show_portraits = window.dendryUI.show_portraits;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (disable_audio) {
        $('#audio_no')[0].checked = true;
    } else {
        $('#audio_yes')[0].checked = true;
    }
    if (show_portraits) {
        $('#images_yes')[0].checked = true;
    } else {
        $('#images_no')[0].checked = true;
    }
    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }
  };

  // This function allows you to modify the text before it's displayed.
  // E.g. wrapping chat-like messages in spans.
  window.displayText = function(text) {
      return text;
  };

  
  window.achievements = {
      golden_age_of_the_peoples_commissars: {
          name: "Golden Age of the People's Commissars",
          description: "Assemble an all-star composition in the Council of People's Commissars.",
          image: "img/portraits/b/lenin.jpg"
      },

      vikzhel_averted: {
          name: "Vikzhel Negotiator",
          description: "Avert the Vikzhel Strike by negotiating a coalition agreement.",
          image: "img/train.jpg"
      },

      lsr_coalition: {
          name: "Children of October",
          description: "Form a coalition government between the Bolsheviks and Left-SRs.",
          image: "img/train.jpg"
      },

      game_completed: {
          name: "Game Over",
          description: "Complete the game.",
          image: "img/portraits/b/lenin.jpg"
      }
  };
  
window.achievementSound = new Audio('music/achieve.mp3');  
window.showAchievement = function(name, description, image) {
    var notification = document.getElementById('achievement-notification');

    notification.querySelector('.achievement-title').textContent = name;
    notification.querySelector('.achievement-description').textContent = description;
    notification.querySelector('.achievement-image img').src = image;

    window.achievementSound.currentTime = 0;
    window.achievementSound.play().catch(function(error) {
        console.log("Achievement sound failed:", error);
    });

    notification.classList.add('show');

    setTimeout(function() {
        notification.classList.remove('show');
    }, 6000);
};


  // Displays an achievement notification.
  // The actual achievement is still unlocked by this.achieve().
  window.unlockAchievement = function(id) {
      var achievement = window.achievements[id];

      if (!achievement) {
          console.log("Unknown achievement: " + id);
          return;
      }

      window.showAchievement(
          achievement.name,
          achievement.description,
          achievement.image
      );
  };

window.renderAchievements = function() {
    var qualities = window.dendryUI.dendryEngine.state.qualities;

    var playthrough = document.getElementById('achievement-playthrough');
    var overall = document.getElementById('achievement-overall');
    var incomplete = document.getElementById('achievement-incomplete');

    if (!playthrough || !overall || !incomplete) return;

    playthrough.innerHTML = '';
    overall.innerHTML = '';
    incomplete.innerHTML = '';

    Object.keys(window.achievements).forEach(function(id) {
        if (id == 'game_completed') return;

        var achievement = window.achievements[id];

        var table = '<table style="border-collapse: collapse; width: 100%;">' +
            '<tr>' +
            '<td style="width: 60px; height: 60px; vertical-align: middle; text-align: center; border: 2px solid #c00000; background-color: rgba(192, 0, 0, 0.1);">' +
            '<img src="' + achievement.image + '" alt="Achievement Icon" style="width: 100%; height: 100%; object-fit: cover; display: block;">' +
            '</td>' +
            '<td style="border: 2px solid #c00000; background-color: rgba(91, 154, 141, 0.1);">' +
            '<div style="padding-left: 0.5em;">' +
            '<div style="font-weight: bold;">' + achievement.name + '</div>' +
            '<div style="font-size: 90%; color: #444;">- ' + achievement.description + '</div>' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</table>';

        if (qualities['game_achievement_' + id]) {
            playthrough.innerHTML += table;
        }

        if (qualities['achievement_' + id]) {
            overall.innerHTML += table;
        } else {
            incomplete.innerHTML += table;
        }
    });
};


  
  
  

  // This function allows you to do something in response to signals.
  window.handleSignal = function(signal, event, scene_id) {
  };
  
  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  // tabbed browsing
  window.updateSidebar = function() {
      $('#qualities').empty();
      var scene = dendryUI.game.scenes[window.statusTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.changeTab = function(newTab, tabId) {
      if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
          window.alert('Polls are not available in historical mode.');
          return;
      }
      var tabButton = document.getElementById(tabId);
      var tabButtons = document.getElementsByClassName('tab_button');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
      }
      tabButton.className += ' active';
      window.statusTab = newTab;
      window.updateSidebar();
  };



  window.onDisplayContent = function() {
      window.updateSidebar();
  };

  /*
   * This function copied from the code for Infinite Space Battle Simulator
   *
   * quality - a number between max and min
   * qualityName - the name of the quality
   * max and min - numbers
   * colors - if true/1, will use some color scheme - green to yellow to red for high to low
   * */
  window.generateBar = function(quality, qualityName, max, min, colors) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      var value = document.createElement('div');
      value.className = 'barValue';
      var width = (quality - min)/(max - min);
      if (width > 1) {
          width = 1;
      } else if (width < 0) {
          width = 0;
      }
      value.style.width = Math.round(width*100) + '%';
      if (colors) {
          value.style.backgroundColor = window.probToColor(width*100);
      }
      bar.textContent = qualityName + ': ' + quality;
      if (colors) {
          bar.textContent += '/' + max;
      }
      bar.appendChild(value);
      return bar;
  };


  window.justLoaded = true;
  window.statusTab = "status";
  window.dendryModifyUI = main;
  console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

  window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: false});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
  };

}());

setInterval(function() {
    if (document.getElementById('achievement-playthrough')) {
        window.renderAchievements();
    }
}, 500);
