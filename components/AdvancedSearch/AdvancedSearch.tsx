import { FC, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSearchStore } from "@/store/searchStore";
import { DialogActions } from "@mui/material";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {};

const AdvancedSearch: FC<Props> = () => {
  const isOpen = useSearchStore((state) => state.advancedSearchIsOpen);
  const toggleIsOpen = useSearchStore((state) => state.toggleAdvancedSearch);

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={toggleIsOpen}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleIsOpen}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, fontSize: { xs: 14, sm: 18 } }}>
            Advanced search
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
      </List>
      <DialogActions>
        <Button onClick={toggleIsOpen}>Search</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvancedSearch;
