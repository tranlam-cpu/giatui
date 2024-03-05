'use server'
import './home.css'
import '../../../index.scss'
import Banned from '../../../../components/backend/bannedUsers'

const BannedUsers=()=>{

	return(
		<section>
			<Banned></Banned>
		</section>
	)
}

export default BannedUsers