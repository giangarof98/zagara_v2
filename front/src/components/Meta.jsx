import { Helmet } from "react-helmet-async"

export default function Meta({title, description, keywords}) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to Zagara',
    description: 'We do sell the best articles',
    keywords: 'ecommerce, online, shop, best articles'
}
