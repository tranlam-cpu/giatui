import Head from '../../../components/LayoutMain'
import Orders from '../../../components/Orders'
import '../../index.scss'
import '../home.css'
import './home.css'


export default async function DonHang() {
	return(
		<div className="master-container bg-body-tertiary">
			<Head>
				<Orders></Orders>
	      	</Head>
      	</div>
	)
}