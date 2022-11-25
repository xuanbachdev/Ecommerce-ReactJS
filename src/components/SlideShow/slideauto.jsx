import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './slideauto.module.scss'
import './slide.css'

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${styles.nextPrevButton}`}
      style={{ right:'3%'}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
    className={`${className} ${styles.nextPrevButton}`}
      style={{ left:'1.5%',zIndex:'1' }}
      onClick={onClick}
    />
  );
}

export default class Slide extends Component {
  
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    
    return (
      <div className={styles.container}>
      <div className={styles.slideContainer}>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          <div className={styles.slideImg}>
            <img width='100%' height='300px' src="https://cf.shopee.vn/file/377b0ea3b885d1a0f2883076f4d5ad87" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='300px' src="https://cf.shopee.vn/file/3a2583d2c1230d52e4acd80af1dda759" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='300px' src="https://cf.shopee.vn/file/4facbfd5be1d742b2bb0fcc51de7eade" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='300px' src="https://cf.shopee.vn/file/10ebae2cc8efd8e152b7947682723682" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='300px' src="https://cf.shopee.vn/file/1ea5fb6998b2c4cc65a5e511cc004b4b" alt="" />
          </div>
        </Slider>
        </div>
        <div className={styles.rightSlide}>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          <div className={styles.slideImg}>
            <img width='100%' height='148px' src="https://cdn.sforum.vn/sforum/wp-content/uploads/2017/09/iphonex-pocket-lint_YUUI.jpg" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='148px' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ILB7hnhyTeUu98sSJ5mFU52c_MtbwXBTuXa1yotc0cXDDfKlnpZgqmAHouohFrdKlY4&usqp=CAU" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='148px' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThYq5-llVA_cDGURNC-iiVArqVY_TSfk7kXXlfZCn-WdRYPfqcduYwcDcykVFHAWIR-cQ&usqp=CAU" alt="" />
          </div>
        </Slider>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          <div className={styles.slideImg}>
            <img width='100%' height='148px' src="https://phukienmaytinh.vn/wp-content/uploads/2021/01/4-min-1.jpg" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='148px' src="https://anphat.com.vn/media/product/19477_dsc_0442__copy__wm.jpg" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='148px' src="https://vietgear.vn/wp-content/uploads/2019/09/womier-66-3.jpg" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='148px' src="https://images.mmorpg.com/images/heroes/posts/118658.jpg?cb=4D6FFA8DA30987964127A8674AAB449E" alt="" />
          </div>
          <div className={styles.slideImg}>
            <img width='100%' height='148px' src="https://media.karousell.com/media/photos/products/2021/6/2/womier_k66_1622629814_2eb6d800.jpg" alt="" />
          </div>
        </Slider>
        </div>
      </div>
    );
  }
}