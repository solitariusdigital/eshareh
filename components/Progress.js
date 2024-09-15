export default function Progress(props) {
  const { color, completed, height, border } = props;

  const progress = {
    width: "100%",
    height: height ? height : 5,
    borderRadius: border ? "50px" : "0px",
  };

  const filler = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: color,
    transition: "width 1s ease-in-out",
    borderRadius: "inherit",
  };

  return (
    <div style={progress}>
      <div style={filler}></div>
    </div>
  );
}
