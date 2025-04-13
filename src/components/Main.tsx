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
import type LanguageType from "@/types/Language";

const hk500 = Hanken_Grotesk({ subsets: ['latin'], weight: '500' })

export default function Main() {
  const [alphabet, setAlphabet] = useState<Array<Alphabet>>(() => initializeLetters())
  const [word, setWord] = useState<Array<AnswerType>>([])
  const [languageScores, setLanguageScores] = useState<Array<LanguageType>>(languages)
  const [hitCount, setHitCount] = useState<number>(0)

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

  function isAnswerCorrect(letter: Alphabet) {
    const exists = word.some(char => char.letter === letter.letter)

    setAlphabet((prevAlphabet) => {
      const alphabetCopy = [...prevAlphabet]
      const alphabetIndex = alphabetCopy.findIndex((alphabet) => alphabet.letter === letter.letter)

      if (alphabetIndex !== -1) {
        alphabetCopy[alphabetIndex] = {
          ...alphabetCopy[alphabetIndex],
          status: exists ? 'correct' : 'wrong'
        }
      }

      return alphabetCopy
    })

    return exists
  }

  function updateAnswer(letter: Alphabet) {
    setWord((prevWord) => {
      const answer = prevWord.map((answer) => {
        if (answer.isGuessed) {
          return {...answer}
        }

        return {
          ...answer,
          isGuessed: answer.letter === letter.letter
        }
      })

      return answer
    })
  }

  function updateLanguage() {
    const languagesCopy = [...languageScores]
    const index = languagesCopy.findIndex((lang) => lang.isActive === true)

    if (index !== -1) {
      languagesCopy[index] = { ...languagesCopy[index], isActive: false }
    }

    setLanguageScores(languagesCopy)
  }

  function guessLetter(letter: Alphabet) {
    if (letter.status !== 'neutral') {
      return
    }

    if (isAnswerCorrect(letter)) {
      updateAnswer(letter)

      return
    }

    updateLanguage()
  }

  return (
    <main className={hk500.className}>
      <div className="top-container">
        <p className="title">Assembly: Endgame</p>
        <p className="instructions">
          Guess the word in under 8 attempts to keep the programming world safe from Assembly!
        </p>

        <div className="languages-container">
          { languageScores.map((lang) => <Language key={lang.name} language={lang}/>) }
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
