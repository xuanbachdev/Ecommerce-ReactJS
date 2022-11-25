
import classNames from 'classnames/bind';
import styles from "./input.module.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState,useRef } from 'react';
import Wrapper  from '~/components/Popper/wrapper'; 
import ProductResult from '../../../components/ProductResult/productResult';
import axios from '~/axios';
import useDebounce from "~/customHook/useDebounce"
import { useNavigate } from 'react-router-dom';
 const cx = classNames.bind(styles)
function Input() {
  const [searchValue,setSearchValue] = useState('')
  const [searchResult,setSearchResult] = useState([])
  const [check,setCheck] = useState(true)
  const [load,setLoad] = useState(false)
  const inputRef = useRef()
  const debounce = useDebounce(searchValue,300)
  const searchRef = useRef(null)
  const nav = useNavigate()
  useEffect(() => {
    if(!debounce.trim()) {
      setSearchResult([])
      return
    }
    setLoad(true)
    axios.get(`/product/find-products-by-name?productName=${encodeURIComponent(debounce)}`)
      .then(res =>{
        setSearchResult(res.data.products)
        setLoad(false)
      })
      .catch(erro => console.log(erro))
    
  },[debounce])
  useEffect(()=>{
    searchRef.current.addEventListener('keypress',(e) => {
      if (e.code === "Enter") {
        toSeaech()
        setCheck(false)
      }
    })
  },[searchResult])
  const handleChange =(e) => {
   const searchValue = e.target.value
    if(!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    } 
  }
  const toSeaech = () => {
    if(searchResult.length > 0) {
        nav(`/search?filter=${searchValue}`)
    }else {
      nav('/404')
    }
  }
    return ( 
       <div>
        <Tippy
          offset={[-30,10]}
          interactive
          visible={check && searchResult.length > 0}
          placement='bottom'
          render={(attrs) => (
            <div className={cx('sreach-result')} tabIndex="-1" {...attrs}>
              <Wrapper>
              {searchResult.map(item => {
                  return(
                    <ProductResult key={item._id} data={item} onClick={setCheck}/>
                  )
                })}
              </Wrapper>
            </div>
          )} 
          onClickOutside={() => setCheck(false)} 
       >
        <div className={cx('search')} ref={searchRef}>
          <input 
            ref={inputRef}
            placeholder='Tìm Kiếm' 
            spellCheck={false} 
            value={searchValue}
            onChange={handleChange}
            onFocus = {() => {
              setCheck(true)
              setSearchResult([])
            }}
          />
          {!!searchValue && !load && (
              <button className={cx('clear')} onClick={
                ()=>{
                  setSearchValue('')
                  inputRef.current.focus()
                  setSearchResult([])
                }
              }>
              <FontAwesomeIcon icon={faCircleXmark}/>
            </button>
          )}
         { load &&  <FontAwesomeIcon className={cx("loading")} icon={faSpinner}/>}
          <button className={cx("search-btn")} onMouseDown={(e)=>e.preventDefault()} onClick={toSeaech}>
            <FontAwesomeIcon icon={faSearch}/>
          </button>  
         </div>
       </Tippy>
       </div>
     );
}

export default Input;