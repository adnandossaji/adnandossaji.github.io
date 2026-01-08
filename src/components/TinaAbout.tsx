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
        <main>
            <h1 className="page-title" data-tina-field={tinaField(data.about, 'title')}>{title}</h1>

            <div data-tina-field={tinaField(data.about, 'body')}>
                <TinaMarkdown content={body} />
            </div>

            {props.children}
        </main>
    );
}
