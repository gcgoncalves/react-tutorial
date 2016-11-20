"use strict";

var immutable = require('immutable');
var core = require('../src/core');

describe('application logic', function() {
  describe('setEntries', function() {
    it('adds the entries to the state', function () {
      var state = immutable.Map();
      var entries = ['Hateful 8', 'Django Unchained'];
      var nextState = core.setEntries(state, entries);
      expect(nextState).toEqual(immutable.Map({
        entries: immutable.List.of('Hateful 8', 'Django Unchained')
      }));
    });
  });

  describe('next', function() {
    it('takes the next two entries under vote', function() {
      var state = immutable.Map();
      var entries = ['Hateful 8', 'Django Unchained', 'Pulp Fiction'];
      var initialState = core.setEntries(state, entries);
      var nextState = core.next(initialState);
      expect(nextState).toEqual(
      immutable.Map({
        entries: immutable.List.of('Pulp Fiction'),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained')
        }),
      }));
    });
  });
});
