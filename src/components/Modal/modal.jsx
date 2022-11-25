
import classNames from "classnames/bind"
import styles from "./modal.module.scss"


const cx = classNames.bind(styles)

function Modal({open,onClose,children,mess}) {
   if(!open) return null
   
    return ( 
        <div className={cx('overlay')} onClick={onClose}>
           <div className={cx('modal-contaier')} onClick={e => e.stopPropagation()}>
               <p>{mess}</p>
               {children }
           </div>
        </div>
     );
}

export default Modal;