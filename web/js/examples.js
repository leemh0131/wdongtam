$(document).ready(function () {
  $(".header_search").hover(function () {
    $(this).next().addClass("active");
  });

  $(".search_box").mouseleave(function () {
    $(this).removeClass("active");
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
    slidesOffsetBefore: 20, // 슬라이드 오른쪽 여백
    slidesOffsetAfter: 20, // 슬라이드 오른쪽 여백
    autoplay: {
      delay: 2000,
    },
  });


  // 지역선택
  $("#region").click(function () {
    $(".region_wrap").toggle();
  });

  $(".region_wrap ul li").click(function () {
    $(this).toggleClass("active");
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

  // 분류선택
  $("#selectCategory").click(function () {
    $(".select_category_wrap").toggle();
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


});
