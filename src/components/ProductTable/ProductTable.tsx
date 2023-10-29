import {useEffect, useState} from "react";
import { Product } from "../../types/Product";
import { ProductSerivce } from "../../services/ProductService";
import Loader from "../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import ProductModal from "../ProductModal/ProductModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";








const ProductTable = () => {

    const initializableNewProduct = (): Product => {
        return {
    
            id:0,
            title:"",
            price: 0,
            description:"",
            category: "",
            image: "",
    
        };
    };

    const [product, setProduct] = useState<Product>(initializableNewProduct);

    const [showModal, setShowModal] = useState(false);
    
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    
    const [title, setTitle] = useState("");
    
    const handleClick = (newTitle: string, prod: Product, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal);
        setProduct(prod);
        setShowModal(true);
    };

    

    const [products, setProducts] = useState<Product[]>([]);

    const [istloading, setLoading] = useState(true);

    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchProducts = async () =>{
            const products = await ProductSerivce.getProducts();
            setProducts(products);
            setLoading(false);
        };

        fetchProducts();
    }, [refreshData]);

    console.log(JSON.stringify(products, null, 2));
    
    return(
      <>
        <Button onClick={() => handleClick("Nuevo producto", initializableNewProduct(),
        ModalType.CREATE)}>Nuevo Producto</Button>

        {istloading? <Loader/>: (
            <Table hover>
                <thead>
                    <tr>
                        <th> Titulo </th>
                        <th> Precio </th>
                        <th> Descripción </th>
                        <th> Categoria </th>
                        <th> Imagen </th>
                        <th> Editar </th>
                        <th> Borrar </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map( product => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td><img src={product.image} alt={product.title} 
                            style={{width:'50px'}}/></td>
                            <td><EditButton onClick={() => handleClick("Editar Producto", product, ModalType.UPDATE)}/></td>
                            <td><DeleteButton onClick={() => handleClick("Borrar Producto", product, ModalType.DELETE)}/></td>
                        </tr>
                    ))}
                </tbody>
                
            </Table>
        )}

            {showModal && (
                <ProductModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={title}
                modalType={modalType}
                prod={product}
                refreshData={setRefreshData}
                />
            )}


      </>
    )
}

export default ProductTable;