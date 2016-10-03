"use strict";

var immutable = require('immutable');

function setEntries(state, entries) {
  return state.set('entries', immutable.List(entries));
}

module.exports = {
  setEntries: setEntries
};
