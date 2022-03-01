export const convertReactNodeToRawString = (node: React.ReactNode) => {
  const children = node?.props?.children;
  const childrenType = typeof children;
  if (childrenType === "undefined") {
    return node;
  }

  const componentName = (node.type as React.JSXElementConstructor<any>).name;
  const props = node?.props;
  if (childrenType === "string") {
    return `<${componentName} ${convertPropsToRawString(
      props
    )}>${children}</${componentName}>`;
  } else if (childrenType === "object" || Array.isArray(children)) {
    const rawStringChildren = children.map((child: React.ReactElement) =>
      convertReactNodeToRawString(child)
    );
    return `<${componentName} ${convertPropsToRawString(
      props
    )}>${rawStringChildren.join("")}</${componentName}>`;
  }
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
