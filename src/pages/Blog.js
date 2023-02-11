import React, { useState } from 'react';
import Logo from '../Components/Logo';
import Navigation from '../Components/Navigation';


const Blog = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.length < 140) {
      // alert("Noonn");
      setError(true);
    } else {
      setError(false);
    }
  }


  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)} >
        <input type="text" placeholder='Nom' />
        <textarea
          // ↓ Style conditionnel ↓
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder='Message' onChangeCapture={(e) => setContent(e.target.value, setError(false))}></textarea>
        {/* ↓ Affichage conditionnel du p : si error est true alors on affiche le <p></p> ↓ */}
        {error && <p >Votre message doit contenir un minimum de 140 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>

      <ul>

      </ul>
    </div>
  );
};

export default Blog;