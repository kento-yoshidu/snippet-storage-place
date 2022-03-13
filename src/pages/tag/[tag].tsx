import { getTags } from "../../lib/getTags"
import { getPostsByTag } from "../../lib/getPostsByTag"

import { PostList } from "../../components/postList"

export const getStaticPaths = async () => {
  const paths = getTags().map((tag) => {
    return `/tag/${tag}`
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const tag = params.tag

  const postData = await getPostsByTag(tag)

  return {
    props: {
      postData,
      tag
    }
  }
}

const Post = ({ postData, tag }: { postData: any, tag: string }) => (
  <PostList
    pageTitle={`${tag} タグの記事一覧`}
    allPosts={postData}
  />
)

export default Post