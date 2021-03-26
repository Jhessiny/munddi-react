import "./StoresWrapper.scss";
import Store from "./Store";

const StoresWrapper = ({
  stores,
  isFetching,
  hasMapBeenCreated,
  message,
  setCurrentStore,
}) => {
  return (
    <div className="stores-wrapper">
      <p className="stores-message">
        {!isFetching && hasMapBeenCreated ? message : ""}
      </p>
      {stores.length
        ? stores.map((store, index) => (
            <Store
              store={store}
              key={"store-" + index}
              setCurrentStore={setCurrentStore}
            />
          ))
        : null}
    </div>
  );
};

export default StoresWrapper;
