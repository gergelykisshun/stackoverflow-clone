import { FC, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSearchStore } from "@/store/searchStore";
import { DialogActions, Divider, TextField } from "@mui/material";
import { useFormik } from "formik";
import { IAdvancedSearchQueryParams } from "@/interfaces/search";
import { advancedSearchFrontendSchema } from "@/schema/forms/advancedSearch";

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

  const formik = useFormik<IAdvancedSearchQueryParams>({
    initialValues: {},
    validate: (values) => {
      const errors: IAdvancedSearchQueryParams = {};
      if (!values.title && !values.q && !values.tagged && !values.body) {
        errors.q = "at least one is required";
        errors.title = "at least one is required";
        errors.tagged = "at least one is required";
        errors.body = "at least one is required";

        return errors;
      }
    },
    validationSchema: advancedSearchFrontendSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      toggleIsOpen();
    },
  });

  // MISSING STILL
  // accepted?: boolean;
  // closed?: boolean;

  // answers? : number;

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
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="q"
            name="q"
            label="Keyword"
            value={formik.values.q}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.q)}
            helperText={formik.errors.q}
          />
          <TextField
            fullWidth
            id="title"
            name="title"
            label="In title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.title)}
            helperText={formik.errors.title}
          />
          <TextField
            fullWidth
            id="tagged"
            name="tagged"
            label="Tagged with"
            value={formik.values.tagged}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.tagged)}
            helperText={formik.errors.tagged}
          />
          <TextField
            fullWidth
            id="body"
            name="body"
            label="In question"
            value={formik.values.body}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.body)}
            helperText={formik.errors.body}
          />
          <Divider />

          <DialogActions>
            <Button type="submit">Search</Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default AdvancedSearch;
