import { useEffect, useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/photos");
      const data = await res.json();
      setImages(data.data);
    } catch (error) {
      console.log("---error---", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!images.length === 0) {
    return <>Lodaing...</>;
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/photos/${id}`, {
        method: "DELETE",
      });

      setImages((prev) => images.filter((image) => image.id !== id));
    } catch (error) {
      console.log("---error---", error);
    }
    console.log(id);
  };

  return (
    <>
      <div className="App">
        <div>
          {images.map((image) => (
            <div key={image.id}>
              <div>
                <img src={image?.image_url} alt="" />
                {image.published_date}{" "}
                <button onClick={() => handleDelete(image.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button>{"<"}</button>
          <button>{">"}</button>
        </div>
      </div>
    </>
  );
};

export default App;
