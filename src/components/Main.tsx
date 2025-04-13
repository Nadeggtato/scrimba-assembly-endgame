import { Hanken_Grotesk } from "next/font/google";
import { languages } from "@/data/languages";
import Language from "./Language";
import Answer from "./Answer";
import { useEffect, useState } from "react";
import Alphabet from "@/types/Alphabet";
import { LetterStatus } from "@/data/constants";
import Letter from "./Letter";
import { words } from "@/data/words";
import type AnswerType from "@/types/Answer";

const hk500 = Hanken_Grotesk({ subsets: ['latin'], weight: '500' })

export default function Main() {
  const [alphabet, setAlphabet] = useState<Array<Alphabet>>(() => initializeLetters())
  const [word, setWord] = useState<Array<AnswerType>>([])

  useEffect(() => {
    setWord(initializeWord())
  }, [])

  function initializeLetters() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const lettersArray: Array<Alphabet> = []

    letters.forEach((letter) => {
      lettersArray.push({ letter: letter, status: LetterStatus.NEUTRAL })
    })

    return lettersArray
  }

  function initializeWord() {
    const index = Math.floor(Math.random() * (words.length - 1)) + 1
    const wordArray = words[index].split('').map((letter) => {
      return { letter: letter, isGuessed: false }
    })

    return wordArray
  }

  function guessLetter(letter: Alphabet) {
    if (letter.status !== 'neutral') {
      return
    }

    setAlphabet((prevAlphabet) => {
      const alphabetCopy = [...prevAlphabet]
      const alphabetIndex = alphabetCopy.findIndex((alphabet) => alphabet.letter === letter.letter)

      if (alphabetIndex !== -1) {
        alphabetCopy[alphabetIndex] = {
          ...alphabetCopy[alphabetIndex],
          status: word.some(char => char.letter === letter.letter) ? 'correct' : 'wrong'
        }
      }

      return alphabetCopy
    })
  }

  return (
    <main className={hk500.className}>
      <div className="top-container">
        <p className="title">Assembly: Endgame</p>
        <p className="instructions">
          Guess the word in under 8 attempts to keep the programming world safe from Assembly!
        </p>

        <div className="languages-container">
          { languages.map((lang) => <Language key={lang.name} language={lang}/>) }
        </div>

        <div className="answers-container">
          { word.map((letter, index) => <Answer key={index} answer={letter}/> )}
        </div>
      </div>

      <div className="letters-container">
          { alphabet.map((letter) => <Letter key={letter.letter} letter={letter} onGuess={guessLetter}/>) }
        </div>
    </main>
  )
}
