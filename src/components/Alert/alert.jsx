import React from 'react'
import classNames from "classnames/bind";
import styles from './alert.module.scss'
import { Alert,AlertTitle} from '@mui/material';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

const AlertModal=({url,title,title2,isOpen,hide})=> {
 return(
    isOpen ?
      <div className={cx('alert-container')}>
          <Alert
              className={cx('alert')}
              severity="success"
              onClose={hide}
          >
              <AlertTitle className={cx('alert-title')} >Success</AlertTitle>
              <div>{title}<Link to={url}><strong>{title2}</strong></Link></div>
          </Alert>
      </div>
     :null )
}
export default AlertModal