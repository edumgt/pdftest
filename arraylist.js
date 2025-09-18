// -----------------------------
// ListCrudExample in JavaScript
// -----------------------------

function main() {
  // 배열(Array) 생성
  let fruits = [];

  // -----------------------------
  // C: Create (생성/추가)
  // -----------------------------
  fruits.push("Apple");   // "Apple" 추가 → ["Apple"]
  fruits.push("Orange");  // "Orange" 추가 → ["Apple", "Orange"]

  // -----------------------------
  // R: Read (조회)
  // -----------------------------
  console.log("First fruit:", fruits[1]);
  // 인덱스 1의 값 "Orange" 반환
  // 출력: First fruit: Orange

  // 배열의 모든 요소 순회하며 출력
  for (let f of fruits) {
    console.log("Fruit:", f);        // 각 요소 출력
    console.log("Fruit:", f.length); // 문자열 길이 출력
    // 결과:
    // Fruit: Apple
    // Fruit: 5
    // Fruit: Orange
    // Fruit: 6
  }

  // -----------------------------
  // U: Update (수정)
  // -----------------------------
  fruits[1] = "Banana";
  // 인덱스 1의 값 "Orange" → "Banana"로 변경 → ["Apple", "Banana"]

  console.log(fruits[1]);
  // 출력: Banana

  // -----------------------------
  // D: Delete (삭제)
  // -----------------------------
  // 특정 값 제거하려면 index 찾아서 splice 사용
  const index = fruits.indexOf("Apple");
  if (index !== -1) {
    fruits.splice(index, 1); // "Apple" 삭제 → ["Banana"]
  }

  fruits = []; // 배열 전체 비우기
  // 현재 상태: []
}

// 실행
main();
