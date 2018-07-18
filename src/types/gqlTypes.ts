/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';

type Resolver<Result, Args = any> = (
  parent: any,
  args: Args,
  context: any,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;


/** A location in a connection that can be used for resuming pagination. */
export type Cursor = any;

/** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
export type UUID = any;

/** A floating point number that requires more precision than IEEE 754 binary 64 */
export type BigFloat = any;
/** An object with a globally unique `ID`. */
export interface Node {
  nodeId: string; /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
}
/** The root query type which gives access points into the data universe. */
export interface Query extends Node {
  query: Query; /** Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form. */
  nodeId: string; /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  node?: Node | null; /** Fetches an object given its globally unique `ID`. */
  allProductCategories?: ProductCategoriesConnection | null; /** Reads and enables pagination through a set of `ProductCategory`. */
  allProducts?: ProductsConnection | null; /** Reads and enables pagination through a set of `Product`. */
  allSellers?: SellersConnection | null; /** Reads and enables pagination through a set of `Seller`. */
  allUsers?: UsersConnection | null; /** Reads and enables pagination through a set of `User`. */
  productCategoryById?: ProductCategory | null; 
  productById?: Product | null; 
  productByName?: Product | null; 
  userById?: User | null; 
  productCategory?: ProductCategory | null; /** Reads a single `ProductCategory` using its globally unique `ID`. */
  product?: Product | null; /** Reads a single `Product` using its globally unique `ID`. */
  user?: User | null; /** Reads a single `User` using its globally unique `ID`. */
  currentUser?: User | null; /** The currently logged in User. Returns 'null' if noone is logged in. */
}
/** A connection to a list of `ProductCategory` values. */
export interface ProductCategoriesConnection {
  nodes: (ProductCategory | null)[]; /** A list of `ProductCategory` objects. */
  edges: ProductCategoriesEdge[]; /** A list of edges which contains the `ProductCategory` and cursor to aid in pagination. */
  pageInfo: PageInfo; /** Information to aid in pagination. */
  totalCount?: number | null; /** The count of *all* `ProductCategory` you could get from the connection. */
}

export interface ProductCategory extends Node {
  nodeId: string; /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: UUID; 
  name: string; 
  description?: string | null; 
  productsByCategory: ProductsConnection; /** Reads and enables pagination through a set of `Product`. */
}
/** A connection to a list of `Product` values. */
export interface ProductsConnection {
  nodes: (Product | null)[]; /** A list of `Product` objects. */
  edges: ProductsEdge[]; /** A list of edges which contains the `Product` and cursor to aid in pagination. */
  pageInfo: PageInfo; /** Information to aid in pagination. */
  totalCount?: number | null; /** The count of *all* `Product` you could get from the connection. */
}

export interface Product extends Node {
  nodeId: string; /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: UUID; 
  sellerId: UUID; 
  category?: UUID | null; 
  name: string; 
  usdCost: BigFloat; 
  description?: string | null; 
  userBySellerId?: User | null; /** Reads a single `User` that is related to this `Product`. */
  productCategoryByCategory?: ProductCategory | null; /** Reads a single `ProductCategory` that is related to this `Product`. */
}

export interface User extends Node {
  nodeId: string; /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: UUID; /** This is a cool thing. */
  username?: string | null; 
  stellarPublicKey: string; 
  displayName?: string | null; 
  productsBySellerId: ProductsConnection; /** Reads and enables pagination through a set of `Product`. */
}
/** A `Product` edge in the connection. */
export interface ProductsEdge {
  cursor?: Cursor | null; /** A cursor for use in pagination. */
  node?: Product | null; /** The `Product` at the end of the edge. */
}
/** Information about pagination in a connection. */
export interface PageInfo {
  hasNextPage: boolean; /** When paginating forwards, are there more items? */
  hasPreviousPage: boolean; /** When paginating backwards, are there more items? */
  startCursor?: Cursor | null; /** When paginating backwards, the cursor to continue. */
  endCursor?: Cursor | null; /** When paginating forwards, the cursor to continue. */
}
/** A `ProductCategory` edge in the connection. */
export interface ProductCategoriesEdge {
  cursor?: Cursor | null; /** A cursor for use in pagination. */
  node?: ProductCategory | null; /** The `ProductCategory` at the end of the edge. */
}
/** A connection to a list of `Seller` values. */
export interface SellersConnection {
  nodes: (Seller | null)[]; /** A list of `Seller` objects. */
  edges: SellersEdge[]; /** A list of edges which contains the `Seller` and cursor to aid in pagination. */
  pageInfo: PageInfo; /** Information to aid in pagination. */
  totalCount?: number | null; /** The count of *all* `Seller` you could get from the connection. */
}

export interface Seller {
  id?: UUID | null; 
  username?: string | null; 
  stellarPublicKey?: string | null; 
  displayName?: string | null; 
}
/** A `Seller` edge in the connection. */
export interface SellersEdge {
  cursor?: Cursor | null; /** A cursor for use in pagination. */
  node?: Seller | null; /** The `Seller` at the end of the edge. */
}
/** A connection to a list of `User` values. */
export interface UsersConnection {
  nodes: (User | null)[]; /** A list of `User` objects. */
  edges: UsersEdge[]; /** A list of edges which contains the `User` and cursor to aid in pagination. */
  pageInfo: PageInfo; /** Information to aid in pagination. */
  totalCount?: number | null; /** The count of *all* `User` you could get from the connection. */
}
/** A `User` edge in the connection. */
export interface UsersEdge {
  cursor?: Cursor | null; /** A cursor for use in pagination. */
  node?: User | null; /** The `User` at the end of the edge. */
}
/** The root mutation type which contains root level fields which mutate data. */
export interface Mutation {
  createProductCategory?: CreateProductCategoryPayload | null; /** Creates a single `ProductCategory`. */
  createProduct?: CreateProductPayload | null; /** Creates a single `Product`. */
  createUser?: CreateUserPayload | null; /** Creates a single `User`. */
  updateProductCategory?: UpdateProductCategoryPayload | null; /** Updates a single `ProductCategory` using its globally unique id and a patch. */
  updateProductCategoryById?: UpdateProductCategoryPayload | null; /** Updates a single `ProductCategory` using a unique key and a patch. */
  updateProduct?: UpdateProductPayload | null; /** Updates a single `Product` using its globally unique id and a patch. */
  updateProductById?: UpdateProductPayload | null; /** Updates a single `Product` using a unique key and a patch. */
  updateProductByName?: UpdateProductPayload | null; /** Updates a single `Product` using a unique key and a patch. */
  updateUser?: UpdateUserPayload | null; /** Updates a single `User` using its globally unique id and a patch. */
  updateUserById?: UpdateUserPayload | null; /** Updates a single `User` using a unique key and a patch. */
  deleteProductCategory?: DeleteProductCategoryPayload | null; /** Deletes a single `ProductCategory` using its globally unique id. */
  deleteProductCategoryById?: DeleteProductCategoryPayload | null; /** Deletes a single `ProductCategory` using a unique key. */
  deleteProduct?: DeleteProductPayload | null; /** Deletes a single `Product` using its globally unique id. */
  deleteProductById?: DeleteProductPayload | null; /** Deletes a single `Product` using a unique key. */
  deleteProductByName?: DeleteProductPayload | null; /** Deletes a single `Product` using a unique key. */
  deleteUser?: DeleteUserPayload | null; /** Deletes a single `User` using its globally unique id. */
  deleteUserById?: DeleteUserPayload | null; /** Deletes a single `User` using a unique key. */
  createAndLoadUserByStellarPublicKey?: CreateAndLoadUserByStellarPublicKeyPayload | null; /** Reads and enables pagination through a set of `User`. */
  login?: User | null; /** Login mechanism for the server */
  logout?: boolean | null; /** Logout mechanism for the server */
}
/** The output of our create `ProductCategory` mutation. */
export interface CreateProductCategoryPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  productCategory?: ProductCategory | null; /** The `ProductCategory` that was created by this mutation. */
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  productCategoryEdge?: ProductCategoriesEdge | null; /** An edge for our `ProductCategory`. May be used by Relay 1. */
}
/** The output of our create `Product` mutation. */
export interface CreateProductPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  product?: Product | null; /** The `Product` that was created by this mutation. */
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  userBySellerId?: User | null; /** Reads a single `User` that is related to this `Product`. */
  productCategoryByCategory?: ProductCategory | null; /** Reads a single `ProductCategory` that is related to this `Product`. */
  productEdge?: ProductsEdge | null; /** An edge for our `Product`. May be used by Relay 1. */
}
/** The output of our create `User` mutation. */
export interface CreateUserPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  user?: User | null; /** The `User` that was created by this mutation. */
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  userEdge?: UsersEdge | null; /** An edge for our `User`. May be used by Relay 1. */
}
/** The output of our update `ProductCategory` mutation. */
export interface UpdateProductCategoryPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  productCategory?: ProductCategory | null; /** The `ProductCategory` that was updated by this mutation. */
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  productCategoryEdge?: ProductCategoriesEdge | null; /** An edge for our `ProductCategory`. May be used by Relay 1. */
}
/** The output of our update `Product` mutation. */
export interface UpdateProductPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  product?: Product | null; /** The `Product` that was updated by this mutation. */
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  userBySellerId?: User | null; /** Reads a single `User` that is related to this `Product`. */
  productCategoryByCategory?: ProductCategory | null; /** Reads a single `ProductCategory` that is related to this `Product`. */
  productEdge?: ProductsEdge | null; /** An edge for our `Product`. May be used by Relay 1. */
}
/** The output of our update `User` mutation. */
export interface UpdateUserPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  user?: User | null; /** The `User` that was updated by this mutation. */
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  userEdge?: UsersEdge | null; /** An edge for our `User`. May be used by Relay 1. */
}
/** The output of our delete `ProductCategory` mutation. */
export interface DeleteProductCategoryPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  productCategory?: ProductCategory | null; /** The `ProductCategory` that was deleted by this mutation. */
  deletedProductCategoryId?: string | null; 
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  productCategoryEdge?: ProductCategoriesEdge | null; /** An edge for our `ProductCategory`. May be used by Relay 1. */
}
/** The output of our delete `Product` mutation. */
export interface DeleteProductPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  product?: Product | null; /** The `Product` that was deleted by this mutation. */
  deletedProductId?: string | null; 
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  userBySellerId?: User | null; /** Reads a single `User` that is related to this `Product`. */
  productCategoryByCategory?: ProductCategory | null; /** Reads a single `ProductCategory` that is related to this `Product`. */
  productEdge?: ProductsEdge | null; /** An edge for our `Product`. May be used by Relay 1. */
}
/** The output of our delete `User` mutation. */
export interface DeleteUserPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  user?: User | null; /** The `User` that was deleted by this mutation. */
  deletedUserId?: string | null; 
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  userEdge?: UsersEdge | null; /** An edge for our `User`. May be used by Relay 1. */
}
/** The output of our `createAndLoadUserByStellarPublicKey` mutation. */
export interface CreateAndLoadUserByStellarPublicKeyPayload {
  clientMutationId?: string | null; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  users?: (User | null)[] | null; 
  query?: Query | null; /** Our root query field type. Allows us to run any query from our mutation payload. */
  userEdge?: UsersEdge | null; /** An edge for our `User`. May be used by Relay 1. */
}
/** A condition to be used against `ProductCategory` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface ProductCategoryCondition {
  id?: UUID | null; /** Checks for equality with the object’s `id` field. */
  name?: string | null; /** Checks for equality with the object’s `name` field. */
  description?: string | null; /** Checks for equality with the object’s `description` field. */
}
/** A condition to be used against `Product` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface ProductCondition {
  id?: UUID | null; /** Checks for equality with the object’s `id` field. */
  sellerId?: UUID | null; /** Checks for equality with the object’s `sellerId` field. */
  category?: UUID | null; /** Checks for equality with the object’s `category` field. */
  name?: string | null; /** Checks for equality with the object’s `name` field. */
  usdCost?: BigFloat | null; /** Checks for equality with the object’s `usdCost` field. */
  description?: string | null; /** Checks for equality with the object’s `description` field. */
}
/** A condition to be used against `Seller` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface SellerCondition {
  id?: UUID | null; /** Checks for equality with the object’s `id` field. */
  username?: string | null; /** Checks for equality with the object’s `username` field. */
  stellarPublicKey?: string | null; /** Checks for equality with the object’s `stellarPublicKey` field. */
  displayName?: string | null; /** Checks for equality with the object’s `displayName` field. */
}
/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export interface UserCondition {
  id?: UUID | null; /** Checks for equality with the object’s `id` field. */
  username?: string | null; /** Checks for equality with the object’s `username` field. */
  stellarPublicKey?: string | null; /** Checks for equality with the object’s `stellarPublicKey` field. */
  displayName?: string | null; /** Checks for equality with the object’s `displayName` field. */
}
/** All input for the create `ProductCategory` mutation. */
export interface CreateProductCategoryInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  productCategory: ProductCategoryInput; /** The `ProductCategory` to be created by this mutation. */
}
/** An input for mutations affecting `ProductCategory` */
export interface ProductCategoryInput {
  id?: UUID | null; 
  name: string; 
  description?: string | null; 
}
/** All input for the create `Product` mutation. */
export interface CreateProductInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  product: ProductInput; /** The `Product` to be created by this mutation. */
}
/** An input for mutations affecting `Product` */
export interface ProductInput {
  id?: UUID | null; 
  sellerId: UUID; 
  category?: UUID | null; 
  name: string; 
  usdCost: BigFloat; 
  description?: string | null; 
}
/** All input for the create `User` mutation. */
export interface CreateUserInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  user: UserInput; /** The `User` to be created by this mutation. */
}
/** An input for mutations affecting `User` */
export interface UserInput {
  id?: UUID | null; /** This is a cool thing. */
  username?: string | null; 
  stellarPublicKey: string; 
  displayName?: string | null; 
}
/** All input for the `updateProductCategory` mutation. */
export interface UpdateProductCategoryInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  nodeId: string; /** The globally unique `ID` which will identify a single `ProductCategory` to be updated. */
  productCategoryPatch: ProductCategoryPatch; /** An object where the defined keys will be set on the `ProductCategory` being updated. */
}
/** Represents an update to a `ProductCategory`. Fields that are set will be updated. */
export interface ProductCategoryPatch {
  id?: UUID | null; 
  name?: string | null; 
  description?: string | null; 
}
/** All input for the `updateProductCategoryById` mutation. */
export interface UpdateProductCategoryByIdInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  productCategoryPatch: ProductCategoryPatch; /** An object where the defined keys will be set on the `ProductCategory` being updated. */
  id: UUID; 
}
/** All input for the `updateProduct` mutation. */
export interface UpdateProductInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  nodeId: string; /** The globally unique `ID` which will identify a single `Product` to be updated. */
  productPatch: ProductPatch; /** An object where the defined keys will be set on the `Product` being updated. */
}
/** Represents an update to a `Product`. Fields that are set will be updated. */
export interface ProductPatch {
  id?: UUID | null; 
  sellerId?: UUID | null; 
  category?: UUID | null; 
  name?: string | null; 
  usdCost?: BigFloat | null; 
  description?: string | null; 
}
/** All input for the `updateProductById` mutation. */
export interface UpdateProductByIdInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  productPatch: ProductPatch; /** An object where the defined keys will be set on the `Product` being updated. */
  id: UUID; 
}
/** All input for the `updateProductByName` mutation. */
export interface UpdateProductByNameInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  productPatch: ProductPatch; /** An object where the defined keys will be set on the `Product` being updated. */
  name: string; 
}
/** All input for the `updateUser` mutation. */
export interface UpdateUserInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  nodeId: string; /** The globally unique `ID` which will identify a single `User` to be updated. */
  userPatch: UserPatch; /** An object where the defined keys will be set on the `User` being updated. */
}
/** Represents an update to a `User`. Fields that are set will be updated. */
export interface UserPatch {
  id?: UUID | null; /** This is a cool thing. */
  username?: string | null; 
  stellarPublicKey?: string | null; 
  displayName?: string | null; 
}
/** All input for the `updateUserById` mutation. */
export interface UpdateUserByIdInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  userPatch: UserPatch; /** An object where the defined keys will be set on the `User` being updated. */
  id: UUID; /** This is a cool thing. */
}
/** All input for the `deleteProductCategory` mutation. */
export interface DeleteProductCategoryInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  nodeId: string; /** The globally unique `ID` which will identify a single `ProductCategory` to be deleted. */
}
/** All input for the `deleteProductCategoryById` mutation. */
export interface DeleteProductCategoryByIdInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  id: UUID; 
}
/** All input for the `deleteProduct` mutation. */
export interface DeleteProductInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  nodeId: string; /** The globally unique `ID` which will identify a single `Product` to be deleted. */
}
/** All input for the `deleteProductById` mutation. */
export interface DeleteProductByIdInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  id: UUID; 
}
/** All input for the `deleteProductByName` mutation. */
export interface DeleteProductByNameInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  name: string; 
}
/** All input for the `deleteUser` mutation. */
export interface DeleteUserInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  nodeId: string; /** The globally unique `ID` which will identify a single `User` to be deleted. */
}
/** All input for the `deleteUserById` mutation. */
export interface DeleteUserByIdInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  id: UUID; /** This is a cool thing. */
}
/** All input for the `createAndLoadUserByStellarPublicKey` mutation. */
export interface CreateAndLoadUserByStellarPublicKeyInput {
  clientMutationId?: string | null; /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  stellarPublicKey?: string | null; 
}
export interface NodeQueryArgs {
  nodeId: string; /** The globally unique `ID`. */
}
export interface AllProductCategoriesQueryArgs {
  first?: number | null; /** Only read the first `n` values of the set. */
  last?: number | null; /** Only read the last `n` values of the set. */
  offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
  before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
  after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
  orderBy?: ProductCategoriesOrderBy[] | null; /** The method to use when ordering `ProductCategory`. */
  condition?: ProductCategoryCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
}
export interface AllProductsQueryArgs {
  first?: number | null; /** Only read the first `n` values of the set. */
  last?: number | null; /** Only read the last `n` values of the set. */
  offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
  before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
  after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
  orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
  condition?: ProductCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
}
export interface AllSellersQueryArgs {
  first?: number | null; /** Only read the first `n` values of the set. */
  last?: number | null; /** Only read the last `n` values of the set. */
  offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
  before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
  after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
  orderBy?: SellersOrderBy[] | null; /** The method to use when ordering `Seller`. */
  condition?: SellerCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
}
export interface AllUsersQueryArgs {
  first?: number | null; /** Only read the first `n` values of the set. */
  last?: number | null; /** Only read the last `n` values of the set. */
  offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
  before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
  after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
  orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
  condition?: UserCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
}
export interface ProductCategoryByIdQueryArgs {
  id: UUID; 
}
export interface ProductByIdQueryArgs {
  id: UUID; 
}
export interface ProductByNameQueryArgs {
  name: string; 
}
export interface UserByIdQueryArgs {
  id: UUID; 
}
export interface ProductCategoryQueryArgs {
  nodeId: string; /** The globally unique `ID` to be used in selecting a single `ProductCategory`. */
}
export interface ProductQueryArgs {
  nodeId: string; /** The globally unique `ID` to be used in selecting a single `Product`. */
}
export interface UserQueryArgs {
  nodeId: string; /** The globally unique `ID` to be used in selecting a single `User`. */
}
export interface ProductsByCategoryProductCategoryArgs {
  first?: number | null; /** Only read the first `n` values of the set. */
  last?: number | null; /** Only read the last `n` values of the set. */
  offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
  before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
  after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
  orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
  condition?: ProductCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
}
export interface ProductsBySellerIdUserArgs {
  first?: number | null; /** Only read the first `n` values of the set. */
  last?: number | null; /** Only read the last `n` values of the set. */
  offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
  before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
  after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
  orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
  condition?: ProductCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
}
export interface CreateProductCategoryMutationArgs {
  input: CreateProductCategoryInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface CreateProductMutationArgs {
  input: CreateProductInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface CreateUserMutationArgs {
  input: CreateUserInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface UpdateProductCategoryMutationArgs {
  input: UpdateProductCategoryInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface UpdateProductCategoryByIdMutationArgs {
  input: UpdateProductCategoryByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface UpdateProductMutationArgs {
  input: UpdateProductInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface UpdateProductByIdMutationArgs {
  input: UpdateProductByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface UpdateProductByNameMutationArgs {
  input: UpdateProductByNameInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface UpdateUserMutationArgs {
  input: UpdateUserInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface UpdateUserByIdMutationArgs {
  input: UpdateUserByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface DeleteProductCategoryMutationArgs {
  input: DeleteProductCategoryInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface DeleteProductCategoryByIdMutationArgs {
  input: DeleteProductCategoryByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface DeleteProductMutationArgs {
  input: DeleteProductInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface DeleteProductByIdMutationArgs {
  input: DeleteProductByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface DeleteProductByNameMutationArgs {
  input: DeleteProductByNameInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface DeleteUserMutationArgs {
  input: DeleteUserInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface DeleteUserByIdMutationArgs {
  input: DeleteUserByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface CreateAndLoadUserByStellarPublicKeyMutationArgs {
  input: CreateAndLoadUserByStellarPublicKeyInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
}
export interface LoginMutationArgs {
  stellarPublicKey: string; 
  payload: string; 
  signature: string; 
}
export interface ProductCategoryEdgeCreateProductCategoryPayloadArgs {
  orderBy?: ProductCategoriesOrderBy[] | null; /** The method to use when ordering `ProductCategory`. */
}
export interface ProductEdgeCreateProductPayloadArgs {
  orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
}
export interface UserEdgeCreateUserPayloadArgs {
  orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
}
export interface ProductCategoryEdgeUpdateProductCategoryPayloadArgs {
  orderBy?: ProductCategoriesOrderBy[] | null; /** The method to use when ordering `ProductCategory`. */
}
export interface ProductEdgeUpdateProductPayloadArgs {
  orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
}
export interface UserEdgeUpdateUserPayloadArgs {
  orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
}
export interface ProductCategoryEdgeDeleteProductCategoryPayloadArgs {
  orderBy?: ProductCategoriesOrderBy[] | null; /** The method to use when ordering `ProductCategory`. */
}
export interface ProductEdgeDeleteProductPayloadArgs {
  orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
}
export interface UserEdgeDeleteUserPayloadArgs {
  orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
}
export interface UserEdgeCreateAndLoadUserByStellarPublicKeyPayloadArgs {
  orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
}
/** Methods to use when ordering `ProductCategory`. */
export enum ProductCategoriesOrderBy {
  NATURAL = "NATURAL",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
  DESCRIPTION_ASC = "DESCRIPTION_ASC",
  DESCRIPTION_DESC = "DESCRIPTION_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
}
/** Methods to use when ordering `Product`. */
export enum ProductsOrderBy {
  NATURAL = "NATURAL",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  SELLER_ID_ASC = "SELLER_ID_ASC",
  SELLER_ID_DESC = "SELLER_ID_DESC",
  CATEGORY_ASC = "CATEGORY_ASC",
  CATEGORY_DESC = "CATEGORY_DESC",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
  USD_COST_ASC = "USD_COST_ASC",
  USD_COST_DESC = "USD_COST_DESC",
  DESCRIPTION_ASC = "DESCRIPTION_ASC",
  DESCRIPTION_DESC = "DESCRIPTION_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
}
/** Methods to use when ordering `Seller`. */
export enum SellersOrderBy {
  NATURAL = "NATURAL",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  USERNAME_ASC = "USERNAME_ASC",
  USERNAME_DESC = "USERNAME_DESC",
  STELLAR_PUBLIC_KEY_ASC = "STELLAR_PUBLIC_KEY_ASC",
  STELLAR_PUBLIC_KEY_DESC = "STELLAR_PUBLIC_KEY_DESC",
  DISPLAY_NAME_ASC = "DISPLAY_NAME_ASC",
  DISPLAY_NAME_DESC = "DISPLAY_NAME_DESC",
}
/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  NATURAL = "NATURAL",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  USERNAME_ASC = "USERNAME_ASC",
  USERNAME_DESC = "USERNAME_DESC",
  STELLAR_PUBLIC_KEY_ASC = "STELLAR_PUBLIC_KEY_ASC",
  STELLAR_PUBLIC_KEY_DESC = "STELLAR_PUBLIC_KEY_DESC",
  DISPLAY_NAME_ASC = "DISPLAY_NAME_ASC",
  DISPLAY_NAME_DESC = "DISPLAY_NAME_DESC",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
}

/** The root query type which gives access points into the data universe. */
export namespace QueryResolvers {
  export interface Resolvers {
    query?: QueryResolver; /** Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form. */
    nodeId?: NodeIdResolver; /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
    node?: NodeResolver; /** Fetches an object given its globally unique `ID`. */
    allProductCategories?: AllProductCategoriesResolver; /** Reads and enables pagination through a set of `ProductCategory`. */
    allProducts?: AllProductsResolver; /** Reads and enables pagination through a set of `Product`. */
    allSellers?: AllSellersResolver; /** Reads and enables pagination through a set of `Seller`. */
    allUsers?: AllUsersResolver; /** Reads and enables pagination through a set of `User`. */
    productCategoryById?: ProductCategoryByIdResolver; 
    productById?: ProductByIdResolver; 
    productByName?: ProductByNameResolver; 
    userById?: UserByIdResolver; 
    productCategory?: ProductCategoryResolver; /** Reads a single `ProductCategory` using its globally unique `ID`. */
    product?: ProductResolver; /** Reads a single `Product` using its globally unique `ID`. */
    user?: UserResolver; /** Reads a single `User` using its globally unique `ID`. */
    currentUser?: CurrentUserResolver; /** The currently logged in User. Returns 'null' if noone is logged in. */
  }

  export type QueryResolver = Resolver<Query>;  export type NodeIdResolver = Resolver<string>;  export type NodeResolver = Resolver<Node | null, NodeArgs>;
  export interface NodeArgs {
    nodeId: string; /** The globally unique `ID`. */
  }

  export type AllProductCategoriesResolver = Resolver<ProductCategoriesConnection | null, AllProductCategoriesArgs>;
  export interface AllProductCategoriesArgs {
    first?: number | null; /** Only read the first `n` values of the set. */
    last?: number | null; /** Only read the last `n` values of the set. */
    offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
    before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
    after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
    orderBy?: ProductCategoriesOrderBy[] | null; /** The method to use when ordering `ProductCategory`. */
    condition?: ProductCategoryCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
  }

  export type AllProductsResolver = Resolver<ProductsConnection | null, AllProductsArgs>;
  export interface AllProductsArgs {
    first?: number | null; /** Only read the first `n` values of the set. */
    last?: number | null; /** Only read the last `n` values of the set. */
    offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
    before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
    after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
    orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
    condition?: ProductCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
  }

  export type AllSellersResolver = Resolver<SellersConnection | null, AllSellersArgs>;
  export interface AllSellersArgs {
    first?: number | null; /** Only read the first `n` values of the set. */
    last?: number | null; /** Only read the last `n` values of the set. */
    offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
    before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
    after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
    orderBy?: SellersOrderBy[] | null; /** The method to use when ordering `Seller`. */
    condition?: SellerCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
  }

  export type AllUsersResolver = Resolver<UsersConnection | null, AllUsersArgs>;
  export interface AllUsersArgs {
    first?: number | null; /** Only read the first `n` values of the set. */
    last?: number | null; /** Only read the last `n` values of the set. */
    offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
    before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
    after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
    orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
    condition?: UserCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
  }

  export type ProductCategoryByIdResolver = Resolver<ProductCategory | null, ProductCategoryByIdArgs>;
  export interface ProductCategoryByIdArgs {
    id: UUID; 
  }

  export type ProductByIdResolver = Resolver<Product | null, ProductByIdArgs>;
  export interface ProductByIdArgs {
    id: UUID; 
  }

  export type ProductByNameResolver = Resolver<Product | null, ProductByNameArgs>;
  export interface ProductByNameArgs {
    name: string; 
  }

  export type UserByIdResolver = Resolver<User | null, UserByIdArgs>;
  export interface UserByIdArgs {
    id: UUID; 
  }

  export type ProductCategoryResolver = Resolver<ProductCategory | null, ProductCategoryArgs>;
  export interface ProductCategoryArgs {
    nodeId: string; /** The globally unique `ID` to be used in selecting a single `ProductCategory`. */
  }

  export type ProductResolver = Resolver<Product | null, ProductArgs>;
  export interface ProductArgs {
    nodeId: string; /** The globally unique `ID` to be used in selecting a single `Product`. */
  }

  export type UserResolver = Resolver<User | null, UserArgs>;
  export interface UserArgs {
    nodeId: string; /** The globally unique `ID` to be used in selecting a single `User`. */
  }

  export type CurrentUserResolver = Resolver<User | null>;  
}/** A connection to a list of `ProductCategory` values. */
export namespace ProductCategoriesConnectionResolvers {
  export interface Resolvers {
    nodes?: NodesResolver; /** A list of `ProductCategory` objects. */
    edges?: EdgesResolver; /** A list of edges which contains the `ProductCategory` and cursor to aid in pagination. */
    pageInfo?: PageInfoResolver; /** Information to aid in pagination. */
    totalCount?: TotalCountResolver; /** The count of *all* `ProductCategory` you could get from the connection. */
  }

  export type NodesResolver = Resolver<(ProductCategory | null)[]>;  export type EdgesResolver = Resolver<ProductCategoriesEdge[]>;  export type PageInfoResolver = Resolver<PageInfo>;  export type TotalCountResolver = Resolver<number | null>;  
}
export namespace ProductCategoryResolvers {
  export interface Resolvers {
    nodeId?: NodeIdResolver; /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    id?: IdResolver; 
    name?: NameResolver; 
    description?: DescriptionResolver; 
    productsByCategory?: ProductsByCategoryResolver; /** Reads and enables pagination through a set of `Product`. */
  }

  export type NodeIdResolver = Resolver<string>;  export type IdResolver = Resolver<UUID>;  export type NameResolver = Resolver<string>;  export type DescriptionResolver = Resolver<string | null>;  export type ProductsByCategoryResolver = Resolver<ProductsConnection, ProductsByCategoryArgs>;
  export interface ProductsByCategoryArgs {
    first?: number | null; /** Only read the first `n` values of the set. */
    last?: number | null; /** Only read the last `n` values of the set. */
    offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
    before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
    after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
    orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
    condition?: ProductCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
  }

  
}/** A connection to a list of `Product` values. */
export namespace ProductsConnectionResolvers {
  export interface Resolvers {
    nodes?: NodesResolver; /** A list of `Product` objects. */
    edges?: EdgesResolver; /** A list of edges which contains the `Product` and cursor to aid in pagination. */
    pageInfo?: PageInfoResolver; /** Information to aid in pagination. */
    totalCount?: TotalCountResolver; /** The count of *all* `Product` you could get from the connection. */
  }

  export type NodesResolver = Resolver<(Product | null)[]>;  export type EdgesResolver = Resolver<ProductsEdge[]>;  export type PageInfoResolver = Resolver<PageInfo>;  export type TotalCountResolver = Resolver<number | null>;  
}
export namespace ProductResolvers {
  export interface Resolvers {
    nodeId?: NodeIdResolver; /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    id?: IdResolver; 
    sellerId?: SellerIdResolver; 
    category?: CategoryResolver; 
    name?: NameResolver; 
    usdCost?: UsdCostResolver; 
    description?: DescriptionResolver; 
    userBySellerId?: UserBySellerIdResolver; /** Reads a single `User` that is related to this `Product`. */
    productCategoryByCategory?: ProductCategoryByCategoryResolver; /** Reads a single `ProductCategory` that is related to this `Product`. */
  }

  export type NodeIdResolver = Resolver<string>;  export type IdResolver = Resolver<UUID>;  export type SellerIdResolver = Resolver<UUID>;  export type CategoryResolver = Resolver<UUID | null>;  export type NameResolver = Resolver<string>;  export type UsdCostResolver = Resolver<BigFloat>;  export type DescriptionResolver = Resolver<string | null>;  export type UserBySellerIdResolver = Resolver<User | null>;  export type ProductCategoryByCategoryResolver = Resolver<ProductCategory | null>;  
}
export namespace UserResolvers {
  export interface Resolvers {
    nodeId?: NodeIdResolver; /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    id?: IdResolver; /** This is a cool thing. */
    username?: UsernameResolver; 
    stellarPublicKey?: StellarPublicKeyResolver; 
    displayName?: DisplayNameResolver; 
    productsBySellerId?: ProductsBySellerIdResolver; /** Reads and enables pagination through a set of `Product`. */
  }

  export type NodeIdResolver = Resolver<string>;  export type IdResolver = Resolver<UUID>;  export type UsernameResolver = Resolver<string | null>;  export type StellarPublicKeyResolver = Resolver<string>;  export type DisplayNameResolver = Resolver<string | null>;  export type ProductsBySellerIdResolver = Resolver<ProductsConnection, ProductsBySellerIdArgs>;
  export interface ProductsBySellerIdArgs {
    first?: number | null; /** Only read the first `n` values of the set. */
    last?: number | null; /** Only read the last `n` values of the set. */
    offset?: number | null; /** Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`. */
    before?: Cursor | null; /** Read all values in the set before (above) this cursor. */
    after?: Cursor | null; /** Read all values in the set after (below) this cursor. */
    orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
    condition?: ProductCondition | null; /** A condition to be used in determining which values should be returned by the collection. */
  }

  
}/** A `Product` edge in the connection. */
export namespace ProductsEdgeResolvers {
  export interface Resolvers {
    cursor?: CursorResolver; /** A cursor for use in pagination. */
    node?: NodeResolver; /** The `Product` at the end of the edge. */
  }

  export type CursorResolver = Resolver<Cursor | null>;  export type NodeResolver = Resolver<Product | null>;  
}/** Information about pagination in a connection. */
export namespace PageInfoResolvers {
  export interface Resolvers {
    hasNextPage?: HasNextPageResolver; /** When paginating forwards, are there more items? */
    hasPreviousPage?: HasPreviousPageResolver; /** When paginating backwards, are there more items? */
    startCursor?: StartCursorResolver; /** When paginating backwards, the cursor to continue. */
    endCursor?: EndCursorResolver; /** When paginating forwards, the cursor to continue. */
  }

  export type HasNextPageResolver = Resolver<boolean>;  export type HasPreviousPageResolver = Resolver<boolean>;  export type StartCursorResolver = Resolver<Cursor | null>;  export type EndCursorResolver = Resolver<Cursor | null>;  
}/** A `ProductCategory` edge in the connection. */
export namespace ProductCategoriesEdgeResolvers {
  export interface Resolvers {
    cursor?: CursorResolver; /** A cursor for use in pagination. */
    node?: NodeResolver; /** The `ProductCategory` at the end of the edge. */
  }

  export type CursorResolver = Resolver<Cursor | null>;  export type NodeResolver = Resolver<ProductCategory | null>;  
}/** A connection to a list of `Seller` values. */
export namespace SellersConnectionResolvers {
  export interface Resolvers {
    nodes?: NodesResolver; /** A list of `Seller` objects. */
    edges?: EdgesResolver; /** A list of edges which contains the `Seller` and cursor to aid in pagination. */
    pageInfo?: PageInfoResolver; /** Information to aid in pagination. */
    totalCount?: TotalCountResolver; /** The count of *all* `Seller` you could get from the connection. */
  }

  export type NodesResolver = Resolver<(Seller | null)[]>;  export type EdgesResolver = Resolver<SellersEdge[]>;  export type PageInfoResolver = Resolver<PageInfo>;  export type TotalCountResolver = Resolver<number | null>;  
}
export namespace SellerResolvers {
  export interface Resolvers {
    id?: IdResolver; 
    username?: UsernameResolver; 
    stellarPublicKey?: StellarPublicKeyResolver; 
    displayName?: DisplayNameResolver; 
  }

  export type IdResolver = Resolver<UUID | null>;  export type UsernameResolver = Resolver<string | null>;  export type StellarPublicKeyResolver = Resolver<string | null>;  export type DisplayNameResolver = Resolver<string | null>;  
}/** A `Seller` edge in the connection. */
export namespace SellersEdgeResolvers {
  export interface Resolvers {
    cursor?: CursorResolver; /** A cursor for use in pagination. */
    node?: NodeResolver; /** The `Seller` at the end of the edge. */
  }

  export type CursorResolver = Resolver<Cursor | null>;  export type NodeResolver = Resolver<Seller | null>;  
}/** A connection to a list of `User` values. */
export namespace UsersConnectionResolvers {
  export interface Resolvers {
    nodes?: NodesResolver; /** A list of `User` objects. */
    edges?: EdgesResolver; /** A list of edges which contains the `User` and cursor to aid in pagination. */
    pageInfo?: PageInfoResolver; /** Information to aid in pagination. */
    totalCount?: TotalCountResolver; /** The count of *all* `User` you could get from the connection. */
  }

  export type NodesResolver = Resolver<(User | null)[]>;  export type EdgesResolver = Resolver<UsersEdge[]>;  export type PageInfoResolver = Resolver<PageInfo>;  export type TotalCountResolver = Resolver<number | null>;  
}/** A `User` edge in the connection. */
export namespace UsersEdgeResolvers {
  export interface Resolvers {
    cursor?: CursorResolver; /** A cursor for use in pagination. */
    node?: NodeResolver; /** The `User` at the end of the edge. */
  }

  export type CursorResolver = Resolver<Cursor | null>;  export type NodeResolver = Resolver<User | null>;  
}/** The root mutation type which contains root level fields which mutate data. */
export namespace MutationResolvers {
  export interface Resolvers {
    createProductCategory?: CreateProductCategoryResolver; /** Creates a single `ProductCategory`. */
    createProduct?: CreateProductResolver; /** Creates a single `Product`. */
    createUser?: CreateUserResolver; /** Creates a single `User`. */
    updateProductCategory?: UpdateProductCategoryResolver; /** Updates a single `ProductCategory` using its globally unique id and a patch. */
    updateProductCategoryById?: UpdateProductCategoryByIdResolver; /** Updates a single `ProductCategory` using a unique key and a patch. */
    updateProduct?: UpdateProductResolver; /** Updates a single `Product` using its globally unique id and a patch. */
    updateProductById?: UpdateProductByIdResolver; /** Updates a single `Product` using a unique key and a patch. */
    updateProductByName?: UpdateProductByNameResolver; /** Updates a single `Product` using a unique key and a patch. */
    updateUser?: UpdateUserResolver; /** Updates a single `User` using its globally unique id and a patch. */
    updateUserById?: UpdateUserByIdResolver; /** Updates a single `User` using a unique key and a patch. */
    deleteProductCategory?: DeleteProductCategoryResolver; /** Deletes a single `ProductCategory` using its globally unique id. */
    deleteProductCategoryById?: DeleteProductCategoryByIdResolver; /** Deletes a single `ProductCategory` using a unique key. */
    deleteProduct?: DeleteProductResolver; /** Deletes a single `Product` using its globally unique id. */
    deleteProductById?: DeleteProductByIdResolver; /** Deletes a single `Product` using a unique key. */
    deleteProductByName?: DeleteProductByNameResolver; /** Deletes a single `Product` using a unique key. */
    deleteUser?: DeleteUserResolver; /** Deletes a single `User` using its globally unique id. */
    deleteUserById?: DeleteUserByIdResolver; /** Deletes a single `User` using a unique key. */
    createAndLoadUserByStellarPublicKey?: CreateAndLoadUserByStellarPublicKeyResolver; /** Reads and enables pagination through a set of `User`. */
    login?: LoginResolver; /** Login mechanism for the server */
    logout?: LogoutResolver; /** Logout mechanism for the server */
  }

  export type CreateProductCategoryResolver = Resolver<CreateProductCategoryPayload | null, CreateProductCategoryArgs>;
  export interface CreateProductCategoryArgs {
    input: CreateProductCategoryInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type CreateProductResolver = Resolver<CreateProductPayload | null, CreateProductArgs>;
  export interface CreateProductArgs {
    input: CreateProductInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type CreateUserResolver = Resolver<CreateUserPayload | null, CreateUserArgs>;
  export interface CreateUserArgs {
    input: CreateUserInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type UpdateProductCategoryResolver = Resolver<UpdateProductCategoryPayload | null, UpdateProductCategoryArgs>;
  export interface UpdateProductCategoryArgs {
    input: UpdateProductCategoryInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type UpdateProductCategoryByIdResolver = Resolver<UpdateProductCategoryPayload | null, UpdateProductCategoryByIdArgs>;
  export interface UpdateProductCategoryByIdArgs {
    input: UpdateProductCategoryByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type UpdateProductResolver = Resolver<UpdateProductPayload | null, UpdateProductArgs>;
  export interface UpdateProductArgs {
    input: UpdateProductInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type UpdateProductByIdResolver = Resolver<UpdateProductPayload | null, UpdateProductByIdArgs>;
  export interface UpdateProductByIdArgs {
    input: UpdateProductByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type UpdateProductByNameResolver = Resolver<UpdateProductPayload | null, UpdateProductByNameArgs>;
  export interface UpdateProductByNameArgs {
    input: UpdateProductByNameInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type UpdateUserResolver = Resolver<UpdateUserPayload | null, UpdateUserArgs>;
  export interface UpdateUserArgs {
    input: UpdateUserInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type UpdateUserByIdResolver = Resolver<UpdateUserPayload | null, UpdateUserByIdArgs>;
  export interface UpdateUserByIdArgs {
    input: UpdateUserByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type DeleteProductCategoryResolver = Resolver<DeleteProductCategoryPayload | null, DeleteProductCategoryArgs>;
  export interface DeleteProductCategoryArgs {
    input: DeleteProductCategoryInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type DeleteProductCategoryByIdResolver = Resolver<DeleteProductCategoryPayload | null, DeleteProductCategoryByIdArgs>;
  export interface DeleteProductCategoryByIdArgs {
    input: DeleteProductCategoryByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type DeleteProductResolver = Resolver<DeleteProductPayload | null, DeleteProductArgs>;
  export interface DeleteProductArgs {
    input: DeleteProductInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type DeleteProductByIdResolver = Resolver<DeleteProductPayload | null, DeleteProductByIdArgs>;
  export interface DeleteProductByIdArgs {
    input: DeleteProductByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type DeleteProductByNameResolver = Resolver<DeleteProductPayload | null, DeleteProductByNameArgs>;
  export interface DeleteProductByNameArgs {
    input: DeleteProductByNameInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type DeleteUserResolver = Resolver<DeleteUserPayload | null, DeleteUserArgs>;
  export interface DeleteUserArgs {
    input: DeleteUserInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type DeleteUserByIdResolver = Resolver<DeleteUserPayload | null, DeleteUserByIdArgs>;
  export interface DeleteUserByIdArgs {
    input: DeleteUserByIdInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type CreateAndLoadUserByStellarPublicKeyResolver = Resolver<CreateAndLoadUserByStellarPublicKeyPayload | null, CreateAndLoadUserByStellarPublicKeyArgs>;
  export interface CreateAndLoadUserByStellarPublicKeyArgs {
    input: CreateAndLoadUserByStellarPublicKeyInput; /** The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields. */
  }

  export type LoginResolver = Resolver<User | null, LoginArgs>;
  export interface LoginArgs {
    stellarPublicKey: string; 
    payload: string; 
    signature: string; 
  }

  export type LogoutResolver = Resolver<boolean | null>;  
}/** The output of our create `ProductCategory` mutation. */
export namespace CreateProductCategoryPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    productCategory?: ProductCategoryResolver; /** The `ProductCategory` that was created by this mutation. */
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    productCategoryEdge?: ProductCategoryEdgeResolver; /** An edge for our `ProductCategory`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type ProductCategoryResolver = Resolver<ProductCategory | null>;  export type QueryResolver = Resolver<Query | null>;  export type ProductCategoryEdgeResolver = Resolver<ProductCategoriesEdge | null, ProductCategoryEdgeArgs>;
  export interface ProductCategoryEdgeArgs {
    orderBy?: ProductCategoriesOrderBy[] | null; /** The method to use when ordering `ProductCategory`. */
  }

  
}/** The output of our create `Product` mutation. */
export namespace CreateProductPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    product?: ProductResolver; /** The `Product` that was created by this mutation. */
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    userBySellerId?: UserBySellerIdResolver; /** Reads a single `User` that is related to this `Product`. */
    productCategoryByCategory?: ProductCategoryByCategoryResolver; /** Reads a single `ProductCategory` that is related to this `Product`. */
    productEdge?: ProductEdgeResolver; /** An edge for our `Product`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type ProductResolver = Resolver<Product | null>;  export type QueryResolver = Resolver<Query | null>;  export type UserBySellerIdResolver = Resolver<User | null>;  export type ProductCategoryByCategoryResolver = Resolver<ProductCategory | null>;  export type ProductEdgeResolver = Resolver<ProductsEdge | null, ProductEdgeArgs>;
  export interface ProductEdgeArgs {
    orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
  }

  
}/** The output of our create `User` mutation. */
export namespace CreateUserPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    user?: UserResolver; /** The `User` that was created by this mutation. */
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    userEdge?: UserEdgeResolver; /** An edge for our `User`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type UserResolver = Resolver<User | null>;  export type QueryResolver = Resolver<Query | null>;  export type UserEdgeResolver = Resolver<UsersEdge | null, UserEdgeArgs>;
  export interface UserEdgeArgs {
    orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
  }

  
}/** The output of our update `ProductCategory` mutation. */
export namespace UpdateProductCategoryPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    productCategory?: ProductCategoryResolver; /** The `ProductCategory` that was updated by this mutation. */
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    productCategoryEdge?: ProductCategoryEdgeResolver; /** An edge for our `ProductCategory`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type ProductCategoryResolver = Resolver<ProductCategory | null>;  export type QueryResolver = Resolver<Query | null>;  export type ProductCategoryEdgeResolver = Resolver<ProductCategoriesEdge | null, ProductCategoryEdgeArgs>;
  export interface ProductCategoryEdgeArgs {
    orderBy?: ProductCategoriesOrderBy[] | null; /** The method to use when ordering `ProductCategory`. */
  }

  
}/** The output of our update `Product` mutation. */
export namespace UpdateProductPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    product?: ProductResolver; /** The `Product` that was updated by this mutation. */
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    userBySellerId?: UserBySellerIdResolver; /** Reads a single `User` that is related to this `Product`. */
    productCategoryByCategory?: ProductCategoryByCategoryResolver; /** Reads a single `ProductCategory` that is related to this `Product`. */
    productEdge?: ProductEdgeResolver; /** An edge for our `Product`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type ProductResolver = Resolver<Product | null>;  export type QueryResolver = Resolver<Query | null>;  export type UserBySellerIdResolver = Resolver<User | null>;  export type ProductCategoryByCategoryResolver = Resolver<ProductCategory | null>;  export type ProductEdgeResolver = Resolver<ProductsEdge | null, ProductEdgeArgs>;
  export interface ProductEdgeArgs {
    orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
  }

  
}/** The output of our update `User` mutation. */
export namespace UpdateUserPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    user?: UserResolver; /** The `User` that was updated by this mutation. */
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    userEdge?: UserEdgeResolver; /** An edge for our `User`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type UserResolver = Resolver<User | null>;  export type QueryResolver = Resolver<Query | null>;  export type UserEdgeResolver = Resolver<UsersEdge | null, UserEdgeArgs>;
  export interface UserEdgeArgs {
    orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
  }

  
}/** The output of our delete `ProductCategory` mutation. */
export namespace DeleteProductCategoryPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    productCategory?: ProductCategoryResolver; /** The `ProductCategory` that was deleted by this mutation. */
    deletedProductCategoryId?: DeletedProductCategoryIdResolver; 
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    productCategoryEdge?: ProductCategoryEdgeResolver; /** An edge for our `ProductCategory`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type ProductCategoryResolver = Resolver<ProductCategory | null>;  export type DeletedProductCategoryIdResolver = Resolver<string | null>;  export type QueryResolver = Resolver<Query | null>;  export type ProductCategoryEdgeResolver = Resolver<ProductCategoriesEdge | null, ProductCategoryEdgeArgs>;
  export interface ProductCategoryEdgeArgs {
    orderBy?: ProductCategoriesOrderBy[] | null; /** The method to use when ordering `ProductCategory`. */
  }

  
}/** The output of our delete `Product` mutation. */
export namespace DeleteProductPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    product?: ProductResolver; /** The `Product` that was deleted by this mutation. */
    deletedProductId?: DeletedProductIdResolver; 
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    userBySellerId?: UserBySellerIdResolver; /** Reads a single `User` that is related to this `Product`. */
    productCategoryByCategory?: ProductCategoryByCategoryResolver; /** Reads a single `ProductCategory` that is related to this `Product`. */
    productEdge?: ProductEdgeResolver; /** An edge for our `Product`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type ProductResolver = Resolver<Product | null>;  export type DeletedProductIdResolver = Resolver<string | null>;  export type QueryResolver = Resolver<Query | null>;  export type UserBySellerIdResolver = Resolver<User | null>;  export type ProductCategoryByCategoryResolver = Resolver<ProductCategory | null>;  export type ProductEdgeResolver = Resolver<ProductsEdge | null, ProductEdgeArgs>;
  export interface ProductEdgeArgs {
    orderBy?: ProductsOrderBy[] | null; /** The method to use when ordering `Product`. */
  }

  
}/** The output of our delete `User` mutation. */
export namespace DeleteUserPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    user?: UserResolver; /** The `User` that was deleted by this mutation. */
    deletedUserId?: DeletedUserIdResolver; 
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    userEdge?: UserEdgeResolver; /** An edge for our `User`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type UserResolver = Resolver<User | null>;  export type DeletedUserIdResolver = Resolver<string | null>;  export type QueryResolver = Resolver<Query | null>;  export type UserEdgeResolver = Resolver<UsersEdge | null, UserEdgeArgs>;
  export interface UserEdgeArgs {
    orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
  }

  
}/** The output of our `createAndLoadUserByStellarPublicKey` mutation. */
export namespace CreateAndLoadUserByStellarPublicKeyPayloadResolvers {
  export interface Resolvers {
    clientMutationId?: ClientMutationIdResolver; /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
    users?: UsersResolver; 
    query?: QueryResolver; /** Our root query field type. Allows us to run any query from our mutation payload. */
    userEdge?: UserEdgeResolver; /** An edge for our `User`. May be used by Relay 1. */
  }

  export type ClientMutationIdResolver = Resolver<string | null>;  export type UsersResolver = Resolver<(User | null)[] | null>;  export type QueryResolver = Resolver<Query | null>;  export type UserEdgeResolver = Resolver<UsersEdge | null, UserEdgeArgs>;
  export interface UserEdgeArgs {
    orderBy?: UsersOrderBy[] | null; /** The method to use when ordering `User`. */
  }

  
}export namespace GetCurrentUser {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    currentUser?: CurrentUser | null; 
  }

  export type CurrentUser = {
    __typename?: "User";
    id: UUID; 
  }
}
export namespace Logout {
  export type Variables = {
  }

  export type Mutation = {
    __typename?: "Mutation";
    logout?: boolean | null; 
  }
}
export namespace GetCategoryInfo {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    allProductCategories?: AllProductCategories | null; 
  }

  export type AllProductCategories = {
    __typename?: "ProductCategoriesConnection";
    nodes: (Nodes | null)[]; 
  }

  export type Nodes = {
    __typename?: "ProductCategory";
    id: UUID; 
    name: string; 
    description?: string | null; 
  }
}
export namespace GetProductCategory {
  export type Variables = {
    categoryID: UUID;
  }

  export type Query = {
    __typename?: "Query";
    productCategoryById?: ProductCategoryById | null; 
  }

  export type ProductCategoryById = {
    __typename?: "ProductCategory";
    id: UUID; 
    name: string; 
    description?: string | null; 
  }
}
export namespace AllSellerProducts {
  export type Variables = {
    sellerID: UUID;
  }

  export type Query = {
    __typename?: "Query";
    userById?: User | null; 
  }
}
export namespace GetAllSellers {
  export type Variables = {
  }

  export type Query = {
    __typename?: "Query";
    allSellers?: AllSellers | null; 
  }

  export type AllSellers = {
    __typename?: "SellersConnection";
    nodes: (Nodes | null)[]; 
  }

  export type Nodes = {
    __typename?: "Seller";
    id?: UUID | null; 
    username?: string | null; 
    displayName?: string | null; 
  }
}
export namespace Login {
  export type Variables = {
    stellarPublicKey: string;
    payload: string;
    signature: string;
  }

  export type Mutation = {
    __typename?: "Mutation";
    login?: Login | null; 
  }

  export type Login = {
    __typename?: "User";
    id: UUID; 
    username?: string | null; 
  }
}
export namespace AllProductsByCategoryId {
  export type Variables = {
    categoryID: UUID;
  }

  export type Query = {
    __typename?: "Query";
    allProducts?: AllProducts | null; 
  }

  export type AllProducts = {
    __typename?: "ProductsConnection";
    nodes: (Nodes | null)[]; 
  }

  export type Nodes = {
    __typename?: "Product";
    id: UUID; 
    name: string; 
    usdCost: BigFloat; 
    description?: string | null; 
  }
}
