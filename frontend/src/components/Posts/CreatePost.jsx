import React, { useState } from 'react'
import { Redirect,Link } from 'react-router-dom';
import Field from '../Form/Field';
import Form from 'react-bootstrap/Form'
import '../../styles/CreatePost.css'
class CreatePost extends React.Component {
    state={redirection:false};

    constructor(props){
        super(props)
        const userConnect=JSON.parse(localStorage.getItem('userConnect'));
        this.state={
            userId: userConnect.userId,
            title: undefined || '',
            content: undefined || '',
            articleUrl: undefined || ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (e) {
        const name = e.target.name;
        const value =  e.target.value;
        this.setState({
            [name]: value
        })
    }
    handleSubmit (e){
        e.preventDefault()
        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token =   storage.token;

        const requestOptions = {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)

    }
    fetch(('http://localhost:3000/api/post/'), requestOptions)
                .then(response => response.json())
                .then(
                    (response) => {
                    if (response.error) { 
                        alert("Votre article n'a pas pu être publié : " + response.error); 
                    } else { 
                        this.setState({ redirection: true })
                        alert("Votre article à bien été publié !")
                    }
                })
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
}
render() {
    const { redirection } = this.state;
    if (redirection) {
        return <Redirect to='/articles' />;
    }

    return <React.Fragment>
        <div className="container">
            <h1>Publiez un article</h1>
            <form>
                <Field name="title" value={this.state.title} onChange={this.handleChange}>Titre</Field>
                <Form.Group controlId="exampleForm.ControlTextarea1" >
                    <Form.Label>Contenu de l'article</Form.Label>
                    <Form.Control as="textarea" rows={8} name="content" value={this.state.content} onChange={this.handleChange} />
                </Form.Group>
                <Field name="articleUrl" value={this.state.articleUrl} onChange={this.handleChange}>URL d'un article</Field>
                <div className="form-submit">
                    <button className="btn btn-outline-success btn-sm" onClick={this.handleSubmit}>Publiez l'article</button>
                    <Link to='/posts' className="btn btn-outline-info btn-sm">Retour aux articles</Link>
                </div>
            </form>
        </div>
    </React.Fragment>
};
};

export default CreatePost


