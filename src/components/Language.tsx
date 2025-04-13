import LanguageProps from "@/types/props/Language";

export default function Language(props: LanguageProps) {
  return (
    <div
      className={`language-div ${props.language.isActive ? '' : 'crossed-out'}`}
      style={{ backgroundColor: props.language.backgroundColor, color: props.language.color, position: 'relative' }}
    >
      {props.language.name}

      { !props.language.isActive && <div className="overlay">💀</div> }
    </div>

  )
}
