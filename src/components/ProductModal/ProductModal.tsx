import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { Product } from "../../types/Product";
import * as Yup from 'yup';
import {useFormik} from "formik";
import { ProductSerivce } from "../../services/ProductService";
import {toast} from 'react-toastify';

type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    prod: Product;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductModal = ({show, onHide, title, modalType, prod, refreshData}: ProductModalProps) => {

   const handleSaveUpdate = async (pro: Product) => {
    try{
        const isNew = prod.id === 0;
        if(isNew) {
            await ProductSerivce.createProduct(pro);
        } else {
            await ProductSerivce.updateProduct(pro.id, pro);
        }
        toast.success(isNew ? "Producto Creado" : "Prodcuto Actualizado", {
            position: "top-center",

        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error("ocurrio un error");
    }
   };
   
   const handleDelete =async () => {

        try {
            await ProductSerivce.deleteProduct(prod.id);
            toast.success("Eliminado con exito", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("ocurrio un error");

        }
   }

   
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            title: Yup.string().required(`Titutlo requerido`),
            price: Yup.number().min(0).required(`precio requerido`),
            description: Yup.string().min(0).required(`descripcion requerido`),
            category: Yup.string().required(`categoria requerido`),
            image: Yup.string().required(`imagen requerido`),
        });
    };

    const formik = useFormik({
        initialValues: prod,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Product) => handleSaveUpdate(obj),
    });

    return(
        <>
         {modalType === ModalType.DELETE? (
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>¿estas seguro que deseas eliminar el producto?
                    <br />
                    <strong>{prod.title}</strong>
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
            </Modal.Footer>
            </Modal>
            
            </>
         ) : (
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {"Titutlo"}
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="formtitulo">
                            <FormLabel>Titulo</FormLabel>
                            <Form.Control
                                name="title"
                                type="text"
                                value={formik.values.title || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.title && formik.touched.title)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {"Precio"}
                        <Form.Group controlId="formPrice">
                            <FormLabel>Precio</FormLabel>
                            <Form.Control
                                name="price"
                                type="number"
                                value={formik.values.price || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.price && formik.touched.price)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {"Descripcion"}
                        <Form.Group controlId="formDescription">
                            <FormLabel>Precio</FormLabel>
                            <Form.Control
                                name="description"
                                type="text"
                                value={formik.values.description || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.description && formik.touched.description)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {"Categoria"}
                        <Form.Group controlId="formCategory">
                            <FormLabel>Categoria</FormLabel>
                            <Form.Control
                                name="category"
                                type="text"
                                value={formik.values.category || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.category && formik.touched.category)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {"Imagen"}
                        <Form.Group controlId="formCategory">
                            <FormLabel>Imagen</FormLabel>
                            <Form.Control
                                name="image"
                                type="text"
                                value={formik.values.image || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.image && formik.touched.image)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.image}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Modal.Footer className="mt-4">
                            <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                            <Button variant="primary" type="submit" disabled={!formik.isValid}>Guardar</Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>
            </Modal>
            </>
         )}
        </>
    )

}

export default ProductModal;