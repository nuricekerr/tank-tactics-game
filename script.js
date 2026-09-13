// --- TARAYICI UYUMLULUK YAMASI ---
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h) {
        this.rect(x, y, w, h);
    };
}

// --- SES MOTORU (Web Audio API) ---
var SoundFX = (function () {
    var ctx = null;
    function init() {
        try {
            if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (ctx && ctx.state === 'suspended') ctx.resume();
        } catch(e) {}
    }
    return {
        init: init,
        playShoot: function (isBoss, isInfantry) {
            init();
            if (!ctx) return;
            try {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = isInfantry ? 'square' : 'sawtooth';
                var startFreq = isBoss ? 100 : (isInfantry ? 340 : 175);
                var dur = isInfantry ? 0.07 : 0.15;
                osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + dur);
                gain.gain.setValueAtTime(isBoss ? 0.4 : (isInfantry ? 0.12 : 0.22), ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + dur);
                osc.start();
                osc.stop(ctx.currentTime + dur);
            } catch(e) {}
        },
        playExplosion: function (isBig) {
            init();
            if (!ctx) return;
            try {
                var dur = isBig ? 0.6 : 0.35;
                var bufferSize = ctx.sampleRate * dur;
                var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                var data = buffer.getChannelData(0);
                for (var i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
                var noise = ctx.createBufferSource();
                noise.buffer = buffer;
                var filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(isBig ? 180 : 260, ctx.currentTime);
                filter.frequency.linearRampToValueAtTime(20, ctx.currentTime + dur);
                var gain = ctx.createGain();
                gain.gain.setValueAtTime(isBig ? 0.7 : 0.45, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + dur);
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                noise.start();
                noise.stop(ctx.currentTime + dur);
            } catch(e) {}
        },
        playElixir: function () {
            init();
            if (!ctx) return;
            try {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(520, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.12);
                gain.gain.setValueAtTime(0.18, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } catch(e) {}
        },
        playRicochet: function () {
            init();
            if (!ctx) return;
            try {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1400, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.12);
                gain.gain.setValueAtTime(0.25, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } catch(e) {}
        },
        playRadio: function () {
            init();
            if (!ctx) return;
            try {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(650, ctx.currentTime);
                osc.frequency.setValueAtTime(800, ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            } catch(e) {}
        },
        playRepair: function () {
            init();
            if (!ctx) return;
            try {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(500, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(700, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } catch(e) {}
        },
        playCoin: function () {
            init();
            if (!ctx) return;
            try {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(900, ctx.currentTime);
                osc.frequency.setValueAtTime(1300, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            } catch(e) {}
        },
        playAirRaid: function () {
            init();
            if (!ctx) return;
            try {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(450, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.55);
                gain.gain.setValueAtTime(0.25, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.55);
                osc.start();
                osc.stop(ctx.currentTime + 0.55);
            } catch(e) {}
        }
    };
})();

// --- HARİTA VE BİYOM TANIMLARI ---
var MAPS = [
    {
        id: 'desert',
        name: 'Bozkır Harekatı',
        bgColor: '#111713',
        gridColor: 'rgba(0, 255, 102, 0.04)',
        wallColor: '#37474f',
        enemyTypes: ['infantry', 'assault', 'flak', 'drone', 'heavy']
    },
    {
        id: 'snow',
        name: 'Kutup Buzulu',
        bgColor: '#0c1622',
        gridColor: 'rgba(0, 229, 255, 0.06)',
        wallColor: '#263238',
        enemyTypes: ['drone', 'flak', 'plasma', 'heavy']
    },
    {
        id: 'volcano',
        name: 'Lav Krateri',
        bgColor: '#1a0c0e',
        gridColor: 'rgba(255, 0, 85, 0.06)',
        wallColor: '#3e2723',
        enemyTypes: ['heavy', 'plasma', 'drone', 'assault']
    }
];

var currentMapIdx = 0;

// --- ASKERİ SINIF VERİLERİ ---
var UNIT_TYPES = {
    infantry: { name: 'Piyade Timi', category: 'infantry', unlockLevel: 1, cost: 1, hp: 350, speedMul: 3.5, rangeMul: 5.5, dmg: 85, reload: 0.35, size: [16, 16], color: '#8d6e63', barrelLen: 8 },
    assault: { name: 'Piyade Tankı', category: 'tank', unlockLevel: 1, cost: 3, hp: 1300, speedMul: 2.2, rangeMul: 7, dmg: 330, reload: 1.1, size: [28, 38], color: '#2e7d32', barrelLen: 22 },
    engineer: { name: 'İstihkam Aracı', category: 'support', unlockLevel: 2, cost: 3, hp: 750, speedMul: 2.5, rangeMul: 6, dmg: -90, reload: 0.5, size: [22, 32], color: '#ff9100', barrelLen: 12 },
    flak: { name: 'Uçaksavar', category: 'vehicle', unlockLevel: 2, cost: 4, hp: 850, speedMul: 3.8, rangeMul: 8.5, dmg: 110, reload: 0.25, size: [24, 36], color: '#00838f', barrelLen: 16 },
    heavy: { name: 'Ağır Muharebe', category: 'tank', unlockLevel: 3, cost: 5, hp: 2600, speedMul: 1.3, rangeMul: 11, dmg: 750, reload: 1.9, size: [34, 46], color: '#ff6d00', barrelLen: 28 },
    drone: { name: 'İntihar Dronu', category: 'air', unlockLevel: 4, cost: 3, hp: 280, speedMul: 5.5, rangeMul: 1.5, dmg: 1100, reload: 0.1, size: [14, 14], color: '#ff1744', barrelLen: 0 },
    plasma: { name: 'Plazma Tankı', category: 'tank', unlockLevel: 5, cost: 6, hp: 2100, speedMul: 2.5, rangeMul: 9.5, dmg: 680, reload: 0.75, size: [32, 44], color: '#aa00ff', barrelLen: 26 },
    boss: { name: 'KOMUTA TANKI', category: 'boss', unlockLevel: 99, cost: 0, hp: 10500, speedMul: 0.85, rangeMul: 11, dmg: 900, reload: 1.6, size: [56, 74], color: '#d50000', barrelLen: 38 }
};

// --- GÜVENLİ OYUNCU VERİSİ ---
var PlayerData = {
    level: 1,
    xp: 0,
    gold: 50,
    upgrades: { infantry: 1, assault: 1, engineer: 1, flak: 1, heavy: 1, drone: 1, plasma: 1 },
    deck: ['infantry', 'assault', 'engineer', 'flak'],

    init: function () {
        try {
            var lvlVal = parseInt(localStorage.getItem('tank_player_level'), 10);
            if (!isNaN(lvlVal) && lvlVal > 0) this.level = lvlVal;

            var x = parseInt(localStorage.getItem('tank_player_xp'), 10);
            if (!isNaN(x) && x >= 0) this.xp = x;

            var g = parseInt(localStorage.getItem('tank_gold'), 10);
            if (!isNaN(g) && g >= 0) this.gold = g;

            var upg = JSON.parse(localStorage.getItem('tank_upgrades'));
            if (upg && typeof upg === 'object') {
                for (var k in this.upgrades) {
                    if (upg[k]) this.upgrades[k] = upg[k];
                }
            }

            var d = JSON.parse(localStorage.getItem('tank_user_deck'));
            if (Array.isArray(d) && d.length > 0) {
                var clean = [];
                for (var i = 0; i < d.length; i++) {
                    if (UNIT_TYPES[d[i]] && clean.indexOf(d[i]) === -1) clean.push(d[i]);
                }
                if (clean.length > 0) this.deck = clean;
            }
        } catch (e) {}

        this.ensureDeck();
        this.save();
    },

    ensureDeck: function () {
        var pool = ['infantry', 'assault', 'engineer', 'flak', 'heavy', 'drone', 'plasma'];
        for (var i = 0; i < pool.length; i++) {
            var unitKey = pool[i];
            if (this.deck.length < 4 && this.deck.indexOf(unitKey) === -1 && this.level >= UNIT_TYPES[unitKey].unlockLevel) {
                this.deck.push(unitKey);
            }
        }
        if (this.deck.length === 0) {
            this.deck = ['infantry', 'assault', 'engineer', 'flak'];
        }
    },

    getXpTarget: function () {
        return this.level * 180;
    },

    addXp: function (amount) {
        this.xp += amount;
        var target = this.getXpTarget();
        var up = false;
        while (this.xp >= target) {
            this.xp -= target;
            this.level++;
            target = this.getXpTarget();
            up = true;
        }
        this.save();
        return up;
    },

    save: function () {
        try {
            localStorage.setItem('tank_player_level', this.level);
            localStorage.setItem('tank_player_xp', this.xp);
            localStorage.setItem('tank_gold', this.gold);
            localStorage.setItem('tank_upgrades', JSON.stringify(this.upgrades));
            localStorage.setItem('tank_user_deck', JSON.stringify(this.deck));
        } catch (e) {}
    },

    getUpgradeCost: function (type) {
        var l = this.upgrades[type] || 1;
        return l * 55;
    },

    upgrade: function (type) {
        var cost = this.getUpgradeCost(type);
        if (this.gold >= cost) {
            this.gold -= cost;
            this.upgrades[type] = (this.upgrades[type] || 1) + 1;
            this.save();
            return true;
        }
        return false;
    },

    toggleDeckCard: function (type) {
        var idx = this.deck.indexOf(type);
        if (idx !== -1) {
            if (this.deck.length > 1) {
                this.deck.splice(idx, 1);
                this.save();
                return true;
            }
        } else {
            if (this.deck.length < 4) {
                this.deck.push(type);
                this.save();
                return true;
            }
        }
        return false;
    }
};

PlayerData.init();

// --- OYUN DEĞİŞKENLERİ ---
var c, ctx, k, xo, yo;
var units = [], enemies = [], bullets = [], particles = [], tracks = [], floatTexts = [];
var obstacles = [], wrecks = [];
var shakeDuration = 0, shakeIntensity = 0;
var gameTime = 0, isGameOver = false, nextwave = 0, lvl = 0, currentWaveNum = 0;
var kills = 0, sessionGold = 0, sessionXp = 0;
var energy = 4, maxEnergy = 10, energyRate = 1.35;
var activeBoss = null;

var dif = [' practice', ' easy', ' medium', ' hard', ' harder', ' hardcore', ' pro', ' deathmatch', ' godlike', ' impossible'];
var airstrikeSkill = { cost: 5, active: false, radius: 75, dmg: 1500 };
var battleDeck = [];
var selectedCard = null;
var mouse = { x: 0, y: 0, down: false };
var animFrameId = null;

// --- BİRİM SINIFI ---
function Unit(typeKey, pos, dir, isBoss) {
    var template = UNIT_TYPES[typeKey] || UNIT_TYPES.assault;
    this.typeKey = typeKey;
    this.isBoss = !!isBoss;
    this.category = template.category;
    this.pos = [pos[0], pos[1]];
    this.dir = dir;

    var upgLvl = (dir === 1) ? (PlayerData.upgrades[typeKey] || 1) : 1;
    var statMul = 1 + (upgLvl - 1) * 0.18;

    this.hp = template.hp * (isBoss ? (1 + lvl * 0.25) : (dir === 1 ? statMul : 1));
    this.maxhp = this.hp;
    this.speed = k * template.speedMul;
    this.range = k * template.rangeMul;
    this.damage = template.dmg * (dir === 1 ? statMul : 1);
    this.reload = template.reload;
    this.size = [template.size[0], template.size[1]];
    this.color = (dir === 1) ? template.color : (isBoss ? '#b71c1c' : '#c62828');
    this.barrelLen = template.barrelLen;
    this.recoil = 0;

    this.bodyAngle = (dir === 1) ? -Math.PI / 2 : Math.PI / 2;
    this.turretAngle = this.bodyAngle;
    this.lastshot = 0;
    this.target = null;
    this.trackBroken = false;
    this.trackTimer = 0;
    this.smokeTimer = 0;
}

Unit.prototype.update = function (dt, targets, allies) {
    this.lastshot += dt;
    this.trackTimer += dt;
    if (this.recoil > 0) this.recoil = Math.max(0, this.recoil - dt * 25);

    if (!this.trackBroken && this.hp < this.maxhp * 0.35 && this.category === 'tank' && Math.random() < 0.02) {
        this.trackBroken = true;
        addFloatText("PALET KIRILDI!", this.pos, '#ffb700');
    }

    if (this.hp < this.maxhp * 0.35) {
        this.smokeTimer += dt;
        if (this.smokeTimer > 0.08) {
            this.smokeTimer = 0;
            particles.push({
                pos: [this.pos[0] + (Math.random() - 0.5) * (this.size[0] / 2), this.pos[1] + (Math.random() - 0.5) * (this.size[1] / 2)],
                vel: [(Math.random() - 0.5) * 15, -25 - Math.random() * 20],
                life: 0.6,
                maxLife: 0.6,
                size: (this.isBoss ? 5 : 3) + Math.random() * 3,
                color: 'rgba(30, 30, 30, 0.8)'
            });
        }
    }

    var isStopped = this.trackBroken;
    var searchPool = (this.category === 'support') ? allies : targets;

    if (!this.target || this.target.hp <= 0 || (this.category === 'support' && this.target.hp >= this.target.maxhp)) {
        this.target = null;
        var closestDist = this.range;
        for (var i = 0; i < searchPool.length; i++) {
            if (searchPool[i] === this) continue;
            var dist = Math.hypot(searchPool[i].pos[0] - this.pos[0], searchPool[i].pos[1] - this.pos[1]);
            if (dist < closestDist) {
                if (this.category === 'support' && searchPool[i].hp >= searchPool[i].maxhp) continue;
                closestDist = dist;
                this.target = searchPool[i];
            }
        }
    }

    if (this.target) {
        var dx = this.target.pos[0] - this.pos[0];
        var dy = this.target.pos[1] - this.pos[1];
        var targetAngle = Math.atan2(dy, dx);

        var diff = targetAngle - this.turretAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.turretAngle += diff * Math.min(1, dt * 6);

        var distToTarget = Math.hypot(dx, dy);

        if (this.category === 'air' && distToTarget <= this.size[0]) {
            this.target.hp -= this.damage;
            addFloatText("-" + Math.round(this.damage), this.target.pos, '#ff1744');
            this.hp = 0;
            return;
        }

        if (distToTarget <= this.range) {
            isStopped = true;
            if (this.lastshot >= this.reload && Math.abs(diff) < 0.4) {
                this.fire();
            }
        }
    } else {
        var diffTurret = this.bodyAngle - this.turretAngle;
        this.turretAngle += diffTurret * Math.min(1, dt * 5);
    }

    // Bizim birlikler engelleri es geçer, sadece düşman takılır
    if (!isStopped && this.dir === -1) {
        var nextY = this.pos[1] + Math.sin(this.bodyAngle) * this.speed * dt;
        for (var o = 0; o < obstacles.length; o++) {
            var ob = obstacles[o];
            if (ob.hp > 0 && Math.abs(this.pos[0] - ob.pos[0]) < (this.size[0] + ob.size[0]) / 2 && Math.abs(nextY - ob.pos[1]) < (this.size[1] + ob.size[1]) / 2) {
                isStopped = true;
                break;
            }
        }
        for (var w = 0; w < wrecks.length; w++) {
            var wrk = wrecks[w];
            if (Math.abs(this.pos[0] - wrk.pos[0]) < (this.size[0] + wrk.size[0]) / 2 && Math.abs(nextY - wrk.pos[1]) < (this.size[1] + wrk.size[1]) / 2) {
                isStopped = true;
                break;
            }
        }
    }

    if (!isStopped) {
        this.pos[1] += Math.sin(this.bodyAngle) * this.speed * dt;
        if (this.category !== 'infantry' && this.category !== 'air' && this.trackTimer > 0.08) {
            this.trackTimer = 0;
            tracks.push({ x: this.pos[0], y: this.pos[1], angle: this.bodyAngle, w: this.size[0], life: 3.2, maxLife: 3.2 });
        }
    }
};

Unit.prototype.fire = function () {
    this.lastshot = 0;
    this.recoil = 5;

    if (this.category === 'support') {
        if (this.target) {
            this.target.hp = Math.min(this.target.maxhp, this.target.hp - this.damage);
            this.target.trackBroken = false;
            addFloatText("TAMİR!", this.target.pos, '#00e676');
            SoundFX.playRepair();
        }
        return;
    }

    var bx = this.pos[0] + Math.cos(this.turretAngle) * (this.barrelLen + 4);
    var by = this.pos[1] + Math.sin(this.turretAngle) * (this.barrelLen + 4);

    bullets.push({
        pos: [bx, by],
        vel: [Math.cos(this.turretAngle) * k * 20, Math.sin(this.turretAngle) * k * 20],
        damage: this.damage,
        dir: this.dir,
        color: (this.dir === 1) ? '#00e5ff' : '#ff1744',
        glowColor: (this.dir === 1) ? 'rgba(0, 229, 255, 0.8)' : 'rgba(255, 23, 68, 0.8)'
    });

    SoundFX.playShoot(this.isBoss, this.category === 'infantry');
};

Unit.prototype.render = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    // Zemin Gölgesi
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(2, 4, this.size[0] / 1.7, this.size[1] / 1.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (this.category === 'infantry') {
        ctx.fillStyle = this.color;
        for (var off of [[-5, -3], [5, -3], [0, 4]]) {
            ctx.beginPath();
            ctx.arc(off[0], off[1], 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#070a0f';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    } else if (this.category === 'air') {
        ctx.save();
        ctx.rotate(this.turretAngle);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-8, -7);
        ctx.lineTo(-8, 7);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    } else {
        ctx.save();
        ctx.rotate(this.bodyAngle + Math.PI / 2);

        ctx.fillStyle = this.trackBroken ? '#ff1744' : '#141a22';
        var trackW = this.isBoss ? 7 : 5;
        ctx.fillRect(-this.size[0] / 2 - trackW / 2, -this.size[1] / 2, trackW, this.size[1]);
        ctx.fillRect(this.size[0] / 2 - trackW / 2, -this.size[1] / 2, trackW, this.size[1]);

        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size[0] / 2, -this.size[1] / 2, this.size[0], this.size[1]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-this.size[0] / 2, -this.size[1] / 2, this.size[0], this.size[1]);
        ctx.restore();

        ctx.save();
        ctx.rotate(this.turretAngle);

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-this.recoil, -2.5, this.barrelLen, 5);

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(0, 0, this.size[0] / 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = (this.dir === 1) ? '#00e5ff' : '#ff1744';
        ctx.beginPath();
        ctx.arc(2, -2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    if (!this.isBoss) {
        var hpPct = Math.max(0, this.hp / this.maxhp);
        var barW = this.size[0] * 1.2;
        ctx.fillStyle = 'rgba(7, 10, 15, 0.8)';
        ctx.fillRect(-barW / 2, -this.size[1] / 2 - 9, barW, 4);
        ctx.fillStyle = hpPct > 0.4 ? '#00e676' : '#ff1744';
        ctx.fillRect(-barW / 2, -this.size[1] / 2 - 9, barW * hpPct, 4);
    }

    ctx.restore();
};

function spawnObstacles() {
    obstacles = [];
    var count = 3;
    for (var i = 0; i < count; i++) {
        obstacles.push({
            pos: [k * 4 + Math.random() * (c.width - k * 8), c.height * 0.3 + (i * 70)],
            size: [48, 22],
            hp: 800,
            maxhp: 800
        });
    }
}

function addWreck(pos, size) {
    wrecks.push({ pos: [pos[0], pos[1]], size: [size[0], size[1]], life: 12.0 });
}

function addFloatText(text, pos, color) {
    floatTexts.push({ text: text, pos: [pos[0], pos[1]], life: 0.7, color: color || '#fff' });
}

function triggerExplosion(pos, isBig) {
    SoundFX.playExplosion(isBig);
    shakeDuration = isBig ? 0.35 : 0.22;
    shakeIntensity = isBig ? 14 : 8;
    for (var i = 0; i < (isBig ? 50 : 25); i++) {
        var ang = Math.random() * Math.PI * 2;
        var spd = (isBig ? 60 : 40) + Math.random() * 140;
        particles.push({
            pos: [pos[0], pos[1]],
            vel: [Math.cos(ang) * spd, Math.sin(ang) * spd],
            life: 0.45,
            maxLife: 0.45,
            size: 3 + Math.random() * 4,
            color: Math.random() > 0.3 ? '#ff9100' : '#ffd600'
        });
    }
}

// --- AŞAMA VE OYUN SONU AKIŞI ---
function nextStageAction() {
    if (lvl < 9) {
        lvl++;
    }
    startGame();
}

function showEndModal(isWin) {
    isGameOver = true;
    if (animFrameId) cancelAnimationFrame(animFrameId);

    PlayerData.gold += sessionGold;
    var leveledUp = PlayerData.addXp(sessionXp);

    var bestKills = parseInt(localStorage.getItem('tank_best_kills') || '0', 10);
    var bestWave = parseInt(localStorage.getItem('tank_best_wave') || '0', 10);
    if (kills > bestKills) localStorage.setItem('tank_best_kills', kills);
    if (currentWaveNum > bestWave) localStorage.setItem('tank_best_wave', currentWaveNum);

    var maindiv = document.getElementById("main");
    maindiv.innerHTML = `
        <div style="color: #f1f5f9; padding: 10px;">
            <h1 style="color: ${isWin ? '#00e676' : '#ff1744'}; margin-bottom: 8px; font-size: 22px;">
                ${isWin ? '🏆 ZAFER KAZANILDI' : '💥 GÖREV BAŞARISIZ'}
            </h1>
            <p style="font-size: 13px; color: #94a3b8; margin-bottom: 16px;">
                ${isWin ? (lvl >= 9 ? 'Tüm harekat başarıyla tamamlandı!' : 'Bölge temizlendi, sonraki cepheye ilerleniyor.') : 'Savunma hatlarımız yarıldı.'}
            </p>
            <div style="background: rgba(13, 20, 31, 0.9); border: 1px solid rgba(0, 229, 255, 0.25); padding: 14px; border-radius: 12px; margin-bottom: 16px; font-size: 14px; text-align: left;">
                <div style="margin-bottom: 6px;">Tamamlanan Kademe: <b style="color: #00e5ff;">${dif[lvl]}</b></div>
                <div style="margin-bottom: 6px;">Ulaşılan Dalga: <b style="color: #fff;">${currentWaveNum}</b></div>
                <div style="margin-bottom: 6px;">Yok Edilen: <b style="color: #fff;">${kills}</b></div>
                <div style="color: #ffd700; font-weight: bold; margin-bottom: 4px;">Hurda Kazancı: +${sessionGold} 🪙</div>
                <div style="color: #00e5ff; font-weight: bold;">Tecrübe: +${sessionXp} XP ${leveledUp ? '🎉 (SEVİYE ATLADIN!)' : ''}</div>
            </div>

            ${isWin ? `
                <button id="start" onclick="nextStageAction()" style="width: 100%; margin-bottom: 10px;">
                    ${lvl >= 9 ? 'KAMPANYA TAMAMLANDI (TEKRAR OYNA)' : 'SONRAKİ AŞAMA ❯'}
                </button>
            ` : `
                <button id="start" onclick="startGame()" style="width: 100%; margin-bottom: 10px;">
                    TEKRAR DENE
                </button>
            `}

            <button onclick="openWorkshop()" class="btn-barracks" style="width: 100%; margin-bottom: 10px;">🎖 KIŞLA & DESTE</button>
            <button onclick="loader()" style="background: transparent; color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.12); width: 100%;">ANA MENÜ</button>
        </div>
    `;
}

// --- ATÖLYE & DECK BUILDER ---
function openWorkshop() {
    var maindiv = document.getElementById("main");
    var keys = ['infantry', 'assault', 'engineer', 'flak', 'heavy', 'drone', 'plasma'];
    var html = `
        <div style="color: #f1f5f9; padding: 4px; max-height: 82vh; overflow-y: auto;">
            <h2 style="color: #00e5ff; font-size: 20px; margin-bottom: 4px;">🎖 BİRLİK KIŞLASI</h2>
            <div style="font-size: 13px; color: #94a3b8; margin-bottom: 10px;">
                Komutan: <b style="color:#00e676;">Sv. ${PlayerData.level}</b> | Hurda: <b style="color:#ffd700;">${PlayerData.gold} 🪙</b>
            </div>

            <div style="background: rgba(0, 229, 255, 0.08); border: 1px solid rgba(0, 229, 255, 0.4); border-radius: 12px; padding: 10px; margin-bottom: 14px;">
                <div style="font-size: 12px; font-weight: bold; color: #00e5ff; margin-bottom: 8px; letter-spacing: 1px;">SAVAŞ DESTESİ (${PlayerData.deck.length}/4)</div>
                <div style="display: flex; gap: 8px; justify-content: center;">
    `;

    for (var d = 0; d < 4; d++) {
        var cardKey = PlayerData.deck[d];
        if (cardKey && UNIT_TYPES[cardKey]) {
            var cInfo = UNIT_TYPES[cardKey];
            html += `
                <div style="background: #16202e; border: 1.5px solid ${cInfo.color}; border-radius: 8px; padding: 6px 8px; min-width: 64px; text-align: center;">
                    <div style="font-size: 11px; font-weight: bold; color: ${cInfo.color};">${cInfo.name}</div>
                    <div style="font-size: 10px; color: #00e5ff; font-weight: bold;">${cInfo.cost}⚡</div>
                </div>
            `;
        } else {
            html += `
                <div style="background: rgba(255,255,255,0.02); border: 1.5px dashed rgba(255,255,255,0.15); border-radius: 8px; padding: 6px 8px; min-width: 64px; text-align: center; color: #64748b; font-size: 11px;">
                    Boş
                </div>
            `;
        }
    }

    html += `
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
    `;

    for (var kType of keys) {
        var t = UNIT_TYPES[kType];
        var isUnlocked = PlayerData.level >= t.unlockLevel;
        var inDeck = PlayerData.deck.indexOf(kType) !== -1;
        var upgLvl = PlayerData.upgrades[kType] || 1;
        var cost = PlayerData.getUpgradeCost(kType);
        var canAfford = PlayerData.gold >= cost;

        html += `
            <div style="background: #141c28; padding: 10px 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; border: 1px solid ${inDeck ? '#00e5ff' : 'rgba(255,255,255,0.08)'}; opacity: ${isUnlocked ? 1 : 0.5};">
                <div style="text-align: left;">
                    <div style="font-weight: bold; font-size: 14px; color: ${isUnlocked ? t.color : '#64748b'};">
                        ${t.name} ${isUnlocked ? `<span style="color: #fff; font-size: 11px;">(Sv. ${upgLvl})</span>` : `<span style="color: #ff1744; font-size: 11px;">(Sv. ${t.unlockLevel})</span>`}
                    </div>
                    <div style="font-size: 11px; color: #94a3b8;">Maliyet: ${t.cost}⚡ | Bonus: +%${(upgLvl - 1) * 18}</div>
                </div>
                <div style="display: flex; gap: 6px; align-items: center;">
                    ${isUnlocked ? `
                        <button onclick="toggleDeckCardAction('${kType}')" style="padding: 6px 10px; font-size: 11px; background: ${inDeck ? '#ff1744' : '#00e676'}; color: #fff;">
                            ${inDeck ? 'ÇIKAR' : 'SEÇ'}
                        </button>
                        <button onclick="applyUpgrade('${kType}')" style="padding: 6px 10px; font-size: 11px; background: ${canAfford ? '#ffd700' : '#253245'}; color: ${canAfford ? '#000' : '#888'};" ${canAfford ? '' : 'disabled'}>
                            ${cost} 🪙
                        </button>
                    ` : `<span style="font-size: 16px;">🔒</span>`}
                </div>
            </div>
        `;
    }

    html += `
            </div>
            <button onclick="loader()" style="width: 100%; background: #1e293b; color: #fff;">ANA MENÜYE DÖN</button>
        </div>
    `;
    maindiv.innerHTML = html;
}

function toggleDeckCardAction(type) {
    if (PlayerData.toggleDeckCard(type)) {
        SoundFX.playRadio();
        openWorkshop();
    } else {
        alert("Destede en az 1, en fazla 4 kart olmalıdır!");
    }
}

function applyUpgrade(type) {
    if (PlayerData.upgrade(type)) {
        SoundFX.playCoin();
        openWorkshop();
    }
}

function changeMap(op) {
    currentMapIdx = (currentMapIdx + op + MAPS.length) % MAPS.length;
    var mapSpan = document.getElementById("current-map-name");
    if (mapSpan) mapSpan.innerText = MAPS[currentMapIdx].name;
}

// --- SAVAŞI BAŞLATMA ---
function startGame() {
    try {
        PlayerData.ensureDeck();

        battleDeck = PlayerData.deck.map(function (kType) {
            return { type: kType };
        });

        units = [];
        enemies = [];
        bullets = [];
        particles = [];
        tracks = [];
        wrecks = [];
        floatTexts = [];
        gameTime = 0;
        currentWaveNum = 0;
        kills = 0;
        sessionGold = 0;
        sessionXp = 0;
        energy = 4;
        nextwave = 3;
        isGameOver = false;
        activeBoss = null;
        airstrikeSkill.active = false;

        var maindiv = document.getElementById("main");
        maindiv.innerHTML = '<canvas id="c"></canvas>';

        c = document.getElementById("c");
        ctx = c.getContext("2d");

        var screenH = window.innerHeight - 40;
        c.height = Math.min(screenH, 780);
        c.width = c.height * 0.62;
        k = c.width / 26;

        spawnObstacles();

        function resizeCalc() {
            if (!c) return;
            var rect = c.getBoundingClientRect();
            xo = rect.left;
            yo = rect.top;
        }
        resizeCalc();
        window.addEventListener("resize", resizeCalc);

        c.addEventListener("mousemove", function (e) {
            resizeCalc();
            mouse.x = e.clientX - xo;
            mouse.y = e.clientY - yo;
        });

        c.addEventListener("mousedown", function (e) {
            resizeCalc();
            mouse.down = true;
            mouse.x = e.clientX - xo;
            mouse.y = e.clientY - yo;

            if (mouse.x > c.width - 92 && mouse.x < c.width - 10 && mouse.y > 6 && mouse.y < 32) {
                if (energy >= airstrikeSkill.cost) airstrikeSkill.active = !airstrikeSkill.active;
                return;
            }

            if (airstrikeSkill.active && mouse.y < c.height - c.width / 3.8) {
                energy -= airstrikeSkill.cost;
                airstrikeSkill.active = false;
                SoundFX.playAirRaid();
                triggerExplosion([mouse.x, mouse.y], true);

                for (var i = 0; i < enemies.length; i++) {
                    if (Math.hypot(enemies[i].pos[0] - mouse.x, enemies[i].pos[1] - mouse.y) < airstrikeSkill.radius) {
                        enemies[i].hp -= airstrikeSkill.dmg;
                        addFloatText("-" + airstrikeSkill.dmg, enemies[i].pos, '#ff1744');
                    }
                }
                for (var o = 0; o < obstacles.length; o++) {
                    if (Math.hypot(obstacles[o].pos[0] - mouse.x, obstacles[o].pos[1] - mouse.y) < airstrikeSkill.radius) {
                        obstacles[o].hp -= airstrikeSkill.dmg;
                    }
                }
                return;
            }

            var cardH = c.width / 3.8;
            var cardY = c.height - cardH;
            if (mouse.y > cardY) {
                var colW = c.width / battleDeck.length;
                var idx = Math.floor(mouse.x / colW);
                if (battleDeck[idx] && energy >= UNIT_TYPES[battleDeck[idx].type].cost) {
                    selectedCard = battleDeck[idx];
                }
            }
        });

        c.addEventListener("mouseup", function () {
            mouse.down = false;
            if (selectedCard) {
                if (mouse.y > c.height * 0.48 && mouse.y < c.height - c.width / 3.8) {
                    var cost = UNIT_TYPES[selectedCard.type].cost;
                    if (energy >= cost) {
                        energy -= cost;
                        units.push(new Unit(selectedCard.type, [mouse.x, mouse.y], 1, false));
                        SoundFX.playRadio();
                    }
                }
                selectedCard = null;
            }
        });

        lastTime = Date.now();
        if (animFrameId) cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(mainLoop);
    } catch(err) {
        console.error("Başlatma Hatası:", err);
        alert("Oyun başlatılırken bir hata oluştu: " + err.message);
    }
}

var lastTime = Date.now();
function mainLoop() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000;
    lastTime = now;

    if (!isGameOver) {
        update(dt);
        render();
        animFrameId = requestAnimationFrame(mainLoop);
    }
}

function update(dt) {
    gameTime += dt;
    if (shakeDuration > 0) shakeDuration -= dt;
    energy = Math.min(maxEnergy, energy + energyRate * dt);

    var currentMap = MAPS[currentMapIdx];

    nextwave -= dt;
    if (nextwave <= 0) {
        currentWaveNum++;
        sessionXp += 25;

        if (currentWaveNum % 3 === 0) {
            var boss = new Unit('boss', [c.width / 2, -60], -1, true);
            enemies.push(boss);
            activeBoss = boss;
            shakeDuration = 0.5;
            shakeIntensity = 10;
        } else {
            var count = 2 + Math.floor(lvl / 2);
            var enemyPool = currentMap.enemyTypes;
            for (var i = 0; i < count; i++) {
                var randType = enemyPool[Math.floor(Math.random() * enemyPool.length)];
                enemies.push(new Unit(randType, [k * 3 + Math.random() * (c.width - k * 6), -30 - (i * 45)], -1, false));
            }
        }
        nextwave = Math.max(8, 16 - lvl);
    }

    if (activeBoss && activeBoss.hp <= 0) activeBoss = null;

    for (var w = wrecks.length - 1; w >= 0; w--) {
        wrecks[w].life -= dt;
        if (wrecks[w].life <= 0) wrecks.splice(w, 1);
    }

    for (var t = tracks.length - 1; t >= 0; t--) {
        tracks[t].life -= dt;
        if (tracks[t].life <= 0) tracks.splice(t, 1);
    }

    for (var f = floatTexts.length - 1; f >= 0; f--) {
        floatTexts[f].pos[1] -= dt * 25;
        floatTexts[f].life -= dt;
        if (floatTexts[f].life <= 0) floatTexts.splice(f, 1);
    }

    for (var u = units.length - 1; u >= 0; u--) {
        units[u].update(dt, enemies, units);
        
        // Aşama Tamamlama Kontrolü
        if (units[u].pos[1] < k * 1.5) {
            sessionGold += 100;
            sessionXp += 150;
            showEndModal(true);
            return;
        }

        if (units[u].hp <= 0) {
            triggerExplosion(units[u].pos, false);
            if (units[u].category === 'tank') addWreck(units[u].pos, units[u].size);
            units.splice(u, 1);
        }
    }

    for (var e = enemies.length - 1; e >= 0; e--) {
        enemies[e].update(dt, units, enemies);
        if (enemies[e].pos[1] > c.height - c.width / 4) {
            showEndModal(false);
            return;
        }
        if (enemies[e].hp <= 0) {
            var earnedGold = enemies[e].isBoss ? 85 : 18;
            sessionGold += earnedGold;
            sessionXp += enemies[e].isBoss ? 90 : 20;

            var elixirGain = enemies[e].isBoss ? 3.0 : 0.8;
            energy = Math.min(maxEnergy, energy + elixirGain);
            addFloatText("+" + elixirGain.toFixed(1) + "⚡", [enemies[e].pos[0] - 15, enemies[e].pos[1] - 10], '#00e5ff');
            SoundFX.playElixir();

            addFloatText("+" + earnedGold + "🪙", enemies[e].pos, '#ffd700');
            SoundFX.playCoin();

            triggerExplosion(enemies[e].pos, enemies[e].isBoss);
            if (enemies[e].category === 'tank' || enemies[e].isBoss) addWreck(enemies[e].pos, enemies[e].size);
            kills++;
            enemies.splice(e, 1);
        }
    }

    for (var b = bullets.length - 1; b >= 0; b--) {
        var bullet = bullets[b];
        bullet.pos[0] += bullet.vel[0] * dt;
        bullet.pos[1] += bullet.vel[1] * dt;

        var hit = false;

        for (var o = 0; o < obstacles.length; o++) {
            var ob = obstacles[o];
            if (ob.hp > 0 && Math.abs(bullet.pos[0] - ob.pos[0]) < ob.size[0] / 2 && Math.abs(bullet.pos[1] - ob.pos[1]) < ob.size[1] / 2) {
                ob.hp -= bullet.damage;
                hit = true;
                break;
            }
        }

        if (!hit) {
            var hitList = (bullet.dir === 1) ? enemies : units;
            for (var h = 0; h < hitList.length; h++) {
                var target = hitList[h];
                if (Math.hypot(target.pos[0] - bullet.pos[0], target.pos[1] - bullet.pos[1]) < target.size[0] / 1.3) {
                    if (target.category === 'tank' && Math.random() < 0.15) {
                        SoundFX.playRicochet();
                        addFloatText("SEKTİ!", target.pos, '#e2e8f0');
                        bullet.vel[0] = -bullet.vel[0] * 0.5 + (Math.random() - 0.5) * 100;
                        bullet.vel[1] = -bullet.vel[1] * 0.5;
                        continue;
                    }

                    target.hp -= bullet.damage;
                    addFloatText("-" + Math.round(bullet.damage), target.pos, (bullet.dir === 1) ? '#ff1744' : '#ff9100');
                    hit = true;
                    break;
                }
            }
        }

        if (hit || bullet.pos[1] < 0 || bullet.pos[1] > c.height) {
            bullets.splice(b, 1);
        }
    }

    for (var p = particles.length - 1; p >= 0; p--) {
        particles[p].life -= dt;
        if (particles[p].life <= 0) {
            particles.splice(p, 1);
            continue;
        }
        particles[p].pos[0] += particles[p].vel[0] * dt;
        particles[p].pos[1] += particles[p].vel[1] * dt;
    }
}

function render() {
    ctx.save();
    if (shakeDuration > 0) ctx.translate((Math.random() - 0.5) * shakeIntensity, (Math.random() - 0.5) * shakeIntensity);

    var currentMap = MAPS[currentMapIdx];

    ctx.fillStyle = currentMap.bgColor;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = currentMap.gridColor;
    ctx.lineWidth = 1;
    for (var gx = 0; gx < c.width; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, c.height);
        ctx.stroke();
    }
    for (var gy = 0; gy < c.height; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(c.width, gy);
        ctx.stroke();
    }

    for (var i = 0; i < tracks.length; i++) {
        var trk = tracks[i];
        ctx.save();
        ctx.translate(trk.x, trk.y);
        ctx.rotate(trk.angle);
        ctx.fillStyle = 'rgba(0,0,0,' + (0.35 * (trk.life / trk.maxLife)) + ')';
        ctx.fillRect(-trk.w / 2 - 2, -4, 4, 8);
        ctx.fillRect(trk.w / 2 - 2, -4, 4, 8);
        ctx.restore();
    }

    for (var w = 0; w < wrecks.length; w++) {
        var wrk = wrecks[w];
        ctx.fillStyle = '#0a0d13';
        ctx.fillRect(wrk.pos[0] - wrk.size[0] / 2, wrk.pos[1] - wrk.size[1] / 2, wrk.size[0], wrk.size[1]);
        if (Math.random() < 0.2) {
            particles.push({
                pos: [wrk.pos[0] + (Math.random() - 0.5) * 10, wrk.pos[1] + (Math.random() - 0.5) * 10],
                vel: [(Math.random() - 0.5) * 10, -25],
                life: 0.5,
                maxLife: 0.5,
                size: 3,
                color: 'rgba(25, 30, 40, 0.7)'
            });
        }
    }

    for (var o = 0; o < obstacles.length; o++) {
        var ob = obstacles[o];
        if (ob.hp > 0) {
            ctx.fillStyle = currentMap.wallColor;
            ctx.fillRect(ob.pos[0] - ob.size[0] / 2, ob.pos[1] - ob.size[1] / 2, ob.size[0], ob.size[1]);
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(ob.pos[0] - ob.size[0] / 2, ob.pos[1] - ob.size[1] / 2, ob.size[0], ob.size[1]);

            var oPct = ob.hp / ob.maxhp;
            ctx.fillStyle = 'rgba(7, 10, 15, 0.6)';
            ctx.fillRect(ob.pos[0] - 18, ob.pos[1] - 14, 36, 3);
            ctx.fillStyle = '#94a3b8';
            ctx.fillRect(ob.pos[0] - 18, ob.pos[1] - 14, 36 * oPct, 3);
        }
    }

    ctx.fillStyle = 'rgba(0, 230, 118, 0.15)';
    ctx.fillRect(0, 0, c.width, k * 2);
    ctx.strokeStyle = '#00e676';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, c.width, k * 2);

    if (selectedCard) {
        ctx.fillStyle = 'rgba(0, 229, 255, 0.08)';
        ctx.fillRect(8, c.height * 0.48, c.width - 16, c.height * 0.52 - c.width / 3.8);
        ctx.strokeStyle = '#00e5ff';
        ctx.setLineDash([8, 8]);
        ctx.lineWidth = 2;
        ctx.strokeRect(8, c.height * 0.48, c.width - 16, c.height * 0.52 - c.width / 3.8);
        ctx.setLineDash([]);
    }

    if (airstrikeSkill.active) {
        ctx.save();
        ctx.strokeStyle = '#ff1744';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, airstrikeSkill.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 23, 68, 0.2)';
        ctx.fill();
        ctx.restore();
    }

    for (var e = 0; e < enemies.length; e++) enemies[e].render(ctx);
    for (var u = 0; u < units.length; u++) units[u].render(ctx);

    for (var b = 0; b < bullets.length; b++) {
        var bul = bullets[b];
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = bul.glowColor || bul.color;
        ctx.fillStyle = bul.color;
        ctx.beginPath();
        ctx.arc(bul.pos[0], bul.pos[1], 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    for (var p = 0; p < particles.length; p++) {
        var part = particles[p];
        ctx.fillStyle = part.color;
        ctx.globalAlpha = Math.max(0, part.life / part.maxLife);
        ctx.beginPath();
        ctx.arc(part.pos[0], part.pos[1], part.size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.font = 'bold 12px Rajdhani, sans-serif';
    for (var f = 0; f < floatTexts.length; f++) {
        var ft = floatTexts[f];
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = Math.max(0, ft.life / 0.7);
        ctx.fillText(ft.text, ft.pos[0], ft.pos[1]);
    }
    ctx.globalAlpha = 1;

    // HUD
    ctx.fillStyle = 'rgba(13, 20, 31, 0.9)';
    ctx.fillRect(0, 0, c.width, 42);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, c.width, 42);

    ctx.font = 'bold 12px Orbitron, sans-serif';
    ctx.fillStyle = '#00e5ff';
    ctx.fillText("SV." + PlayerData.level, 12, 26);
    ctx.fillStyle = '#ffd700';
    ctx.fillText(sessionGold + " 🪙", 70, 26);

    ctx.fillStyle = '#f1f5f9';
    ctx.fillText("DALGA " + currentWaveNum, c.width / 2 - 32, 26);

    ctx.fillStyle = (energy >= airstrikeSkill.cost) ? (airstrikeSkill.active ? '#d50000' : '#1e293b') : '#0f172a';
    ctx.fillRect(c.width - 94, 8, 86, 26);
    ctx.strokeStyle = (airstrikeSkill.active) ? '#ff1744' : '#00e5ff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(c.width - 94, 8, 86, 26);
    ctx.font = 'bold 11px Orbitron, sans-serif';
    ctx.fillStyle = (energy >= airstrikeSkill.cost) ? '#ffd700' : '#64748b';
    ctx.fillText("🚀 ROKET", c.width - 84, 25);

    if (activeBoss && activeBoss.hp > 0) {
        var bPct = Math.max(0, activeBoss.hp / activeBoss.maxhp);
        ctx.fillStyle = 'rgba(7, 10, 15, 0.85)';
        ctx.fillRect(20, 50, c.width - 40, 16);
        ctx.fillStyle = '#d50000';
        ctx.fillRect(22, 52, (c.width - 44) * bPct, 12);
        ctx.strokeStyle = '#ff1744';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(20, 50, c.width - 40, 16);
        ctx.font = 'bold 10px Orbitron';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText("⚠ KOMUTA TANKI ⚠", c.width / 2, 62);
        ctx.textAlign = 'left';
    }

    // ALT KOKPİT
    var cardBarH = c.width / 3.8;
    var barY = c.height - cardBarH;

    ctx.fillStyle = '#0d141f';
    ctx.fillRect(0, barY - 16, c.width, cardBarH + 16);

    ctx.fillStyle = '#16202e';
    ctx.fillRect(0, barY - 16, c.width, 10);
    ctx.fillStyle = '#00e5ff';
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#00e5ff';
    ctx.fillRect(0, barY - 16, (c.width * (energy / maxEnergy)), 10);
    ctx.shadowBlur = 0;

    ctx.font = 'bold 10px Orbitron';
    ctx.fillStyle = '#fff';
    ctx.fillText("ENERJİ: " + energy.toFixed(1) + " / " + maxEnergy, 12, barY - 7);

    var colW = c.width / battleDeck.length;
    for (var cIdx = 0; cIdx < battleDeck.length; cIdx++) {
        var card = battleDeck[cIdx];
        var info = UNIT_TYPES[card.type];
        var upgLvl = PlayerData.upgrades[card.type] || 1;
        var cx = cIdx * colW;
        var cy = barY;

        ctx.fillStyle = (energy >= info.cost) ? '#16202e' : '#0a0f17';
        ctx.fillRect(cx + 4, cy + 4, colW - 8, cardBarH - 8);
        ctx.strokeStyle = (selectedCard === card) ? '#00e5ff' : 'rgba(0, 229, 255, 0.3)';
        ctx.lineWidth = (selectedCard === card) ? 2 : 1;
        ctx.strokeRect(cx + 4, cy + 4, colW - 8, cardBarH - 8);

        ctx.fillStyle = info.color;
        ctx.fillRect(cx + colW / 2 - 8, cy + 12, 16, 20);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 9px Orbitron';
        ctx.fillText("Sv." + upgLvl, cx + 7, cy + 15);

        ctx.font = 'bold 10px Rajdhani';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(info.name, cx + colW / 2, cy + cardBarH - 22);

        ctx.fillStyle = '#00e5ff';
        ctx.fillText(info.cost + "⚡", cx + colW / 2, cy + cardBarH - 8);
        ctx.textAlign = 'left';
    }

    if (selectedCard && mouse.down) {
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.globalAlpha = 0.6;
        var ghost = UNIT_TYPES[selectedCard.type];
        ctx.fillStyle = ghost.color;
        ctx.fillRect(-ghost.size[0] / 2, -ghost.size[1] / 2, ghost.size[0], ghost.size[1]);
        ctx.restore();
    }

    ctx.restore();
}

// --- ANA MENÜ (LOADER) ---
function loader() {
    PlayerData.init();

    var bestKills = localStorage.getItem('tank_best_kills') || '0';
    var bestWave = localStorage.getItem('tank_best_wave') || '0';
    var xpTarget = PlayerData.getXpTarget();

    var maindiv = document.getElementById("main");
    maindiv.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 17px; font-weight: 800; color: #00e5ff; letter-spacing: 1px; font-family: 'Orbitron';">
                Komutan Sv. ${PlayerData.level}
            </div>
            <div style="background: #1a2332; height: 10px; border-radius: 5px; width: 85%; margin: 10px auto; overflow: hidden; box-shadow: inset 0 0 5px rgba(0,0,0,0.5);">
                <div style="background: #00e676; height: 100%; width: ${(PlayerData.xp / xpTarget) * 100}%; box-shadow: 0 0 10px #00e676;"></div>
            </div>
            <div style="font-size: 12px; color: #94a3b8; font-weight: 600;">${PlayerData.xp} / ${xpTarget} XP</div>
        </div>

        <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 20px;">
            <button id="start" onclick="startGame()">Savaşı Başlat</button>
            <button onclick="openWorkshop()" class="btn-barracks">🎖 Kışla</button>
            <button id="info" onclick="inf()">Rehber</button>
        </div>

        <div style="margin-bottom: 16px;">
            <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">Harita:</div>
            <button onclick="changeMap(-1)" class="btn-nav">&lt;</button>
            <span id="current-map-name" style="color: #00e5ff; font-weight: bold; font-size: 15px; margin: 0 10px;">${MAPS[currentMapIdx].name}</span>
            <button onclick="changeMap(1)" class="btn-nav">&gt;</button>
        </div>

        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 900; color: #00e5ff; font-family: 'Orbitron'; letter-spacing: 1.5px; margin-bottom: 8px;">
                ZORLUK:
            </div>
            <button id="btn-left" onclick="changeLvl(0)" class="btn-nav">&lt;</button>
            <span class="dif">${dif[lvl]}</span>
            <button id="btn-right" onclick="changeLvl(1)" class="btn-nav">&gt;</button>
        </div>

        <div style="font-size: 16px; color: #ffd700; font-weight: bold; margin-bottom: 12px;">
            Mevcut Hurda: ${PlayerData.gold} 🪙
        </div>

        <div style="font-size: 13px; color: #94a3b8; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 12px;">
            En Yüksek Skor: <span style="color: #00e5ff; font-weight: bold;">Dalga ${bestWave}</span> | <span style="color: #ff1744; font-weight: bold;">${bestKills} İmha</span>
        </div>
    `;
}

var inf = function () {
    var popup = document.getElementById('infdiv');
    if (popup) {
        popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
    }
};

var changeLvl = function (op) {
    if (op === 1 && lvl < 9) lvl++;
    if (op === 0 && lvl > 0) lvl--;
    var _dif = document.getElementsByClassName("dif");
    if (_dif.length > 0) _dif[0].innerHTML = dif[lvl];
};

loader();