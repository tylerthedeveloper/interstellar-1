import gql from 'graphql-tag';

/*************************************************
 * Defaults
 *************************************************/

export const defaults = {
    loginModalOpen: false
};


/*************************************************
 * Resolvers
 *************************************************/

export const resolvers  = {
    Mutation: {
        toggleLoginModal: (_, args, { cache, getCacheKey}) => {
            const {loginModalOpen} = cache.readQuery({query: getLoginModalOpenStatus});
            cache.writeData({ data: {loginModalOpen: !loginModalOpen} });
            return null;
        },
    },
};

/*************************************************
 * Queries
 *************************************************/

export const getLoginModalOpenStatus = gql`
  query {
    loginModalOpen @client
  }
`;

/*************************************************
 * Mutators
 *************************************************/

export const toggleLoginModalStatus = gql`
  mutation {
    toggleLoginModal @client
  }
`;


