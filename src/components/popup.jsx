import React from 'react';
import { ReactDOM } from 'react';
import Modal from 'react-modal';


const customStyles = {
  content: {
    minWidth: "350px",
    width:"40%",
    minHeight: "400px",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    zIndex: "3",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

function UpdatePopUp({isOpen, closeModal}) {
  let subtitle;

 

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

 

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{display:"flex",justifyContent:"center",position:"relative",}}>
            
        <h2 style={{textAlign:"center",fontFamily:"sans-serif",fontSize:"1.5em"}} ref={(_subtitle) => (subtitle = _subtitle)}>Update Profile</h2>
        <button style={{position:"absolute",right:"0",border:"none",background:"transparent",fontSize:"2em",color:"#6ea9d7"}} onClick={closeModal}> X</button>
        </div>
        <div style={{background:"skyBlue",width:"95%",minHeight:"500px",margin:"15px auto"}} >Update feilds will be used here</div>
        
      </Modal>
    </div>
  );
}


export default UpdatePopUp;