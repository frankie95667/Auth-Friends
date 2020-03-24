import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosWithAuth } from "../utils/axiosAuth";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Close from '@material-ui/icons/Close'

const useStyle = makeStyles(theme => ({
  root: {
    width: "50%",
    margin: "0 auto",
    textAlign: "center"
  },
  margin: {
    margin: "10px 0"
  },
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    padding: "20px"
  },
  inputLabel: {
    marginLeft: theme.spacing(1)
  },
  close: {
      position: 'absolute',
      top: '5px',
      right: '5px'
  }
}));

const Dashboard = props => {
  const classes = useStyle();
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);
  const [openUpdateFriendModal, setOpenUpdateFriendModal] = useState(false);
  const [friend, setFriend] = useState({
    name: "",
    email: ""
  });
  const [friendId, setFriendId] = useState(null);

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = () => {
    setIsLoading(true);
    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        setFriends(res.data);
        setIsLoading(false);
      });
  };

  const handleOpenAddFriend = () => {
    setOpenAddFriendModal(true);
  };

  const handleCloseAddFriend = () => {
    setOpenAddFriendModal(false);
  };

  const handleOpenUpdateFriend = (friend) => {
    setOpenUpdateFriendModal(true);
    setFriend(friend);
    setFriendId(friend.id);
  };

  const handleCloseUpdateFriend = () => {
    setOpenUpdateFriendModal(false);
  };

  const handleChange = e => {
    setFriend({
      ...friend,
      [e.target.name]: e.target.value
    });
  };

  const addFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", friend)
      .then(res => {
        console.log(res);
        setFriends(res.data);
        setFriend({
          name: "",
          email: ""
        });
        setOpenAddFriendModal(false);
      })
      .catch(err => console.error(err.message));
  };

  const updateFriend = (e) => {
      e.preventDefault();
      axiosWithAuth()
        .put(`/api/friends/${friendId}`, friend)
        .then(res => {
            console.log(res);
            setFriends(res.data);
            setFriend({
                name: '',
                email: ''
            })
            setOpenUpdateFriendModal(false);
        })
        .catch(err => console.error(err.message))
  }

  const deleteFriend = (id) => {
      axiosWithAuth()
        .delete(`/api/friends/${id}`)
        .then(res => {
            console.log(res);
            setFriends(res.data);
        })
        .catch(err => console.error(err.message))
  }

  return (
    <div className={classes.root}>
      <h1>Dashboard</h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <List>
            {friends.map(friend => {
              return (
                <Paper className={classes.margin}>
                  <ListItem alignItems="flex-start" key={friend.id}>
                    <ListItemAvatar>
                      <Avatar onClick={() => handleOpenUpdateFriend(friend)}>{friend.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.name}
                      secondary={<p>Email: {friend.email}</p>}
                    />
                    <IconButton className={classes.close} onClick={() => deleteFriend(friend.id)}>
                        <Close />
                    </IconButton>
                  </ListItem>
                </Paper>
              );
            })}
          </List>
          <Modal
            className={classes.modal}
            open={openAddFriendModal}
            onClose={handleCloseAddFriend}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 400
            }}
          >
            <Fade in={openAddFriendModal}>
              <Paper className={classes.paper}>
                <form onSubmit={addFriend}>
                  <h2>Add Friend</h2>
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel className={classes.inputLabel} htmlFor="name">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      id="name"
                      name="name"
                      value={friend.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel className={classes.inputLabel} htmlFor="email">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      value={friend.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Button
                    className={classes.margin}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </Paper>
            </Fade>
          </Modal>
          <Modal
            className={classes.modal}
            open={openUpdateFriendModal}
            onClose={handleCloseUpdateFriend}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 400
            }}
          >
            <Fade in={openUpdateFriendModal}>
              <Paper className={classes.paper}>
                <form onSubmit={updateFriend}>
                  <h2>Add Friend</h2>
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel className={classes.inputLabel} htmlFor="name">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      id="name"
                      name="name"
                      value={friend.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel className={classes.inputLabel} htmlFor="email">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      value={friend.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Button
                    className={classes.margin}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </Paper>
            </Fade>
          </Modal>
          <Fab
            onClick={handleOpenAddFriend}
            className={classes.fab}
            color="primary"
          >
            <AddIcon />
          </Fab>
        </>
      )}
    </div>
  );
};

export default Dashboard;
