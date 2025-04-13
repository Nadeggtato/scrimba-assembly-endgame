import Alphabet from "../Alphabet";

export default interface LetterProps {
  letter: Alphabet,
  onGuess: (Alphabet) => void
}
