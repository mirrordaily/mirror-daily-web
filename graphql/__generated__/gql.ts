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
  'fragment HeroImage on Photo {\n  id\n  resized {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n  resizedWebp {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n}':
    types.HeroImageFragmentDoc,
  'query GetLiveEventForHomepage($startDate: DateTime!) {\n  events(\n    orderBy: {publishedDate: desc}\n    take: 1\n    where: {eventType: {equals: "livestreaming"}, state: {equals: "published"}, startDate: {lte: $startDate}}\n  ) {\n    name\n    link\n    heroImage {\n      ...HeroImage\n    }\n  }\n}':
    types.GetLiveEventForHomepageDocument,
  'query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}':
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
  source: 'fragment HeroImage on Photo {\n  id\n  resized {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n  resizedWebp {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n}'
): (typeof documents)['fragment HeroImage on Photo {\n  id\n  resized {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n  resizedWebp {\n    original\n    w480\n    w800\n    w1200\n    w1600\n    w2400\n  }\n}']
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
  source: 'query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}'
): (typeof documents)['query GetSectionsAndCategories {\n  sections(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n    name\n    slug\n    color\n    categories(orderBy: {order: asc}, where: {state: {equals: "active"}}) {\n      name\n      slug\n    }\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
