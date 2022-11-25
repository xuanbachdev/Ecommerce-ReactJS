import styles from '~/Layout/DefaultLayout/DefaultLayout.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function BackToTopButton({view}) {
   const scrollTop = () => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
   }
    return ( 
       <>
         {view &&  <div className={cx('up-top')} onClick={scrollTop}>
                     <span>Về đầu trang</span>
                     <FontAwesomeIcon className={cx('icon-up')} icon={faArrowRight}/>
                   </div>}
       </>
     );
}

export default BackToTopButton;