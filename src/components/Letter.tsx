import LetterProps from "@/types/props/Letter"
import { Hanken_Grotesk } from "next/font/google";

const hk600 = Hanken_Grotesk({ subsets: ['latin'], weight: '600' })

export default function Letter(props: LetterProps) {
  return (
    <button className={`status-${props.letter.status} letter-btns ${hk600.className}`}
      onClick={() => props.onGuess(props.letter)}>
      { props.letter.letter }
    </button>
  )
}
