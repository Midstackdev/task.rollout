import { useEffect, useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const url = `http://localhost:5000/api/photos?${
    filter && `tag=${filter}&`
  }page=${page}`;
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setImages(data.data);
      setTags(data.tags);
      // console.log("---data---", data);
    } catch (error) {
      console.log("---error---", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filter]);

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
        <ul>
          {tags &&
            tags.map((tag, index) => (
              <span key={index}>
                <li onClick={() => setFilter(tag)}>{tag}</li>
              </span>
            ))}
        </ul>
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
          <button onClick={() => setPage(page - 1)}>{"<"}</button>
          <button onClick={() => setPage(page + 1)}>{">"}</button>
        </div>
      </div>
    </>
  );
};

export default App;
