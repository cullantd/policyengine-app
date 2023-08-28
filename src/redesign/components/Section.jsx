import useDisplayCategory from "./useDisplayCategory";
import style from "../style";

export default function Section({ height, backgroundColor, title, children }) {
  const displayCategory = useDisplayCategory();
  const sideMargin = {
    mobile: 40,
    tablet: 100,
    desktop: null,
  }[displayCategory];
  const topBottomMargins = {
    mobile: 40,
    tablet: 40,
    desktop: 80,
  }[displayCategory];
  let titleColor = null;
  if (
    [style.colors.BLUE_PRIMARY, style.colors.BLUE_PRESSED].includes(
      backgroundColor
    )
  ) {
    titleColor = style.colors.WHITE;
  }
  return (
    <div
      style={{
        height,
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        borderBottom: `1px solid ${style.colors.BLACK}`,
        color: titleColor,
      }}
    >
      <div
        style={{
          width: {
            mobile: "100%",
            tablet: "100%",
            desktop: 1_200,
          }[displayCategory],
          marginLeft: sideMargin,
          marginRight: sideMargin,
          marginTop: topBottomMargins,
          marginBottom: topBottomMargins,
        }}
      >
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export function SectionTop({ height, backgroundColor, title }) {
  const displayCategory = useDisplayCategory();
  const sideMargin = {
    mobile: 40,
    tablet: 100,
    desktop: null,
  }[displayCategory];
  const topBottomMargins = {
    mobile: 40,
    tablet: 40,
    desktop: 80,
  }[displayCategory];
  let titleColor = null;
  if (
    [style.colors.BLUE_PRIMARY, style.colors.BLUE_PRESSED].includes(
      backgroundColor
    )
  ) {
    titleColor = style.colors.WHITE;
  }
  return (
    <div
      style={{
        height,
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        color: titleColor,
      }}
    >
      <div
        style={{
          width: {
            mobile: "100%",
            tablet: "100%",
            desktop: 1_200,
          }[displayCategory],
          marginLeft: sideMargin,
          marginRight: sideMargin,
          marginTop: topBottomMargins,
        }}
      >
        {title && <h2>{title}</h2>}
      </div>
    </div>
  );
}

export function SectionBottom({ height, backgroundColor, children }) {
  const displayCategory = useDisplayCategory();
  const sideMargin = {
    mobile: 40,
    tablet: 100,
    desktop: null,
  }[displayCategory];
  const topBottomMargins = {
    mobile: 40,
    tablet: 40,
    desktop: 80,
  }[displayCategory];
  let titleColor = null;
  if (
    [style.colors.BLUE_PRIMARY, style.colors.BLUE_PRESSED].includes(
      backgroundColor
    )
  ) {
    titleColor = style.colors.WHITE;
  }
  return (
    <div
      style={{
        height,
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        color: titleColor,
        borderBottom: `1px solid ${style.colors.BLACK}`,
      }}
    >
      <div
        style={{
          width: {
            mobile: "100%",
            tablet: "100%",
            desktop: 1_200,
          }[displayCategory],
          marginLeft: sideMargin,
          marginRight: sideMargin,
          marginBottom: topBottomMargins,
        }}
      >
        {children}
      </div>
    </div>
  );
}