// Cookie Clicker official main.js: ordinary upgrades for the first ten buildings.
// Verified 2026-10-19: https://orteil.dashnet.org/cookieclicker/main.js
// Prices/unlock thresholds/effects follow the source; names are adapted for apples.
function createItemUpgrades(buildings){
 const needs=[1,5,25,50,100,150,200,250,300,350,400,450,500,550,600];
 const prices=[10,50,500,5e4,5e6,5e8,5e11,5e14,5e17,5e20,5e24,5e28,5e32,5e36,5e40];
 const rows=[
  {
    "id": "tier-farmer-0",
    "original": "Forwards from grandma",
    "building": 1,
    "tier": 0,
    "name": "草编遮阳帽"
  },
  {
    "id": "tier-farmer-1",
    "original": "Steel-plated rolling pins",
    "building": 1,
    "tier": 1,
    "name": "木柄果锄"
  },
  {
    "id": "tier-farmer-2",
    "original": "Lubricated dentures",
    "building": 1,
    "tier": 2,
    "name": "育苗托盘"
  },
  {
    "id": "tier-farmer-3",
    "original": "Prune juice",
    "building": 1,
    "tier": 3,
    "name": "滴灌水管"
  },
  {
    "id": "tier-farmer-4",
    "original": "Double-thick glasses",
    "building": 1,
    "tier": 4,
    "name": "堆肥发酵桶"
  },
  {
    "id": "tier-farmer-5",
    "original": "Aging agents",
    "building": 1,
    "tier": 5,
    "name": "精耕手册"
  },
  {
    "id": "tier-farmer-6",
    "original": "Xtreme walkers",
    "building": 1,
    "tier": 6,
    "name": "轮作日历"
  },
  {
    "id": "tier-farmer-7",
    "original": "The Unbridling",
    "building": 1,
    "tier": 7,
    "name": "智能温室"
  },
  {
    "id": "tier-farmer-8",
    "original": "Reverse dementia",
    "building": 1,
    "tier": 8,
    "name": "丰收联合机"
  },
  {
    "id": "tier-farmer-9",
    "original": "Timeproof hair dyes",
    "building": 1,
    "tier": 9,
    "name": "深根培育舱"
  },
  {
    "id": "tier-farmer-10",
    "original": "Good manners",
    "building": 1,
    "tier": 10,
    "name": "四季恒温田"
  },
  {
    "id": "tier-farmer-11",
    "original": "Generation degeneration",
    "building": 1,
    "tier": 11,
    "name": "云端灌溉网"
  },
  {
    "id": "tier-farmer-12",
    "original": "Visits",
    "building": 1,
    "tier": 12,
    "name": "时空播种器"
  },
  {
    "id": "tier-farmer-13",
    "original": "Kitchen cabinets",
    "building": 1,
    "tier": 13,
    "name": "无限沃土"
  },
  {
    "id": "tier-farmer-14",
    "original": "Foam-tipped canes",
    "building": 1,
    "tier": 14,
    "name": "起源果园"
  },
  {
    "id": "tier-1-0",
    "original": "Cheap hoes",
    "building": 2,
    "tier": 0,
    "name": "入职工牌"
  },
  {
    "id": "tier-1-1",
    "original": "Fertilizer",
    "building": 2,
    "tier": 1,
    "name": "防滑手套"
  },
  {
    "id": "tier-1-2",
    "original": "Cookie trees",
    "building": 2,
    "tier": 2,
    "name": "带薪午休"
  },
  {
    "id": "tier-1-3",
    "original": "Genetically-modified cookies",
    "building": 2,
    "tier": 3,
    "name": "双倍绩效"
  },
  {
    "id": "tier-1-4",
    "original": "Gingerbread scarecrows",
    "building": 2,
    "tier": 4,
    "name": "资深资格"
  },
  {
    "id": "tier-1-5",
    "original": "Pulsar sprinklers",
    "building": 2,
    "tier": 5,
    "name": "团队培训"
  },
  {
    "id": "tier-1-6",
    "original": "Fudge fungus",
    "building": 2,
    "tier": 6,
    "name": "弹性排班"
  },
  {
    "id": "tier-1-7",
    "original": "Wheat triffids",
    "building": 2,
    "tier": 7,
    "name": "年终奖励"
  },
  {
    "id": "tier-1-8",
    "original": "Humane pesticides",
    "building": 2,
    "tier": 8,
    "name": "效率手册"
  },
  {
    "id": "tier-1-9",
    "original": "Barnstars",
    "building": 2,
    "tier": 9,
    "name": "专家认证"
  },
  {
    "id": "tier-1-10",
    "original": "Lindworms",
    "building": 2,
    "tier": 10,
    "name": "远程分身"
  },
  {
    "id": "tier-1-11",
    "original": "Global seed vault",
    "building": 2,
    "tier": 11,
    "name": "全域协作"
  },
  {
    "id": "tier-1-12",
    "original": "Reverse-veganism",
    "building": 2,
    "tier": 12,
    "name": "时空考勤"
  },
  {
    "id": "tier-1-13",
    "original": "Cookie mulch",
    "building": 2,
    "tier": 13,
    "name": "无限工位"
  },
  {
    "id": "tier-1-14",
    "original": "Self-driving tractors",
    "building": 2,
    "tier": 14,
    "name": "终身荣誉"
  },
  {
    "id": "tier-4-0",
    "original": "Sugar gas",
    "building": 3,
    "tier": 0,
    "name": "镀金王冠"
  },
  {
    "id": "tier-4-1",
    "original": "Megadrill",
    "building": 3,
    "tier": 1,
    "name": "皇家披风"
  },
  {
    "id": "tier-4-2",
    "original": "Ultradrill",
    "building": 3,
    "tier": 2,
    "name": "御用果篮"
  },
  {
    "id": "tier-4-3",
    "original": "Ultimadrill",
    "building": 3,
    "tier": 3,
    "name": "丰收诏令"
  },
  {
    "id": "tier-4-4",
    "original": "H-bomb mining",
    "building": 3,
    "tier": 4,
    "name": "皇家卫队"
  },
  {
    "id": "tier-4-5",
    "original": "Coreforge",
    "building": 3,
    "tier": 5,
    "name": "宫廷果园"
  },
  {
    "id": "tier-4-6",
    "original": "Planetsplitters",
    "building": 3,
    "tier": 6,
    "name": "万民朝贡"
  },
  {
    "id": "tier-4-7",
    "original": "Canola oil wells",
    "building": 3,
    "tier": 7,
    "name": "海域统治"
  },
  {
    "id": "tier-4-8",
    "original": "Mole people",
    "building": 3,
    "tier": 8,
    "name": "黄金王座"
  },
  {
    "id": "tier-4-9",
    "original": "Mine canaries",
    "building": 3,
    "tier": 9,
    "name": "远洋行宫"
  },
  {
    "id": "tier-4-10",
    "original": "Bore again",
    "building": 3,
    "tier": 10,
    "name": "星际王国"
  },
  {
    "id": "tier-4-11",
    "original": "Air mining",
    "building": 3,
    "tier": 11,
    "name": "时空疆域"
  },
  {
    "id": "tier-4-12",
    "original": "Caramel alloys",
    "building": 3,
    "tier": 12,
    "name": "万界加冕"
  },
  {
    "id": "tier-4-13",
    "original": "Delicious mineralogy",
    "building": 3,
    "tier": 13,
    "name": "永恒王权"
  },
  {
    "id": "tier-4-14",
    "original": "Mineshaft supports",
    "building": 3,
    "tier": 14,
    "name": "诸海之主"
  },
  {
    "id": "tier-shark-0",
    "original": "Sturdier conveyor belts",
    "building": 4,
    "tier": 0,
    "name": "磨鳍石"
  },
  {
    "id": "tier-shark-1",
    "original": "Child labor",
    "building": 4,
    "tier": 1,
    "name": "防咬果篮"
  },
  {
    "id": "tier-shark-2",
    "original": "Sweatshop",
    "building": 4,
    "tier": 2,
    "name": "流线护目镜"
  },
  {
    "id": "tier-shark-3",
    "original": "Radium reactors",
    "building": 4,
    "tier": 3,
    "name": "锯齿采果器"
  },
  {
    "id": "tier-shark-4",
    "original": "Recombobulators",
    "building": 4,
    "tier": 4,
    "name": "嗅觉导航仪"
  },
  {
    "id": "tier-shark-5",
    "original": "Deep-bake process",
    "building": 4,
    "tier": 5,
    "name": "极速尾鳍"
  },
  {
    "id": "tier-shark-6",
    "original": "Cyborg workforce",
    "building": 4,
    "tier": 6,
    "name": "深海巡猎队"
  },
  {
    "id": "tier-shark-7",
    "original": "78-hour days",
    "building": 4,
    "tier": 7,
    "name": "激流收割阵"
  },
  {
    "id": "tier-shark-8",
    "original": "Machine learning",
    "building": 4,
    "tier": 8,
    "name": "巨齿切割机"
  },
  {
    "id": "tier-shark-9",
    "original": "Brownie point system",
    "building": 4,
    "tier": 9,
    "name": "超压潜行舱"
  },
  {
    "id": "tier-shark-10",
    "original": "\"Volunteer\" interns",
    "building": 4,
    "tier": 10,
    "name": "音速巡游器"
  },
  {
    "id": "tier-shark-11",
    "original": "Behavioral reframing",
    "building": 4,
    "tier": 11,
    "name": "星海猎果舰"
  },
  {
    "id": "tier-shark-12",
    "original": "The infinity engine",
    "building": 4,
    "tier": 12,
    "name": "时空追踪器"
  },
  {
    "id": "tier-shark-13",
    "original": "N-dimensional assembly lines",
    "building": 4,
    "tier": 13,
    "name": "无限猎场"
  },
  {
    "id": "tier-shark-14",
    "original": "Universal automation",
    "building": 4,
    "tier": 14,
    "name": "深渊丰收王"
  },
  {
    "id": "tier-3-0",
    "original": "Taller tellers",
    "building": 5,
    "tier": 0,
    "name": "彩球练习"
  },
  {
    "id": "tier-3-1",
    "original": "Scissor-resistant credit cards",
    "building": 5,
    "tier": 1,
    "name": "红鼻子"
  },
  {
    "id": "tier-3-2",
    "original": "Acid-proof vaults",
    "building": 5,
    "tier": 2,
    "name": "条纹戏服"
  },
  {
    "id": "tier-3-3",
    "original": "Chocolate coins",
    "building": 5,
    "tier": 3,
    "name": "独轮车"
  },
  {
    "id": "tier-3-4",
    "original": "Exponential interest rates",
    "building": 5,
    "tier": 4,
    "name": "喷花礼帽"
  },
  {
    "id": "tier-3-5",
    "original": "Financial zen",
    "building": 5,
    "tier": 5,
    "name": "空中飞鱼"
  },
  {
    "id": "tier-3-6",
    "original": "Way of the wallet",
    "building": 5,
    "tier": 6,
    "name": "巡回剧团"
  },
  {
    "id": "tier-3-7",
    "original": "The stuff rationale",
    "building": 5,
    "tier": 7,
    "name": "掌声雷动"
  },
  {
    "id": "tier-3-8",
    "original": "Edible money",
    "building": 5,
    "tier": 8,
    "name": "海底大秀"
  },
  {
    "id": "tier-3-9",
    "original": "Grand supercycles",
    "building": 5,
    "tier": 9,
    "name": "百变面具"
  },
  {
    "id": "tier-3-10",
    "original": "Rules of acquisition",
    "building": 5,
    "tier": 10,
    "name": "重力杂耍"
  },
  {
    "id": "tier-3-11",
    "original": "Altruistic loop",
    "building": 5,
    "tier": 11,
    "name": "时空马戏"
  },
  {
    "id": "tier-3-12",
    "original": "Diminishing tax returns",
    "building": 5,
    "tier": 12,
    "name": "梦境舞台"
  },
  {
    "id": "tier-3-13",
    "original": "Cookie Points",
    "building": 5,
    "tier": 13,
    "name": "无限谢幕"
  },
  {
    "id": "tier-3-14",
    "original": "The big shortcake",
    "building": 5,
    "tier": 14,
    "name": "宇宙喜剧"
  },
  {
    "id": "tier-6-0",
    "original": "Golden idols",
    "building": 6,
    "tier": 0,
    "name": "营养试剂"
  },
  {
    "id": "tier-6-1",
    "original": "Sacrifices",
    "building": 6,
    "tier": 1,
    "name": "加速细胞"
  },
  {
    "id": "tier-6-2",
    "original": "Delicious blessing",
    "building": 6,
    "tier": 2,
    "name": "双倍触手"
  },
  {
    "id": "tier-6-3",
    "original": "Sun festival",
    "building": 6,
    "tier": 3,
    "name": "荧光孢子"
  },
  {
    "id": "tier-6-4",
    "original": "Enlarged pantheon",
    "building": 6,
    "tier": 4,
    "name": "再生组织"
  },
  {
    "id": "tier-6-5",
    "original": "Great Baker in the sky",
    "building": 6,
    "tier": 5,
    "name": "基因优化"
  },
  {
    "id": "tier-6-6",
    "original": "Creation myth",
    "building": 6,
    "tier": 6,
    "name": "分裂培养"
  },
  {
    "id": "tier-6-7",
    "original": "Theocracy",
    "building": 6,
    "tier": 7,
    "name": "群体意识"
  },
  {
    "id": "tier-6-8",
    "original": "Sick rap prayers",
    "building": 6,
    "tier": 8,
    "name": "完美适应"
  },
  {
    "id": "tier-6-9",
    "original": "Psalm-reading",
    "building": 6,
    "tier": 9,
    "name": "超能细胞"
  },
  {
    "id": "tier-6-10",
    "original": "War of the gods",
    "building": 6,
    "tier": 10,
    "name": "跨界突变"
  },
  {
    "id": "tier-6-11",
    "original": "A novel idea",
    "building": 6,
    "tier": 11,
    "name": "维度触须"
  },
  {
    "id": "tier-6-12",
    "original": "Apparitions",
    "building": 6,
    "tier": 12,
    "name": "生命重组"
  },
  {
    "id": "tier-6-13",
    "original": "Negatheism",
    "building": 6,
    "tier": 13,
    "name": "无限进化"
  },
  {
    "id": "tier-6-14",
    "original": "Temple traps",
    "building": 6,
    "tier": 14,
    "name": "终极鱼种"
  },
  {
    "id": "tier-7-0",
    "original": "Pointier hats",
    "building": 7,
    "tier": 0,
    "name": "神秘天线"
  },
  {
    "id": "tier-7-1",
    "original": "Beardlier beards",
    "building": 7,
    "tier": 1,
    "name": "反重力手套"
  },
  {
    "id": "tier-7-2",
    "original": "Ancient grimoires",
    "building": 7,
    "tier": 2,
    "name": "飞碟驾照"
  },
  {
    "id": "tier-7-3",
    "original": "Kitchen curses",
    "building": 7,
    "tier": 3,
    "name": "等离子镰刀"
  },
  {
    "id": "tier-7-4",
    "original": "School of sorcery",
    "building": 7,
    "tier": 4,
    "name": "虫洞果篮"
  },
  {
    "id": "tier-7-5",
    "original": "Dark formulas",
    "building": 7,
    "tier": 5,
    "name": "量子苗圃"
  },
  {
    "id": "tier-7-6",
    "original": "Cookiemancy",
    "building": 7,
    "tier": 6,
    "name": "星际运输"
  },
  {
    "id": "tier-7-7",
    "original": "Rabbit trick",
    "building": 7,
    "tier": 7,
    "name": "曲速种植"
  },
  {
    "id": "tier-7-8",
    "original": "Deluxe tailored wands",
    "building": 7,
    "tier": 8,
    "name": "引力控制"
  },
  {
    "id": "tier-7-9",
    "original": "Immobile spellcasting",
    "building": 7,
    "tier": 9,
    "name": "母舰工厂"
  },
  {
    "id": "tier-7-10",
    "original": "Electricity",
    "building": 7,
    "tier": 10,
    "name": "银河网络"
  },
  {
    "id": "tier-7-11",
    "original": "Spelling bees",
    "building": 7,
    "tier": 11,
    "name": "维度折叠"
  },
  {
    "id": "tier-7-12",
    "original": "Wizard basements",
    "building": 7,
    "tier": 12,
    "name": "时空农场"
  },
  {
    "id": "tier-7-13",
    "original": "Magical realism",
    "building": 7,
    "tier": 13,
    "name": "无限殖民"
  },
  {
    "id": "tier-7-14",
    "original": "Polymorphism",
    "building": 7,
    "tier": 14,
    "name": "宇宙农业"
  },
  {
    "id": "tier-5-0",
    "original": "Vanilla nebulae",
    "building": 8,
    "tier": 0,
    "name": "吸水海绵"
  },
  {
    "id": "tier-5-1",
    "original": "Wormholes",
    "building": 8,
    "tier": 1,
    "name": "营养水桶"
  },
  {
    "id": "tier-5-2",
    "original": "Frequent flyer",
    "building": 8,
    "tier": 2,
    "name": "蓬松气孔"
  },
  {
    "id": "tier-5-3",
    "original": "Warp drive",
    "building": 8,
    "tier": 3,
    "name": "高压挤水"
  },
  {
    "id": "tier-5-4",
    "original": "Chocolate monoliths",
    "building": 8,
    "tier": 4,
    "name": "珊瑚滤芯"
  },
  {
    "id": "tier-5-5",
    "original": "Generation ship",
    "building": 8,
    "tier": 5,
    "name": "深海养分"
  },
  {
    "id": "tier-5-6",
    "original": "Dyson sphere",
    "building": 8,
    "tier": 6,
    "name": "巨型吸管"
  },
  {
    "id": "tier-5-7",
    "original": "The final frontier",
    "building": 8,
    "tier": 7,
    "name": "潮汐水泵"
  },
  {
    "id": "tier-5-8",
    "original": "Autopilot",
    "building": 8,
    "tier": 8,
    "name": "海流循环"
  },
  {
    "id": "tier-5-9",
    "original": "Restaurants at the end of the universe",
    "building": 8,
    "tier": 9,
    "name": "全海域灌溉"
  },
  {
    "id": "tier-5-10",
    "original": "Universal alphabet",
    "building": 8,
    "tier": 10,
    "name": "云层蓄水"
  },
  {
    "id": "tier-5-11",
    "original": "Toroid universe",
    "building": 8,
    "tier": 11,
    "name": "星云过滤"
  },
  {
    "id": "tier-5-12",
    "original": "Prime directive",
    "building": 8,
    "tier": 12,
    "name": "时空水库"
  },
  {
    "id": "tier-5-13",
    "original": "Cosmic foreground radiation",
    "building": 8,
    "tier": 13,
    "name": "无限吸收"
  },
  {
    "id": "tier-5-14",
    "original": "At your doorstep in 30 minutes or your money back",
    "building": 8,
    "tier": 14,
    "name": "生命之海"
  },
  {
    "id": "tier-9-0",
    "original": "Antimony",
    "building": 9,
    "tier": 0,
    "name": "祈愿铃铛"
  },
  {
    "id": "tier-9-1",
    "original": "Essence of dough",
    "building": 9,
    "tier": 1,
    "name": "丰收祭坛"
  },
  {
    "id": "tier-9-2",
    "original": "True chocolate",
    "building": 9,
    "tier": 2,
    "name": "圣光果枝"
  },
  {
    "id": "tier-9-3",
    "original": "Ambrosia",
    "building": 9,
    "tier": 3,
    "name": "神谕之书"
  },
  {
    "id": "tier-9-4",
    "original": "Aqua crustulae",
    "building": 9,
    "tier": 4,
    "name": "金色圣杯"
  },
  {
    "id": "tier-9-5",
    "original": "Origin crucible",
    "building": 9,
    "tier": 5,
    "name": "海潮权杖"
  },
  {
    "id": "tier-9-6",
    "original": "Theory of atomic fluidity",
    "building": 9,
    "tier": 6,
    "name": "天赐甘露"
  },
  {
    "id": "tier-9-7",
    "original": "Beige goo",
    "building": 9,
    "tier": 7,
    "name": "神域果园"
  },
  {
    "id": "tier-9-8",
    "original": "The advent of chemistry",
    "building": 9,
    "tier": 8,
    "name": "万物祝福"
  },
  {
    "id": "tier-9-9",
    "original": "On second thought",
    "building": 9,
    "tier": 9,
    "name": "星辰神殿"
  },
  {
    "id": "tier-9-10",
    "original": "Public betterment",
    "building": 9,
    "tier": 10,
    "name": "因果果实"
  },
  {
    "id": "tier-9-11",
    "original": "Hermetic reconciliation",
    "building": 9,
    "tier": 11,
    "name": "创世种子"
  },
  {
    "id": "tier-9-12",
    "original": "Chromatic cycling",
    "building": 9,
    "tier": 12,
    "name": "诸天丰收"
  },
  {
    "id": "tier-9-13",
    "original": "Arcanized glassware",
    "building": 9,
    "tier": 13,
    "name": "永恒神国"
  },
  {
    "id": "tier-9-14",
    "original": "The dose makes the poison",
    "building": 9,
    "tier": 14,
    "name": "万果归一"
  }
];
 // Fixed-power, lifetime-production unlocks only; excludes external systems.
 const supplies=[
 {
  "id": "supply-plain-cookies",
  "name": "兼职便当",
  "original": "Plain cookies",
  "price": 999999,
  "power": 1
 },
 {
  "id": "supply-sugar-cookies",
  "name": "海盐苹果片",
  "original": "Sugar cookies",
  "price": 4999995,
  "power": 1
 },
 {
  "id": "supply-oatmeal-raisin-cookies",
  "name": "鲜榨苹果汁",
  "original": "Oatmeal raisin cookies",
  "price": 9999999,
  "power": 1
 },
 {
  "id": "supply-peanut-butter-cookies",
  "name": "烤苹果串",
  "original": "Peanut butter cookies",
  "price": 49999995,
  "power": 2
 },
 {
  "id": "supply-almond-cookies",
  "name": "海苔饭团",
  "original": "Almond cookies",
  "price": 99999999,
  "power": 2
 },
 {
  "id": "supply-cashew-cookies",
  "name": "鳍力早餐",
  "original": "Cashew cookies",
  "price": 99999999,
  "power": 2
 },
 {
  "id": "supply-coconut-cookies",
  "name": "苹果小馒头",
  "original": "Coconut cookies",
  "price": 99999999,
  "power": 2
 },
 {
  "id": "supply-hazelnut-cookies",
  "name": "果园饭盒",
  "original": "Hazelnut cookies",
  "price": 99999999,
  "power": 2
 },
 {
  "id": "supply-macadamia-nut-cookies",
  "name": "加班热汤",
  "original": "Macadamia nut cookies",
  "price": 99999999,
  "power": 2
 },
 {
  "id": "supply-walnut-cookies",
  "name": "午休水果杯",
  "original": "Walnut cookies",
  "price": 99999999,
  "power": 2
 },
 {
  "id": "supply-milk-chocolate-cookies",
  "name": "脆皮苹果饼",
  "original": "Milk chocolate cookies",
  "price": 499999995,
  "power": 2
 },
 {
  "id": "supply-white-chocolate-cookies",
  "name": "工友分享包",
  "original": "White chocolate cookies",
  "price": 499999995,
  "power": 2
 },
 {
  "id": "supply-double-chip-cookies",
  "name": "海带营养餐",
  "original": "Double-chip cookies",
  "price": 4999999995,
  "power": 2
 },
 {
  "id": "supply-white-chocolate-macadamia-nut-cookies",
  "name": "满勤点心",
  "original": "White chocolate macadamia nut cookies",
  "price": 9999999999,
  "power": 2
 },
 {
  "id": "supply-farmer-0",
  "name": "田间苹果茶",
  "original": "All-chocolate cookies",
  "price": 49999999995,
  "power": 2
 },
 {
  "id": "supply-farmer-1",
  "name": "草帽饭团",
  "original": "Dark chocolate-coated cookies",
  "price": 99999999999,
  "power": 5
 },
 {
  "id": "supply-farmer-2",
  "name": "新苗营养粥",
  "original": "White chocolate-coated cookies",
  "price": 99999999999,
  "power": 5
 },
 {
  "id": "supply-farmer-3",
  "name": "农家果酱包",
  "original": "Eclipse cookies",
  "price": 499999999995,
  "power": 2
 },
 {
  "id": "supply-farmer-4",
  "name": "锄禾能量饼",
  "original": "Zebra cookies",
  "price": 999999999999,
  "power": 2
 },
 {
  "id": "supply-farmer-5",
  "name": "晨耕热汤",
  "original": "Snickerdoodles",
  "price": 4999999999995,
  "power": 2
 },
 {
  "id": "supply-farmer-6",
  "name": "丰收水果杯",
  "original": "Stroopwafels",
  "price": 9999999999999,
  "power": 2
 },
 {
  "id": "supply-farmer-7",
  "name": "轮作杂粮餐",
  "original": "Macaroons",
  "price": 49999999999995,
  "power": 2
 },
 {
  "id": "supply-farmer-8",
  "name": "温室苹果派",
  "original": "Empire biscuits",
  "price": 99999999999999,
  "power": 2
 },
 {
  "id": "supply-farmer-9",
  "name": "四季鲜果盘",
  "original": "Madeleines",
  "price": 499999999999995,
  "power": 2
 },
 {
  "id": "supply-farmer-10",
  "name": "沃土营养露",
  "original": "Palmiers",
  "price": 499999999999995,
  "power": 2
 },
 {
  "id": "supply-farmer-11",
  "name": "云田补给箱",
  "original": "Palets",
  "price": 999999999999999,
  "power": 2
 },
 {
  "id": "supply-farmer-12",
  "name": "时空丰收宴",
  "original": "Sabl&eacute;s",
  "price": 999999999999999,
  "power": 2
 },
 {
  "id": "supply-farmer-13",
  "name": "起源果园餐",
  "original": "Gingerbread men",
  "price": 10000000000000000,
  "power": 2
 },
 {
  "id": "supply-all-chocolate-cookies",
  "name": "社员咖啡",
  "original": "Gingerbread trees",
  "price": 10000000000000000,
  "power": 2
 },
 {
  "id": "supply-dark-chocolate-coated-cookies",
  "name": "工位苹果茶",
  "original": "Pure black chocolate cookies",
  "price": 50000000000000000,
  "power": 5
 },
 {
  "id": "supply-white-chocolate-coated-cookies",
  "name": "团建水果盘",
  "original": "Pure white chocolate cookies",
  "price": 50000000000000000,
  "power": 5
 },
 {
  "id": "supply-eclipse-cookies",
  "name": "食堂苹果派",
  "original": "Ladyfingers",
  "price": 100000000000000000,
  "power": 3
 },
 {
  "id": "supply-zebra-cookies",
  "name": "带薪下午茶",
  "original": "Tuiles",
  "price": 500000000000000000,
  "power": 3
 },
 {
  "id": "supply-snickerdoodles",
  "name": "双层果酱包",
  "original": "Chocolate-stuffed biscuits",
  "price": 1000000000000000000,
  "power": 3
 },
 {
  "id": "supply-stroopwafels",
  "name": "芝士苹果卷",
  "original": "Checker cookies",
  "price": 5000000000000000000,
  "power": 3
 },
 {
  "id": "supply-macaroons",
  "name": "办公室零食箱",
  "original": "Butter cookies",
  "price": 10000000000000000000,
  "power": 3
 },
 {
  "id": "supply-empire-biscuits",
  "name": "庆功苹果塔",
  "original": "Cream cookies",
  "price": 50000000000000000000,
  "power": 3
 },
 {
  "id": "supply-madeleines",
  "name": "员工特供餐",
  "original": "Gingersnaps",
  "price": 100000000000000000000,
  "power": 4
 },
 {
  "id": "supply-palmiers",
  "name": "周五甜品盒",
  "original": "Cinnamon cookies",
  "price": 500000000000000000000,
  "power": 4
 },
 {
  "id": "supply-palets",
  "name": "夜班能量粥",
  "original": "Vanity cookies",
  "price": 1e+21,
  "power": 4
 },
 {
  "id": "supply-sabl-eacute-s",
  "name": "年度聚餐券",
  "original": "Cigars",
  "price": 5e+21,
  "power": 4
 },
 {
  "id": "supply-gingerbread-men",
  "name": "全员丰收宴",
  "original": "Pinwheel cookies",
  "price": 1e+22,
  "power": 4
 },
 {
  "id": "supply-sprinkles-cookies",
  "name": "国王御用果汁",
  "original": "Fudge squares",
  "price": 5e+22,
  "power": 4
 },
 {
  "id": "supply-peanut-butter-blossoms",
  "name": "皇家苹果酥",
  "original": "Shortbread biscuits",
  "price": 1e+23,
  "power": 4
 },
 {
  "id": "supply-no-bake-cookies",
  "name": "王冠曲奇",
  "original": "Millionaires' shortbreads",
  "price": 5e+23,
  "power": 4
 },
 {
  "id": "supply-florentines",
  "name": "宫廷水果茶",
  "original": "Caramel cookies",
  "price": 1e+24,
  "power": 4
 },
 {
  "id": "supply-chocolate-crinkles",
  "name": "金杯苹果露",
  "original": "Pecan sandies",
  "price": 4.999999999999999e+24,
  "power": 4
 },
 {
  "id": "supply-maple-cookies",
  "name": "御膳苹果盅",
  "original": "Moravian spice cookies",
  "price": 1e+25,
  "power": 4
 },
 {
  "id": "supply-persian-rice-cookies",
  "name": "丰收典礼饼",
  "original": "Anzac biscuits",
  "price": 5e+25,
  "power": 4
 },
 {
  "id": "supply-norwegian-cookies",
  "name": "王室午宴",
  "original": "Buttercakes",
  "price": 1e+26,
  "power": 4
 },
 {
  "id": "supply-crispy-rice-cookies",
  "name": "海域贡品盒",
  "original": "Ice cream sandwiches",
  "price": 5e+26,
  "power": 4
 },
 {
  "id": "supply-ube-cookies",
  "name": "黄金加冕派",
  "original": "Pink biscuits",
  "price": 1e+27,
  "power": 4
 },
 {
  "id": "supply-butterscotch-cookies",
  "name": "远洋盛宴",
  "original": "Whole-grain cookies",
  "price": 5e+27,
  "power": 4
 },
 {
  "id": "supply-speculaas",
  "name": "皇庭蜜苹果",
  "original": "Candy cookies",
  "price": 1e+28,
  "power": 4
 },
 {
  "id": "supply-chocolate-oatmeal-cookies",
  "name": "万民同乐餐",
  "original": "Big chip cookies",
  "price": 5e+28,
  "power": 4
 },
 {
  "id": "supply-molasses-cookies",
  "name": "诸海庆典宴",
  "original": "One chip cookies",
  "price": 1e+29,
  "power": 1
 },
 {
  "id": "supply-shark-0",
  "name": "鲨鱼磨牙糖",
  "original": "Sprinkles cookies",
  "price": 4.9999999999999994e+29,
  "power": 4
 },
 {
  "id": "supply-shark-1",
  "name": "锯齿苹果片",
  "original": "Peanut butter blossoms",
  "price": 1e+30,
  "power": 4
 },
 {
  "id": "supply-shark-2",
  "name": "深海能量棒",
  "original": "No-bake cookies",
  "price": 5e+30,
  "power": 4
 },
 {
  "id": "supply-shark-3",
  "name": "巡猎营养餐",
  "original": "Florentines",
  "price": 1e+31,
  "power": 4
 },
 {
  "id": "supply-shark-4",
  "name": "激流果汁",
  "original": "Chocolate crinkles",
  "price": 4.999999999999999e+31,
  "power": 4
 },
 {
  "id": "supply-shark-5",
  "name": "巨齿脆饼",
  "original": "Maple cookies",
  "price": 1e+32,
  "power": 4
 },
 {
  "id": "supply-shark-6",
  "name": "嗅觉活力汤",
  "original": "Persian rice cookies",
  "price": 5.0000000000000004e+32,
  "power": 4
 },
 {
  "id": "supply-shark-7",
  "name": "极速补给包",
  "original": "Norwegian cookies",
  "price": 1e+33,
  "power": 4
 },
 {
  "id": "supply-shark-8",
  "name": "深潜苹果冻",
  "original": "Crispy rice cookies",
  "price": 5e+33,
  "power": 4
 },
 {
  "id": "supply-shark-9",
  "name": "猎场水果盘",
  "original": "Ube cookies",
  "price": 1e+34,
  "power": 4
 },
 {
  "id": "supply-shark-10",
  "name": "音速能量饮",
  "original": "Butterscotch cookies",
  "price": 5e+34,
  "power": 4
 },
 {
  "id": "supply-shark-11",
  "name": "星海巡游餐",
  "original": "Speculaas",
  "price": 1e+35,
  "power": 4
 },
 {
  "id": "supply-shark-12",
  "name": "深渊庆功宴",
  "original": "Chocolate oatmeal cookies",
  "price": 4.9999999999999995e+35,
  "power": 4
 },
 {
  "id": "supply-shark-13",
  "name": "鲨王丰收杯",
  "original": "Molasses cookies",
  "price": 1e+36,
  "power": 4
 },
 {
  "id": "supply-fudge-squares",
  "name": "小丑彩虹糖",
  "original": "Biscotti",
  "price": 5.0000000000000004e+36,
  "power": 4
 },
 {
  "id": "supply-shortbread-biscuits",
  "name": "杂耍苹果球",
  "original": "Waffle cookies",
  "price": 1e+37,
  "power": 4
 },
 {
  "id": "supply-millionaires-shortbreads",
  "name": "笑脸松饼",
  "original": "Custard creams",
  "price": 5e+37,
  "power": 4
 },
 {
  "id": "supply-caramel-cookies",
  "name": "马戏爆米花",
  "original": "Bourbon biscuits",
  "price": 1e+38,
  "power": 4
 },
 {
  "id": "supply-pecan-sandies",
  "name": "礼帽奶油杯",
  "original": "Mini-cookies",
  "price": 5e+38,
  "power": 5
 },
 {
  "id": "supply-moravian-spice-cookies",
  "name": "旋转苹果卷",
  "original": "Whoopie pies",
  "price": 1e+39,
  "power": 5
 },
 {
  "id": "supply-anzac-biscuits",
  "name": "独轮车餐盒",
  "original": "Caramel wafer biscuits",
  "price": 3.162277660168379e+39,
  "power": 5
 },
 {
  "id": "supply-buttercakes",
  "name": "掌声汽水",
  "original": "Chocolate chip mocha cookies",
  "price": 9.999999999999999e+39,
  "power": 5
 },
 {
  "id": "supply-ice-cream-sandwiches",
  "name": "巡演分享桶",
  "original": "Chai tea cookies",
  "price": 3.162277660168379e+40,
  "power": 5
 },
 {
  "id": "supply-pink-biscuits",
  "name": "空中飞鱼饼",
  "original": "Earl Grey cookies",
  "price": 3.162277660168379e+40,
  "power": 5
 },
 {
  "id": "supply-whole-grain-cookies",
  "name": "舞台魔法糖",
  "original": "Corn syrup cookies",
  "price": 1e+41,
  "power": 5
 },
 {
  "id": "supply-candy-cookies",
  "name": "欢乐马戏宴",
  "original": "Icebox cookies",
  "price": 3.1622776601683787e+41,
  "power": 5
 },
 {
  "id": "supply-big-chip-cookies",
  "name": "满场喝彩派",
  "original": "Graham crackers",
  "price": 9.999999999999999e+41,
  "power": 5
 },
 {
  "id": "supply-one-chip-cookies",
  "name": "海洋狂欢塔",
  "original": "Hardtack",
  "price": 3.1622776601683787e+42,
  "power": 5
 },
 {
  "id": "supply-cornflake-cookies",
  "name": "变异维生素",
  "original": "Cornflake cookies",
  "price": 9.999999999999999e+42,
  "power": 5
 },
 {
  "id": "supply-gluten-free-cookies",
  "name": "双芯苹果糖",
  "original": "Gluten-free cookies",
  "price": 3.162277660168379e+43,
  "power": 5
 },
 {
  "id": "supply-tofu-cookies",
  "name": "荧光营养冻",
  "original": "Tofu cookies",
  "price": 3.162277660168379e+43,
  "power": 5
 },
 {
  "id": "supply-russian-bread-cookies",
  "name": "触手能量餐",
  "original": "Russian bread cookies",
  "price": 9.999999999999999e+43,
  "power": 5
 },
 {
  "id": "supply-lebkuchen",
  "name": "再生果浆",
  "original": "Lebkuchen",
  "price": 3.162277660168379e+44,
  "power": 5
 },
 {
  "id": "supply-aachener-printen",
  "name": "细胞活力露",
  "original": "Aachener Printen",
  "price": 1e+45,
  "power": 5
 },
 {
  "id": "supply-canistrelli",
  "name": "基因培育汤",
  "original": "Canistrelli",
  "price": 3.1622776601683795e+45,
  "power": 5
 },
 {
  "id": "supply-nice-biscuits",
  "name": "双倍螺旋饼",
  "original": "Nice biscuits",
  "price": 1e+46,
  "power": 5
 },
 {
  "id": "supply-french-pure-butter-cookies",
  "name": "适应性营养包",
  "original": "French pure butter cookies",
  "price": 3.1622776601683787e+46,
  "power": 5
 },
 {
  "id": "supply-petit-beurre",
  "name": "超能果冻杯",
  "original": "Petit beurre",
  "price": 3.1622776601683787e+46,
  "power": 5
 },
 {
  "id": "supply-nanaimo-bars",
  "name": "分裂苹果派",
  "original": "Nanaimo bars",
  "price": 9.999999999999998e+46,
  "power": 5
 },
 {
  "id": "supply-berger-cookies",
  "name": "进化补给箱",
  "original": "Berger cookies",
  "price": 3.1622776601683793e+47,
  "power": 5
 },
 {
  "id": "supply-chinsuko",
  "name": "生命重组餐",
  "original": "Chinsuko",
  "price": 9.999999999999999e+47,
  "power": 5
 },
 {
  "id": "supply-panda-koala-biscuits",
  "name": "终极营养宴",
  "original": "Panda koala biscuits",
  "price": 9.999999999999999e+47,
  "power": 5
 },
 {
  "id": "supply-putri-salju",
  "name": "外星冻干果",
  "original": "Putri salju",
  "price": 3.162277660168379e+48,
  "power": 5
 },
 {
  "id": "supply-milk-cookies",
  "name": "飞碟餐盒",
  "original": "Milk cookies",
  "price": 1e+49,
  "power": 5
 },
 {
  "id": "supply-kruidnoten",
  "name": "零重力果汁",
  "original": "Kruidnoten",
  "price": 3.1622776601683793e+49,
  "power": 5
 },
 {
  "id": "supply-marie-biscuits",
  "name": "等离子苹果冻",
  "original": "Marie biscuits",
  "price": 9.999999999999999e+49,
  "power": 5
 },
 {
  "id": "supply-meringue-cookies",
  "name": "量子果酱",
  "original": "Meringue cookies",
  "price": 3.162277660168379e+50,
  "power": 5
 },
 {
  "id": "supply-yogurt-cookies",
  "name": "星际旅行餐",
  "original": "Yogurt cookies",
  "price": 1e+51,
  "power": 5
 },
 {
  "id": "supply-thumbprint-cookies",
  "name": "虫洞苹果圈",
  "original": "Thumbprint cookies",
  "price": 3.1622776601683795e+51,
  "power": 5
 },
 {
  "id": "supply-pizzelle",
  "name": "月面营养棒",
  "original": "Pizzelle",
  "price": 1e+52,
  "power": 5
 },
 {
  "id": "supply-granola-cookies",
  "name": "曲速补给液",
  "original": "Granola cookies",
  "price": 3.162277660168379e+52,
  "power": 5
 },
 {
  "id": "supply-ricotta-cookies",
  "name": "银河水果盘",
  "original": "Ricotta cookies",
  "price": 1e+53,
  "power": 5
 },
 {
  "id": "supply-roze-koeken",
  "name": "母舰特供餐",
  "original": "Roze koeken",
  "price": 3.162277660168379e+53,
  "power": 5
 },
 {
  "id": "supply-peanut-butter-cup-cookies",
  "name": "引力苹果派",
  "original": "Peanut butter cup cookies",
  "price": 9.999999999999999e+53,
  "power": 5
 },
 {
  "id": "supply-sesame-cookies",
  "name": "平行宇宙餐",
  "original": "Sesame cookies",
  "price": 3.1622776601683785e+54,
  "power": 5
 },
 {
  "id": "supply-taiyaki",
  "name": "万星丰收宴",
  "original": "Taiyaki",
  "price": 9.999999999999999e+54,
  "power": 5
 },
 {
  "id": "supply-biscotti",
  "name": "海绵营养奶",
  "original": "Vanillekipferl",
  "price": 3.162277660168379e+55,
  "power": 5
 },
 {
  "id": "supply-waffle-cookies",
  "name": "气孔苹果糕",
  "original": "Battenberg biscuits",
  "price": 9.999999999999999e+55,
  "power": 5
 },
 {
  "id": "supply-custard-creams",
  "name": "珊瑚果冻",
  "original": "Rosette cookies",
  "price": 3.1622776601683794e+56,
  "power": 5
 },
 {
  "id": "supply-bourbon-biscuits",
  "name": "海风舒芙蕾",
  "original": "Gangmakers",
  "price": 9.999999999999999e+56,
  "power": 5
 },
 {
  "id": "supply-mini-cookies",
  "name": "潮汐气泡饮",
  "original": "Welsh cookies",
  "price": 3.1622776601683795e+57,
  "power": 5
 },
 {
  "id": "supply-whoopie-pies",
  "name": "深海矿物汤",
  "original": "Raspberry cheesecake cookies",
  "price": 1e+58,
  "power": 5
 },
 {
  "id": "supply-caramel-wafer-biscuits",
  "name": "云朵苹果棉",
  "original": "Bokkenpootjes",
  "price": 3.162277660168379e+58,
  "power": 5
 },
 {
  "id": "supply-chocolate-chip-mocha-cookies",
  "name": "蓬松海绵卷",
  "original": "Fat rascals",
  "price": 1e+59,
  "power": 5
 },
 {
  "id": "supply-chai-tea-cookies",
  "name": "深层养分露",
  "original": "Ischler cookies",
  "price": 3.1622776601683793e+59,
  "power": 5
 },
 {
  "id": "supply-earl-grey-cookies",
  "name": "海流补给包",
  "original": "Matcha cookies",
  "price": 3.1622776601683793e+59,
  "power": 5
 },
 {
  "id": "supply-corn-syrup-cookies",
  "name": "雨云果汁桶",
  "original": "Dalgona cookies",
  "price": 1e+60,
  "power": 5
 },
 {
  "id": "supply-icebox-cookies",
  "name": "星云营养餐",
  "original": "Spicy cookies",
  "price": 3.1622776601683792e+60,
  "power": 5
 },
 {
  "id": "supply-graham-crackers",
  "name": "潮汐丰收派",
  "original": "Smile cookies",
  "price": 1e+61,
  "power": 5
 },
 {
  "id": "supply-hardtack",
  "name": "生命之海饮",
  "original": "Kolachy cookies",
  "price": 3.162277660168379e+61,
  "power": 5
 },
 {
  "id": "supply-gomma-cookies",
  "name": "鱼神祈愿露",
  "original": "Gomma cookies",
  "price": 9.999999999999998e+61,
  "power": 5
 },
 {
  "id": "supply-vegan-cookies",
  "name": "圣光苹果糖",
  "original": "Vegan cookies",
  "price": 3.162277660168379e+62,
  "power": 5
 },
 {
  "id": "supply-coyotas",
  "name": "神谕营养餐",
  "original": "Coyotas",
  "price": 9.999999999999999e+62,
  "power": 5
 },
 {
  "id": "supply-frosted-sugar-cookies",
  "name": "天赐甘露饮",
  "original": "Frosted sugar cookies",
  "price": 3.162277660168379e+63,
  "power": 5
 },
 {
  "id": "supply-marshmallow-sandwich-cookies",
  "name": "丰收圣杯羹",
  "original": "Marshmallow sandwich cookies",
  "price": 1e+64,
  "power": 5
 },
 {
  "id": "supply-web-cookies",
  "name": "神域苹果蜜",
  "original": "Web cookies",
  "price": 3.1622776601683795e+64,
  "power": 5
 },
 {
  "id": "supply-havreflarn",
  "name": "星辰供奉饼",
  "original": "Havreflarn",
  "price": 9.999999999999998e+64,
  "power": 5
 },
 {
  "id": "supply-alfajores",
  "name": "万物祝福餐",
  "original": "Alfajores",
  "price": 3.1622776601683793e+65,
  "power": 5
 },
 {
  "id": "supply-gaufrettes",
  "name": "因果果酱",
  "original": "Gaufrettes",
  "price": 1e+66,
  "power": 5
 },
 {
  "id": "supply-cookie-bars",
  "name": "创世苹果派",
  "original": "Cookie bars",
  "price": 3.1622776601683793e+66,
  "power": 5
 },
 {
  "id": "supply-snowball-cookies",
  "name": "诸天盛宴",
  "original": "Snowball cookies",
  "price": 9.999999999999998e+66,
  "power": 5
 },
 {
  "id": "supply-sequilhos",
  "name": "永恒丰收露",
  "original": "Sequilhos",
  "price": 3.162277660168379e+67,
  "power": 5
 },
 {
  "id": "supply-hazelnut-swirlies",
  "name": "万果归一餐",
  "original": "Hazelnut swirlies",
  "price": 1.0000000000000001e+68,
  "power": 5
 },
 {
  "id": "supply-spritz-cookies",
  "name": "无限神恩宴",
  "original": "Spritz cookies",
  "price": 3.162277660168379e+68,
  "power": 5
 },
 {
  "id": "supply-mbatata-cookies",
  "name": "起源之海圣果",
  "original": "Mbatata cookies",
  "price": 9.999999999999999e+68,
  "power": 5
 },
 {
  "id": "supply-springerles",
  "name": "宇宙尽头苹果宴",
  "original": "Springerles",
  "price": 3.1622776601683793e+69,
  "power": 5
 }
];
 const fingers=[["Thousand fingers", 100000], ["Million fingers", 10000000], ["Billion fingers", 100000000], ["Trillion fingers", 1000000000], ["Quadrillion fingers", 10000000000], ["Quintillion fingers", 10000000000000], ["Sextillion fingers", 10000000000000000], ["Septillion fingers", 10000000000000000000], ["Octillion fingers", 10000000000000000000000], ["Nonillion fingers", 10000000000000000000000000], ["Decillion fingers", 10000000000000000000000000000], ["Undecillion fingers", 10000000000000000000000000000000]];
 const upgrades=[
  ...supplies.slice().sort((a,b)=>a.price-b.price).slice(0,100).map(u=>({...u,kind:'global',earned:u.price/20})),
  ...rows.map(u=>({...u,need:needs[u.tier],price:buildings[u.building].price*prices[u.tier],kind:'double',clickPercent:u.building>0&&u.tier<2?1:0})),
  ...[{"id": "mentor-staff", "original": "Farmer grandmas", "building": 2, "name": "鱼人社员协作", "need": 15, "kind": "mentor"}, {"id": "mentor-4", "original": "Miner grandmas", "building": 3, "name": "国王鱼人协作", "need": 15, "kind": "mentor"}, {"id": "mentor-shark", "original": "Worker grandmas", "building": 4, "name": "鲨鱼鱼人协作", "need": 15, "kind": "mentor"}, {"id": "mentor-3", "original": "Banker grandmas", "building": 5, "name": "小丑鱼人协作", "need": 15, "kind": "mentor"}, {"id": "mentor-6", "original": "Priestess grandmas", "building": 6, "name": "变异鱼人协作", "need": 15, "kind": "mentor"}, {"id": "mentor-7", "original": "Witch grandmas", "building": 7, "name": "外星鱼人协作", "need": 15, "kind": "mentor"}, {"id": "mentor-5", "original": "Cosmic grandmas", "building": 8, "name": "海绵鱼人协作", "need": 15, "kind": "mentor"}, {"id": "mentor-9", "original": "Transmuted grandmas", "building": 9, "name": "鱼神协作", "need": 15, "kind": "mentor"}].map(u=>({...u,price:buildings[u.building].price*50})),
  ...[{id:'finger',price:100,need:1},{id:'cream',price:500,need:1},{id:'hands',price:10000,need:10},...fingers.map(([,price],i)=>({id:'fingers-'+i,price,need:i===0?25:i*50}))].map((slot,i)=>({...slot,building:0,...(i<12?{kind:'fingers',synergyIndex:i,name:i===0?'全员搭把手':`全员协作 ${i}`,factor:i===0?1:i===1?5:i===2?10:20}:{kind:'fish-global',power:i-11,name:`全体协作 ${i-11}`} )})),
 ];
 // Last three upgrades of every fish add a global completion benefit.
 for(let building=0;building<buildings.length;building++){
  const tail=upgrades.filter(u=>u.building===building&&['double','mentor','fingers','fish-global'].includes(u.kind)).sort((a,b)=>a.price-b.price).slice(-3);
  tail.forEach((u,i)=>{if(u.kind==='fish-global')u.power=i+1;else u.globalBonus=i+1});
 }
 return upgrades;
}
