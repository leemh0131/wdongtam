const localApiUrl = "http://localhost:8080";
const devApiUrl = "http://117.52.92.85:8011";
const prodApiUrl = "http://117.52.92.85:8011";

/**
 * 이미지 업로드 테스트는 개발서버 및 운영서버에서만 가능합니다.
 * 개발서버
 * mklink /d "C:\qrayTomcat\apache-tomcat-9.0.62-8011-partner\webapps\ROOT\PARTNER_TEMP" "C:\PARTNER_TEMP"
 */

/** 메인페이지 광고 그리기
 *
 *
 */
function getPartnerMainList(api){

    let url;

    if(api == 'local'){
     url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    let parameter = {
        company : {COMPANY_CD : '1000'},
        IMG_URL : url + '/PARTNER_TEMP/',
        blurbParam : {
            vvvipMainYouTube : 'ADV2023073000020',
            vvvipMain : 'ADV2023073000023',
            vvipBox : 'ADV2023073000024',
            vipBox : 'ADV2023073000027'
        }
    }



    //화면 초기화
    $("main.pc section.section_01 div.col-3").remove();
    $("main.pc section.section_03 div.col-4").remove();
    $("main.pc section.section_04 div.col-3").remove();

    let res = {};
    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/partnerBlurbList"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(parameter),
        success: function (res) {

            if(nvl(res.map) != ''){
                res = res.map;
            } else if(nvl(res.error) != ''){
                console.log("getPartnerDetail error", res.error);
            } else {
                console.log("getPartnerDetail error");
            }
            console.log(res);

            //유튜브 메인 광고 그리기
            if(nvl(res.vvvipMainYouTube[0]) != ''){
                let mainPcHtml =
                    `<div class="col-6">
                        <div class="box">
                            <div class="img video">
                                <iframe class="youtube" width="328" height="182" src="` + res.vvvipMainYouTube[0].youtube_link + `"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen></iframe>
                                <img src="` + res.vvvipMainYouTube[0].img_url + `" onError="this.src='img/sample/sample_01.png'" alt="">
                            </div>
                            <div class="box_info">
                                <h6>` + res.vvvipMainYouTube[0].partner_nm + `</h6>
                                <p>` + res.vvvipMainYouTube[0].company_intro + `</p>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src="img/icon/i_call.png" alt="">
                                            ` + res.vvvipMainYouTube[0].tel_no + `
                                        </a>
                                    </li>
                                    <li>
                                        <button onclick="blurbDetailPage(this)" id="` + res.vvvipMainYouTube[0].partner_cd + `" type="button">상세보기</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>`;

                let mainMoHtml =
                    `<div class="swiper-slide">
                        <div class="box">
                            <div class="img video">
                                <iframe
                                    width="100%" height="174" src="` + res.vvvipMainYouTube[0].youtube_link + `" class="youtube"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen></iframe>
                            </div>
                            <div class="box_info">
                                <h6>` + res.vvvipMainYouTube[0].partner_nm + `</h6>
                                <p>` + res.vvvipMainYouTube[0].company_intro + `</p>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src="img/icon/i_call.png" alt="">
                                                ` + res.vvvipMainYouTube[0].tel_no + `
                                        </a>
                                    </li>
                                    <li>
                                        <button onclick="blurbDetailPage(this)" id="` + res.vvvipMainYouTube[0].partner_cd + `" type="button">상세보기</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>`;

                $("main.pc section.section_01 div.row").append(mainPcHtml);

                $("main.mo section.section_01 div.swiper-wrapper").append(mainMoHtml);

            }

            //메인 광고 그리기
            if(nvl(res.vvvipMain) != ''){
                let vvvipMain = res.vvvipMain;

                //PC
                let col3Content = `
                <div class="col-3">
                    <div class="box">
                        <div class="img">
                            <img src="img_url" onerror="this.src='img/sample/sample_01.png'" alt="">
                        </div>
                        <div class="box_info">
                            <h6>partner_nm</h6>
                            <p>company_intro</p>
                            <ul>
                                <li>
                                    <a href="#">
                                    <img src="img/icon/i_call.png" alt="">
                                    tel_no
                                    </a>
                                </li>
                                <li>
                                    <button onclick="blurbDetailPage(this)" id="partner_cd" type="button">상세보기</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

                //모바일
                let moContent = `
                <div class="swiper-slide">
                    <div class="box">
                        <div class="img">
                            <img onerror="this.src='img/sample/sample_01.png'" src="img_url" alt="">
                        </div>

                        <div class="box_info">
                            <h6>partner_nm</h6>
                            <p>company_intro</p>
                            <ul>
                                <li>
                                    <a href="#">
                                        <img src="img/icon/i_call.png" alt="">
                                        tel_no
                                    </a>
                                </li>
                                <li>
                                    <button onclick="blurbDetailPage(this)" id="partner_cd" type="button">상세보기</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                `;

                for(let i = 0; i < vvvipMain.length; i++){
                    let html = col3Content;
                    html = html.replace('img_url', vvvipMain[i].img_url);
                    html = html.replace('partner_nm', vvvipMain[i].partner_nm);
                    html = html.replace('partner_cd', vvvipMain[i].partner_cd);
                    html = html.replace('company_intro', vvvipMain[i].company_intro);
                    html = html.replace('tel_no', vvvipMain[i].tel_no);
                    $("main.pc section.section_01 div.row").append(html);

                    let moHtml = moContent;
                    moHtml = moHtml.replace('img_url', vvvipMain[i].img_url);
                    moHtml = moHtml.replace('partner_nm', vvvipMain[i].partner_nm);
                    moHtml = moHtml.replace('company_intro', vvvipMain[i].company_intro);
                    moHtml = moHtml.replace('tel_no', vvvipMain[i].tel_no);
                    $("main.mo section.section_01").find(".swiper-wrapper").append(moHtml);
                }

            }

            //VVIP업체 이미지 광고 그리기
            if(nvl(res.vvipBox) != ''){

                let col4Content = `
                    <div class="col-4">
                        <div class="box">
                            <div class="img">
                                <img src="img_url" onerror="this.src='img/sample/sample_01.png'" alt="">
                            </div>
                            <div class="box_info">
                                <h6>partner_nm</h6>
                                <p>company_intro</p>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src="img/icon/i_call.png" alt="">
                                            tel_no
                                        </a>
                                    </li>
                                    <li>
                                        <button onclick="blurbDetailPage(this)" id="partner_cd" type="button">상세보기</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>`;

                let moContent = `
                <div class="swiper-slide">
                    <div class="box">
                        <div class="img">
                            <img onerror="this.src='img/sample/sample_01.png'" src="img_url" alt="">
                        </div>
                        <div class="box_info">
                            <h6>partner_nm</h6>
                            <p>company_intro</p>
                            <ul>
                                <li>
                                    <a href="#">
                                        <img src="img/icon/i_call.png" alt="">
                                        tel_no
                                    </a>
                                </li>
                                <li>
                                    <button onclick="blurbDetailPage(this)" id="partner_cd" type="button">상세보기</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

                let vvipBox = res.vvipBox;
                for(let i = 0; i < vvipBox.length; i++){

                    let html = col4Content;

                    html = html.replace('img_url', vvipBox[i].img_url);
                    html = html.replace('partner_nm', vvipBox[i].partner_nm);
                    html = html.replace('partner_cd', vvipBox[i].partner_cd);
                    html = html.replace('company_intro', vvipBox[i].company_intro);
                    html = html.replace('tel_no', vvipBox[i].tel_no);
                    $("main.pc section.section_03 div.row").append(html);

                    let moHtml = moContent;

                    moHtml = moHtml.replace('img_url', vvipBox[i].img_url);
                    moHtml = moHtml.replace('partner_nm', vvipBox[i].partner_nm);
                    moHtml = moHtml.replace('partner_cd', vvipBox[i].partner_cd);
                    moHtml = moHtml.replace('company_intro', vvipBox[i].company_intro);
                    moHtml = moHtml.replace('tel_no', vvipBox[i].tel_no);
                    $("main.mo section.section_04").find(".swiper-wrapper").append(moHtml);

                }
            }

            //VIP 일반 광고 그리기
            if(nvl(res.vipBox) != ''){

                let vipCol3Content = `
                    <div class="col-3">
                        <div class="box type2">
                            <div class="box_info">
                                <p>company_intro</p>
                                <ul>
                                    <li>
                                        partner_nm
                                    </li>
                                    <li>
                                        <button onclick="blurbDetailPage(this)" id="partner_cd" type="button">상세보기</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>`;

                let moContent = `
                <div class="swiper-slide">
                    <div class="box type2">
                        <div class="box_info">
                            <p>company_intro</p>
                            <ul>
                                <li>
                                    partner_nm
                                </li>
                                <li>
                                    <button onclick="blurbDetailPage(this)" id="partner_cd" type="button">상세보기</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

                let vipBox = res.vipBox;

                for(let i = 0; i < vipBox.length; i++){

                    let html = vipCol3Content;
                    html = html.replace('partner_nm', vipBox[i].partner_nm);
                    html = html.replace('partner_cd', vipBox[i].partner_cd);
                    html = html.replace('company_intro', vipBox[i].company_intro);
                    html = html.replace('tel_no', vipBox[i].tel_no);
                    $("main.pc section.section_04 div.row").append(html);

                    let moHtml = moContent;
                    moHtml = moHtml.replace('partner_nm', vipBox[i].partner_nm);
                    moHtml = moHtml.replace('partner_cd', vipBox[i].partner_cd);
                    moHtml = moHtml.replace('company_intro', vipBox[i].company_intro);
                    $("main.mo section.section_05").find(".swiper-wrapper").append(moHtml);

                }
            }

        },
        error: function (x, o, e) {
            res = {x : x, o : o, e : e};
        }
    });

}

/** 광고상세페이지로 이동
 *
 * @param 거래처코드
 */
function blurbDetailPage(e){
    if(nvl(e.id) == '' || nvl(e.id) == 'partner_cd'){
        console.log("partner_cd 404 error");
        alert("광고상세페이지 이동오류");
        return;
    }

    // 페이지 이동
    //window.location.href = 'blurbDetail.html?partnerCd=' + e.id;

    window.location.href = 'detail.html?partnerCd=' + e.id;

}

/** 거래처광고 상세보기
 * param 오브젝트 정의
 *  @partnerCd : 'PT200004123'
 */
function getPartnerDetailDev(api, partnerCd){
    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    let param = {
        PARTNER_CD : partnerCd,
        COMPANY_CD : '1000',
        IMG_URL : url + '/PARTNER_TEMP/',
    }
    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/partnerDetail"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            if(nvl(res.map) != ''){
                result = res.map;
            } else if(nvl(res.error) != ''){
                console.log("getPartnerDetail error", res.error);
            } else {
                console.log("getPartnerDetail error");
            }
            console.log(result);

            let partnerInfo = result.partner;

            //임시 테스트 코딩
            $('#PARTNER_NM').text(nvl(partnerInfo.PARTNER_NM, '정보없음'));
            $('#TEL_NO').text(nvl(partnerInfo.TEL_NO, '정보없음'));
            $('#HOME_PAGE').text(nvl(partnerInfo.HOME_PAGE, '정보없음'));
            $('#KAKAOTALK').text(nvl(partnerInfo.KAKAOTALK, '정보없음'));
            $('#TELEGRAM').text(nvl(partnerInfo.TELEGRAM, '정보없음'));
            $('#YOUTUBE_LINK').text(nvl(partnerInfo.YOUTUBE_LINK, '정보없음'));
            $('#JOB_ZONE').text(nvl(partnerInfo.JOB_ZONE, '정보없음'));
            $('#COMPANY_INTRO').text(nvl(partnerInfo.COMPANY_INTRO, '정보없음'));

            //업체후기 정보를 쿼리로 가지고와야함 ex)
            let tempReviewList = [
                {
                    name : '홍길동',
                    ip : '127.0.0.1',
                    date : '2023-08-23',
                    kakao : 'test1',
                    seq : '1',
                    rating : '5',
                    context : '종은 서비스에 만족합니다.',
                },
                {
                    name : '둘리',
                    ip : '127.0.0.1',
                    date : '2023-08-23',
                    kakao : 'test2',
                    seq : '2',
                    rating : '1',
                    context : '별로에요',
                },
                {
                    name : '또치',
                    ip : '127.0.0.1',
                    date : '2023-08-23',
                    kakao : 'test3',
                    seq : '3',
                    rating : '5',
                    context : '종은 서비스에 만족합니다. 2222222222222222',
                },
            ]

            //
            $('#review-body').empty() // 자식요소 제거
            for(let i = 0; i < tempReviewList.length; i++){
                let html = `<tr>
                                <td>` + tempReviewList[i].name + `</td>
                                <td>` + tempReviewList[i].ip + `</td>
                                <td>` + tempReviewList[i].date + `</td>
                                <td>` + tempReviewList[i].kakao + `</td>
                                <td>` + tempReviewList[i].seq + `</td>
                                <td>` + tempReviewList[i].rating + `</td>
                                <td>` + tempReviewList[i].context + `</td>
                            </tr>`
                $('#review-body').append(html);
            }

        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

}

function getPartnerDetail(api, partnerCd){
    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    let param = {
        PARTNER_CD : partnerCd,
        COMPANY_CD : '1000',
        IMG_URL : url + '/PARTNER_TEMP/',
    }
    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/partnerDetail"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            if(nvl(res.map) != ''){
                result = res.map;
            } else if(nvl(res.error) != ''){
                console.log("getPartnerDetail error", res.error);
            } else {
                console.log("getPartnerDetail error");
            }
            console.log(result);

            let partnerInfo = result.partner;

            // 광고상세
            $('.detail_title h1').text(nvl(partnerInfo.PARTNER_NM, '정보없음'));

            let partnerInfoHtml =   `<dt>무료상담</dt>` +
                                    `<dd>` + nvl(partnerInfo.TEL_NO, '정보없음') + `</dd>` +
                                    `<dt>홈페이지</dt>` +
                                    `<dd className="td_unline"><a target='_blank' href="` + nvl(partnerInfo.HOME_PAGE, '#') + `">` + nvl(partnerInfo.HOME_PAGE, '정보없음') + `</a></dd>` +
                                    `<dt>카카오톡</dt>` +
                                    `<dd>` + nvl(partnerInfo.KAKAOTALK, '정보없음') + `</dd>` +
                                    `<dt>텔레그램</dt>` +
                                    `<dd>` + nvl(partnerInfo.TELEGRAM, '정보없음') + `</dd>` +
                                    `<dt>유튜브</dt>` +
                                    `<dd>` + nvl(partnerInfo.YOUTUBE_LINK) + `</dd>` +
                                    `<dt>업무가능지역</dt>`;

            let jobZone = nvl(result.job_zone);
            let jobZoneSubHtml = '';
            if(jobZone != ''){
                let jobZoneHtml =   `<dd>` +
                                    `<ul class="area">`;
                for(let i = 0; i < jobZone.length; i++){
                    jobZoneHtml += `<li><i class="i i_pin"></i>` + jobZone[i] + `</li>`

                    jobZoneSubHtml +=`
                                    <div class="col-4 col-lg-3 item">` +
                                        `<img src="img/icon/i_pin.svg" alt="">` + jobZone[i] +
                                    `</div>`;
                }
                jobZoneHtml += `</ul></dd>`;

                partnerInfoHtml += jobZoneHtml;

            }
            $('.partner-info').append(partnerInfoHtml);

            //이미지
            let img = nvl(result.img);
            let imgHtml = '';
            if(nvl(img) != ''){
                for (let i = 0; i < img.length; i++){
                    imgHtml +=
                            `<div class="swiper-slide">`+
                                `<img onError="this.src='img/sample/sample_01.png'" src="` + img[i].img_url + `" />`+
                            `</div>`;
                }
                $('.main-img').append(imgHtml);
            } else {
                imgHtml +=
                    `<div class="swiper-slide">`+
                        `<img src="img/sample/sample_11.png" />` +
                    `</div>`;
                $('.main-img').append(imgHtml);
            }

            /*<div class="swiper-slide">
            <img src="img/sample/sample_11.png" />
            </div>*/


            //업체소개
            $('#partner-intro p').text(nvl(partnerInfo.COMPANY_INTRO));

            //업무가능지역 - 자사보유
            $('#job-zone div.row').append(jobZoneSubHtml);

            //전문분야
            let jobField = nvl(result.job_field);
            let jobFieldIcon = nvl(result.job_field_icon);
            if(jobField != ''){
                for(let i = 0; i < jobField.length; i++){

                    let html =  `<div class="col-4 col-lg-3 item">` +
                                    `<img src="` + nvl(jobFieldIcon[i]) + `" alt="" >` + jobField[i] +
                                `</div>`;
                    $('#job-field div.row').append(html);
                }
            }

            //전문분야
            let jobEp = nvl(result.job_ep);
            let jobEpIcon = nvl(result.job_ep_icon);
            if(jobEp != ''){
                for(let i = 0; i < jobEp.length; i++){

                    let html =  `<div class="col-4 col-lg-3 item">` +
                        `<img src="` + nvl(jobEpIcon[i]) + `" alt="" >` + jobEp[i] +
                        `</div>`;
                    $('#job-ep div.row').append(html);
                }
            }




            //스페셜광고
            let blurbSpecial = nvl(result.blurbSpecial);
            if(blurbSpecial != ''){

                for(let i = 0; i < blurbSpecial.length; i++){
                    let pcSpecialHtml =
                            `<div class="col-3">` +
                                `<div class="special_box">` +
                                    `<img onError="this.src='img/sample/sample_01.png'" src="` + blurbSpecial[i].img_url + `" alt="">` +
                                        `<div class="special_box_info">` +
                                            `<h1>` + blurbSpecial[i].partner_nm + `</h1>` +
                                            `<p>무료상담 : `+ blurbSpecial[i].tel_no +`</p>` +
                                            `<button onClick="blurbDetailPage(this)" id="` + blurbSpecial[i].partner_cd + `" type="button">상세보기</button>` +
                                        `</div>` +
                                `</div>` +
                            `</div>`;

                    $("#special-blurb-pc").append(pcSpecialHtml);

                    let moSpecialHtml =
                        `<div class="swiper-slide">` +
                            `<div class="special_box">` +
                                `<img onError="this.src='img/sample/sample_01.png'" src="` + blurbSpecial[i].img_url + `" alt="">` +
                                    `<div class="special_box_info">` +
                                    `<h1>` + blurbSpecial[i].partner_nm + `</h1>` +
                                    `<p>무료상담 : `+ blurbSpecial[i].tel_no +`</p>` +
                                    `<button onClick="blurbDetailPage(this)" id="` + blurbSpecial[i].partner_cd + `" type="button">상세보기</button>` +
                                    `</div>` +
                            `</div>` +
                        `</div>`;

                    $("#special-blurb-mo").append(moSpecialHtml);

                }

            }

            //사이드광고
            let blurbSide = nvl(result.blurbSide);
            if(blurbSide != ''){

                for(let i = 0; i < blurbSide.length; i++){

                    let blurbSideHtml =
                            `<li>` +
                                `<div class="detail_side_box">` +
                                        `<img onError="this.src='img/sample/sample_01.png'" src="` + blurbSide[i].img_url + `" alt="">` +
                                        `<h4>` + blurbSide[i].partner_nm + `</h4>` +
                                        `<p>편하게 연락주시면 친절한 상담 도와드리겠습니다.</p>` +
                                        `<button onClick="blurbDetailPage(this)" id="` + blurbSide[i].partner_cd + `" type="button">상세보기</button>` +
                                `</div>` +
                            `</li>`;

                    $("#blurb-side").append(blurbSideHtml);
                }

            }





            //$('#JOB_ZONE').text(nvl(partnerInfo.JOB_ZONE, '정보없음'));
            //$('#COMPANY_INTRO').text(nvl(partnerInfo.COMPANY_INTRO, '정보없음'));


        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

}

var nvl = function (A, B) {
    var type;
    var temp;
    if( typeof A == 'string'){
        temp = A.trim();
        type = 'string';
    }else if (typeof A == 'number'){
        temp = A.toString();
        type = 'number';
    }else{
        temp = A;
    }
    if (!isNull(temp) && !isUndefined(temp) && !isEmpty(temp)) {

        if (type == 'number'){
            A = Number(A);
        }
        return A;
    } else {
        if (isUndefined(B)) {
            B = "";
        }
        return B;
    }
};

var isNull = function (value) {
    var _chkStr = value + "";
    if (_chkStr == "" || _chkStr == null || _chkStr == "null") {
        return true;
    }
    return false;
};

var isUndefined = function (value) {
    if (typeof (value) == "undefined" || typeof (value) == undefined || value == "undefined" || value == undefined) {
        return true;
    }
    return false;
};

var isEmpty = function (obj) {
    if(typeof obj === 'object' && obj !== null){ //객체 여부를 확인
        return Object.keys(obj).length === 0;
    }else{
        return false;
    }
};
