/** @jsx h */
import { RefreshIcon } from '@heroicons/react/outline/index.js'
import Fuse from 'fuse.js'
import { Fragment, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import SEO from '../components/seo/index.js'
import { SiteMetadata } from '../site-config.js'
import { ogImageUrl } from '../util/og-image.js'

export default function Garden({ posts }) {
  const [query, updateQuery] = useState(``)
  const searchRef = useRef(null)
  const [blogName, setBlogName] = useState(``)

  const sillyName = [
    `Thought Pamphlet`,
    `Fancy Book`,
    `Digital Garden`,
    `Commentary Chronicle`,
    `Beautiful Registry`,
    `Thoughts Symposium`,
    `Compose Journal`,
    `Opus Brochure`,
  ]

  const changeBlogName = () => {
    const rando = Math.floor(Math.random() * sillyName.length)
    setBlogName(sillyName[rando])
  }

  useEffect(() => {
    changeBlogName()
  }, [])

  // TODO: add a tags array for buttons

  const options = {
    includeScore: true,
    keys: ['title', 'tags', 'description'],
    includeMatches: true,
    threshold: 0.5,
  }
  const fuse = new Fuse(posts, options)

  const results = fuse.search(query)
  const searchResults = query
    ? results.map(result => result.item)
    : posts

  function onSearch({ currentTarget = {} }) {
    updateQuery(currentTarget.value)
  }

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  const {
    siteTitle,
    siteAuthorName,
    siteDescription,
    siteUrl,
    siteTwitter,
    siteLanguage,
    siteLocale,
  } = SiteMetadata

  return (
    <Fragment>
      <SEO
        title="Writing"
        titleTemplate={siteTitle}
        description={siteDescription || 'nothin’'}
        image={ogImageUrl(siteAuthorName, 'scottspence.com', `Blog`)}
        pathname={`${siteUrl}/garden/`}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={siteTwitter}
      />
      <h1 class="mb-1">
        This is my <span class="text-primary-200">{blogName}</span>
      </h1>
      <div>
        <a
          href="2020/04/27/a-digital-garden/"
          class="text-primary-200 inline-block mb-8 font-bold tracking-wider"
        >
          What's this?
        </a>
        <span class="inline-block">
          <button onClick={changeBlogName} class="ml-3">
            <RefreshIcon class="w-3 h-3" />
          </button>
        </span>
      </div>

      <form>
        <label class="block" htmlFor="search">
          Search:
        </label>
        <input
          class="shadow-theme-xl block mb-6 mt-1 p-2 w-full bg-transparent rounded-lg"
          name="search"
          id="search"
          type="text"
          placeholder="Search the things!"
          value={query}
          onChange={onSearch}
          ref={searchRef}
        />
      </form>
      <div>
        {searchResults.map(post => {
          return (
            <Fragment>
              {!post.private ? (
                <a
                  href={post.slug}
                  alt={post.description}
                  class="no-underline hover:underline"
                >
                  <article class="shadow-theme-xl mb-6 p-4 rounded-lg">
                    <h2 class="mb-1 text-2xl font-bold">
                      {post.title}
                    </h2>
                    <div class="mb-4 text-xs font-semibold uppercase">
                      {post.timeToRead} minutes to read
                    </div>
                    <p
                      class="no-underline"
                      style={{ marginBottom: 0 }}
                    >
                      {post.description}
                    </p>
                  </article>
                </a>
              ) : null}
            </Fragment>
          )
        })}
      </div>
    </Fragment>
  )
}
