import React, { useState, useEffect } from "react";
import { getNotes,deleteNotes } from "../../API";
import styled from "styled-components";
import Modal from "react-modal";

export const SingleNote = ({
  history: { push },
  match: {
    params: { id },
  },
}) => {
  //About Delete Confirm Modal
  Modal.setAppElement("body");
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
    },
  };
  const [notes, setNotes] = useState([]);
 
 
  useEffect(() => {
    (async () => {
      const data = await getNotes();
      setNotes(data);
    })();
  }, []);
  const note = notes.find((item) => item.id == +id);
  const deleteNote = ()=>{
    deleteNotes({id});
    push("/")
  }

  return (
    <div>
      {note && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <CloseBtn onClick={closeModal}>x</CloseBtn>
          <ModalBody>
            <h4>Are you sure want to delete "{note.title}" ? </h4>
            <ModalButtons>
              <ConfirmBtn onClick={deleteNote}>Yes</ConfirmBtn>
              <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
            </ModalButtons>
          </ModalBody>
        </Modal>
      )}
      {note && (
        <Container>
          <Note color={note.color}>
            <Header>{note.title}</Header>
            <Body>{note.text}</Body>
          </Note>
          <Buttons>
            <Button>Edit</Button>

            <Button onClick={openModal}>Delete</Button>
            <Button>Archive</Button>
          </Buttons>
        </Container>
      )}
    </div>
  );
};

//styled Components
const Container = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
`;
const Note = styled.div`
  background-color: ${(p) => p.color};
  width: 70%;
  height: 300px;
  border: 2px solid white;
  padding: 20px;
  border-radius: 10px;
`;
const Header = styled.header`
  color: white;
  padding: 0px 10px 10px;
  text-align: center;
  font-size: 24px;
  border-bottom: 1px solid white;
`;
const Body = styled.div`
  padding: 10px;
  color: white;
  font-size: 20px;
  text-align: center;
`;
const Buttons = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  margin: 15px;
  border-radius: 10px;
  border: 1px solid black;
  cursor: pointer;

  &:focus {
    outline: none !important;
  }
`;


// modal styles 
const CloseBtn = styled.button`
  background-color: red;
  color: white;
  font-weight: 600;
  border-radius: 100%;
  font-size: 15px;
  height: 20px;
  width: 20px;
  border: none;
  position: absolute;
  right: 20px;
  cursor: pointer;

  &:focus {
    outline: none !important;
  }
`;
const ModalBody = styled.div`
  padding: 20px;
`;
const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
`;
const ConfirmBtn = styled.button `
height:35px;
background-color:#f26d6d;
color:white;
width: calc((100% / 2) - 20px);
border-radius:5px;
margin:10px;
cursor:pointer;
font-weight:600;
padding:10px;
border:1px solid white;
&:focus{
  outline:none
}

` 
const CancelBtn = styled.button `
height:35px;
background-color:#bad496;
width: calc((100% / 2) - 20px);
border-radius:5px;
color:white;
margin:10px;
cursor:pointer;
font-weight:600;
padding:10px;
border:1px solid white;
&:focus{
  outline:none
}

` 