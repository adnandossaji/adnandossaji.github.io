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
        <>
            <section className="hero">
                <h1 data-tina-field={tinaField(data.home, 'title')}>{title}</h1>
                <p data-tina-field={tinaField(data.home, 'description')}>{description}</p>
            </section>

            {props.children}
        </>
    );
}
