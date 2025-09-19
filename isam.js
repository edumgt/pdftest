const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "isam_data.dat");
const INDEX_FILE = path.join(__dirname, "isam_index.dat");
const RECORD_SIZE = 80; // ID + 항구명 고정 길이 (UTF-8)

// 레코드 삽입
function insertRecord(id, portName) {
  const dataFd = fs.openSync(DATA_FILE, "a+"); // append 모드
  const indexFd = fs.openSync(INDEX_FILE, "a");

  const pos = fs.statSync(DATA_FILE).size; // 현재 파일 끝 위치

  // ID (5자리)
  const idStr = id.toString().padStart(5, "0");
  const idBytes = Buffer.from(idStr, "utf-8");

  // 항구명 (70바이트 고정)
  let nameBytes = Buffer.from(portName, "utf-8");
  if (nameBytes.length > 70) {
    nameBytes = nameBytes.slice(0, 70);
  } else if (nameBytes.length < 70) {
    const padding = Buffer.alloc(70 - nameBytes.length, " ");
    nameBytes = Buffer.concat([nameBytes, padding]);
  }

  // 레코드 조립 (ID|항구명)
  let record = Buffer.concat([idBytes, Buffer.from("|"), nameBytes]);

  if (record.length < RECORD_SIZE) {
    const padded = Buffer.alloc(RECORD_SIZE - record.length, " ");
    record = Buffer.concat([record, padded]);
  }

  fs.writeSync(dataFd, record);
  fs.writeSync(indexFd, `${id},${pos}\n`);

  fs.closeSync(dataFd);
  fs.closeSync(indexFd);
}

// 레코드 검색
function findRecord(id) {
  const indexData = fs.readFileSync(INDEX_FILE, "utf-8").split("\n");
  const dataFd = fs.openSync(DATA_FILE, "r");

  for (const line of indexData) {
    if (!line.trim()) continue;
    const [key, pos] = line.split(",");
    if (parseInt(key) === id) {
      const buffer = Buffer.alloc(RECORD_SIZE);
      fs.readSync(dataFd, buffer, 0, RECORD_SIZE, parseInt(pos));
      fs.closeSync(dataFd);
      return buffer.toString("utf-8").trim();
    }
  }

  fs.closeSync(dataFd);
  return null;
}

// 테스트 실행
function main() {
  // 기존 파일 삭제
  if (fs.existsSync(DATA_FILE)) fs.unlinkSync(DATA_FILE);
  if (fs.existsSync(INDEX_FILE)) fs.unlinkSync(INDEX_FILE);

  // 미국
  [
    "Los Angeles", "Long Beach", "New York/New Jersey", "Savannah", "Houston",
    "Seattle", "Oakland", "Norfolk", "Miami", "Charleston"
  ].forEach((port, i) => insertRecord(1001 + i, port));

  // 일본
  [
    "Tokyo", "Yokohama", "Nagoya", "Kobe", "Osaka",
    "Hakata (Fukuoka)", "Shimizu", "Hiroshima", "Kitakyushu", "Naha (Okinawa)"
  ].forEach((port, i) => insertRecord(2001 + i, port));

  // 멕시코
  [
    "Veracruz", "Manzanillo", "Lázaro Cárdenas", "Altamira", "Tampico",
    "Coatzacoalcos", "Progreso", "Mazatlán", "Ensenada", "Guaymas"
  ].forEach((port, i) => insertRecord(3001 + i, port));

  // 검색 예시
  console.log("찾은 레코드:", findRecord(2005)); // Osaka
  console.log("찾은 레코드:", findRecord(3003)); // Lázaro Cárdenas
}

main();
