const winax = require("winax");

const hwp = new winax.Object("HWPFrame.HwpObject");

// 한글 창 보이기
hwp.XHwpWindows.Item(0).Visible = true;

// 새 문서
hwp.Run("FileNew");

// 텍스트 입력
hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet);
hwp.HParameterSet.HInsertText.Text = "안녕하세요. Node.js에서 HWP 문서를 생성했습니다!";
hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet);

// ✅ 파일 저장 (HWP 형식)
hwp.SaveAs("C:\\Users\\user\\Desktop\\example.hwp", "HWP", "lock:false");

// 종료
hwp.Quit();
