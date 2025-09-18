const jsonfile = require("jsonfile");

const file = "data.json";
const obj = { name: "홍길동", age: 25, email: "hong@example.com" };

// 파일로 저장
jsonfile.writeFile(file, obj, { spaces: 2 })
  .then(() => console.log("저장 완료"))
  .catch(err => console.error(err));

// 파일 읽기
jsonfile.readFile(file)
  .then(data => console.log("읽은 JSON:", data))
  .catch(err => console.error(err));
