import React from 'react';
import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import DoneFrame from './DoneFrame';
import Numbers from './Numbers';
import _ from 'lodash';

var possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) {
        return true;
    }
    if (arr[0] > n) {
        return false;
    }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) {
                combinationSum += arr[j];
            }
        }
        if (n === combinationSum) {
            return true;
        }
    }
    return false;
};

class Game extends React.Component {
    static setInitialState = () => ({
        numberOfStars: 1 + Math.floor(Math.random() * 9),
        selectedNumbers: [],
        answerIsCorrect: null,
        usedNumbers: [],
        redrawCount: 5,
        doneStatus: null,
    });

    state = Game.setInitialState();

    restartGame = () => {
        this.setState(Game.setInitialState());
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random() * 9),
        }), this.updateDoneStatus)
    };

    reDrawGame = () => {
        const pastCount = this.state.numberOfStars;

        this.setState(prevState => ({
            answerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random() * 9),
            redrawCount: (prevState.redrawCount === 0) ? 0 : prevState.redrawCount - 1,
        }), this.updateDoneStatus);

        if (pastCount === this.state.numberOfStars) {
            this.setState(prevState => ({
                numberOfStars: 1 + Math.floor(Math.random() * 9)
            }));
        }

    };

    onNumberSelect = (number) => {
        if (this.state.selectedNumbers.indexOf(number) >= 0) {
            return false;
        }

        if (this.state.usedNumbers.indexOf(number) >= 0) {
            return false;
        }

        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(number)
        }));
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };

    posibbleSolutions = (state) => {
        const possibleNumbers = _.range(1, 10).filter(number => {
            if (state.usedNumbers.indexOf(number) === -1)
                return true
        });

        return possibleCombinationSum(possibleNumbers, state.numberOfStars);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return {doneStatus: 'Done! Nice!'};
            }
            if ((prevState.redrawCount === 0 && !this.posibbleSolutions(prevState))) {
                return {doneStatus: 'Game Over!'};
            }
        });
    };

    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={this.state.numberOfStars}/>
                    <Button reDrawGame={this.reDrawGame} redrawCount={this.state.redrawCount} acceptAnswer={this.acceptAnswer} checkAnswer={this.checkAnswer}
                            selectedNumbers={this.state.selectedNumbers} answerIsCorrect={this.state.answerIsCorrect}/>
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={this.state.selectedNumbers}/>
                </div>
                <hr/>
                <div className="row">
                    {this.state.doneStatus ?
                        <DoneFrame restartGame={this.restartGame} doneStatus={this.state.doneStatus}/> :
                        <Numbers usedNumbers={this.state.usedNumbers} onNumberSelect={this.onNumberSelect}
                                 selectedNumbers={this.state.selectedNumbers}/>}

                </div>
            </div>
        );
    }
};

export default Game;