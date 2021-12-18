import Car from "./car.js";

class Board {
  constructor(cars) {
    this.grid = new Array(6).fill(new Array(6));
    this.cars = cars;
    this.selectedCar;
  }


  setUpCars() {
    this.cars.forEach(car => {
      car.segments.forEach(square => {
        // $(`li[data-pos=[${square[0]}, ${square[1]}]`).addClass(car.color);
        let $square = $(`li`).eq(square[0] * this.grid.length + square[1]);
        $square.removeClass("train-start-down");
        $square.removeClass("train-body-down");
        $square.removeClass("train-end-down");
        $square.removeClass("train-start-right");
        $square.removeClass("train-body-right");
        $square.removeClass("train-end-right");
        $square.addClass(car.color);
        $square.addClass("car");
        if(this.arrayEquals(square, car.endPos)) {
          $square.addClass("train-end-" + car.orientation);
        }
        else if(this.arrayEquals(square, car.startPos)) {
          $square.addClass("train-start-" + car.orientation);
        } else {
          $square.addClass("train-body-" + car.orientation);
        }
        $square.click(() => {
          $('.selected').removeClass("selected");
          $(`.${car.color}`).addClass("selected");
          this.selectedCar = car;
        });
      });
    });
  }

  arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }


  isWon() {
    if (this.cars[0].segments[0][1] === 5) {
      //if the red car's head is on the right edge
      return true;
    }
    return false;
  }


}

export default Board;
