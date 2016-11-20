"use strict";

var immutable = require('immutable');
var matchers = require('jasmine-immutable-matchers');

var core = require('../src/core');

describe('application logic', function() {
  beforeEach(function () {
    jest.addMatchers(matchers);
  });

  describe('setEntries', function() {
    it('adds the entries to the state', function () {
      var state = immutable.Map();
      var entries = ['Hateful 8', 'Django Unchained'];
      var nextState = core.setEntries(state, entries);
      expect(nextState).toEqualImmutable(immutable.Map({
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
      expect(nextState).toEqualImmutable(
      immutable.Map({
        entries: immutable.List.of('Pulp Fiction'),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained')
        }),
      }));
    });

    it('puts winner of current vote back to entries', function() {
      var state = immutable.Map({
        entries: immutable.List.of('Pulp Fiction', 'Reservoir Dogs', 'Jackie Brown'),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained'),
          tally: immutable.Map({
            'Hateful 8': 4,
            'Django Unchained': 2
          })
        })
      });
      var nextState = core.next(state);
      expect(nextState).toEqualImmutable(
        immutable.Map({
          entries: immutable.List.of('Jackie Brown', 'Hateful 8'),
          vote: immutable.Map({
            pair: immutable.List.of('Pulp Fiction', 'Reservoir Dogs'),
          })
        })
      );
    });

    it('puts both from tied vote back to entries', function() {
      var state = immutable.Map({
        entries: immutable.List.of('Pulp Fiction', 'Reservoir Dogs', 'Jackie Brown'),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained'),
          tally: immutable.Map({
            'Hateful 8': 3,
            'Django Unchained': 3
          })
        })
      });
      var nextState = core.next(state);
      expect(nextState).toEqualImmutable(
        immutable.Map({
          entries: immutable.List.of('Jackie Brown', 'Hateful 8', 'Django Unchained'),
          vote: immutable.Map({
            pair: immutable.List.of('Pulp Fiction', 'Reservoir Dogs'),
          })
        })
      );
    });

    it('marks winner when just one entry left', function () {
      var state = immutable.Map({
        entries: immutable.List.of(),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained'),
          tally: immutable.Map({
            'Hateful 8': 4,
            'Django Unchained': 2
          })
        })
      });
      var nextState = core.next(state);
      expect(nextState).toEqualImmutable(immutable.Map({
        winner: 'Hateful 8'
      }));
    });
  });

  describe('vote', function() {
    it('creates a tally for the voted entry', function() {
      var state = immutable.Map({
        entries: immutable.List(),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained')
        }),
      });
      var nextState = core.vote(state, 'Hateful 8');
      expect(nextState).toEqualImmutable(immutable.Map({
        entries: immutable.List(),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained'),
          tally: immutable.Map({
            'Hateful 8': 1
          })
        }),
      }));
    });

    it('adds to existing tally for the voted entry', function() {
      var state = immutable.Map({
        entries: immutable.List(),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained'),
          tally: immutable.Map({
            'Hateful 8': 3,
            'Django Unchained': 2
          })
        }),
      });
      var nextState = core.vote(state, 'Hateful 8');
      expect(nextState).toEqualImmutable(immutable.Map({
        entries: immutable.List(),
        vote: immutable.Map({
          pair: immutable.List.of('Hateful 8', 'Django Unchained'),
          tally: immutable.Map({
            'Hateful 8': 4,
            'Django Unchained': 2
          })
        }),
      }));
    });
  });
});
