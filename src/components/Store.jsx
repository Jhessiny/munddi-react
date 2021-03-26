const Store = ({ store }) => {
  return (
    <div className="store-item">
      <h2>{store.name}</h2>
      <p>
        {store.street} - {store.city}/{store.uf}
      </p>
    </div>
  );
};

export default Store;
