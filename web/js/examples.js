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
      { marginTop: "-70px" },
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
      { marginTop: "-21px" },
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
    slidesOffsetBefore: 20, // 슬라이드 오른쪽 여백
    slidesOffsetAfter: 20, // 슬라이드 오른쪽 여백
    autoplay: {
      delay: 2000,
    },
  });

  // 초기 탭 설정
  $(".tab_nav_item:first").addClass("active");
  $(".tab_pane:first").addClass("active");

  // 탭 클릭 이벤트 처리
  $(".tab_nav_item").click(function () {
    $(".tab_nav_item").removeClass("active");
    $(this).addClass("active");

    var tabIndex = $(this).index();
    $(".tab_pane").removeClass("active");
    $(".tab_pane:eq(" + tabIndex + ")").addClass("active");
  });

  // 초기 중첩된 탭 설정
  $(".nested_tab_nav_item:first").addClass("active");
  $(".nested_tab_pane:first").addClass("active");

  // 중첩된 탭 클릭 이벤트 처리
  $(".nested_tab_nav_item").click(function () {
    $(".nested_tab_nav_item").removeClass("active");
    $(this).addClass("active");

    var nestedTabIndex = $(this).index();
    $(".nested_tab_pane").removeClass("active");
    $(".nested_tab_pane:eq(" + nestedTabIndex + ")").addClass("active");
  });

  // 아코디언
  $(".accordion_title").click(function () {
    $(".accordion_content").slideUp();
    $(this).parent().toggleClass("active");
    $(".accordion_item").not($(this).parent()).removeClass("active");
    $(this).next(".accordion_content").slideToggle();
  });

  // 지역선택
  $("#region").click(function () {
    $(".region_wrap").toggle();
  });

  $(".region_wrap ul li").click(function () {
    $(this).toggleClass("active");
  });

  // 분류선택
  $("#selectCategory").click(function () {
    $(".select_category_wrap").toggle();
  });

  $(".category li").click(function () {
    $(this).toggleClass("active");
  });

  // prev 버튼 클릭 시
  $(".prev").on("click", function () {
    $(".category").animate({ scrollLeft: "-=100px" }, "slow");
  });

  // next 버튼 클릭 시
  $(".next").on("click", function () {
    $(".category").animate({ scrollLeft: "+=100px" }, "slow");
  });

  // category_all 버튼 클릭 시
  $(".category_all").on("click", function () {
    $(".select_category_wrap").slideToggle("slow");
  });

  // 모달 열기 버튼 클릭 이벤트
  $(".open_modal").click(function () {
    var modalId = $(this).data("modal-id");
    $("#" + modalId).css("display", "flex");
  });

  // 모달 닫기 버튼 및 모달 바깥 영역 클릭 이벤트
  $(".close, .modal_wrap").click(function () {
    $(".modal_wrap").css("display", "none");
  });

  // 모달 내부 클릭 시 닫기 방지
  $(".modal_content").click(function (e) {
    e.stopPropagation();
  });

  // 커스텀 select box 열기/닫기 이벤트
  $(".custom_select").click(function () {
    var $options = $(this).find(".options");
    $options.toggleClass("open");
  });

  // 옵션 선택 이벤트
  $(".options li").click(function () {
    var selectedValue = $(this).data("value");
    var selectedText = $(this).text();
    var $customSelect = $(this).closest(".custom_select");
    $customSelect.find(".selected_option").text(selectedText);
    $customSelect.find(".options").removeClass("open");
  });

  // 커스텀 select box 외부 클릭 시 닫기
  $(document).click(function (e) {
    if (!$(e.target).closest(".custom_select").length) {
      $(".options").removeClass("open");
    }
  });

  // 파일 선택
  $("#fileButton").click(function () {
    $("#fileInput").click();
  });

  // 파일 선택 이벤트 처리
  $("#fileInput").change(function () {
    var selectedFile = this.files[0];
    if (selectedFile) {
      // 파일 선택 후 처리할 로직을 여기에 추가
      $("#fileNameInput").val(selectedFile.name);
    }
  });

  // 뒤로가기
  $(".back_button").click(function () {
    window.history.back();
  });
});
