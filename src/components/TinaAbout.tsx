import React from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface Props {
    query: string;
    variables: object;
    data: any;
    children?: React.ReactNode;
}

export default function TinaAbout(props: Props) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const { title, body } = data.about;

    return (
        <section className="about-section">
            <h2 data-tina-field={tinaField(data.about, 'title')} style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 2rem 0' }}>{title}</h2>

            <div className="about-content" style={{ fontSize: '1.125rem', color: '#52525b', lineHeight: 1.8 }}>
                <div data-tina-field={tinaField(data.about, 'body')}>
                    <TinaMarkdown content={body} />
                </div>
            </div>
        </section>
    );
}
