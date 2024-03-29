import { DescriptionPipe } from './description.pipe';

describe('DescriptionPipe', () => {
  it('keeps short sentences', () => {
    const para = `The onion (Allium cepa L., from Latin cepa "onion"), also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, scallion, shallot, leek, chive, and Chinese onion. This genus also contains several other species variously referred to as onions and cultivated for food, such as the Japanese bunching onion (Allium fistulosum), the tree onion (A. ×proliferum), and the Canada onion (Allium canadense). The name "wild onion" is applied to a number of Allium species, but A. cepa is exclusively known from cultivation. Its ancestral wild original form is not known, although escapes from cultivation have become established in some regions. The onion is most frequently a biennial or a perennial plant, but is usually treated as an annual and harvested in its first growing season. The onion plant has a fan of hollow, bluish-green leaves and its bulb at the base of the plant begins to swell when a certain day-length is reached. The bulbs are composed of shortened, compressed, underground stems surrounded by fleshy modified scale (leaves) that envelop a central bud at the tip of the stem. In the autumn (or in spring, in the case of overwintering onions), the foliage dies down and the outer layers of the bulb become dry and brittle. The crop is harvested and dried and the onions are ready for use or storage. The crop is prone to attack by a number of pests and diseases, particularly the onion fly, the onion eelworm, and various fungi cause rotting. Some varieties of A. cepa, such as shallots and potato onions, produce multiple bulbs. Onions are cultivated and used around the world. As a food item, they are usually served cooked, as a vegetable or part of a prepared savoury dish, but can also be eaten raw or used to make pickles or chutneys. They are pungent when chopped and contain certain chemical substances which irritate the eyes. Jains do not consume onions to prevent injuring small insects and microorganisms, and also to prevent the entire plant getting uprooted and killed.`;

    const pipe = new DescriptionPipe();
    expect(pipe.transform(para)).toContain(
      'The onion (Allium cepa L., from Latin cepa "onion"), also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, scallion, shallot, leek, chive, and Chinese onion.'
    );
  });

  it('shortens long sentences', () => {
    const para = `A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas. The fruit is variable in size, color, and firmness, but is usually elongated and curved, with soft flesh rich in starch covered with a rind, which may be green, yellow, red, purple, or brown when ripe.`;
    const pipe = new DescriptionPipe();
    expect(pipe.transform(para)).toContain(para);
  });
});
