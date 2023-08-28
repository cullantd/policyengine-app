import style from "../style";
import { motion } from "framer-motion";

export default function TextBox({ placeholder, id, title, width, fontSize, onSubmit, inputType }) {
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e.target[0].value)
      }
      }>
      <h6
        style={{
          color: style.colors.WHITE,
          textTransform: "uppercase",
          letterSpacing: 2.4,
          fontFamily: "Roboto",
        }}
      >
        {title}
      </h6>
      <motion.input
        type={inputType || "text"}
        placeholder={placeholder}
        id={id}
        style={{
          border: "none",
          borderBottom: `1px solid ${style.colors.WHITE}`,
          backgroundColor: style.colors.LIGHT_GRAY,
          color: style.colors.DARK_GRAY,
          width: width || "100%",
          height: 50,
          fontSize: fontSize || 20,
          fontWeight: 300,
          padding: 10,
          boxShadow: `0px 0px 0px ${style.colors.BLUE_PRIMARY}`,
        }}
        // While focussing, make the bottom border blue from left to right
        whileFocus={{
          boxShadow: `0px 5px 10px ${style.colors.BLUE_PRIMARY}`,
        }}
      />
      </form>
    </div>
  );
}