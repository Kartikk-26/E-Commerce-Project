import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { fetchProduct } from './../../redux/productSlice';
import { FiEdit2 } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { MdDeleteOutline } from "react-icons/md";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Product() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
  };

  const { product } = useSelector((state) => state.product);

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      renderCell: (params) => (
        <img
          className="object-contain w-8 h-8 rounded-md"
          src={`http://localhost:3000/${params.value}`}
          alt="product"
        />
      ),
    },
    { field: 'name', headerName: 'Product Name', width: 150 },
    { field: 'price', headerName: 'Price', width: 100, editable: true },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: () => (
        <div className="flex gap-2 items-center justify-center">
          <FiEdit2 className="text-blue-500 cursor-pointer" size={24} />
          <MdDeleteOutline className="text-red-500 cursor-pointer" size={24} />
        </div>
      ),
    },
  ];

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
    handleClose();
  };

  return (
    <div className="m-10">
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Add Product
      </Button>

      <Box sx={{ height: 400, width: '100%', boxShadow: 3, borderRadius: 2 }}>
        <DataGrid
          rows={product}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          sx={{ borderRadius: 2 }}
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 3, textAlign: 'center' }}
          >
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  {...register('name')}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  {...register('price')}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  {...register('description')}
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label" fullWidth>
                  Upload Image
                  <input type="file" hidden {...register('image')} />
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
