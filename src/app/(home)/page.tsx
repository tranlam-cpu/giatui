import Image from 'next/image'
import styles from './page.module.css'
import Button from 'react-bootstrap/Button';
import Head from '../../components/LayoutMain'
import IntroPage from '../../components/IntroPage'
import WorkPage from '../../components/WorkPage'
import WhyServicePage from '../../components/WhyServicePage'
import RatePage from '../../components/RatePage'
import Contact from '../../components/Contact'


import '../index.scss'
import './home.css'

export default async function Home() {

  return (
    <div className="master-container bg-body-tertiary">
      <Head>
        <IntroPage></IntroPage>
        <WorkPage></WorkPage>
        <WhyServicePage></WhyServicePage>
        <RatePage></RatePage>
        <Contact></Contact>
      </Head>
    </div>
  )
}
