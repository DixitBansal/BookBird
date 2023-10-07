import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";


import { useSelector } from "react-redux";
import {
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Bookdetails from "../components/addpost/Bookdetails";
import { useDispatch } from "react-redux";
import {
  emptyAdditionalDetails,
  emptyBookDetails,
  emptyUploadDetails,
} from "../reducer/addpost.reducers";
import AdditionalDetails from "../components/addpost/AdditionalDetails";
import Upload from "../components/addpost/Upload";
import { upload } from "../api/addpost.api";
import { LoadingButton } from "@mui/lab";

// import GoogleMaps from './Location';

export default function AddPost() {
  const [showAlert, setshowAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { college, backPagePresigned, frontPagePresined } = useSelector(
    (state) => state.addPost_uploadDetails
  );
  const { bookPrice, postDescription, negotiable } = useSelector(
    (state) => state.addPost_additionalDetails
  );
  const bookDetails = useSelector(
    (state) => state.addPost_bookDetails
  );
  const [bookDFound, setBookDFound] = React.useState(false);
  const [additionalDFound, setAdditionalDFound] = React.useState(false);
  console.log("colleged", college)
  const additionalValidations = () => {
    console.log(college.id)
    if ((!college.id || frontPagePresined.length == 0 || backPagePresigned.length == 0)) {
      setAdditionalDFound(false);
    }
    else {
      setAdditionalDFound(true);
    }

  }
  const bookDValidation = () => {

    for (let key in bookDetails) {
      console.log(key);
      if (key == "foundStatus" && bookDetails[key]) {
        setBookDFound(true);
        break;
      }
      else if (key == "book_ID" || key == "foundStatus") {
        continue;
      }
      else {
        if (bookDetails[key].length == 0) {

          setBookDFound(false);
          break;
        }
        else {
          setBookDFound(true);
        }
      }
    }

  }

  React.useEffect(() => {
    bookDValidation();
  }, [bookDetails,])

  React.useEffect(() => {
    additionalValidations();

  }, [college, backPagePresigned, frontPagePresined])


  const postUploadData = {
    book: { ...bookDetails, book_ID: bookDetails.id }, sellingPrice: bookPrice, postDescription, negotiable, img_url: [frontPagePresined, backPagePresigned], college: [{ ...college, college_ID: college.id }]
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();


  const navigate = useNavigate();


  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    activeStep < 2 ? setActiveStep((prevActiveStep) => prevActiveStep + 1) : setActiveStep((prevActiveStep) => prevActiveStep);

  };

  const handleReset = (e) => {
    // console.log(e.target.id);
    const label = e.target.id;

    switch (label) {
      case "Book Details":
        dispatch(emptyBookDetails());

        break;

      case "Additional Details":
        dispatch(emptyAdditionalDetails());
        break;

      default:
        break;
    }
  };
  // const [category, setCategory] = React.useState('');

  const steps = [
    {
      label: "Book Details",
      description: <Bookdetails />,
    },
    {
      label: "Additional Details",
      description: <AdditionalDetails />,
    },
    {
      label: "Book Image & Location",
      description: <Upload />,
    },
  ];

  const uploadPost = async () => {

    setLoading(true);
    const response = await upload(postUploadData);
    console.log(response);
    if (response.data) {
      dispatch(emptyBookDetails());
      dispatch(emptyAdditionalDetails());
      dispatch(emptyUploadDetails());
      setLoading(false);
      navigate("/", { replace: true })

      console.log(response);
    }
    else {
      setshowAlert(true)
      handleClose();


    }
  }

  const error = (
    <Alert severity="error" closeText="fs" onClose={() => { setshowAlert(false) }} sx={{ marginBottom: "3rem" }}>
      <AlertTitle>Error</AlertTitle>
      Some error occured while uploading  <strong>try again!</strong>
    </Alert>
  )

  return (
    <>
      <div className="text-center  text-xl p-4 font-bold text-white bg-blue-500">
        Create Your Ad
      </div>
      <Box sx={{ maxWidth: 400, padding: 4 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                onClick={() => {
                  setActiveStep(index);
                }}
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.description}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      disabled={index === steps.length - 1 && !(bookDFound && additionalDFound)}
                      variant="contained"
                      onClick={(e) => index === steps.length - 1 ? handleClickOpen() : handleNext(e)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      onClick={handleReset}
                      sx={{ mt: 1, mr: 1, }}
                      id={step.label}
                    >
                      {index === steps.length - 1 ? "" : "Reset"}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you certain about publishing the ad?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Unlock the power of post-publish editing! Make changes to your ad even after it's posted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            {/* <Button variant="contained" onClick={uploadPost} autoFocus>
              Post
            </Button> */}
            <LoadingButton
              onClick={uploadPost}
              loading={loading}
              endIcon={<AddAPhotoIcon sx={{ display: "inline-block" }} />}
              loadingPosition="end"
              variant="contained"
              component="label"
              sx={{ minWidth: "30%", marginX: "0.3rem" }}
            >
              <Typography sx={{ fontSize: "0.75rem", fontWeight: "700" }}>
                {" "}
                Post
              </Typography>
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <Box sx={{ display: 'flex' }}>
          <Fade in={showAlert}>{error}</Fade>
        </Box>




      </Box>
    </>
  );
}


