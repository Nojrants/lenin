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

var TITLE = "Heroic Age of Revolution" + '_' + "(Noj Rants)";

/*
MAP

Provinces:  add an entry to window.mapProvinces whose key is the id of that
            element in the SVG. Anything without an entry is ignored.
            `adjacent` lists neighbouring provinces (it only needs to be
            listed on one side; adjacency is treated as two-way).
Divisions:  window.mapDivisions is the list of all divisions. Each has an id,
            a name, an owner (a key of mapPartyColors) and a province.
Moving:     see window.mapCanMove (rules hook) and
            window.onMapDivisionsMoved (called after a move).
*/

/* Only divisions owned by this faction can be selected and moved. */
window.mapPlayerFaction = 'bolsheviks';

window.mapProvinces = {
    petrograd: {
        name: 'Petrograd',
        controller: 'bolsheviks',
        control: 100,
        adjacent: ['novgorod']
    },
    novgorod: {
        name: 'Novgorod',
        controller: 'sr',
        control: 70,
        adjacent: ['petrograd', 'tver']
    },
    tver: {
        name: 'Tver',
        controller: 'mensheviks',
        control: 40,
        adjacent: ['novgorod', 'moscow']
    },
    moscow: {
        name: 'Moscow',
        controller: 'bolsheviks',
        control: 85,
        adjacent: ['tver']
    }
};

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

/* Rows shown in the sidebar for the selected province
   (the division list is added underneath automatically). */
window.mapProvinceFields = [
    {
        label: 'Controller',
        value: function(d) {
            return '<span class="party-box" style="background:' +
                window.getMapPartyColor(d.controller) + '"></span>' +
                (window.mapPartyNames[d.controller] || d.controller);
        }
    },
    { label: 'Control', value: function(d) { return d.control + '%'; } }
];

/* ---------- divisions ---------- */

function makeDivisions(province, owner, count) {
    var name = window.mapProvinces[province].name;
    var out = [];
    for (var i = 1; i <= count; i++) {
        out.push({
            id: province + '_' + owner + '_' + i,
            name: name + ' Division ' + i,
            owner: owner,
            province: province,
            start: province      // where it begins a new game
        });
    }
    return out;
}

window.mapDivisions = [].concat(
    makeDivisions('petrograd', 'bolsheviks', 5),
    makeDivisions('novgorod', 'sr', 2),
    makeDivisions('tver', 'mensheviks', 1),
    makeDivisions('moscow', 'bolsheviks', 4)
);

/* Rules hook: return true to allow the move, or false / a message string
   to refuse it. Add supply, turn limits, etc. here later. */
window.mapCanMove = function(divisionIds, fromId, toId) {
    return true;
};

/* Called after a successful move. */
window.onMapDivisionsMoved = function(divisionIds, fromId, toId) {
};

window.selectedMapProvince = null;
window.selectedMapDivisions = [];   // ids; always inside the selected province

var MAP_SHAPES = 'path, polygon, polyline, rect, circle, ellipse';
var hoveredMapProvince = null;
var mapSvgText = null;   // cached so the SVG is only fetched once
var mapMessage = '';

function divisionsIn(provinceId) {
    return window.mapDivisions.filter(function(d) {
        return d.province === provinceId;
    });
}

function playerDivisionsIn(provinceId) {
    return divisionsIn(provinceId).filter(function(d) {
        return d.owner === window.mapPlayerFaction;
    });
}

window.areProvincesAdjacent = function(a, b) {
    var A = window.mapProvinces[a];
    var B = window.mapProvinces[b];
    if (!A || !B) {
        return false;
    }
    return (A.adjacent || []).indexOf(b) !== -1 ||
           (B.adjacent || []).indexOf(a) !== -1;
};

function getAdjacentProvinces(id) {
    return Object.keys(window.mapProvinces).filter(function(other) {
        return other !== id && window.areProvincesAdjacent(id, other);
    });
}

/* Division positions are kept in a quality so they survive save/load. */
function saveMapDivisions() {
    try {
        var positions = {};
        window.mapDivisions.forEach(function(d) {
            positions[d.id] = d.province;
        });
        window.dendryUI.dendryEngine.state.qualities.map_divisions =
            JSON.stringify(positions);
    } catch (e) {
        console.warn('Could not store division positions:', e);
    }
}

function loadMapDivisions() {
    var positions = {};
    try {
        var raw = window.dendryUI.dendryEngine.state.qualities.map_divisions;
        if (raw) {
            positions = JSON.parse(raw);
        }
    } catch (e) {
        console.warn('Could not read division positions:', e);
    }
    window.mapDivisions.forEach(function(d) {
        d.province = positions[d.id] || d.start;
    });
}

/* ---------- colours ---------- */

window.getMapPartyColor = function(controller) {
    var variable = window.mapPartyColors[controller];
    if (!variable) {
        return '#999';
    }
    var color = getComputedStyle(document.body)
        .getPropertyValue(variable).trim();
    return color || '#999';
};

window.getMapProvinceColor = function(controller, control) {
    var color = window.getMapPartyColor(controller);
    control = Math.max(0, Math.min(100, control));
    return 'color-mix(in srgb, ' + color + ' ' + control + '%, white)';
};

/* ---------- svg helpers ---------- */

function getMapSvg() {
    return document.querySelector('#map-container .map-frame svg');
}

function getMapElement(id) {
    var svg = getMapSvg();
    return svg ? svg.querySelector('[id="' + id + '"]') : null;
}

function mapIsOpen() {
    var container = document.getElementById('map-container');
    return !!(container && container.classList.contains('active'));
}

/* A province may be a single shape or a <g> of shapes. */
function getMapShapes(el) {
    if (el.matches(MAP_SHAPES)) {
        return [el];
    }
    return Array.prototype.slice.call(el.querySelectorAll(MAP_SHAPES));
}

/* Walk up from whatever was hovered/clicked to the province element. */
function findProvinceElement(target) {
    var svg = getMapSvg();
    if (!svg || !target || !svg.contains(target)) {
        return null;
    }
    var el = target;
    while (el && el !== svg) {
        if (el.id && window.mapProvinces[el.id]) {
            return el;
        }
        el = el.parentNode;
    }
    return null;
}

/*
What is under the mouse? elementsFromPoint lists everything stacked at that
spot, so this still works if another SVG element sits on top of a province.
Returns { province: <element or null>, counter: <province id or null> }.
*/
function findMapHit(event) {
    var hit = { province: null, counter: null };
    var svg = getMapSvg();
    if (!svg) {
        return hit;
    }
    var rect = svg.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) {
        return hit;
    }
    var stack = document.elementsFromPoint(event.clientX, event.clientY);
    for (var i = 0; i < stack.length; i++) {
        var el = stack[i];
        if (!svg.contains(el)) {
            continue;
        }
        if (!hit.counter && el.closest) {
            var counter = el.closest('.map-division-counter');
            if (counter) {
                hit.counter = counter.getAttribute('data-province');
            }
        }
        if (!hit.province) {
            hit.province = findProvinceElement(el);
        }
    }
    if (!hit.province && hit.counter) {
        hit.province = getMapElement(hit.counter);
    }
    return hit;
}

/* ---------- sidebar ---------- */

window.ensureMapSidebar = function() {
    var sidebar = document.getElementById('map-sidebar');
    if (!sidebar) {
        sidebar = document.createElement('div');
        sidebar.id = 'map-sidebar';
        sidebar.className = 'tools right';
        var content = document.getElementById('content');
        content.parentNode.insertBefore(sidebar, content);

        /* Delegated, so they survive the sidebar being re-rendered. */
        sidebar.addEventListener('change', function(event) {
            var box = event.target;
            if (box.matches && box.matches('input[data-division]')) {
                window.setMapDivisionSelected(
                    box.getAttribute('data-division'),
                    box.checked
                );
            }
        });
        sidebar.addEventListener('click', function(event) {
            var button = event.target.closest ?
                event.target.closest('button') : null;
            if (!button) {
                return;
            }
            if (button.hasAttribute('data-move-to')) {
                window.tryMoveSelectedDivisions(
                    button.getAttribute('data-move-to')
                );
            } else if (button.hasAttribute('data-select-all')) {
                window.selectAllMapDivisions();
            } else if (button.hasAttribute('data-select-none')) {
                window.selectedMapDivisions = [];
                mapMessage = '';
                window.refreshMapUI();
            }
        });
    }
    return sidebar;
};

window.renderMapSidebar = function(provinceId) {
    var sidebar = window.ensureMapSidebar();
    var data = provinceId ? window.mapProvinces[provinceId] : null;

    if (!data) {
        sidebar.innerHTML =
            '<h2>Province</h2>' +
            '<div class="map-hint">Click a province to see its details. ' +
            'Click a division icon to select the divisions there, then ' +
            'right-click an adjacent province to move them.</div>' +
            (mapMessage ? '<div class="map-message">' + mapMessage + '</div>' : '');
        return;
    }

    var html = '<h2>' + (data.name || provinceId) + '</h2>';
    window.mapProvinceFields.forEach(function(field) {
        var value = field.value(data);
        if (value === undefined || value === null) {
            return;
        }
        html +=
            '<div class="province-stat">' +
                '<div class="province-stat-label">' + field.label + '</div>' +
                '<div class="province-stat-value">' + value + '</div>' +
            '</div>';
    });

    /* Divisions stationed here */
    html += '<h3>Divisions</h3>';
    var here = divisionsIn(provinceId);
    var mine = playerDivisionsIn(provinceId);
    var selected = window.selectedMapDivisions;

    if (!here.length) {
        html += '<div class="map-hint">No divisions stationed here.</div>';
    } else {
        html += '<div class="division-list">';
        here.forEach(function(d) {
            if (d.owner === window.mapPlayerFaction) {
                html +=
                    '<label class="division-row">' +
                    '<input type="checkbox" data-division="' + d.id + '"' +
                    (selected.indexOf(d.id) !== -1 ? ' checked' : '') + '> ' +
                    d.name + '</label>';
            } else {
                html +=
                    '<div class="division-row foreign">' + d.name +
                    ' <span class="division-owner">(' +
                    (window.mapPartyNames[d.owner] || d.owner) +
                    ')</span></div>';
            }
        });
        html += '</div>';
    }

    if (mine.length) {
        html +=
            '<div class="division-actions">' +
            '<button class="map-button" data-select-all>Select all</button> ' +
            '<button class="map-button" data-select-none>Clear</button>' +
            '</div>';
    }

    if (selected.length) {
        html += '<div class="division-move"><div class="province-stat-label">' +
            'Move ' + selected.length + ' division' +
            (selected.length === 1 ? '' : 's') + ' to:</div>';
        getAdjacentProvinces(provinceId).forEach(function(otherId) {
            html += '<button class="map-button" data-move-to="' + otherId +
                '">' + window.mapProvinces[otherId].name + '</button> ';
        });
        html += '<div class="map-hint">Or right-click an adjacent ' +
            'province on the map.</div></div>';
    }

    if (mapMessage) {
        html += '<div class="map-message">' + mapMessage + '</div>';
    }
    sidebar.innerHTML = html;
};

/* ---------- selection ---------- */

window.refreshMapUI = function() {
    window.renderMapSidebar(window.selectedMapProvince);
    window.renderMapCounters();
};

window.showMapProvince = function(provinceId, keepDivisions) {
    var data = window.mapProvinces[provinceId];
    if (!data) {
        return;
    }
    if (!keepDivisions && provinceId !== window.selectedMapProvince) {
        window.selectedMapDivisions = [];
    }
    mapMessage = '';

    var svg = getMapSvg();
    if (svg) {
        svg.querySelectorAll('.map-province-selected').forEach(function(p) {
            p.classList.remove('map-province-selected');
        });
    }
    var el = getMapElement(provinceId);
    if (el) {
        el.classList.add('map-province-selected');
    }
    window.selectedMapProvince = provinceId;
    window.refreshMapUI();
};

window.clearMapProvince = function() {
    var svg = getMapSvg();
    if (svg) {
        svg.querySelectorAll('.map-province-selected').forEach(function(p) {
            p.classList.remove('map-province-selected');
        });
    }
    window.selectedMapProvince = null;
    window.selectedMapDivisions = [];
    mapMessage = '';
    if (document.getElementById('map-sidebar')) {
        window.refreshMapUI();
    }
};

window.setMapDivisionSelected = function(divisionId, on) {
    var list = window.selectedMapDivisions;
    var index = list.indexOf(divisionId);
    if (on && index === -1) {
        list.push(divisionId);
    } else if (!on && index !== -1) {
        list.splice(index, 1);
    }
    mapMessage = '';
    window.refreshMapUI();
};

window.selectAllMapDivisions = function() {
    var provinceId = window.selectedMapProvince;
    if (!provinceId) {
        return;
    }
    window.selectedMapDivisions = playerDivisionsIn(provinceId).map(function(d) {
        return d.id;
    });
    mapMessage = '';
    window.refreshMapUI();
};

/* Clicking a division icon: select the province and all your divisions
   there. Clicking again with everything already selected clears it. */
window.onMapCounterClick = function(provinceId) {
    var mine = playerDivisionsIn(provinceId);

    if (provinceId !== window.selectedMapProvince) {
        window.showMapProvince(provinceId);
    }
    if (!mine.length) {
        return;
    }
    var allSelected = mine.every(function(d) {
        return window.selectedMapDivisions.indexOf(d.id) !== -1;
    });
    if (allSelected) {
        window.selectedMapDivisions = [];
    } else {
        window.selectedMapDivisions = mine.map(function(d) { return d.id; });
    }
    mapMessage = '';
    window.refreshMapUI();
};

/* ---------- moving ---------- */

function setMapMessage(text) {
    mapMessage = text;
    window.renderMapSidebar(window.selectedMapProvince);
}

window.tryMoveSelectedDivisions = function(toId) {
    var fromId = window.selectedMapProvince;
    var ids = window.selectedMapDivisions.slice();

    if (!fromId || !ids.length || !window.mapProvinces[toId]) {
        return;
    }
    if (toId === fromId) {
        setMapMessage('Those divisions are already in ' +
            window.mapProvinces[fromId].name + '.');
        return;
    }
    if (!window.areProvincesAdjacent(fromId, toId)) {
        setMapMessage(window.mapProvinces[toId].name +
            ' is not adjacent to ' + window.mapProvinces[fromId].name + '.');
        return;
    }
    var verdict = window.mapCanMove(ids, fromId, toId);
    if (verdict !== true) {
        setMapMessage(typeof verdict === 'string' ?
            verdict : 'Those divisions cannot move there.');
        return;
    }

    window.mapDivisions.forEach(function(d) {
        if (ids.indexOf(d.id) !== -1) {
            d.province = toId;
        }
    });
    saveMapDivisions();

    /* The selection follows the divisions to their new province. */
    window.selectedMapDivisions = ids;
    window.showMapProvince(toId, true);
    window.onMapDivisionsMoved(ids, fromId, toId);
};

/* ---------- drawing ---------- */

window.createMapLayout = function() {
    var container = document.getElementById('map-container');
    if (!container) {
        return null;
    }
    container.innerHTML = '';
    hoveredMapProvince = null;
    window.selectedMapProvince = null;
    window.selectedMapDivisions = [];
    mapMessage = '';

    var layout = document.createElement('div');
    layout.className = 'map-layout';
    var frame = document.createElement('div');
    frame.className = 'map-frame';
    layout.appendChild(frame);
    container.appendChild(layout);

    window.renderMapSidebar(null);
    return frame;
};

/* One icon per province that has divisions stationed in it. */
window.renderMapCounters = function() {
    var svg = getMapSvg();
    if (!svg || !mapIsOpen()) {
        return;
    }

    svg.querySelectorAll('.map-division-counter').forEach(function(c) {
        c.remove();
    });

    Object.keys(window.mapProvinces).forEach(function(provinceId) {
        var data = window.mapProvinces[provinceId];
        var province = getMapElement(provinceId);
        var here = divisionsIn(provinceId);

        if (!province || !here.length) {
            return;
        }

        var x, y;
        if (data.label) {
            x = data.label[0];
            y = data.label[1];
        } else {
            try {
                /* Province centre, in the root SVG's coordinates. */
                var bbox = province.getBBox();
                var localCenter = new DOMPoint(
                    bbox.x + bbox.width / 2,
                    bbox.y + bbox.height / 2
                );
                var provinceMatrix = province.getScreenCTM();
                var svgMatrix = svg.getScreenCTM();
                if (!provinceMatrix || !svgMatrix) {
                    return;
                }
                var svgCenter = localCenter
                    .matrixTransform(provinceMatrix)
                    .matrixTransform(svgMatrix.inverse());
                x = svgCenter.x;
                y = svgCenter.y;
            } catch (e) {
                return;
            }
        }

        var ns = 'http://www.w3.org/2000/svg';
        var group = document.createElementNS(ns, 'g');
        var hasSelected = here.some(function(d) {
            return window.selectedMapDivisions.indexOf(d.id) !== -1;
        });
        group.setAttribute('class', 'map-division-counter' +
            (hasSelected ? ' map-counter-selected' : ''));
        group.setAttribute('data-province', provinceId);

        var circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 36);
        circle.style.stroke = window.getMapPartyColor(here[0].owner);
        group.appendChild(circle);

        var text = document.createElementNS(ns, 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.style.fontSize = '30px';
        text.textContent = here.length;
        group.appendChild(text);

        svg.appendChild(group);
    });
};

/* Colour the provinces, then draw the division icons. */
window.renderGameMap = function() {
    var svg = getMapSvg();
    if (!svg) {
        return;
    }

    Object.keys(window.mapProvinces).forEach(function(provinceId) {
        var data = window.mapProvinces[provinceId];
        var province = getMapElement(provinceId);

        if (!province) {
            console.warn('Province not found in SVG:', provinceId);
            return;
        }

        var fill = window.getMapProvinceColor(data.controller, data.control);
        getMapShapes(province).forEach(function(shape) {
            shape.classList.add('map-province-shape');
            shape.style.fill = fill;
        });
    });

    window.renderMapCounters();
};

window.loadGameMap = function() {
    var frame = window.createMapLayout();
    if (!frame) {
        return;
    }
    loadMapDivisions();

    var draw = function(svgText) {
        frame.innerHTML = svgText;
        window.renderGameMap();
    };

    if (mapSvgText) {
        draw(mapSvgText);
        return;
    }

    fetch('img/European Russia Map.svg')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.text();
        })
        .then(function(text) {
            mapSvgText = text;
            draw(text);
        })
        .catch(function(error) {
            console.error('Failed to load game map:', error);
        });
};

/* ---------- mouse ---------- */

function setMapHover(el) {
    if (el === hoveredMapProvince) {
        return;
    }
    if (hoveredMapProvince) {
        hoveredMapProvince.classList.remove('map-province-hover');
    }
    if (el) {
        el.classList.add('map-province-hover');
    }
    hoveredMapProvince = el;
}

document.addEventListener('mousemove', function(event) {
    var svg = getMapSvg();
    if (!svg) {
        return;
    }
    var hit = findMapHit(event);
    setMapHover(hit.province);
    svg.style.cursor = hit.province ? 'pointer' : '';
});

/* Left click: a division icon selects its divisions; a province selects
   (or, if already selected, deselects) the province. */
document.addEventListener('click', function(event) {
    var hit = findMapHit(event);

    if (hit.counter) {
        window.onMapCounterClick(hit.counter);
        return;
    }
    if (!hit.province) {
        return;
    }
    if (window.selectedMapProvince === hit.province.id) {
        window.clearMapProvince();
    } else {
        window.showMapProvince(hit.province.id);
    }
});

/* Right click: move the selected divisions into that province. */
document.addEventListener('contextmenu', function(event) {
    if (!mapIsOpen()) {
        return;
    }
    var hit = findMapHit(event);
    if (!hit.province) {
        return;
    }
    event.preventDefault();
    if (window.selectedMapDivisions.length) {
        window.tryMoveSelectedDivisions(hit.province.id);
    }
});

/*
Map navigation.
*/
window.openMapView = function() {
    var container = document.getElementById('map-container');
    var content = document.getElementById('content');

    window.ensureMapSidebar();
    document.body.classList.add('map-active');
    if (content) {
        content.style.display = 'none';
    }
    if (container) {
        container.classList.add('active');
    }
    window.loadGameMap();
};

window.closeMapView = function() {
    var container = document.getElementById('map-container');
    var content = document.getElementById('content');

    document.body.classList.remove('map-active');
    if (container) {
        container.classList.remove('active');
    }
    if (content) {
        content.style.display = '';
    }
    window.clearMapProvince();
    setMapHover(null);
};

/* If the player leaves the map scene some other way (e.g. Library),
   make sure the map view is closed. */
window.syncMapView = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (mapIsOpen() && !scene.startsWith('map')) {
        window.closeMapView();
    }
};

window.showMap = function() {
    var engine = window.dendryUI.dendryEngine;

    if (engine.state.sceneId.startsWith('map')) {
        window.closeMapView();
        engine.goToScene('backSpecialScene');
        return;
    }

    engine.goToScene('map');
    setTimeout(window.openMapView, 0);
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
    image: "img/sovnarkom1.jpg"
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

harbringers_progress: {
    name: "Harbringers of Progress",
    description: "Assemble a government composition that is at least 50% women, 50% non-Russian minorities, and has LGBT representation.",
    image: "img/equality.png"
},

elders_zion: {
    name: "Elders of Zion",
    description: "Eliminate Lenin; install a government that is composed entirely of Jews.",
    image: "img/elders_of_zion.png"
},

black_devil: {
    name: "The Black Devil",
    description: "Power is in the hands of Yakov Sverdlov.",
    image: "img/portraits/b/sverdlov.jpg"
},

prophet_armed: {
    name: "The Prophet Armed",
    description: "Power is in the hands of Leon Trotsky.",
    image: "img/portraits/b/trotsky.jpg"
},

party_favorite: {
    name: "The Party Favorite",
    description: "Power is in the hands of Nikolai Bukharin.",
    image: "img/portraits/b/bukharin.jpg"
},

peoples_tribune: {
    name: "The People's Tribune",
    description: "Power is in the hands of Grigory Zinoviev.",
    image: "img/portraits/b/zinoviev.jpg"
},

red_tsar: {
    name: "The Red Tsar",
    description: "Power is in the hands of Iosif Stalin.",
    image: "img/portraits/b/stalin.jpg"
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
    window.syncMapView();
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


function metric_color(value, positive_is_good = true) {
    if (value == 0) {
        return "inherit";
    }

    if (positive_is_good) {
        return value > 0
            ? "var(--level1-color)"
            : "var(--level7-color)";
    }

    return value > 0
        ? "var(--level7-color)"
        : "var(--level1-color)";
}
