//TODO: どうなってるかわからない蟻地獄形式になってるのでどうなってるかわかるようにしたい
export const convertReactNodeToRawString = (node: any): any => {
  const children = node?.props?.children;
  const childrenType = typeof children;
  const componentName = node.type?.name;
  const props = node?.props;

  console.log(node);

  // HTMLタグ
  const isHtmlTag = typeof node.type === "string";
  if (isHtmlTag) {
    const tagName = node.type;
    if (typeof children === "object") {
      // 複数のHTMLタグ？
      if (Array.isArray(children)) {
        const rawStringChildren: any = children.map(
          (child: React.ReactElement) => convertReactNodeToRawString(child)
        );
        return `<${tagName} ${convertPropsToRawString(
          props
        )}>${rawStringChildren.join("")}</${tagName}>`;
      }
      // 単数のHTMLタグ
      else {
        return children === undefined
          ? `<${tagName} ${convertPropsToRawString(props)}/>`
          : `<${tagName} ${convertPropsToRawString(
              props
            )}>${convertReactNodeToRawString(children)}</${tagName}>`;
      }
    }
    // ?
    else {
      return children === undefined
        ? `<${tagName} ${convertPropsToRawString(props)}/>`
        : `<${tagName} ${convertPropsToRawString(
            props
          )}>${children}</${tagName}>`;
    }
  }

  // コンポーネント
  if (
    childrenType === "object" ||
    Array.isArray(children) ||
    isValidHtmlTagName(componentName)
  ) {
    const rawStringChildren = children.map((child: React.ReactElement) =>
      convertReactNodeToRawString(child)
    );
    return `<${componentName} ${convertPropsToRawString(
      props
    )}>${rawStringChildren.join("")}</${componentName}>`;
  }

  // タグに囲まれたテキスト
  if (childrenType === "string") {
    return `<${componentName} ${convertPropsToRawString(
      props
    )}>${children}</${componentName}>`;
  }

  // 複数children
  if (Array.isArray(node)) {
    const rawStringChildren: any = node.map((child: React.ReactElement) =>
      convertReactNodeToRawString(child)
    );
    return `<>${rawStringChildren.join("")}</>`;
  }

  // テキスト
  return node;
};

export const convertPropsToRawString = (props: any, omitChildren = true) => {
  return Object.keys(props)
    .map((key) => {
      if (key === "children" && omitChildren) return "";
      const value = props[key];
      if (typeof value !== "string") {
        return `${key}={${JSON.stringify(props[key])}}`;
      }
      return `${key}=${JSON.stringify(props[key])}`;
    })
    .join(" ");
};

export const isValidHtmlTagName = (input: any): boolean => {
  return (
    document.createElement(input).toString() != "[object HTMLUnknownElement]"
  );
};
