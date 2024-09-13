class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

const ItemHandler = {
  'Aged Brie': (item) => {
    item.sellIn -= 1

    if (item.quality < 50) {
      item.quality += 1
    }
  },
  'Sulfuras, Hand of Ragnaros': (_item) => { },
  'Backstage passes to a TAFKAL80ETC concert': (item) => {
    item.sellIn -= 1

    if (item.sellIn >= 11) {
      item.quality += 1
    } else if (item.sellIn >= 6) {
      item.quality += 2
    } else if (item.sellIn > 0) {
      item.quality += 3
    } else {
      item.quality = 0
    }

    if (item.quality > 50) {
      item.quality = 50
    }
  },
  'default': (item) => {
    item.sellIn -= 1

    if (item.sellIn > 0) {
      item.quality -= 1
    } else {
      item.quality -= 2
    }

    if (item.quality < 0) {
      item.quality = 0
    }
  }

}

class Shop {
  constructor(items = []) {
    this.items = items
  }
  updateQuality() {

    this.items.forEach(item => {
      const handleItemName = Object.hasOwn(ItemHandler, item.name) ? item.name : 'default'
      ItemHandler[handleItemName](item)
    })
    return this.items
  }
}

module.exports = {
  Item,
  Shop
}
