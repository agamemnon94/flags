import React, { useState } from 'react';
import axios from 'axios';

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("")



  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString('fr-FR', options);
    return newDate;
  };
  const handleEdit = () => {

    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updatedDate: Date.now(),
    }
    axios.put("http://localhost:3004/articles/" + article.id, data).then(() =>
      setIsEditing(false)
    );
  }

  const handleDelete = () => {
    axios.delete("http://localhost:3004/articles/" + article.id);
    window.location.reload()

  }

  return (
    <div className="article" style={{
      background: isEditing ? "#8ba3b6" : "white"
    }} >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le : {dateFormater(article.date)}</em>
        {/* <em>Modifier le : {dateFormater(article.updatedDate)}</em> */}
      </div>
      {
        isEditing ?
          <textarea
            defaultValue={editContent ? editContent : article.content}
            autofocus
            onChange={(e) => setEditContent(e.target.value)} >
          </textarea> :
          <p>{editContent ? editContent : article.content}</p>
      }
      <div className="btn-container">
        {isEditing ? (
          <button onClick={(() => handleEdit())}>Valider</button>
        ) : (
          <button onClick={(() => setIsEditing(true))}>Éditer</button>
        )}
        <button onClick={() => {
          if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
            if (true) {
              handleDelete()
            }
          }
        }}>Supprimer</button>
      </div>
    </div >
  );
};

export default Article;