import styles from '../styles/LoadingModal.module.css'
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Loading from '@material-ui/core/CircularProgress';

const LoadingIcon = ({open}) => {
    return (
        <Modal open={open}>
             <div className={styles.modal}>
                <Loading/>  
             </div>
        </Modal>
    );
};

export default LoadingIcon;