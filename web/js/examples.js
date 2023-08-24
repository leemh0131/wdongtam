$(document).ready(function () {

  $(".header_search").hover(function () {
    $(this).next().addClass("active");
  });

  $(".search_box").mouseleave(function () {
    $(this).removeClass("active");
  });

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
});
