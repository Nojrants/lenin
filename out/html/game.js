(function() {
var game;
var ui;

var DateOptions = {
hour: 'numeric',
minute: 'numeric',
second: 'numeric',
year: 'numeric',
month: 'short',
day: 'numeric'
};

var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;
};

var TITLE = "Social Democracy: Petrograd 1917" + '_' + "Autumn Chen";

/*

MAP
*/

window.mapProvinces = {
petrograd: {
name: 'Petrograd',
controller: 'bolsheviks',
divisions: 5,
control: 100
},

novgorod: {
    name: 'Novgorod',
    controller: 'sr',
    divisions: 2,
    control: 70
},

tver: {
    name: 'Tver',
    controller: 'mensheviks',
    divisions: 1,
    control: 40
},

moscow: {
    name: 'Moscow',
    controller: 'bolsheviks',
    divisions: 4,
    control: 85
}

};

/*

Party colors.
*/

window.mapPartyColors = {
bolsheviks: '--bolshevik-color',
sdi: '--sdi-color',
left_m: '--left-m-color',
mensheviks: '--m-color',
right_m: '--right_m-color',
lsr: '--lsr-color',
sr: '--sr-color',
right_sr: '--right-sr-color',
ns: '--ns-color'
};

/*

Party display names.
*/

window.mapPartyNames = {
bolsheviks: 'Bolsheviks',
sdi: 'Social Democrats',
left_m: 'Left Mensheviks',
mensheviks: 'Mensheviks',
right_m: 'Right Mensheviks',
lsr: 'Left SRs',
sr: 'Socialist-Revolutionaries',
right_sr: 'Right SRs',
ns: 'Popular Socialists'
};

/*

Get party color.
*/

window.getMapPartyColor = function(controller) {

var variable =
    window.mapPartyColors[controller];

if (!variable) {
    return '#999';
}

var color =
    getComputedStyle(document.body)
        .getPropertyValue(variable)
        .trim();

return color || '#999';

};

/*

Get province color based on degree of control.
*/

window.getMapProvinceColor = function(
controller,
control
) {

var color =
    window.getMapPartyColor(controller);

control =
    Math.max(
        0,
        Math.min(100, control)
    );

return (
    'color-mix(in srgb, ' +
    color +
    ' ' +
    control +
    '%, white)'
);

};

/*

Create map layout.
*/

window.createMapLayout = function() {

var container =
    document.getElementById(
        'map-container'
    );

if (!container) {
    return null;
}

container.innerHTML = '';

var layout =
    document.createElement('div');

layout.className =
    'map-layout';

var frame =
    document.createElement('div');

frame.className =
    'map-frame';

var panel =
    document.createElement('div');

panel.className =
    'map-province-panel';

panel.id =
    'map-province-panel';

layout.appendChild(frame);
layout.appendChild(panel);

container.appendChild(layout);

return frame;

};

/*

Display province information.
*/

window.showMapProvince = function(
provinceId
) {

var data =
    window.mapProvinces[provinceId];

var panel =
    document.getElementById(
        'map-province-panel'
    );

if (!data || !panel) {
    return;
}

document.querySelectorAll(
    '#map-container svg .map-province-selected'
).forEach(function(province) {

    province.classList.remove(
        'map-province-selected'
    );

});


var province =
    document.querySelector(
        '#map-container svg #' +
        provinceId
    );

if (province) {

    province.classList.add(
        'map-province-selected'
    );

}


var partyName =
    window.mapPartyNames[data.controller] ||
    data.controller;

panel.innerHTML =
    '<h2>' +
        (data.name || provinceId) +
    '</h2>' +

    '<div class="province-stat">' +
        '<div class="province-stat-label">' +
            'Controller' +
        '</div>' +
        '<div class="province-stat-value">' +
            partyName +
        '</div>' +
    '</div>' +

    '<div class="province-stat">' +
        '<div class="province-stat-label">' +
            'Control' +
        '</div>' +
        '<div class="province-stat-value">' +
            data.control +
            '%' +
        '</div>' +
    '</div>' +

    '<div class="province-stat">' +
        '<div class="province-stat-label">' +
            'Divisions' +
        '</div>' +
        '<div class="province-stat-value">' +
            data.divisions +
        '</div>' +
    '</div>';

panel.classList.add('active');

window.selectedMapProvince =
    provinceId;

};

/*

Deselect province.
*/

window.clearMapProvince = function() {

document.querySelectorAll(
    '#map-container svg .map-province-selected'
).forEach(function(province) {

    province.classList.remove(
        'map-province-selected'
    );

});

var panel =
    document.getElementById(
        'map-province-panel'
    );

if (panel) {

    panel.classList.remove('active');

    panel.innerHTML = '';

}

window.selectedMapProvince =
    null;

};

/*

Render province colors and division counters.
*/
window.renderGameMap = function() {

    var container =
        document.getElementById(
            'map-container'
        );

    if (!container) {
        return;
    }

    var svg =
        container.querySelector(
            '.map-frame svg'
        );

    if (!svg) {
        return;
    }

    svg.querySelectorAll(
        '.map-division-counter'
    ).forEach(function(counter) {

        counter.remove();

    });

    Object.keys(
        window.mapProvinces
    ).forEach(function(provinceId) {

        var data =
            window.mapProvinces[
                provinceId
            ];

        var province =
            svg.querySelector(
                '#' + provinceId
            );

        if (!province) {

            console.warn(
                'Province not found in SVG:',
                provinceId
            );

            return;
        }

        province.style.fill =
            window.getMapProvinceColor(
                data.controller,
                data.control
            );

        province.style.stroke =
            '#000';

        province.style.strokeWidth =
            '1';

        if (
            data.divisions === undefined
        ) {
            return;
        }

        /*
         * Get the visual center of the province and
         * convert it into the coordinate system of
         * the root SVG.
         */
        var bbox =
            province.getBBox();

        var localCenter =
            new DOMPoint(
                bbox.x + bbox.width / 2,
                bbox.y + bbox.height / 2
            );

        var provinceMatrix =
            province.getScreenCTM();

        var svgMatrix =
            svg.getScreenCTM();

        if (
            !provinceMatrix ||
            !svgMatrix
        ) {
            return;
        }

        var screenCenter =
            localCenter.matrixTransform(
                provinceMatrix
            );

        var svgCenter =
            screenCenter.matrixTransform(
                svgMatrix.inverse()
            );

        var x =
            data.label
                ? data.label[0]
                : svgCenter.x;

        var y =
            data.label
                ? data.label[1]
                : svgCenter.y;

        var group =
            document.createElementNS(
                'http://www.w3.org/2000/svg',
                'g'
            );

        group.setAttribute(
            'class',
            'map-division-counter'
        );

        var circle =
            document.createElementNS(
                'http://www.w3.org/2000/svg',
                'circle'
            );

        circle.setAttribute(
            'cx',
            x
        );

        circle.setAttribute(
            'cy',
            y
        );

        circle.setAttribute(
            'r',
            36
        );

        group.appendChild(circle);

        var text =
            document.createElementNS(
                'http://www.w3.org/2000/svg',
                'text'
            );

        text.setAttribute(
            'x',
            x
        );

        text.setAttribute(
            'y',
            y
        );

        text.setAttribute(
            'text-anchor',
            'middle'
        );

        text.setAttribute(
            'dominant-baseline',
            'central'
        );

        text.setAttribute(
            'font-size',
            '24'
        );

        text.textContent =
            data.divisions;

        group.appendChild(text);

        svg.appendChild(group);

    });
};



/*

Load the SVG map.
*/

window.loadGameMap = function() {

var container =
    document.getElementById(
        'map-container'
    );

if (!container) {
    return;
}

var frame =
    window.createMapLayout();

if (!frame) {
    return;
}

fetch(
    'img/European Russia Map.svg'
)
    .then(function(response) {

        if (!response.ok) {
            throw new Error(
                'HTTP ' +
                response.status
            );
        }

        return response.text();

    })
    .then(function(svg) {

        frame.innerHTML = svg;

        window.renderGameMap();

    })
    .catch(function(error) {

        console.error(
            'Failed to load game map:',
            error
        );

    });

};

/*

Province hover and click behavior.
*/

document.addEventListener(
'mouseover',
function(event) {

    var province =
        event.target.closest(
            '#map-container svg path[id]'
        );

    if (!province) {
        return;
    }

    if (
        !window.mapProvinces[
            province.id
        ]
    ) {
        return;
    }

    province.classList.add(
        'map-province-hover'
    );

}

);

document.addEventListener(
'mouseout',
function(event) {

    var province =
        event.target.closest(
            '#map-container svg path[id]'
        );

    if (!province) {
        return;
    }

    province.classList.remove(
        'map-province-hover'
    );

}

);

document.addEventListener(
'click',
function(event) {

    var province =
        event.target.closest(
            '#map-container svg path[id]'
        );

    if (!province) {
        return;
    }

    if (
        !window.mapProvinces[
            province.id
        ]
    ) {
        return;
    }

    if (
        window.selectedMapProvince ===
        province.id
    ) {

        window.clearMapProvince();

    } else {

        window.showMapProvince(
            province.id
        );

    }

}

);

/*

Map navigation.
*/

window.showMap = function() {

var container =
    document.getElementById(
        'map-container'
    );

var content =
    document.getElementById(
        'content'
    );

var engine =
    window.dendryUI.dendryEngine;


/*
 * Close map.
 */

if (
    engine.state.sceneId.startsWith('map')
) {

    if (container) {

        container.classList.remove(
            'active'
        );

    }

    if (content) {

        content.style.display = '';

    }

    window.clearMapProvince();

    engine.goToScene(
        'backSpecialScene'
    );

    return;
}


/*
 * Open map.
 */

engine.goToScene('map');

setTimeout(function() {

    if (content) {

        content.style.display =
            'none';

    }

    if (container) {

        container.classList.add(
            'active'
        );

    }

    window.loadGameMap();

}, 0);

};

/*

LIBRARY
*/

window.showStats = function() {

var engine =
    window.dendryUI.dendryEngine;

if (
    engine.state.sceneId
        .startsWith('library')
) {

    engine.goToScene(
        'backSpecialScene'
    );

} else {

    engine.goToScene(
        'library'
    );

}

};

/*

OPTIONS
*/

window.showOptions = function() {

var save_element =
    document.getElementById(
        'options'
    );

window.populateOptions();

save_element.style.display =
    "block";

if (!save_element.onclick) {

    save_element.onclick =
        function(evt) {

            var target =
                evt.target;

            var save_element =
                document.getElementById(
                    'options'
                );

            if (
                target ==
                save_element
            ) {

                window.hideOptions();

            }

        };
}

};

window.hideOptions = function() {

var save_element =
    document.getElementById(
        'options'
    );

save_element.style.display =
    "none";

};

window.disableBg = function() {

window.dendryUI.disable_bg =
    true;

document.body.style
    .backgroundImage = 'none';

window.dendryUI.saveSettings();

};

window.enableBg = function() {

window.dendryUI.disable_bg =
    false;

window.dendryUI.setBg(
    window.dendryUI.dendryEngine
        .state.bg
);

window.dendryUI.saveSettings();

};

window.disableAnimate = function() {

window.dendryUI.animate =
    false;

window.dendryUI.saveSettings();

};

window.enableAnimate = function() {

window.dendryUI.animate =
    true;

window.dendryUI.saveSettings();

};

window.disableAnimateBg = function() {

window.dendryUI.animate_bg =
    false;

window.dendryUI.saveSettings();

};

window.enableAnimateBg = function() {

window.dendryUI.animate_bg =
    true;

window.dendryUI.saveSettings();

};

window.disableAudio = function() {

window.dendryUI.toggle_audio(
    false
);

window.dendryUI.saveSettings();

};

window.enableAudio = function() {

window.dendryUI.toggle_audio(
    true
);

window.dendryUI.saveSettings();

};

window.enableImages = function() {

window.dendryUI.show_portraits =
    true;

window.dendryUI.saveSettings();

};

window.disableImages = function() {

window.dendryUI.show_portraits =
    false;

window.dendryUI.saveSettings();

};

window.enableLightMode = function() {

window.dendryUI.dark_mode =
    false;

document.body.classList.remove(
    'dark-mode'
);

window.dendryUI.saveSettings();

};

window.enableDarkMode = function() {

window.dendryUI.dark_mode =
    true;

document.body.classList.add(
    'dark-mode'
);

window.dendryUI.saveSettings();

};

/*

Populates the checkboxes in the options view.
*/

window.populateOptions = function() {

var disable_bg =
    window.dendryUI.disable_bg;

var animate =
    window.dendryUI.animate;

var disable_audio =
    window.dendryUI.disable_audio;

var show_portraits =
    window.dendryUI.show_portraits;


if (disable_bg) {

    $('#backgrounds_no')[0]
        .checked = true;

} else {

    $('#backgrounds_yes')[0]
        .checked = true;

}


if (animate) {

    $('#animate_yes')[0]
        .checked = true;

} else {

    $('#animate_no')[0]
        .checked = true;

}


if (disable_audio) {

    $('#audio_no')[0]
        .checked = true;

} else {

    $('#audio_yes')[0]
        .checked = true;

}


if (show_portraits) {

    $('#images_yes')[0]
        .checked = true;

} else {

    $('#images_no')[0]
        .checked = true;

}


if (window.dendryUI.dark_mode) {

    $('#dark_mode')[0]
        .checked = true;

} else {

    $('#light_mode')[0]
        .checked = true;

}

};

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

window.achievementSound =
new Audio(
'music/achieve.mp3'
);

window.showAchievement = function(
name,
description,
image
) {

var notification =
    document.getElementById(
        'achievement-notification'
    );

notification.querySelector(
    '.achievement-title'
).textContent = name;

notification.querySelector(
    '.achievement-description'
).textContent = description;

notification.querySelector(
    '.achievement-image img'
).src = image;

window.achievementSound.currentTime =
    0;

window.achievementSound.play().catch(
    function(error) {

        console.log(
            "Achievement sound failed:",
            error
        );

    }
);

notification.classList.add(
    'show'
);

setTimeout(function() {

    notification.classList.remove(
        'show'
    );

}, 6000);

};

window.unlockAchievement = function(id) {

var achievement =
    window.achievements[id];

if (!achievement) {

    console.log(
        "Unknown achievement: " + id
    );

    return;
}

window.showAchievement(
    achievement.name,
    achievement.description,
    achievement.image
);

};

window.renderAchievements = function() {

var qualities =
    window.dendryUI.dendryEngine
        .state.qualities;

var playthrough =
    document.getElementById(
        'achievement-playthrough'
    );

var overall =
    document.getElementById(
        'achievement-overall'
    );

var incomplete =
    document.getElementById(
        'achievement-incomplete'
    );


if (
    !playthrough ||
    !overall ||
    !incomplete
) {

    return;

}


playthrough.innerHTML = '';
overall.innerHTML = '';
incomplete.innerHTML = '';


Object.keys(
    window.achievements
).forEach(function(id) {

    if (id == 'game_completed') {
        return;
    }

    var achievement =
        window.achievements[id];

    var table =
        '<table style="border-collapse: collapse; width: 100%;">' +
        '<tr>' +
        '<td style="width: 60px; height: 60px; vertical-align: middle; text-align: center; border: 2px solid #c00000; background-color: rgba(192, 0, 0, 0.1);">' +
        '<img src="' +
        achievement.image +
        '" alt="Achievement Icon" style="width: 100%; height: 100%; object-fit: cover; display: block;">' +
        '</td>' +
        '<td style="border: 2px solid #c00000; background-color: rgba(91, 154, 141, 0.1);">' +
        '<div style="padding-left: 0.5em;">' +
        '<div style="font-weight: bold;">' +
        achievement.name +
        '</div>' +
        '<div style="font-size: 90%; color: #444;">- ' +
        achievement.description +
        '</div>' +
        '</div>' +
        '</td>' +
        '</tr>' +
        '</table>';


    if (
        qualities[
            'game_achievement_' + id
        ]
    ) {

        playthrough.innerHTML += table;

    }


    if (
        qualities[
            'achievement_' + id
        ]
    ) {

        overall.innerHTML += table;

    } else {

        incomplete.innerHTML += table;

    }

});

};

window.handleSignal = function(
signal,
event,
scene_id
) {
};


window.onNewPage = function() {

    var scene =
        window.dendryUI.dendryEngine
            .state.sceneId;

    if (
        scene != 'root' &&
        !window.justLoaded
    ) {
        window.dendryUI.autosave();
    }

    if (window.justLoaded) {
        window.justLoaded = false;
    }
};



window.updateSidebar = function() {
    $('#qualities').empty();

    var scene =
        dendryUI.game.scenes[
            window.statusTab
        ];

    dendryUI.dendryEngine._runActions(
        scene.onArrival
    );

    var displayContent =
        dendryUI.dendryEngine._makeDisplayContent(
            scene.content,
            true
        );

    $('#qualities').append(
        dendryUI.contentToHTML.convert(
            displayContent
        )
    );
};

window.onDisplayContent = function() {
    window.updateSidebar();
};

    
window.changeTab = function(newTab, tabId) {
    if (
        tabId == 'poll_tab' &&
        dendryUI.dendryEngine.state.qualities.historical_mode
    ) {
        window.alert(
            'Polls are not available in historical mode.'
        );
        return;
    }

    var tabButton =
        document.getElementById(tabId);

    var tabButtons =
        document.getElementsByClassName('tab_button');

    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className =
            tabButtons[i].className.replace(
                ' active',
                ''
            );
    }

    tabButton.className += ' active';

    window.statusTab = newTab;
    window.updateSidebar();
};

    
window.generateBar = function(
quality,
qualityName,
max,
min,
colors
) {

var bar =
    document.createElement(
        'div'
    );

bar.className =
    'bar';

var value =
    document.createElement(
        'div'
    );

value.className =
    'barValue';


var width =
    (quality - min) /
    (max - min);


if (width > 1) {

    width = 1;

} else if (width < 0) {

    width = 0;

}


value.style.width =
    Math.round(
        width * 100
    ) + '%';


if (colors) {

    value.style.backgroundColor =
        window.probToColor(
            width * 100
        );

}


bar.textContent =
    qualityName +
    ': ' +
    quality;


if (colors) {

    bar.textContent +=
        '/' + max;

}


bar.appendChild(value);

return bar;

};

window.justLoaded = true;
window.statusTab = "status";
window.dendryModifyUI = main;

console.log(
"Modifying stats: see dendryUI.dendryEngine.state.qualities"
);

/*

Do not replace window.onload.


Dendry may already have an onload handler.
Use DOMContentLoaded instead.
*/

document.addEventListener(
'DOMContentLoaded',
function() {

    /*
     * Dendry initializes dendryUI separately,
     * so wait briefly before using it.
     */

    var initialize =
        function() {

            if (!window.dendryUI) {

                setTimeout(
                    initialize,
                    50
                );

                return;
            }

            window.dendryUI.loadSettings({
                show_portraits: false
            });

            if (
                window.dendryUI.dark_mode
            ) {

                document.body.classList.add(
                    'dark-mode'
                );

            }

            window.pinnedCardsDescription =
                "Advisor cards - actions are only usable once per 6 months.";

            /*
             * Populate the sidebar once Dendry
             * has finished initializing.
             */

            if (
                window.dendryUI.dendryEngine
            ) {

                setTimeout(
                    function() {

                        if (
                            window.updateSidebar
                        ) {

                            window.updateSidebar();

                        }

                    },
                    100
                );

            }

        };

    initialize();

}

);

}());

setInterval(function() {

if (
    document.getElementById(
        'achievement-playthrough'
    )
) {

    window.renderAchievements();

}

}, 500);
