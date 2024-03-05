'use server'
import './home.css'
import '../../../index.scss'
import AllUser from '../../../../components/backend/users'

const Users=()=>{

	return(
		<section>
			<AllUser></AllUser>
		</section>
	)
}

export default Users