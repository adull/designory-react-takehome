import * as articlesStyle from 'styles/components/Articles.module.scss'

export default function Article(props) {
  // console.log(props)
  const article = props.article
  return (
    <div className={ articlesStyle.article }>
      <div className={ articlesStyle.image } style={{ backgroundColor: article.color }} />
      <div className={ articlesStyle.title }>{ article.title }</div>
      <div className={ articlesStyle.date }>{ article.date }</div>
      <div className={ articlesStyle.summary }>{ article.summary }</div>
    </div>
  )
}