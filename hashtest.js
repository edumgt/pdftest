const fruits = new Set();

// 요소 추가
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Orange");
fruits.add("Apple"); // 중복이면 무시됨

// 크기 확인
console.log("과일 개수:", fruits.size); // 4

// 출력 (Set은 직접 console.log 하면 순서 없는 집합 형태로 보임)
console.log("과일 목록:", fruits);

// 포함 여부 확인
console.log("Banana 포함?", fruits.has("Banana"));

// 요소 제거
fruits.delete("Orange");
console.log("Orange 제거 후:", fruits);

// 반복문 순회
for (const fruit of fruits) {
    console.log("과일:", fruit);
}

