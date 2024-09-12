class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

class Shop {
  constructor(items = []) {
    this.items = items
  }
  updateQuality() {

    this.items.forEach(item => {
      switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros':
          break
        case 'Aged Brie':
          item.sellIn -= 1

          if (item.quality < 50) {
            item.quality += 1
          }
          break
        case 'Backstage passes to a TAFKAL80ETC concert':
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

          break
        default:
          item.sellIn -= 1

          if (item.sellIn < 0) {
            item.quality -= 2
          } else {
            item.quality -= 1
          }

          if (item.quality < 0) {
            item.quality = 0
          }
          break
      }
    })
    return this.items
  }
}

module.exports = {
  Item,
  Shop
}
