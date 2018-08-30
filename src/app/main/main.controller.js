import { SudokuElement } from '../components/sudoku-board/sudoku-element/sudoku-element';
export class MainController {
    constructor($log, SudokuSolver, sudokuPuzzles, $scope) {
        'ngInject';
        this.log = $log;
        this.sudokuPuzzles = sudokuPuzzles;
        this.initBoard();
        this.solvedBoard = angular.copy(this.board);
        this.solved = false;
        this.failure = false;
        this.scope = $scope;
        this.sudokuSolver = SudokuSolver;
        this.level = 'Custom';
    }

    initBoard() {
        let iMax = 9;
        let jMax = 9;
        this.board = new Array();
        let i, j;
        for (i = 0; i < iMax; i++) {
            this.board[i] = new Array();
            for (j = 0; j < jMax; j++) {
                this.board[i][j] = new SudokuElement(i, j, 0);
            }
        }
    }

    clearWorkspace() {
        this.solved = false;
        this.failure = false;
        this.setPuzzle(this.sudokuPuzzles.getCustom(), this.solvedBoard);
    }


    setPuzzle(puzzle, board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j].value = puzzle[i][j];
            }
        }
    }

    setEasy() {
        this.setPuzzle(this.sudokuPuzzles.getEasy(), this.board);
        this.clearWorkspace();
    }

    setMedium() {
        this.setPuzzle(this.sudokuPuzzles.getMedium(), this.board);
        this.clearWorkspace();
    }

    setHard() {
        this.setPuzzle(this.sudokuPuzzles.getHard(), this.board);
        this.clearWorkspace();
    }

    setCustom() {
        this.setPuzzle(this.sudokuPuzzles.getCustom(), this.board);
        this.clearWorkspace();
    }

    solveSudoku() {
        try {
            let startTime = Date.now();
            this.solvedBoard = angular.copy(this.board);
            this.solvedBoard = this.sudokuSolver.solve(this.solvedBoard);
            let endTime = Date.now();
            this.solved = true;
            this.elapsedTime = (endTime - startTime) / 1000;
        } catch (err) {
            this.failure = true;
        }
    }

}