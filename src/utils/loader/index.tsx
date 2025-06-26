import { useState, CSSProperties } from "react";
import { ClipLoader, MoonLoader, PuffLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type LoaderProps = {
  loaderSize: number;
  type?: string; // "puff" | "moon"
};

function Loader({ loaderSize, type }: LoaderProps) {
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

      {type === "puff" ? (
        <PuffLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={loaderSize}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <ClipLoader
          // loading={loading}
          size={loaderSize}
          aria-label="Loading Spinner"
        />
      )}
    </div>
  );
}

export default Loader;
