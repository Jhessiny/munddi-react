const Store = ({ store, setCurrentStore }) => {
  return (
    <div
      className="store-item"
      onMouseOver={() => setCurrentStore(store.name)}
      onMouseOut={() => setCurrentStore(null)}
    >
      <h2>{store.name}</h2>
      <p>
        {store.street} - {store.city}/{store.uf}
      </p>
    </div>
  );
};

export default Store;
