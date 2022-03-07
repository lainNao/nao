//TODO: どうなってるかわからない蟻地獄形式になってるのでどうなってるかわかるようにしたい
// import toSource from "tosource";
import jsxToString from "jsx-to-string";

export const convertReactNodeToRawString = (node: any): any => {
  return jsxToString(node);
};

// //TODO: propsが関数だった場合ソースコード上で無視されるようなので、関数だった場合も表示する…
// export const convertReactNodeToRawString = (node: any): any => {
//   const children = node?.props?.children;
//   const childrenType = typeof children;
//   const componentName = node.type?.name;
//   const props = node?.props;

//   // テキスト
//   if (!node?.$$typeof) {
//     return node;
//   }

//   // タグに囲まれたテキスト
//   if (childrenType === "string") {
//     return `<${componentName} ${convertPropsToRawString(
//       props
//     )}>${children}</${componentName}>`;
//   }

//   // HTMLタグ
//   const isHtmlTag = typeof node.type === "string";
//   if (isHtmlTag) {
//     const tagName = node.type;
//     if (typeof children === "object") {
//       // 複数のHTMLタグ？
//       if (Array.isArray(children)) {
//         const rawStringChildren: any = children.map(
//           (child: React.ReactElement) => convertReactNodeToRawString(child)
//         );
//         return `<${tagName} ${convertPropsToRawString(
//           props
//         )}>${rawStringChildren.join("")}</${tagName}>`;
//       }
//       // 単数のHTMLタグ
//       else {
//         return children === undefined
//           ? `<${tagName} ${convertPropsToRawString(props)}/>`
//           : `<${tagName} ${convertPropsToRawString(
//               props
//             )}>${convertReactNodeToRawString(children)}</${tagName}>`;
//       }
//     }
//     // ?
//     else {
//       return children === undefined
//         ? `<${tagName} ${convertPropsToRawString(props)}/>`
//         : `<${tagName} ${convertPropsToRawString(
//             props
//           )}>${children}</${tagName}>`;
//     }
//   }

//   // コンポーネント
//   if (
//     childrenType === "object" ||
//     Array.isArray(children) ||
//     isValidHtmlTagName(componentName)
//   ) {
//     const rawStringChildren = children.map((child: React.ReactElement) =>
//       convertReactNodeToRawString(child)
//     );
//     return `<${componentName} ${convertPropsToRawString(
//       props
//     )}>${rawStringChildren.join("")}</${componentName}>`;
//   }

//   // 複数children
//   if (Array.isArray(node)) {
//     const rawStringChildren: any = node.map((child: React.ReactElement) =>
//       convertReactNodeToRawString(child)
//     );
//     return `<>${rawStringChildren.join("")}</>`;
//   }

//   // コンポーネント
//   return children === undefined
//     ? `<${componentName} ${convertPropsToRawString(props)}/>`
//     : `<${componentName} ${convertPropsToRawString(props)}>${children
//         .map((child: React.ReactElement) => convertReactNodeToRawString(child))
//         .join("")}</${componentName}>`;
// };

// export const convertPropsToRawString = (props: any, omitChildren = true) => {
//   return Object.keys(props)
//     .map((key) => {
//       if (key === "children" && omitChildren) return "";
//       const value = props[key];

//       if (typeof value === "number") {
//         return `${key}={${JSON.stringify(props[key])}}`;
//       }
//       if (typeof value === "string") {
//         return `${key}=${JSON.stringify(props[key])}`;
//       }
//       if (typeof value === "object") {
//         //TODO:ここがReact要素をまともに返さないので自作する必要がありそう
//         return `${key}={${objectToString(props[key])}}`;
//       }

//       return `${key}={${toSource(props[key])}}`;
//     })
//     .join(" ");
// };

// const objectToString = (val: any): any => {
//   console.log(val);
//   // 配列
//   if (Array.isArray(val)) {
//     return "[" + val.map((v) => objectToString(v)) + "]";
//   }

//   // オブジェクト
//   if (val.constructor.name === "Object") {
//     return (
//       "{" +
//       Object.keys(val).map((key) => `${key}:${objectToString(val[key])}`) +
//       "}"
//     );
//   }

//   // 関数
//   if (val.constructor.name === "Function") {
//     return val.toString();
//   }

//   // 他
//   if (val === undefined) {
//     return "undefined";
//   }
//   if (val === null) {
//     return "null";
//   }
//   if (val === NaN) {
//     return "NaN";
//   }

//   return val;
// };

// const isValidHtmlTagName = (input: any): boolean => {
//   return (
//     document.createElement(input).toString() != "[object HTMLUnknownElement]"
//   );
// };

export const isFilledArray = (array: any): array is any[] => {
  return array && Array.isArray(array) && array.length > 0;
};
