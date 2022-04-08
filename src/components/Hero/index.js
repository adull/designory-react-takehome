import Button from 'components/Button'

import * as heroStyle from 'styles/components/Hero.module.scss'

export default function Hero(props) {
  const data = props.data
  // console.log(data)
  return (
    <div className={ heroStyle.hero }>
      <div className={ heroStyle.heroContent }>
        <div className={ heroStyle.greeting }>{data.greeting}</div>
        <h1 className={ heroStyle.message }>{data.message}</h1>
        <Button data={data.button} />
      </div>
    </div>
  )
}