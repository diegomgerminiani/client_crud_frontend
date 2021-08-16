import styles from '../styles/ClientModal.module.css'
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ClientModal = (props) => {
    const { setParams, params, loading, reload } = props
    const [open, setOpen] = useState(params.open);
    const [id, setID] = useState();
    const [name, setName] = useState();
    const [cpf, setCPF] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [txt, setTXT] =  useState({title: 'Create new client', btn: 'Create'})
    
    useEffect(() => {
        setOpen(params.open)
        if(params.data){
            setTXT({title: 'Update client', btn: 'Update'})
            setID(params.data.id)
            setName(params.data.name)
            setCPF(params.data.cpf)
            setPhone(params.data.phone)
            setAddress(params.data.address)
        }else{
            setTXT({title: 'Create new client', btn: 'Create'})
            setID()
            setName()
            setCPF()
            setPhone()
            setAddress()
        }
    }, [params.open])

    function handleSubmit(e) {
        e.preventDefault();
        loading(true)
        if (!params.data) {
            axios.post(`https://580n2vjffc.execute-api.sa-east-1.amazonaws.com/dev/clients`, { name, cpf, phone, address })
            .then((response) => {
                setParams({ open: false})
                reload()
            }).catch((error) => {
                console.log(error);
            })
        } else {
            axios.put(`https://580n2vjffc.execute-api.sa-east-1.amazonaws.com/dev/clients`, { id, name, cpf, phone, address })
                .then((response) => {
                    setParams({ open: false})
                    reload()
                }).catch((error) => {
                    console.log(error);
                })
        }
    };

    const handleClose = () => {
        setParams({ open: false })
    };

    return (
        <Modal open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div className={styles.modal}>
                <form className={styles.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <h2>{txt.title}</h2>
                    <TextField id="name" label="Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                    <TextField id="cpf" label="CPF" value={cpf} onChange={(e) => { setCPF(e.target.value) }} required />
                    <TextField id="phone" label="Phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} required />
                    <TextField
                        id="address"
                        label="Address"
                        multiline
                        maxRows={4}
                        required
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                    <div className={styles.buttons} >
                        <Button size="small" variant="contained" color="primary" type='submit'>
                            {txt.btn}
                        </Button>
                        <Button size="small" variant="outlined" color="secondary" onClick={() => { handleClose() }}>
                            Close
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>)

};

export default ClientModal;