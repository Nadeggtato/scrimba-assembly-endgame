import { Hanken_Grotesk } from "next/font/google";
import { languages } from "@/data/languages";
import Language from "./Language";
import Answer from "./Answer";
import { useEffect, useState } from "react";
import Alphabet from "@/types/Alphabet";
import { LetterStatus } from "@/data/constants";
import Letter from "./Letter";
import { words } from "@/data/words";

const hk500 = Hanken_Grotesk({ subsets: ['latin'], weight: '500' })

export default function Main() {
  const [alphabet, setAlphabet] = useState<Array<Alphabet>>(() => initializeLetters())
  const [word, setWord] = useState<string>('')

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

    return words[index]
  }

  return (
    <main className={hk500.className}>
      <div className="top-container">
        <p className="title">Assembly: Endgame</p>
        <p className="instructions">
          Guess the word in under 8 attempts to keep the programming world safe from Assembly!
        </p>

        <div className="languages-container">
          { languages.map((lang) => <Language language={lang}/>) }
        </div>
        { word }

        <div className="answers-container">
          { Array.apply(null, Array(word.length)).map(() => <Answer/> )}
        </div>
      </div>

      <div className="letters-container">
          { alphabet.map((letter) => <Letter letter={letter}/>) }
        </div>
    </main>
  )
}
