import { FC, forwardRef, useEffect } from "react";
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
import {
  Box,
  Checkbox,
  DialogActions,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { IAdvancedSearchQueryParams } from "@/interfaces/search";
import { advancedSearchFrontendSchema } from "@/schema/forms/advancedSearch";
import { useRouter } from "next/router";
import transformValuesIntoQuery from "@/utility/transformValuesIntoQuery";

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
  const router = useRouter();

  const closeForm = () => {
    toggleIsOpen();
    formik.resetForm();
  };

  const formik = useFormik<IAdvancedSearchQueryParams>({
    initialValues: { accepted: false, closed: false },
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
      router.push(`/search/advanced${transformValuesIntoQuery(values)}`)
      closeForm();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={closeForm}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeForm}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, fontSize: { xs: 14, sm: 18 } }}>
            Advanced search
          </Typography>
        </Toolbar>
      </AppBar>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={2} sx={{ padding: 2 }}>
          <TextField
            id="q"
            name="q"
            label="Keyword"
            value={formik.values.q}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.q)}
            helperText={formik.errors.q}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="title"
            name="title"
            label="In title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.title)}
            helperText={formik.errors.title}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="tagged"
            name="tagged"
            label="Tagged with"
            value={formik.values.tagged}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.tagged)}
            helperText={formik.errors.tagged}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="body"
            name="body"
            label="In question"
            value={formik.values.body}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.body)}
            helperText={formik.errors.body}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="answers"
            name="answers"
            label="Minimum nbr of answers"
            type="number"
            value={formik.values.answers}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.answers)}
            helperText={formik.errors.answers}
            onBlur={formik.handleBlur}
          />
          <Divider />
          <Stack direction={"row"}>
            <FormControlLabel
              control={
                <Checkbox
                  id="accepted"
                  name="accepted"
                  value={formik.values.accepted}
                  onChange={(e) =>
                    formik.setFieldValue("accepted", e.target.checked)
                  }
                />
              }
              label="Accepted"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="closed"
                  name="closed"
                  value={formik.values.closed}
                  onChange={(e) =>
                    formik.setFieldValue("closed", e.target.checked)
                  }
                />
              }
              label="Closed"
            />
          </Stack>
        </Stack>

        <DialogActions>
          <Button type="submit">Search</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AdvancedSearch;
