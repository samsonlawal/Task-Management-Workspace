import { useState, CSSProperties } from "react";
import { PuffLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader({ loaderSize }: { loaderSize: number }) {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000000");

  return (
    <div className="sweet-loading">
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input
        value={color}
        onChange={(input) => setColor(input.target.value)}
        placeholder="Color of the loader"
      /> */}

      <PuffLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={loaderSize}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
