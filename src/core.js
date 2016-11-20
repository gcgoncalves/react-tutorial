"use strict";

var immutable = require('immutable');

function setEntries(state, entries) {
  return state.set('entries', immutable.List(entries));
}

function next(state) {
  var entries = state.get('entries')
                     .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: immutable.Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    function(tally) { return tally + 1; }
  );
}

function getWinners(vote) {
  if (!vote) {
    return [];
  }

  var pair = vote.get('pair');
  pair = _slicedToArray(pair, 2);
  var a = pair[0];
  var b = pair[1];

  var aVotes = vote.getIn(['tally', a], 0);
  var bVotes = vote.getIn(['tally', b], 0);

  if (aVotes > bVotes) { 
    return [a];
  } else if  (aVotes < bVotes) { 
    return [b];
  } else {
    return [a, b];
  }
}

module.exports = {
  setEntries: setEntries,
  next: next,
  vote: vote
};


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
