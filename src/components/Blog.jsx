import React from 'react';

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Blog title variable</title>
      </Helmet>
      <main>
        <article>
          <div className='container'>
            <section className='blog-post'>
              <header>
                <h1>Blog Post Title</h1>
                <p class='post-meta'>
                  <span>
                    Published on{' '}
                    <time datetime='2024-11-26'>November 26, 2024</time>
                  </span>
                  <span>
                    {' '}
                    | By <a href='/author/john-doe'>John Doe</a>
                  </span>
                  <span>
                    {' '}
                    | Category:{' '}
                    <a href='/category/web-development'>Web Development</a>
                  </span>
                </p>
                {/* Featured Image */}
                <figure>
                  <img src='image.jpg' alt='Description of the image'></img>
                  <figcaption>
                    Caption for the featured image (if necessary).
                  </figcaption>
                </figure>
              </header>

              {/* Blog text content */}
              <div>
                <p>
                  Introduction to the blog post. This is where you give a brief
                  overview or hook for the reader.
                </p>

                <h2>Subheading 1</h2>
                <p>
                  Content under the first subheading. This could include text,
                  images, lists, and other HTML elements.
                </p>

                <h2>Subheading 2</h2>
                <p>Content under the second subheading.</p>
                {/* Example of a blockquote  */}
                <blockquote>
                  <p>
                    This is an example of a quote that you want to highlight.
                  </p>
                  <cite>— Source of the quote</cite>
                </blockquote>
              </div>
            </section>
            <section id='comments'>
              <h2>Comments</h2>
              <ul>
                <li>
                  <p>
                    <strong>Jane Doe:</strong> Great post! Thanks for sharing.
                  </p>
                  <p>
                    <time datetime='2024-11-26T12:34'>
                      November 26, 2024, 12:34 PM
                    </time>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>John Smith:</strong> This was really helpful,
                    especially the part about semantic HTML.
                  </p>
                  <p>
                    <time datetime='2024-11-26T13:45'>
                      November 26, 2024, 1:45 PM
                    </time>
                  </p>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>
    </>
  );
};

export default Blog;
