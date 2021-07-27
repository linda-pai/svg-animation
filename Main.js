import React, { useEffect, useRef, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from 'react-router-dom';
import './main.css';
import { ReactComponent as SVG } from './main6.min.svg'
import { select } from "d3";
import greenLogo from './images1/green-logo.PNG'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { clickRecord } from './utils/API';
import { useCookies } from "react-cookie";


function Main(props) {

    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'
    let history = useHistory()
    var serialize = require('serialize-javascript');

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";


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
                        clickRecord("C84B2A7C-5173-4EF3-976D-37B4030A22B0", "2", collector);
                        history.push('/about/intro/flipEnergy')
                        break;
                    case "eco-office":
                        clickRecord("AE3AE8FA-767C-4249-B945-84F3C6DA5C53", "2", collector);
                        history.push('/about/intro/flipOffice')
                        break;
                    case "eco-food":
                        clickRecord("6E0488AA-9356-4B7D-94C2-5E2951B75D2B", "2", collector);
                        history.push('/about/intro/flipFood')
                        break;
                    case "eco-home":
                        clickRecord("9E65F7CA-6711-4E47-8325-56E8D9D83C67", "2", collector);
                        history.push('/about/intro/flipHome')
                        break;
                    case "eco-shopping":
                        clickRecord("BC7245A8-F263-458B-A35B-61904B9A0E7A", "2", collector);
                        history.push('/about/intro/flipShopping')
                        break;
                    case "eco-tour":
                        clickRecord("3FE4A538-3D5D-4651-BEA1-8FA35B706010", "2", collector);
                        history.push('/about/intro/flipTour')
                        break;
                    default: 
                        return null
                }
            })
            .transition()

    });

     //紀錄瀏覽人次API
     useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/VisitRecord`, {
            method: 'POST',
            body: serialize({
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                // console.log(res)
            }).then(result => {
                // console.log(result)
            });
    }, [SSL, domain, serialize]);

    //取得瀏覽人次API
    const [visitedCount, setVisitedCount] = useState([]);
    // https://cors-anywhere.herokuapp.com/
    useEffect(() => {
        const uri = `${SSL}//${domain}/api/api/Common/VisitCount`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setVisitedCount(result.resultObject)
            });

    });


    //點閱計數API
    useEffect(() => {
        clickRecord("EF2F13BA-8DE4-4914-A255-A6751BC15DD2", "1", collector)
    }, [collector]);

    //系統資訊API
    const [siteInfo, setSiteInfo] = useState([]);
    const [items, setItems] = useState([]);

    const type = "Index";
    const code = "Footer";


    useEffect(() => {

        const uri = `${SSL}//${domain}/api/api/Common/SystemInfo`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                Type: type,
                Code: code
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setItems(result.resultObject[0].item5.split('<br>'))
                if (result.isSucess) {
                    setSiteInfo(result.resultObject[0]);
                }
            });
    }, []);


    const alertTitleForMain =
        <>
            親愛的綠友您好，為配合中央疫情指揮中心之防疫措施建議，業務運作將優先採居家方式執行，若您對本平台有問題需要諮詢，請您於以下<span style={{ color: "red", display: "inline" }}>客服需求單</span>留言，客服人員將儘速與您聯繫，造成不便敬請見諒。
        </>

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
                    <div className="footer-main">
                        <div className="content row">
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <div className="form-link-main">
                                    <a className="footer-main-link" href="https://docs.google.com/forms/d/e/1FAIpQLSfs0eoJ3-B6klu3KaKP28uSAsfQnCyqAShnyr_3Qd0_CY0Vew/viewform"
                                        target="_blank" rel="noreferrer noopener">我要填寫客服需求單</a>
                                </div>
                                <div className="d-flex">
                                    <a className="footer-main-link" href={String(siteInfo.item7).split(",")[1]}>{String(siteInfo.item7).split(",")[0]}</a>
                                    <a className="footer-main-link" href={String(siteInfo.item10).split(",")[1]}>{String(siteInfo.item10).split(",")[0]}</a>
                                </div>
                            </div>
                            <div className="row footer-text col-sm-12 col-md-12 col-lg-9 justify-content-center">

                                <div className="col-sm-12 col-md-6">
                                    <div className="main-address"><p>地址:{siteInfo.item3}</p></div>
                                    <div className="main-date"><p>更新日期:{siteInfo.item9}</p></div>
                                    <div className="main-visited"><p>瀏覽人次:{visitedCount}</p></div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <div className="main-rights"> <p>{siteInfo.item1}</p></div>
                                    <div className="main-phone"> <p>聯絡電話: {siteInfo.item4}</p></div>
                                    <div className="main-contact"> <div>{items.map((items, index) =>
                                        <p key={index}>{items}</p>
                                    )}</div></div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </HelmetProvider>

        </>
    );
}
export default Main;