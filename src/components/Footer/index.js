import * as globalStyle from 'styles/global/Global.module.scss'
import * as footerStyle from 'styles/components/Footer.module.scss'

export default function Footer(props) {
  console.log(props)
  const data = props.data
  return (
    <div className={`${globalStyle.container} ${footerStyle.footer} ${globalStyle.justifySpaceBetweenAlignCenter}`}>
      <div dangerouslySetInnerHTML={{__html: data.phoneNumber}} />
      <div dangerouslySetInnerHTML={{__html: data.copyright}} />
    </div>
  )
}