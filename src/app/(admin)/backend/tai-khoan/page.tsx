import './home.css'
import '../../../index.scss'
import LoginHome from '../../../../components/backend/login-admin'


export default async function Home() {
	return(
		<section style={{
	      "width": "100%",
	      "height": "100vh"
	    }}>
	      <LoginHome></LoginHome>
	    </section>
	)
}