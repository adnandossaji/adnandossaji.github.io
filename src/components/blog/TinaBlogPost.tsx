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
            <div className="post-header">
                <div className="post-meta">
                    <div className="post-date">
                        <span className="date-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                            </svg>
                        </span>
                        <span data-tina-field={data.blog._editable?.pubDate}>
                            <FormattedDate date={new Date(post.pubDate)} />
                        </span>
                        {post.updatedDate && (
                            <span className="updated-date" data-tina-field={data.blog._editable?.updatedDate}>
                                · Updated <FormattedDate date={new Date(post.updatedDate)} />
                            </span>
                        )}
                    </div>
                </div>
                <h1 className="post-title" data-tina-field={data.blog._editable?.title}>{post.title}</h1>
            </div>

            <div className="hero-image" data-tina-field={data.blog._editable?.heroImage}>
                {post.heroImage && <img src={post.heroImage} alt={post.title} />}
            </div>

            <div className="post-content" data-tina-field={data.blog._editable?.body}>
                <TinaMarkdown content={post.body} />
            </div>
        </article>
    );
}
