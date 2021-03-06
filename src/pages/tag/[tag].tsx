import Head from "next/head"

import { getTags } from "../../lib/getTags"
import { getPostsByTag } from "../../lib/getPostsByTag"

import { siteConfig } from "../../../site.config"
import { PostList } from "../../components/postList"
import { PageTitle } from "../../components/pageTitle"

export const getStaticPaths = async () => {
  const paths = Object.keys(getTags()).map((tag) => {
    return `/tag/${tag}`
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: { tag: string }}) => {
  const tag = params.tag

  const postData = await getPostsByTag(tag)

  return {
    props: {
      postData,
      tag
    }
  }
}

const Post = ({ postData, tag }: { postData: Item[], tag: string }) => (
  <>
    <Head>
      <title>{`${tag} タグの記事一覧 | ${siteConfig.siteData.title}`}</title>
    </Head>

    <PageTitle
      pageTitle={`${tag} タグの記事一覧`}
      count={postData.length}
    />

    <PostList
      allPosts={postData}
    />
  </>
)

export default Post
