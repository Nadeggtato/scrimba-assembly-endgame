import { Hanken_Grotesk } from "next/font/google";
import { languages } from "@/data/languages";
import Language from "./Language";
import Answer from "./Answer";
import { useEffect, useMemo, useState } from "react";
import Alphabet from "@/types/Alphabet";
import { Statuses } from "@/data/constants";
import Letter from "./Letter";
import { words } from "@/data/words";
import type AnswerType from "@/types/Answer";
import type LanguageType from "@/types/Language";
import Message from "./Message";

const hk500 = Hanken_Grotesk({ subsets: ['latin'], weight: '500' })

export default function Main() {
  const [alphabet, setAlphabet] = useState<Array<Alphabet>>(() => initializeLetters())
  const [word, setWord] = useState<Array<AnswerType>>([])
  const [languageScores, setLanguageScores] = useState<Array<LanguageType>>(languages)
  const [messageType, setMessageType] = useState<string>(Statuses.NEUTRAL)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [wrongCount, setWrongCount] = useState<number>(0)

  useEffect(() => {
    setWord(initializeWord())
  }, [])

  const hasWon = useMemo(() => {
    if (correctCount === 0 || correctCount < word.length) {
      return false
    }

    setMessageType(Statuses.SUCCESS)

    return true
  }, [correctCount])

  const hasLost = useMemo(() => {
    // Minus 2 since assembly shouldn't be considered
    if (wrongCount < languageScores.length - 1) {
      return false
    }

    setMessageType(Statuses.FAIL)
    const updatedAnswer = word.map((letter) => {
      if (letter.isGuessed) {
        return letter
      }

      return { ...letter, isVisible: true }
    })

    setWord(updatedAnswer)

    return true
  }, [wrongCount])

  const isGameOver = useMemo(() => {
    return hasWon || hasLost
  }, [hasWon, hasLost])

  function initializeLetters() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const lettersArray: Array<Alphabet> = []

    letters.forEach((letter) => {
      lettersArray.push({ letter: letter, status: Statuses.NEUTRAL })
    })

    return lettersArray
  }

  function initializeWord() {
    const index = Math.floor(Math.random() * (words.length - 1)) + 1
    const wordArray = words[index].split('').map((letter) => {
      return { letter: letter, isVisible: false, isGuessed: false }
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
          status: exists ? Statuses.CORRECT : Statuses.INCORRECT
        }
      }

      return alphabetCopy
    })

    return exists
  }

  function updateAnswer(letter: Alphabet) {
    let correctLetters = 0

    const answer = word.map((answer) => {
      if (answer.isGuessed) {
        return {...answer}
      }

      const isCorrect = answer.letter === letter.letter
      correctLetters = correctLetters + (isCorrect ? 1 : 0)

      return { ...answer, isGuessed: isCorrect, isVisible: isCorrect }
    })

    setWord(answer)
    setCorrectCount(prevCount => prevCount + correctLetters)
  }

  function updateLanguage() {
    const languagesCopy = [...languageScores]
    const index = languagesCopy.findIndex((lang) => lang.isActive === true)

    if (index !== -1) {
      languagesCopy[index] = { ...languagesCopy[index], isActive: false }
    }

    setLanguageScores(languagesCopy)
    setWrongCount((prevCount) => prevCount + 1)
  }

  function updateMessage(type: string) {
    setMessageType(type)
  }

  function guessLetter(letter: Alphabet) {
    if (isGameOver || letter.status !== Statuses.NEUTRAL) {
      return
    }

    if (isAnswerCorrect(letter)) {
      updateAnswer(letter)
      updateMessage(Statuses.NEUTRAL)

      return
    }

    updateLanguage()
    updateMessage(Statuses.INCORRECT)
  }

  return (
    <main className={hk500.className}>
      <div className="top-container">
        <p className="title">Assembly: Endgame</p>
        <p className="instructions">
          Guess the word in under 8 attempts to keep the programming world safe from Assembly!
        </p>
        <Message type={messageType} language={languageScores[wrongCount - 1]?.name}/>
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
