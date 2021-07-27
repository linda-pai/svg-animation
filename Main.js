import React, { useEffect, useRef, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './main.css';
import { ReactComponent as SVG } from './main6.min.svg'
import { select } from "d3";
import greenLogo from './images1/green-logo.PNG'
import { Helmet, HelmetProvider } from 'react-helmet-async';


function Main(props) {

    //useRef取得props為ref={svgRef}的物件
    const svgRef = useRef();
    //引入d3
    var d3 = require("d3");
    useEffect(() => {
        const svg = select(svgRef.current);
        svg
            .selectAll(".eco").classed("hidden", false)
            //滑鼠事件發生時 改變的CSS
            .on("mouseover", function (d) {
                d3.selectAll('.eco')
                    .classed("hidden", true)
            })
            .on("mouseout", () => {
                d3.selectAll('.eco')
                    .classed("hidden", false)
            })
            .on("click", function () {
                switch (this.id) {
                    case "eco-power":
                        history.push('/about/intro/flipEnergy')
                        break;
                    case "eco-office":
                        history.push('/about/intro/flipOffice')
                        break;
                    case "eco-food":
                        history.push('/about/intro/flipFood')
                        break;
                    case "eco-home":
                        history.push('/about/intro/flipHome')
                        break;
                    case "eco-shopping":
                        history.push('/about/intro/flipShopping')
                        break;
                    case "eco-tour":
                        history.push('/about/intro/flipTour')
                        break;
                    default: 
                        return null
                }
            })
            .transition()

    });


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>全民綠生活資訊平台 - 入口網頁</title>
                    <meta name="description" content="行政院環境保護署-全民綠生活資訊平台首頁，「綠生活」是一種親環境的生活方式，從食、衣、住、行、育、樂、購等生活小細節做起，來愛護我們的家園。" />
                </Helmet>
                <div className="logo">
                    <a href="#"><img src={greenLogo} alt="全民綠生活LOGO" title="全民綠生活LOGO" /></a>
                </div>
                <div className="main-content-wrapper">
                    <div className="App d-flex">
                        <div className="svg-wrapper col-sm-12 col-md-12 col-lg-10">
                            <SVG ref={svgRef} className="ob-svg" />
                        </div>

                        <div className="main-icons-wrapper">

                            <div className="side-menu row">
                                <Link className="col-3" to="/about#intro">
                                    <li className="btn1 button">
                                        <i className="fas fa-book"></i>
                                        <div>
                                            了解綠生活
                                    </div>
                                    </li>
                                </Link>
                                <Link className="col-3" to="/categories">
                                    <li className="btn2 button">
                                        <i className="fas fa-utensils"></i>
                                        <div>
                                            響應綠生活
                                    </div>
                                    </li>
                                </Link>
                                <Link className="col-3" to="/searchEvent">
                                    <li className="btn3 button">
                                        <i className="fas fa-hand-point-right"></i>
                                        <div>
                                            參加綠生活
                                    </div>
                                    </li>
                                </Link>
                                <Link className="col-3" to="/#">
                                    <li className="btn4 button">
                                        <i className="fas fa-home"></i>
                                        <div>
                                            <span id="a">紀錄綠生活</span>
                                            <span id="b">近期開放</span>
                                        </div>
                                    </li>
                                </Link>
                                <Link className="col-3" to="/about">
                                    <li className="btn5 button">
                                        <i className="fas fa-location-arrow"></i>
                                        <div>
                                            進入首頁
                                    </div>
                                    </li>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </HelmetProvider>

        </>
    );
}
export default Main;
