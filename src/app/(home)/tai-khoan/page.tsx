
import Head from '../../../components/LayoutMain'
import Orders from '../../../components/Orders'
import Login from '../../../components/Login'
import '../../index.scss'
import '../home.css'
import './home.css'
import { auth } from '../../../../auth'
import  Me  from '../../../components/Me'



export default async function Home() {


	const isAuth=await auth()

	if(isAuth && isAuth.user.role=="USER"){
		return(
			<div className="master-container bg-body-tertiary">
				<Head>
					<Me></Me>
		      	</Head>
	      	</div>
		)
	}else{
		return(
			<div className="master-container bg-body-tertiary">
				<Head>
					<Login></Login>
	
				  </Head>
			  </div>
		)
	}
	
}


