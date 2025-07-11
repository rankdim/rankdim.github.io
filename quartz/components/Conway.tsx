import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/conway.inline"


const Conway: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div>
    <canvas class={classNames(displayClass)} id="conway"></canvas>
         <div style="opacity:0.3; font-size: 12px">Generation <span id="generationCnt"></span></div>
         <div style="opacity:0.3; font-size: 12px">Population <span id="populationCnt"></span></div>
    </div>
  )
}

Conway.afterDOMLoaded = script

Conway.css = `
#conway {
  border: none black solid;
}
`

export default (() => Conway) satisfies QuartzComponentConstructor
