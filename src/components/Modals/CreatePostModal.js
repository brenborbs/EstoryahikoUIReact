import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NewPost from "../../components/CRUD/CreatePost";

const CreatePostModal = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <button className="btn btn-block btn-outline-success" onClick={toggle}>
        <span className="fa fa-pencil-square-o mr-2"></span>
        New Post
      </button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        // className={className}
        className="col-12"
      >
        <ModalHeader toggle={toggle}>New Post</ModalHeader>
        <ModalBody>
          <NewPost />
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "} */}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreatePostModal;
