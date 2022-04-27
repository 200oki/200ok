export const navigator = (e) => {
  if (e.target.innerText === "주민퀴즈") {
    window.location.href = "/game";
  } else if (e.target.innerText === "오늘의 주인공") {
    window.location.href = "/today";
  } else if (e.target.innerText === "나와 맞는 주민 찾기") {
    window.location.href = "/match";
  } else if (e.target.innerText === "주민도감") {
    window.location.href = "/bestiary";
  } else {
    window.location.href = "/";
  }
};
