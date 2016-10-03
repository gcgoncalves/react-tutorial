"use strict";

var immutable = require('immutable');

test('List is immutable', function () {
  function addMovie(currentState, movie) {
    return currentState.push(movie);
  }

  var state = immutable.List.of('Hateful 8', 'Django Unchained');
  var nextState = addMovie(state, 'Death Proof');

  expect(state).toEqual(immutable.List.of(
        'Hateful 8', 
        'Django Unchained'
        ));
  expect(nextState).toEqual(immutable.List.of(
        'Hateful 8', 
        'Django Unchained',
        'Death Proof'
        ));
});

test('Map is immutable', function () {
  function addMovie(currentState, movie) {
    return currentState.update('movies', function(movies) {
      return movies.push(movie);
    });
  }

  var state = immutable.Map({
    movies: immutable.List.of('Hateful 8', 'Django Unchained')
  });
  var nextState = addMovie(state, 'Death Proof');

  expect(state).toEqual(immutable.Map({
    movies: immutable.List.of(
                'Hateful 8', 
                'Django Unchained'
                )
  }));
  expect(nextState).toEqual(immutable.Map({
    movies: immutable.List.of(
                'Hateful 8', 
                'Django Unchained',
                'Death Proof'
                )
  }));
});
