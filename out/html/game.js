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

// settings
window.mapPlayerFaction = 'bolsheviks';

window.mapMovesPerTurn = 10;

window.mapMoveCostMode = 'order';

window.mapConquestControl = 50;

window.mapBattleSettings = {
    attackKill: 0.35,
    defendKill: 0.40,
    maxRounds: 12
};

// provinces
window.mapProvinces = {
    finland: {
        name: 'Finland',
        controller: 'finland',
        control: 100,
        adjacent: ['petrograd', 'arkhangelsk', 'karelia', 'murmansk']
    },
    volhynia: {
        name: 'Volhynia',
        controller: 'bolsheviks',
        control: 80,
        adjacent: ['podolia', 'kyiv', 'minsk', 'poland', 'grodno']
    },
    bessarabia: {
        name: 'Bessarabia',
        controller: 'bolsheviks',
        control: 80,
        adjacent: ['podolia', 'kherson']
    },
    podolia: {
        name: 'Podolia',
        controller: 'bolsheviks',
        control: 80,
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
        controller: 'bolsheviks',
        control: 80,
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
        controller: 'bolsheviks',
        control: 80,
        adjacent: ['chernigov', 'tver', 'kaluga', 'moscow', 'mogilev', 'vitebsk', 'orel', 'pskov']
    },
    tver: {
        name: 'Tver',
        controller: 'bolsheviks',
        control: 80,
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
        controller: 'bolsheviks',
        control: 80,
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
        control: 50,
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
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['chernigov', 'smolensk', 'vitebsk', 'minsk']
    },
    tula: {
        name: 'Tula',
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['kaluga', 'moscow', 'orel', 'tambov', 'ryazan']
    },
    vitebsk: {
        name: 'Vitebsk',
        controller: 'bolsheviks',
        control: 80,
        adjacent: ['smolensk', 'mogilev', 'pskov', 'latvia', 'vilna', 'minsk']
    },
    orel: {
        name: 'Orel',
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['chernigov', 'smolensk', 'kaluga', 'tula', 'kursk', 'voronezh', 'tambov']
    },
    kursk: {
        name: 'Kursk',
        controller: 'bolsheviks',
        control: 70,
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
        controller: 'bolsheviks',
        control: 80,
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
        controller: 'bolsheviks',
        control: 70,
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
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['tver', 'moscow', 'yaroslavl', 'tambov', 'ryazan', 'kostroma', 'nizhny']
    },
    don: {
        name: 'Don Host',
        controller: 'don',
        control: 70,
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
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['moscow', 'tula', 'vladimir', 'tambov']
    },
    kostroma: {
        name: 'Kostroma',
        controller: 'bolsheviks',
        control: 60,
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
        controller: 'bolsheviks',
        control: 70,
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
        controller: 'bolsheviks',
        control: 60,
        adjacent: ['vologda', 'kostroma', 'nizhny', 'kazan', 'ufa', 'perm']
    },
    kazan: {
        name: 'Kazan',
        controller: 'bolsheviks',
        control: 50,
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
        controller: 'bolsheviks',
        control: 50,
        adjacent: ['samara', 'vyatka', 'kazan', 'yekaterinburg', 'orenburg', 'perm']
    },
    olonets: {
        name: 'Olonets',
        controller: 'bolsheviks',
        control: 80,
        adjacent: ['petrograd', 'novgorod', 'arkhangelsk', 'vologda', 'karelia']
    },
    yekaterinburg: {
        name: 'Yekaterinburg',
        controller: 'bolsheviks',
        control: 80,
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
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['petrograd', 'pskov', 'latvia']
    },
    latvia: {
        name: 'Latvia',
        controller: 'germany',
        control: 70,
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
        controller: 'bolsheviks',
        control: 80,
        adjacent: ['vitebsk', 'latvia', 'lithuania', 'minsk', 'poland', 'grodno']
    },
    minsk: {
        name: 'Minsk',
        controller: 'bolsheviks',
        control: 80,
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
        controller: 'bolsheviks',
        control: 80,
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
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['finland', 'arkhangelsk', 'olonets', 'murmansk']
    },
    murmansk: {
        name: 'Murmansk',
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['finland', 'karelia']
    },
    perm: {
        name: 'Perm',
        controller: 'bolsheviks',
        control: 70,
        adjacent: ['vologda', 'vyatka', 'ufa', 'yekaterinburg', 'tobolsk']
    }
};

// factions
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
    upr: '--usr',
    finland: '#4f8fc0',
    don: '--cossack',
    greens: '#1f9d6b',
    whites: '#d9d3bf',
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
    upr: 'Ukrainian People\'s Republic',
    finland: 'Finland',
    don: 'Don Cossacks',
    greens: 'Greens',
    whites: 'White Army',
    none: 'Uncontrolled'
};

// sidebar fields
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
    },
    {
        label: 'Devastation',
        value: function(d) {
            return d.devastation + '%';
        }
    },
    {
        label: 'Supply limit',
        value: function(d) {
            var n = window.mapSupplyLimit(d.id);
            return (Math.round(n * 10) / 10) + ' divisions';
        }
    }
];

Object.keys(window.mapProvinces).forEach(function(id) {
    var p = window.mapProvinces[id];
    p.id = id;
    p.startController = p.controller;
    p.startControl = p.control;
    p.devastation = 0;
});

['podolia', 'bessarabia', 'kyiv', 'kherson', 'poltava', 'chernigov',
 'kharkov', 'yekaterinoslav', 'taurida', 'crimea'].forEach(function(id) {
    var p = window.mapProvinces[id];
    var v = { kyiv: 100, kharkov: 70, taurida: 70, yekaterinoslav: 60 }[id] || 80;
    p.controller = 'upr';
    p.control = v;
    p.startController = 'upr';
    p.startControl = v;
});

window.mapUrbanSupply = 150;
window.mapRuralSupply = 50;
window.mapUrbanProvinces = ['petrograd', 'moscow', 'kyiv', 'kharkov',
    'yekaterinoslav', 'poland', 'latvia', 'tver', 'vladimir', 'yaroslavl',
    'nizhny', 'tula', 'kherson', 'saratov'];

window.mapBattleDevastation = 5;
window.mapDevastationDecay = 1;


// demographics and soviets
window.mapClassOrder = ['elites', 'middle', 'clergy', 'workers', 'peasants',
    'kulaks', 'soldiers', 'intelligentsia', 'underclass', 'students'];

window.mapDemographics = {
    finland: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    volhynia: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    bessarabia: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    podolia: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    petrograd: { pop: 5, soviet_power: 90,
        classes: { elites: 4, middle: 15, clergy: 0.5, workers: 30, peasants: 4, kulaks: 0.5, soldiers: 20, intelligentsia: 6, underclass: 17, students: 3 } },
    novgorod: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    chernigov: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    smolensk: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    tver: { pop: 2, soviet_power: 45,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    yekaterinoslav: { pop: 2, soviet_power: 45,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    kaluga: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kharkov: { pop: 2, soviet_power: 45,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    moscow: { pop: 5, soviet_power: 85,
        classes: { elites: 4, middle: 15, clergy: 0.5, workers: 30, peasants: 4, kulaks: 0.5, soldiers: 20, intelligentsia: 6, underclass: 17, students: 3 } },
    kyiv: { pop: 2, soviet_power: 40,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    mogilev: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    tula: { pop: 2, soviet_power: 40,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    vitebsk: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    orel: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kursk: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kherson: { pop: 2, soviet_power: 35,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    pskov: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    poltava: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    arkhangelsk: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    crimea: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kuban: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    yaroslavl: { pop: 2, soviet_power: 40,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    voronezh: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    vladimir: { pop: 2, soviet_power: 45,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    don: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    vologda: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    tambov: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    ryazan: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kostroma: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    georgia: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    stavropol: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kars: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    nizhny: { pop: 2, soviet_power: 45,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    terek: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    saratov: { pop: 2, soviet_power: 40,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    penza: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    armenia: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    astrakhan: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    azerbaijan: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    simbirsk: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    dagestan: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    samara: { pop: 2, soviet_power: 35,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    vyatka: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kazan: { pop: 2, soviet_power: 35,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    uralsk: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    transcaspian: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    ufa: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    olonets: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    yekaterinburg: { pop: 2, soviet_power: 40,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    orenburg: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    turgai: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    khiva: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    syr_darya: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    tobolsk: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    bukhara: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    akmolinsk: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    samarkhand: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    ferghana: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    semipalatinsk: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    siberia: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    semirechye: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    tomsk: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    estonia: { pop: 2, soviet_power: 10,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    latvia: { pop: 2, soviet_power: 45,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    lithuania: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    vilna: { pop: 2, soviet_power: 10,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    minsk: { pop: 2, soviet_power: 40,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    poland: { pop: 2, soviet_power: 10,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    grodno: { pop: 1, soviet_power: 20,
        classes: { elites: 1, middle: 3, clergy: 0.5, workers: 2, peasants: 62, kulaks: 4, soldiers: 20, intelligentsia: 1, underclass: 3, students: 0.2 } },
    taurida: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    karelia: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    murmansk: { pop: 0.4, soviet_power: 3,
        classes: { elites: 0.5, middle: 2, clergy: 0.4, workers: 1, peasants: 85, kulaks: 5, soldiers: 3, intelligentsia: 0.5, underclass: 2.5, students: 0.1 } },
    perm: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } }
};

Object.keys(window.mapProvinces).forEach(function(id) {
    var p = window.mapProvinces[id];
    var d = window.mapDemographics[id];
    p.pop = d.pop;
    p.classes = JSON.parse(JSON.stringify(d.classes));
    p.soviet_power = d.soviet_power;
    p.election_control = d.election_control || 0;
    p.startDemo = demoSnapshot(p);
});

function demoSnapshot(p) {
    return JSON.stringify({ pop: p.pop, classes: p.classes,
        soviet_power: p.soviet_power, election_control: p.election_control });
}

window.mapSupplyLimit = function(id) {
    var p = window.mapProvinces[id];
    if (!p) {
        return 0;
    }
    var base = typeof p.supply === 'number' ? p.supply :
        (window.mapUrbanProvinces.indexOf(id) !== -1 ?
            window.mapUrbanSupply : window.mapRuralSupply);
    return base * (1 - 0.5 * (p.devastation || 0) / 100);
};

// divisions
function makeDivisions(province, owner, count, label, firstNumber) {
    var out = [];
    var base = label || (window.mapProvinces[province].name + ' Division');
    var n0 = firstNumber || 1;
    for (var i = 0; i < count; i++) {
        out.push({
            id: province + '_' + owner + '_' + (i + 1),
            name: base + ' ' + (n0 + i),
            owner: owner,
            startOwner: owner,
            province: province,
            start: province,
            dead: false
        });
    }
    return out;
}

window.mapDivisions = [].concat(
    makeDivisions('pskov', 'bolsheviks', 50),
    makeDivisions('vitebsk', 'bolsheviks', 75),

    makeDivisions('estonia', 'bolsheviks', 50),

    makeDivisions('vilna', 'bolsheviks', 90),
    makeDivisions('grodno', 'bolsheviks', 80),

    makeDivisions('volhynia', 'bolsheviks', 100),

    makeDivisions('podolia', 'upr', 75),
    makeDivisions('bessarabia', 'upr', 75),
    makeDivisions('kyiv', 'upr', 25),

    makeDivisions('petrograd', 'bolsheviks', 30),
    makeDivisions('yekaterinburg', 'bolsheviks', 15),
    makeDivisions('nizhny', 'bolsheviks', 10),
    makeDivisions('kazan', 'bolsheviks', 10),
    makeDivisions('saratov', 'bolsheviks', 10),
    makeDivisions('mogilev', 'bolsheviks', 20),
    makeDivisions('minsk', 'bolsheviks', 20),
    makeDivisions('kursk', 'bolsheviks', 10),

    makeDivisions('poland', 'germany', 125, 'German Division', 1),
    makeDivisions('lithuania', 'germany', 100, 'German Division', 126),
    makeDivisions('latvia', 'germany', 90, 'German Division', 226),

    makeDivisions('don', 'don', 10)
);

var mapDivisionIndex = {};
window.mapDivisions.forEach(function(d) {
    mapDivisionIndex[d.id] = d;
});

window.mapCanMove = function(divisionIds, fromId, toId) {
    return true;
};

window.mapIsHostile = function(attacker, defender) {
    return window.mapAtWar(attacker, defender);
};

// war and peace
window.mapDefaultPeace = [
    ['bolsheviks', 'finland'],
    ['bolsheviks', 'upr'],
    ['germany', 'finland']
];
window.mapWarOverrides = {};

function warKey(a, b) {
    return a < b ? a + '|' + b : b + '|' + a;
}

window.mapAtWar = function(a, b) {
    if (a === b || a === 'none' || b === 'none') {
        return false;
    }
    var key = warKey(a, b);
    if (Object.prototype.hasOwnProperty.call(window.mapWarOverrides, key)) {
        return window.mapWarOverrides[key];
    }
    return !window.mapDefaultPeace.some(function(pair) {
        return warKey(pair[0], pair[1]) === key;
    });
};

// combat
window.mapSoldiersPerDivision = 3000;

window.mapSoldierUnit = 1000;

window.mapCasualtyRate = 0.12;

window.mapFactionStats = {
    germany: { morale: 1, discipline: 1.2, supply_quality: 1, defense_bonus: 0 },
    _default: { morale: 1, discipline: 1, supply_quality: 1, defense_bonus: 0 }
};

function mapQ() {
    try {
        return window.dendryUI.dendryEngine.state.qualities;
    } catch (e) {
        return null;
    }
}

function mapGauss() {
    var u = 1 - Math.random();
    var v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

var MAP_STATS = ['morale', 'discipline', 'supply_quality', 'defense_bonus'];
window.mapStatOverrides = {};

window.mapStatsFor = function(owner, provinceId) {
    var Q = mapQ();
    var base;
    if (owner === window.mapPlayerFaction && Q) {
        base = { morale: Q.morale || 1, discipline: Q.discipline || 1,
                 supply_quality: Q.supply_quality || 1,
                 defense_bonus: Q.defense_bonus || 0 };
    } else {
        var f = window.mapFactionStats[owner] || window.mapFactionStats._default;
        var ov = window.mapStatOverrides[owner] || {};
        base = {};
        MAP_STATS.forEach(function(k) {
            base[k] = typeof ov[k] === 'number' ? ov[k] : f[k];
        });
    }
    var p = window.mapProvinces[provinceId] || {};
    ['morale', 'discipline', 'supply_quality', 'defense_bonus'].forEach(function(k) {
        if (typeof p[k] === 'number') {
            base[k] = p[k];
        }
    });
    return base;
};

function mapAttackPower(soldiers, st) {
    return soldiers * st.morale * st.discipline * Math.pow(st.supply_quality, 1.5);
}
function mapDefensePower(soldiers, st) {
    return soldiers * st.morale * st.morale * Math.pow(st.supply_quality, 1.5) *
        (1 + st.defense_bonus / 2);
}

window.mapStrengthRatio = function(attackers, defenders, toId) {
    var N = window.mapSoldiersPerDivision / window.mapSoldierUnit;
    if (!defenders.length) {
        return 99;
    }
    var aSt = window.mapStatsFor(attackers[0].owner, toId);
    var dSt = window.mapStatsFor(defenders[0].owner, toId);
    return mapAttackPower(attackers.length * N, aSt) /
        Math.max(1, mapDefensePower(defenders.length * N, dSt));
};

window.mapResolveBattle = function(battle) {
    var s = window.mapBattleSettings;
    var Q = mapQ();
    var player = window.mapPlayerFaction;
    var atkOwner = battle.attackers[0] && battle.attackers[0].owner;
    var defOwner = battle.defenders[0] && battle.defenders[0].owner;
    var playerAttacks = atkOwner === player;
    var playerDefends = defOwner === player;

    if (Q && (playerAttacks || playerDefends)) {
        var N = window.mapSoldiersPerDivision / window.mapSoldierUnit;
        var aSold = battle.attackers.length * N;
        var dSold = battle.defenders.length * N;
        var aPow = mapAttackPower(aSold, window.mapStatsFor(atkOwner, battle.to));
        var dPow = mapDefensePower(dSold, window.mapStatsFor(defOwner, battle.to));

        function lossFrac(ownPow, enemyPow) {
            var f = window.mapCasualtyRate *
                Math.sqrt(enemyPow / Math.max(1, ownPow)) + 0.02 * mapGauss();
            return Math.min(0.4, Math.max(0.02, f));
        }
        function lossCount(n, frac) {
            var x = n * frac;
            return Math.min(n, Math.floor(x) + (Math.random() < x - Math.floor(x) ? 1 : 0));
        }
        var aFrac = lossFrac(aPow, dPow);
        var dFrac = lossFrac(dPow, aPow);
        var aCas = Math.round(aFrac * aSold);
        var dCas = Math.round(dFrac * dSold);
        var ratio = aPow / Math.max(1, dPow);

        var pr = playerAttacks ? ratio : 1 / Math.max(ratio, 1e-6);
        var t = playerAttacks ? [1.25, 1, 0.5] : [1.5, 1, 0.75];

        var outcome = pr >= t[0] ? 3 : pr >= t[1] ? 2 : pr >= t[2] ? 1 : 0;
        var playerWon = outcome >= 2;
        var friendly = playerAttacks ? aCas : dCas;
        var hostile = playerAttacks ? dCas : aCas;
        var attackerWins = playerAttacks ? playerWon : !playerWon;

        var aLost = lossCount(battle.attackers.length, aFrac);
        var dLost = lossCount(battle.defenders.length, dFrac);

        var prov = window.mapProvinces[battle.to] || {};
        Q.attacking = playerAttacks ? 1 : 0;
        Q.in_defensive_battle = playerAttacks ? 0 : 1;
        Q.friendly_casualties = friendly;
        Q.hostile_casualties = hostile;
        Q.battle_outcome = outcome;
        Q.battle_count = (Q.battle_count || 0) + 1;
        Q.war_weariness = (Q.war_weariness || 0) + friendly / 1000;
        if (playerWon) {
            Q.victory_count = (Q.victory_count || 0) + 1;
        } else {
            Q.defeat_count = (Q.defeat_count || 0) + 1;
        }
        if (prov.front) {
            Q[prov.front + '_progress'] =
                (Q[prov.front + '_progress'] || 0) + (playerWon ? 1 : -1);
        }
        return { attackersLost: aLost, defendersLost: dLost,
                 winner: attackerWins ? 'attacker' : 'defender', rounds: 1 };
    }

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

// NPC orders
window.mapAIAttackRatio = 1.5;

function isEnemyGround(id, faction) {
    var p = window.mapProvinces[id];
    if (p && p.controller !== 'none' && window.mapIsHostile(faction, p.controller)) {
        return true;
    }
    return hostileDivisionsIn(id, faction).length > 0;
}

function enemyDistances(faction) {
    var dist = {};
    var queue = [];
    window.mapDivisions.forEach(function(d) {
        if (!d.dead && window.mapIsHostile(faction, d.owner) &&
            dist[d.province] === undefined) {
            dist[d.province] = 0;
            queue.push(d.province);
        }
    });
    while (queue.length) {
        var cur = queue.shift();
        getAdjacentProvinces(cur).forEach(function(n) {
            if (dist[n] === undefined) {
                dist[n] = dist[cur] + 1;
                queue.push(n);
            }
        });
    }
    return dist;
}

window.mapNpcTurn = function(faction) {
    return editMapState(function() {
        var done = [];
        var attacking = {};

        var seen = {};
        window.mapDivisions.forEach(function(d0) {
            if (d0.dead || d0.owner !== faction || seen[d0.province]) {
                return;
            }
            var from = d0.province;
            seen[from] = true;
            var mine = divisionsIn(from).filter(function(d) {
                return d.owner === faction && !isCommitted(d.id);
            });
            if (!mine.length) {
                return;
            }
            var best = null;
            getAdjacentProvinces(from).forEach(function(to) {
                var p = window.mapProvinces[to];
                var defenders = hostileDivisionsIn(to, faction);
                if (!defenders.length) {
                    if (!p || p.controller === faction) {
                        return;
                    }
                    if (p.controller !== 'none' &&
                        !window.mapIsHostile(faction, p.controller)) {
                        return;
                    }
                }
                var r = window.mapStrengthRatio(mine, defenders, to);
                if (r >= window.mapAIAttackRatio &&
                    (!best || r > best.r || (r === best.r && Math.random() < 0.5))) {
                    best = { to: to, r: r };
                }
            });
            if (best) {
                window.queueMapAttack(mine.map(function(d) { return d.id; }),
                                      from, best.to, 0);
                attacking[from] = true;
                done.push(partyName(faction) + ': ' + provinceName(from) +
                    ' attacks ' + provinceName(best.to));
            }
        });

        var dist = enemyDistances(faction);
        var moved = {};
        var incoming = {};
        var sources = Object.keys(window.mapProvinces).filter(function(id) {
            return window.mapProvinces[id].controller === faction &&
                dist[id] !== undefined;
        }).sort(function(x, y) {
            return dist[y] - dist[x];
        });
        sources.forEach(function(from) {
            var mine = divisionsIn(from).filter(function(d) {
                return d.owner === faction && !isCommitted(d.id) && !moved[d.id];
            });
            if (!mine.length) {
                return;
            }
            var keep = dist[from] <= 1 ? Math.ceil(mine.length / 2) : 1;
            var movable = mine.length - keep;
            if (movable <= 0) {
                return;
            }
            var best = null;
            getAdjacentProvinces(from).forEach(function(to) {
                var q = window.mapProvinces[to];
                if (!q || q.controller !== faction || dist[to] === undefined ||
                    dist[to] >= dist[from]) {
                    return;
                }
                var there = divisionsIn(to).filter(function(d) {
                    return d.owner === faction;
                }).length + (incoming[to] || 0);
                var room = Math.floor(window.mapSupplyLimit(to) - there);
                if (room <= 0) {
                    return;
                }
                if (!best || dist[to] < best.dist ||
                    (dist[to] === best.dist && room > best.room)) {
                    best = { to: to, dist: dist[to], room: room };
                }
            });
            if (best) {
                var n = Math.min(movable, best.room);
                mine.slice(0, n).forEach(function(d) {
                    d.province = best.to;
                    moved[d.id] = true;
                });
                incoming[best.to] = (incoming[best.to] || 0) + n;
                done.push(partyName(faction) + ': ' + n + ' reinforce ' +
                    provinceName(best.to) + ' from ' + provinceName(from));
            }
        });
        return done;
    });
};

window.onMapDivisionsMoved = function(divisionIds, fromId, toId) {
};

window.selectedMapProvince = null;
window.selectedMapDivisions = [];
window.mapMovesUsed = 0;
window.mapBattles = [];
window.mapReport = [];

var MAP_SHAPES = 'path, polygon, polyline, rect, circle, ellipse';
var hoveredMapProvince = null;
var mapSvgText = null;
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

// persistence
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
            p.control !== p.startControl || p.devastation) {
            control[id] = [p.controller, p.control, p.devastation || 0];
        }
    });
    q.map_extra = JSON.stringify(window.mapDivisions.filter(function(d) {
        return d.extra;
    }).map(function(d) {
        return { id: d.id, name: d.name, owner: d.owner, start: d.start };
    }));
    var owners = {};
    window.mapDivisions.forEach(function(d) {
        if (!d.dead && d.owner !== (d.startOwner || d.owner)) {
            owners[d.id] = d.owner;
        }
    });
    q.map_owners = JSON.stringify(owners);
    q.map_wars = JSON.stringify(window.mapWarOverrides);
    q.map_stats = JSON.stringify(window.mapStatOverrides);
    q.map_divisions = JSON.stringify(positions);
    var demo = {};
    Object.keys(window.mapProvinces).forEach(function(id) {
        var p = window.mapProvinces[id];
        if (demoSnapshot(p) !== p.startDemo) {
            demo[id] = { pop: p.pop, classes: p.classes,
                soviet_power: p.soviet_power, election_control: p.election_control };
        }
    });
    q.map_demo = JSON.stringify(demo);
    q.map_control = JSON.stringify(control);
    q.map_battles = JSON.stringify(window.mapBattles);
    q.map_report = JSON.stringify(window.mapReport);
    q.map_moves_used = window.mapMovesUsed;
    syncMapQualities(q);
};

function syncMapQualities(q) {
    var heldTotal = 0;
    var myTotal = 0;
    Object.keys(window.mapProvinces).forEach(function(id) {
        var p = window.mapProvinces[id];
        var here = divisionsIn(id);
        var mine = here.filter(function(d) {
            return d.owner === window.mapPlayerFaction;
        }).length;
        var held = p.controller === window.mapPlayerFaction ? 1 : 0;
        q['map_held_' + id] = held;
        q['map_control_' + id] = p.controller === 'none' ? 0 : p.control;
        q['map_devast_' + id] = p.devastation || 0;
        q['map_supply_' + id] = Math.round(window.mapSupplyLimit(id) * 10) / 10;
        q['map_pop_' + id] = p.pop;
        q['map_sovpower_' + id] = p.soviet_power;
        q['map_elecctl_' + id] = p.election_control;
        q['map_div_' + id] = here.length;
        q['map_mydiv_' + id] = mine;
        heldTotal += held;
        myTotal += mine;
    });
    Object.keys(window.mapPartyNames).forEach(function(f) {
        if (f !== 'none' && f !== window.mapPlayerFaction) {
            q['map_war_' + f] = window.mapAtWar(window.mapPlayerFaction, f) ? 1 : 0;
        }
    });
    Object.keys(window.mapPartyNames).forEach(function(f) {
        if (f !== 'none' && f !== window.mapPlayerFaction) {
            MAP_STATS.forEach(function(k) {
                q['map_' + k + '_' + f] = window.mapStatsFor(f, null)[k];
            });
        }
    });
    q.map_held_total = heldTotal;
    q.map_mydiv_total = myTotal;
}

window.mapInit = function() {
    window.loadMapState();
    window.saveMapState();
};

window.loadMapState = function() {
    var q = engineQualities() || {};

    window.mapDivisions = window.mapDivisions.filter(function(d) {
        if (d.extra) {
            delete mapDivisionIndex[d.id];
            return false;
        }
        return true;
    });
    var extras = readJson(q.map_extra, []);
    (Array.isArray(extras) ? extras : []).forEach(function(e) {
        var d = {
            id: e.id, name: e.name, owner: e.owner,
            province: e.start, start: e.start, dead: false, extra: true,
            startOwner: e.owner
        };
        window.mapDivisions.push(d);
        mapDivisionIndex[d.id] = d;
    });

    var owners = readJson(q.map_owners, {});
    window.mapDivisions.forEach(function(d) {
        if (d.startOwner === undefined) {
            d.startOwner = d.owner;
        }
        d.owner = owners[d.id] || d.startOwner;
    });

    var stats = readJson(q.map_stats, {});
    window.mapStatOverrides = stats && typeof stats === 'object' ? stats : {};

    var wars = readJson(q.map_wars, {});
    window.mapWarOverrides = wars && typeof wars === 'object' ? wars : {};

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
        p.devastation = saved && saved[2] ? saved[2] : 0;
    });

    var demo = readJson(q.map_demo, {});
    Object.keys(window.mapProvinces).forEach(function(id) {
        var p = window.mapProvinces[id];
        var d = demo[id] || JSON.parse(p.startDemo);
        p.pop = d.pop;
        p.classes = d.classes;
        p.soviet_power = d.soviet_power;
        p.election_control = d.election_control;
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

// queries
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

function availablePlayerDivisionsIn(provinceId) {
    return playerDivisionsIn(provinceId).filter(function(d) {
        return !isCommitted(d.id);
    });
}

function mapBorderClosed(owner, provinceId) {
    var p = window.mapProvinces[provinceId];
    if (p && p.controller !== 'none' && p.controller !== owner &&
        !window.mapAtWar(owner, p.controller)) {
        return p.controller;
    }
    return false;
}

function isAttackTarget(provinceId, owner) {
    if (hostileDivisionsIn(provinceId, owner).length) {
        return true;
    }
    var p = window.mapProvinces[provinceId];
    return !!p && p.controller !== 'none' && p.controller !== owner &&
        window.mapIsHostile(owner, p.controller);
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

// moves
window.mapMovesLeft = function() {
    return Math.max(0, window.mapMovesPerTurn - window.mapMovesUsed);
};

window.mapMoveCost = function(divisionIds) {
    return window.mapMoveCostMode === 'division' ? divisionIds.length : 1;
};

window.getMapPartyColor = function(controller) {
    var variable = window.mapPartyColors[controller];
    if (!variable) {
        return '#999';
    }
    if (variable.charAt(0) !== '-') {
        return variable;
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

function getMapSvg() {
    return document.querySelector('#map-container .map-frame svg');
}

function getMapElement(id) {

    var svg = getMapSvg();
    var el = document.getElementById(id);
    return (svg && el && svg.contains(el)) ? el : null;
}

function mapIsOpen() {
    var container = document.getElementById('map-container');
    return !!(container && container.classList.contains('active'));
}

function getMapShapes(el) {
    if (el.matches(MAP_SHAPES)) {
        return [el];
    }
    return Array.prototype.slice.call(el.querySelectorAll(MAP_SHAPES));
}

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

window.ensureMapSidebar = function() {
    var sidebar = document.getElementById('map-sidebar');
    if (!sidebar) {

        var column = document.createElement('div');
        column.id = 'map-right';

        var bar = document.createElement('div');
        bar.id = 'map-turnbar';
        bar.className = 'tools map-turnbar';
        column.appendChild(bar);

        sidebar = document.createElement('div');
        sidebar.id = 'map-sidebar';
        sidebar.className = 'tools right';
        column.appendChild(sidebar);

        var content = document.getElementById('content');
        content.parentNode.insertBefore(column, content);

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

function battleOwner(b) {
    for (var i = 0; i < b.ids.length; i++) {
        var d = mapDivisionIndex[b.ids[i]];
        if (d) {
            return d.owner;
        }
    }
    return null;
}

function battlesHtml(provinceId) {
    var html = '';
    window.mapBattles.forEach(function(b, index) {
        if (provinceId && b.from !== provinceId && b.to !== provinceId) {
            return;
        }
        html +=
            '<div class="battle-row">' +
            '<div>' + (battleOwner(b) === window.mapPlayerFaction ? '' :
                partyName(battleOwner(b)) + ': ') + b.ids.length + ' division' +
            (b.ids.length === 1 ? '' : 's') + ' from ' +
            provinceName(b.from) + ' will attack ' + provinceName(b.to) +
            '.</div>' +
            (battleOwner(b) === window.mapPlayerFaction ?
                '<button class="map-button" data-cancel-battle="' + index +
                '">Cancel attack</button>' : '') +
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
                '<span class="province-stat-label">' + field.label + '</span>' +
                '<span class="province-stat-dash">  \u2014  </span>' +
                '<span class="province-stat-value">' + value + '</span>' +
            '</div>';
    });

    var here = divisionsIn(provinceId);
    var mine = availablePlayerDivisionsIn(provinceId);
    var selected = window.selectedMapDivisions;

    html += '<h3>Divisions \u2013 ' + here.length + '</h3>';

    if (mine.length) {
        html +=
            '<div class="division-selector">' +
            '<button class="map-button" data-select-none' +
                (selected.length <= 0 ? ' disabled' : '') +
                '>None</button>' +
            '<button class="map-button" data-count-step="-1"' +
                (selected.length <= 0 ? ' disabled' : '') +
                ' title="Select one fewer">&#9664;</button>' +
            '<input type="number" class="division-count" ' +
                'data-division-count min="0" max="' + mine.length + '" ' +
                'value="' + selected.length + '">' +
            '<button class="map-button" data-count-step="1"' +
                (selected.length >= mine.length ? ' disabled' : '') +
                ' title="Select one more">&#9654;</button>' +
            '<button class="map-button" data-select-all' +
                (selected.length >= mine.length ? ' disabled' : '') +
                '>All</button>' +
            '</div>';
    }

    if (selected.length) {
        var cost = window.mapMoveCost(selected);
        var canAfford = movesLeft >= cost;
        html += '<div class="division-move"><div class="province-stat-label">' +
            'Move ' + selected.length + ' division' +
            (selected.length === 1 ? '' : 's') + ' to:</div>';
        getAdjacentProvinces(provinceId).forEach(function(otherId) {
            var hostile = isAttackTarget(otherId, window.mapPlayerFaction);
            var shut = mapBorderClosed(window.mapPlayerFaction, otherId);
            html += '<button class="map-button' + (hostile ? ' attack' : '') +
                '" data-move-to="' + otherId + '"' +
                (shut ? ' disabled title="At peace with ' + partyName(shut) + '"' :
                 canAfford ? '' : ' disabled title="Not enough moves left"') +
                '>' + (hostile ? 'Attack ' : '') + provinceName(otherId) +
                '</button> ';
        });
        if (!canAfford) {

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
    bar.className = 'tools map-turnbar' + (left === 0 ? ' out' : '');
    bar.innerHTML = html;
};

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

function setMapMessage(text) {
    mapMessage = text;
    window.renderMapSidebar(window.selectedMapProvince);
}

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
    if (!battle || battleOwner(battle) !== window.mapPlayerFaction) {
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

    var closed = mapBorderClosed(window.mapPlayerFaction, toId);
    if (closed) {
        setMapMessage('You are at peace with ' + partyName(closed) +
            ', so you cannot enter ' + provinceName(toId) + '.');
        return;
    }

    if (isAttackTarget(toId, window.mapPlayerFaction)) {
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

    window.selectedMapDivisions = ids;
    window.showMapProvince(toId, true);
    window.onMapDivisionsMoved(ids, fromId, toId);
};

function killDivisions(list, count) {
    for (var i = 0; i < count && i < list.length; i++) {
        list[list.length - 1 - i].dead = true;
    }
}

// end of turn
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

        if (defenders.length) {
            province.devastation = clampControl(
                (province.devastation || 0) + window.mapBattleDevastation);
        }

        var startA = attackers.length;
        var startD = defenders.length;
        killDivisions(attackers, result.attackersLost);
        killDivisions(defenders, result.defendersLost);

        var retreatNote = '';
        if (result.winner === 'attacker' && defenders.length) {
            var survivors = defenders.filter(function(d) { return !d.dead; });
            if (survivors.length) {
                var dOwner = survivors[0].owner;
                var options = getAdjacentProvinces(toId).filter(function(id) {
                    return !hostileDivisionsIn(id, dOwner).length;
                });
                var home = options.filter(function(id) {
                    return window.mapProvinces[id].controller === dOwner;
                });
                var dest = (home.length ? home : options)[0];
                if (dest) {
                    survivors.forEach(function(d) { d.province = dest; });
                    retreatNote = ' ' + survivors.length + ' retreated to ' +
                        provinceName(dest) + '.';
                } else {
                    killDivisions(survivors, survivors.length);
                    retreatNote = ' The survivors were cut off and lost.';
                }
            }
        }

        var line = 'Battle for ' + name + ' (from ' +
            fromIds.map(provinceName).join(', ') + '): ' + startA +
            ' attacking, ' + startD + ' defending. ';

        if (result.winner === 'attacker') {

            var alive = attackers.filter(function(d) { return !d.dead; });
            if (owner === window.mapPlayerFaction) {
                alive.forEach(function(d) { d.province = toId; });
            } else {

                var byOrigin = {};
                alive.forEach(function(d) {
                    (byOrigin[d.province] = byOrigin[d.province] || []).push(d);
                });
                Object.keys(byOrigin).forEach(function(originId) {
                    var group = byOrigin[originId];
                    var exposed = getAdjacentProvinces(originId).some(function(n) {
                        return n !== toId && isEnemyGround(n, owner);
                    });
                    var advance = exposed ?
                        Math.max(1, Math.ceil(group.length / 2)) : group.length;
                    group.slice(0, advance).forEach(function(d) {
                        d.province = toId;
                    });
                });
            }
            if (province.controller !== owner) {
                province.controller = owner;
                province.control = window.mapConquestControl;
            }
            line += 'Victory: ' + partyName(owner) + ' took ' + name + '. ' +
                'Lost ' + result.attackersLost + ', destroyed ' +
                result.defendersLost + '.' + retreatNote;
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

window.mapDecayDevastation = function() {
    Object.keys(window.mapProvinces).forEach(function(id) {
        var p = window.mapProvinces[id];
        p.devastation = clampControl((p.devastation || 0) - window.mapDevastationDecay);
    });
};

window.mapAttritionStep = 50;
window.mapApplyAttrition = function(report) {
    Object.keys(window.mapProvinces).forEach(function(id) {
        var limit = window.mapSupplyLimit(id);
        var owners = {};
        divisionsIn(id).forEach(function(d) {
            (owners[d.owner] = owners[d.owner] || []).push(d);
        });
        Object.keys(owners).forEach(function(owner) {
            var list = owners[owner];
            var over = list.length - limit;
            if (over > 0) {
                var loss = Math.min(list.length, Math.max(1, Math.round(over / window.mapAttritionStep)));
                killDivisions(list, loss);
                report.push(partyName(owner) + ' lost ' + loss + ' division' +
                    (loss === 1 ? '' : 's') + ' to attrition in ' +
                    provinceName(id) + ' (over the supply limit).');
            }
        });
    });
};

window.mapUpdateControl = function() {
    Object.keys(window.mapProvinces).forEach(function(id) {
        var p = window.mapProvinces[id];
        var here = divisionsIn(id);
        if (p.controller === 'none') {
            var owners = [];
            here.forEach(function(d) {
                if (owners.indexOf(d.owner) === -1) {
                    owners.push(d.owner);
                }
            });
            if (owners.length === 1) {
                p.controller = owners[0];
                p.control = window.mapConquestControl;
            }
            return;
        }
        var enemy = here.some(function(d) {
            return window.mapIsHostile(p.controller, d.owner);
        });
        var garrison = here.some(function(d) {
            return d.owner === p.controller;
        });
        var delta = enemy ? -5 : garrison ? 10 : p.control >= 50 ? 5 : 0;
        delta -= 5 * (p.devastation || 0) / 100;
        p.control = clampControl(Math.round(p.control + delta));
    });
};

window.mapPostTurn = function() {
    window.loadMapState();
    window.mapDecayDevastation();
    var report = window.resolveMapBattles();
    window.mapApplyAttrition(report);
    window.mapUpdateControl();
    window.mapReport = report;
    window.mapMovesUsed = 0;
    window.saveMapState();
    if (mapIsOpen()) {
        window.renderGameMap();
        window.refreshMapUI();
    }
    return report;
};

// event helpers
function editMapState(change) {
    window.loadMapState();
    var result = change();
    window.saveMapState();
    if (mapIsOpen()) {
        window.renderGameMap();
        window.refreshMapUI();
    }
    return result;
}

function knownProvince(id, caller) {
    if (!window.mapProvinces[id]) {
        console.warn(caller + ': unknown province "' + id + '"');
        return false;
    }
    return true;
}

function clampControl(n) {
    return Math.max(0, Math.min(100, Number(n) || 0));
}

window.mapSetController = function(id, faction, control) {
    if (!knownProvince(id, 'mapSetController')) {
        return false;
    }
    if (!window.mapPartyColors[faction]) {
        console.warn('mapSetController: unknown faction "' + faction +
            '" (add it to window.mapPartyColors / mapPartyNames)');
    }
    return editMapState(function() {
        var p = window.mapProvinces[id];
        var changed = p.controller !== faction;
        p.controller = faction;
        if (control !== undefined && control !== null) {
            p.control = clampControl(control);
        } else if (changed) {
            p.control = window.mapConquestControl;
        }
        return true;
    });
};

window.mapSetControl = function(id, control) {
    if (!knownProvince(id, 'mapSetControl')) {
        return false;
    }
    return editMapState(function() {
        window.mapProvinces[id].control = clampControl(control);
        return true;
    });
};

// province demographics, soviet power and election control (events)
function demoSetter(name, apply) {
    window[name] = function(id) {
        if (!knownProvince(id, name)) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        return editMapState(function() {
            apply.apply(null, [window.mapProvinces[id]].concat(args));
            return true;
        });
    };
}
demoSetter('mapSetPop', function(p, v) { p.pop = Math.max(0, Number(v)); });
demoSetter('mapAddPop', function(p, d) { p.pop = Math.max(0, p.pop + Number(d)); });
demoSetter('mapScalePop', function(p, f) { p.pop = Math.max(0, p.pop * Number(f)); });
demoSetter('mapSetClassShare', function(p, c, v) { p.classes[c] = Math.max(0, Number(v)); });
demoSetter('mapAddClassShare', function(p, c, d) {
    p.classes[c] = Math.max(0, (p.classes[c] || 0) + Number(d));
});
demoSetter('mapSetSovietPower', function(p, v) { p.soviet_power = clampControl(v); });
demoSetter('mapAddSovietPower', function(p, d) {
    p.soviet_power = clampControl(p.soviet_power + Number(d));
});
demoSetter('mapSetElectionControl', function(p, v) { p.election_control = clampControl(v); });
demoSetter('mapAddElectionControl', function(p, d) {
    p.election_control = clampControl(p.election_control + Number(d));
});

// elections
// groups that vote at each level of soviet_class_participation
window.mapSovietClasses = function(level) {
    var l = Math.max(1, Math.min(4, Math.floor(level) || 1));
    if (l === 1) {
        return ['workers', 'soldiers'];
    }
    if (l === 2) {
        return ['workers', 'soldiers', 'peasants', 'kulaks'];
    }
    if (l === 3) {
        return window.mapClassOrder.filter(function(c) {
            return c !== 'clergy' && c !== 'elites';
        });
    }
    return window.mapClassOrder.slice();
};

// election types. excluded: parties not on the ballot (their support goes to "other")
window.electionTypes = {
    soviet: { excluded: ['k', 'rightist'], participation: true, sovietPower: true, rigging: true },
    general: { excluded: [], participation: false, sovietPower: false, rigging: false }
};

// a faction is excluded when its legal flag in Root is 0
window.electionLegalFlags = {
    mensheviks_legal: ['left_m', 'm', 'right_m', 'sdi'],
    sr_legal: ['sr', 'right_sr', 'popular_socialist'],
    lsr_legal: ['lsr'],
    anarchists_legal: ['anarchist', 'maximalist']
};

// parties that benefit from election control, and how fast the rest are suppressed
window.sovietFavoured = ['b'];
window.sovietRiggingExponent = 1.5;

// left-to-right order of parties in charts and tables
window.electionChartOrder = ['anarchist', 'maximalist', 'b', 'sdi', 'left_m', 'm',
    'right_m', 'ukrainian_sd', 'bundist', 'lsr', 'sr', 'right_sr', 'ukrainian_sr',
    'popular_socialist', 'agrarian', 'polish', 'zionist', 'k', 'rightist', 'other'];

// display names: legend (chart) and table (plural)
window.electionNames = {
    anarchist: { legend: 'Anarchist', table: 'Anarchists', box: 'a' },
    maximalist: { legend: 'SR-Maximalist', table: 'Maximalists' },
    b: { legend: 'Bolshevik', table: 'Bolsheviks' },
    sdi: { legend: 'SD-Internationalist', table: 'SD-Internationalists' },
    left_m: { legend: 'Menshevik-Internationalist', table: 'Menshevik Internationalists' },
    m: { legend: 'Menshevik-Centre', table: 'Mensheviks (Centre)' },
    right_m: { legend: 'Menshevik-Defencist', table: 'Menshevik Defencists' },
    lsr: { legend: 'Left-SR', table: 'Left-SRs' },
    sr: { legend: 'SR', table: 'SRs' },
    right_sr: { legend: 'Right SR', table: 'Right SRs' },
    popular_socialist: { legend: 'Popular Socialist', table: 'Popular Socialists' },
    k: { legend: 'Kadet', table: 'Kadets' },
    rightist: { legend: 'Rightist', table: 'Rightists' },
    other: { legend: 'Other', table: 'Others' },
    ukrainian_sr: { legend: 'Ukrainian SR', table: 'Ukrainian SRs' },
    ukrainian_sd: { legend: 'Ukrainian SD', table: 'Ukrainian SDs' },
    zionist: { legend: 'Zionist', table: 'Zionists' },
    polish: { legend: 'Polish Party', table: 'Polish Parties' },
    agrarian: { legend: 'Agrarian Party', table: 'Agrarian Parties' },
    bundist: { legend: 'Bundist', table: 'Bundists' }
};

// regions for multi-province elections
window.mapRegions = {
    ukraine: ['volhynia', 'podolia', 'kyiv', 'chernigov', 'poltava', 'kharkov',
        'yekaterinoslav', 'kherson', 'taurida']
};

// local parties by region. steals: stages applied in order; each stage is
// { thief: { party: share of that party's support (at the start of the stage) } }
window.mapLocalPolitics = {
    ukraine: {
        parties: ['ukrainian_sr', 'zionist', 'polish', 'ukrainian_sd', 'agrarian', 'bundist'],
        steals: [
            {
                ukrainian_sr: { sr: 0.8, lsr: 0.6 },
                agrarian: { sr: 0.1, lsr: 0.1, other: 0.5 },
                ukrainian_sd: { sdi: 0.8, left_m: 0.9, m: 0.9, right_m: 0.9 }
            },
            {
                ukrainian_sr: { ukrainian_sd: 0.7, b: 0.3 }
            }
        ]
    }
};

// minorities (percent of a province) and the local parties they vote for
window.mapMinorityParties = { jews: ['zionist', 'bundist'], poles: ['polish'] };
window.mapMinorityNationalShare = 0.5;    // share of a minority voting for its own parties
window.mapProvinceMinorities = {
    volhynia: { jews: 13, poles: 6 },
    podolia: { jews: 12, poles: 4 },
    kyiv: { jews: 10, poles: 3 },
    chernigov: { jews: 8, poles: 1 },
    poltava: { jews: 5, poles: 1 },
    kharkov: { jews: 5, poles: 1 },
    yekaterinoslav: { jews: 7, poles: 1 },
    kherson: { jews: 10, poles: 2 },
    taurida: { jews: 3, poles: 1 }
};
Object.keys(window.mapLocalPolitics).forEach(function(region) {
    (window.mapRegions[region] || []).forEach(function(id) {
        window.mapProvinces[id].local = region;
    });
});
Object.keys(window.mapProvinceMinorities).forEach(function(id) {
    window.mapProvinces[id].minorities = window.mapProvinceMinorities[id];
});

// national parties on the ballot for an election type
function ballotParties(Q, type) {
    var excluded = type.excluded.slice();
    Object.keys(window.electionLegalFlags).forEach(function(flag) {
        if (Q[flag] === 0) {
            excluded = excluded.concat(window.electionLegalFlags[flag]);
        }
    });
    var all = Q.parties.filter(function(x) { return x !== 'none'; });
    return {
        all: all,
        excluded: excluded.filter(function(x) { return all.indexOf(x) !== -1 && x !== 'other'; })
    };
}

// one province: returns { shares: {party: 0-1}, weight, parties }
window.mapElectionProvince = function(id, options) {
    var Q = engineQualities();
    var p = window.mapProvinces[id];
    options = options || {};
    var type = window.electionTypes[options.type || 'soviet'];
    var level = !type.participation ? 4 : options.participation !== undefined ?
        options.participation : (Q.soviet_class_participation || 1);
    var classes = window.mapSovietClasses(level);
    var ballot = ballotParties(Q, type);
    var lp = p.local ? window.mapLocalPolitics[p.local] : null;
    var localParties = lp ? lp.parties : [];

    var totalShare = 0;
    window.mapClassOrder.forEach(function(c) { totalShare += p.classes[c] || 0; });
    if (totalShare <= 0) {
        totalShare = 1;
    }

    // 1. national parties: class shares times each class's party support
    var support = {};
    ballot.all.concat(localParties).forEach(function(x) { support[x] = 0; });
    var allowedShare = 0;
    var urbanShare = 0;
    classes.forEach(function(c) {
        var share = (p.classes[c] || 0) / totalShare;
        var votes = 0;
        ballot.all.forEach(function(x) { votes += Math.max(0, Q[c + '_' + x] || 0); });
        if (votes <= 0 || share <= 0) {
            return;
        }
        allowedShare += share;
        ballot.all.forEach(function(x) {
            support[x] += share * 100 * Math.max(0, Q[c + '_' + x] || 0) / votes;
        });
    });
    var rural = ((p.classes.peasants || 0) + (p.classes.kulaks || 0)) / totalShare;
    urbanShare = 1 - rural;

    // right_sr is part of sr until the two formally split
    if (Q.right_sr_split !== 1 && support.right_sr !== undefined) {
        support.sr += support.right_sr;
        delete support.right_sr;
    }

    // 2. excluded parties: their support goes to other
    ballot.excluded.forEach(function(x) {
        if (support[x] !== undefined) {
            support.other += support[x];
            delete support[x];
        }
    });

    // 3. local parties take a share of other parties' support, stage by stage
    if (lp) {
        lp.steals.forEach(function(stage) {
            var original = {};
            Object.keys(support).forEach(function(x) { original[x] = support[x]; });
            var taken = {};
            Object.keys(stage).forEach(function(thief) {
                Object.keys(stage[thief]).forEach(function(from) {
                    if (original[from] === undefined) {
                        return;
                    }
                    var amount = original[from] * stage[thief][from];
                    support[thief] += amount;
                    taken[from] = (taken[from] || 0) + amount;
                });
            });
            Object.keys(taken).forEach(function(from) {
                support[from] = Math.max(0, support[from] - taken[from]);
            });
        });
    }

    // 4. minorities: part of each votes for its own parties, drawn from all parties pro rata
    var total = 0;
    Object.keys(support).forEach(function(x) { total += support[x]; });
    if (lp && p.minorities && total > 0) {
        var votesFor = {};
        var drawn = 0;
        Object.keys(p.minorities).forEach(function(m) {
            var options2 = (window.mapMinorityParties[m] || []).filter(function(x) {
                return support[x] !== undefined;
            });
            if (!options2.length) {
                return;
            }
            var amount = total * (p.minorities[m] / 100) * window.mapMinorityNationalShare;
            var weights = options2.map(function(x) {
                // bundists do better in less rural provinces, zionists in more rural ones
                return x === 'bundist' ? 0.25 + 0.6 * urbanShare :
                    x === 'zionist' ? 0.75 - 0.6 * urbanShare : 1;
            });
            var weightTotal = weights.reduce(function(a, b) { return a + b; }, 0);
            options2.forEach(function(x, i) {
                votesFor[x] = (votesFor[x] || 0) + amount * weights[i] / weightTotal;
            });
            drawn += amount;
        });
        if (drawn > 0) {
            var keep = Math.max(0, 1 - drawn / total);
            Object.keys(support).forEach(function(x) { support[x] *= keep; });
            Object.keys(votesFor).forEach(function(x) { support[x] += votesFor[x]; });
        }
    }

    // 5. election control suppresses everyone but the favoured parties
    if (type.rigging) {
        var control = Math.max(0, Math.min(1, p.election_control / 100));
        var suppression = Math.pow(1 - control, window.sovietRiggingExponent);
        Object.keys(support).forEach(function(x) {
            if (window.sovietFavoured.indexOf(x) === -1) {
                support[x] *= suppression;
            }
        });
    }
    total = 0;
    Object.keys(support).forEach(function(x) { total += support[x]; });
    var shares = {};
    Object.keys(support).forEach(function(x) {
        shares[x] = total > 0 ? support[x] / total : 0;
    });

    // how many people take part
    var weight = total > 0 ? p.pop * allowedShare *
        (type.sovietPower ? p.soviet_power / 100 : 1) : 0;
    return { shares: shares, weight: weight, parties: Object.keys(support) };
};

// one or more provinces: returns { party: percent }
//   options: type ('soviet' or 'general'), key (variable prefix, default 'election')
// writes <party>_<key>_votes_dec / _votes / _votes_disp / _normalized, <key>_parties,
// <key>_participants and <key>_provinces
window.mapElection = function(provinces, options) {
    var Q = engineQualities();
    window.loadMapState();
    options = options || {};
    var key = options.key || 'election';
    if (provinces === undefined || provinces === null) {
        provinces = Q.election_provinces;
    }
    if (typeof provinces === 'string') {
        provinces = window.mapRegions[provinces] || [provinces];
    }
    var totals = {};
    var weightSum = 0;
    var taking = 0;
    var perProvince = {};

    provinces.forEach(function(id) {
        if (!window.mapProvinces[id]) {
            console.warn('mapElection: unknown province "' + id + '"');
            return;
        }
        var r = window.mapElectionProvince(id, options);
        perProvince[id] = r;
        weightSum += r.weight;
        if (r.weight > 0) {
            taking++;
        }
        Object.keys(r.shares).forEach(function(x) {
            totals[x] = (totals[x] || 0) + r.weight * r.shares[x];
        });
    });

    var parties = Object.keys(totals).sort(function(a, b) {
        return window.electionChartOrder.indexOf(a) - window.electionChartOrder.indexOf(b);
    });
    var result = {};
    parties.forEach(function(x) {
        var fraction = weightSum > 0 ? totals[x] / weightSum : 0;
        result[x] = Math.round(fraction * 1000) / 10;
        Q[x + '_' + key + '_normalized'] = fraction;
        Q[x + '_' + key + '_votes_dec'] = result[x];
        Q[x + '_' + key + '_votes'] = Math.round(fraction * 100);
        Q[x + '_' + key + '_votes_disp'] = result[x].toFixed(1);
    });
    Q[key + '_parties'] = parties;
    Q[key + '_participants'] = Math.round(weightSum * 100) / 100;
    Q[key + '_provinces'] = taking;
    window.mapElectionLast = { result: result, weight: weightSum, provinces: perProvince };
    return result;
};

// rescale <party>_<key>_votes_dec to add up to 100 (after manual adjustments)
window.mapElectionNormalize = function(key) {
    var Q = engineQualities();
    key = key || 'election';
    var parties = Q[key + '_parties'] || [];
    var total = 0;
    parties.forEach(function(x) { total += Math.max(0, Q[x + '_' + key + '_votes_dec'] || 0); });
    if (total <= 0) {
        return;
    }
    parties.forEach(function(x) {
        var v = Math.round(1000 * Math.max(0, Q[x + '_' + key + '_votes_dec'] || 0) / total) / 10;
        Q[x + '_' + key + '_votes_dec'] = v;
        Q[x + '_' + key + '_votes'] = Math.round(v);
        Q[x + '_' + key + '_votes_disp'] = v.toFixed(1);
    });
};

// older name, kept for existing events
window.mapSovietElection = function(provinces, key, options) {
    options = options || {};
    options.type = 'soviet';
    options.key = key;
    return window.mapElection(provinces, options);
};

// order an attack: mapOrderAttack(faction, from, to, [count])
window.mapOrderAttack = function(faction, fromId, toId, count) {
    if (!knownProvince(fromId, 'mapOrderAttack') ||
        !knownProvince(toId, 'mapOrderAttack')) {
        return 0;
    }
    return editMapState(function() {
        if (!areProvincesAdjacent(fromId, toId)) {
            console.warn('mapOrderAttack: ' + fromId + ' and ' + toId +
                ' are not adjacent');
            return 0;
        }
        if (!isAttackTarget(toId, faction)) {
            console.warn('mapOrderAttack: ' + toId + ' is not an attack ' +
                'target for ' + faction + ' (peace, or already its own)');
            return 0;
        }
        var free = divisionsIn(fromId).filter(function(d) {
            return d.owner === faction && !isCommitted(d.id);
        });
        if (count !== undefined && count !== null) {
            free = free.slice(0, Math.max(0, Math.floor(Number(count) || 0)));
        }
        if (!free.length) {
            return 0;
        }
        window.queueMapAttack(free.map(function(d) { return d.id; }),
                              fromId, toId, 0);
        return free.length;
    });
};

window.mapScaleDivisions = function(id, factor, owner) {
    if (!knownProvince(id, 'mapScaleDivisions')) {
        return 0;
    }
    return editMapState(function() {
        var list = divisionsIn(id).filter(function(d) {
            return !owner || d.owner === owner;
        });
        var keep = Math.round(list.length * Math.max(0, Number(factor) || 0));
        var doomed = list.slice(keep);
        doomed.forEach(function(d) { d.dead = true; });
        window.mapBattles = window.mapBattles.filter(function(b) {
            b.ids = b.ids.filter(function(did) {
                return mapDivisionIndex[did] && !mapDivisionIndex[did].dead;
            });
            if (!b.ids.length) {
                window.mapMovesUsed = Math.max(0, window.mapMovesUsed - b.cost);
                return false;
            }
            return true;
        });
        return doomed.length;
    });
};

window.mapChangeOwner = function(id, fromOwner, toOwner, count) {
    if (!knownProvince(id, 'mapChangeOwner')) {
        return 0;
    }
    return editMapState(function() {
        var list = divisionsIn(id).filter(function(d) {
            return d.owner === fromOwner;
        });
        if (count !== undefined && count !== null) {
            list = list.slice(0, Math.max(0, Math.floor(Number(count) || 0)));
        }
        list.forEach(function(d) { d.owner = toOwner; });

        window.mapBattles = window.mapBattles.filter(function(b) {
            b.ids = b.ids.filter(function(did) {
                return !list.some(function(d) { return d.id === did; });
            });
            if (!b.ids.length) {
                window.mapMovesUsed = Math.max(0, window.mapMovesUsed - b.cost);
                return false;
            }
            return true;
        });
        return list.length;
    });
};

window.mapSetStat = function(faction, stat, value) {
    if (MAP_STATS.indexOf(stat) === -1) {
        console.warn('mapSetStat: unknown stat "' + stat + '" (use ' +
            MAP_STATS.join(', ') + ')');
        return false;
    }
    return editMapState(function() {
        window.mapStatOverrides[faction] = window.mapStatOverrides[faction] || {};
        window.mapStatOverrides[faction][stat] = Number(value);
        return true;
    });
};
window.mapAddStat = function(faction, stat, delta) {
    window.loadMapState();
    var current = window.mapStatsFor(faction, null)[stat];
    if (typeof current !== 'number') {
        return false;
    }
    return window.mapSetStat(faction, stat, current + Number(delta || 0));
};
window.mapGetStat = function(faction, stat) {
    window.loadMapState();
    return window.mapStatsFor(faction, null)[stat];
};

window.mapSetWar = function(a, b) {
    return editMapState(function() {
        window.mapWarOverrides[warKey(a, b)] = true;
        return true;
    });
};
window.mapSetPeace = function(a, b) {
    return editMapState(function() {
        window.mapWarOverrides[warKey(a, b)] = false;

        window.mapBattles = window.mapBattles.filter(function(bt) {
            var p = window.mapProvinces[bt.to];
            var cancel = p && !isAttackTarget(bt.to, mapDivisionIndex[bt.ids[0]] ?
                mapDivisionIndex[bt.ids[0]].owner : a);
            if (cancel) {
                window.mapMovesUsed = Math.max(0, window.mapMovesUsed - bt.cost);
            }
            return !cancel;
        });
        return true;
    });
};
window.mapIsAtWar = function(a, b) {
    window.loadMapState();
    return window.mapAtWar(a, b);
};

window.mapSetDevastation = function(id, value) {
    if (!knownProvince(id, 'mapSetDevastation')) {
        return false;
    }
    return editMapState(function() {
        window.mapProvinces[id].devastation = clampControl(value);
        return true;
    });
};
window.mapAddDevastation = function(id, delta) {
    if (!knownProvince(id, 'mapAddDevastation')) {
        return false;
    }
    return editMapState(function() {
        var p = window.mapProvinces[id];
        p.devastation = clampControl((p.devastation || 0) + Number(delta || 0));
        return true;
    });
};
window.mapDevastation = function(id) {
    var p = window.mapProvinces[id];
    return p ? (p.devastation || 0) : 0;
};

window.mapAddControl = function(id, delta) {
    if (!knownProvince(id, 'mapAddControl')) {
        return false;
    }
    return editMapState(function() {
        var p = window.mapProvinces[id];
        p.control = clampControl(p.control + Number(delta || 0));
        return true;
    });
};

window.mapAddDivisions = function(id, owner, count) {
    if (!knownProvince(id, 'mapAddDivisions')) {
        return 0;
    }
    count = Math.floor(Number(count) || 0);
    if (count <= 0) {
        return 0;
    }
    return editMapState(function() {
        var next = 1;
        window.mapDivisions.forEach(function(d) {
            var m = /^extra_(\d+)$/.exec(d.id);
            if (m) {
                next = Math.max(next, Number(m[1]) + 1);
            }
        });
        for (var i = 0; i < count; i++) {
            var n = next + i;
            var d = {
                id: 'extra_' + n,
                name: partyName(owner) + ' Division (new ' + n + ')',
                owner: owner,
                province: id,
                start: id,
                dead: false,
                extra: true
            };
            window.mapDivisions.push(d);
            mapDivisionIndex[d.id] = d;
        }
        return count;
    });
};

window.mapRemoveDivisions = function(id, owner, count) {
    if (!knownProvince(id, 'mapRemoveDivisions')) {
        return 0;
    }
    count = Math.floor(Number(count) || 0);
    if (count <= 0) {
        return 0;
    }
    return editMapState(function() {
        var mine = divisionsIn(id).filter(function(d) {
            return d.owner === owner;
        });

        mine.sort(function(a, b) {
            return (isCommitted(a.id) ? 1 : 0) - (isCommitted(b.id) ? 1 : 0);
        });
        var doomed = mine.slice(0, count);
        doomed.forEach(function(d) {
            d.dead = true;
        });

        window.mapBattles = window.mapBattles.filter(function(b) {
            b.ids = b.ids.filter(function(did) {
                return mapDivisionIndex[did] && !mapDivisionIndex[did].dead;
            });
            if (!b.ids.length) {
                window.mapMovesUsed = Math.max(0, window.mapMovesUsed - b.cost);
                return false;
            }
            return true;
        });
        return doomed.length;
    });
};

window.mapSetDivisions = function(id, owner, count) {
    if (!knownProvince(id, 'mapSetDivisions')) {
        return 0;
    }
    window.loadMapState();
    var have = divisionsIn(id).filter(function(d) {
        return d.owner === owner;
    }).length;
    count = Math.max(0, Math.floor(Number(count) || 0));
    if (count > have) {
        return window.mapAddDivisions(id, owner, count - have);
    }
    if (count < have) {
        return window.mapRemoveDivisions(id, owner, have - count);
    }
    return 0;
};

window.mapDivisionCount = function(id, owner) {
    window.loadMapState();
    return divisionsIn(id).filter(function(d) {
        return !owner || d.owner === owner;
    }).length;
};
window.mapController = function(id) {
    window.loadMapState();
    return window.mapProvinces[id] ? window.mapProvinces[id].controller : null;
};
window.mapControl = function(id) {
    window.loadMapState();
    return window.mapProvinces[id] ? window.mapProvinces[id].control : null;
};

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
    window.renderMapTurnbar();
    return frame;
};

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

    try {
        window.mapInit();
    } catch (e) {
        console.warn('mapInit failed:', e);
    }

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
