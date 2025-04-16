import { Statuses } from "@/data/constants";
import MessageProps from "@/types/props/Message";
import { useMemo } from "react";

export default function Message(props: MessageProps) {
  const text = useMemo(() => {
    switch(props.type) {
      case Statuses.INCORRECT:
        return getFarewellText()
      case Statuses.FAIL:
        return 'Game over!\nYou lose! Better start learning Assembly 😭'
      case Statuses.SUCCESS:
        return 'You win!\nWell done!🎉'
      default:
        return '\u00A0'
    }
  }, [props.type, props.language])

  function getFarewellText() {
    const options = [
      `Farewell, ${props.language}`,
      `Adios, ${props.language}`,
      `R.I.P., ${props.language}`,
      `We'll miss you, ${props.language}`,
      `Oh no, not ${props.language}!`,
      `${props.language} bites the dust`,
      `Gone but not forgotten, ${props.language}`,
      `The end of ${props.language} as we know it`,
      `Off into the sunset, ${props.language}`,
      `${props.language}, it's been real`,
      `${props.language}, your watch has ended`,
      `${props.language} has left the building`
   ];

    const index = Math.floor(Math.random() * (options.length - 1)) + 1

    return options[index]
  }

  return (
    <div className={ `message type-${props.type}` } style={{ whiteSpace: 'pre-line' }}>
      { text }
    </div>
  )
}
