$(document).ready(function () {
    $(".header_search").hover(function () {
        $(this).next().addClass("active");
    });

    $(".search_box").mouseleave(function () {
        $(this).removeClass("active");
    });

    // 새로운 아이템 추가 함수
    function addItem() {
        var newItem = `
    <li>
      <div class="real_time_item">
          <p>[비밀글] 강아지를 찾고 싶은데, 잃어버린 곳은 서울 구로구 근처쯤인데요.</p>
          <ul>
              <li>김*우</li>
              <li>2023-07-18</li>
          </ul>
      </div>
    </li>
  `;

        // 첫 번째 아이템 애니메이션 적용 (위로 이동)
        $(".real_time_list li:first").animate(
            {marginTop: "-70px"},
            1000,
            function () {
                $(this).remove(); // 애니메이션 완료 후 삭제
            }
        );

        // 새로운 아이템 추가 (맨 아래에)
        $(".real_time_list").append(newItem);
    }

    // 일정 간격으로 addItem 함수 호출 (예: 3초마다)
    setInterval(addItem, 3000);

    // PC
    // 새로운 아이템 추가 함수
    function pcAddItem() {
        var newItem = `
    <li>
      <dl>
          <dt>가족분쟁으로 인한 상담건입니다.</dt>
          <dd>2023-07-18</dd>
      </dl>
  </li>
    `;

        // 첫 번째 아이템 애니메이션 적용 (위로 이동)
        $(".pc_real_time_list li:first").animate(
            {marginTop: "-21px"},
            1000,
            function () {
                $(this).remove(); // 애니메이션 완료 후 삭제
            }
        );

        // 새로운 아이템 추가 (맨 아래에)
        $(".pc_real_time_list").append(newItem);
    }

    // 일정 간격으로 addItem 함수 호출 (예: 3초마다)
    setInterval(pcAddItem, 3000);

    // mainSwiper01
    var mainSwiper01 = new Swiper(".mainSwiper01", {
        slidesPerView: 1.2,
        spaceBetween: 20, // 슬라이드 여백
        centeredSlides: false, // 슬라이드 중앙정렬
        slidesOffsetBefore: 20, // 슬라이드 오른쪽 여백
        slidesOffsetAfter: 20, // 슬라이드 오른쪽 여백
        loop: false, // 무한반복
        scrollbar: {
            el: ".swiper-scrollbar",
        },
    });

    // mainSwiper02
    var mainSwiper02 = new Swiper(".mainSwiper02", {
        slidesPerView: 2.3,
        spaceBetween: 20, // 슬라이드 여백
        centeredSlides: false, // 슬라이드 중앙정렬
        slidesOffsetBefore: 20, // 슬라이드 오른쪽 여백
        slidesOffsetAfter: 20, // 슬라이드 오른쪽 여백
        loop: false, // 무한반복
    });

    // mainSwiper03
    var mainSwiper03 = new Swiper(".mainSwiper03", {
        slidesPerView: 1.2,
        grid: {
            rows: 2,
        },
        spaceBetween: 20, // 슬라이드 여백
        centeredSlides: false, // 슬라이드 중앙정렬
        slidesOffsetBefore: 20, // 슬라이드 오른쪽 여백
        slidesOffsetAfter: 20, // 슬라이드 오른쪽 여백
        loop: false, // 무한반복
    });

    var mainSwiper04 = new Swiper(".mainSwiper04", {
        slidesPerView: 2.5,
        grid: {
            rows: 3,
        },
        spaceBetween: 20, // 슬라이드 여백
        centeredSlides: false, // 슬라이드 중앙정렬
        slidesOffsetBefore: 20, // 슬라이드 오른쪽 여백
        slidesOffsetAfter: 20, // 슬라이드 오른쪽 여백
        loop: false, // 무한반복
    });

    var detail_img_01 = new Swiper(".detail_img_01", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var detail_img_02 = new Swiper(".detail_img_02", {
        spaceBetween: 10,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        autoplay: {
            delay: 2000,
        },
        thumbs: {
            swiper: detail_img_01,
        },
    });

    var detail_img_03 = new Swiper(".detail_img_03", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var detail_img_04 = new Swiper(".detail_img_04", {
        spaceBetween: 10,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        autoplay: {
            delay: 2000,
        },
        thumbs: {
            swiper: detail_img_03,
        },
    });

    var special_ad = new Swiper(".special_ad", {
        slidesPerView: 1.8,
        spaceBetween: 16, // 슬라이드 여백
        centeredSlides: false, // 슬라이드 중앙정렬
        loop: false, // 무한반복
        autoplay: {
            delay: 2000,
        },
    });
});
