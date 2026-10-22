// Clothing-only catalog synced from yuren; order matches wardrobe filters.
const WARDROBE_CATEGORIES=[
  {
    "id": "suit",
    "name": "套装",
    "items": [
      {
        "id": "clown-suit",
        "name": "小丑鱼人套装",
        "icon": "character/upstream/svg/clown-suit.svg",
        "pieces": {
          "skin": "clown",
          "helmet": "party-hat"
        }
      },
      {
        "id": "shark-suit",
        "name": "鲨鱼人套装",
        "icon": "character/upstream/svg/shark-suit.svg",
        "pieces": {
          "skin": "flesh",
          "helmet": "shark-hood",
          "pants": "black-shorts"
        }
      },
      {
        "id": "pochita-suit",
        "name": "波吉塔套装",
        "icon": "character/upstream/svg/pochita-suit.svg",
        "pieces": {
          "skin": "pochita",
          "helmet": "chainsaw"
        }
      },
      {
        "id": "batfish-suit",
        "name": "蝙蝠侠鱼人套装",
        "icon": "character/upstream/svg/batfish-suit.svg",
        "pieces": {
          "helmet": "batfish-cowl",
          "shirt": "batfish-armor",
          "pants": "batfish-trousers",
          "shoes": "batfish-boots",
          "gloves": "batfish-gloves",
          "cape": "charcoal-cape"
        }
      },
      {
        "id": "ivory-suit",
        "name": "白金国王套装",
        "icon": "character/upstream/svg/ivory-suit.svg",
        "pieces": {
          "helmet": "crown",
          "shirt": "ivory-tunic",
          "pants": "ivory-trousers",
          "shoes": "dark-boots",
          "neck": "silver-collar",
          "cape": "crimson-cape"
        }
      },
      {
        "id": "navy-suit",
        "name": "藏蓝西装套装",
        "icon": "character/upstream/svg/navy-suit.svg",
        "pieces": {
          "shirt": "suit-jacket",
          "pants": "suit-trousers",
          "shoes": "black-dress-shoes"
        }
      },
      {
        "id": "royal-suit",
        "name": "红白国王套装",
        "icon": "character/upstream/svg/royal-suit.svg",
        "pieces": {
          "helmet": "crown",
          "shirt": "royal-coat",
          "pants": "royal-trousers",
          "shoes": "royal-shoes",
          "neck": "royal-collar",
          "cape": "crimson-cape"
        }
      }
    ]
  },
  {
    "id": "skin",
    "name": "皮肤",
    "items": [
      {
        "id": null,
        "name": "普通皮肤",
        "icon": "character/upstream/svg/default-skin.svg"
      },
      {
        "id": "milk-frog",
        "name": "奶鱼",
        "icon": "character/upstream/svg/milk-frog.svg"
      },
      {
        "id": "pochita",
        "name": "波吉塔皮肤",
        "icon": "character/upstream/svg/pochita.svg"
      },
      {
        "id": "flesh",
        "name": "肉色皮肤",
        "icon": "character/upstream/svg/flesh-skin.svg"
      },
      {
        "id": "clown",
        "name": "小丑皮肤",
        "icon": "character/upstream/svg/clown-skin.svg"
      },
      {
        "id": "alien",
        "name": "外星皮肤",
        "icon": "character/upstream/svg/alien-skin.svg"
      }
    ]
  },
  {
    "id": "helmet",
    "name": "帽子",
    "items": [
      {
        "id": "party-hat",
        "name": "派对帽",
        "icon": "character/upstream/svg/party-hat.svg"
      },
      {
        "id": "shark-hood",
        "name": "鲨鱼头套",
        "icon": "character/upstream/svg/shark-hood.svg"
      },
      {
        "id": "chainsaw",
        "name": "电锯头盔",
        "icon": "character/upstream/svg/chainsaw.svg"
      },
      {
        "id": "batfish-cowl",
        "name": "尖耳头罩",
        "icon": "character/upstream/svg/batfish-cowl.svg"
      },
      {
        "id": "plain",
        "name": "普通帽子",
        "icon": "character/upstream/svg/toukui.svg"
      },
      {
        "id": "yellow-hat",
        "name": "黄色宽檐帽",
        "icon": "character/upstream/svg/yellow-hat.svg"
      },
      {
        "id": "crown",
        "name": "皇冠",
        "icon": "character/upstream/svg/crown.svg"
      }
    ]
  },
  {
    "id": "neck",
    "name": "颈部",
    "items": [
      {
        "id": "silver-collar",
        "name": "简约金色项圈",
        "icon": "character/upstream/svg/silver-collar.svg"
      },
      {
        "id": "royal-collar",
        "name": "国王白毛领",
        "icon": "character/upstream/svg/royal-collar.svg"
      },
      {
        "id": "scarf",
        "name": "红围巾",
        "icon": "character/upstream/svg/decoration-scarf.svg"
      }
    ]
  },
  {
    "id": "shirt",
    "name": "上衣",
    "items": [
      {
        "id": "batfish-armor",
        "name": "鱼徽战衣",
        "icon": "character/upstream/svg/batfish-armor.svg"
      },
      {
        "id": "ivory-tunic",
        "name": "白金束腰阔袖上衣",
        "icon": "character/upstream/svg/ivory-tunic.svg"
      },
      {
        "id": "royal-coat",
        "name": "国王礼服",
        "icon": "character/upstream/svg/royal-coat.svg"
      },
      {
        "id": "suit-jacket",
        "name": "藏蓝西装上衣",
        "icon": "character/upstream/svg/suit-jacket.svg"
      },
      {
        "id": "plain",
        "name": "普通长袖上衣",
        "icon": "character/upstream/svg/decoration-shirt.svg"
      },
      {
        "id": "blue-vest",
        "name": "蓝色 V 领背心",
        "icon": "character/upstream/svg/blue-vest.svg",
        "sleeveless": true
      },
      {
        "id": "yellow-tee",
        "name": "黄色宽松短袖",
        "icon": "character/upstream/svg/yellow-tee.svg"
      },
      {
        "id": "patched-tee",
        "name": "补丁短袖",
        "icon": "character/upstream/svg/patched-tee.svg"
      },
      {
        "id": "red-tee",
        "name": "红色体恤",
        "icon": "character/upstream/svg/red-tee.svg"
      },
      {
        "id": "red-triangle",
        "name": "红色三角衣服",
        "icon": "character/upstream/svg/red-triangle.svg",
        "sleeveless": true
      },
      {
        "id": "coral-tee",
        "name": "红色短袖",
        "icon": "character/upstream/svg/coral-tee.svg"
      },
      {
        "id": "loose-tee",
        "name": "宽松T恤",
        "icon": "character/upstream/svg/loose-tee.svg"
      },
      {
        "id": "loose-long-sleeve",
        "name": "宽松长袖上衣",
        "icon": "character/upstream/svg/loose-long-sleeve.svg"
      }
    ]
  },
  {
    "id": "pants",
    "name": "裤子",
    "items": [
      {
        "id": "batfish-trousers",
        "name": "深灰战裤",
        "icon": "character/upstream/svg/batfish-trousers.svg"
      },
      {
        "id": "ivory-trousers",
        "name": "象牙白阔腿裤",
        "icon": "character/upstream/svg/ivory-trousers.svg"
      },
      {
        "id": "royal-trousers",
        "name": "国王白长裤",
        "icon": "character/upstream/svg/royal-trousers.svg"
      },
      {
        "id": "suit-trousers",
        "name": "藏蓝西装长裤",
        "icon": "character/upstream/svg/suit-trousers.svg"
      },
      {
        "id": "plain",
        "name": "紧身裤",
        "icon": "character/upstream/svg/decoration-pants.svg"
      },
      {
        "id": "jumpsuit",
        "name": "蓝色连体裤",
        "icon": "character/upstream/svg/decoration-jumpsuit.svg",
        "sleeveless": true
      },
      {
        "id": "navy-jumpsuit",
        "name": "深蓝色连体裤",
        "icon": "character/upstream/svg/navy-jumpsuit.svg",
        "sleeveless": true
      },
      {
        "id": "red-shorts",
        "name": "红色内裤",
        "icon": "character/upstream/svg/red-shorts.svg"
      },
      {
        "id": "pink-shorts",
        "name": "粉色短裤",
        "icon": "character/upstream/svg/pink-shorts.svg"
      },
      {
        "id": "orange-shorts",
        "name": "橙色短裤",
        "icon": "character/upstream/svg/orange-shorts.svg"
      },
      {
        "id": "black-shorts",
        "name": "黑色短裤",
        "icon": "character/upstream/svg/black-shorts.svg"
      },
      {
        "id": "wide-shorts",
        "name": "阔腿短裤",
        "icon": "character/upstream/svg/wide-shorts.svg"
      },
      {
        "id": "skirt",
        "name": "灰青色裙子",
        "icon": "character/upstream/svg/skirt.svg"
      },
      {
        "id": "red-thong",
        "name": "红色丁字裤",
        "icon": "character/upstream/svg/red-thong.svg"
      },
      {
        "id": "wide-pants",
        "name": "蓝色裤子",
        "icon": "character/upstream/svg/wide-pants.svg"
      },
      {
        "id": "loose-wide-pants",
        "name": "几何拼贴阔腿裤",
        "icon": "character/upstream/svg/loose-wide-pants.svg"
      }
    ]
  },
  {
    "id": "outerwear",
    "name": "外套",
    "items": [
      {
        "id": "green-vest",
        "name": "绿色开襟外套",
        "icon": "character/upstream/svg/green-vest.svg",
        "sleeveless": true
      }
    ]
  },
  {
    "id": "shoes",
    "name": "鞋子",
    "items": [
      {
        "id": "batfish-boots",
        "name": "黑色战靴",
        "icon": "character/upstream/svg/batfish-boots.svg"
      },
      {
        "id": "royal-shoes",
        "name": "金扣礼鞋",
        "icon": "character/upstream/svg/royal-shoes.svg"
      },
      {
        "id": "black-dress-shoes",
        "name": "黑皮鞋",
        "icon": "character/upstream/svg/black-dress-shoes.svg"
      },
      {
        "id": "plain",
        "name": "普通鞋子",
        "icon": "character/upstream/svg/decoration-shoes.svg"
      },
      {
        "id": "brown-boots",
        "name": "棕色长靴",
        "icon": "character/upstream/svg/brown-boots.svg"
      },
      {
        "id": "dark-boots",
        "name": "深棕色长靴",
        "icon": "character/upstream/svg/dark-boots.svg"
      }
    ]
  },
  {
    "id": "cape",
    "name": "披风",
    "items": [
      {
        "id": "crimson-cape",
        "name": "绯红披风",
        "icon": "character/upstream/svg/crimson-cape.svg"
      },
      {
        "id": "charcoal-cape",
        "name": "漆黑披风",
        "icon": "character/upstream/svg/charcoal-cape.svg"
      },
      {
        "id": "azure-cape",
        "name": "湛蓝披风",
        "icon": "character/upstream/svg/azure-cape.svg"
      },
      {
        "id": "solid-red-cape",
        "name": "纯色红披风",
        "icon": "character/upstream/svg/solid-red-cape.svg"
      },
      {
        "id": "solid-blue-cape",
        "name": "纯色蓝披风",
        "icon": "character/upstream/svg/solid-blue-cape.svg"
      },
      {
        "id": "solid-black-cape",
        "name": "纯色黑披风",
        "icon": "character/upstream/svg/solid-black-cape.svg"
      }
    ]
  },
  {
    "id": "gloves",
    "name": "手套",
    "items": [
      {
        "id": "batfish-gloves",
        "name": "黑色手套",
        "icon": "character/upstream/svg/batfish-gloves.svg"
      },
      {
        "id": "plain",
        "name": "普通手套",
        "icon": "character/upstream/svg/decoration-gloves.svg"
      }
    ]
  }
];
