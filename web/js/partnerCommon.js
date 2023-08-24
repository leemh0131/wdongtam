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
                //유튜트링크
                $(".youtube").attr("src", res.vvvipMainYouTube[0].youtube_link);
                //$("main.pc section.section_01 div.col-6 iframe").attr("src", res.vvvipMainYouTube[0].youtube_link);
                //이미지
                $("main.pc section.section_01 div.col-6 img").attr("src", res.vvvipMainYouTube[0].img_url);

                //거래처명
                $("main.pc section.section_01 div.col-6 div.box_info h6").text(res.vvvipMainYouTube[0].partner_nm);
                $("#mo_main h6").text(res.vvvipMainYouTube[0].partner_nm);

                //설명
                $("main.pc section.section_01 div.col-6 div.box_info p").text(res.vvvipMainYouTube[0].company_intro);
                $("#mo_main p").text(res.vvvipMainYouTube[0].company_intro);

                //번호
                $("main.pc section.section_01 div.col-6 div.box_info a").html('<img src="img/icon/i_call.png" alt="">'+res.vvvipMainYouTube[0].tel_no);
                $("#mo_main a").html('<img src="img/icon/i_call.png" alt="">'+res.vvvipMainYouTube[0].tel_no);
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
                                    <button type="button">상세보기</button>
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
                                    <button type="button">상세보기</button>
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
                                        <button type="button">상세보기</button>
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
                                    <button type="button">상세보기</button>
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
                    html = html.replace('company_intro', vvipBox[i].company_intro);
                    html = html.replace('tel_no', vvipBox[i].tel_no);
                    $("main.pc section.section_03 div.row").append(html);

                    let moHtml = moContent;

                    moHtml = moHtml.replace('img_url', vvipBox[i].img_url);
                    moHtml = moHtml.replace('partner_nm', vvipBox[i].partner_nm);
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
                        <button type="button">상세보기</button>
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
                                    <button type="button">상세보기</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

                let vipBox = res.vipBox;

                for(let i = 0; i < vipBox.length; i++){

                    let html = vipCol3Content;
                    html = html.replace('partner_nm', vipBox[i].partner_nm);
                    html = html.replace('company_intro', vipBox[i].company_intro);
                    html = html.replace('tel_no', vipBox[i].tel_no);
                    $("main.pc section.section_04 div.row").append(html);

                    let moHtml = moContent;
                    moHtml = moHtml.replace('partner_nm', vipBox[i].partner_nm);
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

/** 거래처광고 상세보기
 * param 오브젝트 정의
 *  @partnerCd : 'PT200004123'
 */
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
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });
    return result;
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


