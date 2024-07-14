import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GetProducts } from "../../services/products/index";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct } from "../../redux/products/Action";
import Form from "./Form";

const List = () => {
  const gridRef = useRef();

  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100%", marginTop: 2 }),
    []
  );

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [delVal, setDelVal] = useState("");
  const [productToEdit, setProductToEdit] = useState(null);

  const dispatch = useDispatch();

  const items = useSelector((state) => state?.products);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      minWidth: 150,
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const columnDefs = [
    {
      field: "name",
      filter: "agTextColumnFilter",
      cellStyle: { textAlign: "left" },
    },
    {
      field: "description",
      filter: "agTextColumnFilter",
      cellStyle: { textAlign: "left" },
    },
    {
      field: "price",
      filter: "agNumberColumnFilter",
      cellStyle: { textAlign: "right" },
      valueGetter: (p) => parseInt(p.data.price),
    },
    {
      field: "category",
      filter: "agTextColumnFilter",
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Edit",
      field: "Edit",
      cellStyle: { textAlign: "center" },
      cellRenderer: (params) => (
        <Button
          sx={{ display: "flex", justifyContent: "center", color: "black" }}
          onClick={() => handleEditOpen(params?.data)}
        >
          <Edit />
        </Button>
      ),
    },

    {
      headerName: "Delete",
      field: "delete",
      cellStyle: { textAlign: "center" },
      cellRenderer: (params) => (
        <Button
          sx={{ display: "flex", alignItems: "center", color: "black" }}
          onClick={() => handleRemoveOpen(params.data.id)}
        >
          <Delete />
        </Button>
      ),
    },
  ];

  const handleRemoveOpen = (val) => {
    setDelOpen(true);
    setDelVal(val);
  };

  const handleRemoveClose = () => {
    setDelOpen(false);
  };

  const handleEditOpen = (data) => {
    setEditOpen(true);
    setProductToEdit(data);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleRemove = () => {
    const deleteVal = rowData?.filter((item) => item?.id !== delVal);
    setRowData(deleteVal);
    dispatch(deleteProduct(delVal));
    toast.success("Item Removed Successfully.");
    setDelOpen(false);
  };

  const editProduct = (updatedProduct) => {
    setRowData(
      rowData.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setProductToEdit(null);
  };

  //Gettig Products data
  const getProducts = async () => {
    try {
      if (items?.products?.length === 0) {
        const res = await GetProducts();
        setRowData(res?.data);
        dispatch(getProduct(res?.data));
      } else {
        setRowData(items?.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onGridReady = useCallback(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ag-theme-alpine" style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          domLayout="autoHeight"
          rowHeight={50}
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 500 } }}
      >
        <Form
          editProduct={editProduct}
          productToEdit={productToEdit}
          handleEditClose={handleEditClose}
        />
      </Dialog>

      <Dialog
        open={delOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>

        <DialogActions>
          <Button variant="contained" color="success" onClick={handleRemove}>
            Yes
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveClose}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default List;
