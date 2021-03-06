/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n, startCol = 0) {

  var solution = new Board({ 'n': n });
  solution.togglePiece(0, startCol);

  solution.rows().forEach( (row, i) => {
    row.forEach( (element, j) => {
      if (i !== 0) {
        solution.togglePiece(i, j);
      }
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
      }

    });
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var inner = function(board, row, count) {
    if (count === n) {
      solutionCount += 1;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if ( !board.hasAnyRooksConflicts() ) {
        inner(board, row + 1, count + 1);
      }
      board.togglePiece(row, col);
    }
  };
  var board = new Board({'n': n});
  inner(board, 0, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var findSolution = function(row, n, board) {
    if (row === n) {
      let result = function() {
        return _.map(board.rows(), function(row) {
          return row.slice();
        });
      };
      return result();
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyQueensConflicts()) {
        var result = findSolution(row + 1, n, board);
        if (result) {
          return result; // EJECT
        }
      }
      board.togglePiece(row, i);
    }
  };

  var board = new Board({n: n});
  var solution = findSolution(0, n, board);

  solution = solution || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var inner = function(board, row, count) {
    if (count === n) {
      solutionCount += 1;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if ( !board.hasAnyQueensConflicts() ) {
        inner(board, row + 1, count + 1);
      }
      board.togglePiece(row, col);
    }
  };
  var board = new Board({'n': n});
  inner(board, 0, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
