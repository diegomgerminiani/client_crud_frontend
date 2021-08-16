import styles from '../styles/Actions.module.css'
import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ViewIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

const Actions = (props) => {

    const { id, viewAction, deleteAction } = props

    return (
        <div className={styles.actions}>
            <ButtonGroup size="medium" aria-label="medium outlined button group">
                <Button onClick={() => {viewAction(id)}}><ViewIcon color="primary"/></Button>
                <Button onClick={() => {deleteAction(id)}}><DeleteIcon color="secondary"/></Button>
            </ButtonGroup>
        </div>
    );
};

export default Actions;