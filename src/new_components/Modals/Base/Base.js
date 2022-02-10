import classes from "./Base.module.scss"
import Modal from "react-modal"
import { ReactComponent as CloseIcon } from "new_assets/icons/close.svg"

Modal.setAppElement("#root")

export const BaseModal = ({ isOpen, onClose, children }) => (
  <Modal
    closeTimeoutMS={300}
    isOpen={isOpen}
    className={classes.modal}
    overlayClassName={classes.overlay}
  >
    <div className={classes.header}>
      <button type="button" onClick={onClose} className={classes.close}>
        <CloseIcon />
      </button>
    </div>

    <div className={classes.content}>{children}</div>
  </Modal>
)
