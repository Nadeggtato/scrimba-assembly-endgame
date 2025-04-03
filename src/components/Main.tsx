import { Hanken_Grotesk } from "next/font/google";
import { languages } from "@/data/languages";
import Language from "./Language";
import Answer from "./Answer";
import { useEffect, useState } from "react";
import Alphabet from "@/types/Alphabet";
import { LetterStatus } from "@/data/constants";
import Letter from "./Letter";

const hk500 = Hanken_Grotesk({ subsets: ['latin'], weight: '500' })

export default function Main() {
  const [alphabet, setAlphabet] = useState<Array<Alphabet>>([])

  useEffect(() => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const lettersArray: Array<Alphabet> = []

    letters.forEach((letter) => {
      lettersArray.push({ letter: letter, status: LetterStatus.NEUTRAL })
    })

    setAlphabet(lettersArray)
  }, [])

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

        <div className="answers-container">
          <Answer/>
          <Answer/>
          <Answer/>
          <Answer/>
          <Answer/>
        </div>
      </div>

      <div className="letters-container">
          { alphabet.map((letter) => <Letter letter={letter}/>) }
        </div>
    </main>
  )
}
