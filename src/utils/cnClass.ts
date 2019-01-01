import { withNaming } from "@bem-react/classname";
type ArgsType = boolean | string | undefined

export const cnClass = withNaming({
    e: '__',
    m: '_'
})

export const combineClassName = (...classNames: ArgsType[]) =>
  classNames.filter(Boolean)  
 .join(' ')