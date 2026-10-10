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
Moves:      every order that moves a group of divisions one province (or
            queues an attack) costs a move. The limit is
            window.mapMovesPerTurn. See "SETTINGS" just below.
Battles:    moving into a province held by a hostile army queues a battle
            (red arrow on the map). Nothing is fought until the post_turn
            scene calls window.mapPostTurn(), which resolves every queued
            battle and then resets the move counter.

In your post_turn scene, add:
    on-arrival: {! window.mapPostTurn(); !}
*/

/* ---------- SETTINGS ---------- */

/* Only divisions owned by this faction can be selected and moved. */
window.mapPlayerFaction = 'bolsheviks';

/* Moves available each turn. */
window.mapMovesPerTurn = 10;

/* 'order'    : one move per order (any number of divisions moved together
                from one province to a neighbouring one, or one queued attack)
   'division' : one move per division */
window.mapMoveCostMode = 'order';

/* Control (0-100) of a province that has just been conquered. */
window.mapConquestControl = 50;

/* Battle calculation: each round every attacking division destroys one
   enemy division with probability attackKill, every defending division with
   probability defendKill. Rounds repeat until one side is wiped out or
   maxRounds is reached (then the defender holds). */
window.mapBattleSettings = {
    attackKill: 0.35,
    defendKill: 0.40,
    maxRounds: 12
};

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
        adjacent: ['smolensk', 'mogilev', 'pskov', 'latvia', 'vilna', 'minsk']
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
        adjacent: ['finland', 'vologda', 'olonets', 'tobolsk', 'karelia']
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
        adjacent: ['novgorod', 'arkhangelsk', 'yaroslavl', 'kostroma', 'vyatka', 'olonets', 'tobolsk', 'perm']
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
        adjacent: ['uralsk', 'khiva', 'syr_darya', 'bukhara']
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
        adjacent: ['ufa', 'orenburg', 'tobolsk', 'perm']
    },
    orenburg: {
        name: 'Orenburg',
        controller: 'none',
        control: 100,
        adjacent: ['samara', 'uralsk', 'ufa', 'yekaterinburg', 'turgai', 'tobolsk', 'akmolinsk']
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
        adjacent: ['transcaspian', 'syr_darya', 'bukhara']
    },
    syr_darya: {
        name: 'Syr-Darya',
        controller: 'none',
        control: 100,
        adjacent: ['uralsk', 'transcaspian', 'turgai', 'khiva', 'bukhara', 'akmolinsk', 'samarkhand', 'ferghana', 'semipalatinsk', 'semirechye']
    },
    tobolsk: {
        name: 'Tobolsk',
        controller: 'none',
        control: 100,
        adjacent: ['arkhangelsk', 'vologda', 'yekaterinburg', 'orenburg', 'akmolinsk', 'siberia', 'tomsk', 'perm']
    },
    bukhara: {
        name: 'Bukhara',
        controller: 'none',
        control: 100,
        adjacent: ['transcaspian', 'khiva', 'syr_darya', 'samarkhand', 'ferghana']
    },
    akmolinsk: {
        name: 'Akmolinsk',
        controller: 'none',
        control: 100,
        adjacent: ['orenburg', 'turgai', 'syr_darya', 'tobolsk', 'semipalatinsk']
    },
    samarkhand: {
        name: 'Samarkand',
        controller: 'none',
        control: 100,
        adjacent: ['syr_darya', 'bukhara', 'ferghana']
    },
    ferghana: {
        name: 'Fergana',
        controller: 'none',
        control: 100,
        adjacent: ['syr_darya', 'bukhara', 'samarkhand', 'semirechye']
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
        adjacent: ['tobolsk', 'tomsk']
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
        adjacent: ['tobolsk', 'semipalatinsk', 'siberia']
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
        adjacent: ['vitebsk', 'pskov', 'estonia', 'lithuania', 'vilna']
    },
    lithuania: {
        name: 'Lithuania',
        controller: 'germany',
        control: 100,
        adjacent: ['latvia', 'vilna', 'poland']
    },
    vilna: {
        name: 'Vilna',
        controller: 'none',
        control: 100,
        adjacent: ['vitebsk', 'latvia', 'lithuania', 'minsk', 'poland', 'grodno']
    },
    minsk: {
        name: 'Minsk',
        controller: 'none',
        control: 100,
        adjacent: ['volhynia', 'chernigov', 'kyiv', 'mogilev', 'vitebsk', 'vilna', 'grodno']
    },
    poland: {
        name: 'Poland',
        controller: 'germany',
        control: 100,
        adjacent: ['volhynia', 'lithuania', 'vilna', 'grodno']
    },
    grodno: {
        name: 'Grodno',
        controller: 'none',
        control: 100,
        adjacent: ['volhynia', 'vilna', 'minsk', 'poland']
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
        adjacent: ['vologda', 'vyatka', 'ufa', 'yekaterinburg', 'tobolsk']
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
    germany: '--germany-color',
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
    germany: 'German Empire',
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

/* Remember each province's starting owner so a new game resets cleanly. */
Object.keys(window.mapProvinces).forEach(function(id) {
    var p = window.mapProvinces[id];
    p.startController = p.controller;
    p.startControl = p.control;
});

/* ---------- divisions ---------- */

function makeDivisions(province, owner, count, label, firstNumber) {
    var out = [];
    var base = label || (window.mapProvinces[province].name + ' Division');
    var n0 = firstNumber || 1;
    for (var i = 0; i < count; i++) {
        out.push({
            id: province + '_' + owner + '_' + (i + 1),
            name: base + ' ' + (n0 + i),
            owner: owner,
            province: province,
            start: province,     // where it begins a new game
            dead: false
        });
    }
    return out;
}

window.mapDivisions = [].concat(
    makeDivisions('petrograd', 'bolsheviks', 5),
    makeDivisions('novgorod', 'sr', 2),
    makeDivisions('tver', 'mensheviks', 1),
    makeDivisions('moscow', 'bolsheviks', 4),
    makeDivisions('poland', 'germany', 28, 'German Division', 1),
    makeDivisions('lithuania', 'germany', 23, 'German Division', 29)
);

var mapDivisionIndex = {};
window.mapDivisions.forEach(function(d) {
    mapDivisionIndex[d.id] = d;
});

/* ---------- rules hooks ---------- */

/* Return true to allow the move, or false / a message string to refuse it.
   Add supply, terrain, etc. here later. */
window.mapCanMove = function(divisionIds, fromId, toId) {
    return true;
};

/* Is `defender` an enemy of `attacker`? Moving into a province that holds
   only non-hostile foreign divisions is a peaceful move, not an attack.
   Right now every other faction is hostile. */
window.mapIsHostile = function(attacker, defender) {
    return attacker !== defender;
};

/* The battle calculation. Receives
     { to, from: [province ids], attackers: [divisions], defenders: [divisions] }
   and returns
     { attackersLost, defendersLost, winner: 'attacker' | 'defender' | 'none',
       rounds }
   Replace this to change how battles are decided. */
window.mapResolveBattle = function(battle) {
    var s = window.mapBattleSettings;
    var a = battle.attackers.length;
    var d = battle.defenders.length;
    var startA = a;
    var startD = d;
    var rounds = 0;

    function hits(n, p) {
        var h = 0;
        for (var i = 0; i < n; i++) {
            if (Math.random() < p) {
                h++;
            }
        }
        return h;
    }

    while (a > 0 && d > 0 && rounds < s.maxRounds) {
        var attackHits = hits(a, s.attackKill);
        var defendHits = hits(d, s.defendKill);
        a = Math.max(0, a - defendHits);
        d = Math.max(0, d - attackHits);
        rounds++;
    }

    var winner = 'defender';
    if (a > 0 && d === 0) {
        winner = 'attacker';
    } else if (a === 0 && d === 0) {
        winner = 'none';
    }
    return {
        attackersLost: startA - a,
        defendersLost: startD - d,
        winner: winner,
        rounds: rounds
    };
};

/* Called after a successful (peaceful) move. */
window.onMapDivisionsMoved = function(divisionIds, fromId, toId) {
};

/* ---------- state ---------- */

window.selectedMapProvince = null;
window.selectedMapDivisions = [];   // ids; always inside the selected province
window.mapMovesUsed = 0;
window.mapBattles = [];             // queued: { from, to, ids: [...], cost }
window.mapReport = [];              // plain-text results of the last post_turn

var MAP_SHAPES = 'path, polygon, polyline, rect, circle, ellipse';
var hoveredMapProvince = null;
var mapSvgText = null;   // cached so the SVG is only fetched once
var mapMessage = '';
var mapCenterCache = {};
var COUNTER_RADIUS = 36;

function engineQualities() {
    try {
        return window.dendryUI.dendryEngine.state.qualities;
    } catch (e) {
        return null;
    }
}

function readJson(raw, fallback) {
    if (!raw) {
        return fallback;
    }
    try {
        return JSON.parse(raw);
    } catch (e) {
        return fallback;
    }
}

/* Everything lives in Dendry qualities so it is saved and loaded with the
   game:  map_divisions, map_control, map_battles, map_report (JSON strings)
   and map_moves_used (a number, readable from scenes). */
window.saveMapState = function() {
    var q = engineQualities();
    if (!q) {
        return;
    }
    var positions = {};
    window.mapDivisions.forEach(function(d) {
        positions[d.id] = d.dead ? null : d.province;
    });
    var control = {};
    Object.keys(window.mapProvinces).forEach(function(id) {
        var p = window.mapProvinces[id];
        if (p.controller !== p.startController ||
            p.control !== p.startControl) {
            control[id] = [p.controller, p.control];
        }
    });
    q.map_divisions = JSON.stringify(positions);
    q.map_control = JSON.stringify(control);
    q.map_battles = JSON.stringify(window.mapBattles);
    q.map_report = JSON.stringify(window.mapReport);
    q.map_moves_used = window.mapMovesUsed;
};

window.loadMapState = function() {
    var q = engineQualities() || {};

    var positions = readJson(q.map_divisions, {});
    window.mapDivisions.forEach(function(d) {
        if (positions[d.id] === null) {
            d.dead = true;
            d.province = d.start;
        } else {
            d.dead = false;
            d.province = positions[d.id] || d.start;
        }
    });

    var control = readJson(q.map_control, {});
    Object.keys(window.mapProvinces).forEach(function(id) {
        var p = window.mapProvinces[id];
        var saved = control[id];
        p.controller = saved ? saved[0] : p.startController;
        p.control = saved ? saved[1] : p.startControl;
    });

    var battles = readJson(q.map_battles, []);
    window.mapBattles = Array.isArray(battles) ? battles.filter(function(b) {
        return b && window.mapProvinces[b.from] && window.mapProvinces[b.to] &&
            Array.isArray(b.ids);
    }) : [];

    var report = readJson(q.map_report, []);
    window.mapReport = Array.isArray(report) ? report : [];

    window.mapMovesUsed = Number(q.map_moves_used) || 0;
};

/* ---------- queries ---------- */

function divisionsIn(provinceId) {
    return window.mapDivisions.filter(function(d) {
        return !d.dead && d.province === provinceId;
    });
}

function isCommitted(divisionId) {
    return window.mapBattles.some(function(b) {
        return b.ids.indexOf(divisionId) !== -1;
    });
}

function committedBattleFor(divisionId) {
    for (var i = 0; i < window.mapBattles.length; i++) {
        if (window.mapBattles[i].ids.indexOf(divisionId) !== -1) {
            return window.mapBattles[i];
        }
    }
    return null;
}

function playerDivisionsIn(provinceId) {
    return divisionsIn(provinceId).filter(function(d) {
        return d.owner === window.mapPlayerFaction;
    });
}

/* Player divisions that are free to receive an order (not committed to a
   queued attack). */
function availablePlayerDivisionsIn(provinceId) {
    return playerDivisionsIn(provinceId).filter(function(d) {
        return !isCommitted(d.id);
    });
}

function hostileDivisionsIn(provinceId, owner) {
    return divisionsIn(provinceId).filter(function(d) {
        return window.mapIsHostile(owner, d.owner);
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

function provinceName(id) {
    var p = window.mapProvinces[id];
    return p ? (p.name || id) : id;
}

function partyName(key) {
    return window.mapPartyNames[key] || key;
}

/* ---------- moves ---------- */

window.mapMovesLeft = function() {
    return Math.max(0, window.mapMovesPerTurn - window.mapMovesUsed);
};

window.mapMoveCost = function(divisionIds) {
    return window.mapMoveCostMode === 'division' ? divisionIds.length : 1;
};

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
            } else if (button.hasAttribute('data-cancel-battle')) {
                window.cancelMapBattle(
                    parseInt(button.getAttribute('data-cancel-battle'), 10)
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

/* Queued attacks (all of them, or only those touching one province),
   each with a Cancel button that refunds its moves. */
function battlesHtml(provinceId) {
    var html = '';
    window.mapBattles.forEach(function(b, index) {
        if (provinceId && b.from !== provinceId && b.to !== provinceId) {
            return;
        }
        html +=
            '<div class="battle-row">' +
            '<div>' + b.ids.length + ' division' +
            (b.ids.length === 1 ? '' : 's') + ' from ' +
            provinceName(b.from) + ' will attack ' + provinceName(b.to) +
            '.</div>' +
            '<button class="map-button" data-cancel-battle="' + index +
            '">Cancel attack</button>' +
            '</div>';
    });
    return html ? '<h3>Queued attacks</h3>' + html : '';
}

function reportHtml() {
    if (!window.mapReport.length) {
        return '';
    }
    var html = '<h3>Last turn\'s battles</h3>';
    window.mapReport.forEach(function(line) {
        html += '<div class="battle-report">' + line + '</div>';
    });
    return html;
}

window.renderMapSidebar = function(provinceId) {
    var sidebar = window.ensureMapSidebar();
    var data = provinceId ? window.mapProvinces[provinceId] : null;
    var movesLeft = window.mapMovesLeft();

    if (!data) {
        sidebar.innerHTML =
            '<h2>Province</h2>' +
            '<div class="map-hint">Click a province to see its details. ' +
            'Click a division icon to select the divisions there, then ' +
            'right-click an adjacent province to move them. Moving into a ' +
            'province held by an enemy army queues an attack.</div>' +
            battlesHtml(null) +
            (mapMessage ? '<div class="map-message">' + mapMessage + '</div>' : '') +
            reportHtml();
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
    var mine = availablePlayerDivisionsIn(provinceId);
    var selected = window.selectedMapDivisions;

    if (!here.length) {
        html += '<div class="map-hint">No divisions stationed here.</div>';
    } else {
        html += '<div class="division-list">';
        var foreign = {};
        var foreignOrder = [];
        here.forEach(function(d) {
            if (d.owner === window.mapPlayerFaction) {
                var battle = committedBattleFor(d.id);
                if (battle) {
                    html += '<div class="division-row committed">' + d.name +
                        ' <span class="division-owner">(attacking ' +
                        provinceName(battle.to) + ')</span></div>';
                } else {
                    html += '<div class="division-row' +
                        (selected.indexOf(d.id) !== -1 ? ' selected' : '') +
                        '">' + d.name + '</div>';
                }
            } else {
                if (!foreign[d.owner]) {
                    foreign[d.owner] = 0;
                    foreignOrder.push(d.owner);
                }
                foreign[d.owner]++;
            }
        });
        foreignOrder.forEach(function(owner) {
            html += '<div class="division-row foreign">' + partyName(owner) +
                ': ' + foreign[owner] + ' division' +
                (foreign[owner] === 1 ? '' : 's') + '</div>';
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
        var cost = window.mapMoveCost(selected);
        var canAfford = movesLeft >= cost;
        html += '<div class="division-move"><div class="province-stat-label">' +
            'Move ' + selected.length + ' division' +
            (selected.length === 1 ? '' : 's') + ' to:</div>';
        getAdjacentProvinces(provinceId).forEach(function(otherId) {
            var hostile = hostileDivisionsIn(otherId, window.mapPlayerFaction).length > 0;
            html += '<button class="map-button' + (hostile ? ' attack' : '') +
                '" data-move-to="' + otherId + '"' +
                (canAfford ? '' : ' disabled title="Not enough moves left"') +
                '>' + (hostile ? 'Attack ' : '') + provinceName(otherId) +
                '</button> ';
        });
        if (!canAfford) {
            /* When a move was just refused, the same text is shown as the
               message at the bottom, so don't repeat it here. */
            if (!mapMessage) {
                html += '<div class="map-warning">' + (movesLeft <= 0 ?
                    'No moves left this turn.' :
                    'Not enough moves left (' + cost + ' needed, ' +
                    movesLeft + ' left).') + '</div>';
            }
        } else {
            html += '<div class="map-hint">Or right-click an adjacent ' +
                'province on the map. If an enemy army is there, an attack ' +
                'is queued and fought at the end of the turn.</div>';
        }
        html += '</div>';
    }

    html += battlesHtml(provinceId);

    if (mapMessage) {
        html += '<div class="map-message">' + mapMessage + '</div>';
    }
    html += reportHtml();
    sidebar.innerHTML = html;
};

/* "Moves left" banner above the map. */
window.renderMapTurnbar = function() {
    var bar = document.getElementById('map-turnbar');
    if (!bar) {
        return;
    }
    var per = window.mapMovesPerTurn;
    var left = window.mapMovesLeft();
    var pips = '';
    for (var i = 0; i < per; i++) {
        pips += '<span class="move-pip' + (i < left ? ' on' : '') + '"></span>';
    }
    var html =
        '<span class="turnbar-label">Moves left: <strong>' + left +
        '</strong> of ' + per + '</span>' +
        '<span class="move-pips">' + pips + '</span>';
    if (left === 0) {
        html += '<span class="turnbar-out">Out of moves. End the turn to continue.</span>';
    }
    if (window.mapBattles.length) {
        html += '<span class="turnbar-attacks">' + window.mapBattles.length +
            ' attack' + (window.mapBattles.length === 1 ? '' : 's') +
            ' queued</span>';
    }
    bar.className = 'map-turnbar' + (left === 0 ? ' out' : '');
    bar.innerHTML = html;
};

/* ---------- selection ---------- */

window.refreshMapUI = function() {
    window.renderMapSidebar(window.selectedMapProvince);
    window.renderMapTurnbar();
    window.renderMapOverlay();
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

/* Set how many of your free divisions in the selected province are
   selected. Selected divisions stay selected; extra ones are added in list
   order, and reducing the number drops the most recently added first. */
window.setMapSelectionCount = function(count) {
    var provinceId = window.selectedMapProvince;
    if (!provinceId) {
        return;
    }
    var mine = availablePlayerDivisionsIn(provinceId);
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
    window.selectedMapDivisions = availablePlayerDivisionsIn(provinceId)
        .map(function(d) { return d.id; });
    mapMessage = '';
    window.refreshMapUI();
};

/* Clicking a division icon: select the province and all your free divisions
   there. Clicking again with everything already selected clears it. */
window.onMapCounterClick = function(provinceId) {
    var mine = availablePlayerDivisionsIn(provinceId);

    if (provinceId !== window.selectedMapProvince) {
        window.showMapProvince(provinceId);
    }
    if (!mine.length) {
        if (playerDivisionsIn(provinceId).length) {
            setMapMessage('Your divisions here are committed to an attack.');
        }
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

/* ---------- moving and attacking ---------- */

function setMapMessage(text) {
    mapMessage = text;
    window.renderMapSidebar(window.selectedMapProvince);
}

/* Queue an attack. Several orders from the same province against the same
   target are merged into one battle (and one arrow). */
window.queueMapAttack = function(ids, fromId, toId, cost) {
    var existing = null;
    window.mapBattles.forEach(function(b) {
        if (b.from === fromId && b.to === toId) {
            existing = b;
        }
    });
    if (existing) {
        ids.forEach(function(id) {
            if (existing.ids.indexOf(id) === -1) {
                existing.ids.push(id);
            }
        });
        existing.cost += cost;
    } else {
        window.mapBattles.push({
            from: fromId,
            to: toId,
            ids: ids.slice(),
            cost: cost
        });
    }
};

window.cancelMapBattle = function(index) {
    var battle = window.mapBattles[index];
    if (!battle) {
        return;
    }
    window.mapMovesUsed = Math.max(0, window.mapMovesUsed - battle.cost);
    window.mapBattles.splice(index, 1);
    window.saveMapState();
    mapMessage = 'Attack on ' + provinceName(battle.to) + ' cancelled. ' +
        battle.cost + ' move' + (battle.cost === 1 ? '' : 's') + ' refunded.';
    window.refreshMapUI();
};

window.tryMoveSelectedDivisions = function(toId) {
    var fromId = window.selectedMapProvince;
    var ids = window.selectedMapDivisions.filter(function(id) {
        return !isCommitted(id);
    });

    if (!fromId || !ids.length || !window.mapProvinces[toId]) {
        return;
    }
    if (toId === fromId) {
        setMapMessage('Those divisions are already in ' +
            provinceName(fromId) + '.');
        return;
    }
    if (!window.areProvincesAdjacent(fromId, toId)) {
        setMapMessage(provinceName(toId) + ' is not adjacent to ' +
            provinceName(fromId) + '.');
        return;
    }

    var cost = window.mapMoveCost(ids);
    var left = window.mapMovesLeft();
    if (left < cost) {
        setMapMessage(left <= 0 ?
            'No moves left this turn.' :
            'Not enough moves left (' + cost + ' needed, ' + left + ' left).');
        return;
    }

    var verdict = window.mapCanMove(ids, fromId, toId);
    if (verdict !== true) {
        setMapMessage(typeof verdict === 'string' ?
            verdict : 'Those divisions cannot move there.');
        return;
    }

    /* A hostile army holds the province: queue a battle instead. */
    var defenders = hostileDivisionsIn(toId, window.mapPlayerFaction);
    if (defenders.length) {
        window.queueMapAttack(ids, fromId, toId, cost);
        window.mapMovesUsed += cost;
        window.selectedMapDivisions = [];
        window.saveMapState();
        mapMessage = 'Attack on ' + provinceName(toId) + ' queued with ' +
            ids.length + ' division' + (ids.length === 1 ? '' : 's') +
            '. It will be fought at the end of the turn.';
        window.refreshMapUI();
        return;
    }

    window.mapDivisions.forEach(function(d) {
        if (ids.indexOf(d.id) !== -1) {
            d.province = toId;
        }
    });
    window.mapMovesUsed += cost;
    window.saveMapState();

    /* The selection follows the divisions to their new province. */
    window.selectedMapDivisions = ids;
    window.showMapProvince(toId, true);
    window.onMapDivisionsMoved(ids, fromId, toId);
};

/* ---------- end of turn ---------- */

function killDivisions(list, count) {
    for (var i = 0; i < count && i < list.length; i++) {
        list[list.length - 1 - i].dead = true;
    }
}

/* Fight every queued battle. Attacks from several provinces on the same
   target are combined into a single battle. Returns the report lines. */
window.resolveMapBattles = function() {
    var report = [];
    var targets = [];
    window.mapBattles.forEach(function(b) {
        if (targets.indexOf(b.to) === -1) {
            targets.push(b.to);
        }
    });

    targets.forEach(function(toId) {
        var group = window.mapBattles.filter(function(b) {
            return b.to === toId;
        });
        var attackers = [];
        var fromIds = [];
        group.forEach(function(b) {
            if (fromIds.indexOf(b.from) === -1) {
                fromIds.push(b.from);
            }
            b.ids.forEach(function(id) {
                var d = mapDivisionIndex[id];
                if (d && !d.dead && attackers.indexOf(d) === -1) {
                    attackers.push(d);
                }
            });
        });
        if (!attackers.length) {
            return;
        }

        var owner = attackers[0].owner;
        var defenders = hostileDivisionsIn(toId, owner);
        var province = window.mapProvinces[toId];
        var name = provinceName(toId);
        var result;

        if (!defenders.length) {
            result = { attackersLost: 0, defendersLost: 0,
                       winner: 'attacker', rounds: 0 };
        } else {
            result = window.mapResolveBattle({
                to: toId,
                from: fromIds,
                attackers: attackers.slice(),
                defenders: defenders.slice()
            });
        }

        var startA = attackers.length;
        var startD = defenders.length;
        killDivisions(attackers, result.attackersLost);
        killDivisions(defenders, result.defendersLost);

        var line = 'Battle for ' + name + ' (from ' +
            fromIds.map(provinceName).join(', ') + '): ' + startA +
            ' attacking, ' + startD + ' defending. ';

        if (result.winner === 'attacker') {
            attackers.forEach(function(d) {
                if (!d.dead) {
                    d.province = toId;
                }
            });
            if (province.controller !== owner) {
                province.controller = owner;
                province.control = window.mapConquestControl;
            }
            line += 'Victory: ' + partyName(owner) + ' took ' + name + '. ' +
                'Lost ' + result.attackersLost + ', destroyed ' +
                result.defendersLost + '.';
        } else if (result.winner === 'none') {
            line += 'Both sides were wiped out. ' + name + ' is empty.';
        } else {
            line += 'The attack failed. Lost ' + result.attackersLost +
                ', destroyed ' + result.defendersLost + '. The survivors ' +
                'fell back.';
        }
        report.push(line);
    });

    window.mapBattles = [];
    window.mapReport = report;
    return report;
};

/* Call this from the post_turn scene. Resolves all queued battles, then
   resets the move counter for the new turn. */
window.mapPostTurn = function() {
    window.loadMapState();
    var report = window.resolveMapBattles();
    window.mapMovesUsed = 0;
    window.saveMapState();
    if (mapIsOpen()) {
        window.renderGameMap();
        window.refreshMapUI();
    }
    return report;
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

    var bar = document.createElement('div');
    bar.id = 'map-turnbar';
    bar.className = 'map-turnbar';
    container.appendChild(bar);

    var layout = document.createElement('div');
    layout.className = 'map-layout';
    var frame = document.createElement('div');
    frame.className = 'map-frame';
    layout.appendChild(frame);
    container.appendChild(layout);

    window.renderMapSidebar(null);
    window.renderMapTurnbar();
    return frame;
};

/* Centre of a province in the root SVG's coordinates (or its `label`
   override). Cached, because measuring big paths is slow. */
function getProvinceCenter(provinceId) {
    if (mapCenterCache[provinceId]) {
        return mapCenterCache[provinceId];
    }
    var data = window.mapProvinces[provinceId];
    var svg = getMapSvg();
    var province = getMapElement(provinceId);
    if (!data || !svg || !province) {
        return null;
    }
    var center = null;
    if (data.label) {
        center = [data.label[0], data.label[1]];
    } else {
        try {
            var bbox = province.getBBox();
            var localCenter = new DOMPoint(
                bbox.x + bbox.width / 2,
                bbox.y + bbox.height / 2
            );
            var provinceMatrix = province.getScreenCTM();
            var svgMatrix = svg.getScreenCTM();
            if (provinceMatrix && svgMatrix) {
                var p = localCenter
                    .matrixTransform(provinceMatrix)
                    .matrixTransform(svgMatrix.inverse());
                center = [p.x, p.y];
            }
        } catch (e) {
            center = null;
        }
    }
    if (center) {
        mapCenterCache[provinceId] = center;
    }
    return center;
}

var SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(name, attrs, cls) {
    var el = document.createElementNS(SVG_NS, name);
    if (cls) {
        el.setAttribute('class', cls);
    }
    Object.keys(attrs || {}).forEach(function(k) {
        el.setAttribute(k, attrs[k]);
    });
    return el;
}

/* Red arrows from the attacking province to the province being attacked. */
function drawBattleArrows(parent) {
    if (!window.mapBattles.length) {
        return;
    }
    var layer = svgEl('g', {}, 'map-battle-arrows');

    window.mapBattles.forEach(function(b) {
        var A = getProvinceCenter(b.from);
        var B = getProvinceCenter(b.to);
        if (!A || !B) {
            return;
        }
        var dx = B[0] - A[0];
        var dy = B[1] - A[1];
        var len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) {
            return;
        }
        var ux = dx / len;
        var uy = dy / len;
        var gap = COUNTER_RADIUS + 8;

        var avail = Math.max(20, len - 2 * gap);
        var headLen = Math.min(70, avail * 0.6);
        var headW = 56;

        var sx = A[0] + ux * gap;
        var sy = A[1] + uy * gap;
        var tipX = sx + ux * avail;
        var tipY = sy + uy * avail;
        var baseX = tipX - ux * headLen;
        var baseY = tipY - uy * headLen;
        var px = -uy * headW / 2;
        var py = ux * headW / 2;

        layer.appendChild(svgEl('line', {
            x1: sx, y1: sy, x2: baseX, y2: baseY
        }, 'map-arrow-halo'));
        layer.appendChild(svgEl('line', {
            x1: sx, y1: sy, x2: baseX, y2: baseY
        }, 'map-arrow-line'));
        layer.appendChild(svgEl('polygon', {
            points: tipX + ',' + tipY + ' ' +
                (baseX + px) + ',' + (baseY + py) + ' ' +
                (baseX - px) + ',' + (baseY - py)
        }, 'map-arrow-head'));

        /* Number of attacking divisions, on the shaft. */
        var shaft = avail - headLen;
        if (shaft > 80) {
            var mx = sx + ux * shaft * 0.5;
            var my = sy + uy * shaft * 0.5;
            var badge = svgEl('g', {}, 'map-arrow-badge');
            badge.appendChild(svgEl('circle', { cx: mx, cy: my, r: 28 }));
            var label = svgEl('text', {
                x: mx, y: my,
                'text-anchor': 'middle',
                'dominant-baseline': 'central'
            });
            label.style.fontSize = '32px';
            label.textContent = b.ids.length;
            badge.appendChild(label);
            layer.appendChild(badge);
        }
    });
    parent.appendChild(layer);
}

/* Everything drawn on top of the provinces: attack arrows, then one icon
   per province that has divisions stationed in it. */
window.renderMapOverlay = function() {
    var svg = getMapSvg();
    if (!svg || !mapIsOpen()) {
        return;
    }

    var old = document.getElementById('map-overlay');
    if (old) {
        old.remove();
    }
    var overlay = svgEl('g', { id: 'map-overlay' });

    drawBattleArrows(overlay);

    Object.keys(window.mapProvinces).forEach(function(provinceId) {
        var here = divisionsIn(provinceId);
        if (!here.length) {
            return;
        }
        var center = getProvinceCenter(provinceId);
        if (!center) {
            return;
        }
        var x = center[0];
        var y = center[1];

        var hasSelected = here.some(function(d) {
            return window.selectedMapDivisions.indexOf(d.id) !== -1;
        });
        var group = svgEl('g', { 'data-province': provinceId },
            'map-division-counter' + (hasSelected ? ' map-counter-selected' : ''));

        var circle = svgEl('circle', { cx: x, cy: y, r: COUNTER_RADIUS });
        circle.style.stroke = window.getMapPartyColor(here[0].owner);
        group.appendChild(circle);

        var text = svgEl('text', {
            x: x, y: y,
            'text-anchor': 'middle',
            'dominant-baseline': 'central'
        });
        text.style.fontSize = '30px';
        text.textContent = here.length;
        group.appendChild(text);

        overlay.appendChild(group);
    });

    svg.appendChild(overlay);
};

/* Colour the provinces, then draw the overlay. */
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

    window.renderMapOverlay();
};

window.loadGameMap = function() {
    window.loadMapState();
    var frame = window.createMapLayout();
    if (!frame) {
        return;
    }

    var draw = function(svgText) {
        frame.innerHTML = svgText;
        mapCenterCache = {};
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
