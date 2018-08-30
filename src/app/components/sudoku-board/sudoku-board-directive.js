export function SudokuBoardDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/sudoku-board/sudoku-board.html',
        scope: {
            board: '='
        },
        controller: SudokuBoardController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class SudokuBoardController {
    constructor($log) {
        'ngInject';
        this.log = $log;
    }

    increaseValue(column) {
        if (column.value === 9) {
            column.value = 0;
        } else {
            column.value++;
        }
    }

}