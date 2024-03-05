
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav';
import Footer from './Footer'
import NavbarCustom from './NavbarCustom'
import { auth, signOut } from '../../auth';
// import $ from 'jquery';





const Head=async({
	children
}: {
  children: React.ReactNode
})=>{


	// const [activeScroll, setActiveScroll] = useState(0);


  

  

  // useEffect(() => {
  //  window.onscroll = ()=> {
   
  //  		setActiveScroll(window.pageYOffset)
   	
  //  };
  // }, []);
 
  const isauth=await auth();

 	
 

  
	// const [user,setUser]=useState()
	
	//  useEffect(() => {
 //    (async () => {
 //      const us = await auth();
 //      setUser(us);
 //    })();
 //  }, []);

	return(
	<>
		<header className={`head sticky px-xl-6 px-5 mx-auto}`}>		
			<NavbarCustom
				isauth={isauth}
				isLogout={isauth && isauth.user.banned}
			>
			</NavbarCustom>

		</header>

		<main className="text-break px-xl-6 px-5 mx-auto">
			{children}
		</main>

		<Footer></Footer>
		
	</>
	)
}



export default Head