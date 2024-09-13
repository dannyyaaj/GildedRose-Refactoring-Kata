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
  'Backstage passes to a TAFKAL80ETC concert': (item) => {
    item.sellIn -= 1

    switch (true) {
      case (item.sellIn >= 11):
        item.quality += 1
        break
      case (item.sellIn >= 6):
        item.quality += 2
        break
      case (item.sellIn > 0):
        item.quality += 3
        break
      default:
        item.quality = 0
        break
    }

    if (item.quality > 50) {
      item.quality = 50
    }
  },
  'default': (item, decrementValue = 1) => {
    item.sellIn -= 1

    if (item.sellIn > 0) {
      item.quality -= decrementValue
    } else {
      item.quality -= decrementValue * 2
    }

    if (item.quality < 0) {
      item.quality = 0
    }
  },
  'conjured': (item) => {
    ItemHandler.default(item, 2)
  },
  'Sulfuras, Hand of Ragnaros': (_item) => { },
}

class Shop {
  constructor(items = []) {
    this.items = items
  }
  updateQuality() {

    this.items.forEach(item => {
      const handleItemName = getHandlerName(item)
      ItemHandler[handleItemName](item)
    })
    return this.items
  }
}

const getHandlerName = (item) => {

  if (item.name.toLowerCase().includes('conjured')) {
    return 'conjured'
  }
  if (Object.hasOwn(ItemHandler, item.name)) {
    return item.name
  }
  return 'default'
}

module.exports = {
  Item,
  Shop
}
