/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'fragment EditorChoiceData on EditorChoice {\n  outlink\n  heroImage {\n    ...HeroImage\n  }\n  choices {\n    ...PostItem\n  }\n}':
    types.EditorChoiceDataFragmentDoc,
  'fragment HeroImage on Photo {\n  id\n  resized {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n  resizedWebp {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n}':
    types.HeroImageFragmentDoc,
  'fragment PostDetails on Post {\n  title\n  createdAt\n  brief\n  slug\n  content\n  heroImage {\n    ...HeroImage\n  }\n}\n\nfragment PostItem on Post {\n  title\n  slug\n  heroImage {\n    ...HeroImage\n  }\n}':
    types.PostDetailsFragmentDoc,
  'fragment LatestShorts on Video {\n  id\n  name\n  videoSrc\n  heroImage {\n    ...HeroImage\n  }\n}':
    types.LatestShortsFragmentDoc,
  'query GetCategoryInformation($slug: String) {\n  category(where: {slug: $slug}) {\n    slug\n    name\n    state\n    sections {\n      slug\n      color\n    }\n  }\n}':
    types.GetCategoryInformationDocument,
  'query GetAuthorInformation($id: ID!) {\n  contact(where: {id: $id}) {\n    id\n    name\n  }\n}':
    types.GetAuthorInformationDocument,
  'query GetEditorChoices {\n  editorChoices(\n    orderBy: [{order: asc}]\n    take: 10\n    where: {state: {equals: "published"}}\n  ) {\n    ...EditorChoiceData\n  }\n}':
    types.GetEditorChoicesDocument,
  'query GetLiveEventForHomepage($startDate: DateTime!) {\n  events(\n    orderBy: {publishedDate: desc}\n    take: 1\n    where: {eventType: {equals: "livestreaming"}, state: {equals: "published"}, startDate: {lte: $startDate}}\n  ) {\n    name\n    link\n    heroImage {\n      ...HeroImage\n    }\n  }\n}':
    types.GetLiveEventForHomepageDocument,
  'query GetGames {\n  games(take: 5, orderBy: {sortOrder: asc}, where: {state: {equals: "published"}}) {\n    name\n    descriptions\n    link\n    heroImage {\n      ...HeroImage\n    }\n  }\n}':
    types.GetGamesDocument,
  'query GetPostsBySectionSlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {sections: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetFlashNews {\n  posts(\n    take: 8\n    orderBy: {publishedDate: desc}\n    where: {state: {equals: "published"}}\n  ) {\n    title\n    slug\n  }\n}\n\nquery GetPostsByCategorySlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {categories: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetPostsByAuthorId($skip: Int!, $take: Int!, $id: ID!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {state: {equals: "published"}, OR: [{writers: {some: {id: {equals: $id}}}}, {photographers: {some: {id: {equals: $id}}}}]}\n  ) {\n    sections {\n      name\n      color\n    }\n    ...PostDetails\n  }\n}\n\nquery GetPostsByTagSlug($skip: Int!, $take: Int!, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {state: {equals: "published"}, tags: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    sections {\n      name\n      color\n    }\n    ...PostDetails\n  }\n}':
    types.GetPostsBySectionSlugDocument,
  'query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}\n\nquery GetSectionInformation($slug: String!) {\n  section(where: {slug: $slug}) {\n    slug\n    name\n    color\n    state\n  }\n}':
    types.GetSectionsAndCategoriesDocument,
  'query GetTagInformation($slug: String!) {\n  tag(where: {slug: $slug}) {\n    name\n    slug\n  }\n}':
    types.GetTagInformationDocument,
  'query GetTopics {\n  topics(orderBy: {sortOrder: asc}, where: {state: {equals: "published"}}) {\n    name\n    slug\n    posts(\n      take: 4\n      orderBy: {publishedDate: desc}\n      where: {state: {equals: "published"}}\n    ) {\n      ...PostItem\n    }\n  }\n}':
    types.GetTopicsDocument,
  'query GetLatestShorts($amount: Int!) {\n  news: videos(\n    take: $amount\n    orderBy: {createdAt: desc}\n    where: {state: {equals: "published"}, videoSection: {equals: "news"}}\n  ) {\n    ...LatestShorts\n  }\n  creativity: videos(\n    take: $amount\n    orderBy: {createdAt: desc}\n    where: {state: {equals: "published"}, videoSection: {equals: "creativity"}}\n  ) {\n    ...LatestShorts\n  }\n}':
    types.GetLatestShortsDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment EditorChoiceData on EditorChoice {\n  outlink\n  heroImage {\n    ...HeroImage\n  }\n  choices {\n    ...PostItem\n  }\n}'
): (typeof documents)['fragment EditorChoiceData on EditorChoice {\n  outlink\n  heroImage {\n    ...HeroImage\n  }\n  choices {\n    ...PostItem\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment HeroImage on Photo {\n  id\n  resized {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n  resizedWebp {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n}'
): (typeof documents)['fragment HeroImage on Photo {\n  id\n  resized {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n  resizedWebp {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment PostDetails on Post {\n  title\n  createdAt\n  brief\n  slug\n  content\n  heroImage {\n    ...HeroImage\n  }\n}\n\nfragment PostItem on Post {\n  title\n  slug\n  heroImage {\n    ...HeroImage\n  }\n}'
): (typeof documents)['fragment PostDetails on Post {\n  title\n  createdAt\n  brief\n  slug\n  content\n  heroImage {\n    ...HeroImage\n  }\n}\n\nfragment PostItem on Post {\n  title\n  slug\n  heroImage {\n    ...HeroImage\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment LatestShorts on Video {\n  id\n  name\n  videoSrc\n  heroImage {\n    ...HeroImage\n  }\n}'
): (typeof documents)['fragment LatestShorts on Video {\n  id\n  name\n  videoSrc\n  heroImage {\n    ...HeroImage\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetCategoryInformation($slug: String) {\n  category(where: {slug: $slug}) {\n    slug\n    name\n    state\n    sections {\n      slug\n      color\n    }\n  }\n}'
): (typeof documents)['query GetCategoryInformation($slug: String) {\n  category(where: {slug: $slug}) {\n    slug\n    name\n    state\n    sections {\n      slug\n      color\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetAuthorInformation($id: ID!) {\n  contact(where: {id: $id}) {\n    id\n    name\n  }\n}'
): (typeof documents)['query GetAuthorInformation($id: ID!) {\n  contact(where: {id: $id}) {\n    id\n    name\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetEditorChoices {\n  editorChoices(\n    orderBy: [{order: asc}]\n    take: 10\n    where: {state: {equals: "published"}}\n  ) {\n    ...EditorChoiceData\n  }\n}'
): (typeof documents)['query GetEditorChoices {\n  editorChoices(\n    orderBy: [{order: asc}]\n    take: 10\n    where: {state: {equals: "published"}}\n  ) {\n    ...EditorChoiceData\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetLiveEventForHomepage($startDate: DateTime!) {\n  events(\n    orderBy: {publishedDate: desc}\n    take: 1\n    where: {eventType: {equals: "livestreaming"}, state: {equals: "published"}, startDate: {lte: $startDate}}\n  ) {\n    name\n    link\n    heroImage {\n      ...HeroImage\n    }\n  }\n}'
): (typeof documents)['query GetLiveEventForHomepage($startDate: DateTime!) {\n  events(\n    orderBy: {publishedDate: desc}\n    take: 1\n    where: {eventType: {equals: "livestreaming"}, state: {equals: "published"}, startDate: {lte: $startDate}}\n  ) {\n    name\n    link\n    heroImage {\n      ...HeroImage\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetGames {\n  games(take: 5, orderBy: {sortOrder: asc}, where: {state: {equals: "published"}}) {\n    name\n    descriptions\n    link\n    heroImage {\n      ...HeroImage\n    }\n  }\n}'
): (typeof documents)['query GetGames {\n  games(take: 5, orderBy: {sortOrder: asc}, where: {state: {equals: "published"}}) {\n    name\n    descriptions\n    link\n    heroImage {\n      ...HeroImage\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetPostsBySectionSlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {sections: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetFlashNews {\n  posts(\n    take: 8\n    orderBy: {publishedDate: desc}\n    where: {state: {equals: "published"}}\n  ) {\n    title\n    slug\n  }\n}\n\nquery GetPostsByCategorySlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {categories: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetPostsByAuthorId($skip: Int!, $take: Int!, $id: ID!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {state: {equals: "published"}, OR: [{writers: {some: {id: {equals: $id}}}}, {photographers: {some: {id: {equals: $id}}}}]}\n  ) {\n    sections {\n      name\n      color\n    }\n    ...PostDetails\n  }\n}\n\nquery GetPostsByTagSlug($skip: Int!, $take: Int!, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {state: {equals: "published"}, tags: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    sections {\n      name\n      color\n    }\n    ...PostDetails\n  }\n}'
): (typeof documents)['query GetPostsBySectionSlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {sections: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetFlashNews {\n  posts(\n    take: 8\n    orderBy: {publishedDate: desc}\n    where: {state: {equals: "published"}}\n  ) {\n    title\n    slug\n  }\n}\n\nquery GetPostsByCategorySlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {categories: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetPostsByAuthorId($skip: Int!, $take: Int!, $id: ID!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {state: {equals: "published"}, OR: [{writers: {some: {id: {equals: $id}}}}, {photographers: {some: {id: {equals: $id}}}}]}\n  ) {\n    sections {\n      name\n      color\n    }\n    ...PostDetails\n  }\n}\n\nquery GetPostsByTagSlug($skip: Int!, $take: Int!, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {state: {equals: "published"}, tags: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    sections {\n      name\n      color\n    }\n    ...PostDetails\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}\n\nquery GetSectionInformation($slug: String!) {\n  section(where: {slug: $slug}) {\n    slug\n    name\n    color\n    state\n  }\n}'
): (typeof documents)['query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}\n\nquery GetSectionInformation($slug: String!) {\n  section(where: {slug: $slug}) {\n    slug\n    name\n    color\n    state\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetTagInformation($slug: String!) {\n  tag(where: {slug: $slug}) {\n    name\n    slug\n  }\n}'
): (typeof documents)['query GetTagInformation($slug: String!) {\n  tag(where: {slug: $slug}) {\n    name\n    slug\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetTopics {\n  topics(orderBy: {sortOrder: asc}, where: {state: {equals: "published"}}) {\n    name\n    slug\n    posts(\n      take: 4\n      orderBy: {publishedDate: desc}\n      where: {state: {equals: "published"}}\n    ) {\n      ...PostItem\n    }\n  }\n}'
): (typeof documents)['query GetTopics {\n  topics(orderBy: {sortOrder: asc}, where: {state: {equals: "published"}}) {\n    name\n    slug\n    posts(\n      take: 4\n      orderBy: {publishedDate: desc}\n      where: {state: {equals: "published"}}\n    ) {\n      ...PostItem\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetLatestShorts($amount: Int!) {\n  news: videos(\n    take: $amount\n    orderBy: {createdAt: desc}\n    where: {state: {equals: "published"}, videoSection: {equals: "news"}}\n  ) {\n    ...LatestShorts\n  }\n  creativity: videos(\n    take: $amount\n    orderBy: {createdAt: desc}\n    where: {state: {equals: "published"}, videoSection: {equals: "creativity"}}\n  ) {\n    ...LatestShorts\n  }\n}'
): (typeof documents)['query GetLatestShorts($amount: Int!) {\n  news: videos(\n    take: $amount\n    orderBy: {createdAt: desc}\n    where: {state: {equals: "published"}, videoSection: {equals: "news"}}\n  ) {\n    ...LatestShorts\n  }\n  creativity: videos(\n    take: $amount\n    orderBy: {createdAt: desc}\n    where: {state: {equals: "published"}, videoSection: {equals: "creativity"}}\n  ) {\n    ...LatestShorts\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
