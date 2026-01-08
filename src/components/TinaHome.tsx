import React from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';

interface Props {
    query: string;
    variables: object;
    data: any;
    children?: React.ReactNode;
}

export default function TinaHome(props: Props) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const { title, description, linkedin } = data.home;

    return (
        <section className="ultra-hero">
            <h1 data-tina-field={tinaField(data.home, 'title')} style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 1rem 0' }}>{title}</h1>
            <p data-tina-field={tinaField(data.home, 'description')} style={{ fontSize: '1.25rem', color: '#52525b', maxWidth: '600px', lineHeight: 1.5 }}>{description}</p>
        </section>
    );
}
