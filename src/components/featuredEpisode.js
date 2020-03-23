import React from "react"
import { StaticQuery, graphql } from "gatsby";
import get from "lodash/get";
import Img from "gatsby-image";

const Component = ({ episode }) => {
  if (!episode) return null;

  return (
    <section className="featured-episode">
      <h2 className="featured-episode__title">{`Episode ${episode.frontmatter.episode_number}: ${episode.frontmatter.title}`}</h2>
      <div className="featured-episode__content">
        <Img className="featured-episode__cover" fluid={episode.frontmatter.cover.childImageSharp.fluid} />
        <div className="featured-episode__body">
          <div className="featured-episode__description" dangerouslySetInnerHTML={{ __html: episode.html }} />
          <audio className="featured-episode__player" controls={true} preload="none">
            <source src={episode.frontmatter.audio} />
          </audio>
        </div>
      </div>
    </section>
  )
};

export default () => (
  <StaticQuery
    query={graphql`
      query featuredEpisodeQuery {
        allMarkdownRemark(
          sort: { fields: [frontmatter___release_date], order: DESC },
          limit: 1
        ) {
          edges {
            node {
              frontmatter {
                title
                episode_number
                release_date
                audio
                cover {
                  childImageSharp{
                    fluid(maxWidth: 500, maxHeight: 500) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              html
            }
          }
        }
      }
    `}

    render={data => {
      return <Component episode={get(data, "allMarkdownRemark.edges[0].node")} />;
    }}
  />
);
