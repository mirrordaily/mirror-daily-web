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
  'query GetPostsBySectionSlug($skip: Int!, $take: Int, $where: PostWhereInput!) {\n  posts(skip: $skip, take: $take, where: $where, orderBy: {publishedDate: desc}) {\n    title\n    createdAt\n    brief\n    heroImage {\n      id\n      resized {\n        w1200\n        w1600\n        w2400\n        w480\n        w800\n        original\n      }\n      resizedWebp {\n        original\n        w1200\n        w1600\n        w2400\n        w480\n        w800\n      }\n    }\n    slug\n  }\n}':
    types.GetPostsBySectionSlugDocument,
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
  source: 'query GetPostsBySectionSlug($skip: Int!, $take: Int, $where: PostWhereInput!) {\n  posts(skip: $skip, take: $take, where: $where, orderBy: {publishedDate: desc}) {\n    title\n    createdAt\n    brief\n    heroImage {\n      id\n      resized {\n        w1200\n        w1600\n        w2400\n        w480\n        w800\n        original\n      }\n      resizedWebp {\n        original\n        w1200\n        w1600\n        w2400\n        w480\n        w800\n      }\n    }\n    slug\n  }\n}'
): (typeof documents)['query GetPostsBySectionSlug($skip: Int!, $take: Int, $where: PostWhereInput!) {\n  posts(skip: $skip, take: $take, where: $where, orderBy: {publishedDate: desc}) {\n    title\n    createdAt\n    brief\n    heroImage {\n      id\n      resized {\n        w1200\n        w1600\n        w2400\n        w480\n        w800\n        original\n      }\n      resizedWebp {\n        original\n        w1200\n        w1600\n        w2400\n        w480\n        w800\n      }\n    }\n    slug\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
