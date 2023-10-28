$(document).ready(function () {
  /*$(".header_search").hover(function () {
    $(this).next().addClass("active");
  });

  $(".search_box").mouseleave(function () {
    $(this).removeClass("active");
  });*/

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





});
