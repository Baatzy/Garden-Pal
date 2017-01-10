/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('posts').del()
  .then(() => {
    return knex('posts').insert([{
      id: 1,
      content: 'The heady, hollied rush toward Christmas is over. One by one you took down the ornaments, and packed them away. Why is it so much more fun to put them on the tree than to take them off? The tree is in the compost bin, the leaves of the poinsettia fall like a gentle rain upon the dining room table; sans buche noel, sans pie, sans tablecloth,which was sent cranberry-stained to the laundry. You hate to do it, but that Euphorbia pulcherrima is going in the bin right next to the tree. The cheery blink of the alternating lights is a memory tucked back in a dusty box in the basement. The living room is restored to its former—why not admit it?—dull and shabby existence. You pluck dried needles out of your carpets and gaze out your windows at the gray expanse of your frozen yard; sighing, and tossing the dog-eared seed catalogues onto the coffee table. It’s a month and a half before the NW Flower and Garden Show. Is there any point in getting up in the morning?'
    }, {
      id: 2,
      content: 'Yesterday, as I chopped, dropped, and tried to cram just a few more blueberry bushes into my garden, it was obvious. The apple blossoms, the eager tips of asparagus, and the carpet of germinating calendula made it undeniable. Spring is here.'
    }, {
      id: 3,
      content: 'The awesome, dangerous transition from seed to seedling is called germination. When a seed absorbs moisture at an appropriate temperature, a whole series of enzymatic changes convert stored starch and protein into usable energy for the seed. It’s metabolism quickens and the seed swells, putting down the first teeny roots, and eventually unfurling it’s cotyledon (seed leaves).'
    }, {
      id: 4,
      content: 'There have always been parts of my garden that have flourished. My first year I did great with peas and swiss chard. By year three I was doing pretty good with cucumbers. I think it was the 5th year that I finally felt confident about broccoli. Then at year 8 cabbage maggots ate the roots right off two beds of broccoli. What are you gonna do? But year by year, it has gotten easier. Things have clicked – not always in the garden, but in me, and how I relate to what that space does for me, and for my family.'
    },]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));"
    );
  });
};
