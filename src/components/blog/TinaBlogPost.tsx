import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import FormattedDate from './FormattedDateWrapper';

interface Props {
    query: string;
    variables: object;
    data: any;
}

export default function TinaBlogPost(props: Props) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const post = data.blog;

    return (
        <article className="blog-post">
            <header className="post-header">
                <div className="post-date mono-meta" data-tina-field={props.data.blog._editable?.pubDate}>
                    <FormattedDate date={new Date(post.pubDate)} />
                    {post.updatedDate && (
                        <span data-tina-field={props.data.blog._editable?.updatedDate}>
                            / Updated <FormattedDate date={new Date(post.updatedDate)} />
                        </span>
                    )}
                </div>
                <h1 className="post-title" data-tina-field={props.data.blog._editable?.title}>{post.title}</h1>
            </header>

            {post.heroImage && (
                <img
                    src={post.heroImage}
                    alt={post.title}
                    className="post-hero-image"
                    data-tina-field={props.data.blog._editable?.heroImage}
                />
            )}

            <div className="post-content" data-tina-field={props.data.blog._editable?.body}>
                <TinaMarkdown content={post.body} />
            </div>
        </article>
    );
}
