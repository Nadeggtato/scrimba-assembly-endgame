import LanguageProps from "@/types/props/Language";

export default function Language(props: LanguageProps) {
  return (
    <div className="language-div"
      style={{ backgroundColor: props.language.backgroundColor, color: props.language.color }}>
      { props.language.name }
    </div>
  )
}
