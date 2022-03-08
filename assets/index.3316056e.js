var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { t as toSource, j as jsxRuntime, R as React, r as react, p as prettier, a as parserTypeScript, S as SyntaxHighlighter, b as a11yDark, v as v4, c as ReactDOM } from "./vendor.0536fdb8.js";
const p = /* @__PURE__ */ __name(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  __name(getFetchOpts, "getFetchOpts");
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
  __name(processPreload, "processPreload");
}, "polyfill");
p();
var __defProp$8 = Object.defineProperty;
var __name$8 = /* @__PURE__ */ __name((target, value) => __defProp$8(target, "name", { value, configurable: true }), "__name$8");
const convertReactNodeToRawString = /* @__PURE__ */ __name$8((node) => {
  var _a, _b;
  const children = (_a = node == null ? void 0 : node.props) == null ? void 0 : _a.children;
  const childrenType = typeof children;
  const componentName = (_b = node.type) == null ? void 0 : _b.name;
  const props = node == null ? void 0 : node.props;
  if (!(node == null ? void 0 : node.$$typeof)) {
    return node;
  }
  if (childrenType === "string") {
    return `<${componentName} ${convertPropsToRawString(props)}>${children}</${componentName}>`;
  }
  const isHtmlTag = typeof node.type === "string";
  if (isHtmlTag) {
    const tagName = node.type;
    if (typeof children === "object") {
      if (Array.isArray(children)) {
        const rawStringChildren = children.map((child) => convertReactNodeToRawString(child));
        return `<${tagName} ${convertPropsToRawString(props)}>${rawStringChildren.join("")}</${tagName}>`;
      } else {
        return children === void 0 ? `<${tagName} ${convertPropsToRawString(props)}/>` : `<${tagName} ${convertPropsToRawString(props)}>${convertReactNodeToRawString(children)}</${tagName}>`;
      }
    } else {
      return children === void 0 ? `<${tagName} ${convertPropsToRawString(props)}/>` : `<${tagName} ${convertPropsToRawString(props)}>${children}</${tagName}>`;
    }
  }
  if (childrenType === "object" || Array.isArray(children) || isValidHtmlTagName(componentName)) {
    console.log(childrenType, children, componentName);
    const rawStringChildren = children.map((child) => convertReactNodeToRawString(child));
    return `<${componentName} ${convertPropsToRawString(props)}>${rawStringChildren.join("")}</${componentName}>`;
  }
  if (Array.isArray(node)) {
    const rawStringChildren = node.map((child) => convertReactNodeToRawString(child));
    return `<>${rawStringChildren.join("")}</>`;
  }
  return children === void 0 ? `<${componentName} ${convertPropsToRawString(props)}/>` : `<${componentName} ${convertPropsToRawString(props)}>${children.map((child) => convertReactNodeToRawString(child)).join("")}</${componentName}>`;
}, "convertReactNodeToRawString");
const convertPropsToRawString = /* @__PURE__ */ __name$8((props, omitChildren = true) => {
  return Object.keys(props).map((key) => {
    if (key === "children" && omitChildren)
      return "";
    const value = props[key];
    if (typeof value === "number") {
      return `${key}={${JSON.stringify(props[key])}}`;
    }
    if (typeof value === "string") {
      return `${key}=${JSON.stringify(props[key])}`;
    }
    if (typeof value === "object") {
      return `${key}={${objectToString(props[key])}}`;
    }
    return `${key}={${toSource(props[key])}}`;
  }).join(" ");
}, "convertPropsToRawString");
const objectToString = /* @__PURE__ */ __name$8((val) => {
  if (Array.isArray(val)) {
    return "[" + val.map((v) => objectToString(v)) + "]";
  }
  if (val.constructor.name === "Object") {
    return "{" + Object.keys(val).map((key) => `${key}:${objectToString(val[key])}`) + "}";
  }
  if (val.constructor.name === "Function") {
    return val.toString();
  }
  if (typeof val === "string") {
    return `"${val}"`;
  }
  if (val === void 0) {
    return "undefined";
  }
  if (val === null) {
    return "null";
  }
  if (typeof val === "number" && isNaN(val)) {
    return "NaN";
  }
  return val;
}, "objectToString");
const isValidHtmlTagName = /* @__PURE__ */ __name$8((input) => {
  return document.createElement(input).toString() != "[object HTMLUnknownElement]";
}, "isValidHtmlTagName");
const isFilledArray = /* @__PURE__ */ __name$8((array) => {
  return array && Array.isArray(array) && array.length > 0;
}, "isFilledArray");
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
var __defProp$7 = Object.defineProperty;
var __name$7 = /* @__PURE__ */ __name((target, value) => __defProp$7(target, "name", { value, configurable: true }), "__name$7");
const ComponentDisplayPanel = /* @__PURE__ */ __name$7((props) => {
  return /* @__PURE__ */ jsxs("div", {
    children: [props.title && /* @__PURE__ */ jsx("h2", {
      children: props.title
    }), isFilledArray(props.references) && /* @__PURE__ */ jsx("div", {
      style: {
        display: "flex",
        overflow: "auto"
      },
      children: /* @__PURE__ */ jsx(DetailsList, {
        summary: "references",
        isLink: true,
        list: props.references
      })
    }), isFilledArray(props.todo) && /* @__PURE__ */ jsx("div", {
      style: {
        display: "flex",
        overflow: "auto"
      },
      children: /* @__PURE__ */ jsx(DetailsList, {
        ordered: true,
        summary: "todo",
        list: props.todo
      })
    }), props.render.map((component, index) => {
      return /* @__PURE__ */ jsxs(react.exports.Fragment, {
        children: [/* @__PURE__ */ jsx("div", {
          style: {
            display: "flex",
            justifyContent: "center"
          },
          children: component
        }), /* @__PURE__ */ jsx("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            overflow: "auto"
          },
          children: /* @__PURE__ */ jsx(ErrorBoundary, {
            children: /* @__PURE__ */ jsx(SourceCodePanel, {
              code: convertReactNodeToRawString(component)
            })
          })
        })]
      }, index);
    })]
  });
}, "ComponentDisplayPanel");
const SourceCodePanel = /* @__PURE__ */ __name$7((props) => {
  if (typeof props.code !== "string") {
    console.log(props.code);
    return /* @__PURE__ */ jsx(Fragment, {
      children: "\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u306E\u30D1\u30FC\u30B9\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u76F4\u63A5\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u3092\u898B\u3066\u304F\u3060\u3055\u3044"
    });
  }
  const prettyCode = prettier.format(props.code, {
    parser: "typescript",
    plugins: [parserTypeScript]
  }).slice(0, -2);
  console.log(prettyCode);
  return /* @__PURE__ */ jsxs("details", {
    style: {
      overflow: "auto"
    },
    children: [/* @__PURE__ */ jsx("summary", {
      children: "source"
    }), /* @__PURE__ */ jsx(SyntaxHighlighter, {
      language: "jsx",
      style: a11yDark,
      children: prettyCode
    })]
  });
}, "SourceCodePanel");
const DetailsList = /* @__PURE__ */ __name$7((props) => {
  const ListWrapper = props.ordered ? "ol" : "ul";
  return /* @__PURE__ */ jsxs("details", {
    style: {
      overflow: "auto"
    },
    children: [/* @__PURE__ */ jsx("summary", {
      children: props.summary
    }), /* @__PURE__ */ jsx(ListWrapper, {
      children: props.list.map((list) => /* @__PURE__ */ jsx("li", {
        style: {
          textAlign: "initial"
        },
        children: props.isLink ? /* @__PURE__ */ jsx("a", {
          href: list,
          target: "_blank",
          rel: "noopener noreferrer",
          children: list
        }) : list
      }, list))
    })]
  });
}, "DetailsList");
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(Fragment, {
        children: "\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u306E\u30D1\u30FC\u30B9\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u76F4\u63A5\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u3092\u898B\u3066\u304F\u3060\u3055\u3044"
      });
    }
    return this.props.children;
  }
}
__name(ErrorBoundary, "ErrorBoundary");
__name$7(ErrorBoundary, "ErrorBoundary");
var __defProp$6 = Object.defineProperty;
var __name$6 = /* @__PURE__ */ __name((target, value) => __defProp$6(target, "name", { value, configurable: true }), "__name$6");
const TextDifference = /* @__PURE__ */ __name$6((props) => {
  return /* @__PURE__ */ jsx("span", {
    style: __spreadValues({
      mixBlendMode: "difference",
      color: props.baseHex.startsWith("#") ? props.baseHex : "#" + props.baseHex
    }, props.style),
    children: props.children
  });
}, "TextDifference");
var __defProp$5 = Object.defineProperty;
var __name$5 = /* @__PURE__ */ __name((target, value) => __defProp$5(target, "name", { value, configurable: true }), "__name$5");
const hslArrayToCssValue = /* @__PURE__ */ __name$5((hsl) => {
  var _a;
  return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${(_a = hsl[3]) != null ? _a : 1})`;
}, "hslArrayToCssValue");
const hexToRgb = /* @__PURE__ */ __name$5((color) => {
  let hex = color[0] === "#" ? color.slice(1) : color;
  let c;
  if (hex.length !== 6) {
    hex = (() => {
      const result = [];
      for (c of Array.from(hex)) {
        result.push(`${c}${c}`);
      }
      return result;
    })().join("");
  }
  const colorStr = hex.match(/#?(.{2})(.{2})(.{2})/).slice(1);
  const rgb = colorStr.map((col) => parseInt(col, 16));
  rgb.push(1);
  return rgb;
}, "hexToRgb");
const rgbToHsl = /* @__PURE__ */ __name$5((rgb) => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const add = max + min;
  const hue = min === max ? 0 : r === max ? (60 * (g - b) / diff + 360) % 360 : g === max ? 60 * (b - r) / diff + 120 : 60 * (r - g) / diff + 240;
  const lum = 0.5 * add;
  const sat = lum === 0 ? 0 : lum === 1 ? 1 : lum <= 0.5 ? diff / add : diff / (2 - add);
  const h = Math.round(hue);
  const s = Math.round(sat * 100);
  const l = Math.round(lum * 100);
  const a = rgb[3] || 1;
  return [h, s, l, a];
}, "rgbToHsl");
const hexToHsl = /* @__PURE__ */ __name$5((color) => {
  const rgb = hexToRgb(color);
  return rgbToHsl(rgb);
}, "hexToHsl");
var __defProp$4 = Object.defineProperty;
var __name$4 = /* @__PURE__ */ __name((target, value) => __defProp$4(target, "name", { value, configurable: true }), "__name$4");
const TextGradient = /* @__PURE__ */ __name$4(({
  children,
  style,
  baseHex,
  additionalLight = 0,
  additionalShadow = 0
}) => {
  const baseHsl = hexToHsl(baseHex);
  const base = hslArrayToCssValue(baseHsl);
  const left = hslArrayToCssValue([baseHsl[0], baseHsl[1], baseHsl[2] + 30 + additionalLight]);
  const right = hslArrayToCssValue([baseHsl[0], baseHsl[1], baseHsl[2] - 20 - additionalShadow]);
  return /* @__PURE__ */ jsx("span", {
    style: __spreadValues({
      color: "rgba(0,0,0,0)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      backgroundImage: `linear-gradient(135deg,${left}, ${base}, ${right})`
    }, style),
    children
  });
}, "TextGradient");
var __defProp$3 = Object.defineProperty;
var __name$3 = /* @__PURE__ */ __name((target, value) => __defProp$3(target, "name", { value, configurable: true }), "__name$3");
const ImgShiftedColoredBackground = /* @__PURE__ */ __name$3((_a) => {
  var _b = _a, {
    color = "#c3a400",
    offset = 20,
    transitionOnHover = false,
    transitionAdditionalOffset = 0,
    transitionSeconds = 0.5,
    onClick
  } = _b, rest = __objRest(_b, [
    "color",
    "offset",
    "transitionOnHover",
    "transitionAdditionalOffset",
    "transitionSeconds",
    "onClick"
  ]);
  const [id] = react.exports.useState(() => "ImgWithShiftedBackground-" + v4());
  const targetOffset = offset + transitionAdditionalOffset;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("style", {
      children: `
        #${id}{
          transition: all ${transitionSeconds}s;
          padding: ${offset + Math.abs(transitionAdditionalOffset * 0.6)}px;
          filter: drop-shadow(${offset}px ${offset}px 0 ${color});
          transform: translate(-${offset}px, -${offset}px);
        }
      ${transitionOnHover && `
        #${id}:hover {
          filter: drop-shadow(${targetOffset + 2}px ${targetOffset + 2}px 0 ${color});
          transform: translate(-${targetOffset}px, -${targetOffset}px);
        }
        `}
    `
    }), /* @__PURE__ */ jsx("img", __spreadValues({
      onClick: () => {
        onClick == null ? void 0 : onClick();
      },
      id
    }, rest))]
  });
}, "ImgShiftedColoredBackground");
var __defProp$2 = Object.defineProperty;
var __name$2 = /* @__PURE__ */ __name((target, value) => __defProp$2(target, "name", { value, configurable: true }), "__name$2");
const graduallyMultiplyArrays = /* @__PURE__ */ __name$2((arrays) => {
  return arrays.reduce((prevVal, val, i) => {
    prevVal.push(new Array(prevVal[i - 1] ? prevVal[i - 1].length : 1).fill(val).flat());
    return prevVal;
  }, []);
}, "graduallyMultiplyArrays");
const getMultipliedIndex = /* @__PURE__ */ __name$2((arrays, targetValues) => {
  const multipliedFullLength = arrays.reduce((prev, now) => {
    return prev === 0 ? now.length : prev * now.length;
  }, 0);
  const targetIndex = arrays.reduce((prev, now, i) => {
    var _a;
    const currentArrLength = (_a = now.length) != null ? _a : 1;
    const currentArrIndex = now.indexOf(targetValues[i]);
    const remainedAmount = prev.remainedAmount / currentArrLength;
    const targetIndex2 = prev.targetIndex + remainedAmount * currentArrIndex;
    return {
      targetIndex: targetIndex2,
      remainedAmount
    };
  }, {
    targetIndex: 0,
    remainedAmount: multipliedFullLength
  }).targetIndex;
  return targetIndex;
}, "getMultipliedIndex");
var __defProp$1 = Object.defineProperty;
var __name$1 = /* @__PURE__ */ __name((target, value) => __defProp$1(target, "name", { value, configurable: true }), "__name$1");
const TableWithMultipliedTitle = /* @__PURE__ */ __name$1(({
  x,
  y,
  data,
  renderSettings
}) => {
  var _a;
  const columnsArray = graduallyMultiplyArrays(x.map((x2) => x2.data));
  const rowsArray = graduallyMultiplyArrays(y.map((y2) => y2.data));
  const columnsArrayLength = columnsArray.length;
  const rowsArrayLength = rowsArray.length;
  const maxColumnLength = columnsArray[columnsArrayLength - 1].length;
  const maxRowLength = rowsArray[rowsArrayLength - 1].length;
  const columnLengthWithRow = maxColumnLength + rowsArrayLength;
  const rowLengthWithColumn = maxRowLength + columnsArrayLength;
  const containerStyle = __spreadValues(__spreadValues({}, {
    display: "grid",
    gridTemplateColumns: `repeat(${columnLengthWithRow}, auto)`,
    gridTemplateRows: `repeat(${rowLengthWithColumn}, auto)`,
    overflow: "auto"
  }), (_a = renderSettings.styles) == null ? void 0 : _a.container);
  const cellLocationsWithData = [];
  return /* @__PURE__ */ jsxs("div", {
    style: containerStyle,
    children: [columnsArray.map((columns, columnsIndex) => {
      const step = maxColumnLength / columns.length;
      return columns.map((column, columnIndex) => {
        var _a2;
        const gridColumnStart = rowsArrayLength + 1 + columnIndex * step;
        const gridColumnEnd = gridColumnStart + step;
        const gridRowStart = columnsIndex + 1;
        const gridRowEnd = gridRowStart + 1;
        const baseStyle = __spreadProps(__spreadValues({}, (_a2 = renderSettings.styles) == null ? void 0 : _a2.allCell), {
          gridColumnStart,
          gridColumnEnd,
          gridRowStart,
          gridRowEnd
        });
        return renderSettings.components.columnTitleCell(`${columnsIndex}-${columnIndex}`, column, baseStyle, columnsIndex);
      });
    }), rowsArray.map((rows, rowsIndex) => {
      const step = maxRowLength / rows.length;
      return rows.map((row, rowIndex) => {
        var _a2;
        const gridColumnStart = rowsIndex + 1;
        const gridColumnEnd = gridColumnStart + 1;
        const gridRowStart = columnsArrayLength + 1 + rowIndex * step;
        const gridRowEnd = gridRowStart + step;
        const baseStyle = __spreadProps(__spreadValues({}, (_a2 = renderSettings.styles) == null ? void 0 : _a2.allCell), {
          gridColumnStart,
          gridColumnEnd,
          gridRowStart,
          gridRowEnd
        });
        return renderSettings.components.rowTitleCell(`${rowsIndex}-${rowIndex}`, row, baseStyle, rowsIndex);
      });
    }), data.map((datum, index) => {
      var _a2;
      const [columnStart, rowStart] = [getMultipliedIndex(x.map((x2) => x2.data), x.map((x2) => datum[x2.key])), getMultipliedIndex(y.map((y2) => y2.data), y.map((y2) => datum[y2.key]))];
      cellLocationsWithData.push({
        x: columnStart,
        y: rowStart
      });
      const gridColumnStart = rowsArrayLength + columnStart + 1;
      const gridColumnEnd = rowsArrayLength + columnStart + 2;
      const gridRowStart = columnsArrayLength + rowStart + 1;
      const gridRowEnd = columnsArrayLength + rowStart + 2;
      const baseStyle = __spreadProps(__spreadValues({}, (_a2 = renderSettings.styles) == null ? void 0 : _a2.allCell), {
        gridColumnStart,
        gridColumnEnd,
        gridRowStart,
        gridRowEnd
      });
      return renderSettings.components.dataCell(`${index}`, datum, baseStyle);
    }), [...Array(maxColumnLength)].map((_, columnIndex) => {
      const gridColumnStart = rowsArrayLength + columnIndex + 1;
      const gridColumnEnd = rowsArrayLength + columnIndex + 2;
      return [...Array(maxRowLength)].map((__, rowIndex) => {
        var _a2;
        const gridRowStart = columnsArrayLength + rowIndex + 1;
        const gridRowEnd = columnsArrayLength + rowIndex + 2;
        if (cellLocationsWithData.some((location) => location.x === columnIndex && location.y === rowIndex)) {
          return null;
        }
        const style = __spreadProps(__spreadValues({}, (_a2 = renderSettings.styles) == null ? void 0 : _a2.allCell), {
          gridColumnStart,
          gridColumnEnd,
          gridRowStart,
          gridRowEnd
        });
        return renderSettings.components.emptyDataCell(`${columnIndex}-${rowIndex}`, "TODO", style);
      });
    })]
  });
}, "TableWithMultipliedTitle");
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
function App() {
  return /* @__PURE__ */ jsxs("div", {
    style: {
      backgroundColor: "ghostwhite",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      paddingBottom: "30px"
    },
    children: [/* @__PURE__ */ jsx(ComponentDisplayPanel, {
      title: "TextGradient",
      todo: ["span\u4EE5\u5916\u3084\u30BF\u30B0\u7121\u3057\u306B\u3082\u5BFE\u5FDC", "\u30E1\u30E2\u5316", "children\u306B\u4F55\u3092\u5165\u308C\u3066\u3082\u305D\u306E\u7BC4\u56F2\u306E\u30C6\u30AD\u30B9\u30C8\u3092\u30B0\u30E9\u30C7\u30FC\u30B7\u30E7\u30F3\u3055\u305B\u308B\u3002Apple\u306E\u3084\u308A\u65B9\u304C\u3042\u308B\u306F\u305A"],
      references: ["https://twitter.com/pulpxstyle/status/1410055748147548161"],
      render: [/* @__PURE__ */ jsx(TextGradient, {
        baseHex: "#3269cf",
        children: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
      }), /* @__PURE__ */ jsx(TextGradient, {
        baseHex: "#04cea9",
        additionalLight: -60,
        additionalShadow: 20,
        children: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
      })]
    }), /* @__PURE__ */ jsx(ComponentDisplayPanel, {
      title: "TextDifference",
      references: ["https://twitter.com/pulpxstyle/status/1410055748147548161"],
      render: [/* @__PURE__ */ jsx("div", {
        style: {
          backgroundImage: "url(https://picsum.photos/id/1065/500/300)",
          width: 300,
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontSize: "xxx-large"
        },
        children: /* @__PURE__ */ jsx(TextDifference, {
          baseHex: "#89a7dd",
          children: "Sound of silence"
        })
      })]
    }), /* @__PURE__ */ jsx(ComponentDisplayPanel, {
      title: "TableWithMultipliedTitle",
      todo: ["\u306A\u305Ctable\u30BF\u30B0\u3067\u4F5C\u3089\u306A\u3044\u306E\u304B\uFF1F\u7121\u99C4\u306Bgrid\u30EC\u30A4\u30A2\u30A6\u30C8\u3067\u3084\u308B\u5FC5\u8981\u306F\u306A\u3044", "components\u914D\u4E0B\u304CComponentDisplayPanel\u306E\u30BD\u30FC\u30B9\u3067\u63CF\u753B\u3055\u308C\u306A\u3044\u306A\u2026", "\u884C\u30BF\u30A4\u30C8\u30EB\u306Fsticky\u306B\u3057\u305F\u3044", "style\u30D7\u30ED\u30C3\u30D7\u3058\u3083\u306A\u304F\u3001mui\u306E\u3088\u3046\u306Bsass\u7684\u306A\u3082\u306E\u3092\u6D41\u305B\u308B\u3088\u3046\u306B\u3057\u306A\u3044\u3068n\u884C\u76EE\u306Ecss\u8A2D\u5B9A\u307F\u305F\u3044\u306A\u3053\u3068\u304C\u3067\u304D\u306A\u3044\u306E\u304B\u3082\u3060\u3057\u305D\u3046\u3067\u304D\u305F\u3089\u3088\u308A\u3088\u3055\u305D\u3046", "\u7A7A\u884C\u62BC\u4E0B\u3057\u305F\u6642\u306E\u30B3\u30FC\u30EB\u30D0\u30C3\u30AF\u306E\u5F15\u6570\u306F\u3001\u30AB\u30E9\u30E0\u3084\u884C\u306E\u30BF\u30A4\u30C8\u30EB\u3092\u3044\u3044\u611F\u3058\u306E\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3067\u8FD4\u3059"],
      render: [/* @__PURE__ */ jsx(TableWithMultipliedTitle, {
        x: [{
          key: "region",
          data: ["\u6771\u4EAC", "\u5927\u962A", "\u798F\u5CA1"]
        }],
        y: [{
          key: "sex",
          data: ["\u7537", "\u5973"]
        }],
        data: [{
          region: "\u6771\u4EAC",
          sex: "\u7537",
          content: "100\u4EBA"
        }, {
          region: "\u798F\u5CA1",
          sex: "\u5973",
          content: "200\u4EBA"
        }, {
          region: "\u5927\u962A",
          sex: "\u7537",
          content: "300\u4EBA"
        }, {
          region: "\u6771\u4EAC",
          sex: "\u5973",
          content: "400\u4EBA"
        }],
        renderSettings: {
          styles: {
            container: {
              backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`,
              backgroundColor: "#fff"
            },
            allCell: {
              backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`,
              padding: "10px"
            }
          },
          components: {
            columnTitleCell: (key, title, baseStyle, rowIndex) => {
              return /* @__PURE__ */ jsx("div", {
                style: baseStyle,
                children: title
              }, key);
            },
            rowTitleCell: (key, title, baseStyle, columnIndex) => {
              return /* @__PURE__ */ jsx("div", {
                style: baseStyle,
                children: title
              }, key);
            },
            dataCell: (key, datum, baseStyle) => {
              return /* @__PURE__ */ jsx("div", {
                style: baseStyle,
                onClick: () => alert(JSON.stringify(datum)),
                children: datum.content
              }, key);
            },
            emptyDataCell: (key, axisValues, baseStyle) => {
              return /* @__PURE__ */ jsx("div", {
                style: baseStyle,
                onClick: () => alert("clicked empty cell")
              }, key);
            }
          }
        }
      }), /* @__PURE__ */ jsx(TableWithMultipliedTitle, {
        x: [{
          key: "date",
          data: ["2020/01/01", "2020/01/02"]
        }, {
          key: "region",
          data: ["Tokyo", "Osaka", "Fukuoka"]
        }, {
          key: "time",
          data: ["10:00", "11:00", "12:00", "13:00"]
        }],
        y: [{
          key: "sex",
          data: ["man", "woman"]
        }, {
          key: "age",
          data: [15, 16]
        }],
        data: [{
          id: 1,
          date: "2020/01/01",
          region: "Tokyo",
          time: "10:00",
          sex: "man",
          age: 15,
          content: "stress..."
        }, {
          id: 2,
          date: "2020/01/02",
          region: "Fukuoka",
          time: "11:00",
          sex: "woman",
          age: 16,
          content: "chill..."
        }, {
          id: 3,
          date: "2020/01/01",
          region: "Osaka",
          time: "12:00",
          sex: "woman",
          age: 15,
          content: "god dammit..."
        }, {
          id: 4,
          date: "2020/01/02",
          region: "Tokyo",
          time: "13:00",
          sex: "man",
          age: 16,
          content: "relax..."
        }],
        renderSettings: {
          styles: {
            container: {
              backgroundColor: "white",
              backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`
            },
            allCell: {
              backgroundImage: `repeating-linear-gradient(#ededed 0 1px, transparent 1px 100%),repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)`
            }
          },
          components: {
            columnTitleCell: (key, title, baseStyle, rowIndex) => {
              const additionalStyle = __spreadValues(__spreadValues(__spreadValues({}, rowIndex === 0 && {
                fontSize: "20px",
                fontWeight: "bold"
              }), rowIndex === 1 && {
                fontSize: "16px",
                fontWeight: "bold"
              }), rowIndex === 2 && {
                fontSize: "14px"
              });
              return /* @__PURE__ */ jsx("div", {
                style: __spreadValues(__spreadValues(__spreadValues({}, baseStyle), additionalStyle), {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 10px",
                  minWidth: "50px"
                }),
                children: title
              }, key);
            },
            rowTitleCell: (key, title, baseStyle, columnIndex) => {
              const additionalStyle = __spreadValues(__spreadValues({}, columnIndex === 0 && {
                fontSize: "20px"
              }), columnIndex === 1 && {
                fontSize: "16px"
              });
              return /* @__PURE__ */ jsx("div", {
                style: __spreadValues(__spreadValues(__spreadValues({}, baseStyle), additionalStyle), {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 10px",
                  minWidth: "50px",
                  height: "100%",
                  minHeight: "50px",
                  wordBreak: "break-word"
                }),
                children: title
              }, key);
            },
            dataCell: (key, datum, baseStyle) => {
              return /* @__PURE__ */ jsx("div", {
                style: __spreadValues(__spreadValues({}, baseStyle), {
                  backgroundColor: "#7894ad",
                  height: "100%",
                  color: "white",
                  padding: "0 10px",
                  wordBreak: "break-word"
                }),
                onClick: () => alert(JSON.stringify(datum)),
                children: datum.content
              }, key);
            },
            emptyDataCell: (key, axisValues, baseStyle) => {
              return /* @__PURE__ */ jsx("div", {
                style: __spreadValues(__spreadValues({}, baseStyle), {
                  height: "100%",
                  backgroundColor: "white"
                }),
                onClick: () => alert("clicked empty cell")
              }, key);
            }
          }
        }
      })]
    }), /* @__PURE__ */ jsx(ComponentDisplayPanel, {
      title: "ImgShiftedColoredBackground",
      references: ["https://pulpxstyle.com/post-112/"],
      todo: ["\u753B\u50CF\u304C\u753B\u9762\u5916\u306B\u306F\u307F\u51FA\u3059\u6642\u3001\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u958B\u59CB\u6642\u306E\u80CC\u666F\u4F4D\u7F6E\u304C\u30D0\u30B0\u308B\u3053\u3068\u304C\u308F\u304B\u3063\u305F\u3002\u3053\u308C\u306F\u99C4\u76EE\u3060\u30022\u3064\u306Ediv\u3092\u91CD\u306D\u308B\u307B\u3046\u304C\u30DE\u30B7"],
      render: [/* @__PURE__ */ jsx(ImgShiftedColoredBackground, {
        style: {
          width: 300,
          height: 200,
          cursor: "pointer"
        },
        onClick: () => {
          alert("clicked");
        },
        src: "https://picsum.photos/id/1065/500/300",
        offset: 5,
        color: "#4a96d9",
        transitionOnHover: true,
        transitionAdditionalOffset: 3,
        transitionSeconds: 0.3
      }), /* @__PURE__ */ jsx(ImgShiftedColoredBackground, {
        style: {
          width: 300,
          height: 200,
          cursor: "pointer"
        },
        onClick: () => {
          alert("clicked");
        },
        src: "https://picsum.photos/id/1065/500/300",
        offset: 7,
        color: "#3ed388",
        transitionOnHover: true,
        transitionAdditionalOffset: -6,
        transitionSeconds: 0.5
      }), /* @__PURE__ */ jsx(ImgShiftedColoredBackground, {
        style: {
          width: 300,
          height: 200,
          cursor: "pointer"
        },
        onClick: () => {
          alert("clicked");
        },
        src: "https://picsum.photos/id/1065/500/300",
        offset: 70,
        color: "#e1c64d",
        transitionOnHover: true,
        transitionAdditionalOffset: -6,
        transitionSeconds: 0.5
      }), /* @__PURE__ */ jsx(ImgShiftedColoredBackground, {
        style: {
          width: 300,
          height: 200,
          cursor: "pointer"
        },
        onClick: () => {
          alert("clicked");
        },
        src: "https://picsum.photos/id/1065/500/300",
        offset: 50,
        color: "#d64593",
        transitionOnHover: true,
        transitionAdditionalOffset: -120,
        transitionSeconds: 0.5
      })]
    })]
  });
}
__name(App, "App");
__name2(App, "App");
ReactDOM.render(/* @__PURE__ */ jsx(React.StrictMode, {
  children: /* @__PURE__ */ jsx(App, {})
}), document.getElementById("root"));
