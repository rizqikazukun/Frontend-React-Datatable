/* eslint-disable react/no-unknown-property */
import { getAllProduct, deleteProduct, addProduct, updateProduct } from './handler';
import DataTable from 'react-data-table-component';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

// syntax dibawah akan membuat aplikasi 
// tidak berjalan di browser lama
// note : Top Level Await
let produk = await getAllProduct()


function Datatable() {

    // Datatable Coloumn
    const columns = [
        {
            name: 'Nama Produk',
            selector: row => row.nama_produk,
        },
        {
            name: 'Keterangan',
            selector: row => row.keterangan,
        },
        {
            name: 'Jumlah',
            selector: row => row.jumlah,
        },
        {
            name: 'Harga',
            selector: row => row.harga,
        },
        {
            name: 'Update',
            selector: row => row.updateButton,
        },
        {
            name: 'Delete',
            selector: row => row.deleteButton,
        },
    ];

    // Form Tambah Produk
    let [state, setState] = useState({
        id: "",
        namaProduk: "",
        keterangan: "",
        jumlah: "",
        harga: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };


    const deleteProductButton = (button) => {
        button.preventDefault();
        deleteProduct(button.target.id)
        window.location.reload();
    }

    const addProductButton = (event) => {
        event.preventDefault()
        addProduct(state)
        window.location.reload()
    };

    const updateProductButton = (event) => {
        event.preventDefault()
        updateProduct(state)
        console.log(state)
        window.location.reload()
    }


    const data = [];
    produk.data.rows.map((item) => {
        const deleteButton = <Button type="submit" id={item.id} value={item.id} onClick={deleteProductButton} className="tombolDelete btn btn-danger btn-sm">Hapus</Button>
        const updateButton = <Button type="submit" id={item.id} value={item.toString()} namaProduk={item.nama_produk} keterangan={item.keterangan} jumlah={item.jumlah} harga={item.harga} onClick={(e) => { bukaModalUbahProduk(e.target.id, e.target.getAttribute("namaProduk"), e.target.getAttribute("keterangan"), e.target.getAttribute("jumlah"), e.target.getAttribute("harga")) }} className="tomboUpdate btn btn-warning btn-sm">Ubah</Button>
        data.push({ ...item, updateButton, deleteButton })
    })

    // Modal Tambah Produk
    const [showModalTambah, setShowT] = useState(false);
    const tutupModalTambahProduk = () => { setShowT(false) };
    const bukaModalTambahProduk = () => {
        state.id = ""
        state.namaProduk = ""
        state.keterangan = ""
        state.jumlah = ""
        state.harga = ""
        setShowT(true)
    };

    // Modal Ubah Produk
    const [showModalUpdate, setShowU] = useState(false);
    const tutupModalUbahProduk = () => { setShowU(false) };
    const bukaModalUbahProduk = (id, namaProduk, keterangan, jumlah, harga) => {

        state.id = id
        state.namaProduk = namaProduk
        state.keterangan = keterangan
        state.jumlah = jumlah
        state.harga = harga
        setShowU(true)
    }

    return (
        <>

            <Container className='mt-5'>

                <Row>
                    <Col>


                        <div className="mt-5" >
                            <h1>Hallo Selamat datang</h1>
                            <p>ini adalah imlementasi React, Datatable, dan React Bootstrap saya.</p>
                        </div>
                        <Button variant="primary" onClick={bukaModalTambahProduk}>
                            Tambah Produk
                        </Button>
                        <div className='mt-2'>
                            <DataTable
                                columns={columns}
                                data={data}
                            />
                        </div>

                    </Col>
                </Row>

            </Container>
            <Container>
                {/* Modal Tambah Produk */}
                <Modal show={showModalTambah} onHide={tutupModalTambahProduk}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Produk</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label htmlFor="namaProduk">Nama Produk</Form.Label>
                            <Form.Control
                                type="text"
                                name="namaProduk"
                                value={state.namaProduk}
                                onChange={handleInputChange}
                            />
                            <Form.Label htmlFor="keterangan">Keterangan</Form.Label>
                            <Form.Control
                                type="text"
                                name="keterangan"
                                value={state.keterangan}
                                onChange={handleInputChange}
                            />
                            <Form.Label htmlFor="jumlah">Jumlah</Form.Label>
                            <Form.Control
                                type="number"
                                name="jumlah"
                                value={state.jumlah}
                                onChange={handleInputChange}
                            />
                            <Form.Label htmlFor="harga">Harga</Form.Label>
                            <Form.Control
                                type="number"
                                name="harga"
                                value={state.harga}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={tutupModalTambahProduk}>
                            Batal
                        </Button>
                        <Button type="submit" variant="primary" onClick={addProductButton} >
                            Simpan
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* Modal Ubah Produk */}
                <Modal show={showModalUpdate} onHide={tutupModalUbahProduk}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ubah Produk</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* <Form.Label htmlFor="id" disabled>ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="id"
                                value={state.id}
                                onChange={handleInputChange}
                            /> */}
                            <Form.Label htmlFor="namaProduk">Nama Produk</Form.Label>
                            <Form.Control
                                type="text"
                                name="namaProduk"
                                value={state.namaProduk}
                                onChange={handleInputChange}
                            />
                            <Form.Label htmlFor="keterangan">Keterangan</Form.Label>
                            <Form.Control
                                type="text"
                                name="keterangan"
                                value={state.keterangan}
                                onChange={handleInputChange}
                            />
                            <Form.Label htmlFor="jumlah">Jumlah</Form.Label>
                            <Form.Control
                                type="number"
                                name="jumlah"
                                value={state.jumlah}
                                onChange={handleInputChange}
                            />
                            <Form.Label htmlFor="harga">Harga</Form.Label>
                            <Form.Control
                                type="number"
                                name="harga"
                                value={state.harga}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={tutupModalUbahProduk}>
                            Batal
                        </Button>
                        <Button type="submit" variant="primary" onClick={updateProductButton} >
                            Simpan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default Datatable;