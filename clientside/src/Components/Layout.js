import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Helmet from 'react-helmet'
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children, title, description}) => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8"/>
        <meta name="author" content="AMAECHI HENRY CHIBUZOR"/>
        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Satisfy&display=swap" rel="stylesheet"/>
        <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{minHeight: "80vh", paddingTop: "80px"}}>
        {children}
      </main>
      <Footer/>
    </div>
    

  )
}

export default Layout