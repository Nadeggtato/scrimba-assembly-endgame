import AnswerProps from "@/types/props/Answer";
import { Hanken_Grotesk } from "next/font/google";

const hk700 = Hanken_Grotesk({ subsets: ['latin'], weight: '700' })

export default function Answer(props: AnswerProps) {
  return (
    <div className={
      `answer-letter-container
      ${hk700.className}
      ${(props.answer.isVisible && !props.answer.isGuessed) ? 'unguessed-letter' : ''}`}>
      { props.answer.isVisible && props.answer.letter }
    </div>
  )
}
