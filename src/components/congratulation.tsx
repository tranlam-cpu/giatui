import '../../public/styles/congratulation.css'
import Confettiful from '../../public/js/congratulation.js'
import '../../public/js/congratulation.js'
import { useEffect } from 'react';



const Congratulation= ()=>{
    useEffect(() => {
        const confettiful = new Confettiful(document.querySelector('.js-container'));
      }, []);

        return (
            <div className="js-container container">
                
            </div>
        );
}

export default Congratulation