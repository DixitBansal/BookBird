import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Modal, Stack, TextField } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from "@mui/icons-material/Circle"
import { useTheme } from '@emotion/react';
import { useNavigate, Link } from 'react-router-dom';
// actions
import { setPostDesc } from "../../reducer/postdescription.reducer.js"
import { titleCase } from '../../utils/stringUtils.js';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Cards({ data }) {

  const theme = useTheme()
  const navigator = useNavigate()
  const dispatch = useDispatch()

  const [expanded, setExpanded] = React.useState(false);

  function calculateAgoTime() {
    const agoDate = new Date(data.post_date)
    const today = new Date(Date.now())
    let x = null
    // year and month
    x = today.getFullYear() - agoDate.getFullYear()
    if (x !== 0) {
      return `${x} yr`
    }
    x = today.getMonth() - agoDate.getMonth()
    if (x !== 0) {
      return `${x} mth.`
    }
    x = today.getDay() - agoDate.getDay()
    if (x !== 0) {
      return `${x} dy`
    }
    x = today.getHours() - agoDate.getHours()
    if (x !== 0) {
      return `${x} hr`
    }
    x = today.getMinutes() - agoDate.getMinutes()
    if (x !== 0) {
      return `${x} min.`
    }
    x = today.getSeconds() - agoDate.getSeconds()
    return `${x} sec.`
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleDetailPageNav(event) {
    // set the details to the post description reducer
    dispatch(setPostDesc(data))
    navigator(`/details/${data.id}`)
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ width: "100%", margin: "0px 0px", overflow: "hidden", marginTop: "0px" }} onClick={(event) => {
      handleDetailPageNav(event)
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ zIndex: "99" }} aria-label="recipe">
          </Avatar>
        }
        action={
          <div>
            <>
              <IconButton onClick={handleOpen}>
                <CallIcon sx={{ fontSize: "28px" }} />
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Write a message..." variant="standard" />
                  </Box>
                  <Stack direction="row" spacing={2} marginTop={"20px"}>
                    <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon />}>
                      Send
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </>
          </div>
        }
        title={titleCase(data.userNames)}
        subheader={titleCase(data.collegeName)}
      />


      <Link to={`/details/${data.id}`}>
        <CardMedia sx={{ height: "250px", width: "100%" }}
          component="img"
          image={`${data.img_urls.split(",")[0]}`}
          alt="BookDee"
        />
      </Link>
      <CardContent sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Box>
          <Typography className='font-bold text-3xl  mt-3 text-slate-900' style={{
            color: theme.palette.secondary.darkHeading,
            fontWeight: theme.typography.bookHeading,
            fontSize: theme.typography.bookHeadingSize
          }}>
            {data.bookName.toUpperCase()}
          </Typography>
          <Typography style={{
            color: theme.palette.secondary.text,
            fontSize: theme.typography.subHeadingSize
          }}>
            {data.subject}
          </Typography>
          <Box display={"flex"}>
            <Typography variant='subtitle2' style={{
              color: theme.palette.secondary.darkHeading
            }}>Edition</Typography>
            <Typography variant='subtitle2'><CircleIcon sx={{
              marginRight: "10px",
              marginLeft: "10px",
              fontSize: "7px"
            }} /></Typography>
            <Typography variant='subtitle2' sx={{
              color: theme.palette.secondary.text
            }}>{data.bookEdition}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography sx={{
            fontSize: "0.75rem"
          }}>
            <span className='font-semibold'>Posted :</span>{calculateAgoTime()} ago
          </Typography>
          <p className='mt-3 text-slate-900 mx-5 flex items-center justify-end'>
            <CurrencyRupeeIcon sx={{
              "fontSize": "18px"
            }} />
            <span className='font-bold text-[24px]'>{data.sellingPrice}</span>
          </p>
        </Box>
      </CardContent>
    </Card>
  );
}