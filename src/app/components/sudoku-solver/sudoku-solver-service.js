export class SudokuSolverService {

    constructor($log) {
        'ngInject';
        this.log = $log;
    }

    solve(board) {
        let holes = [];
        this.findHoles(board, holes);

        while (holes.length > 0) {
            let prevHoles = holes.length;
            //find possible value for each hole
            holes.forEach(hole => {
                let possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                this.eliminateValues(hole, possibleValues, board);
                if (possibleValues.length === 1) {
                    this.arrayRemove(holes, hole);
                    hole.value = possibleValues[0];
                } else if (possibleValues.length === 0 && hole.value === 0) {
                    throw "Invalid Puzzle";
                }
            });

            //find possible location for each value
            for (let value = 1; value <= 9; value++) {
                for (let unitIndex = 0; unitIndex < 9; unitIndex++) {
                    this.assignLocation(value, this.get3x3IndexesFromValue(unitIndex), board, holes);
                }
            }

            //brute force
            if (prevHoles === holes.length) {
                let BreakException = {};
                let possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                this.eliminateValues(holes[0], possibleValues, board);
                try {
                    possibleValues.forEach(possibleValue => {
                        try {
                            holes[0].value = possibleValue;
                            board = this.solve(angular.copy(board));
                            this.findHoles(board, holes);
                            throw BreakException;
                        } catch (err) {
                            if (err === BreakException) {
                                throw err;
                            }
                        }
                    });
                    throw 'invalid puzzle';
                } catch (err) {
                    if (err !== BreakException) {
                        throw err;
                    } else {
                        break;
                    }
                }

            }
        }
        return board;
    }

    assignLocation(value, indexes, board, holes) {
        let possibleLocations = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let locationIndex = 0;
        let unitContents = [];
        for (let i = indexes.rowIndex; i < indexes.rowIndex + 3; i++) {
            for (let j = indexes.columnIndex; j < indexes.columnIndex + 3; j++) {
                if (board[i][j].value !== 0) {
                    unitContents.push(board[i][j].value);
                }
                let possibleValue = [value];
                this.eliminateValues(board[i][j], possibleValue, board);
                if (possibleValue.length === 0 || board[i][j].value !== 0) {
                    this.arrayRemove(possibleLocations, locationIndex);
                }
                locationIndex++;
            }
        }
        if (possibleLocations.length === 1) {
            let coordinates = this.getLocationFromIndex(indexes, possibleLocations[0]);

            if (board[coordinates.row][coordinates.column].value !== 0) {
                throw "invalid puzzle";
            } else {
                board[coordinates.row][coordinates.column].value = value;
                //  this.log.info(' a before remove: ', holes.length);
                this.arrayRemove(holes, board[coordinates.row][coordinates.column]);
                //   this.log.info('a after remove: ', holes.length);
            }
        }
        if (possibleLocations.length === 0 && !unitContents.includes(value)) {
            throw 'invalid puzzle';
        }
    }

    getLocationFromIndex(indexes, locationIndex) {
        let row = indexes.rowIndex + parseInt(locationIndex / 3);
        let column = indexes.columnIndex + (locationIndex - (parseInt(locationIndex / 3) * 3));
        return {
            row,
            column
        }
    }

    get3x3IndexesFromValue(value) {
        let rowIndex = parseInt(value / 3) * 3;
        let columnIndex = (value - rowIndex) * 3;
        return {
            rowIndex,
            columnIndex
        }

    }

    eliminateValues(hole, possibleValues, board) {
        this.eliminateRowValues(hole, possibleValues, board);
        this.eliminateColumnValues(hole, possibleValues, board);
        this.eliminate3x3Values(hole, possibleValues, board);
    }

    eliminate3x3Values(hole, possibleValues, board) {
        let rowIndex = parseInt(hole.row / 3) * 3;
        let columnIndex = parseInt(hole.column / 3) * 3;

        for (let i = rowIndex; i < rowIndex + 3; i++) {
            for (let j = columnIndex; j < columnIndex + 3; j++) {
                if (possibleValues.includes(board[i][j].value)) {
                    this.arrayRemove(possibleValues, board[i][j].value);
                }
            }
        }

    }

    eliminateColumnValues(hole, possibleValues, board) {
        board.forEach(row => {
            if (possibleValues.includes(row[hole.column].value)) {
                this.arrayRemove(possibleValues, row[hole.column].value);
            }
        });
    }

    eliminateRowValues(hole, possibleValues, board) {
        let row = board[hole.row];
        row.forEach(column => {
            if (possibleValues.includes(column.value)) {
                this.arrayRemove(possibleValues, column.value);
            }
        });
    }

    arrayRemove(array, value) {
        let index = array.findIndex(a => angular.equals(value, a));
        array.splice(index, 1);
    }

    findHoles(board, holes) {
        board.forEach(row => {
            row.forEach(column => {
                if (column.value === 0) {
                    holes.push(column);
                }
            });
        });
    }

}