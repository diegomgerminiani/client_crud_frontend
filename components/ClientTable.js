import styles from '../styles/ClientTable.module.css'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Actions from './Actions'
import Loading from './Loading'
import ClientModal from './ClientModal'


const ClientTable = () => {

    const [rows, setRows] = useState([])
    const [params, setParams] = useState({open: false})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        FindAllClients()
    }, [])

    async function OpenClient(id){
        setLoading(true)
        axios.get(`https://580n2vjffc.execute-api.sa-east-1.amazonaws.com/dev/clients/${id}`)
        .then((response) => {
            console.table({...response.data});
            setLoading(false)
            setParams({open: true, data: {...response.data}})
        })
    }

    async function CreateClient(){
        setParams({data: null})
        setParams({open: true})
    }

    async function DeleteClient(id){
        setLoading(true)
        axios.delete(`https://580n2vjffc.execute-api.sa-east-1.amazonaws.com/dev/clients/${id}`)
            .then((response) => {
                FindAllClients().then(() => {setLoading(false)})
            })
    }

    async function FindAllClients(){
        setLoading(true)
        axios.get('https://580n2vjffc.execute-api.sa-east-1.amazonaws.com/dev/clients')
        .then((response) => {
            setRows(response.data.map((row) => {
                return (
                    <TableRow key={row.id}>
                        <TableCell size='small' align="center">{row.id}</TableCell>
                        <TableCell size='medium' align="center">{row.name}</TableCell>
                        <TableCell size='small' align="right">
                            <Actions id={row.id} viewAction={OpenClient} deleteAction={DeleteClient}/>
                        </TableCell>
                    </TableRow>
                )
            }))
            setLoading(false)
        }).catch((response) => {
            setLoading(false)
            return null
        })
    }

    return (
        <>
            <div className={styles.create}>
                <Button size="medium" variant="contained" color="primary" onClick={() => { CreateClient() }}>
                    Create New Client
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell size='small' align="center">ID</TableCell>
                            <TableCell size='medium' align="center">Name</TableCell>
                            <TableCell size='medium' align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
                <Loading open={loading}/>
                <ClientModal params={params} setParams={setParams} loading={setLoading} reload={FindAllClients}/>
            </TableContainer>
        </>
    );
};

export default ClientTable;