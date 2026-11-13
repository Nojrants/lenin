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
        adjacent: ['don', 'georgia', 'stavropol', 'terek', 'sukhumi']
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
        adjacent: ['kuban', 'kars', 'terek', 'armenia', 'azerbaijan', 'dagestan', 'batumi', 'sukhumi']
    },
    batumi: {
        name: 'Batumi',
        controller: 'none',
        control: 100,
        adjacent: ['georgia', 'kars', 'western_armenia', 'anatolia']
    },
    sukhumi: {
        name: 'Sukhumi',
        controller: 'none',
        control: 100,
        adjacent: ['georgia', 'kuban']
    },
    western_armenia: {
        name: 'Western Armenia',
        controller: 'none',
        control: 100,
        adjacent: ['armenia', 'kars', 'batumi', 'anatolia', 'kurdistan', 'iran']
    },
    anatolia: {
        name: 'Anatolia',
        controller: 'ottoman',
        control: 100,
        adjacent: ['batumi', 'western_armenia', 'kurdistan']
    },
    kurdistan: {
        name: 'Kurdistan',
        controller: 'ottoman',
        control: 100,
        adjacent: ['anatolia', 'western_armenia', 'iran']
    },
    iran: {
        name: 'Iran',
        controller: 'iran',
        control: 100,
        adjacent: ['azerbaijan', 'armenia', 'western_armenia', 'kurdistan']
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
        adjacent: ['georgia', 'armenia', 'batumi', 'western_armenia']
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
        adjacent: ['georgia', 'kars', 'azerbaijan', 'western_armenia', 'iran']
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
        adjacent: ['georgia', 'armenia', 'dagestan', 'iran']
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
    moldavia: '#d4b72c',
    ottoman: '#8c6d46',
    iran: '#4aa3a2',
    transcaucasia: '--m-color',
    georgia: '--m-color',
    azerbaijan: '#3f9c5a',
    armenia: '#e07b39',
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
    moldavia: 'Moldavian Democratic Republic',
    ottoman: 'Ottoman Empire',
    iran: 'Iran',
    transcaucasia: 'Transcaucasian Democratic Federative Republic',
    georgia: 'Democratic Republic of Georgia',
    azerbaijan: 'Azerbaijan Democratic Republic',
    armenia: 'Republic of Armenia',
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

// supply limits are in soldiers, so changing mapSoldiersPerDivision rescales them
window.mapUrbanSupply = 450000;
window.mapRuralSupply = 150000;
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
    georgia: { pop: 1.84, soviet_power: 10,
        classes: { elites: 1.124, middle: 6.19, clergy: 0.514, workers: 16.19, peasants: 73.333, kulaks: 0.0, soldiers: 0.952, intelligentsia: 0.714, underclass: 0.886, students: 0.095 } },
    batumi: { pop: 0.15, soviet_power: 10,
        classes: { elites: 1.124, middle: 6.19, clergy: 0.514, workers: 16.19, peasants: 73.333, kulaks: 0.0, soldiers: 0.952, intelligentsia: 0.714, underclass: 0.886, students: 0.095 } },
    sukhumi: { pop: 0.11, soviet_power: 10,
        classes: { elites: 1.124, middle: 6.19, clergy: 0.514, workers: 16.19, peasants: 73.333, kulaks: 0.0, soldiers: 0.952, intelligentsia: 0.714, underclass: 0.886, students: 0.095 } },
    stavropol: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kars: { pop: 0.252, soviet_power: 10,
        classes: { elites: 0.476, middle: 0.833, clergy: 0.437, workers: 1.984, peasants: 91.27, kulaks: 0.0, soldiers: 3.968, intelligentsia: 0.198, underclass: 0.794, students: 0.04 } },
    nizhny: { pop: 2, soviet_power: 45,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    terek: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    saratov: { pop: 2, soviet_power: 40,
        classes: { elites: 3, middle: 12, clergy: 0.6, workers: 25, peasants: 25, kulaks: 2, soldiers: 12, intelligentsia: 5, underclass: 13, students: 1.4 } },
    penza: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    armenia: { pop: 0.8, soviet_power: 10,
        classes: { elites: 0.8, middle: 0.25, clergy: 0.675, workers: 8.75, peasants: 87.5, kulaks: 0.0, soldiers: 1.0, intelligentsia: 0.375, underclass: 0.6, students: 0.05 } },
    western_armenia: { pop: 0.8, soviet_power: 10,
        classes: { elites: 0.8, middle: 0.25, clergy: 0.675, workers: 8.75, peasants: 87.5, kulaks: 0.0, soldiers: 1.0, intelligentsia: 0.375, underclass: 0.6, students: 0.05 } },
    anatolia: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    kurdistan: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    iran: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    astrakhan: { pop: 1, soviet_power: 10,
        classes: { elites: 1, middle: 3, clergy: 0.6, workers: 2, peasants: 78, kulaks: 6, soldiers: 5, intelligentsia: 1, underclass: 3, students: 0.2 } },
    azerbaijan: { pop: 0.85, soviet_power: 10,
        classes: { elites: 1.576, middle: 1.012, clergy: 0.059, workers: 20.0, peasants: 74.118, kulaks: 0.0, soldiers: 1.176, intelligentsia: 0.706, underclass: 1.176, students: 0.176 } },
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
    var soldiers = typeof p.supply === 'number' ? p.supply :
        (window.mapUrbanProvinces.indexOf(id) !== -1 ?
            window.mapUrbanSupply : window.mapRuralSupply);
    return soldiers / window.mapSoldiersPerDivision *
        (1 - 0.5 * (p.devastation || 0) / 100);
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
    makeDivisions('pskov', 'bolsheviks', 17),
    makeDivisions('vitebsk', 'bolsheviks', 25),

    makeDivisions('estonia', 'bolsheviks', 17),

    makeDivisions('vilna', 'bolsheviks', 30),
    makeDivisions('grodno', 'bolsheviks', 27),

    makeDivisions('volhynia', 'bolsheviks', 34),

    makeDivisions('podolia', 'upr', 25),
    makeDivisions('bessarabia', 'upr', 25),
    makeDivisions('kyiv', 'upr', 9),

    makeDivisions('petrograd', 'bolsheviks', 10),
    makeDivisions('yekaterinburg', 'bolsheviks', 5),
    makeDivisions('nizhny', 'bolsheviks', 4),
    makeDivisions('kazan', 'bolsheviks', 4),
    makeDivisions('saratov', 'bolsheviks', 4),
    makeDivisions('mogilev', 'bolsheviks', 7),
    makeDivisions('minsk', 'bolsheviks', 7),
    makeDivisions('kursk', 'bolsheviks', 4),

    makeDivisions('poland', 'germany', 42, 'German Division', 1),
    makeDivisions('lithuania', 'germany', 34, 'German Division', 43),
    makeDivisions('latvia', 'germany', 30, 'German Division', 77),

    makeDivisions('western_armenia', 'bolsheviks', 30),
    makeDivisions('georgia', 'bolsheviks', 5),
    makeDivisions('kars', 'bolsheviks', 20),
    makeDivisions('batumi', 'bolsheviks', 20),
    makeDivisions('armenia', 'bolsheviks', 10),
    makeDivisions('azerbaijan', 'bolsheviks', 5),

    makeDivisions('anatolia', 'ottoman', 50),
    makeDivisions('kurdistan', 'ottoman', 40),

    makeDivisions('don', 'don', 4)
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
    ['bolsheviks', 'moldavia'],
    ['upr', 'moldavia'],
    ['germany', 'moldavia'],
    ['bolsheviks', 'transcaucasia'],
    ['bolsheviks', 'georgia'],
    ['bolsheviks', 'azerbaijan'],
    ['bolsheviks', 'armenia'],
    ['germany', 'transcaucasia'],
    ['germany', 'georgia'],
    ['germany', 'azerbaijan'],
    ['germany', 'armenia'],
    ['upr', 'transcaucasia'],
    ['upr', 'georgia'],
    ['upr', 'azerbaijan'],
    ['upr', 'armenia'],
    ['transcaucasia', 'georgia'],
    ['transcaucasia', 'azerbaijan'],
    ['transcaucasia', 'armenia'],
    ['georgia', 'azerbaijan'],
    ['georgia', 'armenia'],
    ['azerbaijan', 'armenia'],
    ['germany', 'finland']
];
// Iran is neutral; the Ottoman Empire fights only the Bolsheviks and Transcaucasia
Object.keys(window.mapPartyNames).forEach(function(f) {
    if (f === 'none' || f === 'iran') {
        return;
    }
    window.mapDefaultPeace.push(['iran', f]);
    if (f !== 'ottoman' && f !== 'bolsheviks' && f !== 'transcaucasia') {
        window.mapDefaultPeace.push(['ottoman', f]);
    }
});
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
window.mapSoldiersPerDivision = 10000;

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

/* A defender's stats in a province: own control adds to the defence bonus
   (+1 at 100%), devastation subtracts from it (-0.5 at 100%). */
window.mapDefenseStats = function(owner, provinceId) {
    var st = window.mapStatsFor(owner, provinceId);
    var p = window.mapProvinces[provinceId];
    if (p) {
        if (p.controller === owner) {
            st.defense_bonus += p.control / 100;
        }
        st.defense_bonus -= 0.5 * (p.devastation || 0) / 100;
    }
    st.defense_bonus = Math.max(-1, st.defense_bonus);
    return st;
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
    var dSt = window.mapDefenseStats(defenders[0].owner, toId);
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
        var dPow = mapDefensePower(dSold, window.mapDefenseStats(defOwner, battle.to));

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

window.mapAttritionSoldiers = 150000;     // soldiers over the limit per division lost
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
                var loss = Math.min(list.length, Math.max(1, Math.round(over * window.mapSoldiersPerDivision / window.mapAttritionSoldiers)));
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
    'right_m', 'socialist_federalist', 'dashnak', 'ukrainian_sd', 'bundist', 'lsr', 'sr',
    'right_sr', 'ukrainian_sr', 'popular_socialist', 'muslim_sd', 'muslim_socialist',
    'ittihad', 'musavat', 'armenian_populist', 'agrarian', 'national_democrat', 'polish',
    'zionist', 'k', 'rightist', 'other'];

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
    sr: { legend: 'SR', table: 'Socialist-Revolutionaries' },
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
    bundist: { legend: 'Bundist', table: 'Bundists' },
    socialist_federalist: { legend: 'Socialist-Federalist', table: 'Socialist-Federalists' },
    dashnak: { legend: 'Dashnak', table: 'Dashnaks' },
    musavat: { legend: 'Musavat', table: 'Musavat' },
    muslim_socialist: { legend: 'Muslim Socialist', table: 'Muslim Socialists' },
    ittihad: { legend: 'Ittihad', table: 'Ittihad' },
    muslim_sd: { legend: 'Muslim SD', table: 'Muslim SDs' },
    national_democrat: { legend: 'National Democrat', table: 'National Democrats' },
    armenian_populist: { legend: 'Armenian Populist', table: 'Armenian Populists' }
};

// regions for multi-province elections
window.mapRegions = {
    ukraine: ['volhynia', 'podolia', 'kyiv', 'chernigov', 'poltava', 'kharkov',
        'yekaterinoslav', 'kherson', 'taurida'],
    transcaucasia: ['georgia', 'azerbaijan', 'armenia', 'kars', 'batumi', 'sukhumi', 'western_armenia']
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
    },
    transcaucasia: {
        parties: ['socialist_federalist', 'dashnak', 'muslim_sd', 'musavat', 'muslim_socialist',
            'ittihad', 'national_democrat', 'armenian_populist', 'agrarian', 'zionist'],
        // national parties not on the ballot here: their support goes to other
        excluded: ['sdi', 'anarchist', 'maximalist', 'popular_socialist'],
        // national parties folded into another before local parties act
        merge: { lsr: 'sr' },
        steals: [
            {
                mensheviks: { sr: 0.75 },
                dashnak: { sr: 0.1, other: 0.1 },
                armenian_populist: { k: 0.08, rightist: 0.06 },
                agrarian: { sr: 0.05, other: 0.2 }
            }
        ],
        // stages applied only in one province, after the regional ones.
        // 'mensheviks' stands for the three Menshevik wings (see mapWingBase)
        provinceSteals: {
            georgia: [{
                socialist_federalist: { sr: 0.1, other: 0.3 },
                national_democrat: { k: 0.6, rightist: 0.5, other: 0.3 }
            }],
            armenia: [{
                dashnak: { sr: 0.3, b: 0.05, other: 0.15 }
            }],
            kars: [{
                socialist_federalist: { sr: 0.3 },
                muslim_socialist: { sr: 0.3 },
                ittihad: { k: 0.4, rightist: 0.5 }
            }],
            azerbaijan: [{
                muslim_sd: { left_m: 0.5, m: 0.3, b: 0.15 },
                muslim_socialist: { sr: 0.5 },
                ittihad: { k: 0.6, rightist: 0.6, other: 0.3 }
            }]
        }
    }
};

window.mapLocalPolitics.transcaucasia.provinceSteals.batumi =
    window.mapLocalPolitics.transcaucasia.provinceSteals.georgia;
window.mapLocalPolitics.transcaucasia.provinceSteals.sukhumi =
    window.mapLocalPolitics.transcaucasia.provinceSteals.georgia;
window.mapLocalPolitics.transcaucasia.provinceSteals.western_armenia =
    window.mapLocalPolitics.transcaucasia.provinceSteals.armenia;

// Menshevik wings: base split (left : centre : right) and the quality holding each strength.
// Each wing's weight is base * (its strength / average strength of the wings).
window.mapWingBase = { left_m: 1, m: 2, right_m: 2 };
window.mapWingStrength = { left_m: 'left_m_strength', m: 'm_strength', right_m: 'right_m_strength' };

// minorities (percent of a province) and the local parties they vote for
window.mapMinorityParties = {
    jews: ['zionist', 'bundist'],
    poles: ['polish'],
    muslims: ['musavat', 'muslim_socialist', 'ittihad', 'muslim_sd'],
    armenians: ['dashnak', 'armenian_populist'],
    georgians: ['left_m', 'm', 'right_m']
};
window.mapMinorityNationalShare = 0.5;    // share of a minority voting for its own parties
window.mapMinorityShare = { muslims: 0.85, armenians: 0.8, georgians: 1 };    // per-minority override
// relative weight of a party among the parties of one minority (default 1)
window.mapMinorityPartyWeight = { musavat: 3, muslim_socialist: 1.5, ittihad: 1.2,
    muslim_sd: 1, dashnak: 5, armenian_populist: 0.1 };
window.mapProvinceMinorities = {
    volhynia: { jews: 13, poles: 6 },
    podolia: { jews: 12, poles: 4 },
    kyiv: { jews: 10, poles: 3 },
    chernigov: { jews: 8, poles: 1 },
    poltava: { jews: 5, poles: 1 },
    kharkov: { jews: 5, poles: 1 },
    yekaterinoslav: { jews: 7, poles: 1 },
    kherson: { jews: 10, poles: 2 },
    taurida: { jews: 3, poles: 1 },
    kars: { jews: 0.5, muslims: 59.5, armenians: 29.8, georgians: 7.9 },
    georgia: { jews: 0.6, muslims: 14.3, armenians: 9.5, georgians: 71.4 },
    azerbaijan: { jews: 1.4, muslims: 80, armenians: 5.9, georgians: 5.9 },
    armenia: { jews: 0.1, muslims: 30, armenians: 56.3, georgians: 6.3 },
    batumi: { jews: 0.6, muslims: 14.3, armenians: 9.5, georgians: 71.4 },
    sukhumi: { jews: 0.6, muslims: 14.3, armenians: 9.5, georgians: 71.4 },
    western_armenia: { jews: 0.1, muslims: 60, armenians: 30, georgians: 0 }
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

// weight of each Menshevik wing in a list, from the base split and current strengths
function wingWeights(list, Q) {
    var strength = {};
    var sum = 0;
    list.forEach(function(x) {
        strength[x] = Math.max(0, Number(Q[window.mapWingStrength[x]]) || 0);
        sum += strength[x];
    });
    var mean = sum / list.length;
    var out = {};
    list.forEach(function(x) {
        out[x] = window.mapWingBase[x] * (mean > 0 ? Math.max(0.05, strength[x] / mean) : 1);
    });
    return out;
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

    if (lp && lp.merge) {
        Object.keys(lp.merge).forEach(function(x) {
            if (support[x] !== undefined && support[lp.merge[x]] !== undefined) {
                support[lp.merge[x]] += support[x];
                delete support[x];
            }
        });
    }
    if (lp && lp.excluded) {
        lp.excluded.forEach(function(x) {
            if (support[x] !== undefined) {
                support.other += support[x];
                delete support[x];
            }
        });
    }

    // 3. local parties take a share of other parties' support, stage by stage
    if (lp) {
        lp.steals.concat((lp.provinceSteals || {})[id] || []).forEach(function(stage) {
            var original = {};
            Object.keys(support).forEach(function(x) { original[x] = support[x]; });
            var taken = {};
            Object.keys(stage).forEach(function(thief) {
                var thieves = thief === 'mensheviks' ?
                    Object.keys(window.mapWingBase).filter(function(w) {
                        return support[w] !== undefined;
                    }) : (support[thief] !== undefined ? [thief] : []);
                if (!thieves.length) {
                    return;
                }
                var split = thief === 'mensheviks' ? wingWeights(thieves, Q) : null;
                var splitTotal = 0;
                thieves.forEach(function(w) { splitTotal += split ? split[w] : 1; });
                Object.keys(stage[thief]).forEach(function(from) {
                    if (original[from] === undefined) {
                        return;
                    }
                    var amount = original[from] * stage[thief][from];
                    thieves.forEach(function(w) {
                        support[w] += amount * (split ? split[w] : 1) / splitTotal;
                    });
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
            var amount = total * (p.minorities[m] / 100) *
                (window.mapMinorityShare[m] !== undefined ?
                    window.mapMinorityShare[m] : window.mapMinorityNationalShare);
            var wing = wingWeights(options2.filter(function(x) {
                return window.mapWingBase[x];
            }), Q);
            var weights = options2.map(function(x) {
                if (window.mapWingBase[x]) {
                    return wing[x];
                }
                // bundists do better in less rural provinces, zionists in more rural ones
                return x === 'bundist' ? 0.25 + 0.6 * urbanShare :
                    x === 'zionist' ? 0.75 - 0.6 * urbanShare :
                    (window.mapMinorityPartyWeight[x] || 1);
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

// move free divisions between provinces without a battle (instant, no adjacency needed):
//   window.mapMoveDivisions('upr', 'podolia', 'poltava', 5)   (count optional = all)
window.mapMoveDivisions = function(faction, fromId, toId, count) {
    if (!knownProvince(fromId, 'mapMoveDivisions') ||
        !knownProvince(toId, 'mapMoveDivisions')) {
        return 0;
    }
    return editMapState(function() {
        var free = divisionsIn(fromId).filter(function(d) {
            return d.owner === faction && !isCommitted(d.id);
        });
        if (count !== undefined && count !== null) {
            free = free.slice(0, Math.max(0, Math.floor(Number(count) || 0)));
        }
        free.forEach(function(d) { d.province = toId; });
        return free.length;
    });
};

// order an attack: mapOrderAttack(faction, from, to, [count])
function orderAttackInner(faction, fromId, toId, count, fraction) {
    if (!areProvincesAdjacent(fromId, toId)) {
        console.warn('mapOrderAttack: ' + fromId + ' and ' + toId + ' are not adjacent');
        return 0;
    }
    if (!isAttackTarget(toId, faction)) {
        console.warn('mapOrderAttack: ' + toId + ' is not an attack target for ' +
            faction + ' (peace, or already its own)');
        return 0;
    }
    var free = divisionsIn(fromId).filter(function(d) {
        return d.owner === faction && !isCommitted(d.id);
    });
    if (fraction !== undefined && fraction !== null) {
        count = Math.ceil(free.length * Number(fraction));
    }
    if (count !== undefined && count !== null) {
        free = free.slice(0, Math.max(0, Math.floor(Number(count) || 0)));
    }
    if (!free.length) {
        return 0;
    }
    window.queueMapAttack(free.map(function(d) { return d.id; }), fromId, toId, 0);
    return free.length;
}

window.mapOrderAttack = function(faction, fromId, toId, count) {
    if (!knownProvince(fromId, 'mapOrderAttack') ||
        !knownProvince(toId, 'mapOrderAttack')) {
        return 0;
    }
    return editMapState(function() {
        return orderAttackInner(faction, fromId, toId, count);
    });
};

// attack and fight the battles straight away. orders: a list of
//   { faction, from, to, count }  or  { faction, from, to, fraction }  (share of the
//   free divisions, rounded up). Attacks on the same province are fought together.
// Returns the battle report (list of lines). Attacks queued earlier are left alone.
window.mapAttackNow = function(orders) {
    return editMapState(function() {
        var pending = window.mapBattles;
        window.mapBattles = [];
        orders.forEach(function(o) {
            if (!window.mapProvinces[o.from] || !window.mapProvinces[o.to]) {
                console.warn('mapAttackNow: unknown province in order', o);
                return;
            }
            orderAttackInner(o.faction, o.from, o.to, o.count, o.fraction);
        });
        var report = window.resolveMapBattles();
        window.mapBattles = pending.filter(function(b) {
            b.ids = b.ids.filter(function(id) {
                return mapDivisionIndex[id] && !mapDivisionIndex[id].dead;
            });
            return b.ids.length > 0;
        });
        return report;
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

// shift the division counter from the middle of a province, as a fraction of its
// width and height (x: right is positive, y: up is negative)
window.mapCounterOffset = { anatolia: [0.25, -0.25] };

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
            var shift = window.mapCounterOffset[provinceId] || [0, 0];
            var localCenter = new DOMPoint(
                bbox.x + bbox.width * (0.5 + shift[0]),
                bbox.y + bbox.height * (0.5 + shift[1])
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

var mapClosing = false;

window.syncMapView = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (!scene.startsWith('map')) {
        mapClosing = false;
        mapFromButton = false;
    }
    if (mapIsOpen() && !scene.startsWith('map')) {
        window.closeMapView();
    } else if (!mapIsOpen() && scene.startsWith('map') && !mapClosing) {
        window.openMapView();
    }
};

var mapFromButton = false;

window.showMap = function() {
    var engine = window.dendryUI.dendryEngine;
    var inMapScene = engine.state.sceneId.startsWith('map');

    if (inMapScene && !mapIsOpen()) {
        mapClosing = false;
        window.openMapView();
        return;
    }

    if (inMapScene) {
        mapClosing = true;
        window.closeMapView();
        if (mapFromButton) {
            mapFromButton = false;
            engine.goToScene('backSpecialScene');
        } else {
            engine.goToScene('root');
        }
        return;
    }

    mapFromButton = true;
    engine.goToScene('map');
    setTimeout(function() {
        if (!mapIsOpen()) {
            window.openMapView();
        }
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




// INDUSTRY SECTION

(function() {

var goods = ['timber', 'coal', 'oil', 'ore', 'materials', 'arms', 'consumer', 'agri', 'machinery', 'transport'];
var sectors = ['military', 'civilian', 'agricultural', 'capital', 'transportation', 'timber', 'coal', 'oil', 'ore', 'materials'];
var finSectors = sectors.slice(0, 5);
var owners = ['large', 'medium', 'small', 'coop', 'nationalized', 'syndicalized'];
var fuelNames = ['timber', 'coal', 'oil'];

var outGood = {
	military: 'arms', civilian: 'consumer', agricultural: 'agri', capital: 'machinery', transportation: 'transport',
	timber: 'timber', coal: 'coal', oil: 'oil', ore: 'ore', materials: 'materials'
};
var legacyShare = {
	military: 'military_industry', civilian: 'civilian_industry', agricultural: 'agricultural_industry',
	capital: 'capital_industry', transportation: 'transportation_industry'
};
var legacyProd = {
	military: 'military_production', civilian: 'civilian_production', agricultural: 'agricultural_industry_production',
	capital: 'capital_production', transportation: 'transportation_production'
};

// price of one unit at game start
var P0 = {
	timber: 0.4, coal: 1, oil: 2, ore: 1, materials: 1,
	arms: 1, consumer: 1, agri: 1, machinery: 1, transport: 1
};

// timber is cheap and weak, oil is expensive and strong
var fuels = {
	timber: { energy: 0.5, grade: 0, share: 0.25 },
	coal: { energy: 1.4, grade: 1, share: 0.55 },
	oil: { energy: 3.0, grade: 2, share: 0.20 }
};

// inputs as a share of output value at start prices
var recipe = {
	military: { raw: { ore: 0.07, materials: 0.06 }, energy: 0.07, goods: { machinery: 0.010, consumer: 0.05 } },
	civilian: { raw: { materials: 0.34, ore: 0.01 }, energy: 0.045, goods: { machinery: 0.008 } },
	agricultural: { raw: { ore: 0.05, materials: 0.18 }, energy: 0.05, goods: { machinery: 0.010 } },
	capital: { raw: { ore: 0.08, materials: 0.07 }, energy: 0.07, goods: { machinery: 0.010 } },
	transportation: { raw: { ore: 0.06, materials: 0.12 }, energy: 0.05, goods: { machinery: 0.010 } },
	timber: { raw: {}, energy: 0.03, goods: { machinery: 0.006 } },
	coal: { raw: {}, energy: 0.05, goods: { machinery: 0.012 } },
	oil: { raw: {}, energy: 0.04, goods: { machinery: 0.025 } },
	ore: { raw: {}, energy: 0.06, goods: { machinery: 0.014 } },
	materials: { raw: {}, energy: 0.03, goods: { machinery: 0.008 } }
};

var own = {
	large: { eff: 1.00, w: 1.00, labour: 0.27, vert: 0.5, free: 0, strike: 1.0, spec: 0.6, dep: 0.0008 },
	medium: { eff: 0.93, w: 0.09, labour: 0.24, vert: 0, free: 0.04, strike: 0.5, spec: 0.3, dep: 0.0010 },
	small: { eff: 0.88, w: 0.008, labour: 0.12, vert: 0, free: 0.30, strike: 0.1, spec: 0, dep: 0.0015 },
	coop: { eff: 0.90, w: 0.05, labour: 0.27, vert: 0, free: 0.08, strike: 0.3, spec: 0.3, dep: 0.0010 },
	nationalized: { eff: 0.90, w: 1.00, labour: 0.27, vert: 0.4, free: 0, strike: 0.6, spec: 1.0, dep: 0.0012 },
	syndicalized: { eff: 0.88, w: 0.60, labour: 0.28, vert: 0.3, free: 0, strike: 0.3, spec: 0.8, dep: 0.0010 }
};

// wage bill multiplier per sector
var labourMult = {
	military: 2.2, civilian: 1.25, agricultural: 1.8, capital: 2.2, transportation: 2.0,
	timber: 3.1, coal: 3.0, oil: 2.7, ore: 3.0, materials: 3.1
};

// number of factories at start
var counts = {
	military: { large: 150, medium: 300, small: 0, coop: 0, nationalized: 120, syndicalized: 0 },
	civilian: { large: 1000, medium: 9000, small: 60000, coop: 2500, nationalized: 30, syndicalized: 0 },
	agricultural: { large: 40, medium: 700, small: 5000, coop: 200, nationalized: 5, syndicalized: 0 },
	capital: { large: 220, medium: 900, small: 2500, coop: 100, nationalized: 50, syndicalized: 0 },
	transportation: { large: 80, medium: 500, small: 1500, coop: 60, nationalized: 300, syndicalized: 0 },
	timber: { large: 150, medium: 4000, small: 30000, coop: 600, nationalized: 40, syndicalized: 0 },
	coal: { large: 250, medium: 150, small: 200, coop: 20, nationalized: 30, syndicalized: 0 },
	oil: { large: 300, medium: 200, small: 100, coop: 0, nationalized: 15, syndicalized: 0 },
	ore: { large: 120, medium: 120, small: 300, coop: 20, nationalized: 40, syndicalized: 0 },
	materials: { large: 350, medium: 2500, small: 20000, coop: 800, nationalized: 20, syndicalized: 0 }
};

// m and x are the import and export share at start, ic and ec the import and export capacity as a share of output
var trade0 = {
	timber: { m: 0, x: 0.10, ic: 0.10, ec: 0.35 },
	coal: { m: 0.12, x: 0, ic: 0.35, ec: 0.05 },
	oil: { m: 0, x: 0.10, ic: 0.10, ec: 0.40 },
	ore: { m: 0.03, x: 0, ic: 0.20, ec: 0.20 },
	materials: { m: 0.10, x: 0, ic: 0.35, ec: 0.25 },
	arms: { m: 0.06, x: 0, ic: 0.20, ec: 0.10 },
	consumer: { m: 0.07, x: 0, ic: 0.30, ec: 0.10 },
	agri: { m: 0.10, x: 0, ic: 0.30, ec: 0.05 },
	machinery: { m: 0.18, x: 0, ic: 0.50, ec: 0.05 },
	transport: { m: 0.05, x: 0, ic: 0.20, ec: 0.05 }
};

var tariff0 = {
	timber: [0, 0], coal: [0, 0], oil: [0, 0], ore: [0.05, 0], materials: [0.10, 0],
	arms: [0.05, 0], consumer: [0.30, 0], agri: [0.10, 0], machinery: [0.10, 0], transport: [0.10, 0]
};

// average workforce of one enterprise
var jobsPer = { large: 750, medium: 70, small: 6, coop: 40, nationalized: 750, syndicalized: 450 };
// urban wage earners, turns jobs lost or filled into points of unemployment
var LABOUR_FORCE = 10000000;
var HIRE_RATE = 0.25;
// how fast enterprises turn over compared with plain wear and tear
var churn = { large: 2.5, medium: 2.5, small: 3, coop: 2.5, nationalized: 1, syndicalized: 2 };
var UNEMPLOYED_FLOOR = 1;

var BUILD = 10;
var SIGMA = 2.5;
var K_GOV = 0.25;

function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
function num(v, d) { v = Number(v); return isFinite(v) ? v : (d === undefined ? 0 : d); }
function engineQ() { return window.dendryUI.dendryEngine.state.qualities; }
function each(list, f) { for (var i = 0; i < list.length; i++) f(list[i], i); }

function struct(I, s, o) { return I.n[s][o] * own[o].w * I.scale[s]; }

// per-unit input quantities for sector s at owner o
function recipeNeeds(I, s, o) {
	var r = recipe[s], ow = own[o];
	var pout = P0[outGood[s]];
	var rawAdj = 1 + ow.vert * 0.5;
	var need = { raw: {}, goods: {}, free: {}, energy: r.energy * pout * rawAdj / I.ep0 };
	for (var g in r.raw) {
		var q = r.raw[g] * pout * rawAdj / P0[g];
		need.raw[g] = q * (1 - ow.free);
		need.free[g] = q * ow.free;
	}
	for (var h in r.goods) need.goods[h] = r.goods[h] * pout * (1 - ow.vert) / P0[h];
	return need;
}

function fuelShares(I, prices, avail, energyTotal) {
	var share = {}, total = 0, f;
	each(fuelNames, function(f) {
		share[f] = I.theta[f] * Math.pow(fuels[f].energy / prices[f], SIGMA);
		total += share[f];
	});
	var qty = {}, left = energyTotal, open = fuelNames.slice();
	each(fuelNames, function(f) { qty[f] = 0; });
	for (var pass = 0; pass < 4 && left > 1e-9 && open.length; pass++) {
		var sum = 0;
		each(open, function(f) { sum += share[f]; });
		var next = [], used = 0;
		each(open, function(f) {
			var want = left * share[f] / sum / fuels[f].energy;
			var room = Math.max(0, avail[f] - qty[f]);
			var take = Math.min(want, room);
			qty[f] += take;
			used += take * fuels[f].energy;
			if (room > want + 1e-9) next.push(f);
		});
		left -= used;
		open = next;
	}
	return qty;
}

// find price, trade and fill for one good
function clearGood(I, g, S0, fixed, spend, tar) {
	var p = I.price[g], T = trade0[g];
	var pimp = I.world[g] * (1 + tar.imp[g]) * (1 + I.freight);
	var pexp = I.world[g] * (1 - tar.exp[g]) * (1 - I.freight);
	var capI = T.ic * I.o0[g] * I.access, capX = T.ec * I.o0[g] * I.access;
	// regular trade follows the price gap, extra trade only covers shortages and gluts
	var Ms = T.m > 0 ? Math.min(capI, T.m * I.o0[g] * Math.pow(clamp(p / pimp, 0.3, 2.5), 2)) : 0;
	var Xs = T.x > 0 ? Math.min(capX, T.x * I.o0[g] * Math.pow(clamp(pexp / p, 0.3, 2.5), 2)) : 0;
	var S = S0 + Ms - Xs;
	capI -= Ms;
	capX -= Xs;
	var dem = function(x) { return fixed + spend / x; };
	var ratio = dem(p) / Math.max(S, 1e-6);
	var pu = clamp(p * (1 + 0.25 * (ratio - 1)), p * 0.88, p * 1.12);
	pu = clamp(pu, P0[g] * 0.2, P0[g] * 6);
	var np = pu;
	if (capI > 0 && pu > pimp) {
		np = (dem(pimp) - S <= capI) ? pimp : pu;
	} else if (capX > 0 && pu < pexp) {
		np = (S - dem(pexp) <= capX) ? pexp : pu;
	}
	var M = 0, X = 0;
	if (capI > 0 && np >= pimp * 0.999) M = Math.min(capI, Math.max(0, dem(np) - S));
	if (capX > 0 && np <= pexp * 1.001) X = Math.min(capX, Math.max(0, S - dem(np)));
	M += Ms;
	X += Xs;
	var d = dem(np);
	var supply = S0 + M - X;
	return {
		p: np, M: M, X: X, demand: d, supply: supply,
		fill: d > 1e-9 ? Math.min(1, supply / d) : 1,
		duty: M * I.world[g] * tar.imp[g] + X * I.world[g] * tar.exp[g]
	};
}

function tariffs(Q) {
	var t = { imp: {}, exp: {} };
	each(goods, function(g) {
		t.imp[g] = Math.max(0, num(Q['tariff_imp_' + g]));
		t.exp[g] = clamp(num(Q['tariff_exp_' + g]), 0, 0.9);
	});
	return t;
}

function strikeFactor(Q, o) {
	return 1 - 0.35 * (num(Q.workers_unrest) / 100) * (num(Q.workers_strength) / 100) * own[o].strike;
}
function specFactor(Q, o) {
	var s = own[o].spec;
	return (1 - s) + s * num(Q.specialist_capacity, 70) / 100;
}

function efficacy(Q, I, s, o, grade) {
	var real = clamp(num(Q.industry_realization, I.base.real) / I.base.real, 0.3, 1.5);
	var e = own[o].eff * real * (strikeFactor(Q, o) / I.base.strike[o]) * (specFactor(Q, o) / I.base.spec[o]);
	e *= 1 + 0.05 * (grade - I.base.grade);
	e *= I.tech[s] || 1;
	if (o === 'nationalized') e *= 1 + 0.04 * (I.fund[s] || 0);
	return e * disruptFactor(I, s, o);
}

function structEff(I, s, o) { return own[o].eff * (I.tech[s] || 1); }

// LABOUR
function jobsTotal(I) {
	var jobs = 0;
	each(sectors, function(s) { each(owners, function(o) { jobs += I.n[s][o] * jobsPer[o] * (0.6 + 0.4 * clamp(I.util[s][o], 0, 1.05)); }); });
	return jobs;
}
// closures lay workers off at once, new jobs fill gradually from the unemployed
function labourStep(Q, I) {
	var jobs = jobsTotal(I);
	if (I.employed === undefined) I.employed = jobs;
	var rate = num(Q.unemployed);
	if (I.employed > jobs) {
		rate += (I.employed - jobs) / LABOUR_FORCE * 100;
		I.employed = jobs;
	} else {
		var pool = Math.max(0, rate - UNEMPLOYED_FLOOR) / 100 * LABOUR_FORCE;
		var hires = Math.min((jobs - I.employed) * HIRE_RATE, pool);
		rate -= hires / LABOUR_FORCE * 100;
		I.employed += hires;
	}
	Q.unemployed = Math.round(rate * 100) / 100;
	I.jobs = jobs;
	return jobs > 0 ? I.employed / jobs : 1;
}

// DISRUPTION
// temporary loss of efficacy that fades out over a number of weeks
function disrupt(I, s, o, amount, weeks) {
	if (!(amount > 0) || !(weeks > 0)) return;
	I.disrupt = I.disrupt || [];
	I.disrupt.push({ s: s, o: o, amount: clamp(amount, 0, 0.95), weeks: weeks, left: weeks });
}
// only the capacity that changed hands is disrupted, so the hit is diluted across the group
function disruptMoved(I, s, o, moved, amount, weeks) {
	var have = struct(I, s, o);
	if (have > 0 && moved > 0) disrupt(I, s, o, amount * Math.min(1, moved / have), weeks);
}
function disruptFactor(I, s, o) {
	var f = 1;
	each(I.disrupt || [], function(d) {
		if (d.s === s && d.o === o) f *= 1 - d.amount * d.left / d.weeks;
	});
	return f;
}

// BUSINESS CLIMATE
// multipliers on the weekly rate of openings and closures for one group of enterprises
function climate(Q, I, s, o, m, m0) {
	if (o === 'nationalized') {
		var fund = I.fund[s] || 0;
		return { open: 1 + 0.9 * fund, close: Math.max(0.4, 1 - 0.3 * fund) * (1 + Math.max(0, num(Q.instability) - 30) / 200) };
	}
	var squeeze = m0 === undefined ? 0 : (m - m0) / 0.1;
	var last = I.last.groups && I.last.groups[s] && I.last.groups[s][o];
	var shortage = last ? 1 - last.sat : 0;
	var instab = (num(Q.instability) - 30) / 40;
	var inflation = Math.max(0, num(Q.monthly_inflation) - 5) / 20;
	var tax = (o === 'large' || o === 'medium' || o === 'small') ? 0.3 * (num(Q.business_tax_rate, 1) - 1) : 0;
	var machinery = I.price.machinery / P0.machinery - 1;
	var flight = o === 'large' ? 0.05 * num(Q.capital_flight_progress) : 0;
	var close = 1 + 1.5 * Math.max(0, -squeeze) + 2 * shortage + instab + inflation + tax + flight + (Math.random() - 0.5) * 0.6;
	var open = 1 + 1.2 * clamp(squeeze, -1, 1.5) - instab * 0.66 - tax - 0.5 * machinery - flight + (Math.random() - 0.5) * 0.6;
	return { open: clamp(open, 0, 3), close: clamp(close, 0.3, 6) };
}

// OWNERSHIP SHIFTS
function moveCapacity(I, s, from, to, cap) {
	var have = struct(I, s, from);
	cap = Math.min(cap, have);
	if (cap <= 0) return 0;
	I.n[s][from] -= cap / (own[from].w * I.scale[s]);
	I.n[s][to] += cap / (own[to].w * I.scale[s]);
	return cap;
}

function percentOwned(I, o) {
	var a = 0, b = 0;
	each(finSectors, function(s) {
		each(owners, function(x) { var c = struct(I, s, x); b += c; if (x === o) a += c; });
	});
	return b > 0 ? 100 * a / b : 0;
}

function shiftPercent(I, o, target) {
	var cur = percentOwned(I, o), delta = target - cur;
	if (Math.abs(delta) < 0.001) return;
	var total = 0;
	each(finSectors, function(s) { each(owners, function(x) { total += struct(I, s, x); }); });
	if (delta < 0) {
		var keep = Math.max(0, target) / cur;
		each(finSectors, function(s) {
			var c = struct(I, s, o) * (1 - keep);
			moveCapacity(I, s, o, 'large', c * 0.7);
			moveCapacity(I, s, o, 'medium', c * 0.3);
		});
		return;
	}
	var src = o === 'nationalized' ? { large: 0.6, medium: 0.3, small: 0.1 } : { large: 0.7, medium: 0.3 };
	var pool = {}, poolTotal = 0;
	each(finSectors, function(s) {
		pool[s] = 0;
		for (var k in src) pool[s] += struct(I, s, k);
		poolTotal += pool[s];
	});
	var want = Math.min(delta / 100 * total, poolTotal);
	each(finSectors, function(s) {
		var take = want * pool[s] / poolTotal;
		for (var k in src) moveCapacity(I, s, k, o, take * struct(I, s, k) / pool[s]);
	});
}

// state enterprise accounts at start prices, same formulas as the weekly step
function natAccounts(I, Q) {
	var e = { revenue: 0, wages: 0, inputs: 0, investment: 0, admin: 0, funding: 0 };
	each(sectors, function(s) {
		var cap = struct(I, s, 'nationalized');
		if (cap <= 0) return;
		var nd = recipeNeeds(I, s, 'nationalized'), pout = P0[outGood[s]];
		var rev = cap * structEff(I, s, 'nationalized') * pout;
		var inp = nd.energy * I.ep0;
		for (var g in nd.raw) inp += nd.raw[g] * P0[g];
		for (var h in nd.goods) inp += nd.goods[h] * P0[h];
		e.revenue += rev;
		e.wages += cap * own.nationalized.labour * (labourMult[s] || 1) * pout;
		e.inputs += cap * inp;
		e.investment += cap * own.nationalized.dep * BUILD * P0.machinery;
		e.admin += rev * 0.04 * (1 + num(Q.sovnarkom_corruption));
	});
	return e;
}

// INIT
window.industryInit = function(Q) {
	Q = Q || engineQ();
	var I = { n: {}, util: {}, margin: {}, margin0: {}, scale: {}, price: {}, world: {}, stock: {}, o0: {}, v0: {}, spend: {}, tech: {}, fund: {}, subsidy: {}, plan: {}, mult: {}, theta: {}, inc: {}, inc0: null, last: {}, base: { strike: {}, spec: {} } };

	var share = {}, shareTotal = 0;
	each(finSectors, function(s) { share[s] = num(Q[legacyShare[s]]); shareTotal += share[s]; });
	if (shareTotal <= 0) { share = { military: 38, civilian: 42, agricultural: 1, capital: 3, transportation: 16 }; shareTotal = 100; }
	var industry0 = num(Q.industry, 100) || 100;

	each(sectors, function(s) {
		I.n[s] = {}; I.util[s] = {}; I.margin[s] = {};
		each(owners, function(o) { I.n[s][o] = counts[s][o]; I.util[s][o] = 1; I.margin[s][o] = 0; });
		I.tech[s] = 1; I.fund[s] = 0; I.subsidy[s] = 0; I.plan[s] = 1;
		I.scale[s] = 1;
	});
	each(goods, function(g) { I.price[g] = P0[g]; I.mult[g] = 1; });

	// energy price per unit at start
	var ep = 0;
	each(fuelNames, function(f) { ep += fuels[f].share * P0[f] / fuels[f].energy; });
	I.ep0 = ep;
	var tsum = 0;
	each(fuelNames, function(f) {
		I.theta[f] = fuels[f].share / Math.pow(fuels[f].energy / P0[f], SIGMA);
		tsum += I.theta[f];
	});
	each(fuelNames, function(f) { I.theta[f] /= tsum; });

	I.freight = 0.05;
	I.access = 1;
	I.wage = 1;

	// finished sector scales so that capacity matches the old industry index
	each(finSectors, function(s) {
		var c = share[s] / shareTotal * industry0, w = 0;
		each(owners, function(o) { w += counts[s][o] * own[o].w * structEff(I, s, o); });
		I.scale[s] = w > 0 ? c / w : 0;
	});
	each(['nationalized', 'syndicalized'], function(o) {
		var key = o === 'nationalized' ? 'industries_nationalized' : 'industries_syndicalized';
		if (Q[key] !== undefined) shiftPercent(I, o, num(Q[key]));
	});
	each(finSectors, function(s) {
		var c = share[s] / shareTotal * industry0, w = 0;
		each(owners, function(o) { w += struct(I, s, o) * structEff(I, s, o); });
		if (w > 0) I.scale[s] *= c / w;
	});

	// extraction scales come from what the factories need
	var rawSectors = sectors.slice(5), pass;
	each(rawSectors, function(s) { I.scale[s] = 0.01; });
	for (pass = 0; pass < 60; pass++) {
		var d = initialDemand(I);
		each(rawSectors, function(s) {
			var g = outGood[s], T = trade0[g], w = 0;
			each(owners, function(o) { w += counts[s][o] * own[o].w * structEff(I, s, o); });
			var target = d.D[g] * (1 - T.m + T.x);
			I.scale[s] = w > 0 ? target / w : 0;
		});
	}
	var d0 = initialDemand(I);
	each(goods, function(g) {
		var o = 0, s;
		for (s in outGood) if (outGood[s] === g) {
			each(owners, function(x) { o += struct(I, s, x) * structEff(I, s, x); });
		}
		I.o0[g] = o;
		var T = trade0[g];
		var total = o * (1 + T.m - T.x);
		I.v0[g] = Math.max(0, total - d0.D[g]) * P0[g];
		if (g === 'timber' || g === 'coal' || g === 'oil' || g === 'ore' || g === 'materials') I.v0[g] = 0;
		I.stock[g] = o;
		var imp = tariff0[g][0], exp = tariff0[g][1];
		I.world[g] = T.x > 0 ? P0[g] / ((1 - exp) * (1 - I.freight)) : P0[g] / ((1 + imp) * (1 + I.freight));
		if (Q['tariff_imp_' + g] === undefined) Q['tariff_imp_' + g] = tariff0[g][0];
		if (Q['tariff_exp_' + g] === undefined) Q['tariff_exp_' + g] = tariff0[g][1];
	});

	I.base.real = num(Q.industry_realization, 0.75) || 0.75;
	I.base.instab = num(Q.instability);
	each(owners, function(o) {
		I.base.strike[o] = strikeFactor(Q, o);
		I.base.spec[o] = specFactor(Q, o);
	});
	var grade = 0, etot = 0;
	each(fuelNames, function(f) { grade += fuels[f].share * fuels[f].grade; });
	I.base.grade = grade;
	I.base.customs = num(Q.customs);
	I.base.enterprises = num(Q.enterprises_revenue);
	I.base.elites_business = num(Q.elites_business, 25);
	I.base.middle_business = num(Q.middle_business, 75);
	I.base.military_expend = Math.max(0.25, num(Q.military_expend, 1));
	I.base.railways_expend = Math.max(0.25, num(Q.railways_expend, 1));
	I.base.income = 0;
	I.base.ag = null;
	I.duty0 = null;
	I.ent = natAccounts(I, Q);
	I.entK = I.base.enterprises > 0 && I.ent.revenue > 0 ? I.base.enterprises / I.ent.revenue : K_GOV;
	I.levy = 0;
	I.subsidyPaid = 0;
	I.conv = { agri: 0, machinery: 0 };
	I.spendAg = null;

	// conversion so agriculture sees the same supply as before at start
	var agProd = share.agricultural / shareTotal * industry0;
	var capProd = share.capital / shareTotal * industry0;
	var vAgri = I.v0.agri / P0.agri, vMach = I.v0.machinery / P0.machinery;
	I.conv.agri = vAgri > 0 ? (agProd / 40) / vAgri : 0;
	I.conv.machinery = vMach > 0 ? ((agProd + capProd) / 120) / vMach : 0;
	I.ref = industry0;
	I.deliver = { agri: vAgri, machinery: vMach };

	I.last_nat = num(Q.industries_nationalized);
	I.last_synd = num(Q.industries_syndicalized);
	Q.ind = I;
	window.industryMirror(Q);
	return I;
};

// demand at full utilisation, used for calibration
function initialDemand(I) {
	var D = {}, energy = 0;
	each(goods, function(g) { D[g] = 0; });
	each(sectors, function(s) {
		each(owners, function(o) {
			var t = struct(I, s, o);
			if (t <= 0) return;
			var nd = recipeNeeds(I, s, o);
			for (var g in nd.raw) D[g] += t * nd.raw[g];
			for (var h in nd.goods) D[h] += t * nd.goods[h];
			energy += t * nd.energy;
			D.machinery += t * own[o].dep * BUILD;
		});
	});
	each(fuelNames, function(f) { D[f] += fuels[f].share * energy / fuels[f].energy; });
	return { D: D, energy: energy };
}

// WEEKLY STEP
window.industryWeek = function(Q) {
	Q = Q || engineQ();
	if (!Q.ind) window.industryInit(Q);
	var I = Q.ind;
	var tar = tariffs(Q);
	var s, o, g, f;

	var grade = 0, eTot = 0;
	each(fuelNames, function(f) { eTot += (I.lastFuel ? I.lastFuel[f] : 0) * fuels[f].energy; });
	if (eTot > 0) each(fuelNames, function(f) { grade += I.lastFuel[f] * fuels[f].energy * fuels[f].grade / eTot; });
	else grade = I.base.grade;

	var staff = labourStep(Q, I);

	// utilisation from last week's margins
	var rows = [];
	each(sectors, function(s) {
		each(owners, function(o) {
			var n = I.n[s][o];
			if (n <= 0) return;
			var key = s + o, u = I.util[s][o], m = I.margin[s][o], m0 = I.margin0[key];
			if (o === 'nationalized') u = I.plan[s];
			else {
				var floor = o === 'small' ? 0.7 : (o === 'coop' || o === 'syndicalized') ? 0.6 : 0.3;
				var goal = m0 === undefined ? 1 : clamp(1 + (m - m0), floor, o === 'small' ? 1 : 1.05);
				u += 0.2 * (goal - u);
			}
			I.util[s][o] = u;
			var cap = struct(I, s, o);
			var nd = recipeNeeds(I, s, o);
			var eff = efficacy(Q, I, s, o, grade);
			var cl = climate(Q, I, s, o, m, m0);
			rows.push({ s: s, o: o, cap: cap, t: cap * u, u: u, eff: eff * staff, nd: nd, build: cap * own[o].dep * cl.open * BUILD, close: cl.close });
		});
	});

	// fuel allocation
	var energyTotal = 0;
	each(rows, function(r) { energyTotal += r.t * r.nd.energy; });
	var avail = {};
	each(fuelNames, function(f) { avail[f] = I.stock[f] + trade0[f].ic * I.o0[f] * I.access; });
	var fuelQty = fuelShares(I, I.price, avail, energyTotal);

	// demand per good
	var fixedD = {};
	each(goods, function(g) { fixedD[g] = 0; });
	each(rows, function(r) {
		for (var g in r.nd.raw) fixedD[g] += r.t * r.nd.raw[g];
		for (var h in r.nd.goods) fixedD[h] += r.t * r.nd.goods[h];
		fixedD.machinery += r.build;
	});
	each(fuelNames, function(f) { fixedD[f] += fuelQty[f]; });

	var spend = {};
	each(goods, function(g) { spend[g] = I.v0[g] * (I.mult[g] || 1); });
	spend.arms *= Math.max(0.25, num(Q.military_expend, 1)) / I.base.military_expend;
	spend.transport *= Math.max(0.25, num(Q.railways_expend, 1)) / I.base.railways_expend;
	spend.consumer *= Math.sqrt(incomeIndex(Q, I));
	if (I.spendAg) {
		if (!I.base.ag) I.base.ag = { agri: Math.max(I.spendAg.agri, 1e-9), machinery: Math.max(I.spendAg.machinery, 1e-9) };
		spend.agri *= I.spendAg.agri / I.base.ag.agri;
		spend.machinery *= I.spendAg.machinery / I.base.ag.machinery;
	}

	// markets
	var mk = {}, dutyTotal = 0, imports = {}, exports = {};
	each(goods, function(g) {
		mk[g] = clearGood(I, g, I.stock[g], fixedD[g], spend[g], tar);
		dutyTotal += mk[g].duty;
		imports[g] = mk[g].M;
		exports[g] = mk[g].X;
	});

	// energy fill and average energy price
	var eAsk = 0, eGot = 0, eCost = 0;
	each(fuelNames, function(f) {
		eAsk += fuelQty[f] * fuels[f].energy;
		eGot += fuelQty[f] * mk[f].fill * fuels[f].energy;
		eCost += fuelQty[f] * mk[f].p;
	});
	var energyFill = eAsk > 0 ? eGot / eAsk : 1;
	var energyPrice = eAsk > 0 ? eCost / eAsk : I.ep0;

	// production and money
	var used = {}, out = {}, groups = {}, cls = { elites: 0, middle: 0, workers: 0, state: 0 };
	var ent = { revenue: 0, wages: 0, inputs: 0, investment: 0, admin: 0, funding: 0 }, levyTotal = 0, opened = {}, closed = {};
	var wageTotal = 0, subsidyTotal = 0, fuelUsed = { timber: 0, coal: 0, oil: 0 }, energyUsed = 0;
	var potential = 0, actual = 0;
	each(goods, function(g) { used[g] = 0; out[g] = 0; });
	each(rows, function(r) {
		var sat = 1, g;
		for (g in r.nd.raw) {
			var tot = r.nd.raw[g] + r.nd.free[g];
			var fr = tot > 0 ? (r.nd.free[g] + r.nd.raw[g] * mk[g].fill) / tot : 1;
			sat = Math.min(sat, fr);
		}
		for (g in r.nd.goods) sat = Math.min(sat, mk[g].fill);
		if (r.nd.energy > 0) sat = Math.min(sat, energyFill);
		r.sat = sat;
		var production = r.t * r.eff * sat;
		var og = outGood[r.s];
		out[og] += production;
		var cost = 0;
		for (g in r.nd.raw) { var q = r.t * r.nd.raw[g] * sat; used[g] += q; cost += q * mk[g].p; }
		for (g in r.nd.goods) { var q2 = r.t * r.nd.goods[g] * sat; used[g] += q2; cost += q2 * mk[g].p; }
		var eUse = r.t * r.nd.energy * sat;
		energyUsed += eUse;
		cost += eUse * energyPrice;
		var fillM = mk.machinery.fill;
		var buildUnits = r.build * fillM;
		used.machinery += buildUnits;
		var buildCost = buildUnits * mk.machinery.p;
		var wages = r.t * own[r.o].labour * (labourMult[r.s] || 1) * P0[og] * I.wage;
		var revenue = production * mk[og].p;
		var sub = r.o === 'nationalized' ? 0 : (I.subsidy[r.s] || 0) * revenue;
		var admin = r.o === 'nationalized' ? revenue * 0.04 * (1 + num(Q.sovnarkom_corruption)) : 0;
		var funding = r.o === 'nationalized' ? revenue * 0.02 * (I.fund[r.s] || 0) : 0;
		var profit = revenue + sub - cost - wages - buildCost - admin - funding;
		if (r.o === 'nationalized') {
			ent.revenue += revenue; ent.wages += wages; ent.inputs += cost;
			ent.investment += buildCost; ent.admin += admin; ent.funding += funding;
		}
		var base = Math.max(1e-9, r.t * P0[og]);
		var margin = profit / base;
		var mkey = r.s + r.o;
		if (I.margin0[mkey] === undefined) { I.margin0[mkey] = margin; I.margin[r.s][r.o] = margin; }
		else I.margin[r.s][r.o] = I.margin[r.s][r.o] * 0.7 + margin * 0.3;
		// capacity change
		var opening = buildUnits / BUILD / (own[r.o].w * I.scale[r.s]) * churn[r.o];
		var closing = I.n[r.s][r.o] * own[r.o].dep * churn[r.o] * r.close;
		I.n[r.s][r.o] += opening - closing;
		opened[r.o] = (opened[r.o] || 0) + opening;
		closed[r.o] = (closed[r.o] || 0) + closing;
		wageTotal += wages;
		subsidyTotal += sub;
		if (finSectors.indexOf(r.s) >= 0) { potential += r.cap * structEff(I, r.s, r.o); actual += r.cap * structEff(I, r.s, r.o) * sat * r.u; }
		var key = r.s;
		groups[key] = groups[key] || {};
		groups[key][r.o] = { out: production, revenue: revenue, cost: cost + buildCost + admin + funding, wages: wages, profit: profit, sat: sat, u: r.u };
		if (r.o === 'large') cls.elites += profit;
		else if (r.o === 'medium' || r.o === 'small') cls.middle += profit;
		else if (r.o === 'coop') cls.workers += profit;
		else if (r.o === 'syndicalized') {
			var levy = Math.max(0, profit) * clamp(num(Q.syndicate_levy_rate, 15) / 100, 0, 0.9);
			levyTotal += levy;
			cls.workers += profit - levy;
		}
		else cls.state += profit;
		cls.workers += wages;
	});

	// fuel use by type
	each(fuelNames, function(f) {
		var q = eAsk > 0 ? fuelQty[f] * Math.min(1, energyUsed / eAsk) : 0;
		used[f] += q;
		fuelUsed[f] = q;
	});

	// final consumption and stocks
	var consumed = {};
	each(goods, function(g) {
		var m = mk[g];
		var fin = spend[g] > 0 ? m.fill * spend[g] / m.p : 0;
		consumed[g] = fin;
		var left = Math.max(0, m.supply - used[g] - fin);
		var keep = g === 'timber' || g === 'coal' || g === 'oil' || g === 'ore' || g === 'materials' ? 0.6 : 0.5;
		I.stock[g] = left * keep + out[g];
		I.price[g] = m.p;
	});
	I.lastFuel = fuelUsed;

	// wages and prices
	var pc = I.price.consumer / P0.consumer;
	I.wage = clamp(I.wage + 0.08 * (pc - I.wage) + 0.0004 * (num(Q.workers_unrest) * num(Q.workers_strength) / 2500 - 0.8), 0.5, 4);

	// incomes
	var real = { elites: cls.elites / pc, middle: cls.middle / pc, workers: cls.workers / pc, state: cls.state };
	if (!I.inc0) {
		I.inc0 = { elites: Math.max(real.elites, 1e-6), middle: Math.max(real.middle, 1e-6), workers: Math.max(real.workers, 1e-6) };
		I.inc = { elites: real.elites, middle: real.middle, workers: real.workers };
		I.duty0 = dutyTotal;
	}
	each(['elites', 'middle', 'workers'], function(c) {
		I.inc[c] = I.inc[c] * 0.85 + real[c] * 0.15;
		var rel = I.inc[c] / I.inc0[c];
		var key = c + '_wealth';
		if (Q[key] !== undefined) Q[key] *= 1 + 0.004 * clamp(rel - 1, -1.5, 1.5);
	});
	I.ent = ent;
	I.levy = levyTotal;
	I.duty = dutyTotal;
	I.subsidyPaid = subsidyTotal;

	// shortages hurt
	var cf = mk.consumer.fill;
	if (cf < 0.9) {
		Q.workers_unrest = Math.min(100, num(Q.workers_unrest) + (0.9 - cf) * 1.5);
		Q.middle_unrest = Math.min(100, num(Q.middle_unrest) + (0.9 - cf) * 1.0);
	}

	// ag delivery in goods units
	I.deliver = { agri: consumed.agri, machinery: consumed.machinery };

	I.fillAvg = potential > 0 ? actual / potential : 1;
	I.last = {
		out: out, imports: imports, exports: exports, groups: groups, wages: wageTotal,
		fill: {}, price: {}, energyFill: energyFill, duty: dutyTotal, opened: opened, closed: closed
	};
	each(goods, function(g) { I.last.fill[g] = mk[g].fill; I.last.price[g] = mk[g].p; });
	I.disrupt = (I.disrupt || []).filter(function(d) { d.left -= 1; return d.left > 0; });
	window.industryMirror(Q);
};

function incomeIndex(Q, I) {
	var classes = ['elites', 'middle', 'workers', 'intelligentsia', 'peasants', 'kulaks'];
	var now = 0;
	each(classes, function(c) { now += num(Q[c]) * Math.max(0, num(Q[c + '_wealth'])); });
	if (!I.base.income) I.base.income = Math.max(now, 1e-9);
	return clamp(now / I.base.income, 0.3, 3);
}

// LEGACY VARIABLES
window.industryDerive = function(Q) {
	Q = Q || engineQ();
	if (!Q.ind) window.industryInit(Q);
	var I = Q.ind;

	// events that still change these two directly are treated as orders
	var nat = num(Q.industries_nationalized), syn = num(Q.industries_syndicalized);
	if (Math.abs(nat - I.last_nat) > 0.005) shiftPercent(I, 'nationalized', nat);
	if (Math.abs(syn - I.last_synd) > 0.005) shiftPercent(I, 'syndicalized', syn);

	var cap = 0, total = {};
	each(finSectors, function(s) {
		total[s] = 0;
		each(owners, function(o) { total[s] += struct(I, s, o) * structEff(I, s, o); });
		cap += total[s];
	});
	var fill = I.fillAvg === undefined ? 1 : I.fillAvg;
	Q.industry = cap * fill;
	each(finSectors, function(s) {
		Q[legacyShare[s]] = cap > 0 ? total[s] / cap * 100 : 0;
		var g = outGood[s];
		Q[legacyProd[s]] = I.last.out ? I.last.out[g] : I.o0[g];
	});
	// mining only, timber and materials are counted under agriculture
	var ex = 0, ex0 = 0;
	each(['coal', 'oil', 'ore'], function(g) {
		ex += (I.last.out ? I.last.out[g] : I.o0[g]) * P0[g];
		ex0 += I.o0[g] * P0[g];
	});
	Q.extraction = ex0 > 0 ? Math.round(ex / ex0 * 1000) / 10 : 100;
	Q.industries_nationalized = Math.round(percentOwned(I, 'nationalized') * 100) / 100;
	Q.industries_syndicalized = Math.round(percentOwned(I, 'syndicalized') * 100) / 100;
	I.last_nat = Q.industries_nationalized;
	I.last_synd = Q.industries_syndicalized;

	// state income and enterprise accounts
	var k = I.entK, e = I.ent, r3 = function(x) { return Math.round(x * 1000) / 1000; };
	if (I.duty0 === null) {
		Q.customs = I.base.customs;
	} else {
		Q.customs = I.duty0 > 1e-9 && I.base.customs > 0 ? I.base.customs * (I.duty / I.duty0) : I.duty * K_GOV;
		Q.elites_business = I.base.elites_business * clamp(I.inc.elites / I.inc0.elites, 0, 3);
		Q.middle_business = I.base.middle_business * clamp(I.inc.middle / I.inc0.middle, 0, 3);
	}
	Q.enterprises_revenue = r3(Math.max(0, k * e.revenue));
	Q.enterprises_wages = r3(k * e.wages);
	Q.enterprises_inputs = r3(k * e.inputs);
	Q.enterprises_investment = r3(k * e.investment);
	Q.enterprises_admin = r3(k * e.admin);
	Q.enterprises_funding = r3(k * e.funding);
	Q.enterprises_expenditure = r3(Q.enterprises_wages + Q.enterprises_inputs + Q.enterprises_investment + Q.enterprises_admin + Q.enterprises_funding);
	Q.enterprises_net = r3(Q.enterprises_revenue - Q.enterprises_expenditure);
	Q.syndicate_levy = r3(k * (I.levy || 0));
	Q.ind_subsidies = r3(k * (I.subsidyPaid || 0));
	Q.customs = r3(Q.customs);
};

window.industryMirror = function(Q) {
	Q = Q || engineQ();
	var I = Q.ind;
	each(goods, function(g) {
		Q['ind_price_' + g] = Math.round(I.price[g] / P0[g] * 100) / 100;
		Q['ind_fill_' + g] = I.last.fill ? Math.round(I.last.fill[g] * 100) / 100 : 1;
		Q['ind_out_' + g] = I.last.out ? Math.round(I.last.out[g] * 100) / 100 : Math.round(I.o0[g] * 100) / 100;
	});
	Q.ind_energy_fill = I.last.energyFill === undefined ? 1 : Math.round(I.last.energyFill * 100) / 100;
	// trade is shown in budget units so it lines up with customs
	var duty0 = I.duty0;
	if (!(duty0 > 1e-9)) {
		duty0 = 0;
		each(goods, function(g) {
			duty0 += I.o0[g] * I.world[g] * (trade0[g].m * num(Q['tariff_imp_' + g]) + trade0[g].x * num(Q['tariff_exp_' + g]));
		});
	}
	var k = duty0 > 1e-9 && I.base.customs > 0 ? I.base.customs / duty0 : K_GOV;
	var impValue = 0, expValue = 0;
	each(goods, function(g) {
		var m = I.last.imports ? I.last.imports[g] : I.o0[g] * trade0[g].m;
		var x = I.last.exports ? I.last.exports[g] : I.o0[g] * trade0[g].x;
		Q['ind_imp_' + g] = Math.round(m * 100) / 100;
		Q['ind_exp_' + g] = Math.round(x * 100) / 100;
		Q['ind_imp_value_' + g] = Math.round(m * I.world[g] * k * 1000) / 1000;
		Q['ind_exp_value_' + g] = Math.round(x * I.world[g] * k * 1000) / 1000;
		impValue += m * I.world[g] * k;
		expValue += x * I.world[g] * k;
	});
	Q.ind_imports = Math.round(impValue * 100) / 100;
	Q.ind_exports = Math.round(expValue * 100) / 100;
	Q.ind_trade_balance = Math.round((expValue - impValue) * 100) / 100;
	Q.ind_access = I.access;
	var jobs = jobsTotal(I), employed = I.employed === undefined ? jobs : Math.min(I.employed, jobs);
	Q.ind_jobs = Math.round(jobs / 1000);
	Q.ind_employed = Math.round(employed / 1000);
	Q.ind_vacancies = Math.round((jobs - employed) / 1000);
	Q.ind_opened = 0; Q.ind_closed = 0;
	each(owners, function(o) {
		Q['ind_opened_' + o] = Math.round(I.last.opened ? I.last.opened[o] || 0 : 0);
		Q['ind_closed_' + o] = Math.round(I.last.closed ? I.last.closed[o] || 0 : 0);
		Q.ind_opened += Q['ind_opened_' + o];
		Q.ind_closed += Q['ind_closed_' + o];
	});
};

// AGRICULTURE LINK
// agriculture reads what the industry delivered and reports what it spent
window.industrySupplyToAg = function(Q) {
	Q = Q || engineQ();
	var I = Q.ind;
	return {
		inputs: I.deliver.agri * I.conv.agri,
		capital: I.deliver.machinery * I.conv.machinery,
		inputs_price: I.price.agri / P0.agri,
		capital_price: I.price.machinery / P0.machinery
	};
};
window.industryAgSpend = function(Q, inputsMoney, capitalMoney) {
	Q = Q || engineQ();
	Q.ind.spendAg = { agri: Math.max(inputsMoney, 1e-9), machinery: Math.max(capitalMoney, 1e-9) };
};

// EVENT HELPERS
window.facAdd = function(sector, owner, count) {
	var I = engineQ().ind;
	I.n[sector][owner] = Math.max(0, I.n[sector][owner] + count);
};
window.facMove = function(sector, from, to, count) {
	var I = engineQ().ind;
	count = Math.min(count, I.n[sector][from]);
	var cap = count * own[from].w * I.scale[sector];
	moveCapacity(I, sector, from, to, cap);
};
window.facMoveShare = function(sector, from, to, share, amount, weeks) {
	var I = engineQ().ind;
	var moved = moveCapacity(I, sector, from, to, struct(I, sector, from) * clamp(share, 0, 1));
	disruptMoved(I, sector, to, moved, amount, weeks);
};
window.facNationalize = function(sector, share, amount, weeks) {
	var list = sector === 'all' ? sectors : [sector];
	each(list, function(s) {
		window.facMoveShare(s, 'large', 'nationalized', share, amount, weeks);
		window.facMoveShare(s, 'medium', 'nationalized', share * 0.5, amount, weeks);
	});
};
window.facSyndicalize = function(sector, share, amount, weeks) {
	var list = sector === 'all' ? sectors : [sector];
	each(list, function(s) {
		window.facMoveShare(s, 'large', 'syndicalized', share, amount, weeks);
		window.facMoveShare(s, 'nationalized', 'syndicalized', share, amount, weeks);
	});
};
// closed plants are remembered as capacity so they can reopen under any owner
window.facClose = function(owner, share) {
	var I = engineQ().ind;
	I.closed = I.closed || {};
	each(sectors, function(s) {
		var cap = struct(I, s, owner) * clamp(share, 0, 1);
		I.n[s][owner] -= cap / (own[owner].w * I.scale[s]);
		I.closed[s] = (I.closed[s] || 0) + cap;
	});
};
window.facReopen = function(owner, share, amount, weeks) {
	var I = engineQ().ind;
	if (!I.closed) return;
	each(sectors, function(s) {
		var cap = (I.closed[s] || 0) * clamp(share, 0, 1);
		I.n[s][owner] += cap / (own[owner].w * I.scale[s]);
		I.closed[s] -= cap;
		disruptMoved(I, s, owner, cap, amount, weeks);
	});
};
window.indDisrupt = function(sector, owner, amount, weeks) {
	var I = engineQ().ind;
	each(sector === 'all' ? sectors : [sector], function(s) {
		each(owner === 'all' ? owners : [owner], function(o) { disrupt(I, s, o, amount, weeks); });
	});
};
window.facDamage = function(sector, share) {
	var I = engineQ().ind;
	each(owners, function(o) { I.n[sector][o] *= 1 - clamp(share, 0, 1); });
};
window.indSubsidy = function(sector, rate) { engineQ().ind.subsidy[sector] = clamp(rate, 0, 0.5); };
window.indFund = function(sector, level) { engineQ().ind.fund[sector] = clamp(Math.round(level), 0, 2); };
window.indPlan = function(sector, mult) { engineQ().ind.plan[sector] = clamp(mult, 0.2, 1.2); };
window.indTech = function(sector, mult) { engineQ().ind.tech[sector] = clamp(mult, 0.5, 2); };
window.indDemand = function(good, mult) { engineQ().ind.mult[good] = Math.max(0, mult); };
window.indAccess = function(x) { engineQ().ind.access = clamp(x, 0, 1.5); };
window.indFreight = function(x) { engineQ().ind.freight = clamp(x, 0, 0.8); };
window.indWorldPrice = function(good, mult) {
	var I = engineQ().ind;
	I.world[good] *= mult;
};
window.indTariff = function(good, imp, exp) {
	var Q = engineQ();
	if (imp !== undefined && imp !== null) Q['tariff_imp_' + good] = imp;
	if (exp !== undefined && exp !== null) Q['tariff_exp_' + good] = exp;
};
window.indTariffAll = function(imp, exp) {
	each(goods, function(g) { window.indTariff(g, imp, exp); });
};

window.industryLog = function(Q) {
	Q = Q || engineQ();
	var I = Q.ind;
	if (!I.last.out) return;
	var row = {};
	each(goods, function(g) {
		row[g] = { out: +I.last.out[g].toFixed(2), price: +(I.price[g] / P0[g]).toFixed(2), fill: +I.last.fill[g].toFixed(2), imp: +I.last.imports[g].toFixed(2), exp: +I.last.exports[g].toFixed(2) };
	});
	console.table(row);
};

window.INDUSTRY = { goods: goods, sectors: sectors, owners: owners, own: own, recipe: recipe, counts: counts, fuels: fuels, trade: trade0, P0: P0 };

})();
