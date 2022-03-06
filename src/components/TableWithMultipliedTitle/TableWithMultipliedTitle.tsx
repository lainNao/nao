import { getMultipliedIndex, graduallyMultiplyArrays } from "./util";

type Props<T> = {
  x: AxisInfo[];
  y: AxisInfo[];
  data: T[];
  renderSettings: {
    styles?: {
      container?: React.CSSProperties;
      baseCell?: React.CSSProperties;
      rowTitleCell?: React.CSSProperties;
      columnTitleCell?: React.CSSProperties;
      dataCell?: React.CSSProperties;
      emptyDataCell?: React.CSSProperties;
    };
    components: {
      columnTitleCell: (axisDatum: AxisDatum) => React.ReactNode;
      rowTitleCell: (axisDatum: AxisDatum) => React.ReactNode;
      dataCell: (datum: T) => React.ReactNode;
      emptyDataCell: (axisValues: any) => React.ReactNode;
    };
  };
};

type AxisInfo = {
  key: string;
  data: AxisDatum[];
};
type AxisDatum = Equatable;
type Equatable = number | string | boolean;

export const TableWithMultipliedTitle = <T,>({
  x,
  y,
  data,
  renderSettings,
}: Props<T>) => {
  // 元配列
  const columnsArray = graduallyMultiplyArrays(x.map((x) => x.data));
  const rowsArray = graduallyMultiplyArrays(y.map((y) => y.data));

  // 列や行のタイトル次元数
  const columnsArrayLength = columnsArray.length;
  const rowsArrayLength = rowsArray.length;

  // 列や行の数
  const maxColumnLength = columnsArray[columnsArrayLength - 1].length;
  const maxRowLength = rowsArray[rowsArrayLength - 1].length;

  // 列や行の数（タイトル部分も含めた値）
  const columnLengthWithRow = maxColumnLength + rowsArrayLength;
  const rowLengthWithColumn = maxRowLength + columnsArrayLength;

  // コンテナスタイル
  const containerStyle = {
    ...{
      display: "grid",
      gridTemplateColumns: `repeat(${columnLengthWithRow}, auto)`,
      gridTemplateRows: `repeat(${rowLengthWithColumn}, auto)`,
      overflow: "auto",
    },
    ...renderSettings.styles?.container,
  };

  // データありのセルの番地リスト（若干命令的なコードに使うので留意…）
  const cellLocationsWithData: { x: number; y: number }[] = [];

  return (
    <div style={containerStyle}>
      {/* 横軸タイトル */}
      {columnsArray.map((columns, columnsIndex) => {
        const step = maxColumnLength / columns.length;
        return columns.map((column, columnIndex) => {
          const gridColumnStart = rowsArrayLength + 1 + columnIndex * step;
          const gridColumnEnd = gridColumnStart + step;
          const gridRowStart = columnsIndex + 1;
          const gridRowEnd = gridRowStart + 1;
          const style = {
            ...renderSettings.styles?.baseCell,
            ...renderSettings.styles?.columnTitleCell,
          };
          return (
            <GridCell
              key={columnsIndex + "/" + columnIndex}
              style={style}
              gridInfo={{
                gridColumnStart,
                gridColumnEnd,
                gridRowStart,
                gridRowEnd,
              }}
            >
              {renderSettings.components.columnTitleCell(column)}
            </GridCell>
          );
        });
      })}

      {/* 縦軸タイトル */}
      {rowsArray.map((rows, rowsIndex) => {
        const step = maxRowLength / rows.length;
        return rows.map((row, rowIndex) => {
          const gridColumnStart = rowsIndex + 1;
          const gridColumnEnd = gridColumnStart + 1;
          const gridRowStart = columnsArrayLength + 1 + rowIndex * step;
          const gridRowEnd = gridRowStart + step;
          const style = {
            ...renderSettings.styles?.baseCell,
            ...renderSettings.styles?.rowTitleCell,
          };
          return (
            <GridCell
              key={rowsIndex + "/" + rowIndex}
              style={style}
              gridInfo={{
                gridColumnStart,
                gridColumnEnd,
                gridRowStart,
                gridRowEnd,
              }}
            >
              {renderSettings.components.rowTitleCell(row)}
            </GridCell>
          );
        });
      })}

      {/* データセル */}
      {data.map((datum, index) => {
        const [columnStart, rowStart] = [
          getMultipliedIndex(
            x.map((x) => x.data),
            x.map((x) => (datum as any)[x.key])
          ),
          getMultipliedIndex(
            y.map((y) => y.data),
            y.map((y) => (datum as any)[y.key])
          ),
        ];

        cellLocationsWithData.push({
          x: columnStart,
          y: rowStart,
        });

        const gridColumnStart = rowsArrayLength + columnStart + 1;
        const gridColumnEnd = rowsArrayLength + columnStart + 2;
        const gridRowStart = columnsArrayLength + rowStart + 1;
        const gridRowEnd = columnsArrayLength + rowStart + 2;
        const style = {
          ...renderSettings.styles?.baseCell,
          ...renderSettings.styles?.dataCell,
        };

        return (
          <GridCell
            key={index + JSON.stringify(datum)}
            style={style}
            gridInfo={{
              gridColumnStart,
              gridColumnEnd,
              gridRowStart,
              gridRowEnd,
            }}
          >
            {renderSettings.components.dataCell(datum)}
          </GridCell>
        );
      })}

      {/* データセル（背景として空セルを全部描画） */}
      {[...Array(maxColumnLength)].map((_, columnIndex) => {
        const gridColumnStart = rowsArrayLength + columnIndex + 1;
        const gridColumnEnd = rowsArrayLength + columnIndex + 2;
        return [...Array(maxRowLength)].map((__, rowIndex) => {
          const gridRowStart = columnsArrayLength + rowIndex + 1;
          const gridRowEnd = columnsArrayLength + rowIndex + 2;

          // 既に描画されてるセルなら何もしない
          // TODO:この処理を全セルで回さずとも…ループ元となるArray達を調整したほうが普通に良いのでは
          if (
            cellLocationsWithData.some(
              (location) =>
                location.x === columnIndex && location.y === rowIndex
            )
          ) {
            return null;
          }

          const style = {
            ...renderSettings.styles?.baseCell,
            ...renderSettings.styles?.emptyDataCell,
          };

          return (
            <GridCell
              key={columnIndex + "/" + rowIndex}
              style={style}
              gridInfo={{
                gridColumnStart,
                gridColumnEnd,
                gridRowStart,
                gridRowEnd,
              }}
            >
              {renderSettings.components.emptyDataCell(
                "TODO:カラムや行のタイトルをいい感じのオブジェクトで返す"
              )}
            </GridCell>
          );
        });
      })}
    </div>
  );
};

type GridCellProps = {
  style?: object;
  gridInfo: {
    gridColumnStart: number;
    gridColumnEnd: number;
    gridRowStart: number;
    gridRowEnd: number;
  };
};

const GridCell: React.FC<GridCellProps> = ({ gridInfo, style, children }) => {
  return <div style={{ ...gridInfo, ...style }}>{children}</div>;
};
