const fs = require("fs");

// 동기적으로 파일 읽기
const data = fs.readFileSync("C:\\edumgt-java-education\\java-education-001\\resources\\test.txt", "utf8");

// 내용 출력
console.log(data);
