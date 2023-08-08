import "./index.css";
import "./index.less";
import "./index.sass";
console.log("hello webpack");

import vueSvg1K from "./assets/vue.svg";
import yyxJpg208K from "./assets/yyx.jpg";
document.querySelector(".demo-img1").style.background = `url(${vueSvg1K})`;
document.querySelector(".demo-img2").style.background = `url(${yyxJpg208K})`;

import createElements from "./create.js";
const element = createElements();
document.body.append(element);

const arr = [1, 1, 1, 2, 3];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr);

const promise1 = new Promise((resolve, reject) => {
  resolve("foo");
});

promise1.then(value => {
  console.log(value);
});

console.log(promise1);
