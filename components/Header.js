import React from 'react';
import Head from 'next/head'

const Header = (props) => {
    const { title } = props
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Desenvolvido por Diego M. Germiniani" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default Header;