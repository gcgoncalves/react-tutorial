"use strict";

var immutable = require('immutable');

function setEntries(state, entries) {
  return state.set('entries', immutable.List(entries));
}

function next(state) {
  var entries = state.get('entries');
  console.log(entries.count());
  if (entries.count() > 1) {
    return state.merge({
      vote: immutable.Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
  return state;
}

module.exports = {
  setEntries: setEntries,
  next: next
};
