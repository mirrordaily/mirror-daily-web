/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any }
}

export type AudioFile = {
  __typename?: 'AudioFile'
  apiData?: Maybe<Scalars['JSON']['output']>
  audioSrc?: Maybe<Scalars['String']['output']>
  content?: Maybe<Scalars['JSON']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  file?: Maybe<FileFieldOutput>
  heroImage?: Maybe<Photo>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  tags?: Maybe<Array<Tag>>
  tagsCount?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  urlOriginal?: Maybe<Scalars['String']['output']>
}

export type AudioFileTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type AudioFileTagsCountArgs = {
  where?: TagWhereInput
}

export type AudioFileCreateInput = {
  apiData?: InputMaybe<Scalars['JSON']['input']>
  content?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  file?: InputMaybe<FileFieldInput>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  name?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  urlOriginal?: InputMaybe<Scalars['String']['input']>
}

export type AudioFileOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  urlOriginal?: InputMaybe<OrderDirection>
}

export type AudioFileUpdateArgs = {
  data: AudioFileUpdateInput
  where: AudioFileWhereUniqueInput
}

export type AudioFileUpdateInput = {
  apiData?: InputMaybe<Scalars['JSON']['input']>
  content?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  file?: InputMaybe<FileFieldInput>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  name?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  urlOriginal?: InputMaybe<Scalars['String']['input']>
}

export type AudioFileWhereInput = {
  AND?: InputMaybe<Array<AudioFileWhereInput>>
  NOT?: InputMaybe<Array<AudioFileWhereInput>>
  OR?: InputMaybe<Array<AudioFileWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  heroImage?: InputMaybe<PhotoWhereInput>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  tags?: InputMaybe<TagManyRelationFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  urlOriginal?: InputMaybe<StringFilter>
}

export type AudioFileWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type AuthenticatedItem = User

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>
  not?: InputMaybe<BooleanFilter>
}

export type Category = {
  __typename?: 'Category'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  heroImage?: Maybe<Photo>
  id: Scalars['ID']['output']
  isMemberOnly?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  order?: Maybe<Scalars['Int']['output']>
  posts?: Maybe<Array<Post>>
  postsCount?: Maybe<Scalars['Int']['output']>
  sections?: Maybe<Array<Section>>
  sectionsCount?: Maybe<Scalars['Int']['output']>
  slug?: Maybe<Scalars['String']['output']>
  state?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type CategoryPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type CategoryPostsCountArgs = {
  where?: PostWhereInput
}

export type CategorySectionsArgs = {
  cursor?: InputMaybe<SectionWhereUniqueInput>
  orderBy?: Array<SectionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: SectionWhereInput
}

export type CategorySectionsCountArgs = {
  where?: SectionWhereInput
}

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  isMemberOnly?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
  posts?: InputMaybe<PostRelateToManyForCreateInput>
  sections?: InputMaybe<SectionRelateToManyForCreateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type CategoryManyRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>
  none?: InputMaybe<CategoryWhereInput>
  some?: InputMaybe<CategoryWhereInput>
}

export type CategoryOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isMemberOnly?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  order?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type CategoryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>
  create?: InputMaybe<Array<CategoryCreateInput>>
}

export type CategoryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>
  create?: InputMaybe<Array<CategoryCreateInput>>
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>
}

export type CategoryRelateToOneForCreateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>
  create?: InputMaybe<CategoryCreateInput>
}

export type CategoryRelateToOneForUpdateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>
  create?: InputMaybe<CategoryCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type CategoryUpdateArgs = {
  data: CategoryUpdateInput
  where: CategoryWhereUniqueInput
}

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  isMemberOnly?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
  posts?: InputMaybe<PostRelateToManyForUpdateInput>
  sections?: InputMaybe<SectionRelateToManyForUpdateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>
  NOT?: InputMaybe<Array<CategoryWhereInput>>
  OR?: InputMaybe<Array<CategoryWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  heroImage?: InputMaybe<PhotoWhereInput>
  id?: InputMaybe<IdFilter>
  isMemberOnly?: InputMaybe<BooleanFilter>
  name?: InputMaybe<StringFilter>
  order?: InputMaybe<IntNullableFilter>
  posts?: InputMaybe<PostManyRelationFilter>
  sections?: InputMaybe<SectionManyRelationFilter>
  slug?: InputMaybe<StringFilter>
  state?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type Contact = {
  __typename?: 'Contact'
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type ContactCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type ContactManyRelationFilter = {
  every?: InputMaybe<ContactWhereInput>
  none?: InputMaybe<ContactWhereInput>
  some?: InputMaybe<ContactWhereInput>
}

export type ContactOrderByInput = {
  content?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type ContactRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ContactWhereUniqueInput>>
  create?: InputMaybe<Array<ContactCreateInput>>
}

export type ContactRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ContactWhereUniqueInput>>
  create?: InputMaybe<Array<ContactCreateInput>>
  disconnect?: InputMaybe<Array<ContactWhereUniqueInput>>
  set?: InputMaybe<Array<ContactWhereUniqueInput>>
}

export type ContactUpdateArgs = {
  data: ContactUpdateInput
  where: ContactWhereUniqueInput
}

export type ContactUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type ContactWhereInput = {
  AND?: InputMaybe<Array<ContactWhereInput>>
  NOT?: InputMaybe<Array<ContactWhereInput>>
  OR?: InputMaybe<Array<ContactWhereInput>>
  content?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type ContactWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['String']['input']>
}

export type CustomNestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  not?: InputMaybe<CustomNestedStringFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type CustomStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<CustomNestedStringFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>
  gt?: InputMaybe<Scalars['DateTime']['input']>
  gte?: InputMaybe<Scalars['DateTime']['input']>
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>
  lt?: InputMaybe<Scalars['DateTime']['input']>
  lte?: InputMaybe<Scalars['DateTime']['input']>
  not?: InputMaybe<DateTimeFilter>
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>
}

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>
  gt?: InputMaybe<Scalars['DateTime']['input']>
  gte?: InputMaybe<Scalars['DateTime']['input']>
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>
  lt?: InputMaybe<Scalars['DateTime']['input']>
  lte?: InputMaybe<Scalars['DateTime']['input']>
  not?: InputMaybe<DateTimeNullableFilter>
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>
}

export type EditorChoice = {
  __typename?: 'EditorChoice'
  choices?: Maybe<Post>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  order?: Maybe<Scalars['Int']['output']>
  outlink?: Maybe<Scalars['String']['output']>
  publishedDate?: Maybe<Scalars['DateTime']['output']>
  state?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type EditorChoiceCreateInput = {
  choices?: InputMaybe<PostRelateToOneForCreateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  order?: InputMaybe<Scalars['Int']['input']>
  outlink?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type EditorChoiceOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  order?: InputMaybe<OrderDirection>
  outlink?: InputMaybe<OrderDirection>
  publishedDate?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type EditorChoiceUpdateArgs = {
  data: EditorChoiceUpdateInput
  where: EditorChoiceWhereUniqueInput
}

export type EditorChoiceUpdateInput = {
  choices?: InputMaybe<PostRelateToOneForUpdateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  order?: InputMaybe<Scalars['Int']['input']>
  outlink?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type EditorChoiceWhereInput = {
  AND?: InputMaybe<Array<EditorChoiceWhereInput>>
  NOT?: InputMaybe<Array<EditorChoiceWhereInput>>
  OR?: InputMaybe<Array<EditorChoiceWhereInput>>
  choices?: InputMaybe<PostWhereInput>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  order?: InputMaybe<IntNullableFilter>
  outlink?: InputMaybe<StringFilter>
  publishedDate?: InputMaybe<DateTimeNullableFilter>
  state?: InputMaybe<StringNullableFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type EditorChoiceWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
}

export type Event = {
  __typename?: 'Event'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  endDate?: Maybe<Scalars['DateTime']['output']>
  eventType?: Maybe<Scalars['String']['output']>
  heroImage?: Maybe<Photo>
  id: Scalars['ID']['output']
  isFeatured?: Maybe<Scalars['Boolean']['output']>
  link?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  publishedDate?: Maybe<Scalars['DateTime']['output']>
  sections?: Maybe<Array<Section>>
  sectionsCount?: Maybe<Scalars['Int']['output']>
  slug?: Maybe<Scalars['String']['output']>
  startDate?: Maybe<Scalars['DateTime']['output']>
  state?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type EventSectionsArgs = {
  cursor?: InputMaybe<SectionWhereUniqueInput>
  orderBy?: Array<SectionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: SectionWhereInput
}

export type EventSectionsCountArgs = {
  where?: SectionWhereInput
}

export type EventCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  eventType?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  sections?: InputMaybe<SectionRelateToManyForCreateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type EventOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  endDate?: InputMaybe<OrderDirection>
  eventType?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isFeatured?: InputMaybe<OrderDirection>
  link?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  publishedDate?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  startDate?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type EventUpdateArgs = {
  data: EventUpdateInput
  where: EventWhereUniqueInput
}

export type EventUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  eventType?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  sections?: InputMaybe<SectionRelateToManyForUpdateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>
  NOT?: InputMaybe<Array<EventWhereInput>>
  OR?: InputMaybe<Array<EventWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  endDate?: InputMaybe<DateTimeNullableFilter>
  eventType?: InputMaybe<StringNullableFilter>
  heroImage?: InputMaybe<PhotoWhereInput>
  id?: InputMaybe<IdFilter>
  isFeatured?: InputMaybe<BooleanFilter>
  link?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  publishedDate?: InputMaybe<DateTimeNullableFilter>
  sections?: InputMaybe<SectionManyRelationFilter>
  slug?: InputMaybe<StringFilter>
  startDate?: InputMaybe<DateTimeFilter>
  state?: InputMaybe<StringNullableFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type EventWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type External = {
  __typename?: 'External'
  brief?: Maybe<Scalars['String']['output']>
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  extend_byline?: Maybe<Scalars['String']['output']>
  groups?: Maybe<Array<Group>>
  groupsCount?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  partner?: Maybe<Partner>
  publishedDate?: Maybe<Scalars['DateTime']['output']>
  publishedDateString?: Maybe<Scalars['String']['output']>
  relateds?: Maybe<Array<Post>>
  relatedsCount?: Maybe<Scalars['Int']['output']>
  slug?: Maybe<Scalars['String']['output']>
  source?: Maybe<Scalars['String']['output']>
  state?: Maybe<Scalars['String']['output']>
  tags?: Maybe<Array<Tag>>
  tagsCount?: Maybe<Scalars['Int']['output']>
  thumb?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type ExternalGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>
  orderBy?: Array<GroupOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: GroupWhereInput
}

export type ExternalGroupsCountArgs = {
  where?: GroupWhereInput
}

export type ExternalRelatedsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type ExternalRelatedsCountArgs = {
  where?: PostWhereInput
}

export type ExternalTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type ExternalTagsCountArgs = {
  where?: TagWhereInput
}

export type ExternalCreateInput = {
  brief?: InputMaybe<Scalars['String']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  extend_byline?: InputMaybe<Scalars['String']['input']>
  groups?: InputMaybe<GroupRelateToManyForCreateInput>
  partner?: InputMaybe<PartnerRelateToOneForCreateInput>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  publishedDateString?: InputMaybe<Scalars['String']['input']>
  relateds?: InputMaybe<PostRelateToManyForCreateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  source?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForCreateInput>
  thumb?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type ExternalManyRelationFilter = {
  every?: InputMaybe<ExternalWhereInput>
  none?: InputMaybe<ExternalWhereInput>
  some?: InputMaybe<ExternalWhereInput>
}

export type ExternalOrderByInput = {
  brief?: InputMaybe<OrderDirection>
  content?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  extend_byline?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  publishedDate?: InputMaybe<OrderDirection>
  publishedDateString?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  source?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  thumb?: InputMaybe<OrderDirection>
  title?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type ExternalRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ExternalWhereUniqueInput>>
  create?: InputMaybe<Array<ExternalCreateInput>>
}

export type ExternalRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ExternalWhereUniqueInput>>
  create?: InputMaybe<Array<ExternalCreateInput>>
  disconnect?: InputMaybe<Array<ExternalWhereUniqueInput>>
  set?: InputMaybe<Array<ExternalWhereUniqueInput>>
}

export type ExternalUpdateArgs = {
  data: ExternalUpdateInput
  where: ExternalWhereUniqueInput
}

export type ExternalUpdateInput = {
  brief?: InputMaybe<Scalars['String']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  extend_byline?: InputMaybe<Scalars['String']['input']>
  groups?: InputMaybe<GroupRelateToManyForUpdateInput>
  partner?: InputMaybe<PartnerRelateToOneForUpdateInput>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  publishedDateString?: InputMaybe<Scalars['String']['input']>
  relateds?: InputMaybe<PostRelateToManyForUpdateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  source?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForUpdateInput>
  thumb?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type ExternalWhereInput = {
  AND?: InputMaybe<Array<ExternalWhereInput>>
  NOT?: InputMaybe<Array<ExternalWhereInput>>
  OR?: InputMaybe<Array<ExternalWhereInput>>
  brief?: InputMaybe<StringFilter>
  content?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  extend_byline?: InputMaybe<StringFilter>
  groups?: InputMaybe<GroupManyRelationFilter>
  id?: InputMaybe<IdFilter>
  partner?: InputMaybe<PartnerWhereInput>
  publishedDate?: InputMaybe<DateTimeNullableFilter>
  publishedDateString?: InputMaybe<StringFilter>
  relateds?: InputMaybe<PostManyRelationFilter>
  slug?: InputMaybe<StringFilter>
  source?: InputMaybe<StringFilter>
  state?: InputMaybe<StringNullableFilter>
  tags?: InputMaybe<TagManyRelationFilter>
  thumb?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type ExternalWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type FileFieldInput = {
  upload: Scalars['Upload']['input']
}

export type FileFieldOutput = {
  __typename?: 'FileFieldOutput'
  filename: Scalars['String']['output']
  filesize: Scalars['Int']['output']
  url: Scalars['String']['output']
}

export type Game = {
  __typename?: 'Game'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  heroImage?: Maybe<Photo>
  id: Scalars['ID']['output']
  isFeatured?: Maybe<Scalars['Boolean']['output']>
  link?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  publishedDate?: Maybe<Scalars['DateTime']['output']>
  state?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type GameCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type GameOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isFeatured?: InputMaybe<OrderDirection>
  link?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  publishedDate?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type GameUpdateArgs = {
  data: GameUpdateInput
  where: GameWhereUniqueInput
}

export type GameUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type GameWhereInput = {
  AND?: InputMaybe<Array<GameWhereInput>>
  NOT?: InputMaybe<Array<GameWhereInput>>
  OR?: InputMaybe<Array<GameWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  heroImage?: InputMaybe<PhotoWhereInput>
  id?: InputMaybe<IdFilter>
  isFeatured?: InputMaybe<BooleanFilter>
  link?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  publishedDate?: InputMaybe<DateTimeNullableFilter>
  state?: InputMaybe<StringNullableFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type GameWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Group = {
  __typename?: 'Group'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  externals?: Maybe<Array<External>>
  externalsCount?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  keyword?: Maybe<Scalars['String']['output']>
  posts?: Maybe<Array<Post>>
  postsCount?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type GroupExternalsArgs = {
  cursor?: InputMaybe<ExternalWhereUniqueInput>
  orderBy?: Array<ExternalOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ExternalWhereInput
}

export type GroupExternalsCountArgs = {
  where?: ExternalWhereInput
}

export type GroupPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type GroupPostsCountArgs = {
  where?: PostWhereInput
}

export type GroupCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  externals?: InputMaybe<ExternalRelateToManyForCreateInput>
  keyword?: InputMaybe<Scalars['String']['input']>
  posts?: InputMaybe<PostRelateToManyForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type GroupManyRelationFilter = {
  every?: InputMaybe<GroupWhereInput>
  none?: InputMaybe<GroupWhereInput>
  some?: InputMaybe<GroupWhereInput>
}

export type GroupOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  keyword?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type GroupRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>
  create?: InputMaybe<Array<GroupCreateInput>>
}

export type GroupRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>
  create?: InputMaybe<Array<GroupCreateInput>>
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>
  set?: InputMaybe<Array<GroupWhereUniqueInput>>
}

export type GroupUpdateArgs = {
  data: GroupUpdateInput
  where: GroupWhereUniqueInput
}

export type GroupUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  externals?: InputMaybe<ExternalRelateToManyForUpdateInput>
  keyword?: InputMaybe<Scalars['String']['input']>
  posts?: InputMaybe<PostRelateToManyForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type GroupWhereInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>
  NOT?: InputMaybe<Array<GroupWhereInput>>
  OR?: InputMaybe<Array<GroupWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  externals?: InputMaybe<ExternalManyRelationFilter>
  id?: InputMaybe<IdFilter>
  keyword?: InputMaybe<StringFilter>
  posts?: InputMaybe<PostManyRelationFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type GroupWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Header = {
  __typename?: 'Header'
  category?: Maybe<Category>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  order?: Maybe<Scalars['Int']['output']>
  section?: Maybe<Section>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type HeaderCreateInput = {
  category?: InputMaybe<CategoryRelateToOneForCreateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  order?: InputMaybe<Scalars['Int']['input']>
  section?: InputMaybe<SectionRelateToOneForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type HeaderOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  order?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type HeaderUpdateArgs = {
  data: HeaderUpdateInput
  where: HeaderWhereUniqueInput
}

export type HeaderUpdateInput = {
  category?: InputMaybe<CategoryRelateToOneForUpdateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  order?: InputMaybe<Scalars['Int']['input']>
  section?: InputMaybe<SectionRelateToOneForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type HeaderWhereInput = {
  AND?: InputMaybe<Array<HeaderWhereInput>>
  NOT?: InputMaybe<Array<HeaderWhereInput>>
  OR?: InputMaybe<Array<HeaderWhereInput>>
  category?: InputMaybe<CategoryWhereInput>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  order?: InputMaybe<IntNullableFilter>
  section?: InputMaybe<SectionWhereInput>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type HeaderWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
}

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>
  gt?: InputMaybe<Scalars['ID']['input']>
  gte?: InputMaybe<Scalars['ID']['input']>
  in?: InputMaybe<Array<Scalars['ID']['input']>>
  lt?: InputMaybe<Scalars['ID']['input']>
  lte?: InputMaybe<Scalars['ID']['input']>
  not?: InputMaybe<IdFilter>
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>
}

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp',
}

export type ImageFieldInput = {
  upload: Scalars['Upload']['input']
}

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput'
  extension: ImageExtension
  filesize: Scalars['Int']['output']
  height: Scalars['Int']['output']
  id: Scalars['ID']['output']
  url: Scalars['String']['output']
  width: Scalars['Int']['output']
}

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>
  gt?: InputMaybe<Scalars['Int']['input']>
  gte?: InputMaybe<Scalars['Int']['input']>
  in?: InputMaybe<Array<Scalars['Int']['input']>>
  lt?: InputMaybe<Scalars['Int']['input']>
  lte?: InputMaybe<Scalars['Int']['input']>
  not?: InputMaybe<IntNullableFilter>
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>
}

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta'
  list?: Maybe<KeystoneAdminUiListMeta>
  lists: Array<KeystoneAdminUiListMeta>
}

export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input']
}

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta'
  description?: Maybe<Scalars['String']['output']>
  fields: Array<KeystoneAdminUiFieldMeta>
  label: Scalars['String']['output']
}

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta'
  createView: KeystoneAdminUiFieldMetaCreateView
  customViewsIndex?: Maybe<Scalars['Int']['output']>
  description?: Maybe<Scalars['String']['output']>
  fieldMeta?: Maybe<Scalars['JSON']['output']>
  isFilterable: Scalars['Boolean']['output']
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>
  isOrderable: Scalars['Boolean']['output']
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>
  label: Scalars['String']['output']
  listView: KeystoneAdminUiFieldMetaListView
  path: Scalars['String']['output']
  search?: Maybe<QueryMode>
  viewsIndex: Scalars['Int']['output']
}

export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView'
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode
}

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update',
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView'
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>
}

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read',
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar',
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView'
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode
}

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read',
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta'
  description?: Maybe<Scalars['String']['output']>
  fields: Array<KeystoneAdminUiFieldMeta>
  groups: Array<KeystoneAdminUiFieldGroupMeta>
  hideCreate: Scalars['Boolean']['output']
  hideDelete: Scalars['Boolean']['output']
  initialColumns: Array<Scalars['String']['output']>
  initialSort?: Maybe<KeystoneAdminUiSort>
  isHidden: Scalars['Boolean']['output']
  isSingleton: Scalars['Boolean']['output']
  itemQueryName: Scalars['String']['output']
  key: Scalars['String']['output']
  label: Scalars['String']['output']
  labelField: Scalars['String']['output']
  listQueryName: Scalars['String']['output']
  pageSize: Scalars['Int']['output']
  path: Scalars['String']['output']
  plural: Scalars['String']['output']
  singular: Scalars['String']['output']
}

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort'
  direction: KeystoneAdminUiSortDirection
  field: Scalars['String']['output']
}

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta'
  adminMeta: KeystoneAdminMeta
}

export type Mutation = {
  __typename?: 'Mutation'
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>
  createAudioFile?: Maybe<AudioFile>
  createAudioFiles?: Maybe<Array<Maybe<AudioFile>>>
  createCategories?: Maybe<Array<Maybe<Category>>>
  createCategory?: Maybe<Category>
  createContact?: Maybe<Contact>
  createContacts?: Maybe<Array<Maybe<Contact>>>
  createEditorChoice?: Maybe<EditorChoice>
  createEditorChoices?: Maybe<Array<Maybe<EditorChoice>>>
  createEvent?: Maybe<Event>
  createEvents?: Maybe<Array<Maybe<Event>>>
  createExternal?: Maybe<External>
  createExternals?: Maybe<Array<Maybe<External>>>
  createGame?: Maybe<Game>
  createGames?: Maybe<Array<Maybe<Game>>>
  createGroup?: Maybe<Group>
  createGroups?: Maybe<Array<Maybe<Group>>>
  createHeader?: Maybe<Header>
  createHeaders?: Maybe<Array<Maybe<Header>>>
  createInitialUser: UserAuthenticationWithPasswordSuccess
  createPartner?: Maybe<Partner>
  createPartners?: Maybe<Array<Maybe<Partner>>>
  createPhoto?: Maybe<Photo>
  createPhotos?: Maybe<Array<Maybe<Photo>>>
  createPost?: Maybe<Post>
  createPosts?: Maybe<Array<Maybe<Post>>>
  createSection?: Maybe<Section>
  createSections?: Maybe<Array<Maybe<Section>>>
  createTag?: Maybe<Tag>
  createTags?: Maybe<Array<Maybe<Tag>>>
  createTopic?: Maybe<Topic>
  createTopics?: Maybe<Array<Maybe<Topic>>>
  createUser?: Maybe<User>
  createUsers?: Maybe<Array<Maybe<User>>>
  createVideo?: Maybe<Video>
  createVideos?: Maybe<Array<Maybe<Video>>>
  deleteAudioFile?: Maybe<AudioFile>
  deleteAudioFiles?: Maybe<Array<Maybe<AudioFile>>>
  deleteCategories?: Maybe<Array<Maybe<Category>>>
  deleteCategory?: Maybe<Category>
  deleteContact?: Maybe<Contact>
  deleteContacts?: Maybe<Array<Maybe<Contact>>>
  deleteEditorChoice?: Maybe<EditorChoice>
  deleteEditorChoices?: Maybe<Array<Maybe<EditorChoice>>>
  deleteEvent?: Maybe<Event>
  deleteEvents?: Maybe<Array<Maybe<Event>>>
  deleteExternal?: Maybe<External>
  deleteExternals?: Maybe<Array<Maybe<External>>>
  deleteGame?: Maybe<Game>
  deleteGames?: Maybe<Array<Maybe<Game>>>
  deleteGroup?: Maybe<Group>
  deleteGroups?: Maybe<Array<Maybe<Group>>>
  deleteHeader?: Maybe<Header>
  deleteHeaders?: Maybe<Array<Maybe<Header>>>
  deletePartner?: Maybe<Partner>
  deletePartners?: Maybe<Array<Maybe<Partner>>>
  deletePhoto?: Maybe<Photo>
  deletePhotos?: Maybe<Array<Maybe<Photo>>>
  deletePost?: Maybe<Post>
  deletePosts?: Maybe<Array<Maybe<Post>>>
  deleteSection?: Maybe<Section>
  deleteSections?: Maybe<Array<Maybe<Section>>>
  deleteTag?: Maybe<Tag>
  deleteTags?: Maybe<Array<Maybe<Tag>>>
  deleteTopic?: Maybe<Topic>
  deleteTopics?: Maybe<Array<Maybe<Topic>>>
  deleteUser?: Maybe<User>
  deleteUsers?: Maybe<Array<Maybe<User>>>
  deleteVideo?: Maybe<Video>
  deleteVideos?: Maybe<Array<Maybe<Video>>>
  endSession: Scalars['Boolean']['output']
  updateAudioFile?: Maybe<AudioFile>
  updateAudioFiles?: Maybe<Array<Maybe<AudioFile>>>
  updateCategories?: Maybe<Array<Maybe<Category>>>
  updateCategory?: Maybe<Category>
  updateContact?: Maybe<Contact>
  updateContacts?: Maybe<Array<Maybe<Contact>>>
  updateEditorChoice?: Maybe<EditorChoice>
  updateEditorChoices?: Maybe<Array<Maybe<EditorChoice>>>
  updateEvent?: Maybe<Event>
  updateEvents?: Maybe<Array<Maybe<Event>>>
  updateExternal?: Maybe<External>
  updateExternals?: Maybe<Array<Maybe<External>>>
  updateGame?: Maybe<Game>
  updateGames?: Maybe<Array<Maybe<Game>>>
  updateGroup?: Maybe<Group>
  updateGroups?: Maybe<Array<Maybe<Group>>>
  updateHeader?: Maybe<Header>
  updateHeaders?: Maybe<Array<Maybe<Header>>>
  updatePartner?: Maybe<Partner>
  updatePartners?: Maybe<Array<Maybe<Partner>>>
  updatePhoto?: Maybe<Photo>
  updatePhotos?: Maybe<Array<Maybe<Photo>>>
  updatePost?: Maybe<Post>
  updatePosts?: Maybe<Array<Maybe<Post>>>
  updateSection?: Maybe<Section>
  updateSections?: Maybe<Array<Maybe<Section>>>
  updateTag?: Maybe<Tag>
  updateTags?: Maybe<Array<Maybe<Tag>>>
  updateTopic?: Maybe<Topic>
  updateTopics?: Maybe<Array<Maybe<Topic>>>
  updateUser?: Maybe<User>
  updateUsers?: Maybe<Array<Maybe<User>>>
  updateVideo?: Maybe<Video>
  updateVideos?: Maybe<Array<Maybe<Video>>>
}

export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationCreateAudioFileArgs = {
  data: AudioFileCreateInput
}

export type MutationCreateAudioFilesArgs = {
  data: Array<AudioFileCreateInput>
}

export type MutationCreateCategoriesArgs = {
  data: Array<CategoryCreateInput>
}

export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput
}

export type MutationCreateContactArgs = {
  data: ContactCreateInput
}

export type MutationCreateContactsArgs = {
  data: Array<ContactCreateInput>
}

export type MutationCreateEditorChoiceArgs = {
  data: EditorChoiceCreateInput
}

export type MutationCreateEditorChoicesArgs = {
  data: Array<EditorChoiceCreateInput>
}

export type MutationCreateEventArgs = {
  data: EventCreateInput
}

export type MutationCreateEventsArgs = {
  data: Array<EventCreateInput>
}

export type MutationCreateExternalArgs = {
  data: ExternalCreateInput
}

export type MutationCreateExternalsArgs = {
  data: Array<ExternalCreateInput>
}

export type MutationCreateGameArgs = {
  data: GameCreateInput
}

export type MutationCreateGamesArgs = {
  data: Array<GameCreateInput>
}

export type MutationCreateGroupArgs = {
  data: GroupCreateInput
}

export type MutationCreateGroupsArgs = {
  data: Array<GroupCreateInput>
}

export type MutationCreateHeaderArgs = {
  data: HeaderCreateInput
}

export type MutationCreateHeadersArgs = {
  data: Array<HeaderCreateInput>
}

export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput
}

export type MutationCreatePartnerArgs = {
  data: PartnerCreateInput
}

export type MutationCreatePartnersArgs = {
  data: Array<PartnerCreateInput>
}

export type MutationCreatePhotoArgs = {
  data: PhotoCreateInput
}

export type MutationCreatePhotosArgs = {
  data: Array<PhotoCreateInput>
}

export type MutationCreatePostArgs = {
  data: PostCreateInput
}

export type MutationCreatePostsArgs = {
  data: Array<PostCreateInput>
}

export type MutationCreateSectionArgs = {
  data: SectionCreateInput
}

export type MutationCreateSectionsArgs = {
  data: Array<SectionCreateInput>
}

export type MutationCreateTagArgs = {
  data: TagCreateInput
}

export type MutationCreateTagsArgs = {
  data: Array<TagCreateInput>
}

export type MutationCreateTopicArgs = {
  data: TopicCreateInput
}

export type MutationCreateTopicsArgs = {
  data: Array<TopicCreateInput>
}

export type MutationCreateUserArgs = {
  data: UserCreateInput
}

export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>
}

export type MutationCreateVideoArgs = {
  data: VideoCreateInput
}

export type MutationCreateVideosArgs = {
  data: Array<VideoCreateInput>
}

export type MutationDeleteAudioFileArgs = {
  where: AudioFileWhereUniqueInput
}

export type MutationDeleteAudioFilesArgs = {
  where: Array<AudioFileWhereUniqueInput>
}

export type MutationDeleteCategoriesArgs = {
  where: Array<CategoryWhereUniqueInput>
}

export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput
}

export type MutationDeleteContactArgs = {
  where: ContactWhereUniqueInput
}

export type MutationDeleteContactsArgs = {
  where: Array<ContactWhereUniqueInput>
}

export type MutationDeleteEditorChoiceArgs = {
  where: EditorChoiceWhereUniqueInput
}

export type MutationDeleteEditorChoicesArgs = {
  where: Array<EditorChoiceWhereUniqueInput>
}

export type MutationDeleteEventArgs = {
  where: EventWhereUniqueInput
}

export type MutationDeleteEventsArgs = {
  where: Array<EventWhereUniqueInput>
}

export type MutationDeleteExternalArgs = {
  where: ExternalWhereUniqueInput
}

export type MutationDeleteExternalsArgs = {
  where: Array<ExternalWhereUniqueInput>
}

export type MutationDeleteGameArgs = {
  where: GameWhereUniqueInput
}

export type MutationDeleteGamesArgs = {
  where: Array<GameWhereUniqueInput>
}

export type MutationDeleteGroupArgs = {
  where: GroupWhereUniqueInput
}

export type MutationDeleteGroupsArgs = {
  where: Array<GroupWhereUniqueInput>
}

export type MutationDeleteHeaderArgs = {
  where: HeaderWhereUniqueInput
}

export type MutationDeleteHeadersArgs = {
  where: Array<HeaderWhereUniqueInput>
}

export type MutationDeletePartnerArgs = {
  where: PartnerWhereUniqueInput
}

export type MutationDeletePartnersArgs = {
  where: Array<PartnerWhereUniqueInput>
}

export type MutationDeletePhotoArgs = {
  where: PhotoWhereUniqueInput
}

export type MutationDeletePhotosArgs = {
  where: Array<PhotoWhereUniqueInput>
}

export type MutationDeletePostArgs = {
  where: PostWhereUniqueInput
}

export type MutationDeletePostsArgs = {
  where: Array<PostWhereUniqueInput>
}

export type MutationDeleteSectionArgs = {
  where: SectionWhereUniqueInput
}

export type MutationDeleteSectionsArgs = {
  where: Array<SectionWhereUniqueInput>
}

export type MutationDeleteTagArgs = {
  where: TagWhereUniqueInput
}

export type MutationDeleteTagsArgs = {
  where: Array<TagWhereUniqueInput>
}

export type MutationDeleteTopicArgs = {
  where: TopicWhereUniqueInput
}

export type MutationDeleteTopicsArgs = {
  where: Array<TopicWhereUniqueInput>
}

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput
}

export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>
}

export type MutationDeleteVideoArgs = {
  where: VideoWhereUniqueInput
}

export type MutationDeleteVideosArgs = {
  where: Array<VideoWhereUniqueInput>
}

export type MutationUpdateAudioFileArgs = {
  data: AudioFileUpdateInput
  where: AudioFileWhereUniqueInput
}

export type MutationUpdateAudioFilesArgs = {
  data: Array<AudioFileUpdateArgs>
}

export type MutationUpdateCategoriesArgs = {
  data: Array<CategoryUpdateArgs>
}

export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput
  where: CategoryWhereUniqueInput
}

export type MutationUpdateContactArgs = {
  data: ContactUpdateInput
  where: ContactWhereUniqueInput
}

export type MutationUpdateContactsArgs = {
  data: Array<ContactUpdateArgs>
}

export type MutationUpdateEditorChoiceArgs = {
  data: EditorChoiceUpdateInput
  where: EditorChoiceWhereUniqueInput
}

export type MutationUpdateEditorChoicesArgs = {
  data: Array<EditorChoiceUpdateArgs>
}

export type MutationUpdateEventArgs = {
  data: EventUpdateInput
  where: EventWhereUniqueInput
}

export type MutationUpdateEventsArgs = {
  data: Array<EventUpdateArgs>
}

export type MutationUpdateExternalArgs = {
  data: ExternalUpdateInput
  where: ExternalWhereUniqueInput
}

export type MutationUpdateExternalsArgs = {
  data: Array<ExternalUpdateArgs>
}

export type MutationUpdateGameArgs = {
  data: GameUpdateInput
  where: GameWhereUniqueInput
}

export type MutationUpdateGamesArgs = {
  data: Array<GameUpdateArgs>
}

export type MutationUpdateGroupArgs = {
  data: GroupUpdateInput
  where: GroupWhereUniqueInput
}

export type MutationUpdateGroupsArgs = {
  data: Array<GroupUpdateArgs>
}

export type MutationUpdateHeaderArgs = {
  data: HeaderUpdateInput
  where: HeaderWhereUniqueInput
}

export type MutationUpdateHeadersArgs = {
  data: Array<HeaderUpdateArgs>
}

export type MutationUpdatePartnerArgs = {
  data: PartnerUpdateInput
  where: PartnerWhereUniqueInput
}

export type MutationUpdatePartnersArgs = {
  data: Array<PartnerUpdateArgs>
}

export type MutationUpdatePhotoArgs = {
  data: PhotoUpdateInput
  where: PhotoWhereUniqueInput
}

export type MutationUpdatePhotosArgs = {
  data: Array<PhotoUpdateArgs>
}

export type MutationUpdatePostArgs = {
  data: PostUpdateInput
  where: PostWhereUniqueInput
}

export type MutationUpdatePostsArgs = {
  data: Array<PostUpdateArgs>
}

export type MutationUpdateSectionArgs = {
  data: SectionUpdateInput
  where: SectionWhereUniqueInput
}

export type MutationUpdateSectionsArgs = {
  data: Array<SectionUpdateArgs>
}

export type MutationUpdateTagArgs = {
  data: TagUpdateInput
  where: TagWhereUniqueInput
}

export type MutationUpdateTagsArgs = {
  data: Array<TagUpdateArgs>
}

export type MutationUpdateTopicArgs = {
  data: TopicUpdateInput
  where: TopicWhereUniqueInput
}

export type MutationUpdateTopicsArgs = {
  data: Array<TopicUpdateArgs>
}

export type MutationUpdateUserArgs = {
  data: UserUpdateInput
  where: UserWhereUniqueInput
}

export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>
}

export type MutationUpdateVideoArgs = {
  data: VideoUpdateInput
  where: VideoWhereUniqueInput
}

export type MutationUpdateVideosArgs = {
  data: Array<VideoUpdateArgs>
}

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  not?: InputMaybe<NestedStringFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  not?: InputMaybe<NestedStringNullableFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Partner = {
  __typename?: 'Partner'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  public?: Maybe<Scalars['Boolean']['output']>
  showOnIndex?: Maybe<Scalars['Boolean']['output']>
  slug?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  website?: Maybe<Scalars['String']['output']>
}

export type PartnerCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  name?: InputMaybe<Scalars['String']['input']>
  public?: InputMaybe<Scalars['Boolean']['input']>
  showOnIndex?: InputMaybe<Scalars['Boolean']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  website?: InputMaybe<Scalars['String']['input']>
}

export type PartnerOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  public?: InputMaybe<OrderDirection>
  showOnIndex?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  website?: InputMaybe<OrderDirection>
}

export type PartnerRelateToOneForCreateInput = {
  connect?: InputMaybe<PartnerWhereUniqueInput>
  create?: InputMaybe<PartnerCreateInput>
}

export type PartnerRelateToOneForUpdateInput = {
  connect?: InputMaybe<PartnerWhereUniqueInput>
  create?: InputMaybe<PartnerCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type PartnerUpdateArgs = {
  data: PartnerUpdateInput
  where: PartnerWhereUniqueInput
}

export type PartnerUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  name?: InputMaybe<Scalars['String']['input']>
  public?: InputMaybe<Scalars['Boolean']['input']>
  showOnIndex?: InputMaybe<Scalars['Boolean']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  website?: InputMaybe<Scalars['String']['input']>
}

export type PartnerWhereInput = {
  AND?: InputMaybe<Array<PartnerWhereInput>>
  NOT?: InputMaybe<Array<PartnerWhereInput>>
  OR?: InputMaybe<Array<PartnerWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  public?: InputMaybe<BooleanFilter>
  showOnIndex?: InputMaybe<BooleanFilter>
  slug?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  website?: InputMaybe<StringFilter>
}

export type PartnerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type PasswordState = {
  __typename?: 'PasswordState'
  isSet: Scalars['Boolean']['output']
}

export type Photo = {
  __typename?: 'Photo'
  copyRight?: Maybe<Scalars['Boolean']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  file?: Maybe<FileFieldOutput>
  id: Scalars['ID']['output']
  imageFile?: Maybe<ImageFieldOutput>
  name?: Maybe<Scalars['String']['output']>
  resized?: Maybe<ResizedImages>
  resizedWebp?: Maybe<ResizedWebPImages>
  topicKeywords?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  waterMark?: Maybe<Scalars['Boolean']['output']>
}

export type PhotoCreateInput = {
  copyRight?: InputMaybe<Scalars['Boolean']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  file?: InputMaybe<FileFieldInput>
  imageFile?: InputMaybe<ImageFieldInput>
  name?: InputMaybe<Scalars['String']['input']>
  topicKeywords?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  waterMark?: InputMaybe<Scalars['Boolean']['input']>
}

export type PhotoManyRelationFilter = {
  every?: InputMaybe<PhotoWhereInput>
  none?: InputMaybe<PhotoWhereInput>
  some?: InputMaybe<PhotoWhereInput>
}

export type PhotoOrderByInput = {
  copyRight?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  topicKeywords?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  waterMark?: InputMaybe<OrderDirection>
}

export type PhotoRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>
  create?: InputMaybe<Array<PhotoCreateInput>>
}

export type PhotoRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>
  create?: InputMaybe<Array<PhotoCreateInput>>
  disconnect?: InputMaybe<Array<PhotoWhereUniqueInput>>
  set?: InputMaybe<Array<PhotoWhereUniqueInput>>
}

export type PhotoRelateToOneForCreateInput = {
  connect?: InputMaybe<PhotoWhereUniqueInput>
  create?: InputMaybe<PhotoCreateInput>
}

export type PhotoRelateToOneForUpdateInput = {
  connect?: InputMaybe<PhotoWhereUniqueInput>
  create?: InputMaybe<PhotoCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type PhotoUpdateArgs = {
  data: PhotoUpdateInput
  where: PhotoWhereUniqueInput
}

export type PhotoUpdateInput = {
  copyRight?: InputMaybe<Scalars['Boolean']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  file?: InputMaybe<FileFieldInput>
  imageFile?: InputMaybe<ImageFieldInput>
  name?: InputMaybe<Scalars['String']['input']>
  topicKeywords?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  waterMark?: InputMaybe<Scalars['Boolean']['input']>
}

export type PhotoWhereInput = {
  AND?: InputMaybe<Array<PhotoWhereInput>>
  NOT?: InputMaybe<Array<PhotoWhereInput>>
  OR?: InputMaybe<Array<PhotoWhereInput>>
  copyRight?: InputMaybe<BooleanFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  topicKeywords?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  waterMark?: InputMaybe<BooleanFilter>
}

export type PhotoWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Post = {
  __typename?: 'Post'
  adTrace?: Maybe<Scalars['String']['output']>
  apiData?: Maybe<Scalars['JSON']['output']>
  apiDataBrief?: Maybe<Scalars['JSON']['output']>
  brief?: Maybe<Scalars['JSON']['output']>
  camera_man?: Maybe<Array<Contact>>
  camera_manCount?: Maybe<Scalars['Int']['output']>
  categories?: Maybe<Array<Category>>
  categoriesCount?: Maybe<Scalars['Int']['output']>
  categoriesInInputOrder?: Maybe<Array<Maybe<Category>>>
  content?: Maybe<Scalars['JSON']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  css?: Maybe<Scalars['String']['output']>
  designers?: Maybe<Array<Contact>>
  designersCount?: Maybe<Scalars['Int']['output']>
  engineers?: Maybe<Array<Contact>>
  engineersCount?: Maybe<Scalars['Int']['output']>
  extend_byline?: Maybe<Scalars['String']['output']>
  from_External_relateds?: Maybe<Array<External>>
  from_External_relatedsCount?: Maybe<Scalars['Int']['output']>
  groups?: Maybe<Array<Group>>
  groupsCount?: Maybe<Scalars['Int']['output']>
  heroCaption?: Maybe<Scalars['String']['output']>
  heroImage?: Maybe<Photo>
  heroVideo?: Maybe<Video>
  hiddenAdvertised?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['ID']['output']
  isAdult?: Maybe<Scalars['Boolean']['output']>
  isAdvertised?: Maybe<Scalars['Boolean']['output']>
  isFeatured?: Maybe<Scalars['Boolean']['output']>
  isMember?: Maybe<Scalars['Boolean']['output']>
  lockBy?: Maybe<User>
  lockExpireAt?: Maybe<Scalars['DateTime']['output']>
  manualOrderOfCategories?: Maybe<Scalars['JSON']['output']>
  manualOrderOfRelatedVideos?: Maybe<Scalars['JSON']['output']>
  manualOrderOfRelateds?: Maybe<Scalars['JSON']['output']>
  manualOrderOfSections?: Maybe<Scalars['JSON']['output']>
  manualOrderOfWriters?: Maybe<Scalars['JSON']['output']>
  og_description?: Maybe<Scalars['String']['output']>
  og_image?: Maybe<Photo>
  og_title?: Maybe<Scalars['String']['output']>
  photographers?: Maybe<Array<Contact>>
  photographersCount?: Maybe<Scalars['Int']['output']>
  preview?: Maybe<Scalars['JSON']['output']>
  publishedDate?: Maybe<Scalars['DateTime']['output']>
  publishedDateString?: Maybe<Scalars['String']['output']>
  redirect?: Maybe<Scalars['String']['output']>
  related_videos?: Maybe<Array<Video>>
  related_videosCount?: Maybe<Scalars['Int']['output']>
  related_videosInInputOrder?: Maybe<Array<Maybe<Video>>>
  relateds?: Maybe<Array<Post>>
  relatedsCount?: Maybe<Scalars['Int']['output']>
  relatedsInInputOrder?: Maybe<Array<Maybe<Post>>>
  sections?: Maybe<Array<Section>>
  sectionsCount?: Maybe<Scalars['Int']['output']>
  sectionsInInputOrder?: Maybe<Array<Maybe<Section>>>
  slug?: Maybe<Scalars['String']['output']>
  state?: Maybe<Scalars['String']['output']>
  style?: Maybe<Scalars['String']['output']>
  subtitle?: Maybe<Scalars['String']['output']>
  tags?: Maybe<Array<Tag>>
  tagsCount?: Maybe<Scalars['Int']['output']>
  tags_algo?: Maybe<Array<Tag>>
  tags_algoCount?: Maybe<Scalars['Int']['output']>
  title?: Maybe<Scalars['String']['output']>
  topics?: Maybe<Topic>
  trimmedApiData?: Maybe<Scalars['JSON']['output']>
  trimmedContent?: Maybe<Scalars['JSON']['output']>
  updateTimeStamp?: Maybe<Scalars['Boolean']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  vocals?: Maybe<Array<Contact>>
  vocalsCount?: Maybe<Scalars['Int']['output']>
  writers?: Maybe<Array<Contact>>
  writersCount?: Maybe<Scalars['Int']['output']>
  writersInInputOrder?: Maybe<Array<Maybe<Contact>>>
}

export type PostCamera_ManArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>
  orderBy?: Array<ContactOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ContactWhereInput
}

export type PostCamera_ManCountArgs = {
  where?: ContactWhereInput
}

export type PostCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>
  orderBy?: Array<CategoryOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CategoryWhereInput
}

export type PostCategoriesCountArgs = {
  where?: CategoryWhereInput
}

export type PostDesignersArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>
  orderBy?: Array<ContactOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ContactWhereInput
}

export type PostDesignersCountArgs = {
  where?: ContactWhereInput
}

export type PostEngineersArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>
  orderBy?: Array<ContactOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ContactWhereInput
}

export type PostEngineersCountArgs = {
  where?: ContactWhereInput
}

export type PostFrom_External_RelatedsArgs = {
  cursor?: InputMaybe<ExternalWhereUniqueInput>
  orderBy?: Array<ExternalOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ExternalWhereInput
}

export type PostFrom_External_RelatedsCountArgs = {
  where?: ExternalWhereInput
}

export type PostGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>
  orderBy?: Array<GroupOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: GroupWhereInput
}

export type PostGroupsCountArgs = {
  where?: GroupWhereInput
}

export type PostPhotographersArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>
  orderBy?: Array<ContactOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ContactWhereInput
}

export type PostPhotographersCountArgs = {
  where?: ContactWhereInput
}

export type PostRelated_VideosArgs = {
  cursor?: InputMaybe<VideoWhereUniqueInput>
  orderBy?: Array<VideoOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: VideoWhereInput
}

export type PostRelated_VideosCountArgs = {
  where?: VideoWhereInput
}

export type PostRelatedsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type PostRelatedsCountArgs = {
  where?: PostWhereInput
}

export type PostSectionsArgs = {
  cursor?: InputMaybe<SectionWhereUniqueInput>
  orderBy?: Array<SectionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: SectionWhereInput
}

export type PostSectionsCountArgs = {
  where?: SectionWhereInput
}

export type PostTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type PostTagsCountArgs = {
  where?: TagWhereInput
}

export type PostTags_AlgoArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type PostTags_AlgoCountArgs = {
  where?: TagWhereInput
}

export type PostVocalsArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>
  orderBy?: Array<ContactOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ContactWhereInput
}

export type PostVocalsCountArgs = {
  where?: ContactWhereInput
}

export type PostWritersArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>
  orderBy?: Array<ContactOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ContactWhereInput
}

export type PostWritersCountArgs = {
  where?: ContactWhereInput
}

export type PostCreateInput = {
  adTrace?: InputMaybe<Scalars['String']['input']>
  apiData?: InputMaybe<Scalars['JSON']['input']>
  apiDataBrief?: InputMaybe<Scalars['JSON']['input']>
  brief?: InputMaybe<Scalars['JSON']['input']>
  camera_man?: InputMaybe<ContactRelateToManyForCreateInput>
  categories?: InputMaybe<CategoryRelateToManyForCreateInput>
  content?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  css?: InputMaybe<Scalars['String']['input']>
  designers?: InputMaybe<ContactRelateToManyForCreateInput>
  engineers?: InputMaybe<ContactRelateToManyForCreateInput>
  extend_byline?: InputMaybe<Scalars['String']['input']>
  from_External_relateds?: InputMaybe<ExternalRelateToManyForCreateInput>
  groups?: InputMaybe<GroupRelateToManyForCreateInput>
  heroCaption?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  heroVideo?: InputMaybe<VideoRelateToOneForCreateInput>
  hiddenAdvertised?: InputMaybe<Scalars['Boolean']['input']>
  isAdult?: InputMaybe<Scalars['Boolean']['input']>
  isAdvertised?: InputMaybe<Scalars['Boolean']['input']>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  isMember?: InputMaybe<Scalars['Boolean']['input']>
  lockBy?: InputMaybe<UserRelateToOneForCreateInput>
  lockExpireAt?: InputMaybe<Scalars['DateTime']['input']>
  manualOrderOfCategories?: InputMaybe<Scalars['JSON']['input']>
  manualOrderOfRelatedVideos?: InputMaybe<Scalars['JSON']['input']>
  manualOrderOfRelateds?: InputMaybe<Scalars['JSON']['input']>
  manualOrderOfSections?: InputMaybe<Scalars['JSON']['input']>
  manualOrderOfWriters?: InputMaybe<Scalars['JSON']['input']>
  og_description?: InputMaybe<Scalars['String']['input']>
  og_image?: InputMaybe<PhotoRelateToOneForCreateInput>
  og_title?: InputMaybe<Scalars['String']['input']>
  photographers?: InputMaybe<ContactRelateToManyForCreateInput>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  publishedDateString?: InputMaybe<Scalars['String']['input']>
  redirect?: InputMaybe<Scalars['String']['input']>
  related_videos?: InputMaybe<VideoRelateToManyForCreateInput>
  relateds?: InputMaybe<PostRelateToManyForCreateInput>
  sections?: InputMaybe<SectionRelateToManyForCreateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  style?: InputMaybe<Scalars['String']['input']>
  subtitle?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForCreateInput>
  tags_algo?: InputMaybe<TagRelateToManyForCreateInput>
  title?: InputMaybe<Scalars['String']['input']>
  topics?: InputMaybe<TopicRelateToOneForCreateInput>
  updateTimeStamp?: InputMaybe<Scalars['Boolean']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  vocals?: InputMaybe<ContactRelateToManyForCreateInput>
  writers?: InputMaybe<ContactRelateToManyForCreateInput>
}

export type PostManyRelationFilter = {
  every?: InputMaybe<PostWhereInput>
  none?: InputMaybe<PostWhereInput>
  some?: InputMaybe<PostWhereInput>
}

export type PostOrderByInput = {
  adTrace?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  css?: InputMaybe<OrderDirection>
  extend_byline?: InputMaybe<OrderDirection>
  heroCaption?: InputMaybe<OrderDirection>
  hiddenAdvertised?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isAdult?: InputMaybe<OrderDirection>
  isAdvertised?: InputMaybe<OrderDirection>
  isFeatured?: InputMaybe<OrderDirection>
  isMember?: InputMaybe<OrderDirection>
  lockExpireAt?: InputMaybe<OrderDirection>
  og_description?: InputMaybe<OrderDirection>
  og_title?: InputMaybe<OrderDirection>
  publishedDate?: InputMaybe<OrderDirection>
  publishedDateString?: InputMaybe<OrderDirection>
  redirect?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  style?: InputMaybe<OrderDirection>
  subtitle?: InputMaybe<OrderDirection>
  title?: InputMaybe<OrderDirection>
  updateTimeStamp?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type PostRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>
  create?: InputMaybe<Array<PostCreateInput>>
}

export type PostRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>
  create?: InputMaybe<Array<PostCreateInput>>
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>
  set?: InputMaybe<Array<PostWhereUniqueInput>>
}

export type PostRelateToOneForCreateInput = {
  connect?: InputMaybe<PostWhereUniqueInput>
  create?: InputMaybe<PostCreateInput>
}

export type PostRelateToOneForUpdateInput = {
  connect?: InputMaybe<PostWhereUniqueInput>
  create?: InputMaybe<PostCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type PostUpdateArgs = {
  data: PostUpdateInput
  where: PostWhereUniqueInput
}

export type PostUpdateInput = {
  adTrace?: InputMaybe<Scalars['String']['input']>
  apiData?: InputMaybe<Scalars['JSON']['input']>
  apiDataBrief?: InputMaybe<Scalars['JSON']['input']>
  brief?: InputMaybe<Scalars['JSON']['input']>
  camera_man?: InputMaybe<ContactRelateToManyForUpdateInput>
  categories?: InputMaybe<CategoryRelateToManyForUpdateInput>
  content?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  css?: InputMaybe<Scalars['String']['input']>
  designers?: InputMaybe<ContactRelateToManyForUpdateInput>
  engineers?: InputMaybe<ContactRelateToManyForUpdateInput>
  extend_byline?: InputMaybe<Scalars['String']['input']>
  from_External_relateds?: InputMaybe<ExternalRelateToManyForUpdateInput>
  groups?: InputMaybe<GroupRelateToManyForUpdateInput>
  heroCaption?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  heroVideo?: InputMaybe<VideoRelateToOneForUpdateInput>
  hiddenAdvertised?: InputMaybe<Scalars['Boolean']['input']>
  isAdult?: InputMaybe<Scalars['Boolean']['input']>
  isAdvertised?: InputMaybe<Scalars['Boolean']['input']>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  isMember?: InputMaybe<Scalars['Boolean']['input']>
  lockBy?: InputMaybe<UserRelateToOneForUpdateInput>
  lockExpireAt?: InputMaybe<Scalars['DateTime']['input']>
  manualOrderOfCategories?: InputMaybe<Scalars['JSON']['input']>
  manualOrderOfRelatedVideos?: InputMaybe<Scalars['JSON']['input']>
  manualOrderOfRelateds?: InputMaybe<Scalars['JSON']['input']>
  manualOrderOfSections?: InputMaybe<Scalars['JSON']['input']>
  manualOrderOfWriters?: InputMaybe<Scalars['JSON']['input']>
  og_description?: InputMaybe<Scalars['String']['input']>
  og_image?: InputMaybe<PhotoRelateToOneForUpdateInput>
  og_title?: InputMaybe<Scalars['String']['input']>
  photographers?: InputMaybe<ContactRelateToManyForUpdateInput>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  publishedDateString?: InputMaybe<Scalars['String']['input']>
  redirect?: InputMaybe<Scalars['String']['input']>
  related_videos?: InputMaybe<VideoRelateToManyForUpdateInput>
  relateds?: InputMaybe<PostRelateToManyForUpdateInput>
  sections?: InputMaybe<SectionRelateToManyForUpdateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  style?: InputMaybe<Scalars['String']['input']>
  subtitle?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForUpdateInput>
  tags_algo?: InputMaybe<TagRelateToManyForUpdateInput>
  title?: InputMaybe<Scalars['String']['input']>
  topics?: InputMaybe<TopicRelateToOneForUpdateInput>
  updateTimeStamp?: InputMaybe<Scalars['Boolean']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  vocals?: InputMaybe<ContactRelateToManyForUpdateInput>
  writers?: InputMaybe<ContactRelateToManyForUpdateInput>
}

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>
  NOT?: InputMaybe<Array<PostWhereInput>>
  OR?: InputMaybe<Array<PostWhereInput>>
  adTrace?: InputMaybe<StringFilter>
  camera_man?: InputMaybe<ContactManyRelationFilter>
  categories?: InputMaybe<CategoryManyRelationFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  css?: InputMaybe<StringFilter>
  designers?: InputMaybe<ContactManyRelationFilter>
  engineers?: InputMaybe<ContactManyRelationFilter>
  extend_byline?: InputMaybe<StringFilter>
  heroImage?: InputMaybe<PhotoWhereInput>
  heroVideo?: InputMaybe<VideoWhereInput>
  hiddenAdvertised?: InputMaybe<BooleanFilter>
  id?: InputMaybe<IdFilter>
  isAdult?: InputMaybe<BooleanFilter>
  isAdvertised?: InputMaybe<BooleanFilter>
  isFeatured?: InputMaybe<BooleanFilter>
  isMember?: InputMaybe<BooleanFilter>
  lockExpireAt?: InputMaybe<DateTimeNullableFilter>
  og_title?: InputMaybe<StringFilter>
  photographers?: InputMaybe<ContactManyRelationFilter>
  publishedDate?: InputMaybe<DateTimeFilter>
  publishedDateString?: InputMaybe<StringFilter>
  redirect?: InputMaybe<StringFilter>
  relateds?: InputMaybe<PostManyRelationFilter>
  sections?: InputMaybe<SectionManyRelationFilter>
  slug?: InputMaybe<StringFilter>
  state?: InputMaybe<StringNullableFilter>
  style?: InputMaybe<StringNullableFilter>
  subtitle?: InputMaybe<StringFilter>
  tags?: InputMaybe<TagManyRelationFilter>
  title?: InputMaybe<StringFilter>
  topics?: InputMaybe<TopicWhereInput>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  vocals?: InputMaybe<ContactManyRelationFilter>
  writers?: InputMaybe<ContactManyRelationFilter>
}

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type Query = {
  __typename?: 'Query'
  audioFile?: Maybe<AudioFile>
  audioFiles?: Maybe<Array<AudioFile>>
  audioFilesCount?: Maybe<Scalars['Int']['output']>
  authenticatedItem?: Maybe<AuthenticatedItem>
  categories?: Maybe<Array<Category>>
  categoriesCount?: Maybe<Scalars['Int']['output']>
  category?: Maybe<Category>
  contact?: Maybe<Contact>
  contacts?: Maybe<Array<Contact>>
  contactsCount?: Maybe<Scalars['Int']['output']>
  editorChoice?: Maybe<EditorChoice>
  editorChoices?: Maybe<Array<EditorChoice>>
  editorChoicesCount?: Maybe<Scalars['Int']['output']>
  event?: Maybe<Event>
  events?: Maybe<Array<Event>>
  eventsCount?: Maybe<Scalars['Int']['output']>
  external?: Maybe<External>
  externals?: Maybe<Array<External>>
  externalsCount?: Maybe<Scalars['Int']['output']>
  game?: Maybe<Game>
  games?: Maybe<Array<Game>>
  gamesCount?: Maybe<Scalars['Int']['output']>
  group?: Maybe<Group>
  groups?: Maybe<Array<Group>>
  groupsCount?: Maybe<Scalars['Int']['output']>
  header?: Maybe<Header>
  headers?: Maybe<Array<Header>>
  headersCount?: Maybe<Scalars['Int']['output']>
  keystone: KeystoneMeta
  partner?: Maybe<Partner>
  partners?: Maybe<Array<Partner>>
  partnersCount?: Maybe<Scalars['Int']['output']>
  photo?: Maybe<Photo>
  photos?: Maybe<Array<Photo>>
  photosCount?: Maybe<Scalars['Int']['output']>
  post?: Maybe<Post>
  posts?: Maybe<Array<Post>>
  postsCount?: Maybe<Scalars['Int']['output']>
  section?: Maybe<Section>
  sections?: Maybe<Array<Section>>
  sectionsCount?: Maybe<Scalars['Int']['output']>
  tag?: Maybe<Tag>
  tags?: Maybe<Array<Tag>>
  tagsCount?: Maybe<Scalars['Int']['output']>
  topic?: Maybe<Topic>
  topics?: Maybe<Array<Topic>>
  topicsCount?: Maybe<Scalars['Int']['output']>
  user?: Maybe<User>
  users?: Maybe<Array<User>>
  usersCount?: Maybe<Scalars['Int']['output']>
  video?: Maybe<Video>
  videos?: Maybe<Array<Video>>
  videosCount?: Maybe<Scalars['Int']['output']>
}

export type QueryAudioFileArgs = {
  where: AudioFileWhereUniqueInput
}

export type QueryAudioFilesArgs = {
  cursor?: InputMaybe<AudioFileWhereUniqueInput>
  orderBy?: Array<AudioFileOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: AudioFileWhereInput
}

export type QueryAudioFilesCountArgs = {
  where?: AudioFileWhereInput
}

export type QueryCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>
  orderBy?: Array<CategoryOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CategoryWhereInput
}

export type QueryCategoriesCountArgs = {
  where?: CategoryWhereInput
}

export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput
}

export type QueryContactArgs = {
  where: ContactWhereUniqueInput
}

export type QueryContactsArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>
  orderBy?: Array<ContactOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ContactWhereInput
}

export type QueryContactsCountArgs = {
  where?: ContactWhereInput
}

export type QueryEditorChoiceArgs = {
  where: EditorChoiceWhereUniqueInput
}

export type QueryEditorChoicesArgs = {
  cursor?: InputMaybe<EditorChoiceWhereUniqueInput>
  orderBy?: Array<EditorChoiceOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: EditorChoiceWhereInput
}

export type QueryEditorChoicesCountArgs = {
  where?: EditorChoiceWhereInput
}

export type QueryEventArgs = {
  where: EventWhereUniqueInput
}

export type QueryEventsArgs = {
  cursor?: InputMaybe<EventWhereUniqueInput>
  orderBy?: Array<EventOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: EventWhereInput
}

export type QueryEventsCountArgs = {
  where?: EventWhereInput
}

export type QueryExternalArgs = {
  where: ExternalWhereUniqueInput
}

export type QueryExternalsArgs = {
  cursor?: InputMaybe<ExternalWhereUniqueInput>
  orderBy?: Array<ExternalOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ExternalWhereInput
}

export type QueryExternalsCountArgs = {
  where?: ExternalWhereInput
}

export type QueryGameArgs = {
  where: GameWhereUniqueInput
}

export type QueryGamesArgs = {
  cursor?: InputMaybe<GameWhereUniqueInput>
  orderBy?: Array<GameOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: GameWhereInput
}

export type QueryGamesCountArgs = {
  where?: GameWhereInput
}

export type QueryGroupArgs = {
  where: GroupWhereUniqueInput
}

export type QueryGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>
  orderBy?: Array<GroupOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: GroupWhereInput
}

export type QueryGroupsCountArgs = {
  where?: GroupWhereInput
}

export type QueryHeaderArgs = {
  where: HeaderWhereUniqueInput
}

export type QueryHeadersArgs = {
  cursor?: InputMaybe<HeaderWhereUniqueInput>
  orderBy?: Array<HeaderOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: HeaderWhereInput
}

export type QueryHeadersCountArgs = {
  where?: HeaderWhereInput
}

export type QueryPartnerArgs = {
  where: PartnerWhereUniqueInput
}

export type QueryPartnersArgs = {
  cursor?: InputMaybe<PartnerWhereUniqueInput>
  orderBy?: Array<PartnerOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PartnerWhereInput
}

export type QueryPartnersCountArgs = {
  where?: PartnerWhereInput
}

export type QueryPhotoArgs = {
  where: PhotoWhereUniqueInput
}

export type QueryPhotosArgs = {
  cursor?: InputMaybe<PhotoWhereUniqueInput>
  orderBy?: Array<PhotoOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PhotoWhereInput
}

export type QueryPhotosCountArgs = {
  where?: PhotoWhereInput
}

export type QueryPostArgs = {
  where: PostWhereUniqueInput
}

export type QueryPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type QueryPostsCountArgs = {
  where?: PostWhereInput
}

export type QuerySectionArgs = {
  where: SectionWhereUniqueInput
}

export type QuerySectionsArgs = {
  cursor?: InputMaybe<SectionWhereUniqueInput>
  orderBy?: Array<SectionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: SectionWhereInput
}

export type QuerySectionsCountArgs = {
  where?: SectionWhereInput
}

export type QueryTagArgs = {
  where: TagWhereUniqueInput
}

export type QueryTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type QueryTagsCountArgs = {
  where?: TagWhereInput
}

export type QueryTopicArgs = {
  where: TopicWhereUniqueInput
}

export type QueryTopicsArgs = {
  cursor?: InputMaybe<TopicWhereUniqueInput>
  orderBy?: Array<TopicOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TopicWhereInput
}

export type QueryTopicsCountArgs = {
  where?: TopicWhereInput
}

export type QueryUserArgs = {
  where: UserWhereUniqueInput
}

export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>
  orderBy?: Array<UserOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: UserWhereInput
}

export type QueryUsersCountArgs = {
  where?: UserWhereInput
}

export type QueryVideoArgs = {
  where: VideoWhereUniqueInput
}

export type QueryVideosArgs = {
  cursor?: InputMaybe<VideoWhereUniqueInput>
  orderBy?: Array<VideoOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: VideoWhereInput
}

export type QueryVideosCountArgs = {
  where?: VideoWhereInput
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type ResizedImages = {
  __typename?: 'ResizedImages'
  original?: Maybe<Scalars['String']['output']>
  w480?: Maybe<Scalars['String']['output']>
  w800?: Maybe<Scalars['String']['output']>
  w1200?: Maybe<Scalars['String']['output']>
  w1600?: Maybe<Scalars['String']['output']>
  w2400?: Maybe<Scalars['String']['output']>
}

export type ResizedWebPImages = {
  __typename?: 'ResizedWebPImages'
  original?: Maybe<Scalars['String']['output']>
  w480?: Maybe<Scalars['String']['output']>
  w800?: Maybe<Scalars['String']['output']>
  w1200?: Maybe<Scalars['String']['output']>
  w1600?: Maybe<Scalars['String']['output']>
  w2400?: Maybe<Scalars['String']['output']>
}

export type Section = {
  __typename?: 'Section'
  categories?: Maybe<Array<Category>>
  categoriesCount?: Maybe<Scalars['Int']['output']>
  color?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  description?: Maybe<Scalars['String']['output']>
  heroImage?: Maybe<Photo>
  id: Scalars['ID']['output']
  isFeatured?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  order?: Maybe<Scalars['Int']['output']>
  posts?: Maybe<Array<Post>>
  postsCount?: Maybe<Scalars['Int']['output']>
  slug?: Maybe<Scalars['String']['output']>
  state?: Maybe<Scalars['String']['output']>
  topics?: Maybe<Array<Topic>>
  topicsCount?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type SectionCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>
  orderBy?: Array<CategoryOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CategoryWhereInput
}

export type SectionCategoriesCountArgs = {
  where?: CategoryWhereInput
}

export type SectionPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type SectionPostsCountArgs = {
  where?: PostWhereInput
}

export type SectionTopicsArgs = {
  cursor?: InputMaybe<TopicWhereUniqueInput>
  orderBy?: Array<TopicOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TopicWhereInput
}

export type SectionTopicsCountArgs = {
  where?: TopicWhereInput
}

export type SectionCreateInput = {
  categories?: InputMaybe<CategoryRelateToManyForCreateInput>
  color?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  description?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
  posts?: InputMaybe<PostRelateToManyForCreateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  topics?: InputMaybe<TopicRelateToManyForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type SectionManyRelationFilter = {
  every?: InputMaybe<SectionWhereInput>
  none?: InputMaybe<SectionWhereInput>
  some?: InputMaybe<SectionWhereInput>
}

export type SectionOrderByInput = {
  color?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  description?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isFeatured?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  order?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type SectionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<SectionWhereUniqueInput>>
  create?: InputMaybe<Array<SectionCreateInput>>
}

export type SectionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<SectionWhereUniqueInput>>
  create?: InputMaybe<Array<SectionCreateInput>>
  disconnect?: InputMaybe<Array<SectionWhereUniqueInput>>
  set?: InputMaybe<Array<SectionWhereUniqueInput>>
}

export type SectionRelateToOneForCreateInput = {
  connect?: InputMaybe<SectionWhereUniqueInput>
  create?: InputMaybe<SectionCreateInput>
}

export type SectionRelateToOneForUpdateInput = {
  connect?: InputMaybe<SectionWhereUniqueInput>
  create?: InputMaybe<SectionCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type SectionUpdateArgs = {
  data: SectionUpdateInput
  where: SectionWhereUniqueInput
}

export type SectionUpdateInput = {
  categories?: InputMaybe<CategoryRelateToManyForUpdateInput>
  color?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  description?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
  posts?: InputMaybe<PostRelateToManyForUpdateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  topics?: InputMaybe<TopicRelateToManyForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type SectionWhereInput = {
  AND?: InputMaybe<Array<SectionWhereInput>>
  NOT?: InputMaybe<Array<SectionWhereInput>>
  OR?: InputMaybe<Array<SectionWhereInput>>
  categories?: InputMaybe<CategoryManyRelationFilter>
  color?: InputMaybe<CustomStringFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  description?: InputMaybe<StringFilter>
  heroImage?: InputMaybe<PhotoWhereInput>
  id?: InputMaybe<IdFilter>
  isFeatured?: InputMaybe<BooleanFilter>
  name?: InputMaybe<StringFilter>
  order?: InputMaybe<IntNullableFilter>
  posts?: InputMaybe<PostManyRelationFilter>
  slug?: InputMaybe<StringFilter>
  state?: InputMaybe<StringFilter>
  topics?: InputMaybe<TopicManyRelationFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type SectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedStringFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedStringNullableFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type Tag = {
  __typename?: 'Tag'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  externals?: Maybe<Array<External>>
  externalsCount?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  posts?: Maybe<Array<Post>>
  postsCount?: Maybe<Scalars['Int']['output']>
  posts_algo?: Maybe<Array<Post>>
  posts_algoCount?: Maybe<Scalars['Int']['output']>
  slug?: Maybe<Scalars['String']['output']>
  topics?: Maybe<Array<Topic>>
  topicsCount?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type TagExternalsArgs = {
  cursor?: InputMaybe<ExternalWhereUniqueInput>
  orderBy?: Array<ExternalOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: ExternalWhereInput
}

export type TagExternalsCountArgs = {
  where?: ExternalWhereInput
}

export type TagPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type TagPostsCountArgs = {
  where?: PostWhereInput
}

export type TagPosts_AlgoArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type TagPosts_AlgoCountArgs = {
  where?: PostWhereInput
}

export type TagTopicsArgs = {
  cursor?: InputMaybe<TopicWhereUniqueInput>
  orderBy?: Array<TopicOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TopicWhereInput
}

export type TagTopicsCountArgs = {
  where?: TopicWhereInput
}

export type TagCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  externals?: InputMaybe<ExternalRelateToManyForCreateInput>
  name?: InputMaybe<Scalars['String']['input']>
  posts?: InputMaybe<PostRelateToManyForCreateInput>
  posts_algo?: InputMaybe<PostRelateToManyForCreateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  topics?: InputMaybe<TopicRelateToManyForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type TagManyRelationFilter = {
  every?: InputMaybe<TagWhereInput>
  none?: InputMaybe<TagWhereInput>
  some?: InputMaybe<TagWhereInput>
}

export type TagOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type TagRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>
  create?: InputMaybe<Array<TagCreateInput>>
}

export type TagRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>
  create?: InputMaybe<Array<TagCreateInput>>
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>
  set?: InputMaybe<Array<TagWhereUniqueInput>>
}

export type TagUpdateArgs = {
  data: TagUpdateInput
  where: TagWhereUniqueInput
}

export type TagUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  externals?: InputMaybe<ExternalRelateToManyForUpdateInput>
  name?: InputMaybe<Scalars['String']['input']>
  posts?: InputMaybe<PostRelateToManyForUpdateInput>
  posts_algo?: InputMaybe<PostRelateToManyForUpdateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  topics?: InputMaybe<TopicRelateToManyForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>
  NOT?: InputMaybe<Array<TagWhereInput>>
  OR?: InputMaybe<Array<TagWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  externals?: InputMaybe<ExternalManyRelationFilter>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  posts?: InputMaybe<PostManyRelationFilter>
  posts_algo?: InputMaybe<PostManyRelationFilter>
  slug?: InputMaybe<StringFilter>
  topics?: InputMaybe<TopicManyRelationFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type Topic = {
  __typename?: 'Topic'
  brief?: Maybe<Scalars['JSON']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  dfp?: Maybe<Scalars['String']['output']>
  heroImage?: Maybe<Photo>
  heroUrl?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isFeatured?: Maybe<Scalars['Boolean']['output']>
  javascript?: Maybe<Scalars['String']['output']>
  leading?: Maybe<Scalars['String']['output']>
  manualOrderOfSlideshowImages?: Maybe<Scalars['JSON']['output']>
  mobile_dfp?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  og_description?: Maybe<Scalars['String']['output']>
  og_image?: Maybe<Photo>
  og_title?: Maybe<Scalars['String']['output']>
  posts?: Maybe<Array<Post>>
  postsCount?: Maybe<Scalars['Int']['output']>
  sections?: Maybe<Array<Section>>
  sectionsCount?: Maybe<Scalars['Int']['output']>
  slideshow_images?: Maybe<Array<Photo>>
  slideshow_imagesCount?: Maybe<Scalars['Int']['output']>
  slideshow_imagesInInputOrder?: Maybe<Array<Maybe<Photo>>>
  slug?: Maybe<Scalars['String']['output']>
  sortOrder?: Maybe<Scalars['Int']['output']>
  state?: Maybe<Scalars['String']['output']>
  style?: Maybe<Scalars['String']['output']>
  tags?: Maybe<Array<Tag>>
  tagsCount?: Maybe<Scalars['Int']['output']>
  title_style?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type TopicPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type TopicPostsCountArgs = {
  where?: PostWhereInput
}

export type TopicSectionsArgs = {
  cursor?: InputMaybe<SectionWhereUniqueInput>
  orderBy?: Array<SectionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: SectionWhereInput
}

export type TopicSectionsCountArgs = {
  where?: SectionWhereInput
}

export type TopicSlideshow_ImagesArgs = {
  cursor?: InputMaybe<PhotoWhereUniqueInput>
  orderBy?: Array<PhotoOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PhotoWhereInput
}

export type TopicSlideshow_ImagesCountArgs = {
  where?: PhotoWhereInput
}

export type TopicTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type TopicTagsCountArgs = {
  where?: TagWhereInput
}

export type TopicCreateInput = {
  brief?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  dfp?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  heroUrl?: InputMaybe<Scalars['String']['input']>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  javascript?: InputMaybe<Scalars['String']['input']>
  leading?: InputMaybe<Scalars['String']['input']>
  manualOrderOfSlideshowImages?: InputMaybe<Scalars['JSON']['input']>
  mobile_dfp?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  og_description?: InputMaybe<Scalars['String']['input']>
  og_image?: InputMaybe<PhotoRelateToOneForCreateInput>
  og_title?: InputMaybe<Scalars['String']['input']>
  posts?: InputMaybe<PostRelateToManyForCreateInput>
  sections?: InputMaybe<SectionRelateToManyForCreateInput>
  slideshow_images?: InputMaybe<PhotoRelateToManyForCreateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  sortOrder?: InputMaybe<Scalars['Int']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  style?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForCreateInput>
  title_style?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type TopicManyRelationFilter = {
  every?: InputMaybe<TopicWhereInput>
  none?: InputMaybe<TopicWhereInput>
  some?: InputMaybe<TopicWhereInput>
}

export type TopicOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  dfp?: InputMaybe<OrderDirection>
  heroUrl?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isFeatured?: InputMaybe<OrderDirection>
  javascript?: InputMaybe<OrderDirection>
  leading?: InputMaybe<OrderDirection>
  mobile_dfp?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  og_description?: InputMaybe<OrderDirection>
  og_title?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  sortOrder?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  style?: InputMaybe<OrderDirection>
  title_style?: InputMaybe<OrderDirection>
  type?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type TopicRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TopicWhereUniqueInput>>
  create?: InputMaybe<Array<TopicCreateInput>>
}

export type TopicRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TopicWhereUniqueInput>>
  create?: InputMaybe<Array<TopicCreateInput>>
  disconnect?: InputMaybe<Array<TopicWhereUniqueInput>>
  set?: InputMaybe<Array<TopicWhereUniqueInput>>
}

export type TopicRelateToOneForCreateInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>
  create?: InputMaybe<TopicCreateInput>
}

export type TopicRelateToOneForUpdateInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>
  create?: InputMaybe<TopicCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type TopicUpdateArgs = {
  data: TopicUpdateInput
  where: TopicWhereUniqueInput
}

export type TopicUpdateInput = {
  brief?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  dfp?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  heroUrl?: InputMaybe<Scalars['String']['input']>
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>
  javascript?: InputMaybe<Scalars['String']['input']>
  leading?: InputMaybe<Scalars['String']['input']>
  manualOrderOfSlideshowImages?: InputMaybe<Scalars['JSON']['input']>
  mobile_dfp?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  og_description?: InputMaybe<Scalars['String']['input']>
  og_image?: InputMaybe<PhotoRelateToOneForUpdateInput>
  og_title?: InputMaybe<Scalars['String']['input']>
  posts?: InputMaybe<PostRelateToManyForUpdateInput>
  sections?: InputMaybe<SectionRelateToManyForUpdateInput>
  slideshow_images?: InputMaybe<PhotoRelateToManyForUpdateInput>
  slug?: InputMaybe<Scalars['String']['input']>
  sortOrder?: InputMaybe<Scalars['Int']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  style?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForUpdateInput>
  title_style?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type TopicWhereInput = {
  AND?: InputMaybe<Array<TopicWhereInput>>
  NOT?: InputMaybe<Array<TopicWhereInput>>
  OR?: InputMaybe<Array<TopicWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  dfp?: InputMaybe<StringFilter>
  heroImage?: InputMaybe<PhotoWhereInput>
  heroUrl?: InputMaybe<StringNullableFilter>
  id?: InputMaybe<IdFilter>
  isFeatured?: InputMaybe<BooleanFilter>
  javascript?: InputMaybe<StringFilter>
  leading?: InputMaybe<StringNullableFilter>
  mobile_dfp?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  og_description?: InputMaybe<StringFilter>
  og_image?: InputMaybe<PhotoWhereInput>
  og_title?: InputMaybe<StringFilter>
  posts?: InputMaybe<PostManyRelationFilter>
  sections?: InputMaybe<SectionManyRelationFilter>
  slideshow_images?: InputMaybe<PhotoManyRelationFilter>
  slug?: InputMaybe<StringFilter>
  sortOrder?: InputMaybe<IntNullableFilter>
  state?: InputMaybe<StringNullableFilter>
  style?: InputMaybe<StringFilter>
  tags?: InputMaybe<TagManyRelationFilter>
  title_style?: InputMaybe<StringNullableFilter>
  type?: InputMaybe<StringNullableFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type TopicWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type User = {
  __typename?: 'User'
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isProtected?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  password?: Maybe<PasswordState>
  role?: Maybe<Scalars['String']['output']>
}

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure'
  message: Scalars['String']['output']
}

export type UserAuthenticationWithPasswordResult =
  | UserAuthenticationWithPasswordFailure
  | UserAuthenticationWithPasswordSuccess

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess'
  item: User
  sessionToken: Scalars['String']['output']
}

export type UserCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>
  isProtected?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['String']['input']>
}

export type UserOrderByInput = {
  email?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isProtected?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  role?: InputMaybe<OrderDirection>
}

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>
  create?: InputMaybe<UserCreateInput>
}

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>
  create?: InputMaybe<UserCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type UserUpdateArgs = {
  data: UserUpdateInput
  where: UserWhereUniqueInput
}

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>
  isProtected?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['String']['input']>
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>
  NOT?: InputMaybe<Array<UserWhereInput>>
  OR?: InputMaybe<Array<UserWhereInput>>
  email?: InputMaybe<StringFilter>
  id?: InputMaybe<IdFilter>
  isProtected?: InputMaybe<BooleanFilter>
  name?: InputMaybe<StringFilter>
  role?: InputMaybe<StringFilter>
}

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Video = {
  __typename?: 'Video'
  apiData?: Maybe<Scalars['JSON']['output']>
  content?: Maybe<Scalars['JSON']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  file?: Maybe<FileFieldOutput>
  heroImage?: Maybe<Photo>
  id: Scalars['ID']['output']
  isFeed?: Maybe<Scalars['Boolean']['output']>
  manualOrderOfRelatedPosts?: Maybe<Scalars['JSON']['output']>
  name?: Maybe<Scalars['String']['output']>
  publishedDate?: Maybe<Scalars['DateTime']['output']>
  related_posts?: Maybe<Array<Post>>
  related_postsCount?: Maybe<Scalars['Int']['output']>
  related_postsInInputOrder?: Maybe<Array<Maybe<Post>>>
  state?: Maybe<Scalars['String']['output']>
  tags?: Maybe<Array<Tag>>
  tagsCount?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  urlOriginal?: Maybe<Scalars['String']['output']>
  videoSection?: Maybe<Scalars['String']['output']>
  videoSrc?: Maybe<Scalars['String']['output']>
}

export type VideoRelated_PostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>
  orderBy?: Array<PostOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PostWhereInput
}

export type VideoRelated_PostsCountArgs = {
  where?: PostWhereInput
}

export type VideoTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type VideoTagsCountArgs = {
  where?: TagWhereInput
}

export type VideoCreateInput = {
  apiData?: InputMaybe<Scalars['JSON']['input']>
  content?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  file?: InputMaybe<FileFieldInput>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  isFeed?: InputMaybe<Scalars['Boolean']['input']>
  manualOrderOfRelatedPosts?: InputMaybe<Scalars['JSON']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  related_posts?: InputMaybe<PostRelateToManyForCreateInput>
  state?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  urlOriginal?: InputMaybe<Scalars['String']['input']>
  videoSection?: InputMaybe<Scalars['String']['input']>
}

export type VideoOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isFeed?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  publishedDate?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  urlOriginal?: InputMaybe<OrderDirection>
  videoSection?: InputMaybe<OrderDirection>
}

export type VideoRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<VideoWhereUniqueInput>>
  create?: InputMaybe<Array<VideoCreateInput>>
}

export type VideoRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<VideoWhereUniqueInput>>
  create?: InputMaybe<Array<VideoCreateInput>>
  disconnect?: InputMaybe<Array<VideoWhereUniqueInput>>
  set?: InputMaybe<Array<VideoWhereUniqueInput>>
}

export type VideoRelateToOneForCreateInput = {
  connect?: InputMaybe<VideoWhereUniqueInput>
  create?: InputMaybe<VideoCreateInput>
}

export type VideoRelateToOneForUpdateInput = {
  connect?: InputMaybe<VideoWhereUniqueInput>
  create?: InputMaybe<VideoCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type VideoUpdateArgs = {
  data: VideoUpdateInput
  where: VideoWhereUniqueInput
}

export type VideoUpdateInput = {
  apiData?: InputMaybe<Scalars['JSON']['input']>
  content?: InputMaybe<Scalars['JSON']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  file?: InputMaybe<FileFieldInput>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  isFeed?: InputMaybe<Scalars['Boolean']['input']>
  manualOrderOfRelatedPosts?: InputMaybe<Scalars['JSON']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['DateTime']['input']>
  related_posts?: InputMaybe<PostRelateToManyForUpdateInput>
  state?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<TagRelateToManyForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  urlOriginal?: InputMaybe<Scalars['String']['input']>
  videoSection?: InputMaybe<Scalars['String']['input']>
}

export type VideoWhereInput = {
  AND?: InputMaybe<Array<VideoWhereInput>>
  NOT?: InputMaybe<Array<VideoWhereInput>>
  OR?: InputMaybe<Array<VideoWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  heroImage?: InputMaybe<PhotoWhereInput>
  id?: InputMaybe<IdFilter>
  isFeed?: InputMaybe<BooleanFilter>
  name?: InputMaybe<StringFilter>
  publishedDate?: InputMaybe<DateTimeNullableFilter>
  related_posts?: InputMaybe<PostManyRelationFilter>
  state?: InputMaybe<StringNullableFilter>
  tags?: InputMaybe<TagManyRelationFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  urlOriginal?: InputMaybe<StringFilter>
  videoSection?: InputMaybe<StringNullableFilter>
}

export type VideoWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type EditorChoiceDataFragment = {
  __typename?: 'EditorChoice'
  choices?: {
    __typename?: 'Post'
    title?: string | null
    slug?: string | null
    heroImage?: {
      __typename?: 'Photo'
      id: string
      resized?: {
        __typename?: 'ResizedImages'
        original?: string | null
        w480?: string | null
        w800?: string | null
        w1200?: string | null
        w1600?: string | null
        w2400?: string | null
      } | null
      resizedWebp?: {
        __typename?: 'ResizedWebPImages'
        original?: string | null
        w480?: string | null
        w800?: string | null
        w1200?: string | null
        w1600?: string | null
        w2400?: string | null
      } | null
    } | null
  } | null
}

export type HeroImageFragment = {
  __typename?: 'Photo'
  id: string
  resized?: {
    __typename?: 'ResizedImages'
    original?: string | null
    w480?: string | null
    w800?: string | null
    w1200?: string | null
    w1600?: string | null
    w2400?: string | null
  } | null
  resizedWebp?: {
    __typename?: 'ResizedWebPImages'
    original?: string | null
    w480?: string | null
    w800?: string | null
    w1200?: string | null
    w1600?: string | null
    w2400?: string | null
  } | null
}

export type GetEditorChoicesQueryVariables = Exact<{ [key: string]: never }>

export type GetEditorChoicesQuery = {
  __typename?: 'Query'
  editor?: Array<{
    __typename?: 'EditorChoice'
    choices?: {
      __typename?: 'Post'
      title?: string | null
      slug?: string | null
      heroImage?: {
        __typename?: 'Photo'
        id: string
        resized?: {
          __typename?: 'ResizedImages'
          original?: string | null
          w480?: string | null
          w800?: string | null
          w1200?: string | null
          w1600?: string | null
          w2400?: string | null
        } | null
        resizedWebp?: {
          __typename?: 'ResizedWebPImages'
          original?: string | null
          w480?: string | null
          w800?: string | null
          w1200?: string | null
          w1600?: string | null
          w2400?: string | null
        } | null
      } | null
    } | null
  }> | null
}

export type GetLiveEventForHomepageQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input']
}>

export type GetLiveEventForHomepageQuery = {
  __typename?: 'Query'
  events?: Array<{
    __typename?: 'Event'
    name?: string | null
    link?: string | null
    heroImage?: {
      __typename?: 'Photo'
      id: string
      resized?: {
        __typename?: 'ResizedImages'
        original?: string | null
        w480?: string | null
        w800?: string | null
        w1200?: string | null
        w1600?: string | null
        w2400?: string | null
      } | null
      resizedWebp?: {
        __typename?: 'ResizedWebPImages'
        original?: string | null
        w480?: string | null
        w800?: string | null
        w1200?: string | null
        w1600?: string | null
        w2400?: string | null
      } | null
    } | null
  }> | null
}

export type GetPostsBySectionSlugQueryVariables = Exact<{
  skip: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  slug: Scalars['String']['input']
}>

export type GetPostsBySectionSlugQuery = {
  __typename?: 'Query'
  posts?: Array<{
    __typename?: 'Post'
    title?: string | null
    createdAt?: any | null
    brief?: any | null
    slug?: string | null
    heroImage?: {
      __typename?: 'Photo'
      id: string
      resized?: {
        __typename?: 'ResizedImages'
        w1200?: string | null
        w1600?: string | null
        w2400?: string | null
        w480?: string | null
        w800?: string | null
        original?: string | null
      } | null
      resizedWebp?: {
        __typename?: 'ResizedWebPImages'
        original?: string | null
        w1200?: string | null
        w1600?: string | null
        w2400?: string | null
        w480?: string | null
        w800?: string | null
      } | null
    } | null
  }> | null
}

export type GetFlashNewsQueryVariables = Exact<{ [key: string]: never }>

export type GetFlashNewsQuery = {
  __typename?: 'Query'
  posts?: Array<{
    __typename?: 'Post'
    title?: string | null
    slug?: string | null
  }> | null
}

export type GetSectionsAndCategoriesQueryVariables = Exact<{
  [key: string]: never
}>

export type GetSectionsAndCategoriesQuery = {
  __typename?: 'Query'
  sections?: Array<{
    __typename?: 'Section'
    name?: string | null
    slug?: string | null
    color?: string | null
    categories?: Array<{
      __typename?: 'Category'
      name?: string | null
      slug?: string | null
    }> | null
  }> | null
}

export type GetSectionInformationQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type GetSectionInformationQuery = {
  __typename?: 'Query'
  section?: {
    __typename?: 'Section'
    slug?: string | null
    name?: string | null
    color?: string | null
  } | null
}

export const HeroImageFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HeroImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Photo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resized' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'original' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w480' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w800' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1200' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1600' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w2400' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resizedWebp' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'original' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w480' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w800' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1200' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1600' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w2400' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HeroImageFragment, unknown>
export const EditorChoiceDataFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EditorChoiceData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'EditorChoice' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'choices' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'heroImage' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'HeroImage' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HeroImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Photo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resized' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'original' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w480' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w800' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1200' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1600' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w2400' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resizedWebp' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'original' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w480' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w800' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1200' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1600' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w2400' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditorChoiceDataFragment, unknown>
export const GetEditorChoicesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEditorChoices' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'editor' },
            name: { kind: 'Name', value: 'editorChoices' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'order' },
                          value: { kind: 'EnumValue', value: 'asc' },
                        },
                      ],
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: { kind: 'IntValue', value: '10' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'state' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: {
                              kind: 'StringValue',
                              value: 'published',
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EditorChoiceData' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HeroImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Photo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resized' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'original' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w480' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w800' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1200' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1600' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w2400' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resizedWebp' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'original' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w480' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w800' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1200' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1600' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w2400' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EditorChoiceData' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'EditorChoice' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'choices' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'heroImage' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'HeroImage' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetEditorChoicesQuery,
  GetEditorChoicesQueryVariables
>
export const GetLiveEventForHomepageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLiveEventForHomepage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'startDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'publishedDate' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'eventType' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: {
                              kind: 'StringValue',
                              value: 'livestreaming',
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'state' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: {
                              kind: 'StringValue',
                              value: 'published',
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'startDate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'lte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'startDate' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'heroImage' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'HeroImage' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HeroImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Photo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resized' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'original' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w480' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w800' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1200' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1600' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w2400' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resizedWebp' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'original' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w480' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w800' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1200' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w1600' } },
                { kind: 'Field', name: { kind: 'Name', value: 'w2400' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetLiveEventForHomepageQuery,
  GetLiveEventForHomepageQueryVariables
>
export const GetPostsBySectionSlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPostsBySectionSlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'posts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sections' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'some' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'slug' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'equals' },
                                        value: {
                                          kind: 'Variable',
                                          name: { kind: 'Name', value: 'slug' },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'publishedDate' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'brief' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'heroImage' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'resized' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w1200' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w1600' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w2400' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w480' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w800' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'original' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'resizedWebp' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'original' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w1200' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w1600' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w2400' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w480' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'w800' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPostsBySectionSlugQuery,
  GetPostsBySectionSlugQueryVariables
>
export const GetFlashNewsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFlashNews' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'posts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: { kind: 'IntValue', value: '8' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'publishedDate' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'state' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: {
                              kind: 'StringValue',
                              value: 'published',
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFlashNewsQuery, GetFlashNewsQueryVariables>
export const GetSectionsAndCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSectionsAndCategories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'order' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'state' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: {
                              kind: 'StringValue',
                              value: 'active',
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'order' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'state' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'active',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSectionsAndCategoriesQuery,
  GetSectionsAndCategoriesQueryVariables
>
export const GetSectionInformationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSectionInformation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'section' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'slug' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'slug' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSectionInformationQuery,
  GetSectionInformationQueryVariables
>
