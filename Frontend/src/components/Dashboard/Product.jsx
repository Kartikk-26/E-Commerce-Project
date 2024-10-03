import React, { useEffect, useState } from 'react';
import { fetchProduct, createProduct } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';

function Product() {
  const { handleSubmit, register, reset } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

  const { product } = useSelector((state) => state.product);

  const handleOpen = () => {
    setOpen(true);
    reset(); // Reset form fields
  };

  const handleClose = () => setOpen(false);

  const handleEdit = () => {
    setIsEdit(true);
    handleOpen();
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <div>
          <img
            className="object-contain w-14"
            src={`http://localhost:3000/${params.value}`}
            alt="Product"
          />
        </div>
      ),
    },
    { field: 'name', headerName: 'Name', width: 100 },
    {
      field: 'price',
      headerName: 'Price(Rs.)',
      width: 150,
    },
    {
      field: 'category',
      headerName: 'Category',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
    },
    {
      field: 'discountPrice',
      headerName: 'Discount Price(Rs.)',
    },
    {
      field: 'stock',
      headerName: 'Stock Avail.',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <div className="flex m-2 gap-2 cursor-pointer">
          <FiEdit2 size={26} onClick={handleEdit} className="text-blue-500" />
          <MdDeleteOutline size={26} className="text-red-500" />
        </div>
      ),
    },
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('category', data.category);
    formData.append('stock', data.stock);
    formData.append('description', data.description);
    formData.append('discountPercentage', data.discountPercentage);
    
    await dispatch(createProduct(formData));
    dispatch(fetchProduct());
    handleClose();
  };

  return (
    <div className="m-10">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className="mb-4"
      >
        Add Product
      </Button>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={product}
          columns={columns}
          pageSizeOptions={[5]}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" component="h2" className="mb-4">
              {isEdit ? "Update Product" : "Add Product"}
            </Typography>
            <div className="flex flex-col gap-3">
              <input
                className="input_field"
                type="text"
                {...register('name', { required: true })}
                placeholder="Enter product name"
              />
              <input
                className="input_field"
                type="number"
                {...register('price', { required: true })}
                placeholder="Enter price"
              />
              <input
                className="input_field"
                type="file"
                {...register('image', { required: true })}
              />
              <input
                className="input_field"
                type="text"
                {...register('category', { required: true })}
                placeholder="Enter category"
              />
              <input
                className="input_field"
                type="text"
                {...register('description', { required: true })}
                placeholder="Enter description"
              />
              <input
                className="input_field"
                type="number"
                {...register('stock', { required: true })}
                placeholder="Enter stock"
              />
              <input
                className="input_field"
                type="number"
                {...register('discountPercentage')}
                placeholder="Enter discount percentage"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mt-2"
              >
                {isEdit ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
