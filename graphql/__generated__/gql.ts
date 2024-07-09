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
  'fragment EditorChoiceData on EditorChoice {\n  choices {\n    title\n    slug\n    heroImage {\n      ...HeroImage\n    }\n  }\n}':
    types.EditorChoiceDataFragmentDoc,
  'fragment HeroImage on Photo {\n  id\n  resized {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n  resizedWebp {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n}':
    types.HeroImageFragmentDoc,
  'fragment PostDetails on Post {\n  title\n  createdAt\n  brief\n  slug\n  heroImage {\n    ...HeroImage\n  }\n}':
    types.PostDetailsFragmentDoc,
  'query GetCategoryInformation($slug: String) {\n  category(where: {slug: $slug}) {\n    slug\n    name\n    state\n    sections {\n      slug\n      color\n    }\n  }\n}':
    types.GetCategoryInformationDocument,
  'query GetEditorChoices {\n  editor: editorChoices(\n    orderBy: [{order: asc}]\n    take: 10\n    where: {state: {equals: "published"}}\n  ) {\n    ...EditorChoiceData\n  }\n}':
    types.GetEditorChoicesDocument,
  'query GetLiveEventForHomepage($startDate: DateTime!) {\n  events(\n    orderBy: {publishedDate: desc}\n    take: 1\n    where: {eventType: {equals: "livestreaming"}, state: {equals: "published"}, startDate: {lte: $startDate}}\n  ) {\n    name\n    link\n    heroImage {\n      ...HeroImage\n    }\n  }\n}':
    types.GetLiveEventForHomepageDocument,
  'query GetPostsBySectionSlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {sections: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetFlashNews {\n  posts(\n    take: 8\n    orderBy: {publishedDate: desc}\n    where: {state: {equals: "published"}}\n  ) {\n    title\n    slug\n  }\n}\n\nquery GetPostsByCategorySlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {categories: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}':
    types.GetPostsBySectionSlugDocument,
  'query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}\n\nquery GetSectionInformation($slug: String!) {\n  section(where: {slug: $slug}) {\n    slug\n    name\n    color\n    state\n  }\n}':
    types.GetSectionsAndCategoriesDocument,
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
  source: 'fragment EditorChoiceData on EditorChoice {\n  choices {\n    title\n    slug\n    heroImage {\n      ...HeroImage\n    }\n  }\n}'
): (typeof documents)['fragment EditorChoiceData on EditorChoice {\n  choices {\n    title\n    slug\n    heroImage {\n      ...HeroImage\n    }\n  }\n}']
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
  source: 'fragment PostDetails on Post {\n  title\n  createdAt\n  brief\n  slug\n  heroImage {\n    ...HeroImage\n  }\n}'
): (typeof documents)['fragment PostDetails on Post {\n  title\n  createdAt\n  brief\n  slug\n  heroImage {\n    ...HeroImage\n  }\n}']
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
  source: 'query GetEditorChoices {\n  editor: editorChoices(\n    orderBy: [{order: asc}]\n    take: 10\n    where: {state: {equals: "published"}}\n  ) {\n    ...EditorChoiceData\n  }\n}'
): (typeof documents)['query GetEditorChoices {\n  editor: editorChoices(\n    orderBy: [{order: asc}]\n    take: 10\n    where: {state: {equals: "published"}}\n  ) {\n    ...EditorChoiceData\n  }\n}']
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
  source: 'query GetPostsBySectionSlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {sections: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetFlashNews {\n  posts(\n    take: 8\n    orderBy: {publishedDate: desc}\n    where: {state: {equals: "published"}}\n  ) {\n    title\n    slug\n  }\n}\n\nquery GetPostsByCategorySlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {categories: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}'
): (typeof documents)['query GetPostsBySectionSlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {sections: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}\n\nquery GetFlashNews {\n  posts(\n    take: 8\n    orderBy: {publishedDate: desc}\n    where: {state: {equals: "published"}}\n  ) {\n    title\n    slug\n  }\n}\n\nquery GetPostsByCategorySlug($skip: Int!, $take: Int, $slug: String!) {\n  posts(\n    skip: $skip\n    take: $take\n    where: {categories: {some: {slug: {equals: $slug}}}}\n    orderBy: {publishedDate: desc}\n  ) {\n    ...PostDetails\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}\n\nquery GetSectionInformation($slug: String!) {\n  section(where: {slug: $slug}) {\n    slug\n    name\n    color\n    state\n  }\n}'
): (typeof documents)['query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}\n\nquery GetSectionInformation($slug: String!) {\n  section(where: {slug: $slug}) {\n    slug\n    name\n    color\n    state\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
