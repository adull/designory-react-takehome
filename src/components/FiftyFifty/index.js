import BlockRender from 'components/BlockRender'

import useWindowSize from 'hooks/useWindowSize'

import * as globalStyle from 'styles/global/Global.module.scss'
import * as imageStyle from 'styles/components/Image.module.scss'
import * as fiftyFiftyStyle from 'styles/components/FiftyFifty.module.scss'

export default function FiftyFifty(props) {

  const desktopClass = props.data.desktopDirection === `column` ? globalStyle.desktopColumn : globalStyle.desktopRow
  const mobileClass = props.data.mobileDirection === `column` ? globalStyle.mobileColumn : globalStyle.mobileRow
  const [width] = useWindowSize()

  return (
    <div className={`${globalStyle.container} ${globalStyle.flexWrap} ${desktopClass} ${mobileClass} ${fiftyFiftyStyle.fiftyFifty}`}>
      {props.data.blocks.map((block, index) => {
        const blockOrder = width > 768 ? block.desktopPos : block.mobilePos

        switch(block.type) {
          case `image`:
            return (<div className={`${imageStyle.imageWrapper} ${fiftyFiftyStyle.block}`} style={{ order: blockOrder }}>
                      <div className={imageStyle.image} style={{ backgroundColor: block.color }} key={ index } />
                    </div>);
          case `html`: 
            return (<div className={fiftyFiftyStyle.block} dangerouslySetInnerHTML={{__html: block.content}} style={{order: blockOrder }} key={ index }/>);
          case `component`: 
            return (<div className={fiftyFiftyStyle.block} style={{order: blockOrder, display: `flex`, alignItems: block.alignSelf, flex: `1 1`, marginBottom: 23}} key={ index }><BlockRender block={block} /></div> );
          default:
            return <></>
        }
      })}
    </div>
  )
}