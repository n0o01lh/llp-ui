import MoonLoader from "react-spinners/MoonLoader";

const Loader = () => {
  return (
    <div
      className="flex w-full justify-center items-center align-middle"
      style={{ height: "300px" }}
    >
      <MoonLoader />
    </div>
  );
};

export default Loader;
