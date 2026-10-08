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
    finland: {
        name: 'Finland',
        controller: 'none',
        control: 100,
        adjacent: ['petrograd', 'arkhangelsk', 'karelia', 'murmansk']
    },
    volhynia: {
        name: 'Volhynia',
        controller: 'none',
        control: 100,
        adjacent: ['podolia', 'kyiv', 'minsk', 'poland', 'grodno']
    },
    bessarabia: {
        name: 'Bessarabia',
        controller: 'none',
        control: 100,
        adjacent: ['podolia', 'kherson']
    },
    podolia: {
        name: 'Podolia',
        controller: 'none',
        control: 100,
        adjacent: ['volhynia', 'bessarabia', 'kyiv', 'kherson']
    },
    petrograd: {
        name: 'Petrograd',
        controller: 'bolsheviks',
        control: 100,
        adjacent: ['finland', 'novgorod', 'pskov', 'olonets', 'estonia']
    },
    novgorod: {
        name: 'Novgorod',
        controller: 'sr',
        control: 70,
        adjacent: ['petrograd', 'tver', 'pskov', 'yaroslavl', 'vologda', 'olonets']
    },
    chernigov: {
        name: 'Chernigov',
        controller: 'none',
        control: 100,
        adjacent: ['smolensk', 'kyiv', 'mogilev', 'orel', 'kursk', 'poltava', 'minsk']
    },
    smolensk: {
        name: 'Smolensk',
        controller: 'none',
        control: 100,
        adjacent: ['chernigov', 'tver', 'kaluga', 'moscow', 'mogilev', 'vitebsk', 'orel', 'pskov']
    },
    tver: {
        name: 'Tver',
        controller: 'mensheviks',
        control: 40,
        adjacent: ['novgorod', 'smolensk', 'moscow', 'pskov', 'yaroslavl', 'vladimir']
    },
    yekaterinoslav: {
        name: 'Yekaterinoslav',
        controller: 'none',
        control: 100,
        adjacent: ['kharkov', 'kherson', 'poltava', 'don', 'taurida']
    },
    kaluga: {
        name: 'Kaluga',
        controller: 'none',
        control: 100,
        adjacent: ['smolensk', 'moscow', 'tula', 'orel']
    },
    kharkov: {
        name: 'Kharkov',
        controller: 'none',
        control: 100,
        adjacent: ['yekaterinoslav', 'kursk', 'poltava', 'voronezh', 'don']
    },
    moscow: {
        name: 'Moscow',
        controller: 'bolsheviks',
        control: 85,
        adjacent: ['smolensk', 'tver', 'kaluga', 'tula', 'vladimir', 'ryazan']
    },
    kyiv: {
        name: 'Kyiv',
        controller: 'none',
        control: 100,
        adjacent: ['volhynia', 'podolia', 'chernigov', 'kherson', 'poltava', 'minsk']
    },
    mogilev: {
        name: 'Mogilev',
        controller: 'none',
        control: 100,
        adjacent: ['chernigov', 'smolensk', 'vitebsk', 'minsk']
    },
    tula: {
        name: 'Tula',
        controller: 'none',
        control: 100,
        adjacent: ['kaluga', 'moscow', 'orel', 'tambov', 'ryazan']
    },
    vitebsk: {
        name: 'Vitebsk',
        controller: 'none',
        control: 100,
        adjacent: ['smolensk', 'mogilev', 'pskov', 'latvia', 'minsk']
    },
    orel: {
        name: 'Orel',
        controller: 'none',
        control: 100,
        adjacent: ['chernigov', 'smolensk', 'kaluga', 'tula', 'kursk', 'voronezh', 'tambov']
    },
    kursk: {
        name: 'Kursk',
        controller: 'none',
        control: 100,
        adjacent: ['chernigov', 'kharkov', 'orel', 'poltava', 'voronezh']
    },
    kherson: {
        name: 'Kherson',
        controller: 'none',
        control: 100,
        adjacent: ['bessarabia', 'podolia', 'yekaterinoslav', 'kyiv', 'poltava', 'taurida']
    },
    pskov: {
        name: 'Pskov',
        controller: 'none',
        control: 100,
        adjacent: ['petrograd', 'novgorod', 'smolensk', 'tver', 'vitebsk', 'estonia', 'latvia']
    },
    poltava: {
        name: 'Poltava',
        controller: 'none',
        control: 100,
        adjacent: ['chernigov', 'yekaterinoslav', 'kharkov', 'kyiv', 'kursk', 'kherson']
    },
    arkhangelsk: {
        name: 'Arkhangelsk',
        controller: 'none',
        control: 100,
        adjacent: ['finland', 'vologda', 'olonets', 'karelia']
    },
    crimea: {
        name: 'Crimea',
        controller: 'none',
        control: 100,
        adjacent: ['taurida']
    },
    kuban: {
        name: 'Kuban',
        controller: 'none',
        control: 100,
        adjacent: ['don', 'georgia', 'stavropol', 'terek']
    },
    yaroslavl: {
        name: 'Yaroslavl',
        controller: 'none',
        control: 100,
        adjacent: ['novgorod', 'tver', 'vladimir', 'vologda', 'kostroma']
    },
    voronezh: {
        name: 'Voronezh',
        controller: 'none',
        control: 100,
        adjacent: ['kharkov', 'orel', 'kursk', 'don', 'tambov', 'saratov']
    },
    vladimir: {
        name: 'Vladimir',
        controller: 'none',
        control: 100,
        adjacent: ['tver', 'moscow', 'yaroslavl', 'tambov', 'ryazan', 'kostroma', 'nizhny']
    },
    don: {
        name: 'Don Host',
        controller: 'none',
        control: 100,
        adjacent: ['yekaterinoslav', 'kharkov', 'kuban', 'voronezh', 'stavropol', 'saratov', 'astrakhan']
    },
    vologda: {
        name: 'Vologda',
        controller: 'none',
        control: 100,
        adjacent: ['novgorod', 'arkhangelsk', 'yaroslavl', 'kostroma', 'vyatka', 'olonets', 'perm']
    },
    tambov: {
        name: 'Tambov',
        controller: 'none',
        control: 100,
        adjacent: ['tula', 'orel', 'voronezh', 'vladimir', 'ryazan', 'nizhny', 'saratov', 'penza']
    },
    ryazan: {
        name: 'Ryazan',
        controller: 'none',
        control: 100,
        adjacent: ['moscow', 'tula', 'vladimir', 'tambov']
    },
    kostroma: {
        name: 'Kostroma',
        controller: 'none',
        control: 100,
        adjacent: ['yaroslavl', 'vladimir', 'vologda', 'nizhny', 'vyatka']
    },
    georgia: {
        name: 'Georgia',
        controller: 'none',
        control: 100,
        adjacent: ['kuban', 'kars', 'terek', 'armenia', 'azerbaijan', 'dagestan']
    },
    stavropol: {
        name: 'Stavropol',
        controller: 'none',
        control: 100,
        adjacent: ['kuban', 'don', 'terek', 'astrakhan']
    },
    kars: {
        name: 'Kars',
        controller: 'none',
        control: 100,
        adjacent: ['georgia', 'armenia']
    },
    nizhny: {
        name: 'Nizhny Novgorod',
        controller: 'none',
        control: 100,
        adjacent: ['vladimir', 'tambov', 'kostroma', 'penza', 'simbirsk', 'vyatka', 'kazan']
    },
    terek: {
        name: 'Terek',
        controller: 'none',
        control: 100,
        adjacent: ['kuban', 'georgia', 'stavropol', 'astrakhan', 'dagestan']
    },
    saratov: {
        name: 'Saratov',
        controller: 'none',
        control: 100,
        adjacent: ['voronezh', 'don', 'tambov', 'penza', 'astrakhan', 'simbirsk', 'samara']
    },
    penza: {
        name: 'Penza',
        controller: 'none',
        control: 100,
        adjacent: ['tambov', 'nizhny', 'saratov', 'simbirsk']
    },
    armenia: {
        name: 'Armenia',
        controller: 'none',
        control: 100,
        adjacent: ['georgia', 'kars', 'azerbaijan']
    },
    astrakhan: {
        name: 'Astrakhan',
        controller: 'none',
        control: 100,
        adjacent: ['don', 'stavropol', 'terek', 'saratov', 'samara', 'uralsk']
    },
    azerbaijan: {
        name: 'Azerbaijan',
        controller: 'none',
        control: 100,
        adjacent: ['georgia', 'armenia', 'dagestan']
    },
    simbirsk: {
        name: 'Simbirsk',
        controller: 'none',
        control: 100,
        adjacent: ['nizhny', 'saratov', 'penza', 'samara', 'kazan']
    },
    dagestan: {
        name: 'Dagestan',
        controller: 'none',
        control: 100,
        adjacent: ['georgia', 'terek', 'azerbaijan']
    },
    samara: {
        name: 'Samara',
        controller: 'none',
        control: 100,
        adjacent: ['saratov', 'astrakhan', 'simbirsk', 'kazan', 'uralsk', 'ufa', 'orenburg']
    },
    vyatka: {
        name: 'Vyatka',
        controller: 'none',
        control: 100,
        adjacent: ['vologda', 'kostroma', 'nizhny', 'kazan', 'ufa', 'perm']
    },
    kazan: {
        name: 'Kazan',
        controller: 'none',
        control: 100,
        adjacent: ['nizhny', 'simbirsk', 'samara', 'vyatka', 'ufa']
    },
    uralsk: {
        name: 'Uralsk',
        controller: 'none',
        control: 100,
        adjacent: ['astrakhan', 'samara', 'transcaspian', 'orenburg', 'turgai', 'syr_darya']
    },
    transcaspian: {
        name: 'Transcaspia',
        controller: 'none',
        control: 100,
        adjacent: ['uralsk', 'khiva', 'syr_darya']
    },
    ufa: {
        name: 'Ufa',
        controller: 'none',
        control: 100,
        adjacent: ['samara', 'vyatka', 'kazan', 'yekaterinburg', 'orenburg', 'perm']
    },
    olonets: {
        name: 'Olonets',
        controller: 'none',
        control: 100,
        adjacent: ['petrograd', 'novgorod', 'arkhangelsk', 'vologda', 'karelia']
    },
    yekaterinburg: {
        name: 'Yekaterinburg',
        controller: 'none',
        control: 100,
        adjacent: ['ufa', 'orenburg', 'perm']
    },
    orenburg: {
        name: 'Orenburg',
        controller: 'none',
        control: 100,
        adjacent: ['samara', 'uralsk', 'ufa', 'yekaterinburg', 'turgai', 'akmolinsk']
    },
    turgai: {
        name: 'Turgai',
        controller: 'none',
        control: 100,
        adjacent: ['uralsk', 'orenburg', 'syr_darya', 'akmolinsk']
    },
    khiva: {
        name: 'Khiva',
        controller: 'none',
        control: 100,
        adjacent: ['transcaspian', 'syr_darya']
    },
    syr_darya: {
        name: 'Syr-Darya',
        controller: 'none',
        control: 100,
        adjacent: ['uralsk', 'transcaspian', 'turgai', 'khiva', 'akmolinsk', 'samarkhand', 'ferghana', 'semipalatinsk', 'semirechye']
    },
    akmolinsk: {
        name: 'Akmolinsk',
        controller: 'none',
        control: 100,
        adjacent: ['orenburg', 'turgai', 'syr_darya', 'semipalatinsk']
    },
    samarkhand: {
        name: 'Samarkand',
        controller: 'none',
        control: 100,
        adjacent: ['syr_darya', 'ferghana']
    },
    ferghana: {
        name: 'Fergana',
        controller: 'none',
        control: 100,
        adjacent: ['syr_darya', 'samarkhand', 'semirechye']
    },
    semipalatinsk: {
        name: 'Semipalatinsk',
        controller: 'none',
        control: 100,
        adjacent: ['syr_darya', 'akmolinsk', 'semirechye', 'tomsk']
    },
    siberia: {
        name: 'Siberia',
        controller: 'none',
        control: 100,
        adjacent: ['tomsk']
    },
    semirechye: {
        name: 'Semirechye',
        controller: 'none',
        control: 100,
        adjacent: ['syr_darya', 'ferghana', 'semipalatinsk']
    },
    tomsk: {
        name: 'Tomsk',
        controller: 'none',
        control: 100,
        adjacent: ['semipalatinsk', 'siberia']
    },
    estonia: {
        name: 'Estonia',
        controller: 'none',
        control: 100,
        adjacent: ['petrograd', 'pskov', 'latvia']
    },
    latvia: {
        name: 'Latvia',
        controller: 'none',
        control: 100,
        adjacent: ['vitebsk', 'pskov', 'estonia', 'lithuania']
    },
    lithuania: {
        name: 'Lithuania',
        controller: 'none',
        control: 100,
        adjacent: ['latvia', 'poland']
    },
    minsk: {
        name: 'Minsk',
        controller: 'none',
        control: 100,
        adjacent: ['volhynia', 'chernigov', 'kyiv', 'mogilev', 'vitebsk', 'grodno']
    },
    poland: {
        name: 'Poland',
        controller: 'none',
        control: 100,
        adjacent: ['volhynia', 'lithuania', 'grodno']
    },
    grodno: {
        name: 'Grodno',
        controller: 'none',
        control: 100,
        adjacent: ['volhynia', 'minsk', 'poland']
    },
    taurida: {
        name: 'Taurida',
        controller: 'none',
        control: 100,
        adjacent: ['yekaterinoslav', 'kherson', 'crimea']
    },
    karelia: {
        name: 'Karelia',
        controller: 'none',
        control: 100,
        adjacent: ['finland', 'arkhangelsk', 'olonets', 'murmansk']
    },
    murmansk: {
        name: 'Murmansk',
        controller: 'none',
        control: 100,
        adjacent: ['finland', 'karelia']
    },
    perm: {
        name: 'Perm',
        controller: 'none',
        control: 100,
        adjacent: ['vologda', 'vyatka', 'ufa', 'yekaterinburg']
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
    ns: '--ns-color',
    none: '--none'
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
    ns: 'Popular Socialists',
    none: 'Uncontrolled'
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
    {
        label: 'Control',
        value: function(d) {
            return d.controller === 'none' ? null : d.control + '%';
        }
    }
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
    /* getElementById is much faster than querySelector on a big SVG. */
    var svg = getMapSvg();
    var el = document.getElementById(id);
    return (svg && el && svg.contains(el)) ? el : null;
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
            if (box.matches && box.matches('input[data-division-count]')) {
                window.setMapSelectionCount(parseInt(box.value, 10) || 0);
            }
        });
        sidebar.addEventListener('click', function(event) {
            var button = event.target.closest ?
                event.target.closest('button') : null;
            if (!button) {
                return;
            }
            if (button.hasAttribute('data-count-step')) {
                window.stepMapSelection(
                    parseInt(button.getAttribute('data-count-step'), 10)
                );
            } else if (button.hasAttribute('data-move-to')) {
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
                html += '<div class="division-row' +
                    (selected.indexOf(d.id) !== -1 ? ' selected' : '') +
                    '">' + d.name + '</div>';
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
            '<div class="division-selector-label">Divisions to move</div>' +
            '<div class="division-selector">' +
            '<button class="map-button" data-count-step="-1"' +
                (selected.length <= 0 ? ' disabled' : '') +
                ' title="Select one fewer">&#9664;</button>' +
            '<input type="number" class="division-count" ' +
                'data-division-count min="0" max="' + mine.length + '" ' +
                'value="' + selected.length + '">' +
            '<button class="map-button" data-count-step="1"' +
                (selected.length >= mine.length ? ' disabled' : '') +
                ' title="Select one more">&#9654;</button>' +
            '<span class="division-of">of ' + mine.length + '</span>' +
            '</div>' +
            '<div class="division-actions">' +
            '<button class="map-button" data-select-all>All</button> ' +
            '<button class="map-button" data-select-none>None</button>' +
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

/* Set how many of your divisions in the selected province are selected.
   Selected divisions stay selected; extra ones are added in list order, and
   reducing the number drops the most recently added first. */
window.setMapSelectionCount = function(count) {
    var provinceId = window.selectedMapProvince;
    if (!provinceId) {
        return;
    }
    var mine = playerDivisionsIn(provinceId);
    count = Math.max(0, Math.min(mine.length, count));

    var current = window.selectedMapDivisions.filter(function(id) {
        return mine.some(function(d) { return d.id === id; });
    });
    if (count < current.length) {
        current = current.slice(0, count);
    } else {
        mine.forEach(function(d) {
            if (current.length < count && current.indexOf(d.id) === -1) {
                current.push(d.id);
            }
        });
    }
    window.selectedMapDivisions = current;
    mapMessage = '';
    window.refreshMapUI();
};

window.stepMapSelection = function(delta) {
    window.setMapSelectionCount(window.selectedMapDivisions.length + delta);
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

var mapMoveQueued = false;
var mapLastMouse = null;
document.addEventListener('mousemove', function(event) {
    if (!getMapSvg()) {
        return;
    }
    mapLastMouse = { clientX: event.clientX, clientY: event.clientY };
    if (mapMoveQueued) {
        return;
    }
    mapMoveQueued = true;
    /* At most one hit-test per frame; the map has thousands of shapes. */
    requestAnimationFrame(function() {
        mapMoveQueued = false;
        var svg = getMapSvg();
        if (!svg || !mapLastMouse) {
            return;
        }
        var hit = findMapHit(mapLastMouse);
        setMapHover(hit.province);
        svg.style.cursor = hit.province ? 'pointer' : '';
    });
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
