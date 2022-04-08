import Article from 'components/Articles/Article'
import * as globalStyle from 'styles/global/Global.module.scss'
import * as articlesStyle from 'styles/components/Articles.module.scss'

export default function Articles(props) {
  return (
    <div className={`${globalStyle.container} ${articlesStyle.articles}`} >
      {props.articles.map((article, index) => {
        return (
          <a href="#" onClick={ (e) => e.preventDefault() } className={`${articlesStyle.articleAnchor}`}>
            <Article article={article} key={ index }/>
          </a>
        )
      })}
    </div>
  )
}