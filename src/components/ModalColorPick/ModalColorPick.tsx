import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import {Form} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
type MyModalProps ={
    show: boolean;
    onHide: () => void;
    handleColorChange: (color: string) => void;
}

const ModalColorPick = ({show, onHide, handleColorChange}: MyModalProps) => {

    const [selectedColor, setSelectedColor] = useState("#FFF");
    
    const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setSelectedColor(event.target.value);
    }  

    const handleAcceptClick = () => {
        handleColorChange(selectedColor);
        onHide();
    }
    return(
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Cambiar Color
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Label htmlFor="exampleColorInput"> Elije un Color </Form.Label>
                <Form.Control type='color' id='exampleColorInput' defaultValue="#FFF" 
                title="Elije tu color"
                onChange={handleColorPickerChange}/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={handleAcceptClick}>Aceptar</Button>
            </Modal.Footer>

        </Modal>
    )
}

export default ModalColorPick;