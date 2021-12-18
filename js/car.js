class Car {
  constructor(length, color, startPos, orientation) {
    this.length = length;
    this.color = color;
    this.startPos = startPos;
    if(orientation === "right") {
      this.endPos = [startPos[0], startPos[1] - (length - 1)];
    } else {
      this.endPos = [startPos[0] - (length - 1), startPos[1]];
    }
    this.orientation = orientation;
    this.segments = [startPos];
    this.setUpBody();
  }


  directionTranslate(dir) {
    let code;
    if (dir) {
      code = dir;
    } else {
      code = this.orientation;
    }
    let pos;
    switch (code) {
      case "down":
        pos = [1, 0];
        break;
      case "right":
        pos = [0, 1];
        break;
      case "up":
        pos = [-1, 0];
        break;
      case "left":
        pos = [0, -1];
    }
    return pos;
  }

  setUpBody() {
    let oppositeOrientation = [this.directionTranslate()[0] * -1, this.directionTranslate()[1] * -1];
    for (let i = 0; i < this.length - 1 ; i++) {
      let bodyPart = [this.segments[i][0] + oppositeOrientation[0], this.segments[i][1] + oppositeOrientation[1]];
      this.segments.push(bodyPart);
    }
  }

  move(direction) {
    let dir = this.directionTranslate(direction);
    let oldHead, newHead;
 
    if (direction === this.orientation) {
      oldHead = this.segments[0];
      newHead = [oldHead[0] + dir[0], oldHead[1] + dir[1]];
      if (this.color !== "red" && (newHead[0] > 5 || newHead[1] > 5)) {
        // alert("out of bounds!");
        return;
      }
      if (!$('li').eq(newHead[0] * 6 + newHead[1]).hasClass("car")) {
        this.segments.unshift(newHead);
        this.segments.pop();
        window.moveCount += 1;
        this.startPos = this.segments[0];
        this.endPos = this.segments[this.length-1];
      }

    } else if (dir[0] === this.directionTranslate()[0] * -1 && dir[1] === this.directionTranslate()[1] * -1) {
      oldHead = this.segments[this.length - 1];
      newHead = [oldHead[0] + dir[0], oldHead[1] + dir[1]];
      if (newHead[0] < 0 || newHead[1] < 0 ) {
        // alert("out of bounds!");
        return;
      }
      if (!$('li').eq(newHead[0] * 6 + newHead[1]).hasClass("car")) {
        this.segments.push(newHead);
        //let $square = $(`li`).eq(newHead[0] * this.grid.length + newHead[1]);
        this.segments.shift();
        window.moveCount += 1;
        this.startPos = this.segments[0];
        this.endPos = this.segments[this.length-1];
      }

    }

  }

  onEdge() {
    if (this.directionTranslate()[0] === 1) {
      return (this.segments[0][0] === 5 || this.segments[this.length - 1][0] === 0 );
    } else if (this.directionTranslate()[1] === 1) {
      return (this.segments[0][1] === 5 || this.segments[this.length - 1][1] === 0 );
    }
  }

}

export default Car;
