"use strict";

var immutable = require('immutable');
var core = require('../src/core');

test('Set entries', function () {
  var state = immutable.Map();
  var entries = ['Hateful 8', 'Django Unchained'];
  var nextState = core.setEntries(state, entries);
  expect(nextState).toEqual(immutable.Map({
    entries: immutable.List.of('Hateful 8', 'Django Unchained')
  }));
});
