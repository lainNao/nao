import {
  ComponentDisplayPanel,
  TextDifference,
  TextGradient,
} from "./components";
import { GridTableExplicitAxis } from "./components/GridTableExplicitAxis/GridTableExplicitAxis";

function App() {
  return (
    <div
      style={{
        backgroundColor: "ghostwhite",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <ComponentDisplayPanel
        title="TextGradient"
        todo={[
          "span以外やタグ無しにも対応",
          "メモ化",
          "childrenに何を入れてもその範囲のテキストをグラデーションさせる。Appleのやり方があるはず",
        ]}
        render={[
          <TextGradient baseHex="#3269cf">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
          </TextGradient>,
          <TextGradient
            baseHex="#04cea9"
            additionalLight={-60}
            additionalShadow={20}
          >
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
          </TextGradient>,
        ]}
      />

      <ComponentDisplayPanel
        title="TextDifference"
        render={[
          <div
            style={{
              backgroundImage: "url(https://picsum.photos/id/1065/500/300)",
              width: 300,
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "xxx-large",
            }}
          >
            <TextDifference baseHex="#89a7dd">Sound of silence</TextDifference>
          </div>,
        ]}
      />

      <ComponentDisplayPanel
        title="GridTableExplicitAxis"
        todo={[
          "components配下がComponentDisplayPanelのソースで描画されないな…",
          "行タイトルはstickyにしたい",
          "styleプロップじゃなく、muiのようにsass的なものを流せるようにしないとn行目のcss設定みたいなことができないのかもだしそうできたらよりよさそう",
          "空行押下した時のコールバックの引数は、カラムや行のタイトルをいい感じのオブジェクトで返す",
        ]}
        render={[
          <GridTableExplicitAxis
            x={[
              {
                key: "date",
                data: ["2020/01/01", "2020/01/02"],
              },
              {
                key: "room",
                data: ["Tokyo", "Osaka", "Fukuoka"],
              },
              {
                key: "time",
                data: ["10:00", "11:00", "12:00", "13:00"],
              },
            ]}
            y={[
              {
                key: "sex",
                data: ["man", "woman"],
              },
              {
                key: "age",
                data: [15, 16],
              },
            ]}
            data={[
              {
                id: 1,
                date: "2020/01/01",
                room: "Tokyo",
                time: "10:00",
                sex: "man",
                age: 15,
                content: "stress...",
              },
              {
                id: 2,
                date: "2020/01/02",
                room: "Fukuoka",
                time: "11:00",
                sex: "woman",
                age: 16,
                content: "chill...",
              },
              {
                id: 3,
                date: "2020/01/01",
                room: "Osaka",
                time: "12:00",
                sex: "woman",
                age: 15,
                content: "god dammit...",
              },
              {
                id: 4,
                date: "2020/01/02",
                room: "Tokyo",
                time: "13:00",
                sex: "man",
                age: 16,
                content: "relax...",
              },
            ]}
            renderSettings={{
              styles: {
                container: {
                  backgroundColor: "#edeef3",
                },
                baseCell: {
                  backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`,
                },
                columnTitleCell: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 10px",
                  minWidth: "50px",
                },
                rowTitleCell: {
                  // position: "sticky",
                  // left: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 10px",
                  minWidth: "50px",
                  height: "100%",
                  minHeight: "50px",
                },
                dataCell: {
                  backgroundColor: "#7894ad",
                  height: "100%",
                  color: "white",
                  padding: "0 10px",
                  wordBreak: "break-word",
                },
                emptyDataCell: {
                  height: "100%",
                  backgroundColor: "white",
                },
              },
              components: {
                columnTitleCell: (axisDatum) => <>{axisDatum}</>,
                rowTitleCell: (axisDatum) => <>{axisDatum}</>,
                dataCell: (datum) => (
                  <div onClick={() => alert(JSON.stringify(datum))}>
                    {datum.content}
                  </div>
                ),
                emptyDataCell: (axisValues) => (
                  <div
                    style={{ height: "100%", width: "100" }}
                    onClick={() => alert("clicked empty cell")}
                  ></div>
                ),
              },
            }}
          />,
        ]}
      />
    </div>
  );
}

export default App;