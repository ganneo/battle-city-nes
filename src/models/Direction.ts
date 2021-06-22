enum Direction {
  NONE,
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export const getDirectionFromKey: (key: string) => Direction = (key) => {
  if (key === "w") {
    return Direction.UP;
  } else if (key === "a") {
    return Direction.LEFT;
  } else if (key === "s") {
    return Direction.DOWN;
  } else if (key === "d") {
    return Direction.RIGHT;
  } else {
    return Direction.NONE;
  }
};

export default Direction;
