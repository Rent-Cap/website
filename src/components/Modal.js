import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { QuickContactForm } from '../components/Contact';
import { StyledPrimaryButton } from "../components/Buttons";
import AppContext from "./AppContext";

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

var dict = {
    en: {
        button: "I'm Looking for Help!",
        title: "Connect With Us!",
        description: "Share your contact information & we will follow up shortly!",
        close: "Close",
    },
    es: {
        button: "Estoy Buscando Ayuda!",
        title: "Conéctate con Nosotros!",
        description: "¡Comparta su información de contacto y nos pondremos en contacto con usted en breve!",
        close: "Cerrar",
    }
};

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppContext.Consumer>
      {({ appCtx }) => (
        <div>
          <StyledPrimaryButton onClick={handleOpen} type="button">{dict[appCtx.lang].button}</StyledPrimaryButton>&nbsp;
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="text-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">{dict[appCtx.lang].title}</h2>
                <p class="text-description">{dict[appCtx.lang].description}</p>
                <QuickContactForm autohide={true} />
                <p className="center-layout"><StyledPrimaryButton onClick={handleClose} type="button">{dict[appCtx.lang].close}</StyledPrimaryButton></p>
              </div>
            </Fade>
          </Modal>
        </div>
      )}
    </AppContext.Consumer>
  );
}
