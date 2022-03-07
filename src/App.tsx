import {
  ComponentDisplayPanel,
  TextDifference,
  TextGradient,
  ImgShiftedColoredBackground,
} from "./components";
import { TableWithMultipliedTitle } from "./components/TableWithMultipliedTitle/TableWithMultipliedTitle";

function App() {
  return (
    <div
      style={{
        backgroundColor: "ghostwhite",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingBottom: "30px",
      }}
    >
      <ComponentDisplayPanel
        title="TextGradient"
        todo={[
          "span以外やタグ無しにも対応",
          "メモ化",
          "childrenに何を入れてもその範囲のテキストをグラデーションさせる。Appleのやり方があるはず",
        ]}
        references={[
          "https://twitter.com/pulpxstyle/status/1410055748147548161",
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
        references={[
          "https://twitter.com/pulpxstyle/status/1410055748147548161",
        ]}
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
        title="TableWithMultipliedTitle"
        todo={[
          "なぜtableタグで作らないのか？無駄にgridレイアウトでやる必要はない",
          "components配下がComponentDisplayPanelのソースで描画されないな…",
          "行タイトルはstickyにしたい",
          "styleプロップじゃなく、muiのようにsass的なものを流せるようにしないとn行目のcss設定みたいなことができないのかもだしそうできたらよりよさそう",
          "空行押下した時のコールバックの引数は、カラムや行のタイトルをいい感じのオブジェクトで返す",
        ]}
        render={[
          <TableWithMultipliedTitle
            x={[
              {
                key: "region",
                data: ["東京", "大阪", "福岡"],
              },
            ]}
            y={[
              {
                key: "sex",
                data: ["男", "女"],
              },
            ]}
            data={[
              {
                region: "東京",
                sex: "男",
                content: "100人",
              },
              {
                region: "福岡",
                sex: "女",
                content: "200人",
              },
              {
                region: "大阪",
                sex: "男",
                content: "300人",
              },
              {
                region: "東京",
                sex: "女",
                content: "400人",
              },
            ]}
            renderSettings={{
              styles: {
                container: {
                  backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`,
                  backgroundColor: "#fff",
                },
                allCell: {
                  backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`,
                  padding: "10px",
                },
              },
              components: {
                columnTitleCell: (key, title, baseStyle, rowIndex) => {
                  return (
                    <div key={key} style={baseStyle}>
                      {title}
                    </div>
                  );
                },
                rowTitleCell: (key, title, baseStyle, columnIndex) => {
                  return (
                    <div key={key} style={baseStyle}>
                      {title}
                    </div>
                  );
                },
                dataCell: (key, datum, baseStyle) => {
                  return (
                    <div
                      key={key}
                      style={baseStyle}
                      onClick={() => alert(JSON.stringify(datum))}
                    >
                      {datum.content}
                    </div>
                  );
                },
                emptyDataCell: (key, axisValues, baseStyle) => {
                  return (
                    <div
                      key={key}
                      style={baseStyle}
                      onClick={() => alert("clicked empty cell")}
                    ></div>
                  );
                },
              },
            }}
          />,
          <TableWithMultipliedTitle
            x={[
              {
                key: "date",
                data: ["2020/01/01", "2020/01/02"],
              },
              {
                key: "region",
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
                region: "Tokyo",
                time: "10:00",
                sex: "man",
                age: 15,
                content: "stress...",
              },
              {
                id: 2,
                date: "2020/01/02",
                region: "Fukuoka",
                time: "11:00",
                sex: "woman",
                age: 16,
                content: "chill...",
              },
              {
                id: 3,
                date: "2020/01/01",
                region: "Osaka",
                time: "12:00",
                sex: "woman",
                age: 15,
                content: "god dammit...",
              },
              {
                id: 4,
                date: "2020/01/02",
                region: "Tokyo",
                time: "13:00",
                sex: "man",
                age: 16,
                content: "relax...",
              },
            ]}
            renderSettings={{
              styles: {
                container: {
                  backgroundColor: "white",
                  backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`,
                },
                allCell: {
                  backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`,
                },
              },
              components: {
                columnTitleCell: (key, title, baseStyle, rowIndex) => {
                  const additionalStyle = {
                    ...(rowIndex === 0 && {
                      fontSize: "20px",
                      fontWeight: "bold",
                    }),
                    ...(rowIndex === 1 && {
                      fontSize: "16px",
                      fontWeight: "bold",
                    }),
                    ...(rowIndex === 2 && {
                      fontSize: "14px",
                    }),
                  };
                  return (
                    <div
                      key={key}
                      style={{
                        ...baseStyle,
                        ...additionalStyle,
                        ...{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0 10px",
                          minWidth: "50px",
                        },
                      }}
                    >
                      {title}
                    </div>
                  );
                },
                rowTitleCell: (key, title, baseStyle, columnIndex) => {
                  const additionalStyle = {
                    ...(columnIndex === 0 && {
                      fontSize: "20px",
                    }),
                    ...(columnIndex === 1 && {
                      fontSize: "16px",
                    }),
                  };
                  return (
                    <div
                      key={key}
                      style={{
                        ...baseStyle,
                        ...additionalStyle,
                        ...{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0 10px",
                          minWidth: "50px",
                          height: "100%",
                          minHeight: "50px",
                          wordBreak: "break-word",
                        },
                      }}
                    >
                      {title}
                    </div>
                  );
                },
                dataCell: (key, datum, baseStyle) => {
                  return (
                    <div
                      key={key}
                      style={{
                        ...baseStyle,
                        ...{
                          backgroundColor: "#7894ad",
                          height: "100%",
                          color: "white",
                          padding: "0 10px",
                          wordBreak: "break-word",
                        },
                      }}
                      onClick={() => alert(JSON.stringify(datum))}
                    >
                      {datum.content}
                    </div>
                  );
                },
                emptyDataCell: (key, axisValues, baseStyle) => {
                  return (
                    <div
                      key={key}
                      style={{
                        ...baseStyle,
                        ...{
                          height: "100%",
                          backgroundColor: "white",
                        },
                      }}
                      onClick={() => alert("clicked empty cell")}
                    ></div>
                  );
                },
              },
            }}
          />,
        ]}
      />

      <ComponentDisplayPanel
        title="ImgShiftedBackground"
        references={["https://pulpxstyle.com/post-112/"]}
        render={[
          <ImgShiftedColoredBackground
            style={{
              width: 300,
              height: 200,
              cursor: "pointer",
            }}
            onClick={() => {
              alert("clicked");
            }}
            src="https://picsum.photos/id/1065/500/300"
            offset={5}
            color="#4a96d9"
            transitionOnHover
            transitionAdditionalOffset={3}
            transitionSeconds={0.3}
          />,
          <ImgShiftedColoredBackground
            style={{
              width: 300,
              height: 200,
              cursor: "pointer",
            }}
            onClick={() => {
              alert("clicked");
            }}
            src="https://picsum.photos/id/1065/500/300"
            offset={7}
            color="#3ed388"
            transitionOnHover
            transitionAdditionalOffset={-6}
            transitionSeconds={0.5}
          />,
          <ImgShiftedColoredBackground
            style={{
              width: 300,
              height: 200,
              cursor: "pointer",
            }}
            onClick={() => {
              alert("clicked");
            }}
            src="https://picsum.photos/id/1065/500/300"
            offset={70}
            color="#e1c64d"
            transitionOnHover
            transitionAdditionalOffset={-6}
            transitionSeconds={0.5}
          />,
          <ImgShiftedColoredBackground
            style={{
              width: 300,
              height: 200,
              cursor: "pointer",
            }}
            onClick={() => {
              alert("clicked");
            }}
            src="https://picsum.photos/id/1065/500/300"
            offset={50}
            color="#d64593"
            transitionOnHover
            transitionAdditionalOffset={-120}
            transitionSeconds={0.5}
          />,
        ]}
      />
    </div>
  );
}

export default App;
