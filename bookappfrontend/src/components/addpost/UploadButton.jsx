import { Box, Button, InputLabel, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { deletePresignedUrl, getURL } from "../../api/addpost.api";
import { useDispatch } from "react-redux";
import {
  emptyBackPagePresigned,
  emptyFrontPagePresigned,
  setBackPagePresigned,
  setFrontPagePresigned,
} from "../../reducer/addpost.reducers";
import { login } from "../../api/auth.api";
import ReactCrop from 'react-image-crop';
import { AccountCircle } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import Resizer from 'react-image-file-resizer';

export default function UploadButton({ label, getPresignedUrlFunction, preSignedUrl }) {
  const dispatch = useDispatch();
  const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    height: "500px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: "hidden",

  };
  const imageRef = useRef(null);
  const [loading, setloading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [file, setFile] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);

  const [labelText, setLabelText] = useState("Choose a file");

  const dispatchUrl = (url) => {
    switch (label) {
      case "Front Page":
        dispatch(setFrontPagePresigned(url));

        break;
      case "Back Page":
        dispatch(setBackPagePresigned(url));
        break;

      default:
        break;
    }
  };

  const deleteUrl = () => {
    switch (label) {
      case "Front Page":
        dispatch(emptyFrontPagePresigned());

        break;
      case "Back Page":
        dispatch(emptyBackPagePresigned());
        break;

      default:
        break;
    }
  }

  const clearInputImage = () => {
    imageRef.current.value = null;
  }

  const uploadError = () => {
    setLabelText("some error occured!");
    setloading(false);
    setFile({});
    clearInputImage();

  }

  const handleClose = async () => {
    clearInputImage();
    setloading(false);
    setFile({});
    setLabelText("Choose a file");
    let response = "";
    if (preSignedUrl) {

      response = await deletePresignedUrl(preSignedUrl);
    }
    console.log(response);

    deleteUrl();

  }

  const uploadImage = async () => {
    if (file) {
      console.log(preSignedUrl.length);
      if (preSignedUrl.length > 0) {
        const response = await deletePresignedUrl(preSignedUrl);
        console.log(response);

      }

      // console.log(file);
      setFile(file);
      setLabelText(file.name);
      setloading(true);
    }
    let promise = new Promise((resolve, reject) => {
      const data = {
        fileFormat: file.type,
        type: "post",
      };
      const response = getPresignedUrlFunction(data);
      if (response) {
        resolve(response);
      }
      else {
        reject(console.log("error while getting presigned url"), uploadError());
      }
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const url = response.data.result;

          console.log(url);
          const URLresponse = getURL(file, url);
          console.log("response=", URLresponse)
          return URLresponse;
        }
        else {
          return uploadError();

        }
      }).then((response) => {
        console.log(response);

        if (response?.ok) {
          const image_url = response.url?.split("?Content")?.[0];

          dispatchUrl(image_url);
          setLabelText(file.name);
          setloading(false);


          console.log("File uploaded successfully");
          clearInputImage();
          console.log(image_url);
          return image_url;
        } else {
          return uploadError();
        }
      })
      .catch((err) => {
        setloading(false);

        console.log(err);
      });



  }


  const newHandleChange = (e) => {

    if (e.target.files && e.target.files.length > 0) {
      setOpenModal(true);
      const file = e.target.files[0];
      Resizer.imageFileResizer(
        file,
        300, // maximum width
        300, // maximum height
        'JPEG', // output format
        50, // quality
        0, // rotation
        (compressedFile) => {
          // Handle the compressed file
          console.log('Compressed File:', compressedFile);
          
          
          // Generate preview URL
          setFile(compressedFile);
          const previewURL = URL.createObjectURL(compressedFile);
          console.log('Preview URL:', previewURL);
          setPreviewUrl(previewURL);

          // Use the previewURL as needed (e.g., display the preview image)
        },
        'blob' // output type ('blob' or 'base64')
      );

    }
  }



  const handleCloseModal = () => {
    setOpenModal(false);
    clearInputImage();
    setFile({});

  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          {/* sx={{ display: 'flex', alignItems: 'flex-end' }} */}

          {previewUrl && <img src={previewUrl} style={{ width: "100%", height: "250px", display: "block", margin: "auto" }} alt="Preview" />}


          <Stack className="absolute bottom-2 right-5 " direction="row" spacing={2} marginTop={"20px"} >
            <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={() => {
              uploadImage();
              setOpenModal(false)
            }}>
              Upload
            </Button>
          </Stack>

        </Box>
      </Modal>
      <Box
        sx={{ display: "flex", marginTop: "0.8rem", marginBottom: "0.6rem" }}
      >
        <LoadingButton
          loading={loading}
          endIcon={<AddAPhotoIcon sx={{ display: "inline-block" }} />}
          loadingPosition="end"
          variant="contained"
          component="label"
          sx={{ minWidth: "50%" }}
        >
          <Typography sx={{ fontSize: "0.75rem", fontWeight: "700" }}>
            {" "}
            {label}
          </Typography>
          <input
            hidden
            accept="image/*"
            onChange={(e) => newHandleChange(e)}
            multiple
            type="file"
            ref={imageRef}
          />
        </LoadingButton>

        <InputLabel sx={{ padding: "5px" }}>
          <CloseIcon
            sx={file?.name && !loading ? { display: "inline-block" } : { display: "none" }}
            onClick={() => {
              handleClose();

            }}
          />{" "}
          {labelText}
        </InputLabel>
      </Box>


    </>
  );
}
