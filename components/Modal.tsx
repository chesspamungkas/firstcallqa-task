import CancelIcon from '@mui/icons-material/Cancel';

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className="modal-box relative">
                <div className="modal-close flex items-center justify-end">
                    <CancelIcon className='cursor-pointer' onClick={() => setModalOpen(false)} />
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal