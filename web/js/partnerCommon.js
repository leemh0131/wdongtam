var localApiUrl = "http://localhost:8080";
var devApiUrl = "http://117.52.92.85:8011";
var prodApiUrl = "http://117.52.84.88:8080";

/**
 * 이미지 업로드 테스트는 개발서버 및 운영서버에서만 가능합니다.
 * 개발서버
 * mklink /d "C:\qrayTomcat\apache-tomcat-9.0.62-8011-partner\webapps\ROOT\PARTNER_TEMP" "C:\PARTNER_TEMP"
 *
 * 실서버
 * /root/apache-tomcat-admin/webapps/ROOT/ 경로에  PARTNER_TEMP 폴더생성
 *
 * sudo umount /root/apache-tomcat-admin/webapps/ROOT/PARTNER_TEMP
 * sudo mount --bind /PARTNER_TEMP/ /root/apache-tomcat-admin/webapps/ROOT/PARTNER_TEMP
 */

/** 메인페이지 광고 그리기
 *
 *
 */
function getPartnerMainList(api){

    let url;
    let result;

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


    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/partnerBlurbList"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(parameter),
        success: function (res) {

            result = res;

        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

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

        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });


    return result;

}

function getPartnerSearch(api, param){
    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    param.IMG_URL = url + '/PARTNER_TEMP/';

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getPartnerSearch"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
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


function getTest(api, partnerCd){
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
        url: [url + "/api/web/v1/partnerDetail2"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {

            console.log("resTest", res);


        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

}


/**
 * @param api
 */
function getCompanyInfo(api){
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
        COMPANY_CD : '1000',
    }
    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getCompanyInfo"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {

            result = res;


        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

function callClick(partenr_cd){

    var url = prodApiUrl;

    let param = {
        COMPANY_CD : '1000',
        PARTENR_CD : partenr_cd,
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/callClick"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
        },
        error: function (x, o, e) {
        }
    });

}

function getSearchPageBlurb(partnerTp, api){

    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    if(partnerTp == '탐정'){
        partnerTp = '01';
    } else if(partnerTp == '행정사'){
        partnerTp = '02';
    } else {
        partnerTp = '';
    }

    let param = {
        COMPANY_CD : '1000',
        PARTNER_TP : partnerTp,
        IMG_URL : url + '/PARTNER_TEMP/'
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getSearchPageBlurb"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

function getCategory(api){

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
        COMPANY_CD : '1000'
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getCategory"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

function getCustomerService(api){

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
        COMPANY_CD : '1000',
        IMG_URL : url + '/PARTNER_TEMP/'
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getCustomerService"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

function getNoticePaging(api, param){

    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getNoticePaging"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

//페이징 처리 공통 함수
function generatePaging(totalItems, itemsPerPage, currentPageGroup, itemsInGroup, callback) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const totalGroups = Math.ceil(totalPages / itemsInGroup);

    const startPage = (currentPageGroup - 1) * itemsInGroup + 1;
    const endPage = Math.min(startPage + itemsInGroup - 1, totalPages);

    const $paginationUL = $("#pagination");
    $paginationUL.empty(); // 기존 내용을 지웁니다.

    // 이전 그룹 버튼을 생성합니다.
    if (currentPageGroup > 1) {
        const $prevLi = $("<li class='prev'></li>");
        const $prevImg = $("<img src='img/icon/i_chevron_left.svg' alt=''>");
        $prevLi.append($prevImg);
        $prevLi.on("click", function() {
            // 이전 그룹 버튼 클릭 시 처리
            generatePaging(totalItems, itemsPerPage, currentPageGroup - 1, itemsInGroup, callback);
        });
        $paginationUL.append($prevLi);
    }

    // 페이지 번호 버튼을 생성합니다.
    for (let page = startPage; page <= endPage; page++) {

        let $pageLi = $("<li></li>");

        $pageLi.text(page);
        $pageLi.on("click", function() {
            $paginationUL.find("li").removeClass("active"); // 다른 페이지에서 active 클래스 제거
            $pageLi.addClass("active"); // 현재 페이지에 active 클래스 추가

            //callback 변수는 함수이다. 파라미터는 page 숫자 리스트를 그려주는 함수를 만들어주면 됨.
            callback(parseInt(page));

        });

        $paginationUL.append($pageLi);
    }

    // 다음 그룹 버튼을 생성합니다.
    if (currentPageGroup < totalGroups) {
        const $nextLi = $("<li class='next'></li>");
        const $nextImg = $("<img src='img/icon/i_chevron_right.svg' alt=''>");
        $nextLi.append($nextImg);
        $nextLi.on("click", function() {
            // 다음 그룹 버튼 클릭 시 처리
            generatePaging(totalItems, itemsPerPage, currentPageGroup + 1, itemsInGroup);
        });
        $paginationUL.append($nextLi);
    }


}

function getCommonCode(api, param){

    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getCommonCode"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

function setWrite(api, param){

    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/setWrite"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

function getConsulting(api, param){

    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    param.IMG_URL = url + '/PARTNER_TEMP/',

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getConsulting"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

function getConsultingList(api, param){

    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

        $.ajax({
            type: "POST",
            url: [url + "/api/web/v1/getConsultingList"],
            contentType: "application/json; charset=UTF-8",
            async : false,
            data: JSON.stringify(param),
            success: function (res) {
                result = res;
            },
            error: function (x, o, e) {
                result = {x : x, o : o, e : e};
            }
        });

    return result;

}

function communityDetail(id){

    alert("준비중입니다.");
    return;

}

function setReviewWrite(api, param){

    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/reviewWrite"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}

function getReviewList(api, param){

    let result;
    let url;

    if(api == 'local'){
        url = localApiUrl;
    } else if(api == 'dev'){
        url = devApiUrl;
    } else if(api == 'prod'){
        url = prodApiUrl;
    }

    $.ajax({
        type: "POST",
        url: [url + "/api/web/v1/getReviewList"],
        contentType: "application/json; charset=UTF-8",
        async : false,
        data: JSON.stringify(param),
        success: function (res) {
            result = res;
        },
        error: function (x, o, e) {
            result = {x : x, o : o, e : e};
        }
    });

    return result;

}