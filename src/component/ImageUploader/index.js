import React, { Component } from 'react';
import firebase from '../../fire';

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreview: '' };

    this.handlePreview = this.handlePreview.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handlePreview(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file[0],
        imagePreview: reader.result,
      });
    };
    reader.readAsDataURL(file[0]);
  }

  handleUpload() {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`profilePictures/${this.state.file.name}`)
      .put(this.state.file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {},
      (success) => {
        console.log(uploadTask.snapshot.downloadURL);
      },
    );
  }

  render() {
    return (
      <div>
        <h1>Image Upload</h1>

        {this.state.imagePreview && <img src={this.state.imagePreview} />}

        <input
          placeholder="ImageUpload"
          type="file"
          onChange={(event) => {
						this.handlePreview(event.target.files);
					}}
        />

        <button onClick={this.handleUpload}> Handle Upload </button>
      </div>
    );
  }
}
