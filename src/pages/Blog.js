import React, { useEffect, useState } from 'react';
import Logo from '../Components/Logo';
import Navigation from '../Components/Navigation';
import axios from 'axios';
import Article from '../Components/Article';


const Blog = () => {

  const [blogData, setBlogData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  // On récupère les données de la BD locale db.json
  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  };

  useEffect(() => getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.length < 140) {
      setError(true);
    } else {
      axios.post("http://localhost:3004/articles", {
        author,
        content,
        date: Date.now(),
      });
      setError(false);
      setAuthor("");
      setContent("");
      getData();
    }
  }


  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)} >
        <input
          type="text"
          placeholder='Nom'
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <textarea
          // ↓ Style conditionnel ↓
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder='Message'
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        {/* ↓ Affichage conditionnel du p : si error est true alors on affiche le <p></p> ↓ */}
        {error && <p >Votre message doit contenir un minimum de 140 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>

      <ul>
        {/* On pacours la bd "article"*/}
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default Blog;