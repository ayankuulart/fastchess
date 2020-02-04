// Выбрать тип enum в бд
enum GameState {
  PREFER = 0,
  PLAYING = 1,
  COMPLETED = 2
}

type Notation = string[]

interface Game {
  id?: number,
  black: User["id"],
  white: User["id"],
  notation: Notation,
  state: GameState
}