const { Shop, Item } = require('../src/gilded_rose')

describe('Gilded Rose', function () {

  describe('default item behavior', () => {
    it('should have a name value', function () {
      const gildedRose = new Shop([new Item('foo', 0, 0)])
      const items = gildedRose.updateQuality()
      expect(items[0].name).toBe('foo')
    })

    it('should have a sellIn value that decreases at the end of the day', () => {
      const gildedRose = new Shop([new Item('foo', 10, 20)])
      const items = gildedRose.updateQuality()
      expect(items[0].sellIn).toBe(9)
    })

    it('should have a quality value that decreases at the end of the day', () => {
      const gildedRose = new Shop([new Item('foo', 10, 20)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toBe(19)
    })

    it('should degrade quality twice as fast once sellIn has passed', () => {
      const gildedRose = new Shop([new Item('foo', 0, 20)])
      const items = gildedRose.updateQuality()
      expect(items[0].sellIn).toBe(-1)
      expect(items[0].quality).toBe(18)
    })

    it('should never have a negative quality value', () => {
      const gildedRose = new Shop([new Item('foo', 10, 0)])
      const items = gildedRose.updateQuality()
      expect(items[0].quality).toBe(0)
    })
  })

  describe('specialty item behavior', () => {

    describe('Aged Brie', () => {
      it('should increase in quality', () => {
        const gildedRose = new Shop([new Item('Aged Brie', 10, 20)])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(9)
        expect(items[0].quality).toBe(21)
      })


      it('should never have a quality value over 50', () => {
        const gildedRose = new Shop([new Item('Aged Brie', 10, 50)])
        const items = gildedRose.updateQuality()
        expect(items[0].quality).toBe(50)
      })
    })

    describe('Sulfuras, Hand of Ragnaros', () => {
      it('should not change quality or sellIn', () => {
        const gildedRose = new Shop([
          new Item('Sulfuras, Hand of Ragnaros', 10, 20)
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(10)
        expect(items[0].quality).toBe(20)
      })
    })

    describe('Backstage passes to a TAFKAL80ETC concert', () => {
      it('should increase in quality if sellIn is 11 days or more', () => {
        const gildedRose = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 12, 20),
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(11)
        expect(items[0].quality).toBe(21)
      })

      it('should increase in quality if sellIn is 11 days or more - but never more than 50', () => {
        const gildedRose = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 11, 50)
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(10)
        expect(items[0].quality).toBe(50)
      })

      it('should increase quality value by 2 when sellIn is between 10 days and 6', () => {
        const gildedRose = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(9)
        expect(items[0].quality).toBe(22)
      })

      it('should increase quality value by 2 when sellIn is between 10 days and 6 - but never more than 50', () => {
        const gildedRose = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(9)
        expect(items[0].quality).toBe(50)
      })

      it('should increase quality value by 3 when sellIn is between 5 days and 0', () => {
        const gildedRose = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(4)
        expect(items[0].quality).toBe(23)
      })

      it('should increase quality value by 3 when sellIn is between 5 days and 0 - but never more than 50', () => {
        const gildedRose = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(4)
        expect(items[0].quality).toBe(50)
      })

      it('should drop quality value to 0 when sellIn has passed', () => {
        const gildedRose = new Shop([
          new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20),
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(-1)
        expect(items[0].quality).toBe(0)
      })
    })

    describe('conjured items', () => {
      it('should degrade quality twice as fast as normal items', () => {
        const gildedRose = new Shop([
          new Item('conjured glove', 5, 10),
          new Item('Conjured cup', 10, 20),
          new Item('CONJURED hat', 15, 30)
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(4)
        expect(items[0].quality).toBe(8)

        expect(items[1].quality).toBe(18)

        expect(items[2].quality).toBe(28)
      })

      it('should degrade quality twice as fast once sellIn has passed', () => {
        const gildedRose = new Shop([
          new Item('conjured glove', 0, 10)
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(-1)
        expect(items[0].quality).toBe(6)
      })

      it('should never have a negative quality value', () => {
        const gildedRose = new Shop([
          new Item('conjured glove', 5, 1)
        ])
        const items = gildedRose.updateQuality()
        expect(items[0].sellIn).toBe(4)
        expect(items[0].quality).toBe(0)
      })
    })
  })
})