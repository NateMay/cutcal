import {
  applyReplacements,
  createSearchTerm,
  removeAfter,
  removeBlacklist,
  splitFdcName
} from './createSearchTerm';

describe('scrapeImage()', () => {
  it('scrapeImage should split the string parts', () => {
    expect(splitFdcName('oijefis hjgajshd, 100% asdjhgas (asdn82n)')).toEqual([
      'oijefis hjgajshd',
      '100% asdjhgas',
      'asdn82n'
    ]);
  });

  it('removeBlacklist() removes useless segments', () => {
    expect(
      removeBlacklist([
        'oijefis hjgajshd',
        'asdn82n',
        'NS as to fat 80%',
        'fortified with iron',
        'oiuashn872 28o723 ejhbacs',
        '100% fruit juice'
      ])
    ).toEqual(['oijefis hjgajshd', 'asdn82n', 'oiuashn872 28o723 ejhbacs']);
  });

  it('applyReplacements()', () => {
    expect(
      applyReplacements([
        'ihiuaduuGyu8 and/or ibaschas',
        'Babyfood',
        'cooked or canned',
        'baked or broiled'
      ])
    ).toEqual(['ihiuaduuGyu8 and ibaschas', 'baby food', 'canned', 'broiled']);
  });
  it('createSearchTerm()', () => {
    expect(
      createSearchTerm({
        fdcId: 23424,
        description:
          'Bean and ham soup, canned, reduced sodium, prepared with water or ready-to-serve',
        foodNutrients: []
      })
    ).toEqual('Bean and ham soup, canned');

    expect(
      createSearchTerm({
        fdcId: 98723,
        description:
          'Beans, string, green, with spaetzel, cooked, NS as to fat added in cooking',
        foodNutrients: []
      })
    ).toEqual('Beans, string, green, with spaetzel, cooked');

    expect(
      createSearchTerm({
        fdcId: 10473,
        description:
          'Beef with vegetables excluding carrots, broccoli, and dark-green leafy; no potatoes, tomato-based sauce',
        foodNutrients: []
      })
    ).toEqual(
      'Beef with vegetables, broccoli, and dark-green leafy, , tomato-based sauce'
    );

    expect(
      createSearchTerm({
        fdcId: 10473,
        description: 'Buttermilk, reduced fat (2%)',
        foodNutrients: []
      })
    ).toEqual('Buttermilk');

    expect(
      createSearchTerm({
        fdcId: 10473,
        description: 'Cereal (Post Great Grains Raisins, Dates, and Pecans)',
        foodNutrients: []
      })
    ).toEqual('Cereal, Post Great Grains Raisins, Dates, and Pecans');

    expect(
      createSearchTerm({
        fdcId: 10473,
        description: 'Chocolate milk, ready to drink, low fat (Nesquik)',
        foodNutrients: []
      })
    ).toEqual('Chocolate milk, Nesquik');

    expect(
      createSearchTerm({
        fdcId: 10473,
        description:
          'Coffee, instant, decaffeinated, pre-lightened and pre-sweetened with low calorie sweetener, reconstituted',
        foodNutrients: []
      })
    ).toEqual('Coffee, instant, decaffeinated');
  });

  it('removeAfter() removes the string after the provided indexies', () => {
    expect(
      removeAfter(['Coffee', 'instant', 'caffeinated or decaffeinated'])
    ).toEqual(['Coffee', 'instant', 'caffeinated']);

    expect(
      removeAfter([
        'Beef with vegetables excluding carrots',
        'broccoli',
        'and dark-green leafy',
        'no potatoes',
        'mushroom sauce'
      ])
    ).toEqual([
      'Beef with vegetables',
      'broccoli',
      'and dark-green leafy',
      '',
      'mushroom sauce'
    ]);
  });
  // _it('scrapeImage')
});
