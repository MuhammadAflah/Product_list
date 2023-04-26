import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    styled,
    InputBase,
    alpha,
    Select,
    MenuItem,
    Box,
    FormControl,
    InputLabel,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import { useEffect } from 'react';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "20px",
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(3),
        width: '50%',
        margin: "12px"
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        height: "2.9em",
        [theme.breakpoints.up('md')]: {
            width: '78ch',
        },
    },
}));

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('');


    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDelete = async productId => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${productId}`);
            setProducts(products.filter(product => product.id !== productId));
            window.alert("item deleted successfully!!")
        } catch (error) {
            console.log(error);
        }
    };

    //   const handleEdit = async productId => {
    //     navigate(`/edit/${productId}`)
    //   }
    const handleEdit = product => {
        setSelectedProductForEdit(product);
        setOpenEditModal(true);
    };

    const handleEditModalClose = () => {
        setOpenEditModal(false);
    };

    const handleEditProduct = async editedProduct => {
        try {
            await axios.put(`https://fakestoreapi.com/products/${editedProduct.id}`, editedProduct);
            setProducts(products.map(product => product.id === editedProduct.id ? editedProduct : product));
            handleEditModalClose();
            window.alert("item updated successfully")
        } catch (error) {
            console.log(error);
        }
    };



    const handleView = product => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase()) &&
        (filterValue === '' || product.category === filterValue)
    );

    const categories = ['electronics', 'jewelery', 'men clothing', 'women clothing'];

    return (
        <>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Search sx={{ height: "4rem" }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                />
            </Search>
            <FormControl sx={{width:"30%", margin:"12px"}}>
            <InputLabel id="demo">Category</InputLabel>
            <Select value={filterValue} label="Category" onChange={(e) => setFilterValue(e.target.value)}>
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
            </Select>
            </FormControl>
            </Box>
            <TableContainer>
                <Table aria-label="product table" sx={{ border: '1px solid black' }}>
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Product Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Product Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Product Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Product Image</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Product Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>View</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Update</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <Typography variant="h6" gutterBottom>
                                        Product not found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts?.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell component="th" scope="row">
                                        {product.title}
                                    </TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>
                                        <img src={product.image} alt="item" width="100px" height="100px" />
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>
                                        <VisibilityIcon onClick={() => handleView(product)} sx={{ cursor: 'pointer' }} />
                                    </TableCell>
                                    <TableCell>
                                        <EditIcon onClick={() => handleEdit(product)} sx={{ cursor: 'pointer' }} />
                                    </TableCell>
                                    <TableCell>
                                        <DeleteIcon onClick={() => handleDelete(product.id)} sx={{ color: 'red', cursor: 'pointer' }} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{selectedProduct?.title}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            <strong>Price:</strong> {selectedProduct?.price}
                        </Typography>
                        <Typography>
                            <strong>Description:</strong> {selectedProduct?.description}
                        </Typography>
                        <img src={selectedProduct?.image} alt="item" width="200px" height="200px" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openEditModal} onClose={handleEditModalClose}>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Title"
                            value={selectedProductForEdit?.title}
                            onChange={event => setSelectedProductForEdit({ ...selectedProductForEdit, title: event.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            value={selectedProductForEdit?.description}
                            onChange={event => setSelectedProductForEdit({ ...selectedProductForEdit, description: event.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Price"
                            value={selectedProductForEdit?.price}
                            onChange={event => setSelectedProductForEdit({ ...selectedProductForEdit, price: event.target.value })}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditModalClose}>Cancel</Button>
                        <Button onClick={() => handleEditProduct(selectedProductForEdit)}>Save</Button>
                    </DialogActions>
                </Dialog>



            </TableContainer>
        </>
    )
}

export default ViewProducts