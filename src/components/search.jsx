import {  useContext, } from "react";
import { APP_DATA } from "../App";
import {
  Dialog,
  TextField,
  InputAdornment,
  DialogContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  List,
} from "@mui/material";
//import debounce from "debounce";
import WestIcon from "@mui/icons-material/West";
import {useNavigate} from "react-router-dom";
const Search = () => {
  const navigate=useNavigate();
  const { state, dispatch} = useContext(APP_DATA);
  return (
    <>
      <Dialog
        fullScreen
        open={state.show_dialog}
        onClose={() => dispatch({ type: "close-dialog-box" })}
      >
        <DialogContent>
          <TextField
            id=""
            label="Search country"
            variant="outlined"
            color="primary"
            margin="none"
            sizes="small"
            fullWidth
            onChange={(e) => {
              dispatch({type:'search-countries',payload:e.target.value})
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => dispatch({ type: "close-dialog-box" })}
                >
                  <WestIcon />
                </InputAdornment>
              ),
            }}
          />

          {state.list?.map((country, index) => {
            const { name, flags, region } = country;
            return (
              <List key={index} onClick={()=>document.startViewTransition(()=>navigate(`/${name.official??name.common}`))}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={flags.png} alt="" />
                  </ListItemAvatar>
                  <ListItemText primary={name.official} secondary={region} />
                </ListItem>
                <Divider />
              </List>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Search;
