import { config } from './index.config';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { NavbarDirective } from './components/navbar/navbar.directive';
import { SudokuBoardDirective } from './components/sudoku-board/sudoku-board-directive';
import { SudokuPuzzles } from './components/sudoku-puzzles/sudoku-puzzles';
import { SudokuSolverService } from './components/sudoku-solver/sudoku-solver-service'
angular.module('sudoku', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.bootstrap', 'toastr'])
    .config(config)
    .run(runBlock)
    .controller('MainController', MainController)
    .directive('navbar', NavbarDirective)
    .directive('sudokuBoard', SudokuBoardDirective)
    .service('sudokuPuzzles', SudokuPuzzles)
    .service('SudokuSolver', SudokuSolverService);